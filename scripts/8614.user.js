// ==UserScript==
// @name           ExpertsExchangeFilter
// @namespace      All
// @description    Remove Experts Exchange Stuff
// @include        http://experts-exchange.com/*
// @include        http://www.experts-exchange.com/*
// ==/UserScript==

function rot13(s){var r='';for (var i=0, len=s.length; i<len;i++){ c = s.charCodeAt(i); if ((c >= 65 && c <= 77) || (c >= 97 && c <= 109)) {c = s.charCodeAt(i) + 13;} else if ((c >= 78 && c <= 90) || (c >= 110 && c <= 122)) { c = s.charCodeAt(i) - 13; } r += String.fromCharCode(c);} return r;}
// DOM climbing gear
var snapshotToArray = function(snapshot){var ar = new Array();for (var i = 0; i < snapshot.snapshotLength; i++) {ar.push(snapshot.snapshotItem(i));} return ar; }
// Basic get element
var $ = function(id){return document.getElementById(id);}
// Get all by tag
var $a = function(tag){return document.getElementsByTagName(tag);}
// Get array of elements using xpath
var $x = function(xpath, node){ if (!node) node = document;	var result = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); return snapshotToArray(result); }

$x("//div[@class='s sectionFour shFFF5 sgray expGray allZonesMain taSearchRow']",document)[0].style.display="none"
$x("//div[@class='bl blQuestion']//div[@class='answers']",document)[0].style.display="none"
$x("//a[@class='startFreeTrial']",document)[0].style.display="none"
$x("//div[@id='relatedSolutions20X6']",document)[0].style.display="none"
$x("//div[@id='compSignUpNowVQP32']",document)[0].style.display="none"