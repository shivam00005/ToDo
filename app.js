
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

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = signupForm['name'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    
    // console.log(name, email, password);
    signupForm.reset();
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        // console.log(cred);
        return db.collection('users').doc(cred.user.uid).set({
            Name: name,
            Email: email,
            Password: password,
            sign_up_date: Date.now()
            
        }).then(() => {
           // console.log('success');
          window.location = "login.html";
          
           
        }).catch(err => {
            // console.log(err.message);
            const signupError = document.getElementById('signupError');
            signupError.innerText = err.message;
        })
    }).catch(err => {
        // console.log(err.message);
        const signupError2 = document.getElementById('signupError');
        signupError2.innerText = err.message;
    })
})