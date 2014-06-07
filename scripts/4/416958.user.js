// ==UserScript==
// @name          Abritas Test
// @namespace     Kevin
// @author        Kevin Watson
// @version       1.00
// @description	  Creating Button
// @include       https://test4.home-point.info*
// ==/UserScript==

window.addEventListener("load", function(e) {
  addButton();
}, false);
 
function addButton(){
newButton = document.createElement('input');
newButton.setAttribute("type", "submit");
newButton.setAttribute("value", "miniFlickr");
newButton.addEventListener("click", doMonkey, false);
var div = document.getElementById('PropertyShopContentContainer');
div.parentNode.insertBefore(newButton, div.nextSibling);
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey,true);
}
 
function doMonkey(){
	//do something
}// ==UserScript==
// @name          Newer
// @namespace     Kevin
// @author        Kevin Watson
// @version       1.00
// @description	  Testing test
// @include       http://www.ebuyer.com*
// ==/UserScript==