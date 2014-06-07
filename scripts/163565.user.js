// ==UserScript==
// @name       Fetlife image url
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://fetlife.com/users/*/pictures/*
// @require http://code.jquery.com/jquery-1.8.3.min.js
// @copyright  2012+, You
// ==/UserScript==


var url=$("#picture div a span").css("background-image")
url=url.replace("url(","").replace(")","")
$("#profile_header").append("<a href="+url+">Direct link</a>")