// ==UserScript==
// @name        Force Add Steam profile as friend
// @namespace   stonewolf.FASPAF
// @include     http://steamcommunity.com/profiles/*
// @include     http://steamcommunity.com/id/*
// @exclude		http://steamcommunity.com/id/*/inventory/
// @exclude		http://steamcommunity.com/profiles/*/inventory/
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1
// @grant		none
// ==/UserScript==

var steamid_div = $('a[href*="blocked/?add"]').parent().html();
var steamid = steamid_div.substring(114,131);
$('#rightActionBlock :nth-child(1) :first').html("<div class='actionItemIcon'><img src='http://cdn.steamcommunity.com/public/images/skin_1/iconAddFriend.png' border='0' height='16' width='16'></div><a class='linkActionMinor ' href='steam://friends/add/" + steamid + "'>Add friend</a>");
