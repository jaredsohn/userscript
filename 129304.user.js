// ==UserScript==
// @name           eRepublik Security notification Blocker
// @description    A brief description of your script
// @author         PoopZemli
// @match          http://www.erepublik.com/en/main/warn/*
// @include        http://www.erepublik.com/en/main/warn/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        1.0
// @namespace      PZ
// ==/UserScript==
document.location.href = $("div#content div#toplineholder div.notificationwarning div.content p a").attr("href");
