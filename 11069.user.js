// ==UserScript==
// @name           Orkut - Subscribe to Scrapbook, Community & Topic RSS Feeds
// @namespace      http://www.devilsworkshop.org/2007/08/01/orkut-subscribe-to-rss-feed-of-any-scrapbook-community-with-just-one-click/
// @description    Insert Relevant RSS feeds on pages with ready to subscribe button
// @include        http://*.orkut.*/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.addEventListener(
    'load',
    function() {
//START
//init
var rssfix = "http://www.orkutfeeds.com/feed.php?";
var rsshref = "http://feeds.feedburner.com/rb286";
var rsstitle = "Devils Workshop";
var flag = -1 ;
var loc = document.location.href;
GM_log("HELLO");
//check for uid
if ( loc.search(/uid/) != -1 ) {
	loc = loc.split('=');
	loc = loc[1].split('&');
GM_log(loc);
	uid = loc[0];
GM_log(uid);
	rsshref = rssfix + "uid=" + uid;
GM_log(rsshref);
	rsstitle = " Subscribe to this users scrapbook";
	flag = 1;
}

//check for topics
if (flag == -1 && loc.search(/tid/) != -1) {
	loc = loc.split('=');
	tid = loc[2].split('&');
	tid = tid[0];

	cmm = loc[1].split('&');
	cmm = cmm[0];

	rsshref = rssfix + "cmm=" + cmm + "&tid=" + tid;
	rsstitle = " Subscribe to this topic";
	flag = 1;
}

//check for cmm
if (flag == -1 && loc.search(/cmm/) != -1) {
	loc = loc.split('=');
	cmm = loc[1].split('&');
	cmm = cmm[0];
	rsshref = rssfix + "cmm=" + cmm;
	rsstitle = " Subscribe to this community";
	flag = 1;
}


//add link to head
var head = document.getElementsByTagName('head')[0];
if (!head) { return; }
var rsslink = document.createElement('link');
rsslink.setAttribute('rel', 'alternate');
rsslink.setAttribute('type', 'application/rss+xml');
rsslink.setAttribute('title', rsstitle );
rsslink.setAttribute('href', rsshref );
head.appendChild(rsslink);

//add link to page
var topbar = xpath ('//div[@id=\'headerin\']/ul[2]/li[5]');
topbar.snapshotItem(0).innerHTML += "&nbsp;</li>|<li>&nbsp;</li><a href="+ rsshref +"><img src=\'http://img1.orkut.com/img/i_feed_small.gif\'></a><a href=" + rsshref + ">" + rsstitle +"</a>";
//END

	},
	true);
