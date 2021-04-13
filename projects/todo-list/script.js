const toDoList = document.querySelector('#lista-tarefas');
const input = document.querySelector('#texto-tarefa');
const createTaskBtn = document.querySelector('#criar-tarefa');
const selected = '.highlighted';

function addTask() {
  const newTask = document.createElement('li');
  newTask.innerText = input.value;
  toDoList.appendChild(newTask);
  input.value = '';
}

createTaskBtn.addEventListener('click', addTask);

function highlightItem(event) {
  const item = event.target;
  const highlighted = document.querySelector(selected);
  if (highlighted) {
    highlighted.classList.remove('highlighted');
  }
  item.classList.add('highlighted');
}

toDoList.addEventListener('click', highlightItem);

function completeTask(event) {
  const task = event.target;
  if (task.className.includes('completed')) {
    task.classList.remove('completed');
  } else {
    task.classList.add('completed');
  }
}

toDoList.addEventListener('dblclick', completeTask);

const clearBtn = document.querySelector('#apaga-tudo');

function clearList() {
  const itemsList = document.querySelector('#lista-tarefas');
  while (itemsList.firstChild) {
    itemsList.firstChild.remove();
  }
}

clearBtn.addEventListener('click', clearList);

const clearCompletedBtn = document.querySelector('#remover-finalizados');

function removeCompleted() {
  const completedItems = document.querySelectorAll('.completed');
  for (let index = 0; index < completedItems.length; index += 1) {
    completedItems[index].remove();
  }
}

clearCompletedBtn.addEventListener('click', removeCompleted);

const saveListBtn = document.querySelector('#salvar-tarefas');

function saveClasses(lista) {
  const classes = [];
  for (let index = 0; index < lista.length; index += 1) {
    classes.push(lista[index].className);
  }
  return classes;
}

function saveTask(lista) {
  const task = [];
  for (let index = 0; index < lista.length; index += 1) {
    task.push(lista[index].innerText);
  }
  return task;
}

function saveList() {
  const lista = document.querySelectorAll('#lista-tarefas li');
  const listClasses = saveClasses(lista);
  const listTasks = saveTask(lista);
  localStorage.setItem('classes', listClasses);
  localStorage.setItem('tasks', listTasks);
}

saveListBtn.addEventListener('click', saveList);

if (localStorage.tasks) {
  const tasksArray = localStorage.tasks.split(',');
  const classesArray = localStorage.classes.split(',');
  for (let index = 0; index < tasksArray.length; index += 1) {
    const newTask = document.createElement('li');
    newTask.innerText = tasksArray[index];
    newTask.className = classesArray[index];
    toDoList.appendChild(newTask);
  }
}

const upBtn = document.querySelector('#mover-cima');
const downBtn = document.querySelector('#mover-baixo');

function moveUpDown(movement, element) {
  const item = document.querySelector(selected);
  let moveLocation = item.nextSibling;

  if (movement === 0) {
    moveLocation = item.previousSibling;
  }

  if (item !== element) {
    const auxClass = item.className;
    const auxText = item.innerText;
    item.className = moveLocation.className;
    item.innerText = moveLocation.innerText;
    moveLocation.className = auxClass;
    moveLocation.innerText = auxText;
  }
}

function move(event) {
  const btn = event.target;
  if (document.querySelector(selected)) {
    if (btn.id.includes('cima')) {
      moveUpDown(0, toDoList.firstChild);
    } else {
      moveUpDown(1, toDoList.lastChild);
    }
  }
}

upBtn.addEventListener('click', move);
downBtn.addEventListener('click', move);

const removeSelectedBtn = document.querySelector('#remover-selecionado');

function removeSelected() {
  const item = document.querySelector(selected);
  item.remove();
}

removeSelectedBtn.addEventListener('click', removeSelected);

const limpaLista = document.querySelector('#limpa-lista');

function clearStorage() {
  localStorage.clear();
}

limpaLista.addEventListener('click', clearStorage);
