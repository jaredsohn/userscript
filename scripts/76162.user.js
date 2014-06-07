// This user script is herefore released into the Public Domain.

// ==UserScript==
// @name          OldGoogle
// @namespace     http://www.battybovine.com/
// @description   Remove the new and irritating sidebar from Google result pages
// @version       1.0
// @include       http*://*google.*/search?*
// @include       http*://*google.*/images?*
// @include       http*://*google.*/webhp?*

// Special thanks to SEO Tools for the idea for this implementation. If you
// wish to try their Firefox or Chrome extension instead, follow this link:
// 
// http://www.seotools.com/hide-google-options/index.htm

(function() {

var leftNav = document.getElementById('leftnav');
var centerCol = document.getElementById("center_col");
var contentCont = document.getElementById("content_cont");
if (leftNav || centerCol || contentCont) {
    leftNav.style.display = "none";
    centerCol.style.marginLeft = "0px";
    centerCol.style.borderLeft = "0px";
}

})();
// ==/UserScript==