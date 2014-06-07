// ==UserScript==
// @name           LJ Delicious Cleaner
// @namespace      brianenigma
// @description    Hides Delicious and Twitter cross-posts from your LiveJournal friends page. The content is still there when you click through to the post itself, it just isn't cluttering up your friends page.
// @include        http://*.livejournal.com/friends*
// @include        http://*.livejournal.com/
// @include        http://*.livejournal.com/?*
// ==/UserScript==

// Given a DOM element, keep going upward until we find something with an ID.  
// If it has an ID, it's probably an "interesting" node.
function findEntryRootId(theElement)
{
	var throttle = 10; // Don't traverse too far
	theElement = theElement.parentNode;
	while (theElement && (throttle > 0))
	{
		if ((theElement.id != undefined) && (theElement.id.length > 0))
			return theElement;
		theElement = theElement.parentNode;
		throttle--;
	}
	return theElement;	
}

// Find Delicious crossposts that are easily findable.  These are listed as
// "ul" elements with the easy-to-spot word "delicious" as the class name.
var linkList = document.getElementsByTagName("ul");
for(var i = 0; i < linkList.length; i++) 
{
    var item = linkList[i];
    if (item.className == 'delicious')
	{
		var newDiv = document.createElement('div');
		newDiv.innerHTML = '<small><i>This content (Delicious links) was removed by Greasemonkey. Click through to the entry to view.</i></small>';
		item.style.display = 'none';
		item.parentNode.appendChild(newDiv);
	}
}

// Find LoudTwitter crossposts.  These are listed as "ul" elements with the 
// easy-to-spot word "loudtwitter" as the class name.
var linkList = document.getElementsByTagName("ul");
for(var i = 0; i < linkList.length; i++) 
{
    var item = linkList[i];
    if (item.className == 'loudtwitter')
	{
		var newDiv = document.createElement('div');
		newDiv.innerHTML = '<small><i>This content (Twitter posts) was removed by Greasemonkey. Click through to the entry to view.</i></small>';
		item.style.display = 'none';
		item.parentNode.appendChild(newDiv);
	}
}

// Another cross-poster doesn't use unique tags, only supplying the literal
// text "Links for {date/time stamp}" as the post title.  Look for these
// post titles.  If any are found, traverse up the document tree until we
// hit an "interesting" node (one that has an ID defined.)  Once found,
// collapse the whole thing to 30px high (so that we can still see the link
// and click through to the content, but not see the content on the page.
var linkList = document.getElementsByTagName("a");
for(var i = 0; i < linkList.length; i++) 
{
    var item = linkList[i];
    if (item.innerHTML.substr(0, 10) == "Links for ") 
	{
		var entry = findEntryRootId(item);
		GM_log(item + '/' + entry);
		entry.style.overflow = 'hidden';
		entry.style.height = '30px';
		item.innerHTML = '<small><i>This content (Delicious links) was removed by Greasemonkey. Click through to the entry to view.</i></small>';
		item.style.fontSize = '8pt';
	}
}
