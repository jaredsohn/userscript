// ==UserScript==
// @name          AutoLogin Hotmail
// @author        Tyler Charlesworth
// @namespace     http://www.tyworks.net
// @description   turns firefox autocomplete on for hotmail
// @include       http://login.passport.net/*
// ==/UserScript==

(function(){
	document.getElementById('i0116').setAttribute("autocomplete", "on");
	document.getElementById('i0118').setAttribute("autocomplete", "on");
})();
