/*
Faceraper Ex
Build 20
2009-01-27

Origional Fix Copyright (c) 2006, Tristan Pemble
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html

Portions Copyright (c) 2005, Mark Pilgrim
Also Released under the GPL license

Original OIFY Styles (oify.css, and _phallic.css) probably Copyright (c) 2004, Garry Newman
The missing Scripts are Copyright ©2000 - 2004, Jelsoft Enterprises Limited and/or Copyright (c) 2004, Garry Newman, god knows that they are licensed under.

Code Molested by Morphology53
Still Released under the GPL license

Small Modifications and fix for the new OIFY by h2ooooooo
As with anything else, released under the same GPL license

//All banned posts: "User was banned for this post intitle:View Single"
//All Gold Members: "gold member intitle:View Profile"

//http://facepunchstudios.com/favicon.ico
//http://unicode.coeurlumiere.com/
//Floating menu code ganked from someplace
*/

// ==UserScript==
// @name          Faceraper Ex
// @namespace     FaceraperEx
// @description   Also cocks.
// @include       http://www.facepunch.com/*
// ==/UserScript==

var isoify = false;
var backtomainshow = false;
var checktitle = document.getElementById("lastelement").innerHTML.split(" ").join("").split("\n").join("").split("\t").join("");
if (checktitle == "ThebEarsAssheole") isoify = true;
if (!isoify) {
	var fuckTheCat = document.getElementById("breadcrumb").getElementsByTagName('span');
	var fuckTheFucker = fuckTheCat[1].getElementsByTagName('a');
	var ass_rapist = fuckTheFucker[0].innerHTML;
	if (ass_rapist == "The bEars Assheole") {
		isoify = true;
		backtomainshow = true;
	}
}
if (isoify) {
	rapeadog("http://www.jalsoedesign.net/oify.css");
	var myvar;
	myvar = '<center><blink><font color="#bb0000" size="+3">T</font><font color="#bb0000" size="+2">h</font><font color="#bb0000" size="+4"><b>i</b></font><font color="#bb0000" size="+2">s</font></blink><font size="+1"><i>is</i></font>   the <blink><font size="+4"><b><i><font color="#dd11bb">HOttEST</font></i></b></font></blink><blink><font color="#0033dd" size="+3"> place</font></blink> <font size="+2">ON THE </font><blink><font color="#0099dd" size="+3">Web </font></blink>';
	if (backtomainshow) myvar += '<br/><a href="http://forums.facepunchstudios.com/forumdisplay.php?f=56">BACK TO OIFY MAIN</a></center>';
	document.getElementById("breadcrumb").innerHTML = myvar;
}
function rapeadog(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = css;
	head.appendChild(style);
}