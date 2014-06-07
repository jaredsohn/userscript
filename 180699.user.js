// ==UserScript==
// @name        ythtml5kiss_chrome
// @namespace   mentormayhesset
// @description YouTube the HTML5 player
// @match       https://www.youtube.com/*
// @match       http://www.youtube.com/*
// @version     3.1
// @run-at      document-start
// ==/UserScript==

var code=function _gaq_(){
    try{
        function getUndefined(){
            return undefined;
        }
        navigator.plugins.__defineGetter__('Shockwave Flash',getUndefined);
        navigator.mimeTypes.__defineGetter__('application/x-shockwave-flash',getUndefined);
        ytspf=ytspf||{};
        ytspf.enabled=false;
        ytplayer.config.html5=true;
        delete ytplayer.config.args.ad3_module;
    }catch(e){}
}

function removeFlash(){
    var sc=document.createElement('script');
    sc.textContent='('+code+')()';
    document.head.appendChild(sc);
    sc.parentNode.removeChild(sc);
}

window.addEventListener('DOMContentLoaded',removeFlash);
