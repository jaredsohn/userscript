// ==UserScript==
// @name            Daily bitcoins (Coming Prizes) delay remover
// @namespace       1235d5PZ3fozUW1iMk9aXit9Zp7sYNT1YY
// @icon            http://dailybitcoins.org/favicon.ico
// @description     Removes the wait-delay from "Coming Prizes"
// @include         http://dailybitcoins.org/prizes.php
// @match           http://dailybitcoins.org/prizes.php
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version         1.0
// ==/UserScript==

$('#time-box').css('display', 'none');
$('.prize-seconds').css('visibility', 'visible');