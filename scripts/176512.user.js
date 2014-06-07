// ==UserScript==
// @name       Make reddit Steamcommunity flairs clickable
// @version    0.1
// @description  Make flairs from users clickable
// @match      http://www.reddit.com/r/SteamGameSwap*
// @copyright  2013, /u/DayBay
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$('.flair').click(function (){  window.open($(this).attr('title')); });
$('.flair').css({cursor: pointer});