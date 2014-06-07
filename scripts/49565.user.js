// coding: utf-8
// ==UserScript==
// @name			Yahoo! Bookmarks Opener
// @namespace		ybopener.yahoo
// @description		Open your Yahoo! Bookmarks into new tab (or window) and disable click-tracking.
// @author			oliezekat
// @version		1
// @include		http://*.bookmarks.yahoo.*/*
// @include		http://bookmarks.yahoo.*/*
// ==/UserScript==

/*
NB FOR YAHOO! TEAM:

I REQUESTED Y!BOOKMARKS GIVE US AN OPTION TO ALWAYS OPEN OUR BOOKMARKS IN NEW TAB SINCE 3 YEARS !
I'm sorry my script disable click-traking but I didn't found another way...
*/

if (!YBOpener)	var YBOpener = {};

YBOpener =
	{
	DOM:		 {},
	HomePage:	 '',
	Version:	 1
	};
	
YBOpener.Init = function()
	{
	this.DOM.Init(this);
	
	var titlelinks = this.DOM.Get_Nodes("//div[@id='visiblebms']//a[contains(@class, 'titlelink')]");
	if (titlelinks != null)
		{
		//GM_log('Found '+titlelinks.snapshotLength+' bookmark(s)');
		for (var i=0; i < titlelinks.snapshotLength; i++)
			{
			var Bookmark = titlelinks.snapshotItem(i);
			//GM_log(Bookmark.textContent+' -> '+Bookmark.href);
			var h4title = Bookmark.parentNode;
			//Bookmark.setAttribute("target", "_blank"); // Grrrr, don't work
			
			/*
			var nwButton = document.createElement('a');
			nwButton.setAttribute("href", Bookmark.href);
			nwButton.setAttribute("target", "_blank");
			nwButton.setAttribute("title", "Open in new tab (or window)");
			nwButton.innerHTML = '<img align="top" src="http://l.yimg.com/g/images/icon_new_window.gif" border="0">'; // Disturbing into grid view, grrrrrr
			h4title.insertBefore(nwButton, Bookmark.nextSibling);
			*/
			
			// Bonbin, pas le choix, il faut le faire à l'arrache et tanpis pour leur tracking...
			h4title.innerHTML = '<a href="'+Bookmark.href+'" target="_blank">'+ Bookmark.textContent+'</a>';
			}
		}
	};
	
YBOpener.DOM =
	{
	_Parent: null
	};
	
YBOpener.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};

YBOpener.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};

YBOpener.Init();