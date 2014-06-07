// ==UserScript==
// @name           Chicago Public Library - Skip "Place Hold At" Screen by Selecting Permanent Default
// @author         Mike Harris <windycitypoe@gmail.com>
// @description    By changing the values below, you can alter the default branch at which you will pick up holds.  However, you'll need to determine your branch's number -- see this script's entry on Userscripts.Org for a list.
// @include        http://www.chipublib.org/mycpl/hold/place/*
// ==/UserScript==

(function () {
	document.forms[2].elements[2].selectedIndex = 1;
	document.forms[2].submit();
})();