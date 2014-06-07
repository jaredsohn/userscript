// ==UserScript==
// @name Change IP Address
// @namespace twonky
// @description Change Twonky IP Address
// @include http://localhost:10010/*
// @exclude http://localhost:10010/setup.htm
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
 link = links[i];
 link.href = link.href.replace('basilea.no-ip.org:10010', 'localhost:10010');
}

var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; i++) {
 img = imgs[i];
 img.src = img.src.replace('basilea.no-ip.org:10010', 'localhost:10010');
}