// ==UserScript==
// @name         Taiwan Rakuten item page modifier
// @namespace    http://atobe.net
// @description  Showing the default item area upper than item info. Looks similar to Yahoo!奇摩超級商城.
// @include      http://*.shop.rakuten.tw/*
// ==/UserScript==

  var elm_des_1 = document.getElementById('itemInfo'); 
    document.getElementById('mainArea').insertBefore(elm_des_1, document.getElementById(''));

