import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly todoTitle = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  protected readonly editTitle = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  protected readonly todos = signal<Todo[]>([]);
  protected readonly editingId = signal<number | null>(null);
  private readonly nextId = signal(1);

  protected addTodo(): void {
    const title = this.todoTitle.value.trim();
    if (!title) {
      return;
    }

    const newTodo: Todo = {
      id: this.nextId(),
      title,
      completed: false
    };

    this.todos.update((current) => [...current, newTodo]);
    this.nextId.update((value) => value + 1);
    this.todoTitle.reset('');
  }

  protected toggleComplete(todoId: number): void {
    this.todos.update((current) =>
      current.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  protected startEdit(todo: Todo): void {
    this.editingId.set(todo.id);
    this.editTitle.setValue(todo.title);
  }

  protected saveEdit(todoId: number): void {
    const updatedTitle = this.editTitle.value.trim();
    if (!updatedTitle) {
      this.cancelEdit();
      return;
    }

    this.todos.update((current) =>
      current.map((todo) => (todo.id === todoId ? { ...todo, title: updatedTitle } : todo))
    );

    this.cancelEdit();
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
    this.editTitle.reset('');
  }

  protected deleteTodo(todoId: number): void {
    this.todos.update((current) => current.filter((todo) => todo.id !== todoId));
    if (this.editingId() === todoId) {
      this.cancelEdit();
    }
  }

  protected trackById(_: number, todo: Todo): number {
    return todo.id;
  }
}

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
