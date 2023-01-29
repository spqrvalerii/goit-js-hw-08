import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onInputForm, 500));

function onInputForm(e) {
  const dataObject = { email: email.value, message: message.value };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataObject));
}; 

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
};

const data = localStorage.getItem(LOCALSTORAGE_KEY);
const parseData = JSON.parse(data);

if (parseData) {
    parseData.email ? email.value = parseData.email :  email.value = ''
    parseData.message ? message.value = parseData.message : message.value = ''
};