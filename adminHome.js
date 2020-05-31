
function deleteChild() { 
    var e = document.getElementById("myUL"); 
    
    //e.firstElementChild can be used. 
    var child = e.lastElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild; 
    } 
} 
function getList(){
    
var pendingUsers = firebase.database().ref('pending-users/');
pendingUsers.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
                var data = childSnapshot.val();
                console.log(data.Email);
                var li = document.createElement("li");
                var a = document.createElement("div");
                var b = document.createElement("div");
                var c = document.createElement("div");
                var d = document.createElement("div");
                a.innerText = data.FirstName;
                b.innerText = data.LastName;
                c.innerText = data.Email;
                d.innerText = data.Password;
                        
                        li.appendChild(a);
                        li.appendChild(b);
                        li.appendChild(c);
                        li.appendChild(d);
                document.getElementById("myUL").appendChild(li);

                var buttonHolder = document.createElement("SPAN");
                var accept = document.createElement("BUTTON");
                
                accept.innerText="Accept User";
                accept.className = "accept";
                
                accept.addEventListener('click', (e) => {addUser(e);});
                buttonHolder.appendChild(accept);

                

                var deny = document.createElement("BUTTON");
                
                deny.innerText="Deny User";
                deny.className = "deny";
                
                deny.addEventListener('click', (e) => {deleteUser(e);});
                buttonHolder.appendChild(deny);
                buttonHolder.className="buttonHolder";
                li.appendChild(buttonHolder);
            });
});
}

function getList2(){
    var pendingUsers = firebase.database().ref('denied-users/');
    pendingUsers.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
                    var data = childSnapshot.val();
                    console.log(data.Email);
                    var li = document.createElement("li");
                    var a = document.createElement("div");
                    var b = document.createElement("div");
                    var c = document.createElement("div");
                    var d = document.createElement("div");
                    a.innerText = data.FirstName;
                    b.innerText = data.LastName;
                    c.innerText = data.Email;
                    d.innerText = data.Password;
                        
                        li.appendChild(a);
                        li.appendChild(b);
                        li.appendChild(c);
                        li.appendChild(d);
                    document.getElementById("myUL2").appendChild(li);
                });
    });
    }

    function getList3(){
        var pendingUsers = firebase.database().ref('active-users/');
        pendingUsers.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                        var data = childSnapshot.val();
                        console.log(data.Email);
                        var li = document.createElement("li");
                        var a = document.createElement("div");
                        var b = document.createElement("div");
                        var c = document.createElement("div");
                        var d = document.createElement("div");
                        a.innerText = data.FirstName;
                        b.innerText = data.LastName;
                        c.innerText = data.Email;
                        d.innerText = data.Password;
                        
                        li.appendChild(a);
                        li.appendChild(b);
                        li.appendChild(c);
                        li.appendChild(d);
                        document.getElementById("myUL3").appendChild(li);
                    });
        });
        }
    

function addUser(e){
    var firstname = e.target.parentElement.parentElement.children[0].innerText;
    var lastname = e.target.parentElement.parentElement.children[1].innerText;
    var email = e.target.parentElement.parentElement.children[2].innerText;
    var codedpassword = e.target.parentElement.parentElement.children[3].innerText;
    var password = decode(codedpassword);
    
    acceptListAdd(firstname, lastname, email, password);
    removeUser(lastname);
    deleteChild();
    getList();
    getList2();
    getList3();
}

function deleteUser(e){
    var firstname = e.target.parentElement.parentElement.children[0].innerText;
    var lastname = e.target.parentElement.parentElement.children[1].innerText;
    var email = e.target.parentElement.parentElement.children[2].innerText;
    
    
    denyListAdd(firstname, lastname, email);
    removeUser(lastname);
    deleteChild();
    getList();
    getList2();
    getList3();
}

function removeUser(lastname){
    var adaRef = firebase.database().ref(`pending-users/${lastname}`);
    adaRef.remove()
    .then(function() {
        console.log("Remove succeeded.")
    })
    .catch(function(error) {
        console.log("Remove failed: " + error.message)
    });
}

function denyListAdd(firstname, lastname, email) {
    firebase.database().ref(`denied-users/${lastname}`).set({
      FirstName: firstname,
      LastName: lastname,
      Email: email
    });
    
}

function acceptListAdd(firstname, lastname, email, password) {
    firebase.database().ref(`active-users/${lastname}`).set({
      FirstName: firstname,
      LastName: lastname,
      Email: email
    });
   
    auth.createUserWithEmailAndPassword(email, password)
    .catch(err => {
        console.log(err.message);
    })
    .then(cred => {
        console.log("user created in firebase auth");
    });
}

function decode(p){
    var decrypt = "";
    var chunk = ""
    var arr = []
    console.log(p);
    for (var i=0; i<p.length+1; i++){
        if (p[i] === "-" || i===p.length){
            arr.push(chunk);
            chunk = "";
        } else {
            chunk += p[i];
            console.log(chunk);
        }
    }
    console.log(chunk);
    for (var j=0; j<arr.length; j++){
        decrypt += String.fromCharCode(arr[j]);
    }
    return decrypt;
}

getList();
getList2();
getList3();
