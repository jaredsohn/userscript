// ==UserScript==
// @name           Fav button
// @namespace      http://redrum.cz
// @description    Put favorites link in to the twitter header
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var header = document.querySelector("#global-nav ul");
var li_fav = document.createElement("li");
var li_fav_a = document.createElement("a");
var li_fav_text = document.createTextNode("Favorites");
li_fav_a.appendChild(li_fav_text);
li_fav_a.setAttribute("href", "/#!/favorites");
li_fav.appendChild(li_fav_a);
header.appendChild(li_fav);

