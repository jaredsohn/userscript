// ==UserScript==
// @name        chmurkowyjebywacz
// @include     http://*erepublik.com/*
// @include     https://*erepublik.com/*
// @version     1
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       unsafeWindow
// ==/UserScript==

function hidethatfuckingshit()
{
    $('div.notification_area, a.newleaderboard em').hide();
}

$(function()
{
    hidethatfuckingshit();
});

hidethatfuckingshit();