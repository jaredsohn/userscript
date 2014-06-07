// Hello World! example user script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name kaskus beta full width by sandi_okta
// @namespace http://diveintogreasemonkey.org/download/
// @description memperpanjang lebar postingan
// @include http://livebeta.kaskus.us/thread/*
// @include http://livebeta.kaskus.us/post/*
// @include http://livebeta.kaskus.us/forum/*
// ==/UserScript==

//- */

document.getElementById('content-wrapper').style.margin ="2px";
document.getElementById('content-wrapper').style.left="10px";

document.getElementById('content-body').style.width="128%";

for(var i=0;i<document.getElementsByTagName('*').length;i++){
		if(document.getElementsByTagName('*')[i].className == 'entry-content'){
		document.getElementsByTagName('*')[i].style.width = '900px';
		document.getElementsByTagName('*')[i].style.marginleft = '150px';
		document.getElementsByTagName('*')[i].style.padding = '10px';
	}
}