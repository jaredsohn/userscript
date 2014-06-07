// ==UserScript==
// @name      Flickr Photo Page Multi-Tag Search 
// @namespace   http://mrjoro.org/flickr/
// @description   Allows the searching for other photos that match more than one of a photo's tag.
// @include     http://www.flickr.com/photos/*
// @include     http://flickr.com/photos/*
// ==/UserScript==

// Version 0.3
// February 1, 2006
// Joseph Rozier
// http://mrjoro.org

// Version History
// Version 0.3 (2006.02.01) fixed so that it works with Greasemonkey 0.6.4/Firefox 1.5
// Version 0.2 (2005.07.29) flickr changed their tag urls to add an extra slash at the end
// Version 0.1 (2005.07.09) initial release

// This GreaseMonkey script adds the ability to do
// a multi-tag search from a photo page on flickr.
// The search performed will be an "all" search, meaning
// the photos returned must include all of the tags
// included in the search criteria.
// It adds a small link next to each tag (represented
// by a [+]) to add a tag to search criteria, and adds
// a link to apply the search criteria to public
// photos or the photos of the current photo's
// photographer.  Whenever a tag is added to the
// search criteria, the [+] becomes a [-]; clicking that
// removes the tag from the search criteria.

// This work is licensed under the Creative Commons
// Attribution-NonCommercial License. To view a copy
// of this license, visit 
// http://creativecommons.org/licenses/by-nc/2.5/
// or send a letter to 
// Creative Commons, 559 Nathan Abbott Way, Stanford, California 94305, USA.

(function()
{
	// the text for the links placed next to a tag to
	// add/remove it from the search criteria
	var SELECT_TEXT = "[+]";
	var UNSELECT_TEXT = "[-]";

	// items are added using the tagSearchText
	// each item is {link, tagSearchText, selected}
	var tags = new Array();
	
	var searchDiv = document.createElement("div");
	
	var userId;

	// this has window. because I need to make it
	// a global function so that it can be called
	// whenever the user clicks on a link
	mrjoro_onTagSearchClick = function()
	{
		var tagSearchText = this.getAttribute("tagSearchText");
		
		// tags contains an array of arrays, with
		// the first level being an associative array
		// keyed by the tag name; the second level
		// is an associative array representing
		// a tag, it's selection state and it's
		// link
		var tag = tags[tagSearchText];
		
		if(tag != null)
		{
			if(tag.selected)
			{
				// if it is already selected,
				// deselect it and change
				// the icon back to -
				tag.link.firstChild.data = SELECT_TEXT;
				tag.selected = false;
			}
			else
			{
				tag.link.firstChild.data = UNSELECT_TEXT;
				tag.selected = true;
			}
		}
		
		updateSearchDiv();
	};
	
	var updateSearchDiv = function()
	{
		// we create a link for each tag that has been added,
		// which, when clicked, will be removed
		// it is preceded by a "Search for: " link that 
		// will actually execute the search
		
		// for now, we'll just replace the div will a new div
		var newSearchDiv = document.createElement("div");
		searchDiv.parentNode.replaceChild(newSearchDiv, searchDiv);
		
		searchDiv = newSearchDiv;
		
		var selected = new Array();
		
		// figure out which children are selected
		// (it's an associative array)
		for(testTagKey in tags)
		{
			if(tags[testTagKey].selected)
			{
				selected.push(tags[testTagKey]);
			}
		}
		
		if(selected.length > 0)
		{
			// create the concatenated search text
			// in the format sanjose%2Ccalifornia			

			var tagUrlText = "";
			for(var i=0; i<selected.length; i++)
			{
				tagUrlText += selected[i].tagSearchText;
				
				if(i != selected.length-1)
				{
					tagUrlText += "%2C";
				}
			}
			
			
			// create the text to allow the person to perform the
			// search; it will have two links, one for searching
			// for the tags in the public photos, one for searching
			// in the current photo's account holder's photos
			
			searchDiv.appendChild(document.createTextNode("Search "));

			var searchPublicLink = document.createElement("a");
			var publicLinkUrl = "http://flickr.com/photos/search/tags:" + tagUrlText + "/tagmode:all/";
			searchPublicLink.setAttribute("href",publicLinkUrl);
			searchPublicLink.appendChild(document.createTextNode("(public)"));
			searchDiv.appendChild(searchPublicLink);

			if(userId != null)
			{
				searchDiv.appendChild(document.createTextNode(" "));
				var searchUserLink = document.createElement("a");
				var userLinkUrl = "http://flickr.com/photos/" + userId + "/search/tags:" + tagUrlText + "/tagmode:all/";
				searchUserLink.setAttribute("href",userLinkUrl);
				searchUserLink.appendChild(document.createTextNode("(user)"));
				searchDiv.appendChild(searchUserLink);
			}
			
			searchDiv.appendChild(document.createTextNode(" for:"));

			searchDiv.appendChild(document.createElement("br"));

			// display each tag that is in the search criteria;
			// each tag will be a link; clicking on the link will
			// remove the tag from the criteria
			for(var i=0; i<selected.length; i++)
			{
				var addToSearchLink = document.createElement("a");
				
				addToSearchLink.setAttribute("tagSearchText",selected[i].tagSearchText);
				addToSearchLink.addEventListener("click",mrjoro_onTagSearchClick,true);
				
				addToSearchLink.setAttribute("class","Grey");
				addToSearchLink.appendChild(document.createTextNode(selected[i].tagSearchText));
				searchDiv.appendChild(addToSearchLink);

				if(i != selected.length-1)
				{
					searchDiv.appendChild(document.createTextNode(" "));				
				}
			}			
			
			
			searchDiv.appendChild(document.createTextNode(tagText));

			searchDiv.appendChild(document.createElement("br"));
			
		}
	}
		
		

	var tagsDiv =  document.getElementById("thetags"); 

	if(tagsDiv != null)
	{
		// get the user id
		if(location.href != null)
		{
			// parse the url of the current page to get
			// the userid we will use for the tag
			// search that is specific to this user
			// (as opposed to the tag search for public
			// photos)
			
			// the URL is in the format http://<server>/photos/<userid>
			var photosIndex = location.href.indexOf('photos/');
			var startIndex = photosIndex+7;
			var nextslash = location.href.indexOf('/',startIndex);
			userId = location.href.substring(startIndex,nextslash);
		}
	
		// we'll place the search at the end of the tagsDiv	
		tagsDiv.appendChild(searchDiv);
	
	
		// place the link to add/remove a tag from searcing next
		// to each tag...
		// this XPath expression finds the div with id "thetags"
		// (which contains the tags links on the photo page), and
		// then finds the links within the tag that have
		// "/photos/tags" in the URL (which is the globe link
		// next to each tag); we get two pices of information from
		// that--where to place our link, and also the tag itself

		var tagsPattern = "//div[@id = 'thetags']/div/a[contains(@href,'/photos/tags/')]";
		var tagNodesSnapshot = 
			document.evaluate( tagsPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );			

		for(var i=0; i<tagNodesSnapshot.snapshotLength; i++)
		{
			var tagNode = tagNodesSnapshot.snapshotItem(i);

			var tagSearchText;
			
			// we want the text immediately after the / (so
			// add the length of the "/photos/tags/" text)...
                        // the format is now /photos/tags/<tag>/, so 
                        // we need to remove the final /

			var urlStart = tagNode.href.indexOf("/photos/tags/");
			var tagStart = urlStart + 13;
                        var tagEnd = tagNode.href.indexOf("/",tagStart);
                        if(tagEnd == -1)
                        {
                           tagEnd = tagNode.href.length();
                        }

			tagSearchText = tagNode.href.substring(tagStart,tagEnd);
			
			if(tagSearchText != null)
			{
				// create a small link before the tags
				var addToSearchLink = document.createElement("a");

				addToSearchLink.setAttribute("tagSearchText",tagSearchText);
				addToSearchLink.addEventListener("click",mrjoro_onTagSearchClick,true);
				
				addToSearchLink.setAttribute("class","Grey");
				addToSearchLink.appendChild(document.createTextNode(SELECT_TEXT));

				tags[tagSearchText] = new Array();
				tags[tagSearchText].link = addToSearchLink;
				tags[tagSearchText].tagSearchText = tagSearchText;
				tags[tagSearchText].selected = false;
				
				if(tagNode.parentNode != null)
				{
					tagNode.parentNode.insertBefore(addToSearchLink,tagNode);
				}

			}
		}
		
	}

})();	

