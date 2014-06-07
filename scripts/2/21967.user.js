// OWA Refresher
// version 0.1 BETA!
// 01-30-2008
// Copyright (c) 2008, Lonnie Webb
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
// select the script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OWA Refresher
// @namespace     http://lonniewebb.com/download/
// @description   give OWA light the ability to refresh email listing automatically in FireFox when in list view
// @include       *
// @exclude       http://lonniewebb.com/*
// @exclude       http://www.lonniewebb.com/*
// ==/UserScript==

var owar_timeoutId=null;

window.owar_getFieldFromQueryString = function (ji) {
	hu = window.location.search.substring(1);
	gy = hu.split("&");
	for (i=0;i<gy.length;i++) {
		ft = gy[i].split("=");
		if (ft[0] == ji) {
			return ft[1];
		}
	}
}

window.owar_createDivMsg = function ( aString ){
	divNew = document.createElement("div");
	floatingHighlightDiv           = divNew;
	divNew.style.borderWidth     = "1px";
	divNew.style.borderColor     = "black";
	divNew.style.borderStyle     = "solid";
	divNew.style.backgroundColor = "lightgray";
	divNew.style.visibility      = "visible";
	divNew.style.position        = "absolute";
	divNew.style.top = '50px';
	divNew.style.left = '30px';	

	var bold  = document.createElement("b");
	var title = document.createTextNode( aString );
	divNew.appendChild(bold);
	bold.appendChild(title);
	
	document.body.appendChild( divNew );
}



if( owar_getFieldFromQueryString('t') == 'IPF.Note' ){
	owar_timeoutId = window.setTimeout( "divNew = document.createElement('div');floatingHighlightDiv           = divNew;divNew.style.borderWidth     = '1px';divNew.style.borderColor     = 'black'; divNew.style.borderStyle     = 'solid';	divNew.style.backgroundColor = 'lightgray';divNew.style.visibility      = 'visible';divNew.style.position        = 'absolute';divNew.style.top = '50px';divNew.style.left = '30px';var bold  = document.createElement('b');var title = document.createTextNode( 'Updating...' );	divNew.appendChild(bold);bold.appendChild(title);document.body.appendChild( divNew ); onClkPN(0);", 5 * 60000 );
}

