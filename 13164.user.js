// ==UserScript==
// @name           Google shortcut
// @namespace      http://www.google.it/
// @description    Adds shortcuts to Google for quick navigation
// @include        *.google.*/search*
// ==/UserScript==

// Add a shortcut that focus on seach box pressing 'S'
document.addEventListener('keypress', function(event) {
	switch( event.which ){
	case 83: // 'S' pressed, focus and select search box
		txtBox = document.getElementsByName('q');
		txtBox[0].focus();
		txtBox[0].select();
		break;
	}
}, true);
