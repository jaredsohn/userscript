// ==UserScript==
// @name Remove Ads - StackOverflow.com
// @namespace http://www.ap3x.us/remove/ads/stack/overflow
// @description Remove the ads and "Help Wanted" postings in the sidebar of StackOverflow.com
// @include http://www.stackoverflow.com/*
// @include http://*.stackoverflow.com/*
// @include http://stackoverflow.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$("[width='728']").toggle();
$("[width='220']").toggle();
$("[class='everyonelovesstackoverflow']").toggle();
$("[class='welovestackoverflow']").toggle();
$("#copyright").append("<br />ads removed by ap3x");