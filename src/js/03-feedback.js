import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
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
  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
};

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
  }
};

const localStorageData = load(LOCALSTORAGE_KEY);
if (localStorageData) {
  email.value = localStorageData.email;
  message.value = localStorageData.message;
};