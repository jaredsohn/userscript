// ==UserScript==
// @name          prohardver.hu : forum : redirect to logout
// @description   replaces prohardver.hu forum links to logout.hu links
// @namespace     http://www.prohardver.hu/
// @include       http://www.prohardver.hu/*
// @include       http://prohardver.hu/*
// @include       http://www.mobilarena.hu/*
// @include       http://mobilarena.hu/*
// @include       http://www.itcafe.hu/*
// @include       http://itcafe.hu/*
// @include       http://www.logout.hu/*
// @include       http://logout.hu/*
// @include       http://www.gamepod.hu/*
// @include       http://gamepod.hu/*
// ==/UserScript==
var site1 = "logout.hu";

var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var re = /(www\.)?(prohardver|mobilarena|gamepod|itcafe|logout)\.hu\/(tema\/|forum\/|temak\/|muvelet\/tema\/uj\.php)/g;
var t = site1 + "/$3";
for (var n = 0; n < links.snapshotLength; n++)
{
	var link = links.snapshotItem(n);
	link.href = link.href.replace(re, t);
}
