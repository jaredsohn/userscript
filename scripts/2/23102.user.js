// ==UserScript==
// @name           Smaller font (12px) for iGoogle Hotmail Gadget
// @namespace      http://lovemygadget.com/hotmail
// @description    Smaller font (12px) for iGoogle Hotmail Gadget
// @include        http://*.mail.live.com/*
// @include        http://mpeople.live.com/*
// @include        https://mid.live.com/si/*
// @include        https://maccount.live.com/*
// ==/UserScript==

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var oBody 		= document.getElementsByTagName( "body" )[0];
var oStyle1		= document.createElement( "style" );
oStyle1.innerHTML	= "body{ font-family: Tahoma, sans-serif; font-size: 12px; } ";
oStyle1.innerHTML	+= "input, textarea{ margin: 2px 2px 2px 2px; border-width: 1px; border-style: solid; border-color: #c0c0c0; } ";
oStyle1.innerHTML	+= "hr{ border: 0px; color: #c0c0c0; background-color: #c0c0c0; height: 1px; } ";

// append style to body
oBody.appendChild( oStyle1 );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// end of script

