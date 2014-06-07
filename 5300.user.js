// ==UserScript==
// @name	Tomshardware
// @description  Remove commercials in http://tomshardware.thgweb.de/
// @include	http://tomshardware.thgweb.de/*
// ==/UserScript==
var ad = document.evaluate("//iframe[@name='google_ads_frame']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for ( var i = 0 ; i < ad.snapshotLength; i++ )
	ad.snapshotItem(i).src = "";
ad = document.evaluate("//table[@class='midColNews']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var tds = ad.snapshotItem(0).getElementsByTagName('td');
tds[1].style.display = "none";
var test = document.getElementsByTagName("center");
test[1].parentNode.parentNode.style.display = "none";
ad = document.evaluate("//div[@class='bargrey']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for ( var i = 0 ; i < ad.snapshotLength; i++ ) 
	ad.snapshotItem(i).style.display = "none"
ad = document.evaluate("//div[@class='box']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
ad.snapshotItem(ad.snapshotLength-1).style.display = "none"