// ==UserScript==
// @name           YouTube Full Title
// @namespace      PandaScripting
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @grant          none
// @version        10
// ==/UserScript==

// taken from https://userscripts.org/scripts/show/145813
function addStyle(aCss) {
  var head = document.getElementsByTagName('head')[0];
  if  (head) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = aCss;
    head.appendChild(style);
    return style;
  }
  return null;
}

addStyle(
	// "html" prefix is there because of the css priority
	
	// video titles on search result pages
	"html .yt-lockup-ellipsize { white-space: normal; }" +
	
	// video titles of related videos on watch pages
	"html .video-list-item .title { max-height: none !important; }" +
	"html .video-list-item .stat { margin-left: 128px; }" +
	
	// video titles in playlists on the bottom of watch pages
	"html .playlist-bar-item:not(.playlist-bar-item-playing) .title { top: 5px; height: 60px; z-index: 0; }" +
	// keep remove button (seen by playlist creator) on top of the title
	"html .playlist-bar-item:not(.playlist-bar-item-playing) .yt-uix-button { z-index: 1; }" +
	
	// video titles of video updates on own channel pages
	"html .feed-item-main h4 { max-height: 100%; }" +
	"html .feed-item-content .feed-video-title.secondary { white-space: normal; }" +
	
	// video titles of videos on channel overview
	"html .module-view .video .video-title { white-space: normal; }" +
	"html .single-playlist .title { height: 100%; }" +
	
	// video titles on category overview
	"html .browse-videos .browse-collection .browse-item h3 { max-height: none; }" +
	
	// video titles of videos in playlists on channel pages
	"html .playlist-video-item-base-content .video-overview .video-title-container { white-space: normal; }" +
	
	// video titles of videos on channel page "uploads"
	"html .channels-content-item a.content-item-title { height: auto; white-space: normal; }" +
	
	// video titles on subscription pages
	"html .vm-grid-video-list .vm-video-title { max-height: none; }" +
	"html .vm-grid-video-list .vm-video-item { height: 190px; }" +
	
	// playlist titles and description on channel pages
	"html .yt-uix-tile-link { white-space: normal; }" +
	"html .playlists-wide .playlist .description { max-height: none; white-space: normal; }"
	);

var sTextAttr = document.all === undefined ? "textContent" : "innerText";
function setText(nElem, sText)
{
	nElem[sTextAttr] = sText;
}

(function()
{
	// on subscription pages (grid view), take the title of the thumbnails and set as title link text
	var nGridVideoList = document.getElementsByClassName("vm-grid-video-list")[0];
	if (nGridVideoList === undefined)
		return;

	var aVideoItems = document.getElementsByClassName("vm-video-item");
	for (var i = aVideoItems.length; i--; )
	{
		var nVideoItem = aVideoItems[i],
		nThumbWrap = nVideoItem.getElementsByClassName("video-thumb")[0],
		nTitleLink = nVideoItem.getElementsByClassName("vm-video-title-text")[0];
		
		if (nThumbWrap === undefined ||
			nTitleLink === undefined)
			continue;
		
		var nThumb = nThumbWrap.getElementsByTagName("img")[0];
		if (nThumb === undefined)
			continue;
		
		setText(nTitleLink, nThumb.title);
	}
})();

var setChannelVideoTitles = function(nParent)
{
	// on channel pages take the title of video links and set it as their text
	var aVideoItems = nParent.getElementsByClassName("channels-content-item");
	for (var i = aVideoItems.length; i--; )
	{
		var nTitleLink = aVideoItems[i].getElementsByClassName("content-item-title")[0];
		if (nTitleLink === undefined)
			continue;
		
		if (nTitleLink.hasAttribute("title"))
			setText(nTitleLink, nTitleLink.title);
	}
}
setChannelVideoTitles(document);

window.addEventListener("load", function()
{
	document.addEventListener("DOMNodeInserted", function(oEvent)
	{
		if (oEvent.target.nodeType != 1)
			return;
		if (oEvent.target.className.indexOf("channels-browse-content-grid") == -1)
			return;
		// set titles as text on fresh loaded videos (clicked "load more")
		setChannelVideoTitles(oEvent.target);
	}, false);
}, false);