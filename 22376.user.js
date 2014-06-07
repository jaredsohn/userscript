// ==UserScript==
// @name    Remove ads from Joystiq
// @include    *.joystiq.com/*
// ==/UserScript==
//

//remove skyscrapers
var skys = document.evaluate( "//div[@class='skyscraper']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
skys.snapshotItem(0).innerHTML = "";
skys.snapshotItem(1).innerHTML = "";

//remove medrect
var medrect = document.evaluate( "//div[@class='medrect']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
medrect.snapshotItem(0).innerHTML = "";
medrect.snapshotItem(1).innerHTML = "";
medrect.snapshotItem(2).innerHTML = "";

//remove leaders
var topleader = document.evaluate( "//div[@id='topleader']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
topleader.snapshotItem(0).innerHTML = "";

var bottomleader = document.evaluate( "//div[@class='bottomleader']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
bottomleader.snapshotItem(0).innerHTML = "";

//remove sponsored
var sponsored = document.evaluate( "//p[@class='sponsored']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
sponsored.snapshotItem(0).innerHTML = "";

//remove outerslice
var outerslice = document.evaluate( "//div[@id='outerslice']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
outerslice.snapshotItem(0).innerHTML = "";