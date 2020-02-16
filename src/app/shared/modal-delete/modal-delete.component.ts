import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  inputs: ['id', 'lg'],
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

  @Output() deleteFun = new EventEmitter();
  @Output() id: any;
  @Output() lg: boolean = false;

  deleteFunction() {
    this.deleteFun.emit(this.id)
  }

}
