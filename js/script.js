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
    storageBucket: "my-todo-app-4561e.firebasestorage.app",
    messagingSenderId: "88480486738",
    appId: "1:88480486738:web:4ae7a6b279eef7f769168b",
    measurementId: "G-33RCXF1NNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//My coding
const list = document.getElementById("list");

const getData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        let htmlContent = ""; // Accumulate HTML here
        querySnapshot.forEach(docSnapshot => {
            const divPar = document.createElement("div");
            const divChi = document.createElement("div");
            const imgChik = document.createElement("img");
            const par = document.createElement("p");
            const imgPoin = document.createElement("img");

            divPar.classList.add("todo");
            list.appendChild(divPar);

            divChi.classList.add("todo-con");
            divPar.appendChild(divChi);

            imgChik.setAttribute(
                "src",
                docSnapshot.data().complete
                    ? "/img/checked.png"
                    : "/img/unchecked.png"
            );

            imgChik.setAttribute("width", "25px");

            const textForPar = document.createTextNode(
                `${docSnapshot.data().title}`
            );
            par.appendChild(textForPar);

            imgPoin.setAttribute("src", "/img/dots.svg");

            imgPoin.setAttribute("width", "25px");

            divChi.appendChild(imgChik);

            divChi.appendChild(par);
            divChi.appendChild(imgPoin);
        });
    } catch (err) {
        console.log(err);
    }
};
getData();


const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click",{

});

const setData = () => {

}


