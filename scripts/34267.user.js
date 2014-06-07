// ==UserScript==
// @name           Flash and Ad Killer
// @namespace      http://userscripts.org/scripts/review/99999
// @include        http://*
// @exclude        http://*mail.google.com/*
// @exclude        https://*mail.google.com/*

// @description    Kills flash objects and adds
// ==/UserScript==

//Remove Objects
	var allLinks, thisLink;
	allLinks = document.evaluate( '//object', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 
	for (var i = 0; i < allLinks.snapshotLength; i++) { 
	  thisLink = allLinks.snapshotItem(i);
	  GM_log("Removed Found object: " + thisLink);
	  thisLink.parentNode.removeChild(thisLink);
	}
	
//Remove Embeds
	var allLinks, thisLink;
	allLinks = document.evaluate( '//embed', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 
	for (var i = 0; i < allLinks.snapshotLength; i++) { 
	  thisLink = allLinks.snapshotItem(i);
	  GM_log("Removed Found Embed: " + thisLink);
	  thisLink.parentNode.removeChild(thisLink);
	}	

//Remove iframes
	var allLinks, thisLink;
	allLinks = document.evaluate( '//iframe', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 
	for (var i = 0; i < allLinks.snapshotLength; i++) { 
	  thisLink = allLinks.snapshotItem(i);
	  GM_log("Removed Found iframe: " + thisLink);
	  thisLink.parentNode.removeChild(thisLink);
	}

//Remove Links
	var allLinks, thisLink;
	var regex = /\.ads\/|\/ads\/|ad\.doubleclick|googlesyndication|\/banners\/|alexa\.com|adlink|pop_me_up|adfeatures/gi
	allLinks = document.evaluate( '//a[@href]',
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	  	thisLink = allLinks.snapshotItem(i);
	 	var urll = thisLink.href;
	  	if (urll.search(regex) != -1) {
	  		thisLink.parentNode.removeChild(thisLink);
	  		GM_log("Removed Found ads: " + thisLink);
	  	}
	}

//Remove Images
	var allLinks, thisLink;
	var regex = /(b|B)anner|adsense|advertisement|tribalfusion|\/ads/gi
	allLinks = document.evaluate( '//img',
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	  	thisLink = allLinks.snapshotItem(i);
	 	var urll = thisLink.src + thisLink.alt;
	  	if (urll.search(regex) != -1) {
	  		thisLink.parentNode.removeChild(thisLink);
	  		GM_log("Removed Found image: " + thisLink);
	  	}
	}

//remove any banner images -- id contains match
	var allLinks, thisLink;
	var regex = /(b|B)anner|subscribeForm|mainSubOffer/gi;
	allLinks = document.evaluate( '//div[@id]',
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	  	thisLink = allLinks.snapshotItem(i);
	  	if (thisLink.id.search(regex) != -1) {
	  		thisLink.parentNode.removeChild(thisLink);
  			GM_log("Removed Found banner -- matched id: " + thisLink.innerHTML);
  		}
	}

//remove any banner divs -- class contains match
	var allLinks, thisLink;
	var regex = /banner|alexa|articleAds/gi;
	allLinks = document.evaluate( "//div[@class]",
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 
	GM_log("allLinks.snapshotLength: " + allLinks.snapshotLength);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		GM_log("thisLink.className: " + thisLink.className);
		if (thisLink.className.search(regex) != -1) {
			thisLink.parentNode.removeChild(thisLink);
		}
	}

//Might be worth testing how fast this compares with loading all elemenets and processing them.


