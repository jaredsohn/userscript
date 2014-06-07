// ==UserScript==
// @author         huhgawz
// @version        1.2
// @name           Yopmail Ad Remover
// @namespace      com.huhgawzzyztemz.greasemonkey.scripts.YopmailAdRemover
// @description    Removes ads from Yopmail
// @include        http://www.yopmail.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

// 1.0 First release.
// 1.1 Removes AdChoices ads from the home page.
// 1.2 Fixes some layout issues at the home page.

$('td[class*="fond alr alb"]').children().remove();
$('div[style*="margin-left:10px; background-color:#FFF;"]').remove();
$('ins:not([id])').remove();
$('a[href*="adbrite"], a[href*="fastclick"], object[data*="ringtone"], script[src*="adbrite"], script[src*="fastclick"], script[src*="show_ads"]').remove();