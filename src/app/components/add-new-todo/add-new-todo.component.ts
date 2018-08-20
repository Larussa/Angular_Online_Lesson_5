import { Component, OnInit, ViewChild } from '@angular/core';
import { TodosService } from "../../services/todos.service";
import { Router } from "@angular/router";
import { Todo } from "../../models/Todo";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-add-new-todo',
  templateUrl: './add-new-todo.component.html',
  styleUrls: ['./add-new-todo.component.css']
})
export class AddNewTodoComponent implements OnInit {

  public addTodo: Todo = {
    userId: 1,
    title: '',
    completed: false,
  };

  @ViewChild('form') form: NgForm;

  constructor(
    public todoService: TodosService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  addNewTodo(form) {
    if (form.invalid) return;
    this.spinner.show();

    this.todoService.addTodo((Object.assign({}, this.addTodo))).subscribe((newTodo: Todo) => {
      this.toastr.success(`Todo successfully added.`, 'Success!');
      this.router.navigate(['/']);
    }, () => {
      this.toastr.error('Error getting data.');
    }, () => {
      this.spinner.hide();
    });
    this.form.resetForm();
  }
}


