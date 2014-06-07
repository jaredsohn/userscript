// ==UserScript==
// @name          TED.com fullsize video for Opera (only)
// @description   Resizes the video player for the best experience
// @namespace     http://userscripts.org/scripts/show/153072
// @version       2012.12.18
// @include       http://*.ted.com/*
// @include       http://ted.com/*
// ==/UserScript==

opera.defineMagicVariable('swfobject', null, function(obj) {
    var orig_embedSWF = obj.embedSWF;
    obj.embedSWF = function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj) {
        flashvarsObj.screenSizes = encodeURIComponent(decodeURIComponent(flashvarsObj.screenSizes).replace(/"width":\d+,"height":\d+/i,'"width":null,"height":null'));
        return orig_embedSWF.apply(this,arguments);
    }
    return obj;
});

(function() {
var cssinfo = '\
#maincontent div.about { \
position: relative;\
top: 580px;\
}\
#videoHolder, .video-frame, div.video_container { \
height: 550px !important;\
width: 880px !important;\
}\
div.external_player { \
width: 100% !important;\
}\
div.external_player iframe { \
height: 550px !important;\
width: 880px !important;\
}\
div.post_box { \
width: auto !important;\
}';

var css = document.createElement('style');
css.type = 'text/css';
css.appendChild(document.createTextNode(cssinfo)); 
(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(css);
            
document.addEventListener("DOMContentLoaded", function () {
    //if (!~window.location.href.indexOf('#search')) window.location.href += '#search';
}, false);
}());