// ==UserScript==
// @name        FuckAds
// @namespace   http://vivyli.com
// @description ??????????
// @include     http://www.weibo.com/*
// @grant       none
// @version     1
// ==/UserScript==

var rightAd = document.getElementById('pl_rightmod_ads35');
rightAd.style.display = 'none';

var rightVip = document.getElementById('trustPagelet_recom_memberv5');
rightVip.style.display = 'none';

var rightApp = document.getElementById('trustPagelet_recom_allinonev5');
rightApp.style.display = 'none';

var rightTaobaoAd = document.getElementById('pl_rightmod_ads36');
rightTaobaoAd.style.display = 'none';

var bottomAdElems = document.getElementsByClass('footer_adv clearfix');
for(elem in bottomAdElems ){
    elem.style.display = 'none';
}

