// @author Giao (tvlgiao@gmail.com)
// ==UserScript==
// @name          Download Clip.VN's FLV
// @namespace     http://tvlgiao.com/download/
// @description  Download Clip.VN's FLV
// @include http://clip.vn/*
// @include http://*.clip.vn/*
// ==/UserScript==
var m = location.href.match(/\/([^\/,]+),[^\/]+/);
//alert(GM_xmlhttpRequest);
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.clip.vn/movies/nfo/' + m[1],
	headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml'
    },
	onload: function(xhr) {
		//alert('start');
		var parser = new DOMParser();
		var dom = parser.parseFromString(xhr.responseText, "application/xml");
		//GM_log(dom);
		var url = dom.evaluate('ClipData/CurrentClip/ClipInfo/enclosure', dom, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).getAttribute('url');
		if (window.confirm("would you like to download: " + url + " ? // thanks for using -- tvlgiao@gmail.com ;)"))
			window.location = url;
	}
});
