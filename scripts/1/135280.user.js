// ==UserScript==
// @name Quoka Adblocker
// @description Removes ads from German classified site Quoka.de; Entfernt Werbung aus den Kleinanzeigen von Quoka.de
// @include http://www.quoka.de/*
// ==/UserScript==


console.log("Version ID " + "0057");
// var divCounter = 0;

document.addEventListener("DOMNodeInserted", function(e) {
	var node = e.target;
	deleteAdListings(node);
	// console.log("Deleted " + divCounter + " ad blocks.");
});

 window.addEventListener("DOMContentLoaded", function(e) {
	// console.log("DOM content loaded."); 
	deleteAdListings(document.body);
	deleteGalleryAds();
});


function deleteGalleryAds() {
	var listNode = document.getElementById("ContentPoleposition_Result");
	if (listNode) {
		listNode.parentNode.removeChild(listNode);
		// console.log("Gallery ads deleted.");
	}
}

function deleteAdListings(insertedNode) {
	if (insertedNode)
	{
		if (	insertedNode.className
				&& insertedNode.className.match(/^plista/)
		)
		{
			insertedNode.parentNode.removeChild(insertedNode);
			return;
		}
		processNode(insertedNode);
	}
}

function processNode(insertedNode) {
	if (insertedNode)
	{
		if 	(
				(isAdCheckNode(insertedNode))
				&&
				(IsAd(insertedNode))
			)
		{
				deleteAd(insertedNode);
		}
		else
		{
			for(var i = 0; i < insertedNode.childNodes.length; i++)
			{
				if (insertedNode.childNodes[i])
				{
					processNode(insertedNode.childNodes[i]);
				} 
				else break;
			}
		}
	}
}

function isAdCheckNode(insertedNode) {
	if	(
				(insertedNode.className == "yui3-u-1-12 date")
			||	(insertedNode.className == "yui3-u-1-6")
			||	(insertedNode.className == "yui3-u-1 headline item fn")
			||	(insertedNode.className == "toplist-all")
		)
	{
		return true;
	}
	return false;
}

function deleteAd(insertedNode) {
	var parNode = insertedNode.parentNode;
	while (parNode)
	{
		if (
					(parNode.className == "list-item")
				||	(parNode.className == "resultListItem relatedAd")
			)
		{
			if (parNode.parentNode)
			{
				parNode.parentNode.removeChild(parNode);
			} else // li element has no parent, abort deletion
			{
				parNode = null;
			}
			
		} else // li element must be further up in the hierarchy
		{
			parNode = parNode.parentNode;
		}
	}
}

function IsAd(node){
	var str = node.innerHTML
	if (str == null) {
		return false;
	} else if (str.indexOf("Anzeige") > -1) {
		return true;
	}
	return false;
}