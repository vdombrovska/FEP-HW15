let template;
const contact = {};
let contactsList = []
const DELETE_BTN = 'delete';
const LINE_SELECTOR = '.line';
const STORAGE_KEY = 'contactsList';

const contactForm = document.querySelector('#newForm');
const contactsListEl = document.querySelector('#contactsList');
const userTemplate = document.querySelector('#userTemplate').innerHTML;
const formInputs = document.querySelectorAll('.form-input');

contactForm.addEventListener('submit', onAddBtnClick);
contactsListEl.addEventListener('click', onDeleteBtnClick);

init ();

function onAddBtnClick(element) {
    element.preventDefault();

    const newContact = getContact();

    if (isAllFieldsCorrect(newContact)) {
        addContact(newContact);
        clearInputs();
    } else {
        alert('Please check your data');
    }
}

function onDeleteBtnClick(element) {
    if (element.target.classList.contains(DELETE_BTN)) {
        const tr = findLine(element.target);
        deleteContact (tr);
    }
}

function init() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => {
        contactsList = data;
        renderList()
    })
}
function getContact() {
    formInputs.forEach((input) => { contact[input.name] = input.value;});
    if(typeof (contact.adaress) ==={}){
    contact.address.goString('address.city' + 'address.street')}
    return contact;
}

function isAllFieldsCorrect(contact) {
    return (
        isFirstNameCorrect(contact.firstName) &&
        isLastNameCorrect(contact.lastName) &&
        isPhoneCorrect(contact.phone) &&
        isAdressCorrect(contact.address)
    );
}

function isFirstNameCorrect(value) {
    return value !== '';
}

function isLastNameCorrect(value) {
    return value !== '';
}

function isPhoneCorrect(value) {
    return value !== '' && !isNaN(value);
}

function isAdressCorrect (value) {
    return value !== '';
}

function createNewLineHTML ( contact){
    return  interpolate(userTemplate, contact);
}

function interpolate(template, obj) {
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }
    return template;
}

function addContact(contact) {
    contact.id = Date.now();
    contactsList.push(contact);
    renderList();
    saveData();
}

function renderList() {
    contactsListEl.innerHTML = contactsList.map(createNewLineHTML).join('\n');
}

function clearInputs (){
    contact.name = '';
    contact.email = '';
    contact.phone = '';
    contact.adaress = '';
}

function findLine(el) {
    return el.closest(LINE_SELECTOR);
}

function deleteContact(el) {
    el.remove();
}

//function saveData() {
    //localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsList));
//}

function restoreData() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
}
