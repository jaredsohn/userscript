// ==UserScript==
// @name           No @ symbol on iGoogle Hotmail Gadget Login
// @namespace      http://lovemygadget.com/hotmail
// @description    Gets rid of "@" symbol in iGoogle Hotmail Gadget Input Box Login 
// @include        https://mid.live.com/si/*
// ==/UserScript==

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// REMOVE @ IN INPUT BOX ON LOGIN PAGE

// remove @ on login page
var oInputs		= document.getElementsByTagName( "input" );
for( var i = 0; i < oInputs.length; i++ ){

	if( oInputs[i].value == "@" ){
		oInputs[i].value = "";
	}
}

// end of script

