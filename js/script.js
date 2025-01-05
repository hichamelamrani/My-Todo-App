// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx4Oes7LEjIvBpFNSPLguK5bugz8cOcOU",
  authDomain: "my-todo-app-4561e.firebaseapp.com",
  projectId: "my-todo-app-4561e",
  storageBucket: "my-todo-app-4561e.appspot.com",
  messagingSenderId: "88480486738",
  appId: "1:88480486738:web:4ae7a6b279eef7f769168b"
};

// Initialize Firebase
const app = initializeApp(
  firebaseConfig);
const db = getFirestore(app);

// Get the todo list element
const todoList = document
  .getElementById("list");

// Function to fetch todos from Firestore
async function fetchTodos() {
  const todosCollection = collection(
    db, "todos");

  try {
    const todoSnapshot =
      await getDocs(todosCollection);
    const todos = todoSnapshot.docs
      .map(doc => createTodoHTML(doc))
      .join("");
    todoList.innerHTML = todos;
  } catch (error) {
    console.error(
      "Error fetching documents: ",
      error);
  }
}

// Function to create HTML for a todo item
function createTodoHTML(doc) {
  const data = doc.data();
  return `<div class="todo" data-id="${doc.id}">
            <img src="/img/${data.complete ? "checked" : "unchecked"}.png" width="25px">
            <p class="${data.complete ? "compTodo" : "unCompTodo"}">${data.title}</p>
            <img src="/img/dots.svg" width="25px" class="dots" id="dotsOp">
            <div class="poupWin" style="display: none;">
              <div class="popupChi">
                <button class="deleteBtn">Delete</button>
                <button class="editBtn">Edit</button>
              </div>
            </div>
          </div>`;
}

// Event listener for click events
document.addEventListener("click",
  event => {
    const el = event.target.closest(
      ".todo");

    if (event.target.closest(
      ".dots")) {
      togglePopup(event.target);
    } else if (el) {
      updateComplet(el);
    } else {
      hideAllPopups();
    }
  });

// Function to toggle the popup window
function togglePopup(target) {
  const popup = target.closest(".todo")
    .querySelector(".poupWin");
  popup.style.display = popup.style
    .display === "flex" ? "none" :
    "flex";
}

// Function to hide all popup windows
function hideAllPopups() {
  document.querySelectorAll(".poupWin")
    .forEach(popup => {
      popup.style.display = "none";
    });
}

// Function to update the completion status of a todo
async function updateComplet(el) {
  const docId = el.getAttribute(
    "data-id");
  const isComplete = el.querySelector(
    'p').classList.contains(
    'compTodo');
  const newCompleteState = !
  isComplete;

  const todoRef = doc(db, "todos",
    docId);
  try {
    await updateDoc(
    todoRef, { complete: newCompleteState });
    updateTodoUI(el,
    newCompleteState);
  } catch (e) {
    console.log(e);
  }
}

// Function to update the UI based on the new completion status
function updateTodoUI(el,
  newCompleteState) {
  const p = el.querySelector('p');
  const img = el.querySelector(
    'img:first-child');
  if (newCompleteState) {
    p.classList.add('compTodo');
    p.classList.remove('unCompTodo');
    img.src = '/img/checked.png';
  } else {
    p.classList.add('unCompTodo');
    p.classList.remove('compTodo');
    img.src = '/img/unchecked.png';
  }
}

// Get the add button and input elements
const addBtn = document.getElementById(
  "addBtn");
const input = document.getElementById(
  "input");

// Event listener for the add button
addBtn.addEventListener("click", (
e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (value) {
    addData(value);
  }
});

// Function to add a new todo to Firestore
async function addData(value) {
  try {
    await addDoc(collection(db,
      "todos"), { title: value,
      complete: false });
    console.log(
      "Your Todo is added successfully"
      );
    fetchTodos
  (); // Refresh the list after adding a new todo
  } catch (err) {
    console.log(err);
  }
}

// Fetch todos on page load
fetchTodos();
