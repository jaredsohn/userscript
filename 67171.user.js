// ==UserScript==
// @name           eM cp+
// @namespace      thanksgaryoak
// @include        http://www.epicmafia.com/game/index/*
// ==/UserScript==

var oldDiv, newDiv; 

oldDiv = document.getElementById('window');
if (oldDiv) {
   newDiv = document.createElement("div"); 
   newDiv.setAttribute('id', 'window'); 
   newDiv.setAttribute('class', 'window');
   newDiv.innerHTML = oldDiv.innerHTML;
   oldDiv.parentNode.replaceChild(newDiv, oldDiv);
}

var oldDiv2, newDiv2; 

oldDiv2 = document.getElementById('game');
if (oldDiv2) {
   newDiv2 = document.createElement("div"); 
   newDiv2.setAttribute('id', 'game'); 
   newDiv2.setAttribute('oncopy', 'return true;'); 
   newDiv2.innerHTML = oldDiv2.innerHTML;
   oldDiv2.parentNode.replaceChild(newDiv2, oldDiv2);
}

var oldDiv3, newDiv3; 

oldDiv3 = document.getElementById('typebox');
if (oldDiv3) {
   newDiv3 = document.createElement("input"); 
   newDiv3.setAttribute('id', 'typebox'); 
   newDiv3.setAttribute('maxlength', '250'); 
   newDiv3.setAttribute('name', 'message'); 
   newDiv3.setAttribute('type', 'text'); 
   newDiv3.innerHTML = oldDiv3.innerHTML;
   oldDiv3.parentNode.replaceChild(newDiv3, oldDiv3);
}

var oldDiv4, newDiv4; 

oldDiv4 = document.getElementById('cmds');
if (oldDiv4) {
   newDiv4 = document.createElement("div"); 
   newDiv4.setAttribute('id', 'cmds'); 
   newDiv4.setAttribute('class', 'cmds'); 
   newDiv4.innerHTML = oldDiv4.innerHTML;
   oldDiv4.parentNode.replaceChild(newDiv4, oldDiv4);
}

var oldDiv5, newDiv5; 

oldDiv5 = document.getElementById('leavetable');
if (oldDiv5) {
   newDiv5 = document.createElement("a"); 
   newDiv5.setAttribute('href', 'http://www.epicmafia.com/lobby/quitgame'); 
   newDiv5.setAttribute('id', 'leavetable'); 
   newDiv5.innerHTML = oldDiv5.innerHTML;
   oldDiv5.parentNode.replaceChild(newDiv5, oldDiv5);
}