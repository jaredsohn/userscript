// ==UserScript==
// @name           Fit Width
// @namespace      http://userscripts.org/users/rednuht
// @description    Fits images to the goddamn browser window width
// @include        http://*.jpg
// @include        http://*.gif
// @include        http://*.png
// @include        https://*.jpg
// @include        https://*.gif
// @include        https://*.png
// ==/UserScript==


function Image.prototype.fitWidth() {
  this.style.width = "100%";
}

document.getElementsByTagName("IMG").onDblClick = "fitWidth()";