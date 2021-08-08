
var firebaseConfig = {
    apiKey: "AIzaSyB5rtRQGzzHeqfONoUPRxAwtjsHlP3b9sU",
    authDomain: "todos1-9ae7d.firebaseapp.com",
    projectId: "todos1-9ae7d",
    storageBucket: "todos1-9ae7d.appspot.com",
    messagingSenderId: "172204282161",
    appId: "1:172204282161:web:018b9720c29dfdfd706010"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
const db = firebase.firestore();

const spandate = document.querySelector('#date');
const spanmonth = document.querySelector('#month');
const spanyear = document.querySelector('#year');
const spanweekdays = document.querySelector('#weekday');


  function loadbody() {
    // console.log('body is loaded');
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const myDate = date.getDate();
    const year = date.getFullYear();
    const day = date.toLocaleDateString('default', { weekday: 'long' });
   
    spandate.innerText = myDate;
    spanmonth.innerText = month;
    spanyear.innerText = year;
    spanweekdays.innerText = day;
}

auth.onAuthStateChanged(user=>{
  if (user) {
    
    console.log('user signed in');
    
  }else{
    console.log('need to login ');
    window.location = 'index.html';
  }
});

//retrieving todos from firebase
function renderData(individualDoc) {

    // parent div
    let parentDiv = document.createElement("div");
    parentDiv.className = "container todo-box";
    parentDiv.setAttribute('data-id', individualDoc.id);

    // to do div
    let todoDiv = document.createElement("div");
    todoDiv.textContent = individualDoc.data().todos;

    // button
    let trash = document.createElement("button");

    let i = document.createElement("i");
    i.className = "fas fa-trash";

    // appending
    trash.appendChild(i);

    parentDiv.appendChild(todoDiv);
    parentDiv.appendChild(trash);
    const todoContainer = document.querySelector('#todo-container');
    todoContainer.appendChild(parentDiv);

    // trash clicking event
    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection(user.uid).doc(id).delete();
            }
        })
    })
}


//reciving username
auth.onAuthStateChanged(user=> {
  if (user) {
    
   const username= document.getElementById('username');
 
 db.collection('users').doc(user.uid).get().then(snapshot=>{
   username.innerText = snapshot.data().Name;
 });
    
  }
});

// adding todos to firestore database
const form = document.getElementById('form');
let date = new Date();
let time = date.getTime();
let counter = time;
form.addEventListener('submit', e => {
    e.preventDefault();
    const todos = form['todos'].value;
    // console.log(todos);
    let id = counter += 1;
    form.reset();
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection(user.uid).doc('_' + id).set({
                id: '_' + id,
                todos
            }).then(() => {
                console.log('todo added');
            }).catch(err => {
                console.log(err.message);
            });
        }
        else {
            // console.log('user is not signed in to add todos');
        }
    })
})

//logut

function logout(){
  auth.signOut();
  
  window.location = 'index.html';
}

// realtime listners
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection(user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type == "added") {
                    renderData(change.doc);
                }
                else if (change.type == 'removed') {
                    let li = todoContainer.querySelector('[data-id=' + change.doc.id + ']');
                    todoContainer.removeChild(li);
                }
            })
        })
    }
})
