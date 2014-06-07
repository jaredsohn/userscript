// ==UserScript==
// @name Vk Remove actual photos and pages
// @namespace pomatu_removeactual
// @version 0.01
// @source 
// @description Удаляет актуальные фотографии и интересные страницы из ленты
// @include htt://vk.com/feed
// ==/UserScript==

var feed_recommends = document.getElementById('feed_recommends');
if (feed_recommends) {
    feed_recommends.parentNode.removeChild(feed_recommends);
}