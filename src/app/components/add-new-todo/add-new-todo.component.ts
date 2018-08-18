import { Component, OnInit, ViewChild } from '@angular/core';
import { TodosService} from "../../services/todos.service";
import { ActivatedRoute, Router } from "@angular/router";
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
    completed: '',
  };
  todos: Todo[];
  @ViewChild('form') form: NgForm;

  constructor(
    public todoService: TodosService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  addNewTodo(form) {
    if (form.invalid) return;
    this.spinner.show();
    this.todoService.addTodo(Object.assign({}, this.addTodo));
    console.log(this.addTodo);
    this.spinner.hide();
    this.toastr.success("User was successfully edited", "Info");
    this.router.navigate(['/']);
    this.form.resetForm();
    }
  }
