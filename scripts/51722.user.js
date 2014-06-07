// ==UserScript==
// @author		  ohmangga
// @name          auto_refresh
// @namespace     http://userscripts.org/
// @description   auto reload
// @include       http://*.travian.*/*
// @include       http://*.travian*.*/*.php*
// @exclude       http://forum.travian.*
// @exclude       http://www.travian.*
// @version		  0.2
// ==/UserScript==

/*-------------------------------*/
// Global variable declaration
var reloadTime;
var hInt;
/*------------------------------*/

function setCookie (CookieName, value, expiredTimes) {
 escape(value);
 expiredTimes=(expiredTimes) ? ';expires='+expiredTimes.toGMTString() : ' ';
 document.cookie = CookieName + '=' + value + expiredTimes;
}

function getCookie (CookieName) {
 var Cookies = document.cookie;
 var start = Cookies.indexOf(CookieName+'=');
 if (start == -1) return null;
 var len = start+CookieName.length+1;
 var end = Cookies.indexOf(';',len);
 if (end == -1) end = Cookies.length;
 return unescape(Cookies.substring(len,end));
}

function deleteCookie(CookieName) {
 var expires = ';expires=Thu, 01-Jan-70 00:00:01 GMT';
 if(getCookie(name))
	document.cookie = CookieName + '=' + expires;
}

function setTimeToReload() {
	if (getCookie("timetoreload") != null && getCookie("timetoreload") != "") {
		reloadTime = getCookie("timetoreload");
	}
	else {
		reloadTime = 600000;
	}
}

function setTimeReload() {
	do {
		var rtime = prompt("Write value of time to reload (in sec)\nCurrently:"+(reloadTime/1000));
		if (rtime < 5) alert("You cannot set time to reload below 5 sec");
	} while (rtime < 5);
	rtime = rtime*1000;
	setCookie("timetoreload",rtime);
	reloadTime = rtime;
	reloadBack();
}

function reloadBack() {
	window.location.reload();
}

function engineRun() {
	clearInterval(hInt);
	hInt = setInterval(function() {reloadBack()},reloadTime);
}

GM_registerMenuCommand("Travian Auto Refresh: Set refresh time", setTimeReload);
setTimeToReload();
engineRun();