// ==UserScript==
// @name           Single tab Alibaba
// @description    Makes links on Alibaba.com open in current tab. you can always over-write by choosing to open in new tab like you would on other sites.
// @include        http*://*.alibaba.com/*
// ==/UserScript==


var a, links;

links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
    if (a.target == "_blank") {
        a.target = "_self";
    }
}