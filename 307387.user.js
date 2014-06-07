// ==UserScript==
// @name        Kara custom boardlinks
// @include     *karachan.org/*
// @version     1

// ==/UserScript==

var customLinks = ["b", "h", "oc", "kara"];
var links = {}; var chuj = $("#boardLinks");chuj.find("a").each(function() {links[$(this).text()] = $(this);}); chuj.empty();chuj.append("[ "); $.each(customLinks, function() {chuj.append(links[this]);(this != customLinks[customLinks.length-1]) ? chuj.append(" / ") : null;});chuj.append(" ]");