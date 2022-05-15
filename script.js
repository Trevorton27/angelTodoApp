const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

const form = document.querySelector('.inputContainer');
form.addEventListener('submit', addTodo);

function addTodo(e) {
  e.preventDefault();

  const text = document.getElementById('taskBox').value;

  if (text.length > 0) {
    const task = {
      text,
      checked: false,
      id: Date.now()
    };

    todoList.push(task);
    console.log('todoList: ', todoList);
    saveTodoItems(todoList);
    renderTodo();
    form.reset();
  }
}

function saveTodoItems(array) {
  localStorage.setItem('todoList', JSON.stringify(array));
}

function renderTodo() {
  const list = document.getElementById('toDoItems');
  list.innerHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const text = todoList[i].text;
    const checkBox = createCheckBox();
    const li = createLi(text);
    li.id = todoList[i].id;
    if (todoList[i].checked === true) {
      li.style.textDecoration = 'line-through';
      checkBox.checked = true;
    }
    list.appendChild(li);

    li.appendChild(checkBox);

    checkBox.addEventListener('click', () => {
      toggleTask(todoList[i].id);
    });

    const deleteButton = createDeleteButton();
    li.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      deleteTask(todoList[i].id);
    });
  }
}

function createCheckBox() {
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  return checkBox;
}

function createLi(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.textContent = todo;
  return li;
}

function createDeleteButton() {
  const deleteButton = document.createElement('input');
  deleteButton.setAttribute('type', 'button');
  deleteButton.className = 'deleteButton';
  deleteButton.value = 'X';
  return deleteButton;
}

function toggleTask(id) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList[i].checked = !todoList[i].checked;
    }
  }
  renderTodo();
}

function deleteTask(id) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id && todoList[i].checked === true) {
      todoList.splice(i, 1);
    }
  }
  saveTodoItems(todoList);
  renderTodo();
}

renderTodo();
