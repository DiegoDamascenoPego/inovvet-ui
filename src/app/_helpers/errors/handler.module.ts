import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './Global-error-handle';


@NgModule({
   declarations: [],
   imports: [
      CommonModule
   ],
   providers: [
      {
         provide: ErrorHandler,
         useClass: GlobalErrorHandler
      }
   ]
})
export class HandlerModule { }
