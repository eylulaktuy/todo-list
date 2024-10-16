import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { GetToDoListResponse } from '../../models/getToDoListResponse';
import { HttpClient } from '@angular/common/http';
import { createToDoResponse } from '../../models/createToDoResponse';
import { createToDoRequest } from '../../models/createToDoRequest';
import { updateToDoRequest } from '../../models/updateToDoRequest';
import { updateToDoResponse } from '../../models/updateToDoResponse';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule,TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
todoInput : string='';
todos:string[]=[];
todoListFromBackend: GetToDoListResponse[]=[];
newTodo!: createToDoRequest;
  todo!: updateToDoRequest;
  id!: number;

constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

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

removeFromList(todo:string){
  this.todos=this.todos.filter((i)=>i!==todo)

}

fetchTodos(){
  this.httpClient.get<GetToDoListResponse>('https://jsonplaceholder.typicode.com/todos')
  .subscribe({
    next: (response: GetToDoListResponse)=>{
      this.todoListFromBackend.push(response);
    },
    error:(err:any)=>{
      console.log('hata',err);
    },
    complete:()=>{
      console.log('list --istek basarili bitti');
    },
  });

}

addTodos(newTodo:createToDoRequest){
  this.httpClient.post<createToDoResponse>('https://jsonplaceholder.typicode.com/todos/',newTodo)
  .subscribe({
    next: (response: createToDoResponse)=>{
      this.todoListFromBackend.push(response); // yeni todoyu listeye ekle
    },
    error:(err:any)=>{
      console.log('hata',err);
    },
    complete:()=>{
      console.log('new todo add --istek basarili bitti');
    },
  });
}

deleteTodo(id: number) {
  this.httpClient.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .subscribe({
      next: () => {
        console.log('Todo silindi:', id);
        this.todoListFromBackend = this.todoListFromBackend.filter(todo => todo.id !== id);
      },
      error: (err) => {
        console.log('Silme hatası:', err);
      },
      complete: () => {
        console.log('Silme işlemi tamamlandı.');
      }
    });
}

updateTodo(updateTodo: updateToDoRequest) {
  this.httpClient.put<updateToDoResponse>(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`,updateTodo)
    .subscribe({
      next: (response:updateToDoResponse) => {
        console.log('Todo updated:', response );
        const index = this.todoListFromBackend.findIndex(todo => todo.id === response.id);
        if (index !== -1) {
          this.todoListFromBackend[index] = response;
        }
      },
      error: (err) => {
        console.log('update error:', err);
      },
      complete: () => {
        console.log('Updated has done.');
      }
    });
}
}

