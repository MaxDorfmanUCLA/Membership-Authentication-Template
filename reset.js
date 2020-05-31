function resetPassword(){
    var email = document.getElementById('email').value;
    if (email === ""){
        //display message in red: all fields are required
        //document.getElementById("error").innerHTML = "*please enter your account email to send password reset link";
        document.getElementById("error").innerHTML = "*please enter your account email to send password reset link";
    } else {
        document.getElementById("error").innerHTML = "";
        auth.sendPasswordResetEmail(email)
        .then(() => {
            window.alert(`Password reset email sent to ${email}, check your inbox.`);
        }).catch((error) => {
        window.alert(error);
    })
    }
}
