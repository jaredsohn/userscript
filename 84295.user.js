// ==UserScript==
// @name           Redirect tf2wiki.net to wiki.teamfortress.com
// @description    When you open a tf2wiki page, it will load the equivalent page on the Official TF2 Wiki.
// @include        http://tf2wiki.net/*
// @include        http://www.tf2wiki.net/*
// ==/UserScript==

window.location.href = window.location.href.replace(/(www.)?tf2wiki.net/, "wiki.teamfortress.com");
