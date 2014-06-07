// ==UserScript==
// @name           Fok Bazenplugin!
// @namespace      Tim Kuik
// @include        http://forum.fok.nl/*
// ==/UserScript==
// Determine menu text

document.body.innerHTML = document.body.innerHTML.replace(/(http:\/\/i.fok.nl\/s\/([a-z])\.gif)/gi, "http:\/\/i55.tinypic.com\/2mfmznr.png");