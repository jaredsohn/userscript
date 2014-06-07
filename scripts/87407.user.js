// ==UserScript==
// @name          Restore SalesForce Header Links
// @version       1.1.0
// @date          2010-10-27
// @description    Restore the Setup, System Log, and Logout links to the header in the new User Interface (Winter '11)
// @include        https://*.salesforce.com/*
// @include        https://*.visual.force.com/*
// ==/UserScript==
//
// Copyright (c) 2010, Michael Smith (http://www.force2b.net)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

var oldNode = document.getElementById('userNav');
oldNode.innerHTML='';

var newNav = document.createElement("span");
newNav.className="navLinks linkElements";
newNav.innerHTML = '<a href="/ui/setup/Setup">Setup</a>&bull;' 
	+ '<a title="System Log (New Window)" class="menuButtonMenuLink debugLogLink" href="javascript:openPopupFocus%28%27%2Fapexdebug%2FSystemLog.apexp%27%2C%20%27_blank%27%2C%201000%2C%20800%2C%20%27width%3D1000%2Cheight%3D800%2Cresizable%3Dyes%2Ctoolbar%3Dno%2Cstatus%3Dno%2Cscrollbars%3Dyes%2Cmenubar%3Dno%2Cdirectories%3Dyes%2Clocation%3Dno%2Cdependant%3Dno%27%2C%20false%2C%20false%29%3B">System Log</a>&bull;' 
	+ '<a class="menuButtonMenuLink" href="/secur/logout.jsp">Logout</a>&bull;';
oldNode.parentNode.replaceChild(newNav,oldNode);
