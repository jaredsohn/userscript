// ==UserScript==
// @name           Zootool Auto-Redirect
// @namespace      thisisgordon
// @description    Auto-redirect Zootool links.
// @homepage      http://www.thebasement.at
// @include       http://zootool.com/watch/*
// ==/UserScript==
                       
el = document.getElementById('thumb').getElementsByTagName("a")[0].getAttribute("href");

window.location.href = el;