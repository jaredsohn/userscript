// ==UserScript==
// @name          Test
// @namespace     Kevin
// @author        Kevin Watson
// @version       1.00
// @description	  Testing test
// @include       http://www.ebuyer.com*
// ==/UserScript==

window.alert("Starting");

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