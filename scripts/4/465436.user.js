// ==UserScript==
// @name       Yahoo blackhole zapper
// @namespace  http://userscripts.org/users/lorriman
// @version    0.1
// @description  Removes news and gossip article lists on the front page to avoid getting sucked in and wasting a whole day
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      https://*.yahoo.com/
// @match      http://*.yahoo.com/
// @copyright  2012+, MIT license, Lorriman
// ==/UserScript==

$('.app-heading:contains("Trending Now")').parents('.app.app_trendingnow').remove();
$('.app-heading:contains("Featured videos ")').parents('.app.app-featured.videos').remove();
