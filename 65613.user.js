// ==UserScript==
// @name           Crypt-It_Autodownloader
// @namespace      www.yugius.de
// @description    Skips Crypt-It Waitscreen and brings you direct to the ccf
// @include        http://crypt-it.com/s/*
// ==/UserScript==



location.href = location.href.replace("/s/", "/d/");

window.close();