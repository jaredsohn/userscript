// ==UserScript==
// @name         Skip imgur.com landing page
// @description  Skips directly to the image (.jpg/.png/.gif) without leaving a "back" history entry
// @include      http://www.imgur.com/*
// @include      http://imgur.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(function()
{
    var imgs = $("div#content div.image img");
    if (imgs.length == 1)
        location.replace(imgs.eq(0).attr("src"));
});
