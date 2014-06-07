// ==UserScript==
// @name           TVTropes link descriptions 0.0.2
// @namespace      http://www.dwedit.org/
// @description    Shows the short version of a page (Laconic version) when you mouseover a link.  Also fixes outbound links.
// @include        http://tvtropes.org/pmwiki/pmwiki.php/*
// @grant		   none
// ==/UserScript==

//two global variables
var myTimeout = -1; 	//timeout ID for SetTimeout
var myRequest = null;	//XMLHttpRequest object for asynchonous loading

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
		else
		{
			//fix outbound links
			var foundIndex2 = url.indexOf(lookFor2);
			if (foundIndex2 != -1)
			{
				var realUrlIndex = foundIndex2 + lookFor2.length;
				var realUrlEncoded = url.substr(realUrlIndex, url.length - realUrlIndex)
				var realUrl = unescape(realUrlEncoded);
				docLink.href = realUrl;
			}
		}
	}
}

function loadLaconicLater(mouseEvent)
{
	//calls SetTimeout so it loads the page 250ms later.
	var docLink = mouseEvent.target;
	
	//Do we already have a timeout waiting?
	if (myTimeout != -1)
	{
		//Clear the old timeout
		window.clearTimeout(myTimeout);
	}
	//Set the new timeout
	myLink = docLink;
	myTimeout = window.setTimeout(timeoutHandler,250);
}

function timeoutHandler()
{
	var docLink = myLink;
	//Do we have a request in progress?
	if (myRequest != null)
	{
		//Abort it if it's not finished.
		if (myRequest.readyState != 4)
		{
			myRequest.abort();
		}
		myRequest = null;
	}

	//Get page name by looking for the last slash (this make it work from any "namespace" on the site)

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
	var laconicUrl = "http://tvtropes.org/pmwiki/pmwiki.php/Laconic/" + pageName + "?action=source";
	
	//Fetch the page
	myRequest = new XMLHttpRequest();
	myRequest.myLink = docLink;
	myRequest.myPageName = pageName;
	myRequest.onreadystatechange = readyStateChangeHandler;
	myRequest.open("GET", laconicUrl, true);
	myRequest.send(null);
}

function readyStateChangeHandler(myEvent)
{
	//Handles the events of the XMLHttpRequest object
	var request = myEvent.target;
	if (request.readyState == 4)
	{
		if (request.status == 200)
		{
			handleResponse(request.responseText, request.myLink, request.myPageName);
			request.myLink = null;  //avoid a memory leak?
		}
	}
}

function handleResponse(html, docLink, pageName)
{
	//Clean up the XML validation errors (one bad meta tag)
	html = html.replace("<META NAME=\"ROBOTS\" CONTENT=\"NOINDEX, NOFOLLOW\">","<meta name=\"ROBOTS\" contents=\"NOINDEX, NOFOLLOW\"/>");
	
	//Replace line brake tags with newlines
	html = html.replace("<br/>","\n");
	html = html.replace("<br />","\n");
	html = html.replace("<br\n/>","\n");
	
	//Convert html code from string to XML dom tree
	var parser = new DOMParser();  
	var doc = parser.parseFromString(html, "application/xml");
	
	//Get Title and Body tags
	var pageTitle = doc.getElementsByTagName("title")[0].innerHTML;
	var pageContent = doc.getElementsByTagName("body")[0].innerHTML;
	
	//Stop at the first horizontal line in the page source
	var indexOfHorizontalLine = pageContent.indexOf("----");
	if (indexOfHorizontalLine != -1)
	{
		pageContent = pageContent.substr(0,indexOfHorizontalLine);
	}
	
	//Remove any leftover HTML tags
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
	
	//Not sure if this happens or not
	if (pageTitle == "source: Main.HomePage")
	{
		//If we get the home page for some reason, add a blank into local storage, along with date it was fetched
		var key1 = "content-" + pageName;
		var key2 = "date-" + pageName;
		var value1 = "";
		var value2 = Date.now().toString();
		localStorage.setItem(key1,value1);
		localStorage.setItem(key2,value2);
		return;
	}
	else
	{
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
