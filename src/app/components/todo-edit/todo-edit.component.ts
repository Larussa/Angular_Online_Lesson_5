import { Component, OnInit } from '@angular/core';
import { TodosService } from "../../services/todos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "../../models/Todo";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  private todoId: string;
  todo: Todo;
  isReadOnly = true;

  constructor(
    public todoService: TodosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.todoId = this.activatedRoute.snapshot.params['id'];
    this.todoService.getTodo(this.todoId).subscribe((todo: Todo) => {
      this.todo = todo;
    },() => {
      this.toastr.error('Error getting data!');
      this.router.navigate(['/']);
    },() => {
      this.spinner.hide();
    });
  }

  onEditTodo() {
    this.spinner.show();
    this.isReadOnly = false;
    const updTodo = Object.assign({}, this.todo);
    this.todoService.updateTodo(updTodo).subscribe((response: Todo) => {
      this.toastr.success("Todo was successfully edited", "Info");
      this.router.navigate(['/']);
    },() => {
      this.toastr.error("Todo not edited");
    },() => {
      this.spinner.hide();
    });
  }

}
