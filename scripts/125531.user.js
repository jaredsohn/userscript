// ==UserScript==
// @name           vk.com simple ads block
// @namespace      vk_ad_block_2
// @description    Blocks vk.com left-panel ads
// @include        http://vk.com/*
// @include        https://vk.com/*
// ==/UserScript==
(function () {
    var targetId = 'left_ads';

    var el = document.getElementById(targetId);
    if (el) {
      var par = el.parentNode;  
      par.removeChild(el);
      par.addEventListener('DOMNodeInserted', h);
    }

    function h(e) {
      var insertedNode = e.target;
      if (insertedNode.id == targetId) {
         insertedNode.parentNode.removeChild(insertedNode);
      }
    };
})();