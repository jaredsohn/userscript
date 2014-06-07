// ==UserScript==
// @name           antiproxy4wikipedia
// @description    Change links in wikipedia so users behind isp proxies (virgin media et al) can still edit anon.
// @include        http:*wikipedia.org*
// @include        https://secure.wikimedia.org/wikipedia/*
// @exclude
// @version	       0.1
// ==/UserScript==
// TO DO
// cleanup code (maybe use forEach) (probably avoid having to different ifs)
// security audit (can a malformed url do nasty stuff?, why would somebody be going to a malformed wiki url)

var allLinks, thisLink, change;
var banned = [];
banned[0] = "action=edit"
banned[1] = "Virgin_Killer"

//get links (from http://diveintogreasemonkey.org)
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

//use https for relevant pages 
if (window.location.host.match("wikipedia.org")) {
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		change = false
		for (var j = 0; j < banned.length ; j++) {
			if (thisLink.href.match(banned[j])) { change = true }
		}
		if (change) {
			thisLink.href = thisLink.href.replace("http://", "https://secure.wikimedia.org/wikipedia/") //change the domain
			thisLink.href = thisLink.href.replace(window.location.host , window.location.host.replace(".wikipedia.org","")) //move the country tag
		}
	}	
}

//dont use https when not needed to avoid hammering the wikiservers
if (window.location.host.match("secure.wikimedia.org")) {
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		change = false
		for (var j = 0; j < banned.length ; j++) {
			if (thisLink.href.match(banned[j])) { change = true }
		}
		if (!change) {
			thisLink.href = thisLink.href.replace("https://secure.wikimedia.org/wikipedia/","http://")
			thisLink.href = thisLink.href.replace("/w",".wikipedia.org/w") // /w should catch /w/ and /wikipages but may cause problems if pages contains /w in name
		}
	}
}