import { GrupoService } from './../../../../service/cadastro/grupo.service';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBase } from 'app/view/compartilhado/base/form-base';
import { EntityBase } from 'app/model/entity-base';
import { CategoriaService } from 'app/service/cadastro/categoria.service';
import { Validators } from '@angular/forms';

@Component({
   selector: 'app-cadastro-grupo-form',
   templateUrl: './cadastro-grupo-form.component.html',
})
export class CadastroGrupoFormComponent extends FormBase<EntityBase> {

   constructor(
      protected service: GrupoService,
      protected injector: Injector,
   ) {
      super(service, injector);
   }

   newEntity(): EntityBase {
      return new EntityBase();
   }

   setForm(entity: EntityBase) {
      this.form = this.fb.group({
         id: [{ value: entity.id, disabled: true }],
         nome: [entity.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
         ativo: [entity.ativo, Validators.required],
      });
   }

   setFormToEntity() {
      this.entity = this.form.getRawValue() as EntityBase;
   }
   
   setEntity(response: any) {
      this.entity = response;
      this.setForm(this.entity);
   }
}

