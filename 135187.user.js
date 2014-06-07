// ==UserScript==
// @name        Shufuni Login Fix
// @namespace   http://userscripts.org/users/88482
// @description Fixes shufuni login
// @include     http://www.shufuni.com/*
// @version     1
// ==/UserScript==

var button = document.getElementById('SignInBtn');

var formDiv = document.getElementById('SignInWrapper').children[0].children[2];

var form = document.createElement('form');

formDivNew = formDiv.cloneNode(true);
form.appendChild(formDivNew);
formDiv.parentNode.appendChild(form);

formDiv.parentNode.removeChild(formDiv);

var button2 = document.getElementById('SignInBtn');

button2.onclick=null;

button2.type='submit';

form.onsubmit = function() {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
    
    button.dispatchEvent(evt);
    
    return false;
}
