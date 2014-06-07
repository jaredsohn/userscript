// ==UserScript==
// @name           Dino Test Button
// @namespace      Dino
// @description    My testing
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// 


window.addEventListener("load", function(e) {
  addButton();
}, false);
 
function addButton(){
 var buttonElems = document.getElementsByTagName('buttonElementName');
 buttonElems[0].innerHTML = buttonElems[0].innerHTML + '<input id="greasemonkeyButton" type="button" value="Call Greasemonkey Function" />'
addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey,true);
}
 
function doMonkey(){
	//do something
}