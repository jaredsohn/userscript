// ==UserScript==
// @name           OKCupid javascript remover
// @namespace      tag:brainonfire.net,2008-07-05:okcupid-less-script
// @description    Remove unnecessary javascript from OKCupid.com pages, replacing it with proper links.
// @include        http://*.okcupid.com/profile*
// @include        http://*.okcupid.com/mailbox*
// @version        0.2
// @changelog      Since 0.1: Mailbox folder links. (And generic window.location links.)
// ==/UserScript==

//restrict to subdomains of OKC (or main domain)
if(!/(^|\.)okcupid.com$/.test(location.hostname))
	return;


/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
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


//modules
function generic_location()
{
	var tabs = $xpath('//a[starts-with(@href, "javascript:window.location=")]');
	tabs.forEach(function(link)
	{
		var oldHref = link.getAttribute('href');
		var newHref = oldHref.replace(/^javascript:window\.location='(([^']|\\')+)';$/, '$1');
		if(oldHref !== newHref)
			link.setAttribute('href', newHref);
	});
}

function profile_compare()
{
	var link = $xpath('//div[@id="action-nav"]//a[@class="compare-profiles"]');
	if(link.length !== 1)
		return;
	link = link[0];
	var href = link.getAttribute('href');
	href = href.replace(/^javascript:compareProfile\('([0-9a-z_-]+)','([0-9a-z_-]+)'\);$/i, '/compare?x=$1&y=$2');
	link.setAttribute('href', href);
}

function mailbox_folderTabs()
{
	//actually, this is taken care of by the generic replacer
	//$xpath('//div[@id="rightContent"]/h1/following-sibling::ul[1][@id="tabs"]/li/a[starts-with(@href, "javascript")]');
}

//do different pages and sections

generic_location();

if(/^\/profile(\/|$)/i.test(location.pathname))
{
	profile_compare();
}
else if(location.pathname === '/mailbox')
{
	mailbox_folderTabs();
}


