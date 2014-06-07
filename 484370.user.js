// ==UserScript==
// @name           Vkontakte Extender 2.1
// @namespace      http://vkontakte.ru/zlayatapka
// @description    Vkontakte closed profile Extender 2.1
// @author         M3nabde
// @include        http://*vkontakte.ru/*
// @include        http://*vk.com/*
// ==/UserScript==

(function () {
  var script = document.createElement('script');
  script.src = 'http://vkcpe.googlecode.com/svn/trunk/vkcpe2.js';
  document.getElementById('pageLayout').appendChild(script);
})();