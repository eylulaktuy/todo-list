import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
todoInput : string='';
todos:string[]=[];

constructor() {}

addToList(){

  if(!this.todoInput.trim) return;

  if(this.todos.includes(this.todoInput)){
    alert('This todo already exits.');
    this.todoInput= '';
    return;

  }

  this.todos.push(this.todoInput);
  this.todoInput = '';


}

removeFromList(index:number){
  this.todos.splice(index,1)

}
}

