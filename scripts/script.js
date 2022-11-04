fetch("https://rickandmortyapi.com/api/character/?status=alive&species=human")
  .then((response) => response.json())
  .then((data) => renderCharacters(data.results));

const wrapper = document.querySelector(".post-wrapper");
function renderCharacters(character) {
  character.map((element) => {
    wrapper.innerHTML += `
    <div class="user ${element.gender == "Male" ? "male" : "female"}">
      <img class="img" src=${element.image}>
      <p class="name">${element.name}</p>
      <p class="gender">Gender: ${
        element.gender == "Male" ? "Мужской" : "Женский"
      }</p>
      <p class="species">Species: ${
        element.species == "Human" ? "Человек" : "Инопланетянин"
      }</p>
      <p class="status">Status: ${element.status}</p>
      <button class="delete-btn">Delete</button>
    </div>
    `;
  });
}


// deleting user
document.addEventListener("click", (e) => {
  if (e.target.className == "delete-btn") {
    e.target.parentNode.remove();
  }
});

// фильтрация уже имеющихся данных(male/female)
let clicked = false;
let males;
let females;

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.className.includes("link")) {
    if (!clicked) {
      males = document.querySelectorAll(`.user.male`);
      females = document.querySelectorAll(`.user.female`);
      clicked = true;
    }
    const secondClass = e.target.classList[1];
    if (secondClass === "male") {
      males.forEach(male => male.style.display = "block");
      
      females.forEach(female => female.style.display = "none");
      
    } else {
      males.forEach(male => male.style.display = "none");
      
      females.forEach(female => female.style.display = "block");
      
    }
  }
});

// ----------------- Seting username

const saveButton = document.querySelector('.header__set-username');
const usernameContainer = document.querySelector('.header__username-container');

let username;


function saveValue(e) {
  const value = e.value;
  localStorage.setItem('name', value);
}

function getSavedValue() {
  if (!localStorage.getItem('name')) {
    return "";
  }
  return localStorage.getItem('name');
}

function setName() {
  if (!localStorage.getItem('name')) {
    usernameContainer.insertAdjacentHTML('beforebegin', `
    <input class="header__username" type="text" name="" id="" placeholder="Enter username..." onkeyup="saveValue(this)">
    `);
  }
  else {
    usernameContainer.insertAdjacentHTML('beforebegin', `<p>${getSavedValue()}</p>`);
    saveButton.disabled = true;
    saveButton.classList.add('disabled');
  }
}

setName();
// localStorage.clear();

saveButton.addEventListener('click', () => {
  setName();
  const input = document.querySelector('.header__username');
  input.style.display = 'none';
  saveButton.classList.add('disabled');
  saveButton.disabled = true;
});


// --------------------------------
