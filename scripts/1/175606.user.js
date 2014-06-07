// ==UserScript==
// @name            Ourtool
// @namespace       #sourcecon us
// @include         http://www.linkedin.com/profile?viewProfile=&key=*
// @include         http://www.linkedin.com/ppl/webprofile*
// @include			http://www.linkedin.com/profile/view?id=*
// @include         https://www.linkedin.com/profile?viewProfile=&key=*
// @include         https://www.linkedin.com/ppl/webprofile*
// @include			https://www.linkedin.com/profile/view?id=*
// @include			http://www.linkedin.com/pub/*
// @include			https://www.linkedin.com/pub/*
// @include			http://www.linkedin.com/in/*
// @include			http://www.linkedin.com/company/*
// @include			https://www.linkedin.com/company/*
// ==/UserScript==

window.addEventListener("load", function() { 
//.user.js
// append at end
document.getElementById( 'ad-slot-3' ).innerHTML='<input id="greasemonkeyButton" type="button" value="Copy Profile" />'
addButtonListener();
}, false);
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey,true);
}
 
function doMonkey(){
var UUrl = document.location.href;
var html = document.getElementsByTagName('html')[0];
var text = html.innerHTML;
  GM_setClipboard(text);
}