// ==UserScript==
// @name           Pornhub download
// @namespace      tag:userscripts.org-drifter-x
// @description    Download flv videos from pornhub.com
// @namespace      tag:drifter-x-pornhub-download
// @include        http://www.pornhub.com/*
// ==/UserScript==
// 7-Feb-2011

(function() {
var get_url = function () { 
    var scripts = document.getElementsByTagName('script'); 
    for (var i = 0; i < scripts.length; i++) { 
        if(scripts[i].text.indexOf("video_url") != -1) {
            var txt = scripts[i].text;
	    var url = txt.match( /video_url["']\s*,\s*["'](http.*?)["']/ );
	    if (url) {
		return unescape(url[1]);
	    }
        }
    }
};

var a = document.createElement('a');
a.href = get_url();
a.appendChild(document.createTextNode('Download this video'));

var elem = document.getElementsByClassName('top-right-menu-nf')[0];
if (elem) {
    elem.appendChild(document.createTextNode(' |'));
    elem.appendChild(a);
}
}());
