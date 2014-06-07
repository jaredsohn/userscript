// ==UserScript==
// @name          Auto Fill
// @namespace     Kevin
// @author        Kevin Watson
// @version       1.00
// @description	  Creating Button
// @include       https://test4.home-point.info*
// ==/UserScript==

var zNode = document.createElement('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Auto-Fill EHO</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
newuser();
currenthome();
}

function create(){
document.getElementById('RegistercmdRegister').click();
var timeout = window.setTimeout(function() {
window.alert("Done Loading");
}, 10000);
}

function next(){
document.getElementById('SaveBtnTop').click();
}

function newuser(){
document.getElementById('RegisterTitle').selectedIndex=4;
document.getElementById('RegisterFirstName').value='John';
document.getElementById('RegisterFamilyName').value='Smith';
document.getElementById('RegisterDateOfBirth').value='21/07/1986';
document.getElementById('RegisterSexID').selectedIndex=2;
document.getElementById('RegisterLoginPassword_new').value='21/07/1986';
document.getElementById('RegisterLoginPassword_newconfirm').value='21/07/1986';
create();
}

function currenthome(){
document.getElementById('HousingCircumstances').selectedIndex=2;
document.getElementById('PeopleInProperty').selectedIndex=1;
document.getElementById('BedroomsInProperty').selectedIndex=2;
next();
}