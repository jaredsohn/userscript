// ==UserScript==
// @name           test
// @namespace      test
// @description    test
// @include        http://gate2home.com/Korean-Keyboard*
// ==/UserScript==

function sendToGoogle(){
	 var newwin = window.open('http://translate.google.co.th/#ko|en|'+main.value,'newTranslateWindow');
	if (window.focus) {newwin.focus()}

}

var main, newButton,newBR;
main = document.getElementById('textbox1');
if (main) {
    	newButton= document.createElement('input');
	newButton.name = 'chanranButton';
	newButton.type = 'button';
	newButton.value = 'Google Translate';
    	newButton.addEventListener('click',sendToGoogle,true);
	
	main.parentNode.insertBefore(newButton, main);
	
	newBR = document.createElement('br');
	main.parentNode.insertBefore(newBR, main);




}

