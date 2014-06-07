
// ==UserScript==
// @name           MightyText Confirm Close
// @author         SystemDisc 
// @namespace      http://zornco.net
// @description    Confirm closing MightyText to keep HTML5 Notifactions on
// @version        1.1
// @grant          none
// @include        https://mightytext.net/app/*
// @include        http://mightytext.net/app/*
// @copyright      2012 ©SystemDisc
// ==/UserScript==

var hook=false; // set to true if you want on by default
var haveWarned=false;
var reason = "Closing this page will disable MightyText notifications.";
var newa;
window.onbeforeunload = function (evt) {
	if (hook) {
		if (!haveWarned) { // only show once
			alert(reason); // work-around for Firefox not displaying custom 'onbeforeunload' messages
			haveWarned = true;
		}
		return reason;
	}
	// no return value obviously means no dialog box. 
}

function togglehook() {
	hook = (hook? 0:1);
	document.getElementById("togglehook").innerHTML = (hook? 'Close Confirmation is on':'Close Confirmation is off');
	return false;
}

newa = document.createElement("a");
newa.setAttribute("id","togglehook");
newa.setAttribute("href","javascript:void(0);");
newa.setAttribute("style","top:-10px;");
newa.addEventListener('click', togglehook, false);
newa.innerHTML = (hook? "Close Confirmation is on":"Close Confirmation is off");
document.getElementById("persistent-msg-header").removeChild(document.getElementById("persistent-msg-header").childNodes[2]);
document.getElementById("persistent-msg-header").appendChild(newa);
var css = '.sms-body { white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; word-wrap: break-word; }',
head = document.getElementsByTagName('head')[0],
style = document.createElement('style');

style.type = 'text/css';
if(style.styleSheet) {
	style.styleSheet.cssText = css;
}else {
	style.appendChild(document.createTextNode(css));
}
head.appendChild(style);
