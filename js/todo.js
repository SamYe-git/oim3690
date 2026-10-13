(function () {
  'use strict';

  const STORAGE_KEY = 'oim3690-todos';

  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const countLabel = document.getElementById('todo-count');
  const clearCompletedBtn = document.getElementById('clear-completed');
  const filterButtons = document.querySelectorAll('.filter-button');

  let todos = loadTodos();
  let currentFilter = 'all';

  function loadTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function render() {
    list.innerHTML = '';

    if (todos.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'todo-empty';
      empty.textContent = 'No tasks yet — add one above.';
      list.appendChild(empty);
    }

    const visibleTodos = todos.filter((todo) => {
      if (currentFilter === 'open') return !todo.completed;
      if (currentFilter === 'done') return todo.completed;
      return true;
    });

    if (todos.length > 0 && visibleTodos.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'todo-empty';
      empty.textContent = currentFilter === 'done' ? 'No finished tasks yet.' : 'Nothing left to do!';
      list.appendChild(empty);
    }

    visibleTodos.forEach((todo) => {
      const item = document.createElement('li');
      item.className = 'todo-item' + (todo.completed ? ' completed' : '');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.setAttribute('aria-label', 'Mark task complete');
      checkbox.addEventListener('change', () => toggleTodo(todo.id));

      const text = document.createElement('span');
      text.className = 'todo-text';
      text.textContent = todo.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'todo-delete';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

      item.append(checkbox, text, deleteBtn);
      list.appendChild(item);
    });

    const remaining = todos.filter((todo) => !todo.completed).length;
    countLabel.textContent = `${remaining} item${remaining === 1 ? '' : 's'} left`;
  }

  function addTodo(text) {
    todos.push({ id: Date.now(), text, completed: false });
    saveTodos();
    render();
  }

  function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos();
      render();
    }
  }

  function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    render();
  }

  function clearCompleted() {
    todos = todos.filter((t) => !t.completed);
    saveTodos();
    render();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === '') return;
    addTodo(text);
    input.value = '';
    input.focus();
  });

  clearCompletedBtn.addEventListener('click', clearCompleted);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;
      filterButtons.forEach((b) => {
        const isActive = b === button;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
      render();
    });
  });

  render();
})();
