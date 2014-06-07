// ==UserScript==
// @name           FullInfo
// @namespace      http://amse.ru
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

window.setTimeout(function() {
  if (unsafeWindow.switchPersonalInfo) {
       unsafeWindow.switchPersonalInfo();
  }   
});