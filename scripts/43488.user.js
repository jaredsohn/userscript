// ==UserScript==
// @name CN HTML5 Player
// @namespace 
// @include http://*.youku.com/*
// @include http://*.tudou.com/*
// @include http://tv.sohu.com/*
// @include http://v.qq.com/*
// ==/UserScript==


(function () {
/*
var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');

    var url = document.location.href;
    var urls = url.split('/');
    var domain = urls[2];
    if (domain == 'v.youku.com' || domain == 'www.youku.com') {
         s.setAttribute('src', 'https://dl.dropbox.com/u/6899012/js/youkuhtml5playerbookmark.js');
    }
    if (domain == 'www.tudou.com') {
        s.setAttribute('src', 'https://dl.dropbox.com/u/6899012/js/tudouhtml5playerbookmark.js');
    }
    if (domain == 'tv.sohu.com') {
        s.setAttribute('src', 'https://dl.dropbox.com/u/6899012/js/sohuhtml5playerbookmark.js');
    }

document.head.appendChild(s);
*/
var l = document.createElement('link');l.setAttribute('rel','stylesheet');l.setAttribute('media','all');l.setAttribute('href','http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.css');document.body.appendChild(l);var s = document.createElement('script');s.setAttribute('src','http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.js');document.body.appendChild(s);

var css = ".youkuhtml5playerbookmark2-title{display:none !important} .youkuhtml5playerbookmark2-layer{box-shadow:0 0 0 0!important; -webkit-filter:none !important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();