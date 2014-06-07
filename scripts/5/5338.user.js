// ==UserScript==
// @name           LJ ESN: Pin Flagged Messages
// @namespace      afuna.livejournal.com
// @description    Pin flagged messages to your LJ message center to prevent them from being selected by the "select all" checkbox. Messages may still be selected manually.
// @include        http://www.livejournal.com/inbox/*
// ==/UserScript==

function getCheckbox(ele) 
{	
  return ele.parentNode.parentNode.parentNode.parentNode.childNodes[1].firstChild;
}

function toggleLock()
{    
  var checkbox = getCheckbox(this);
  checkbox.disabled = !checkbox.disabled;
};

// label the checkall checkbox to reflect the change in behavior
var checkall = document.getElementById("InboxItem_CheckAll");
if(checkall != null)
	checkall.title = "Select all unpinned";

// get the relevant bookmarks
bookmarks = document.evaluate("//img[@class='InboxItem_Bookmark']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// attach listeners
for(i = 0; i < bookmarks.snapshotLength; i++)
{
  var bookmark = bookmarks.snapshotItem(i);
	bookmark.addEventListener("click", toggleLock, false);	

	if(bookmark.src == "http://stat.livejournal.com/img/flag_on.gif")
	  getCheckbox(bookmark).disabled = true;
}