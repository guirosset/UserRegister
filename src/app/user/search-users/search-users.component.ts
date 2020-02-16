import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Usuario } from '../user.model';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  usuarios: Usuario[] = []

  constructor(
    private userService: UserService,
    private toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userService.getAll('').subscribe(usuarios => this.usuarios = usuarios)
  }

  delete(id: any) {
    this.userService.delete(id).subscribe(() => {
      
      this.toastr.successToastr('Usuário excluído com sucesso!')
      this.getUsers()
    })
  }

}
