var first = "";
var last = "";
var DB = new Firebase("https://fir-demo-f619a.firebaseio.com");

var setFirst = function(){
    first = document.getElementById("fName").value;
};

var setLast = function(){
    last = document.getElementById("lName").value;
};

var deletePerson = function(aKey){
    var nameDB = new Firebase('https://fir-demo-f619a.firebaseio.com/Names');
    nameDB.child(aKey).remove();
    getPeople();
};

var personSubmit = function(){
  var regData = DB.child("Names");
  regData.push().set({firstname: first, 
                      lastname: last
                    });
    getPeople();
    inputReset();
};

var inputReset = function(){
  document.getElementById("fName").value = "";
  document.getElementById("lName").value = "";
};

var editItem = function(personDiv, first, last,pKey){
    var newFirst = first;
    var newLast = last;
  var $div =document.getElementById(personDiv);
  $div.innerHTML = "";
  var $fnameInput = document.createElement("input");
  $fnameInput.setAttribute("type", "text");
  $fnameInput.setAttribute("id", "fnameText");
  $fnameInput.setAttribute("value", first);
  $fnameInput.innerHTML = first;
  $fnameInput.addEventListener("blur", function(ev){
         newFirst = document.getElementById("fnameText").value;
        // console.log(newFirst);
    });
 $div.appendChild($fnameInput);
 
  var $lnameInput = document.createElement("input");
  $lnameInput.setAttribute("type", "text");
  $lnameInput.setAttribute("id", "lnameText");
  $lnameInput.setAttribute("value", last);
  $lnameInput.addEventListener("blur", function(ev){
        newLast = document.getElementById("lnameText").value;
        // console.log(newLast);
    });
      $div.appendChild($lnameInput);
var $updateButton = document.createElement("button");
    $updateButton.setAttribute("type","button");
    var buttonName = first.concat(last).concat("Update"); 
    $updateButton.setAttribute("id",buttonName);
    $updateButton.innerHTML ="Update";
    $updateButton.addEventListener("click", function(ev){
        var nameDB = new Firebase('https://fir-demo-f619a.firebaseio.com/Names');
        nameDB.child(pKey).update({firstname: newFirst, 
                      lastname: newLast
                    } );
        getPeople();
    });
    $div.appendChild($updateButton);
    
    var $cancelButton = document.createElement("button");
    $cancelButton.setAttribute("type","button");
    $cancelButton.setAttribute("id","cancel");
    $cancelButton.innerHTML ="Cancel";
    $cancelButton.addEventListener("click", function(ev){
        getPeople();
    });
    $div.appendChild($cancelButton);
  
  
};

var getPeople = function(){
    var $div = document.getElementById("names");
    $div.innerHTML = '';
    var namesDB = new Firebase('https://fir-demo-f619a.firebaseio.com/Names');
     namesDB.on("value", function(snapshot){
        var index =0;
        snapshot.forEach(function (childSnapshot){
            var itemKey = childSnapshot.key();
          var aFirst = childSnapshot.val().firstname;
          var aLast = childSnapshot.val().lastname;
        renderPerson(aFirst,aLast,itemKey);
        index++;
      });
})}; 

var renderSelectionOption = function(){
    var $div = document.getElementById("ageOptions");
    
    var $ageClassify = document.createElement("select");
//   $ageClassify.setAttribute("type", "text");
  $ageClassify.setAttribute("name", "age");
  $ageClassify.addEventListener("blur", function(ev){
 
       
    });
      
      
      var $infantClassify = document.createElement("option");
//   $ageClassify.setAttribute("type", "text");
  $infantClassify.setAttribute("value", "Infant");
  $infantClassify.innerHTML = "Infant";
  $infantClassify.classList.add("Infant");
  $infantClassify.addEventListener("change", function(ev){
        
    });
      $ageClassify.appendChild($infantClassify);
      
      
      var $childClassify = document.createElement("option");
//   $ageClassify.setAttribute("type", "text");
 $childClassify.setAttribute("value", "Child");
  $childClassify.innerHTML = "Child";
  $childClassify.classList.add("Child");
  $childClassify.addEventListener("blur", function(ev){
        
        
    });
      $ageClassify.appendChild($childClassify);
      
      
      var $adultClassify = document.createElement("option");
//   $ageClassify.setAttribute("type", "text");
   $adultClassify.setAttribute("value", "Adult");
  $adultClassify.innerHTML = "Adult";
  $adultClassify.classList.add("Adult");
    $adultClassify.addEventListener("blur", function(ev){
        
        
    });
      $ageClassify.appendChild($adultClassify);
      
      
      var $seniorClassify = document.createElement("option");
//   $ageClassify.setAttribute("type", "text");
  $seniorClassify.setAttribute("value", "Senior");
  $seniorClassify.innerHTML = "Senior";
  $seniorClassify.classList.add("Senior");
  $ageClassify.addEventListener("blur", function(ev){
        
        
    });
      $ageClassify.appendChild($seniorClassify);
      
      
//       var $defaultClassify = document.createElement("option");
// //   $ageClassify.setAttribute("type", "text");
// $seniorClassify.setAttribute("value", "Choose Age");
//   $seniorClassify.innerHTML = "Choose Person's Age";
//   $seniorClassify.classList.add("Choose Person's Age");
//   $ageClassify.addEventListener("blur", function(ev){
       
       
//     });
//       $ageClassify.appendChild($defaultClassify);
      
      $div.appendChild($ageClassify);
};

var renderPerson = function(firstName, lastName,itemKey){
    var $div = document.getElementById("names");
     var divName = firstName.concat(lastName); 
    var $namediv = document.createElement("div");
    $namediv.setAttribute("id",divName);
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
    $editButton.addEventListener("click", function(ev){
        editItem(divName,firstName,lastName, itemKey);
    });
    $namediv.appendChild($editButton);
    
    var $deleteButton = document.createElement("button");
    $deleteButton.setAttribute("type","button");
    var buttonName = firstName.concat(lastName).concat("Delete"); 
    $deleteButton.setAttribute("id",buttonName);
    $deleteButton.innerHTML ="Delete";
    $deleteButton.addEventListener("click", function(ev){
        deletePerson(itemKey);
    });
    $namediv.appendChild($deleteButton);
    
    $div.appendChild($namediv);
    
};

var appStart = function(){
    getPeople();
    renderSelectionOption();
    
    document.getElementById("fName").addEventListener("blur",setFirst);
    document.getElementById("lName").addEventListener("blur",setLast);
    document.getElementById("addPerson").addEventListener("click",personSubmit);

    
};

document.addEventListener('DOMContentLoaded',appStart);