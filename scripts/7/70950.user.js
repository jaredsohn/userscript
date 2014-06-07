// ==UserScript==
// @name           4walled
// @namespace      http://4walled.org/show*
// @description    Open the images directly
// @include        http://4walled.org/show*
// ==/UserScript==

function openImage() {
	setTimeout('document.location = document.images[0].src', 1000);
}
openImage();