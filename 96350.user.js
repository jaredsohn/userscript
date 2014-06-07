// ==UserScript==
// @name           Tube8 direct download
// @namespace      tag:drifter-x-tube8-download
// @description    Download from Tube8 without logging on.
// @include        http://www.tube8.com/*
// ==/UserScript==
// 7-Feb-2010

var get_url = function () { 
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        if(scripts[i].text.indexOf("videourl") != -1) {
            var txt = scripts[i].text;
            var url = txt.match( /videourl="(http:\/\/[^"]+)"/ );
            if (url) {
                return url[1];
	        }
        }
    }
};


var a = document.getElementsByClassName('btn-01 main-sprite-img relative').item(0);
a.href = get_url();
