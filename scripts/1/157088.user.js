// ==UserScript==
// @name        Google to YT Subs Link
// @namespace   DamnedRush
// @description Link to YT Sub Uploads
// @include     http*://www.google.*/
// @include     http*://google.*
// @version     1
// ==/UserScript==

var youtubelogo = document.getElementById('gb_36');
youtubelogo.href = 'http://www.youtube.com/feed/subscriptions/u';