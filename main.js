// in html (e) => {addUser(e);}
var hotels = document.getElementsByClassName("h");
var hotelsLength = hotels.length;
for (var i=0; i<hotelsLength; i++){
    hotels[i].addEventListener("click", (e) => {userTrack(e);});
}

function userTrack(e) {
    console.log(e);
    var rawCity = e.target;
    // var city = rawCity. take out chars and spaces
    var rawHotel = e.target;
    // var hotel = rawHotel. take out chars and spaces
    var currentCityAndHotel = firebase.database().ref(`UserTracking/${city}/${hotel}`);
    currentCityAndHotel.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
                    var clicks = childSnapshot.val();
                    console.log(click);
                    console.log("visit number = ", clicks.Visits);
                    var currentNum = clicks.Visits;
                    var newNum = currentNum + 1;
                    currentCityAndHotel.set({
                        Visits: newNum
                    });
        });
    });
}

 // listen for auth status changes

// function searchFunction() {
//     search = document.getElementById('search');
//     for (var i=0; i<9; i++){
//         city = document.getElementById(`city${i}`);
//         hotel = document.getElementById(`hotel${i}`);
//         city.style.visibility = "visible";
//         hotel.style.visibility = "visible";
//         if (city.innerHTML.toLowerCase().includes(search.value) === false){
//             console.log("no match");
//             city.style.visibility = "hidden";
//             hotel.style.visibility = "hidden";
//         }
//     }
    
// }

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
$('html').click(function() {
  var e = document.getElementById("myDropdown");
       if(e.style.display === 'block'){
          e.style.display = 'none';
       }
       else {
          e.style.display = 'none';
       }
});

function searchFunction() {
      var e = document.getElementById("myDropdown");
      event.stopPropagation();
      e.style.display = 'block';
  }
  
  function filterFunction() {
    var input, filter, c, h, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    c = div.getElementsByClassName("c");
    h = div.getElementsByClassName("h");
    for (i = 0; i < c.length; i++) {
      var txtValue = c[i].textContent || c[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        c[i].style.display = "";
      } else {
        c[i].style.display = "none";
      }
    }
    for (i = 0; i < h.length; i++) {
        var txtValue = h[i].innerHTML;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          h[i].style.display = "";
        } else {
          h[i].style.display = "none";
        }
      }
  }

  