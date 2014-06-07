// ==UserScript==
// @name           XKCD Forums Redirect
// @namespace      com.scorcheduniverse
// @description    Always redirects links to the forums.xkcd.com domain
// @include        http://echochamber.me/*
// @include        http://fora.xkcd.com/*
// @include        http://www.fora.xkcd.com/*
// @include        http://www.echochamber.me/*
// @include        http://www.forums.xkcd.com/*
// ==/UserScript==

window.location.host = "forums.xkcd.com"