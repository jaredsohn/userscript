// ==UserScript==
// @author         RDs
// @version        1.2
// @name           Classic Map - dunnsearch.net
// @namespace      http://www.dunnsearch.net
// @description    Classic map on Conquer Club
// @include        http://conquerclub.com/*
// @include        http://www.conquerclub.com/*
// ==/UserScript==
http://i34.tinypic.com/2z9kw2t.jpg="maps/Classic_Shapes.L.jpg";

var img1 = document.evaluate("//img[contains(@src, 'maps/Classic_Shapes.L.jpg')]",document,null,9,null).singleNodeValue;

var imgReplacementSrc = "http://i36.tinypic.com/ei5eo5.gif";

img1.src = imgReplacementSrc;