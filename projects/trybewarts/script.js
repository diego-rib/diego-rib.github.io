const login = document.querySelector('#login');
const password = document.querySelector('#password');
const join = document.querySelector('#join');
const feedback = document.querySelector('.feedback');
const submit = document.querySelector('#submit-btn');
const counter = document.querySelector('#counter');
const agree = document.querySelector('#agreement');

const nome = document.querySelector('#input-name');
const sobrenome = document.querySelector('#input-lastname');
const email = document.querySelector('#input-email');
const textarea = document.querySelector('#textarea');

for (let index = 1; index <= 10; index += 1) {
  const label = document.createElement('label');
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'rate';
  radio.value = index;
  label.innerText = index;
  label.appendChild(radio);
  feedback.appendChild(label);
}

join.addEventListener('click', (e) => {
  e.preventDefault();
  const validLogin = login.value;
  const validPassword = password.value;
  if (validLogin === 'tryber@teste.com' && validPassword === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
  login.value = '';
  password.value = '';
});

let checkbox = false;

agree.addEventListener('click', () => {
  if (checkbox === true) {
    submit.setAttribute('disabled', 'disabled');
    checkbox = false;
  } else {
    submit.removeAttribute('disabled');
    checkbox = true;
  }
});

textarea.addEventListener('keyup', () => {
  const counterValue = 500 - textarea.value.length;
  counter.innerText = counterValue;
});

function newElement() {
  const newP = document.createElement('p');
  newP.className = 'showResult';
  return newP;
}

function showName(parent) {
  const newName = newElement();
  newName.innerText = `Nome: ${nome.value} ${sobrenome.value}`;
  parent.appendChild(newName);
}

function showEmail(parent) {
  const newEmail = newElement();
  newEmail.innerText = `Email: ${email.value}`;
  parent.appendChild(newEmail);
}

function showHouse(parent) {
  const newCasa = newElement();
  const casa = document.querySelector('#house');
  newCasa.innerText = `Casa: ${casa.value}`;
  parent.appendChild(newCasa);
}

function showFamily(parent) {
  const newFamilia = newElement();
  const familia = document.querySelector('input[name="family"]:checked');
  newFamilia.innerText = `Família: ${familia.value}`;
  parent.appendChild(newFamilia);
}

function showSubjects(parent) {
  const newObj = newElement();
  const materias = document.querySelectorAll('input[class="subject"]:checked');
  let materiasFormatado = '';
  for (let index = 0; index < materias.length; index += 1) {
    if (index === (materias.length - 1) || materias.length === 1) {
      materiasFormatado += materias[index].value;
    } else {
      materiasFormatado += `${materias[index].value}, `;
    }
  }
  newObj.innerText = `Matérias: ${materiasFormatado}`;
  parent.appendChild(newObj);
}

function showRate(parent) {
  const newRate = newElement();
  const rate = document.querySelector('input[name="rate"]:checked');
  newRate.innerText = `Avaliação: ${rate.value}`;
  parent.appendChild(newRate);
}

function showObs(parent) {
  const newObs = newElement();
  newObs.innerText = `Observações: ${textarea.value}`;
  parent.appendChild(newObs);
}

function showResults() {
  const showDiv = document.createElement('form');
  showDiv.id = 'evaluation-form';
  showDiv.className = 'contentResults';
  showName(showDiv);
  showEmail(showDiv);
  showHouse(showDiv);
  showFamily(showDiv);
  showSubjects(showDiv);
  showRate(showDiv);
  showObs(showDiv);
  return showDiv;
}

submit.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('#content-result').appendChild(showResults());
  document.querySelector('.clear').remove();
});
