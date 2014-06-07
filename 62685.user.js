// ==UserScript==
// @name Remove Ads
// @namespace © Scorch
// @description Removes the RuneScape Navigation Bar and Ad-Box!
// @include *http://world*.runescape.com/*
// ==/UserScript==

var currentpage = window.location.href;

if(currentpage.indexOf(”runescape.com/p”) != -1 || currentpage.indexOf(”runescape.com/l”) != -1){
