// ==UserScript==
// @name        GoogleMapAddBingMapsLink
// @namespace   Adam
// @include     http://maps.google.com/maps?*
// @require     http://code.jquery.com/jquery-latest.js
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==

              
$("#gbqfb").after('<a id="bingMap" target="_blank" href="http://bing.com/maps/default.aspx?q=' + jQuery("#gbqfq").val() +'">Bing maps</a>');
jQuery("#bingMap").css("margin-left","10px")
