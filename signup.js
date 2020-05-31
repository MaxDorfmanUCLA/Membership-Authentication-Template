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
    
    var firstname = document.getElementById("fname").value;
    var lastname = document.getElementById("lname").value;
    var email = document.getElementById("mail").value;
    var password = document.getElementById("pword").value;
    var password2 = document.getElementById("pword2").value;
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(password);
    function writeUserData(firstname, lastname, email) {
        firebase.database().ref(`users/${email}`).set({
          FirstName: firstname,
          LastName: lastname,
          Email: email
        });
    }
    if (firstname === "" || lastname === "" || email === "" || password === ""){
        //display message in red: all fields are required
        document.getElementById("error").innerHTML = "*all fields are required";
    }
    else if (password !== password2){
        //display message in red: passwords must match
        document.getElementById("error").innerHTML = "*passwords must match";
    }
    else if (password.length < 6){
        //display message in red: passwords must match
        document.getElementById("error").innerHTML = "*password must be at least 6 characters";
    }
    else if (!email.includes("@") || !email.includes(".")){
        //display message in red: please enter a valid email
        document.getElementById("error").innerHTML = "*please enter a valid email";
    } else{
        document.getElementById("error").innerHTML = "";
       
        auth.createUserWithEmailAndPassword(email, password)
        .catch(err => {
            console.log(err.message);
            document.getElementById("error").innerHTML = err.message
            // make another timer that sends them to signup page
            //document.location.href = newUrl;
        })
        .then(cred => {
            console.log(cred);
            setTimeout(() => {
                document.location.href = "main.html";
            }, 1000);
            // add last signed in in database
            writeUserData(firstname, lastname, email);
        });
        
    }
}