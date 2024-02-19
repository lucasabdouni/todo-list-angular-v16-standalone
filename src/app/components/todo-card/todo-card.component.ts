import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: [],
})
export class TodoCardComponent implements OnInit {
  private todoSignalsService = inject(TodoSignalsService);
  private todoSignal = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todoSignal());

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage() {
    const todosDatas = localStorage.getItem(
      TodoKeyLocalStorage.TODO_LIST
    ) as string;

    todosDatas && this.todoSignal.set(JSON.parse(todosDatas));
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todoSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true);
        this.saveTodosInLocalStorage();
      });
    }
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodosInLocalStorage;
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todosList().indexOf(todo);

      if (index !== -1) {
        this.todoSignal.mutate((todos) => {
          todos.splice(index, 1);
          // Salvar os dados atuais das todos
          this.saveTodosInLocalStorage();
        });
      }
    }
  }
}
