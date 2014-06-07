// ==UserScript==
// @author		   campionidelmondo
// @email		   fabscav@gmail.com
// @name           YouSift
// @namespace      YouSift
// @include        http://*youtube.com/watch*
// ==/UserScript==

// SETTINGS
var videoEmbed = '<object style="height: %height%px; width: %width%px"><param name="movie" value="http://www.youtube.com/v/%videoid%&rel=0&hd=1&showinfo=0"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="http://www.youtube.com/v/%videoid%" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="%width%" height="%height%"></object>';

function insertLink()
{
	var link = document.createElement('button');
	link.setAttribute('class', 'yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty');
	link.addEventListener('click',sift, false);
	link.innerHTML = '<span>VideoSift</span>';
	link.setAttribute('data-tooltip', 'Post this video on VideoSift');
	var flag = document.getElementById('watch-flag');
	flag.parentNode.insertBefore(link, flag);
}

function sift()
{
	var sift = new Array();
	var embed = videoEmbed;
	sift['title'] = document.getElementsByName('title')[0].getAttribute('content');
	sift['description'] = document.getElementsByName('description')[0].getAttribute('content');
	var height = document.evaluate('//meta[@property="og:video:height"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	sift['height'] = height.snapshotItem(0).getAttribute('content');	
	var width = document.evaluate('//meta[@property="og:video:width"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	sift['width'] = width.snapshotItem(0).getAttribute('content');
	var id = document.evaluate('//link[@rel="shortlink"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	sift['id'] = id.snapshotItem(0).getAttribute('href').replace('http://youtu.be/', '');
	embed = embed.replace(/%height%/g, sift['height']);
	embed = embed.replace(/%width%/g, sift['width']);
	embed = embed.replace(/%videoid%/g, sift['id']);
	var url = 'http://videosift.com/vidpost?vidtitle='+sift['title']+'&summary='+sift['description']+'&postcontent='+encodeURIComponent(embed);
	if (GM_openInTab) GM_openInTab(url);
	else window.location = url;
}

insertLink();