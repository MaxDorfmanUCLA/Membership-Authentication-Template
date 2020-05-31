
// listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        console.log('user logged in:', user);
    } else {
        console.log('user logged out');
    }
})

function myFunction() {
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;
    console.log(email);
    console.log(password);
    if (email === "" || password === ""){
        //display message in red: all fields are required
        document.getElementById("error").innerHTML = "*all fields are required";
    }
    else if (!email.includes("@") || !email.includes(".")){
        //display message in red: please enter a valid email
        document.getElementById("error").innerHTML = "*please enter a valid email";
    } 
   
    else{
        document.getElementById("error").innerHTML = "";
        auth.signInWithEmailAndPassword(email, password)
        .catch(err => {
            console.log(err);
            console.log(err.message);
            document.getElementById("error").innerHTML = err.message;
        })
        .then(cred => {
            console.log(cred);
            setTimeout(() => {
                document.location.href = "main.html";
            }, 1000);
        });
    }
}
