
function myFunction() {
    
    var firstname = document.getElementById("fname").value;
    var lastname = document.getElementById("lname").value;
    var email = document.getElementById("mail").value;
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    function writeUserData(firstname, lastname, email) {
        firebase.database().ref(`pending-users/${lastname}`).set({
          FirstName: firstname,
          LastName: lastname,
          Email: email
        });
    }
    if (firstname === "" || lastname === "" || email === ""){
        //display message in red: all fields are required
        document.getElementById("error").innerHTML = "*all fields are required";
    }
    else if (!email.includes("@") || !email.includes(".")){
        //display message in red: please enter a valid email
        document.getElementById("error").innerHTML = "*please enter a valid email";
    } else{
        document.getElementById("error").innerHTML = "";
        writeUserData(firstname, lastname, email);
        window.alert("An email was sent to the Pivot-Travel team. Your application is under review. This process can take up to 48 hours at which time you will recieve an email with a link to sign up. Thank you for choosing Pivot-Travel!");
        setTimeout(() => {
            document.location.href = "home.html";
        }, 2000);
    }
}