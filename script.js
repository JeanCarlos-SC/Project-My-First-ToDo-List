const list = document.getElementById('lista-tarefas');
const btn = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const btnClear = document.getElementById('apaga-tudo');
const btnClearCompleted = document.getElementById('remover-finalizados');
const btnSaveTasks = document.getElementById('salvar-tarefas');
const btnUp = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');
const btnRemove = document.getElementById('remover-selecionado');

// Cria os elementos 'Li' que receberão as tarefas digitadas pelo usuário, e adiciona a classe 'task' a cada um.
btn.addEventListener('click', () => {
  if (input.value !== '') {
    const task = document.createElement('li');
    list.appendChild(task);
    task.classList.add('task');
    task.innerText = input.value;
  }
  input.value = '';
});

// Adiciona o background-Color 'gray' a tarefa selecionada através da classe selected, e verifica se somente um elemento possui a classe.
list.addEventListener('click', (event) => {
  const element = event.target;
  const selected = document.getElementsByClassName('selected');
  if (selected.length > 0 && element.classList.contains('task')) {
    selected[0].classList.remove('selected');
    element.classList.add('selected');
  } else if (element.classList.contains('task')) {
    element.classList.add('selected');
  } else if (selected.length > 0) {
    selected[0].classList.remove('selected');
  }
});

// Risca as tarefas ao dar um duplo clique sobre as mesmas.
list.addEventListener('dblclick', (event) => {
  const element = event.target;
  if (element.classList.contains('completed')) {
    element.classList.remove('completed');
  } else if (element.classList.contains('task')) {
    element.classList.add('completed');
  }
});

// Limpa todas as tarefas.
btnClear.addEventListener('click', () => {
  const task = document.querySelectorAll('#lista-tarefas li');
  if (task.length > 0) {
    for (let index = 0; index < task.length; index += 1) {
      task[index].remove();
      localStorage.clear();
    }
  }
});

// Limpa somente as tarefas riscadas
btnClearCompleted.addEventListener('click', () => {
  const task = document.querySelectorAll('.completed');
  let count = 1;
  if (task.length > 0) {
    for (let index = 0; index < task.length; index += 1) {
      task[index].remove();
      localStorage.removeItem(`task completed ${count}`);
      count += 1;
    }
  }
});

// Cria botão que salva as tarefas no localStorage
btnSaveTasks.addEventListener('click', () => {
  const tasks = document.getElementsByClassName('task');
  const taskStorage = [];
  for (let index = 0; index < tasks.length; index += 1) {
    const taskCompletStorage = {};
    if (tasks[index].classList.contains('completed')) {
      taskCompletStorage.name = tasks[index].innerText;
      taskCompletStorage.completed = true;
      taskStorage.push(taskCompletStorage);
    } else {
      taskCompletStorage.name = tasks[index].innerText;
      taskCompletStorage.completed = false;
      taskStorage.push(taskCompletStorage);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(taskStorage));
});

// Cria função que verifica se existe uma tarefa salva no localStorage, se sim, cria um elemento li e atribui o valor da chave ao texto da li
const saveTasks = () => {
  const taskStorage = JSON.parse(localStorage.tasks);
  for (let index = 0; index < taskStorage.length; index += 1) {
    const li = document.createElement('li');
    list.appendChild(li);
    li.classList.add('task');
    li.innerText = taskStorage[index].name;
    if (taskStorage[index].completed === true) {
      li.classList.add('completed');
    }
  }
};

// Cria uma função que verifica se existe algum valor no localStorage, se sim, chama a função saveTasks.
const verificLocalStorage = () => {
  if (localStorage.length > 0) {
    saveTasks();
  }
};

verificLocalStorage();

// Adiciona evento click do botão que deve mover elementos selecionados para cima
btnUp.addEventListener('click', () => {
  const select = document.getElementsByClassName('selected');
  if (select.length > 0 && select[0].previousElementSibling !== null) {
    const selcectText = select[0].innerText;
    const nextElement = select[0].previousElementSibling;
    const elementText = nextElement.innerText;
    select[0].innerText = elementText;
    nextElement.innerText = selcectText;
    if (select[0].classList.contains('completed')) {
      nextElement.classList.add('completed');
      select[0].classList.remove('completed');
    }
    select[0].classList.remove('selected');
    nextElement.classList.add('selected');
  }
});

// Adiciona evento click do botão que deve mover elementos selecionados para baixo
btnDown.addEventListener('click', () => {
  const select = document.getElementsByClassName('selected');
  if (select.length > 0 && select[0].nextElementSibling !== null) {
    const selcectText = select[0].innerText;
    const nextElement = select[0].nextElementSibling;
    const elementText = nextElement.innerText;
    select[0].innerText = elementText;
    nextElement.innerText = selcectText;
    if (select[0].classList.contains('completed')) {
      nextElement.classList.add('completed');
      select[0].classList.remove('completed');
    }
    select[0].classList.remove('selected');
    nextElement.classList.add('selected');
  }
});

// Adiciona evento click do botão que remove a tarefa selecionada
btnRemove.addEventListener('click', () => {
  const elements = document.getElementsByClassName('task');
  for (let index = 0; index < elements.length; index += 1) {
    if (elements[index].classList.contains('selected')) {
      elements[index].remove();
    }
  }
});
