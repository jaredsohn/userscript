// ==UserScript==
// @name           temp sidebar
// @namespace      www.torn.com
// @description    places links back on the sidebar
// @include        http://www.torn.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js

$('#nav-city').append(" | <a href='/racing.php'>Race</a>");
$('#nav-education').hide();
$('#nav-awards').append(" | <a href='/personalstats.php'>Stats</a>");
$('#nav-properties').append(" | <a href='/airstrip.php'>Travel</a>");
$('#nav-search').append(" | <a href='/advsearch.php'>Advanced</a>");
$('#nav-newspaper').hide();
$('#nav-hospital').hide();
$('#nav-faction').append(" | <a href='/factions.php?step=hitlist'>Warbase</a>");

// ==/UserScript==

