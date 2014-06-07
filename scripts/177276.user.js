// ==UserScript==
// @name            Google Drive public link to source document
// @namespace       http://h4x.no/gdrive-public-link.js
// @description     This script adds a link to the source document in gdrive right under the share button on top right side so you can link directly to images
// @version         1.0.0
// @author          simeng
// @include         https://docs.google.com/file/*
// @grant           none
// ==/UserScript==
(function() {
	window.onload = function() {
		var link = document.querySelectorAll(".m2-tileLayer img")[0].src;
		if (!link) {
			var links = document.querySelectorAll(".m2-tileLayer");
			for (var i in links) {
				if (links[i].src.indexOf("usercontent")) {
					link = links[i].src;
				}
			}
		}

		var linkElem = document.createElement("a");
		linkElem.appendChild(document.createTextNode("Direct link"));
		linkElem.href = link;
		linkElem.style.position = 'absolute';
		linkElem.style.bottom = '4px';
		linkElem.style.right = '0';

		document.getElementById("docs-menubar").appendChild(linkElem);
	};
})();

