// ==UserScript==
// @name       Reddit Slowdown
// @version    0.5
// @description  Hides all <body> content for a set time period after loading.
// @include      /^https?://www.reddit.com/
// @include      /^https?://(www|i).imgur.com/
// @include      /^https?://www.quickmeme.com/
// @include      /^https?://www.facebook.com/
// @include      /^https?://www.twitter.com/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  Yiffy Trippy Jackyl 2013, http://twitter.com/yiffyjackyl
// ==/UserScript==

hideContent();

function hideContent() {
    $("body").fadeOut(100);
    setTimeout(showContent,7000);
}

function showContent() {
 	$("body").fadeIn();   
}