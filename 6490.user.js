
// Reddiggulo.us Relinker
// version 1.0
// 2006-11-23
// by Tom McCaffery
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
// select "Rediggulo.us Relinker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Rediggulo.us Relinker
// @description   When visiting a reddiggulo.us story, forwards user directly to the story's link.
// @include       http://reddiggulo.us/*
// @include       http://www.reddiggulo.us/*
// ==/UserScript==

var strTag = "div";
var strClassName = "storyTitle";

var arrElements = (strTag == "*" && document.all)? document.all : document.getElementsByTagName(strTag);
strClassName = strClassName.replace(/\-/g, "\\-");
var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
var oElement;

for(var i=0; i<arrElements.length; i++){
	oElement = arrElements[i];      
	if(oRegExp.test(oElement.className)){
		window.location = oElement.wrappedJSObject.childNodes[1];
		break;
	}   
}