// ==UserScript==
// @name          Auto FillV10
// @namespace     Kevin
// @author        Kevin Watson
// @version       1.00
// @description	  Creating Button
// @include       http://dev-herefordshire-007-000.abritas.local*
// ==/UserScript==
GM_setValue("start", -1);
window.onload = function() {
alert('load: ' + GM_getValue("start", -1))
if(GM_getValue("start", -1) == 1) { 
    //Should have loaded currenthome
	currenthome();
}
}
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
GM_setValue("start", 0);
newuser();
}

function create(){
document.getElementById('RegistercmdRegister').click();
GM_setValue("start", 1);
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