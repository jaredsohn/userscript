// ==UserScript==
// @name           Old LG15 Forum Header Link Fix
// @namespace      Renegade
// @description    This script changes the header link of the old forum to point to the forum index instead of the LG15 site.
// @include        http://www.lg15.com/lonelygirl15/forum/*
// @include        http://lg15.com/lonelygirl15/forum/*
// @include        https://www.lg15.com/lonelygirl15/forum/*
// @include        https://lg15.com/lonelygirl15/forum/*
// ==/UserScript==

// header link (déjà vu)
var header = document.getElementById("logo");
if(header) {
	header.href = "./";
}

// navbar
var navbar = document.getElementById("global");
if(navbar) {
	navbar.style.display = "none";
	var showLink = document.createElement("A");
	showLink.appendChild(document.createTextNode("Toggle NavBar"));
	showLink.style.position = "absolute";
	showLink.style.top = "3px";
	showLink.style.right = "8px";
	showLink.style.cursor = "pointer";
	showLink.id = "toggle_navbar";
	showLink.addEventListener("click", toggleNavBar, false);
	document.body.insertBefore(showLink, document.body.firstChild);
}

function toggleNavBar(event) {
	switch(navbar.style.display) {
		case "none":
			navbar.style.display = "block";
			break;
		case "block":
			navbar.style.display = "none";
			break;
	}
}

// kills footer
var footer = document.getElementById("lg15_footer");
if(footer) {
	footer.parentNode.removeChild(footer);
}