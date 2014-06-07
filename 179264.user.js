// ==UserScript==
// @name        taz.de paywall killer
// @namespace   tuxproject.de
// @description entfernt die taz.de-Paywall
// @include     http://taz.de/*
// @include     http://www.taz.de/*
// @version     20131005
// ==/UserScript==

function XPath(Params) { return document.evaluate(Params, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }

var tazpaywall = XPath('//*[@id="tzi_paywall"]').snapshotItem(0);
if (tazpaywall) tazpaywall.parentNode.removeChild(tazpaywall);

var adzonewall = XPath('//*[@id="ad_zone_wall"]').snapshotItem(0);
if (adzonewall) adzonewall.parentNode.removeChild(adzonewall);
