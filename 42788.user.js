// ==UserScript==
// @name           WTHashtag
// @namespace      http://wthashtag.com/
// @description    Links hashtags on Twitter back to their page on WTHashtag
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var entries, entry;

// Find all the tweets
entries = document.evaluate(
    "//*[@class='entry-content']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// Loop over the tweets and find any hashtags - then link 'em up
for(var i = 0; i < entries.snapshotLength; i++)
{
    entry = entries.snapshotItem(i);
    entry.innerHTML = entry.innerHTML.replace(/#([A-Za-z0-9]+)/g, '#<a href="http://wthashtag.com/$1" title="$1 on WTHashtag" target="_blank">$1</a>');
}

// Find hashtags in profile information

// Twitter uses the id "profile" for both a body tag AND the profile info when you're checking out a profile page
// Grabbing all the divs and finding the profile div is the only surefire way to do this while viewing a profile - which is the whole point
if(document.getElementsByTagName("body")[0].id == "profile")
{
	var divs = document.getElementsByTagName("div");
	for(var i=0; i < divs.length; i++)
	{
		if(divs[i].id == "profile")
			var profileDiv = divs[i];
	}
	
	var lis = profileDiv.getElementsByTagName("ul")[0].getElementsByTagName("li");
	for (var i=0; i < lis.length; i++)
	{
		var spans = lis[i].getElementsByTagName("span");
		
		// There are 2 spans in each li we parse - we want the 2nd one (lets us skip the "web" section)
		var info = spans[1];
		if(info)
			info.innerHTML = info.innerHTML.replace(/#([A-Za-z0-9]+)/g, '#<a href="http://wthashtag.com/$1" title="\$1 on WTHashtag" target="_blank">$1</a>');
	}
}