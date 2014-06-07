// ==UserScript==
// @name QuickBuy Pets for Tagged
// @description Creates a quickbuy button on Pets for Tagged. No refreshing.
// @include *tagged.com/pets.html?uid=*
// @require http://code.jquery.com/jquery-1.4.2.min.js
// @version 0.1
// ==/UserScript==

var userId = location.href.match(/\?uid=(\d+)/)[1];
var e = document.createEvent('HTMLEvents');
e.initEvent('click', true, true);
$('buy_now_profile_'+userId).dispatchEvent(e);