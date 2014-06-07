// ==UserScript==
// @name           Grepolis Report Converter
// @include        http://*.grepolis.com/game*
// @exclude        view-source://*
// @version        3.0.1
// @copyright      Potusek
// ==/UserScript==

(function(){
    var s=document.createElement('script');
    s.type='text/javascript';
    s.src='http://grepolis.potusek.eu/scripts/v2/RepConvJSV2.js?_'+(new Date().getTime());
    document.body.appendChild(s);
})();