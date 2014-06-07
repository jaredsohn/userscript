// ==UserScript==
// @name       biliBlackTech
// @match      http://www.bilibili.tv/video/av*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function () {
    function addScript() {
        var script = document.createElement('script');
        script.src = '//b.dianbo.me/h.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    var bofqi = document.getElementById('bofqi');
    var embeds = bofqi.getElementsByTagName('embed');
    if (embeds.length > 0)
        if (embeds[0].src.indexOf('https://static-s.bilibili.tv/play.swf') == -1) {
            addScript();
            return;
        }
    var objects = bofqi.getElementsByTagName('object');
    if (objects.length > 0) {
        if (objects[0].getAttribute('data').indexOf('https://static-s.bilibili.tv/play.swf') == -1) {
            addScript();
            return;
        }
    }        
    var iframes = bofqi.getElementsByTagName('iframe');
    if(iframes.length>0)
        if (iframes[0].src.indexOf('https://secure.bilibili.tv/secure') == -1 &&
            iframes[0].src.indexOf('https://ssl.bilibili.tv/secure') == -1) {
            addScript();
            return;
        }

}, false);
