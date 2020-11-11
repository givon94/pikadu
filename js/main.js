// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name');


const listUsers = [
  {
    id: '01',
    email: 'alex@mail.com',
    password: '12345',
    displayName: 'Alex'
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123456',
    displayName: 'Kate'
  },
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut() {
    console.log('logout')
  },
  signUp(email, password, handler) {
    if (!this.getUser(email)) {
      const user = {email, password, displayName: email};

      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрироан');
    }
  },
  getUser(email) {
    return listUsers.find((item) => {
      return item.email === email;
    });
  },
  authorizedUser(user) {
    this.user = user;
  }
}

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};


loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

loginSignup.addEventListener('click', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});


toggleAuthDom();