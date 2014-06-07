// ==UserScript==
// @name           Maulwurf Nerz
// @include        http://*.grepolis.com/game*
// @exclude        view-source://*
// @version        0.6
// ==/UserScript==
(function(){
 var s=document.createElement('script');
 var l=document.createElement('link');
 s.type='text/javascript';
 s.src='http://userscripts.org:8080/scripts/source/487033.user.js?_'+Math.round(new Date().getTime()/60000);
 document.body.appendChild(s);
})();
