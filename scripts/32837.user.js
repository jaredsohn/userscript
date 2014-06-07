// Esperanto 4 Twitter
// version 0.1 BETA!
// 2008-08-30
// Copyright (c) 2008, Stefan Kraemer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Esperanto4twitter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	Esperanto 4 Twitter
// @namespace	http://www.try-to-be-mensch.de/mail/
// @description	Adds a button to the twitter home page for converting characters in the input field from the x system into circumflexed characters.
// @include	http://www.twitter.com/home
// @include	https://www.twitter.com/home
// @include	http://twitter.com/home
// @include	https://twitter.com/home
// @exclude	all the others
// ==/UserScript==

function Esperantigu() {
	var text;

	text = document.getElementById('status').value;

	text=text.replace(/Cx/g,String.fromCharCode(264));
	text=text.replace(/cx/g,String.fromCharCode(265));
	text=text.replace(/Gx/g,String.fromCharCode(284));
	text=text.replace(/gx/g,String.fromCharCode(285));
	text=text.replace(/Hx/g,String.fromCharCode(292));
	text=text.replace(/hx/g,String.fromCharCode(293));
	text=text.replace(/Jx/g,String.fromCharCode(308));
	text=text.replace(/jx/g,String.fromCharCode(309));
	text=text.replace(/Sx/g,String.fromCharCode(348));
	text=text.replace(/sx/g,String.fromCharCode(349));
	text=text.replace(/Ux/g,String.fromCharCode(364));
	text=text.replace(/ux/g,String.fromCharCode(365));
	
	document.getElementById('status').value=text;
}

var button_submit, button_convert;
button_submit = document.getElementById('update-submit');
if (button_submit) {
    button_convert = document.createElement('input');
    button_submit.parentNode.insertBefore(button_convert, button_submit);
    button_convert.type='button';
    button_convert.class='update-button';
    button_convert.id='esperantigu-button';
    button_convert.value='Esperantigu!';
    button_convert.addEventListener('click',Esperantigu,false);
}
