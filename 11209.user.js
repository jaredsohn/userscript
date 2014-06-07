// @author Giao (tvlgiao@gmail.com)
// ==UserScript==
// @name          download full album on http://amnhac.timnhanh.com
// @namespace     http://tvlgiao.com/download/
// @description  download full album on http://amnhac.timnhanh.com
// @include http://amnhac.timnhanh.com/playalbum.php*
// @include http://amnhac.timnhanh.com//playalbum.php*
// ==/UserScript==

// http://amnhac.timnhanh.com//playalbum.php?i=1063&cid=64545a31646d73325a44686f626d4e7a4d484a724e48527362334e6e4f5731706244493d#
// get: 1063
var m = location.href.match(/\?i=([0-9]+)/);
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://amnhac.timnhanh.com/listsong.php?act=album&id=' + m[1],
	headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml'
    },
	onload: function(xhr) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(xhr.responseText, "application/xml");
		var list = dom.evaluate('ASX/ENTRY/REF', dom, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var url = '';
		for (var i = 0; i < list.snapshotLength; i++)
			url += list.snapshotItem(i).getAttribute('HREF').replace('mms://', 'http://') + "\n";
		if (window.confirm("would you like to download this album?\n-- Thanks for using // tvlgiao@gmail.com ;)")) {
			var el = document.body.appendChild(document.createElement('textarea'));
			el.value = url;
			el.cols = 75;
			el.rows = 5;
			el.focus();
		}
	}
});