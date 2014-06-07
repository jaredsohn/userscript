// ==UserScript==
// @name          Kuber's RSS Tool For Chrome
// @namespace     http://kuber.appspot.com
// @description   Provide atom/rss support to Chrome browser. Auto-Detect, preview and subscribe feed.
// @include       *
// ==/UserScript==
var base64FeedIcon = 'data:image/png;base64,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';
function discoverFeeds() {
	var links = document.getElementsByTagName('link');
	var allFeeds = [];
	for (var i=0; i<links.length;i++) {
		var link = links[i];var type = link.type;
		if (type && (type.match(/.*\/rs[sd](\+xml)?$/i) || type.match(/.*\/atom\+xml$/i) || type.match(/^text\/xml$/i))) {
			var feed = {'title':link.title, 'href':link.href};
			allFeeds.push(feed);
		}
	}
	return allFeeds;
}
function isFeed(){
	var rssTag = document.getElementsByTagName('rss');
	if (rssTag.length>0) {return true;}
	else {
		var atomTag = document.getElementsByTagName('feed');
		if (atomTag.length>0) {return true;}
	}
	return false;
}
function getFeedPreviewUrl(url){return 'http://www.google.com/reader/lite/feed/' + encodeURIComponent(url);}
function isPreview() {return window.location.href.indexOf('http://www.google.com/reader/lite/feed/')>-1;}
if (isFeed()) {window.location =getFeedPreviewUrl(window.location.href);}
else if (isPreview()){
	var tabNodes = document.getElementById('tabs').childNodes;
	tabNodes[0].style.display='None';tabNodes[1].style.display='None';tabNodes[2].style.display='None';
	var blogTab = tabNodes[3];
	blogTab.style.fontSize = '24px';
	var streamPattern = /stream-feed\/(.*)-tab/;
	var feedUrl = blogTab.id.match(streamPattern)[1];
	var subbar = document.createElement('span');
	subbar.innerHTML='Subscribe with:&nbsp;&nbsp;<img src="http://www.google.com/reader/ui/favicon.ico"/><a href="http://fusion.google.com/add?feedurl='+feedUrl+'">Google</a>&nbsp;&nbsp;<img src="http://xianguo.com/favicon.ico"/><a href="http://www.xianguo.com/subscribe.php?url='+feedUrl+'">鲜果</a>&nbsp;&nbsp;<img src="http://zhuaxia.com/favicon.ico"/><a href="http://www.zhuaxia.com/add_channel.php?url='+feedUrl+'">抓虾</a>&nbsp;&nbsp;<img src="http://reader.youdao.com/favicon.ico"/><a href="http://reader.youdao.com/b.do?keyfrom=feedsky&url='+feedUrl+'">有道</a>';
	subbar.setAttribute('style','margin-left:15px;font-size:14px;float:left;');	
	var navBar = document.getElementById('nav-buttons');
	var prevButton = document.getElementById('prev-item-button');
	navBar.insertBefore(subbar, prevButton);
}
else {
	var feeds = discoverFeeds();
	if (feeds.length>0) {
	var previewUrl = getFeedPreviewUrl(feeds[0].href);
	var feedIconDiv = document.createElement('div');
	feedIconDiv.setAttribute('id','kuberfeeddetecticon');
	feedIconDiv.setAttribute('style','position:fixed;top:0;right:10px;width:64px;height:64px;z-index:1001;opacity:0.6;');
	feedIconDiv.innerHTML='<a style="position:absolute;left:8px;top:8px" href="'+previewUrl+'" title="'+feeds[0].title+'"><img src="'+base64FeedIcon+'" border="0" alt="feedicon" onmouseover="this.parentNode.parentNode.style.opacity=1;" onmouseout="this.parentNode.parentNode.style.opacity=0.6;"/></a>';
	document.getElementsByTagName('body')[0].appendChild(feedIconDiv);
	}
}