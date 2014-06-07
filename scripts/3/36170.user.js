// ==UserScript==
// @name           GCalPopupAddon
// @namespace      http://www.benjip.net/GCalPopup
// @description    Allows for advanced customization of the GCalPopup extension for Firefox.
// @include        http://www.google.com/calendar/render#GCalPopup
// ==/UserScript==
//
try
{
	window.document.getElementById("nav").setAttribute("style","display:none;");
	window.document.getElementById("topBar").setAttribute("style","display:none;");	
	window.document.getElementById("gbar").setAttribute("style","display:none;");
	window.document.getElementById("guser").setAttribute("style","display:none;");
}
catch (err)
{
}
