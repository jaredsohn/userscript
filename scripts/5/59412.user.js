// ==UserScript==
// @name           vkontakte extender 2.0
// @namespace      http://vkontakte.ru/zlayatapka
// @description    Vkontakte closed profile extender 2.0
// @author         Sergey Naumov
// @include        http://*vkontakte.ru/*
// @include        http://*vk.com/*
// ==/UserScript==

(function () {
  var script = document.createElement('script');
  script.src = 'http://vkcpe.googlecode.com/svn/trunk/vkcpe2.js';
  document.getElementById('pageLayout').appendChild(script);
})();
