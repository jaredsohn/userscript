// ==UserScript==
// @name alreadyreddit
// @namespace http://www.jamonterrell.com/projects/greasemonkey/alreadyreddit
// @description Hides links automatically s you read them
// @include http://www.reddit.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$(".thing.link a.title:visited").parents().filter(".thing").hide();


$("a.title").click(function(ev) {
    $(ev.target).parents().filter(".thing").find(".hide-button a").click();
});