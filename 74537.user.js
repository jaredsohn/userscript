// ==UserScript==
// @name           Facebook Story Uncollapser
// @namespace      Facebook
// @description    "Clicks" and expands all "Similar posts" in the feed
// @include        http://www.facebook.com/home.php*
// @include        http://www.facebook.com/
// @exclude        http://apps.facebook.com/*
// ==/UserScript==

window.addEventListener("load", function ()
{
	unCollapse();
	var myInterval = setInterval(function (){unCollapse()}, 2500);
}	
,true);

// Sample: Facebook/Facebook Story Uncollapser: <a onclick='UIIntentionalStory.expandStory("div_story_4ae6645f3d6cb624045c1", "1827222551", 1256612433, 1256612436);return false;'>SHOW 2 SIMILAR POSTS</a>

function unCollapse()
{
//      	var collapsedStories = document.evaluate("//div[@class='UIIntentionalStory_CollapsedStories']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      	var collapsedStories = document.evaluate("//div[@class='uiStreamCollapsed mvs ptm']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);      	
      	if(collapsedStories.snapshotLength > 0)
      	{
      		GM_log('Facebook Story Uncollapser - Found ' + collapsedStories.snapshotLength + ' collapsed stories... processing.');
      		for(var i = collapsedStories.snapshotLength - 1; i >= 0; i--)
		{
      			if(collapsedStories.snapshotItem(i) != null)
      			{
				var eFBAnchor = collapsedStories.snapshotItem(i).getElementsByTagName('a')[0];
				var eNewButton = eFBAnchor.appendChild(document.createElement('input'));
				eNewButton.id = 'DingDong';
				eNewButton.type = 'button';
				eNewButton.setAttribute('style', 'display:none;');
				eNewButton.setAttribute('onclick', eFBAnchor.getAttribute('onclick'));
				document.getElementById('DingDong').click();
				eNewButton.id = 'Done';
      			}
      		}
      		GM_log('Facebook Story Uncollapser - Done!');
      	}

}
