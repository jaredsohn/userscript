// ==UserScript==
// @name Reddit /r/Diablo
// @author Uriziel01
// @version 1.0
// @description Replaces Diablo subReddit text flairs with browser links
// @match http://www.reddit.com/r/Diablo/*
// @require http://code.jquery.com/jquery-latest.js
// @grant unsafeWindow
// @grant    GM_addStyle
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$("span.flair[class*='europe']").each(function( index ) {
    $( this ).wrapInner('<a href="http://eu.battle.net/d3/profile/' + $( this ).attr('title').replace("#","-").replace(" ","") + '/"></a>');
});
$("span.flair[class*='americas']").each(function( index ) {
    $( this ).wrapInner('<a href="http://us.battle.net/d3/profile/' + $( this ).attr('title').replace("#","-").replace(" ","") + '/"></a>');
});
$("span.flair[class*='asia']").each(function( index ) {
    $( this ).wrapInner('<a href="http://kr.battle.net/d3/profile/' + $( this ).attr('title').replace("#","-").replace(" ","") + '/"></a>');
});