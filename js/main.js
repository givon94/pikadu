// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0O6iuXLHb1kEsY06XCxBYa-OU7AVRlHo",
  authDomain: "pikadu-ac29a.firebaseapp.com",
  databaseURL: "https://pikadu-ac29a.firebaseio.com",
  projectId: "pikadu-ac29a",
  storageBucket: "pikadu-ac29a.appspot.com",
  messagingSenderId: "388833115003",
  appId: "1:388833115003:web:d11f9138ea95d9a0679bde"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase)



let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w\.\w{2,}$/;

const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit'),
  editelem = document.querySelector('.edit'),
  editContainer= document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username'),
  editPhotoURL = document.querySelector('.edit-photo'),
  userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts'),
  buttonNewPost = document.querySelector('.button-new-post'),
  addPostElem = document.querySelector('.add-post');

const listUsers = [
  {
    id: '01',
    email: 'alex@mail.com',
    password: '12345',
    displayName: 'Alex',
    photo: 'https://i007.fotocdn.net/s123/2950fc2e1fadccab/user_xl/2816616767.jpg',
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
    //if (!regExpValidEmail.test(email)) return alert('email не валиден');

    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);

      if (handler) handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    //if (!regExpValidEmail.test(email)) return alert('email не валиден');
    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }

    if (!this.getUser(email)) {
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};

      listUsers.push(user);
      this.authorizedUser(user);
      if (handler) handler();
    } else {
      alert('Пользователь с таким email уже зарегистрироан');
    }
  },

  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }

    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    if (handler) handler();
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

const setPosts = {
  allPosts: [
    {
      title: 'Заголовлок поста',
      text: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!`,
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'alex', photo: 'https://i007.fotocdn.net/s123/2950fc2e1fadccab/user_xl/2816616767.jpg'},
      date: '13.11.2020, 20:54:00 ',
      like: 15,
      comments: 5
    },
    {
      title: 'Заголовлок поста2',
      text: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!`,
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'kate', photo: 'https://i007.fotocdn.net/s123/2950fc2e1fadccab/user_xl/2816616767.jpg'},
      date: '13.11.2020, 23:54:00 ',
      like: 15,
      comments: 5
    }
  ],
  addPost(title, text, tags, handler) {

    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })


    if (handler) handler();
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
  
};

const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPosts.forEach(({title, text, date, tags, like, comments, author}) => {

    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
        ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
      </div>
    </div>
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src=${author.photo || 'img/no-avatar.png'} alt="avatar" class="author-avatar"></a>
      </div>
    </div>
  </section>
    `;
  });

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
}


const init = () => {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
  
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });
  
  loginSignup.addEventListener('click', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
  
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });
  
  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  
  });
  
  editelem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });
  
  editContainer.addEventListener('submit', event => {
    event.preventDefault();
  
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  menuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('visible');
  })

  buttonNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', (event) => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;

    if (title.value.length < 6) {
      alert('Слишком короткий заголовок');
      return;
    }

    if (text.value.length < 50) {
      alert('Слишком короткий пост');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  showAllPosts();
  toggleAuthDom();
}


document.addEventListener('DOMContentLoaded', init);