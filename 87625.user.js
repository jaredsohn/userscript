// ==UserScript==
// @name           UserScript to Bookmarklet Converter
// @description    The "Install" button is replaced by a bookmarklet, drag the "Install" button to the bookmark bar and click it to run it!
// @include        *userscripts.org/scripts/show/*
// @version        1.0
// ==/UserScript==

javascript:(function(){for(var i=0;i<document.links.length;i++){var a=document.links[i];if(a.href.indexOf('.user.js')>0){a.href="javascript:(function(){var s='"+a.href+"',t='text/javascript',d=document,n=navigator,e;(e=d.createElement('script')).src=s;e.type=t;d.getElementsByTagName('head')[0].appendChild(e)})();doIt('');void('');"}}})()