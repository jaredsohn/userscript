// ==UserScript==
// @name Fix the Google Bar
// @id	fix_google_bar_pokerface
// @namespace	  me.senseofti.toolkit.google
// @description	Fix the Google Bar on Google Search Page
// @license	GPL v3 or later version
// @include		*://www.google.*/*q=*
// @include		*://www.google.*/*tbs=*
// @include		*://www.google.*/search?*
// @include		*://www.google.*/webhp?*
// @include		*://www.google.*/?*
// @include		*://www.google.*/#*
// @include		*://www.google.*/
// @include		*://encrypted.google.*
// @include		*://ipv6.google.*
// @version	0.1
// @author	Pokerface - Kevin
// ==/UserScript==

GM_addStyle(
	' \
	#mngb, #gb { position: fixed; width: 100%; top: 0px } \
	#main { margin-top: 102px; } \
	'
);