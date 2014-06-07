// ==UserScript==
// @name       10gen Education footer fix
// @namespace  http://education.10gen.com/
// @version    0.1
// @description  Fixes floating footer on the site
// @match      https://education.10gen.com/*
// @copyright  2012, nonsleepr
// ==/UserScript==
if (!document.xmlVersion) {
    document.getElementsByClassName("fixed-bottom")[0].style.position = 'relative';
}