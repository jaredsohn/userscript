// ==UserScript==
// @name           Motherless video download
// @namespace      fuck that
// @include        http://motherless.com/*
// ==/UserScript==

window.addEventListener("load", function() {
	var link = document.createElement("a");
	link.className = "head_link";
	link.innerHTML = "Download Video";
	link.href = unsafeWindow.__fileurl;
	document.querySelectorAll(".sub_menu")[0].appendChild(link);
});