// ==UserScript==
// @name Twonky: Change IP Address
// @namespace twonky
// @description Change Twonky IP Address
// @include http://*
// @include https://*
// ==/UserScript==

var hostname = "www.domain.tld:9000";
var ipaddr = "192.168.1.100:9000";

var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
 link = links[i];
 link.href = link.href.replace(ipaddr, hostname);
}

var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; i++) {
 img = imgs[i];
 img.src = img.src.replace(ipaddr, hostname);
}