// ==UserScript==
// @version 1
// @name SQMAIL Title Tweaks
// @author  www.praveen.net
// @namespace kuchbhi
// @description Updates squirrel mail update title with mail count
// @include https://webmail.cse.iitk.ac.in/src/left_main.php
// @include https://webmail.iitk.ac.in/squirrelmail/src/left_main.php
// ==/UserScript==

var vURL = window.location.href;

if(/webmail.cse/.test(vURL))
	var vTitle = "CSE Mail";
else
	var vTitle = "IITK Mail";
	
var vINBOXString = document.getElementsByTagName('body')[0].innerHTML.match(/.*INBOX.*/)[0];
var vCountArr = vINBOXString.match(/\([0-9\/]*\)/);

if(vCountArr.length > 0)
	var vCount = vCountArr[0];
else
	var vCount="(0)";

top.document.title = vTitle + " " + vCount;