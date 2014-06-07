// ==UserScript==
// @name        NecroTube
// @namespace   YtDelVidNecro
// @description	Restores deleted video titles on YouTube aka "fixing" YouTube
// @author		Arkii
// @include     https://www.youtube.com/playlist*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @icon		https://raw.githubusercontent.com/GoomiChan/NecroTube/master/Necro.png
// @downloadURL https://github.com/GoomiChan/NecroTube/raw/master/NecroTube.user.js
// @updateURL 	https://github.com/GoomiChan/NecroTube/raw/master/NecroTube.user.js
// ==/UserScript==

var DELETED_VIDEO_TITLE = '[Deleted Video]';
var REPLACEMENT_TEXT = "[Deleted Video] -!- [TITLE] -!-";
var MAX_RSS_RESULTS = 50;
var PLAYLIST_RSS_URL = "https://gdata.youtube.com/feeds/api/playlists/[PLAYLSITID]?alt=json&fields=entry(title),entry(link[@rel='alternate'])&max-results=[MAXRESULTS]&start-index=[STARTINDEX]";

var playlistID = getURLParameter(location.search, "list");
var numEntrys = document.querySelectorAll('.pl-header-details > li:nth-child(2)')[0].innerHTML;
numEntrys = parseInt(numEntrys.substr(0, numEntrys.indexOf(" ")));

var deletedVidEntrys = [];
var rssVidEntrys = [];


var loadMoreButton = document.querySelectorAll('.load-more-button')[0];
if (loadMoreButton)
{
	var target = document.querySelector('#pl-load-more-destination');
 
	var observer = new MutationObserver(function(mutations) 
	{
		mutations.forEach(function(mutation) 
		{
			LoadMore();
		});    
	});
	 
	var config = {childList: true}
	observer.observe(target, config);
}

function GetVidList()
{
    var nodeList = document.querySelectorAll('.pl-video');
    for (var i = 0, length = nodeList.length; i < length; i++)
    {               
        var vidID = nodeList[i].getAttribute('data-video-id');
        var vidTitle = nodeList[i].getAttribute('data-title');
		
		if (!deletedVidEntrys[vidID])
		{
			var text = nodeList[i].querySelectorAll('.pl-video-title-link')[0];
			if (vidTitle == DELETED_VIDEO_TITLE)
			{
				var backup = GM_getValue(vidID);
				
				if (backup != null)
					text.innerHTML = genrateVideoTitle(backup);
				else
				{
					text.innerHTML = genrateVideoTitle("Plucking the title from the dark void, please wait :>");
				}
				
				deletedVidEntrys[vidID] = nodeList[i];
			} 
			else
			   SaveVideoData(vidID, vidTitle);
		   }
    }
}
GetVidList();

function SaveVideoData(vidID, vidTitle)
{
    GM_setValue(vidID, vidTitle);
}

function TryLookUp()
{
	var evens = numEntrys % MAX_RSS_RESULTS;
	var numRequests = 0;
	if (evens == 0)
		numRequests = numEntrys / MAX_RSS_RESULTS;
	else
		numRequests = Math.ceil(numEntrys/MAX_RSS_RESULTS);
		
	var completedRequests = 0;
	
	for (var i = 0; i < numRequests; i++)
	{
		var start = (MAX_RSS_RESULTS*i) + 1;
		var amount = MAX_RSS_RESULTS;
		if (i == numRequests-1 && evens != 0)
			amount = evens;
			
		var url = genrateRssUrl(playlistID, start, amount);
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: 
			 {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/json',
			},
			onload: function(responseDetails) 
			 {
				var result = JSON.parse(responseDetails.responseText)["feed"]["entry"];
				for (var i2 = 0, length = result.length; i2 < length; i2++)
				{
					var title = result[i2].title["$t"];
					var vidID = getURLParameter(result[i2].link[0]["href"], "v");
					rssVidEntrys[vidID] = { title: title };
				}
				 
				completedRequests++;
				
				if (completedRequests == numRequests)
					NecroTitles();
			}
		});
	}
}
TryLookUp();

function NecroTitles()
{
	for (var id in deletedVidEntrys)
	{ 
		var title = rssVidEntrys[id];
		
		var text = deletedVidEntrys[id].querySelectorAll('.pl-video-title-link')[0];
		
		if (!title)
			text.innerHTML = genrateVideoTitle("Couldn't retrieve title :<");
		else
		{
			text.innerHTML = genrateVideoTitle(title.title);
			
			// Save it
			GM_setValue(id, title.title);
			
			delete deletedVidEntrys[id];
		}
	}
}

function LoadMore()
{
	GetVidList();
	NecroTitles();
}

function genrateRssUrl(plID, start, count)
{
    var url = PLAYLIST_RSS_URL.replace("[PLAYLSITID]", plID);
    url = url.replace("[STARTINDEX]", start);
    url = url.replace("[MAXRESULTS]", count);
    return url;
}

function genrateVideoTitle(title)
{
    return REPLACEMENT_TEXT.replace("[TITLE]", title);
}

function getURLParameter(url, name) 
{
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url)||[,""])[1].replace(/\+/g, '%20'))||null
}