// OWA New Message Button
// version 0.2 BETA!
// 02-01-2008
// Copyright (c) 2008, Lonnie Webb
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// UPDATE HISTORY
// 0.2 2/4/2008 Fix image path
//
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
// select the script, and click Uninstall.
//
// --------------------------------------------------------------------
//// ==UserScript==
// @name           OWA New Message Button
// @namespace      http://www.lonniewebb.com/download
// @description    Add a New Message button to the toolbar on all OWA pages
// @include        *
// ==/UserScript==

window.owanmb_getFieldFromQueryString = function (ji) {
	hu = window.location.search.substring(1);
	gy = hu.split("&");
	for (i=0;i<gy.length;i++) {
		ft = gy[i].split("=");
		if (ft[0] == ji) {
			return ft[1];
		}
	}
}

if( owanmb_getFieldFromQueryString('t') != 'IPF.Note' ){
	var e = document.getElementById( 'schBtn' );
	var aNew = document.createElement('a');
	var img = document.createElement('img');
	img.src='/owa/8.0.752.0/themes/base/newemail.gif';
	img.border='0';
	var textNode = document.createTextNode( 'New Message' );	
	aNew.appendChild( img );
	aNew.appendChild( textNode );
	e.parentNode.appendChild( aNew );
	aNew.style.color = 'blue';
	aNew.style.textDecoration = 'none';
	aNew.href='?ae=Item&t=IPM.Note&a=New';
}
