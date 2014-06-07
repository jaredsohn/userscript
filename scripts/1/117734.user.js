// ==UserScript==
// @name       Gnews
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http*://news.google.com*
// @copyright  2011+, You
// ==/UserScript==

$("div.google-one-wrapper").hide()
$("div #kd-googlebar").hide()
$("div.footer").hide()
$("body").css("background", "#ffffc9")
$("table").css("background", "#ffffc9")
$("div.browse-sidebar").css("background", "#ffffc9")
    