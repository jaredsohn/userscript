// remerciements à shikiryu et sa fonction getGlobal, SpaceFrog pour son aide dans la correction du code.
//
// ==UserScript==
// @name          test
// @namespace     http://rotrevrep.alwaysdata.net
// @description   Adding smileys in http://chat.developpez.com/
// @include       http://chat.developpez.com/
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
function getGlobal(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}
 
function main() {
	
alert($);
}
 
getGlobal(main);