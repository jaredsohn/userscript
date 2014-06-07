//Gawker always blog view
//By Christopher Alden (aka HeartBurnKid, Godkarmachine, CuvisTheConqueror)
//Rev 0.2 5/13/2011
//Some code taken from the ebook "Dive into Greasemonkey"

// ==UserScript==
// @name           Gawker Always Blog View
// @namespace      http://godkarmachine.com/gawkeralwaysblogview
// @description    Enforces blog view on Gawker sites that support it
// @include        http://lifehacker.com/*
// @include        http://gizmodo.com/*
// @include        http://gawker.com/*
// @include        http://deadspin.com/*
// @include        http://kotaku.com/*
// @include        http://jezebel.com/*
// @include        http://io9.com/*
// @include        http://jalopnik.com/*
// @include        http://blog.lifehacker.com/*
// @include        http://blog.gizmodo.com/*
// @include        http://blog.gawker.com/*
// @include        http://blog.deadspin.com/*
// @include        http://blog.kotaku.com/*
// @include        http://blog.jezebel.com/*
// @include        http://blog.io9.com/*
// @include        http://blog.jalopnik.com/*
// ==/UserScript==

//note that the namespace is a dummy url; if I actually end up making a page for this, I'll put it there. :)

//if we're not already in blog view, go there
if (window.location.href.substr(7,4).toLowerCase() != "blog")
	window.location.href = window.location.href.substr(0,7) + "blog." + window.location.href.substr(7);

//list all Gawker sites here for link processing	
//when adding new sites, use only lowercase letters
var sites = new Array("lifehacker","gizmodo","gawker","deadspin","kotaku","jezebel","io9","jalopnik");
var allLinks, thisLink;

//get all links
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
//evaluate each link to see if it goes to a gawker site
//if so, insert "blog." into the url
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    for (var j = 0; j < sites.length; j++)	{
		if (thisLink.href.substr(7,sites[j].length).toLowerCase() == sites[j])
			thisLink.href = thisLink.href.substr(0,7) + "blog." + thisLink.href.substr(7);
	}
}
