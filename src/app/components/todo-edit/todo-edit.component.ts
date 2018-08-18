import { Component, OnInit } from '@angular/core';
import { TodosService} from "../../services/todos.service";
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
  todo: Todo;
  isReadOnly = true;

  constructor(
    public todoService: TodosService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.todoService.getTodo(this.activatedRoute.snapshot.params['id']).subscribe((todo: Todo) => {
        this.todo = todo;
        this.spinner.hide();
      },
      () => {
        this.toastr.error('Error getting data. Redirecting...');
        setTimeout(() => this.router.navigate(['/']), 2000);
    });
  }
  onEditTodo() {
    this.isReadOnly = false;
    this.spinner.show();
    const updTodo = Object.assign({}, this.todo);
    this.todoService.updateTodo(updTodo).subscribe((response: Todo) => {
      this.spinner.hide();
      this.toastr.success("Todo was successfully edited", "Info");
      this.router.navigate(['/']);
    }, error => {
      this.spinner.hide();
      this.toastr.error("User not edited", "Error");
    });
  }


}
