// ==UserScript==
// @name            Grab.by image blocker remover
// @description     removes the div that blocks direct access to the image. Restores all default functionality a browser gives to an image element.
// @include         *://grab.by*
// @version         1
// ==/UserScript==

var elmDeleted = document.getElementById("gc_edit");
	elmDeleted.parentNode.removeChild(elmDeleted);