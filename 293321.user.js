// ==UserScript==
// @name        tablesorter_for_rippleLabs
// @namespace   tblSort
// @include     https://www.computingforgood.org/stats/member/*
// @version     1
// @grant       none
// @  require		http://code.jquery.com/jquery-1.11.0.min.js
// @require		http://tablesorter.ru/jquery.tablesorter.min.js
// ==/UserScript==

document.getElementsByClassName('table table-striped')[0].id = 'sortMe';
document.getElementsByClassName('table table-striped')[0].rows[0].innerHTML = "<th>date</th><th>xrp amount</th><th>points</th><th>rate xrp/point</th><th>status</th>";

$("#sortMe").tablesorter();
