// ==UserScript==
// @name           DeviantArt gallery link
// @namespace      http://henrik.nyh.se
// @description    Adds link back to gallery next to the username on DeviantArt deviation pages.
// @include        http://www.deviantart.com/view/*
// @include        http://www.deviantart.com/deviation/*
// ==/UserScript==

var paragraph = document.getElementById("content").getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0];

paragraph.innerHTML = paragraph.innerHTML.replace(/(<a[^>]* href=\"([^\"]+)\">.*?<\/a>)/, '$1 (<a href="$2gallery/">Gallery</a>)');
