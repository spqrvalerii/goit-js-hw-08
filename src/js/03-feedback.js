import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const localStorageObject = {};

form.addEventListener('input', throttle(onInputForm, 500));
form.addEventListener('submit', onSubmitForm);

function onInputForm(e) {
  let target = e.target;
  localStorageObject[target.name] = target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(localStorageObject));
};

function onSubmitForm(e) {
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
};

function save(key, value) {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
  }
}

const localStorageData = load(LOCALSTORAGE_KEY);
if (localStorageData) {
  email.value = localStorageData.email;
  message.value = localStorageData.message;
}