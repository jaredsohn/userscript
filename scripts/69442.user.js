// ==UserScript==
// @name           All-in-one enhancement for iGoogle Hotmail Gadget
// @namespace      http://lovemygadget.com/hotmail
// @description    All-in-one enhancements: smaller font, no hotmail logo at top, no hotmail ad near top, no @ during login
// @include        http://mobile.live.com/*
// @include        http://*.mail.live.com/*
// @include        http://mpeople.live.com/*
// @include        https://mid.live.com/si/*
// @include        https://maccount.live.com/*
// ==/UserScript==

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// REMOVE HOTMAIL'S AD AT TOP OF INBOX AND FOLDERS

// Turn off display of ad div
try {
	var oDivs = document.getElementsByClassName('CenterAlignedText AdPanel');
	for( var i = 0; i < oDivs.length; i++ ){
		oDivs[i].style.display = "none";
	}
	
	var oDivs2 = document.getElementsByClassName('AdPanel');
	for( var i = 0; i < oDivs2.length; i++ ){
		oDivs2[i].style.display = "none";
	}
	
	var oDivs3		= document.getElementById( "MAP50Ads" );
	oDivs3.style.display = "none";
} catch(e){}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// REMOVE HOTMAIL'S LOGO AT TOP OF INBOX AND FOLDERS

// Turn off display of Header in Contacts
try {
	var oElemID = document.getElementById('HeaderContainer');
	oElemID.style.display = "none";
} catch(e){}
// Turn off display of Header in Inbox and Folders

try {
	var oElem = document.getElementsByClassName('HeaderContainer');
	oElem[0].style.display = "none";
} catch(e){}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MAKE FONT SMALLER (12px)

var oBody 		= document.getElementsByTagName( "body" )[0];
var oStyle1		= document.createElement( "style" );
oStyle1.innerHTML	= "body{ font-family: Tahoma, sans-serif; font-size: 12px; } ";
oStyle1.innerHTML	+= "input, textarea{ margin: 2px 2px 2px 2px; border-width: 1px; border-style: solid; border-color: #c0c0c0; } ";
oStyle1.innerHTML	+= "hr{ border: 0px; color: #c0c0c0; background-color: #c0c0c0; height: 1px; } ";

// append style to body
oBody.appendChild( oStyle1 );


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// REMOVE @ IN INPUT BOX ON LOGIN PAGE

// remove @ on login page
var oInputs		= document.getElementsByTagName( "input" );
for( var i = 0; i < oInputs.length; i++ ){
	if( oInputs[i].value == "@" ){
		oInputs[i].value = "";
	}
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// end of script

