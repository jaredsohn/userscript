// ==UserScript==
// @name        TMD advanced BBcodes
// @description adauga posibilitatea de incarcare rapida a imaginilor pe forum + bbcode de linie orizontala
// @include     *torrentsmd.com/*
// @version     1.1
// ==/UserScript==

 function addclass()  {
    var s = '.hr a{ background-image:url(http://xxn.host56.com/hr.jpg)}';
    GM_addStyle(s);
  }
addclass();
  
  
(function(){
    var head    = document.getElementsByTagName('head')[0];
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = 'http://xxn.host56.com/tmd.js';
    script.charset = 'utf-8';
	head.appendChild(script);
})();