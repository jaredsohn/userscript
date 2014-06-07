// ==UserScript==
// @name           Prof
// @namespace      http://fr.beterz.com
// @include        http://fr.beterz.com/Y/Profile/*
// ==/UserScript==
alert("Alert");
var GM_JQ = document.createElement("script");
    GM_JQ.src = "http://jquery.com/src/jquery-latest.js";
    GM_JQ.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(GM_JQ);
	function GM_wait() {
        if(typeof unsafeWindow.jQuery == "undefined") { window.setTimeout(GM_wait,100); }
	    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
	
    function letsJQuery() {
var monDiv = document.createElement("div");
		monDiv.innerHTML = '<div id="MonDiv"> ' +
							'<a href="https://local.beterz.com/God/Help/Edit/">Edit</a> ' +
							'</div>';
	document.body.insertBefore(monDiv, document.body.firstChild);}