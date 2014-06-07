// Written by Peter Gerdes (TruePath [std symbol] infiniteinjury.org, 2007
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
//
// v0.1
//
// To change the default margin applied replace "50px" with a valid CSS unit on the first line 
//
// ==UserScript==
// @name Shift Left
// @author Peter Gerdes (email: TruePath  server:infiniteinjury.org  connect them in the normal way)
// @homepage http://infiniteinjury.org/wp/shift-left
// @namespace http://infiniteinjury.org/
// @description	 Adds a left margin to the page.  Default size 50px.  
// @include			 *
// ==/UserScript==

var defaultLeftMargin = "50px";
var accelKey = "L";
var modifier = "shift";

function shiftLeft (e) {
	GM_addStyle("body {margin-left:" + defaultLeftMargin + " !important; }");
}

GM_registerMenuCommand("Shift Left", shiftLeft, accelKey, modifier, "s");
