// ==UserScript==
// @name           abstrusegoose image src
// @namespace      http://www.benibela.de
// @include        http://abstrusegoose.com/*
// ==/UserScript==

var img = document.getElementsByTagName("img")[1];
document.getElementsByTagName("h3")[0].innerHTML = document.getElementsByTagName("h3")[0].innerHTML + ": <em>"+img.src+"</em>, <span style='color: #006699'>"+img.title+ "</span>, "+img.alt;