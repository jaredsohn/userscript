// ==UserScript==
// @name        codeforce
// @namespace   http://codeforces.com/*
// @include     http://codeforces.com/*
// @version     1
// @grant none
// @require      http://jquery.com/src/jquery-latest.pack.js
// ==/UserScript==

$(".tag-box").hide();
$("html:contains(Codeforces is temporary unavailable)").html("<img src='http://facepalm.naurunappula.com/org/88/2f/882f2f13bc454c52/0/978495.gif'/>");


$("tr:not(.accepted-problem)").has(".act").each(function(i,a) { $(a).children().first().next().children().first().next().hide();});
$("td").css('padding-top','0').css('padding-bottom','0');
$(".notice").css('font-size','6px');