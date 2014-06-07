// ==UserScript==
// @name        ythtml5kiss
// @namespace   mentormayhesset
// @description YouTube the HTML5 player [Firefox+Greasemonkey>=1.0]
// @include     https://www.youtube.com/*
// @include     http://www.youtube.com/*
// @exclude     https://www.youtube.com/embed/*
// @exclude     http://www.youtube.com/embed/*
// @version     3.1
// @run-at      document-end
// @grant       none
// ==/UserScript==

try{
    window.ytspf = window.ytspf || {};
    Object.defineProperty(window.ytspf,'enabled',{value:false});
    ytplayer.config.html5=true;
    delete ytplayer.config.args.ad3_module;
}catch(e){}