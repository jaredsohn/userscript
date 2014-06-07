// ==UserScript==
// @name           Facebook Secure
// @namespace      http://jaredforsyth.com
// @description    make facebook secure w/ https
// @include        https://*.facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://172.16.0.28:15871/*
// ==/UserScript==
(function(){
/** this is specific to Websense **/
var url = 'http://172.16.0.28:15871/'
if (document.location.href.slice(0,url.length)==url && parent){
    var nurl = document.getElementById('UrlText').innerHTML.replace(/&amp;/g,'&');
    parent.location = 'https://'+nurl.split('://')[1];
}

var links = document.getElementsByTagName("a");
for (var i=0;i<links.length;i++){
    if (!links[i].href || links[i].href.indexOf('javascript')==0)continue;
    links[i].href = "https://"+links[i].href.split("//")[1];
}

})();