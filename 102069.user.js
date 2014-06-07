// ==UserScript==
// @name          Google Reader - Show New
// @namespace     http://mnakane.net/
// @description   Show only the new items by pressing CTRL+SHIFT+1 on Google Reader 
// @version       0.1
// @include       http://www.google.tld/reader*
// @include       https://www.google.tld/reader*
// ==/UserScript==

function simulateClick(node) {
   var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
}

function showNew(){
	var element = document.getElementById('show-new');
	simulateClick(element);
}

function keyPressEvent(event){
	var kcode = (event.keyCode)?event.keyCode:event.which;
	var ctrlKeyPressed =event.ctrlKey;

	var k = String.fromCharCode(kcode);

	if(ctrlKeyPressed && k == '!'){
	 showNew();
	}
} 

document.addEventListener("keypress", keyPressEvent, true);
