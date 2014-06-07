// ==UserScript==
// @name           Remove Default Ads Reddit.TV
// @namespace      UnfuckRedditTv
// @description    Removes the default Ad video section from reddit.tv, bringing you striaght to the videos
// @include        http://reddit.tv/#/promo*
// @include        reddit.tv/#/promo*
// @version        1
// ==/UserScript== 


location.href = "http://reddit.tv/#/r/videos/";
document.getElementById("theme").href= "css/theme_light.css";
var promoLink = document.getElementById("promo-channel");
var sideBarE = document.getElementById("sidebar");
sidebar.removeChild(promoLink);