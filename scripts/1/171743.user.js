// ==UserScript==
// @name       nosnow
// @namespace  http://www.bpodgursky.com/
// @version    0.1
// @description  Hides hacker news results related to Snowden 
// @match https://news.ycombinator.com/*
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2012+, Ben Podgursky
// ==/UserScript==

$("tr:contains('Snowden')").filter(":gt(0)").hide();
$("tr:contains('Snowden')").filter(":gt(0)").next().hide();
