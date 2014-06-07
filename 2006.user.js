// ==UserScript==
// @name           Edge Online Adblocker
// @namespace      http://www.stud.ntnu.no/~aase
// @description    Removes all non-content columns
// @include        http://www.edge-online.co.uk/*
// ==/UserScript==

(function() {
	var head = document.getElementsByTagName("head")[0];
	
	var styleTag = document.createElement("style");
	styleTag.setAttribute("type", "text/css");
	styleTag.innerHTML = "td[width] { display: none }\n\n" +
		"td[colspan] .container { display: none }";
	
	head.appendChild(styleTag);
})();