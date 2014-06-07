// ==UserScript==
// @name           Newzbin IMDB rating
// @namespace      nanobyte
// @description    Displays the rating besides usenet posts that feature an IMDB link.
// @include        http://v3.newzbin.com/*
// ==/UserScript==

function processTitle(title, link)
{
	var url = "http://www.imdb.com/title/" + title + "/";
	//GM_log("Constructed IMDB url: " + url);

	GM_xmlhttpRequest({ 
		method : "GET",
		url : url,
		onload : function(details) {	
			//GM_log("Received IMDB response: " + details.responseText.length + " bytes.");
			var rating = getRating(details.responseText);
			//GM_log('Retrieved IMDB rating: ' + rating); 	
			link.appendChild(document.createTextNode("Rating: " + rating));
		}
	});
}

function getRating(page)
{
	var result = page.match(/User Rating:[\s\S]*?<b>([^\/]+)\/10/);
	if(result)
		return parseFloat(result[1]);
	else
		return 0.0;
}

//GM_log('This is the newzbin script.');

function processLinks()
{
	var allLinks = document.evaluate('//a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log('Found ' + allLinks.snapshotLength + ' links.');

	for(var x=0; x<allLinks.snapshotLength; x++) 
	{
		var link = allLinks.snapshotItem(x);
		var result = link.href.match(/imdb\.com.*?(tt\d+)/);
		if(result)
		{		
			//GM_log("Processing IMDB title: " + result[1]);
			processTitle(result[1], link);				
		}
	}
}

processLinks();