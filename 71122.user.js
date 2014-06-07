// ==UserScript==
// @id             fanfiction.net Widescreen Fix
// @name           fanfiction.net Widescreen Fix
// @namespace      *
// @description    Simple script to force the story text containing element on fanfiction.net & fictionpress.com to be left-aligned and the content wrapper element to use 99% width, massively improving readability if you use halfpage width on a widescreen display. Requires Scriptish.
// @homepageURL    https://userscripts.org/scripts/show/71122
// @author         A for Anonymous
// @developer      Glenjamin
// @contributor    GhostFreeman
// @contributor    mr_daemon
// @version        2.3
// @updateURL      https://userscripts.org/scripts/source/71122.user.js
// @include        http://*.fanfiction.net/*
// @include        http://*.fictionpress.com/*
// @exclude        http://m.fanfiction.net/*
// @exclude        http://m.fictionpress.com/*
// @priority       -99999999
// @delay          1300
// ==/UserScript==

document.getElementById("content_wrapper").style.width="99.99%"
document.getElementById("storytext").parentNode.align="left"
