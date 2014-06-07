// ==UserScript==
// @name          Remove header image notification on Twitter
// @namespace     http://userscripts.org/users/425546
// @description   Removes that annoying notification to get a header image on Twitter
// @include        http*://*twitter.com/*
// ==/UserScript==

var div = document.getElementById("promptbird");

if (div) {
    div.style.display = "none"; // Hides it
}