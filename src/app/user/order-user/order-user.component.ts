import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { GroupService } from 'src/app/group/group.service';
import { Grupo } from 'src/app/group/group.model';
import { Usuario } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Observable } from 'rxjs';
import { ErrorHandler } from 'src/app/app.error-handler';

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css']
})
export class OrderUserComponent implements OnInit {

  form: FormGroup;
  grupos: Grupo[] = [];
  usuario = new Usuario();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private grupoService: GroupService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.validation()

    this.getGroups()

    const id = this.activatedRoute.snapshot.params['id'];

    if(id) {
      this.userService.findById(id).subscribe(usuario => {
        this.usuario = usuario
      
        this.usuario.grupo = this.usuario.grupos.map(g => g.nome).pop()

        this.form.patchValue(this.usuario)
      })
    }
  }

  getGroups() {
    this.grupoService.getAll().subscribe(grupos => {
      this.grupos = grupos
    });
  }

  save() {
    if(this.isUpdate) {
      this.update()
    } else {
      this.add()
    }
  }

  add(): void {
    this.setProperties()

    this.userService.add(this.usuario).subscribe(usuario => {
      this.toastr.successToastr(`Usuário ${usuario.login} salvo com sucesso!`)

      this.reset()
    })
  }

  update() {
    this.setProperties()

    this.userService.put(this.usuario).subscribe(usuario => {
      this.toastr.successToastr(`Usuário ${usuario.login} atualizado com sucesso!`)
    });
  }

  reset(){
    this.form.reset();
  }

  setProperties() {
    const grupo = this.grupos.find(g => g.nome === this.form.value.grupo);
    
    this.usuario.id = this.form.value.id;
    this.usuario.nome = this.form.value.nome;
    this.usuario.login = this.form.value.login;
    this.usuario.senha = this.form.value.senha;
    this.usuario.email = this.form.value.email;
    this.usuario.ativo = this.form.value.ativo;
    this.usuario.grupos = [];
    this.usuario.grupos.push(grupo);
  }

  validation() {
    this.form = this.fb.group({
      id: [],
      name: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      active: this.fb.control('', [Validators.required]),
      group: this.fb.control('', [Validators.required])
    })
  }

  get isUpdate() {
    return Boolean(this.form.get('id').value)
  }

}
