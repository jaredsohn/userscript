// ==UserScript==
// @name           IG-cleaner
// @namespace      http://mindbender.fi/scripts/
// @description    removes some unnecessary crap from Irc-Galleria's front page.
// @include        http://*irc-galleria.net/index.php
// ==/UserScript==

// poistettavat elementit (päivitetty 23.6.2009)
var adlist = [
	"advzone_81",
	"advzone_82",
	"advzone_83",
	"advzone_84",
	"advzone_85",
	"advzone_86",
	"advzone_87",
	"advzone_88",
	"advzone_89",
	"advzone_90",
	"advzone_91",
	"advzone_92",
	"advzone_93",
	"advzone_94",
	"advzone_95",
	"advzone_96",
	"advzone_97",
	"advzone_98",
	"advzone_99",
	"advzone_10001",
	"advzone_10002",
	"advzone_10107",
	"indexleaf",
	"indexmycommunity",
	"hotlist-box"
	];
var allLogs, thisLog, allBd, thisBd, newsbox, ads;
var ad = [];

allLogs = document.evaluate("//div[@id='indexlastlogin']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
allBd = document.evaluate("//div[@id='indexbirthday']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thisLog = allLogs.snapshotItem(0);
thisBd = allBd.snapshotItem(0);
newsbox = document.getElementById('newsbox');
if(!newsbox) {
	newsbox =document.getElementById('indexintrobox');
}
if(newsbox) {
	thisLog.parentNode.removeChild(thisLog);
	thisBd.parentNode.removeChild(thisBd);
	newsbox.parentNode.insertBefore(thisLog, newsbox);
	newsbox.parentNode.insertBefore(thisBd, newsbox);
}

for(var i = 0; i < adlist.length; i++) {
	ad[i] = document.evaluate("//div[@id='"+adlist[i]+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

for(var i = 0; i < ad.length; i++) {
	ads = ad[i].snapshotItem(0);
	if(ads) {
		ads.parentNode.removeChild(ads);
	}
}