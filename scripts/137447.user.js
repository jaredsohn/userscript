// ==UserScript==
// @name        TwitchTV Floating Ad Sniper
// @version     0.1
// @author      Sennyotai
// @description Removes the floating ad from Twitch.TV Channels
// @include     http://*.twitch.tv/*
// @include     http://twitch.tv/*
// @include     https://*.twitch.tv/*
// @include     https://twitch.tv/*
// ==/UserScript==

var adSnipe = document.getElementById("google_ads_div_Twitch_ChanMedRectv2_ad_wrapper");
adSnipe.parentNode.removeChild(elmDeleted);