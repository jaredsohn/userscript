(function() {

// ==UserScript==
// @name          cffilter
// @namespace     http://localhost.localdomain
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.0.1
//
// @include   http://www.christianforums.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
//
// ==/UserScript==

$("div.tborder.alt1").hide();
$("td.tcat").parents("table.tborder").hide();
$("#ezalert_overlay #ezalert_container").hide();
$("img#dslogo").parents("table").hide();
$("td.alt2.smallfont").closest("table.tborder").hide();
$("span:contains('(power:')").hide();
})();