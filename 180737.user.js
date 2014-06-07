// ==UserScript==
// @name       MyUserscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://userscripts.org/scripts/show/141913
// @copyright  2012+, You
// ==/UserScript==



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
	alert('1');
}