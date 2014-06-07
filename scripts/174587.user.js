// ==UserScript==
// @name          Twitch Chat Quality Improver
// @version       0.1
// @description   Removes Twitch faces
// @include       http://*.twitch.tv/*
// @include       https://*.twitch.tv/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function ExterminateAndDestroy()
{
    $("span.emoticon").remove();
}

setInterval(ExterminateAndDestroy, 10);