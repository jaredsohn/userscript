// ==UserScript==
// @name           ViewIt Tools
// @description    Lets you go forward and backward in listings using arrow keys.
// @include        http://viewit.ca/
// ==/UserScript==

var buttonNext = document.getElementById( 'ctl00_ContentPlaceHolder1_lnkNext' ),
	buttonPrev = document.getElementById( 'ctl00_ContentPlaceHolder1_lnkPrevious' );
	
document.addEventListener( 'keypress', 	function ( e ) {
	if( e.keyCode != 37 && e.keyCode != 39 )
		return false;
	else 
		var button = (e.keyCode === 37) ? buttonPrev : buttonNext;
	
	window.location = button.href;
}, false );



