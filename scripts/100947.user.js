// ==UserScript==
// @name           Auto Noko (Kusaba)
// @namespace      miofag
// @include        http://*chan.org/*/res/*
// @include        http://*chan2.org/*/res/*
// @include        http://*chan.info/*/res/*
// @include        http://*chan.net/*/thread*
// @include        http://*chan.net/*/res/*
// @exclude        http://*4chan.org/*

// ==/UserScript==

document.getElementsByName("em", "input")[0].value = "noko";