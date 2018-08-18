import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AboutComponent } from "./components/about/about.component";
import { TodosComponent } from "./components/todos/todos.component";
import { TodoEditComponent } from "./components/todo-edit/todo-edit.component";
import { AddNewTodoComponent } from "./components/add-new-todo/add-new-todo.component";

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todo/:id', component: TodoEditComponent },
  { path: 'addtodo', component: AddNewTodoComponent },
  { path: 'about', component: AboutComponent },
  { path: "**", component: NotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
