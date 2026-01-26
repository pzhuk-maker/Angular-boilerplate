import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should add a todo from the form', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('[data-testid=\"new-todo-input\"]') as HTMLInputElement;
    const form = compiled.querySelector('form') as HTMLFormElement;

    input.value = 'First task';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const items = compiled.querySelectorAll('[data-testid^=\"todo-item-\"]');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('First task');
  });

  it('should edit an existing todo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const addTodo = (title: string) => {
      const input = compiled.querySelector('[data-testid=\"new-todo-input\"]') as HTMLInputElement;
      const form = compiled.querySelector('form') as HTMLFormElement;
      input.value = title;
      input.dispatchEvent(new Event('input'));
      form.dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };

    addTodo('First task');

    (compiled.querySelector('[data-testid=\"edit-1\"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    const editInput = compiled.querySelector('[data-testid=\"edit-input\"]') as HTMLInputElement;
    editInput.value = 'Updated task';
    editInput.dispatchEvent(new Event('input'));

    (compiled.querySelector('[data-testid=\"save-edit\"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(compiled.querySelector('[data-testid^=\"todo-item-\"]')?.textContent).toContain('Updated task');
  });

  it('should delete a todo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const addTodo = (title: string) => {
      const input = compiled.querySelector('[data-testid=\"new-todo-input\"]') as HTMLInputElement;
      const form = compiled.querySelector('form') as HTMLFormElement;
      input.value = title;
      input.dispatchEvent(new Event('input'));
      form.dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };

    addTodo('First task');
    addTodo('Second task');

    (compiled.querySelector('[data-testid=\"delete-1\"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    const remaining = compiled.querySelectorAll('[data-testid^=\"todo-item-\"]');
    expect(remaining.length).toBe(1);
    expect(remaining[0].textContent).toContain('Second task');
  });
});
