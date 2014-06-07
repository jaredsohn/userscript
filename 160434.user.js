// ==UserScript==
// @name			Fast Download Blu-ray.com Front Covers
// @description		Adds a link below the small movie cover for the full size image
// @version 		1.0
// @date			2014-05-13
// @author			Morath86
// @namespace		http://userscripts.org:8080/users/488431
// @source			http://userscripts.org:8080/scripts/show/160434
// @updateURL		http://userscripts.org:8080/scripts/source/160434.meta.js
// @downloadURL		http://userscripts.org:8080/scripts/source/160434.user.js
// @include			/http://www.blu-ray.com/movies/*/
// ==/UserScript==

// Gets the current movie ID from the URL
var movieID = document.URL.split('/')[5];

// Create a new Link element [downloadLink] and then get the element ID for the Front Cover
var downloadLink = document.createElement("a");
var frontLink = document.getElementById("largefrontimage_overlay");

// Set the new [downloadLink] ID, Style, HREF & Target attributes
downloadLink.setAttribute("id", "fullsize");
downloadLink.setAttribute("style", "padding-right: 5px");
downloadLink.href = "http://images2.static-bluray.com/movies/covers/" + movieID + "_front.jpg";
downloadLink.target = "_blank";

// Populate the [downloadLink] and insert it before the Front Cover link.
downloadLink.innerHTML = "Download";
frontLink.parentNode.insertBefore(downloadLink, frontLink);