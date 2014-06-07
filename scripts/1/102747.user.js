// ==UserScript==
// @name           KRUF.NET direct link from btmon
// @namespace      KRUF_BTMON
// @include        http://www.btmon.com/torrent/*
// ==/UserScript==

var GM_DEBUG = false;
var GM_log = function(){};

if(GM_DEBUG){
	if(unsafeWindow.console){
		GM_log = unsafeWindow.console.log;
	}
}

var torrLinks = document.evaluate('//div["torr_table"]//a[contains(@href, ".torrent") and not(contains(@class, "down_torr"))]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
GM_log(torrLinks);
if(torrLinks){
	for(var i=0; i<torrLinks.snapshotLength; i++){
		var btmonTorrentHrefItem = torrLinks.snapshotItem(i);
		var furkDirectLinkHref = 'https://furk.net'+btmonTorrentHrefItem.href.substring(btmonTorrentHrefItem.href.lastIndexOf('/')).replace('.torrent.html', '.html');
		GM_log('furkDirectLinkHref = '+furkDirectLinkHref);
		var furkLinkSpan = document.createElement('span');
		furkLinkSpan.style.backgroundColor = '#77B5E6';
		var furkLink = document.createElement('a');
		furkLink.href = furkDirectLinkHref;
		furkLink.style.textDecoration = 'none';
		furkLink.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label style="background-color:#E04F97; cursor: pointer">FL</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';		
		//'<iframe style="width:0px; height:0px; border:0px;" src="'+furkDirectLinkHref+'"><script>var potentialVideoLink = document.evaluate(\'//a[@class="button-large button-play"]\', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if(potentialVideoLink.snapshotLength == 1){alert("exists");}</script></iframe>';
		furkLinkSpan.appendChild(furkLink);
		btmonTorrentHrefItem.parentNode.appendChild(furkLinkSpan);
	}
}
