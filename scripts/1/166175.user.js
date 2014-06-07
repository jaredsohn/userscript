// ==UserScript==
// @id             USO:-Add-favorite-button-on-script-pages@http://userscripts.org/users/87056
// @name           USO: Add favorite button on script pages
// @version        2013-11-04T05:48:55+01:00
// @namespace      http://userscripts.org/users/87056
// @author         jok-r
// @description    Add the favorite button under the install button.Can be used in complement of "USO: Add install button on script pages" (http://userscripts.org/scripts/show/128316)
// @homepage
// @updateURL      https://userscripts.org/scripts/source/166175.meta.js
// @downloadURL    https://userscripts.org/scripts/source/166175.user.js
// @icon           http://userscripts.org/images/heart.png
// @screenshot
// @include        http://userscripts.org/scripts/discuss/*
// @include        http://userscripts.org/scripts/fans/*
// @include        http://userscripts.org/scripts/issues/*
// @include        http://userscripts.org/scripts/review/*
// @include        http://userscripts.org/scripts/reviews/*
// @include        http://userscripts.org/scripts/show/*
// @include        https://userscripts.org/scripts/discuss/*
// @include        https://userscripts.org/scripts/fans/*
// @include        https://userscripts.org/scripts/issues/*
// @include        https://userscripts.org/scripts/review/*
// @include        https://userscripts.org/scripts/reviews/*
// @include        https://userscripts.org/scripts/show/*
// @grant          GM_addStyle
// @run-at         document-end
// ==/UserScript==
"use strict";
function makeFavButton(favNode, el) {
	GM_addStyle("#install_script p.favorite {margin-top:1em;}");
	el.appendChild(favNode);
}
console.log("USO: Add favorite button on script pages");

var isLoggedIn = document.querySelector("#top div.container ul.login_status a[href^='/home']");
var installButton = document.getElementById("install_script");
var favButton = document.getElementById("fans");
var scriptLink = document.querySelector("#details h2.title a[href^='/scripts/show/']");
var url = "http://userscripts.org/scripts/show/";
var favButtonId = "fans"; // id container

if (isLoggedIn) {
	console.log("Loged user detected");
	if (installButton && favButton) {
		console.log("Install & fav button detected");
		makeFavButton(favButton, installButton);
	} else if (installButton) {
		console.log("No fav button... We ask one");
		var scriptId = scriptLink.href.match(/\d+/).toString();
		url += scriptId;
		console.log("url = " + url);
		// request the button via XHR
		var xhr = new XMLHttpRequest();
		xhr.ontimeout = function () {
			console.error("The request for " + url + " timed out.");
		};
		xhr.onerror = function () {
			console.error("Error during the request");
		};
		//xhr.onload = function() {
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status === 200) {
					var doc = document.implementation.createHTMLDocument("script_page"),
						favButton;

					doc.documentElement.innerHTML = this.responseText;
					//console.dirxml(doc); // view source
					favButton = doc.getElementById(favButtonId);
					doc = null;
					//console.dirxml(favButton); // view source
					makeFavButton(favButton, installButton);
				} else {
					console.error("Failed to get the page. Response status: " + this.status + ": " + this.statusText);
				}
			}
		};
		xhr.timeout = 5000;
		xhr.open("GET", url, true);
		xhr.send();
	} else {
		console.log("No install button detected");
	}
} else {
	console.log("There is no \"add to fav\" functionality when not logged in");
}