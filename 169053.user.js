// ==UserScript== 
// @name Sport Tv Ads Remove
// @namespace Luiz Carvalho
// @description Remove Ads e propagandas para TV
// @include http://localhost/ 
// @grant       GM_getValue
// @grant       GM_setValue
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript== 


$("head").remove();
$("script").remove();
$("div").remove();
$("span").remove();
$("table").remove();