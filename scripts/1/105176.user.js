// ==UserScript==
// @name        Upload page protector (Jquery)
// @description Makes all links open up in a new tab/window, when on upload.php. Uses jquery.
// @include     http*://*what.cd/upload.php
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$('a').attr('target', '_blank');