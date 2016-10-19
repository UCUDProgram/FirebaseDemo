var first = "";
var last = "";
var DB = new Firebase("https://fir-demo-f619a.firebaseio.com");

var setFirst = function(){
    first = document.getElementById("fName").value;
};

var setLast = function(){
    last = document.getElementById("lName").value;
};

var personSubmit = function(){
  var regData = DB.child("Names");
  regData.push().set({firstname: first, 
                      lastname: last
                    });
    getPeople();
};

var getPeople = function(){
    var $div = document.getElementById("names");
    $div.innerHTML = '';
    var namesDB = new Firebase('https://fir-demo-f619a.firebaseio.com/Names');
     namesDB.on("value", function(snapshot){
        var index =0;
        snapshot.forEach(function (childSnapshot){
          var aFirst = childSnapshot.val().firstname;
          var aLast = childSnapshot.val().lastname;
        renderPerson(aFirst,aLast);
        index++;
      });
})}; 

var renderPerson = function(firstName, lastName){
    var $div = document.getElementById("names");
    var $namediv = document.createElement("div");
    
    var $fnamediv = document.createElement("div");
    $fnamediv.innerHTML = firstName;
    $fnamediv.classList.add('rowBlockFirst');
    $namediv.appendChild($fnamediv);
    
    var $lnamediv = document.createElement("div");
    $lnamediv.innerHTML = lastName;
    $lnamediv.classList.add('rowBlock');
    $namediv.appendChild($lnamediv);
    
    
    var $editButton = document.createElement("button");
    $editButton.setAttribute("type","button");
    var buttonName = firstName.concat(lastName).concat("Edit"); 
    $editButton.setAttribute("id",buttonName);
    $editButton.innerHTML ="Edit";
    $namediv.appendChild($editButton);
    
    
    $div.appendChild($namediv);
    
};

var appStart = function(){
    getPeople();
    
     document.getElementById("fName").addEventListener("blur",setFirst);
    document.getElementById("lName").addEventListener("blur",setLast);
    document.getElementById("addPerson").addEventListener("click",personSubmit);

    
};

document.addEventListener('DOMContentLoaded',appStart);