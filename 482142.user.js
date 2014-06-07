// ==UserScript==
// @name           TVTropes link descriptions
// @version        0.3.1
// @namespace      http://www.dwedit.org/
// @description    Shows the short version of a page (Laconic version) when you mouseover a link.  Also fixes outbound links.
// @include        http://tvtropes.org/pmwiki/pmwiki.php/*
// @grant		   none
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function attachToLinks()
{
	//Attach to all links that go somewhere inside pmwiki.php
	var documentLinks = document.getElementsByTagName("a");
	var lookFor = "pmwiki.php/";
	var lookFor2 = "http://tvtropes.org/pmwiki/no_outbounds.php?o=";
	
	for (var i = 0; i < documentLinks.length; i++)
	{
		var docLink = documentLinks[i];
		var url = docLink.href;
		
		var foundIndex = url.indexOf(lookFor);
		if (foundIndex != -1)
		{
			docLink.onmouseover = loadLaconicLater;
		}
	}
}

function loadLaconicLater(mouseEvent)
{
	//calls SetTimeout so it loads the page 250ms later.
	var docLink = mouseEvent.target;
	
	var url = docLink.href;

	var lastSlash = url.lastIndexOf("/");
	if (lastSlash == -1)
	{
		return;
	}
	lastSlash++;
	var pageName = url.substr(lastSlash);
	
	//Verify that the link is indeed for a TvTropes page
	var lookFor = "pmwiki.php/";
	var namespaceIndex = url.indexOf(lookFor);
	
	if (namespaceIndex == -1)
	{
		return;
	}
	else
	{
		namespaceIndex += lookFor.length;
	}
	
	//Get the namespace name (not used, but cool to have anyway)
	var pageNamespace = url.substring(namespaceIndex,lastSlash);
	
	//Check if we have a cached copy of the page (using localStorage)
	var key = "content-"+pageName;
	var dateKey = "date-"+pageName;
	var cachedContent = localStorage.getItem(key);
	if (cachedContent != null)
	{
		var BLANK_EXPIRATION_DAYS = 30;
		var NONBLANK_EXPIRATION_DAYS = 60;
		var dateValue = localStorage.getItem(dateKey);
		var recordDate = new Date(new Number(dateValue));
		var elapsedTime = Number(Date.now()) - Number(recordDate);
		var maxTime;
		if (cachedContent == "")
		{
			maxTime = BLANK_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
		}
		else
		{
			maxTime = NONBLANK_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
		}
		if (elapsedTime < maxTime)
		{
			setLinkText(docLink, cachedContent);
			return;
		}
        else
        {
            
        }
	}
	
	//build the URL to fetch
	var laconicUrl = "http://tvtropes.org/pmwiki/pmwiki.php/Laconic/" + pageName;
	
	//Fetch the page
	$.get(laconicUrl, function(data) {
		handleResponse(data, docLink, pageName);
    });
}

function handleResponse(data, docLink, pageName)
{
	//Get Title and Body tags
    var pageContent = $(data).find("#wikitext")[0].innerHTML;
    
    if (pageContent != null)
    {
		//Stop at the first horizontal line in the page source
		var indexOfHorizontalLine = pageContent.indexOf("<hr");
		if (indexOfHorizontalLine != -1)
		{
			pageContent = pageContent.substr(0,indexOfHorizontalLine);
		}
	
		pageContent = pageContent.substr(0, indexOfHorizontalLine - 1);
	
        var tagRemovedCount = 0;
        while (tagRemovedCount < 500)
        {
            var tagIndex = pageContent.indexOf("<");
            if (tagIndex == -1)
            {
                break;
            }
            var closingTagIndex = pageContent.indexOf(">");
            if (closingTagIndex == -1)
            {
                break;
            }
            pageContent = pageContent.substr(0,tagIndex) + pageContent.substr(closingTagIndex+1);
            tagRemovedCount++;
        }
        
		//Trim whitespace
		pageContent = pageContent.replace(/^\s+|\s+$/g,'');
	
		//make two entries in local storage, one for the page content, one for the date it was entered
		var key1 = "content-" + pageName;
		var key2 = "date-" + pageName;
		
		var value1 = pageContent;
		var value2 = Date.now().toString();
		
		localStorage.setItem(key1,value1);
		localStorage.setItem(key2,value2);
		
		//Set the link hover text
		setLinkText(docLink, pageContent);
	}
}

function setLinkText(docLink, content)
{
	if (content != "")
	{
		docLink.title = content;
	}
}

attachToLinks();