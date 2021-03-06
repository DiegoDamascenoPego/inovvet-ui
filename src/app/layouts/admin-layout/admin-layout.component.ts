import { Location, PopStateEvent } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SistemaService } from 'app/service/seguranca/sistema.service';
// import PerfectScrollbar from 'perfect-scrollbar';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    loading = false;
    constructor(
        public location: Location,
        private router: Router,
        private sistemaService: SistemaService) {

    }

    ngOnInit() {
        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function

            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = require('perfect-scrollbar').default(elemMainPanel);
            ps = require('perfect-scrollbar').default(elemSidebar);
        }        
    }
    ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                } else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                ) {
                    this.loading = false;
                }
            });
    }

    isMaps(path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    }
    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps =  require('perfect-scrollbar').default(elemMainPanel);
            ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

}
