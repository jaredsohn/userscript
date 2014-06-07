// ==UserScript==
// @name           Restore Google Search Links (Groups, Froogle, Books, etc.)
// @namespace      http://russelldavis.mvps.org
// @description    Brings back google search links out of the "more »" link popup
// @include        http://*.google.com/*
// ==/UserScript==

// Convenience function for a simple single node xpath query
function xpathFirst(xpath, context)
{
    if (!context)
		context = document;

    var result = document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

    if (!result)
    	return;

    return result.singleNodeValue;
}

// Convenience functions for dom insertion
function nodePutBefore(nodInsert, nodRef)
{
	nodRef.parentNode.insertBefore(nodInsert, nodRef);
}

function nodePutAfter(nodInsert, nodRef)
{
	nodePutBefore(nodInsert, nodRef.nextSibling);
}

function nodeRemove(nod)
{
	nod.parentNode.removeChild(nod);
}


////////////////////////////
// Main functionality below
////////////////////////////

// This is used by both isValidSearchPage and restoreGoogleSearchLink
var g_nodMore = xpathFirst('//a[@class="q"][.="more\u00A0\u00BB"]');

function isValidSearchPage()
{
	// We want to make sure we're dealing with the right page before modifying the DOM.
	if (!g_nodMore) return false;
	var nodEvenMore = xpathFirst('//a[@class="q"][.="even more\u00A0\u00BB"]');
	if (!nodEvenMore) return false;
	
	return true;
}

function getSearchLinkXPath(name)
{
	// Normally, we're looking for a link w/ class "q"
	var xpath1 = '//a[@class="q"][.="' + name + '"]';
	// But if we're on the page the link refers to, it will just be bold text
	var xpath2 = '/b[.="' + name + '"]';
	return xpath1 + "|" + xpath2;
}

// This function does the actual work of moving the nodes around in the dom.
// PARAMETERS:
//  name: The text of the link you want to restore
//  insertAfter: The text of the link you want the restored link to be placed after.
//               If this parameter is missing, the link will precede the "more" link.
function restoreGoogleSearchLink(name, insertAfter)
{
	
	// Find the link we want to restore
	var xpath = getSearchLinkXPath(name);
	var nodRestore = xpathFirst(xpath);
	
	// Determine the node to insert the link after
	var nodInsAfter;
	if (insertAfter)
	{
		xpath = getSearchLinkXPath(insertAfter);
		nodInsAfter = xpathFirst(xpath);
	}
	else
	{
		nodInsAfter = g_nodMore.parentNode.previousSibling.previousSibling;
	}
	
	// Copy the whitespace node to surround our newly placed link with
	var nodSpace = nodInsAfter.nextSibling.cloneNode(true);
	// Save away the parent node so we can remove it later
	// (it will be an empty div that we don't want anymore)
	var nodOldParent = nodRestore.parentNode;

	// Place the link & whitespace
	nodePutAfter(nodSpace, nodInsAfter);
	nodePutAfter(nodRestore, nodSpace);
	// Remove the link's old div container. We do this last so that if
	// anything above fails, the original link will still be there.
	nodeRemove(nodOldParent);
}

function main()
{
	if (!isValidSearchPage()) return;
	
	// Modify the code below to customize this script's behavior.
	// The first parameter is the name of the link you want to restore.
	// The second parameter is the the name of the link the restored link will be placed after.
	// If the second parameter is missing, the link will precede the "more" link.
	restoreGoogleSearchLink("Groups", "Images");
	restoreGoogleSearchLink("Froogle");
	restoreGoogleSearchLink("Books");
}

main();
