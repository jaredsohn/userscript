// ==UserScript==
// @name        Upload page protector
// @description Makes all links open up in a new tab/window, when on upload.php
// @include     http*://*what.cd/upload.php
// ==/UserScript==

Array.prototype.forEach.call(document.getElementsByTagName('a'), function(link) {
    link.target = "_blank";
});