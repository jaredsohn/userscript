// ==UserScript==
// @name           Extremetube: direct download
// @namespace      tag:drifter-x-extremetube-download
// @description    Download flv videos from Extremetube
// @include        http://www.extremetube.com/*
// ==/UserScript==
// 7-Feb-2011
// 24-Jul-2011

(function () {
var get_url = function () { 
    var scripts = document.getElementsByTagName('script'); 
    for (var i = 0; i < scripts.length; i++) { 
        if(scripts[i].text.indexOf('video_url') != -1) {
            var txt = scripts[i].text;
	    var url = txt.match( /video_url\s*=\s*['"](http.*?)['"]/ );
	    if (url && url[1]) {
		return unescape(url[1]);
	    }
        }
    }
};
var dowork = function() {
    var container = document.getElementsByClassName('float-left video-download')[0];
    container.firstChild.href = unescape(get_url());
};
dowork();
}());
