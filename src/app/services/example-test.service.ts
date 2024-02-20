import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/model/todo.model';
import { TodoSignalsService } from './todo-signals.service';

@Injectable({ providedIn: 'root' })
export class ExampleTesteService {
  public testNamesList: Array<{ id: number; name: string }> = [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
  ];

  constructor(private todoSignalsService: TodoSignalsService) {}

  public getTesteNamesList(): Observable<Array<{ id: number; name: string }>> {
    return of(this.testNamesList);
  }

  public handleCreateTodo(todo: Todo): Observable<Array<Todo>> {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
    }
    return of(this.todoSignalsService.todosState());
  }
}
