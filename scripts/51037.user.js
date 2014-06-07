// ==UserScript==
                    // @name           pixiv No Ads Browsing
                    // @namespace      http://pixiv.net
                    // @description    Removes ads from pixiv site.
                    // @include        http://pixiv.net/*
                    // @include         http://www.pixiv.net/*
                    // - v2.1
                    // - 13 Nov 2011
                    // - http://sairin.co
                    // ==/UserScript==
                    

var f = document.getElementsByTagName("iframe");
for (var i=0; i<f.length; i++) {
	f[i].src="";
	f[i].parentNode.style.display = "none";
}
var s = document.createElement("style");
s.innerHTML = ".finish_upload, .ads_area {display:none !important;}";
document.getElementsByTagName("head")[0].appendChild(s);