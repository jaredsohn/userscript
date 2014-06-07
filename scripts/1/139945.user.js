
// ==UserScript==
// @name           Green Bay Gazette "all articles for free" unlocker
// @description    Allows all articles on the Green Bay Gazette website to be viewed for free (without the need for a paid subscription, or any subscription for that matter).
// @author         Josh1billion
// @include        http://*greenbaypressgazette.com/*
// @version        1.0
// ==/UserScript==

$(".firefly").remove();
$("#modalouter_dm").remove();
document.documentElement.style.overflow = "auto";