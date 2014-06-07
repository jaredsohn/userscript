// ==UserScript==
// @name           Disable onkeydown and onkeypress
// @include        http*://*.current.no/*
// @author         bjornd / ric
// @version        1.1
// @description    Cancels the onkeydown and onkeypress events on the current.no application
// ==/UserScript==
var version=3;
var scriptlocation="http://userscripts.org/scripts/source/44340.user.js";

setTimeout(function(){
	var scr = document.createElement("script");
	scr.type="text/javascript";
	scr.text= "function disableCtrlModifer(evt){return true}";
	document.body.appendChild(scr);
},1000);
