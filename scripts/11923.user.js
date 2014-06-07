// ==UserScript==
// @name           Facebook Marketplace: Sane links
// @namespace      tag:brainonfire.net,2007-09-02:fbmarketlinks
// @description    Make Facebook Marketplace listings into proper links, so they can be middle-clicked, etc.
// @include        *.facebook.com/marketplace/*
// @version        0.1.0
// ==/UserScript==


/* Narrow include for security */
if(!/^https?:\/\/[.a-z0-9]+\.facebook\.com\/marketplace.+/i.test(location))
{
	return;
}

/* From http://wiki.greasespot.net/Code_snippets */
function $x(p, context)
{
	if(!context)
		context = document;
	var i;
	var arr = [];
	var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}


function handleListing(listing, listDex, allListings)
{
	var listID = listing.id.replace('classified_', '');
	var badLinks = $x(".//a[starts-with(@onclick, 'classifieds_pop_view(')]", listing);
	
	function handleBadLink(link, linkDex, allLinks)
	{
		link.setAttribute('href', '/marketplace/listing.php?classified_id='+listID);
	}

	badLinks.forEach(handleBadLink);
}

$x("//div[@id='results']/div[starts-with(@id,'classified_')]").forEach(handleListing);
