// ==UserScript==
// @name          u413 bawty light
// @description	  u413 with lighter colors
// @author        bawty
// @include       http://www.u413.com/*
// @include       https://www.u413.com/*
// @include       http://*.u413.com/*
// @include       https://*.u413.com/*
// ==/UserScript==


(function() 

{var css = "body {background-color:#ffffff !IMPORTANT; color:#8ec45e !IMPORTANT; font-family:'Courier New' !IMPORTANT; font-size:15px !IMPORTANT;} span {background-color:#ffffff !IMPORTANT; background:#ffffff !IMPORTANT; color:#7a7a7a !IMPORTANT;} a {color:#f2c437 !IMPORTANT;} table {border-color:#8ec45e !IMPORTANT; outline-color:#026cd8 !IMPORTANT;} div {border-color:#8ec45e !IMPORTANT; color:#026cd8 !IMPORTANT; background-color:#ffffff !IMPORTANT;} b {color:#8ec45e !IMPORTANT;} input {color:#026cd8 !IMPORTANT; font-family:'Courier New' !IMPORTANT; font-size:13px !IMPORTANT; background-color:#ffffff !IMPORTANT;} td {border-color:#2eb5ee !IMPORTANT; color:#026cd8 !IMPORTANT;} ";


if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();


