// ==UserScript==
// @name          digg - Befriended Diggers
// @description   Adds a link to befriended list on Digg
// @namespace     http://loucypher.wordpress.com/
// @include       http://digg.com/users/*/friends/*
// @include       http://www.digg.com/users/*/friends/*
// ==/UserScript==

// Idea based on Yashar's Who has befriended me on Digg?
// http://userscripts.org/scripts/show/6798

var XPath = "//div[@class='sub-menu']/span[3]";
var sFriends = document.evaluate(XPath, document, null, 0, null).iterateNext();
if(!sFriends) return;

var profile = location.href.match(/\/users\/\w+\/friends\//);
var bFriends = document.createElement("a");
bFriends.className = "tool";
bFriends.href = profile + "befriended";
bFriends.appendChild(document.createTextNode("Befriended"));

sFriends.appendChild(bFriends);

