// ==UserScript==
// @name Grooveshark NS
// @namespace 
// @version  1.0 
// @description    I'll put it on here when it works
// @include        http://listen.grooveshark.com/*
// @author         Anonier
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==

var a = "function d() {GS.user.IsPremium = 1;}var t = setTimeout(d, 2000);"

function c(b) {
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.innerHTML = b;
    return document.head.appendChild(elem);
}

var i = c(a);