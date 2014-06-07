// ==UserScript==
// @name				UserScriptEnhancer
// @description	Tuning userscript
// @namespace		chooz
// @author			chooz
// @version			1.0.201310
// @updateURL		http://userscripts.org/scripts/source/180454.user.js
// @include			http://userscripts.org/*
// ==/UserScript==

var sURL = window.location.toString();


var oUlMainMenu = document.getElementById('mainmenu');
var oLiMesScripts = document.createElement('li');
oLiMesScripts.innerHTML = '<a href="/home/scripts?sort=name">Mes scripts</a>';
oUlMainMenu.insertBefore(oLiMesScripts, oUlMainMenu.firstChild);
 
if (sURL.match(/\/home\/scripts/)) {
	oLiMesScripts.setAttribute('class', 'active');

	var dMain;
	if (dMain = document.getElementById("main")) {
		var sBuf = dMain.innerHTML;
		sBuf = sBuf.replace(/<a href="\/scripts\/edit\/(\d*)">description<\/a>/g, "<a href='/scripts/edit/$1'>desc</a> | <a href='/scripts/review/$1'>src</a><div id='install_script' style='position:static !important;'><a href='/scripts/source/$1.user.js' class='userjs' style='font-size: 1em;'>Install</a></div>");
		sBuf = sBuf.replace(/update code/g, "màj");
		dMain.innerHTML = sBuf;
	}
}

if (sURL.match(/\/scripts\/review/)) {
	var dSrc;
	if (dSrc = document.getElementById("source")) {
		var sBuf = dSrc.innerHTML;
		sBuf = sBuf.replace(/\t/g, "   ");
		dSrc.innerHTML = sBuf;
	}
}