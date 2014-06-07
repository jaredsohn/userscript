// ==UserScript==
// @name           Jinriki Moshikashite for Google
// @namespace      http://d.hatena.ne.jp/favril/
// @description    人力もしかして
// @include        http://www.google.co.jp/search?*
// @include        http://www.google.com/search?*
// @version        0.1
// @author         favril
// ==/UserScript==

(function(){
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    //script.setAttribute('src', 'http://localhost:8080/javascripts/mskst.js?t=' +  (new Date()).getTime());
    script.setAttribute('src', 'http://moshikashite.appspot.com/javascripts/mskst.js?t=' +  (new Date()).getTime());
    document.getElementsByTagName('head')[0].appendChild(script);
})();