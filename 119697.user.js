// ==UserScript==
// @name           KittyWales
// @namespace      Wikipedia
// @description    replaces Jimmy Wales by a cute Kitty
// @include        http://*.wikipedia.org/*
// @include        https://*.wikipedia.org/*
// @grant          GM_xmlhttpRequest
// @updateURL      http://userscripts.org/scripts/source/119697.user.js
// @downloadURL    http://userscripts.org/scripts/source/119697.user.js
// ==/UserScript==

window._insertBanner = unsafeWindow.insertBanner;
var photo = null;
var banner = null;

var hijackBanner = function() {
    if(photo != null && banner != null) {
        banner.bannerHtml = banner.bannerHtml
			.replace(/position: relative;\n  (\w+: \w+;\n  )*background-image: url\(\/\/upload\.wikimedia\.org\/wikipedia\/foundation\/\S+\....\);/, "position: relative;\n  background-image: url(" + photo + "_m.jpg);")
			.replace(/src="\/\/upload\.wikimedia\.org\/wikipedia\/[^"\s]+"/, "src=\"" + photo + "_t.jpg\"");
        _insertBanner(banner);
	};
};

var jsonFlickrApi = function(data) {
    var p = data.photos.photo[0];
	photo = '//farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret;// + '_m.jpg';
	hijackBanner();
};

unsafeWindow.insertBanner = function(b) {
    banner = b;
    hijackBanner();
};

GM_xmlhttpRequest({
	method: 'GET',
	url: "http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&tags=cute%2Ckitten&tag_mode=all&api_key=b406fa8d7e4e7bf368ab6f3243790054&sort=relevance&content_type=1&per_page=1&page=" + Math.floor(Math.random() * 1000) + 1,
	onload: function(results) {
		eval(results.responseText);
	},
});
