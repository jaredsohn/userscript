// ==UserScript==
// @name           xkcd echochamber redirect
// @namespace      Nav
// @description    redirects traffic from forum subdomains of xkcd to echochamber.me, so you don't need to login three times
// @include        http://forums.xkcd.com/*
// @include        http://forums3.xkcd.com/*
// @include        http://fora.xkcd.com/*
// @include        http://echochamber.me/*
// ==/UserScript==

if (window.location.hostname != "echochamber.me") {window.location.hostname = "echochamber.me";}