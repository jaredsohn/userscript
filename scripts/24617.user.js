// ==UserScript==
// @name           redirect-ldr-button
// @version        1.0
// @namespace      http://my.opera.com/maplebread/
// @description    Redirect LDR
// @include        http://reader.livedoor.com/subscribe/*
// ==/UserScript


(function() {
var url = document.URL;
if(url.indexOf("http://reader.livedoor.com/subscribe/javascript:location.href='http://reader.livedoor.com/subscribe/'+location.href") != -1 ||
   url.indexOf('http://reader.livedoor.com/subscribe/about:blank') != -1 )
location.href='http://reader.livedoor.com/reader/';
})();
