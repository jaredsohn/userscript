// ==UserScript==
// @name           wikipedia + bing image search
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://*.wikipedia.org/wiki/*
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @version        0.4
// @date           20120904
// ==/UserScript==

var imageLength = 5;

if (getComputedStyle(document.getElementById('firstHeading'),"").display === "none") {
	return;
}

var ipBox = document.createElement('div');
ipBox.id = "_ipBox";

var contentSub = document.getElementById('contentSub');
contentSub.parentNode.insertBefore(ipBox, contentSub);

var searchQuery = /wikipedia\.org\/wiki\/(.+)/.exec(location.href)[1];
var qurl = "http://www.bing.com/images/search?q=" + searchQuery;

var bingLink = document.createElement('a');
bingLink.href = qurl;
bingLink.className = "_bingLink";

var ico = document.createElement('img');
ico.src = 'http://www.bing.com/s/wlflag.ico';
ico.id = 'GM_ico';
bingLink.appendChild(ico);
ipBox.appendChild(bingLink);

GM_xmlhttpRequest({
	method: "GET",
	url: qurl,
	headers: {"User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
	onload: function(res) {
		var dom = document.createElement('div');
		dom.innerHTML = res.responseText;
		var domThumbs = Array.prototype.slice.call(dom.querySelectorAll('.sg_u'), 0, imageLength);
		var df = document.createDocumentFragment();
		Array.prototype.forEach.call(domThumbs, function(e) {
			var params = (new Function('return ' + e.getAttribute('m')))();
			var img = document.createElement('img');
			img.src = params.turl;
			var a = document.createElement('a');
			a.href = 'http://www.bing.com' + e.querySelector('.sg_tc').getAttribute('href');
			a.title = params.t;
			a.target = '_blank';
			a.appendChild(img);
			df.appendChild(a);
		});
		ipBox.insertBefore(df, ipBox.firstChild);
	}
});

GM_addStyle('#_ipBox { margin: 15px 0; } #_ipBox img { width: 100px; margin: 0 5px; } ._bingLink, #GM_ico {display: block; width: 16px !important;}');
