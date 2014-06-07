// Enlarge my GMail
// version 0.1
// 2007-08-24
// Copyright (c) 2007, Yoan Blanc
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name          Enlarge my GMail
// @namespace     http://yoan.dosimple.ch/labs/greasemonkey/gmail_enlarge.user.js
// @description   Enlarge the edit box of the GMail editor
// @include       http://gmail.google.com/*
// @include       https://gmail.google.com/*
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

if(window.name == "v2") {
	var nInterval = window.setInterval(function() {
		var oTextarea = document.getElementById("ta_compose");
		if(oTextarea) {
			oTextarea.parentNode.style.width = "100%";
			window.clearInterval(nInterval);
		}
	}, 100);
}
