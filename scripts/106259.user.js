// ==UserScript==
// @name        An awesomer Tryit Editor
// @author      Kevin Zucchini
// @version     0.3
// @homepageURL http://tryiteditor.webs.com
// @updateURL   http://userscripts.org/scripts/source/106259.meta.js
// @namespace   http://tryiteditor.webs.com
// @description A script to use a better version of Tryit editor than W3Schools
// @include	http://www.w3schools.com/html/tryit.asp*
// @include	http://w3schools.com/html/tryit.asp*
// @include	http://www.w3schools.com/html5/tryit.asp*
// @include	http://w3schools.com/html5/tryit.asp*
// @include     http://www.w3schools.com/jsref/tryit.asp*
// @include     http://w3schools.com/jsref/tryit.asp*
// @include     http://www.w3schools.com/cssref/tryit.asp*
// @include     http://w3schools.com/cssref/tryit.asp*
// @include     http://www.w3schools.com/tags/tryit.asp*
// @include     http://w3schools.com/tags/tryit.asp*
// ==/UserScript==
//END USERSCRIPT AREA

//change this to true if you want to use instant version or false to use normal version
var useinstant = false;

//DO NOT MODIFY UNLESS YOU KNOW JAVASCRIPT!
var version = "0.24"; //for error reporting. Have to use a string because of JavaScripts handling of floating point numbers
function work(what) {
var theCode = what;
theCode = theCode.split("src=\"");
for (var i = 1; i < theCode.length; i++) {
	if (theCode[i].indexOf("http://") == 0) {
		void(0);
	}
	else {
		var pathName = window.location.pathname.split("/");
		theCode[i] = window.location.protocol + "//" + window.location.hostname + "/" + pathName[1] + "/" + theCode[i];
	}
}
theCode = theCode.join("src=\"");
theCode = theCode.split("src='");
for (var i = 1; i < theCode.length; i++) {
	if (theCode[i].indexOf("http://") == 0) {
		void(0);
	}
	else {
		var pathName = window.location.pathname.split("/");
		theCode[i] = window.location.protocol + "//" + window.location.hostname + "/" + pathName[1] + "/" + theCode[i];
	}
}
theCode = theCode.join("src='");
theCode = theCode.split("href=\"");
for (var i = 1; i < theCode.length; i++) {
	if (theCode[i].indexOf("http://") == 0) {
		void(0);
	}
	else {
		var pathName = window.location.pathname.split("/");
		theCode[i] = window.location.protocol + "//" + window.location.hostname + "/" + pathName[1] + "/" + theCode[i];
	}
}
theCode = theCode.join("href=\"");
theCode = theCode.split("href='");
for (var i = 1; i < theCode.length; i++) {
	if (theCode[i].indexOf("http://") == 0) {
		void(0);
	}
	else {
		var pathName = window.location.pathname.split("/");
		theCode[i] = window.location.protocol + "//" + window.location.hostname + "/" + pathName[1] + "/" + theCode[i];
	}
}
theCode = theCode.join("href='");
var escapedString = theCode;
var stringToReplace = escapedString.split('%3C');
escapedString = stringToReplace.join("<");
stringToReplace = escapedString.split('%3E');
escapedString = stringToReplace.join(">");
stringToReplace = escapedString.split('%22');
escapedString = stringToReplace.join('"');
stringToReplace = escapedString.split("\n");
escapedString = stringToReplace.join("%0A");
return escapedString;
}
try { //for visuals
var element = document.createElement("p");
element.innerHTML = "<h1>Redirecting...An awesomer Tryit Editor ver: " + version + "</h1>";
document.body.appendChild(element);
}
catch(e) {
alert("error: " + e.message + ". Report at: http://userscripts.org/scripts/issues/106259 and tell them the version number, which is: " + version + " and the error message. Thank you.");
}
try {
if (document.getElementById("pre_code") != null && document.getElementById("pre_code") != undefined && document.getElementById("pre_code").value !== null && document.getElementById("pre_code").value !== "") {
if (useinstant) {
window.location.assign("http://tryiteditor.webs.com/instant/?" + work(document.getElementById("pre_code").value));
}
else {
window.location.assign("http://tryiteditor.webs.com/?" + work(document.getElementById("pre_code").value));
}
}
else {
alert("error in userscript: an awesomer tryit editor " + version + ". please report at: http://userscripts.org/scripts/issues/106259 and tell them the version number");
}
}
catch(e) {
alert("error: " + e.message + ". Report at: http://userscripts.org/scripts/issues/106259 and tell them the version number, which is: " + version + " and the error message. Thank you.");
}