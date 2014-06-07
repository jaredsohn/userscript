// ==UserScript==
// @name           UserFrienedly AdRemoval
// @namespace      77087
// @description    Remove annoying top ads from UserFriendly
// @include        http://*.userfriendly.org/cartoons
var adPanel = document.getElementById('google_ads_div_1_Archives_728X90');
adPanel.style.display = 'None';
// ==/UserScript==