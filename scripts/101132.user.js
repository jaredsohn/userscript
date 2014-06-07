// ==UserScript==
// @name          Standard Bank Watchdog Neuter 1.0
// @namespace     http://coda.co.za
// @description	  Extends the Standard Bank Internet Banking session timeout.
// @include       *.standardbank.co.za/*
// ==/UserScript==

(function() {
	// Hat-tip to http://www.squakmt.com/replacing_javascript/index.htm for the source below

	var scriptCode = new Array();
	scriptCode.push("window.session_duration = 600000; // 10 minutes, in milliseconds"); 
	var script = document.createElement("script");
	script.innerHTML = scriptCode.join("\n");
	scriptCode.length = 0;
	document.getElementsByTagName("head")[0].appendChild(script);
})();