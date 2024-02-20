import { TestBed } from '@angular/core/testing';
import { Todo } from 'src/app/models/model/todo.model';
import { ExampleTesteService } from '../example-test.service';
import { TodoSignalsService } from '../todo-signals.service';

describe('ExampleTesteService', () => {
  let service: ExampleTesteService;
  let todoService: TodoSignalsService;

  beforeEach(() => {
    service = TestBed.inject(ExampleTesteService);
    todoService = TestBed.inject(TodoSignalsService);
  });

  it('should return correct list', () => {
    service.getTesteNamesList().subscribe({
      next: (list) => {
        expect(list).toEqual([
          { id: 1, name: 'Test 1' },
          { id: 2, name: 'Test 2' },
        ]);
      },
    });
  });

  it('should return correct todo list', () => {
    jest.spyOn(todoService, 'updateTodos');

    const newTodo: Todo = {
      id: 1,
      title: 'New Todo',
      description: 'Description for test',
      done: true,
    };

    service.handleCreateTodo(newTodo).subscribe({
      next: (todoList) => {
        expect(todoList).toEqual([newTodo]);
        expect(todoService.updateTodos).toHaveBeenCalledWith(newTodo);
      },
    });
  });
});
