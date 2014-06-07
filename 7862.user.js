// ==UserScript==
// @name           Rllmuk add search link
// @namespace      
// @description    Adds search link at top on rllmukforum
// @include http://www.rllmukforum.com/*
// @include http://www.rpsoft.co.uk/*
// @include http://www.extranoise.co.uk/*
// @include http://rllmukforum.com/*
// @include http://rpsoft.co.uk/*
// @include http://extranoise.co.uk/*
// ==/UserScript==

var userlinks = document.getElementById("userlinks");
if (userlinks)
{
    userlinks = userlinks.getElementsByTagName("p")[1];
    userlinks.insertBefore(document.createTextNode(" . "), userlinks.firstChild);
    var searchLink = document.createElement("a");
    searchLink.href = "http://www.rllmukforum.com/index.php?act=Search";
    searchLink.appendChild(document.createTextNode("Search"));
    userlinks.insertBefore(searchLink, userlinks.firstChild);
}