 // Your web app's Firebase configuration
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
  
  const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginEmail = loginForm['login-email'].value;
    const loginPassword = loginForm['login-password'].value;
    // console.log(loginEmail, loginPassword);
    auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(() => {
        console.log('login success');
        window.location = "User.html";
    }).catch(err => {
        const loginError = document.getElementById("loginError");
        loginError.innerText = err.message;
    })
})