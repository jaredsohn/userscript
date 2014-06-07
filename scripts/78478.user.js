// ==UserScript==
// @name          Ikariam Finances Summary
// @version       1.0
// @copyright     2010, Yoshi Toranaga
// @license       GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace     Ikariam/FinancesSummary
// @description   Eliminate the complicated finances
// @include       http://s*.ikariam.*/*view=finances
// @exclude       http://support.ikariam.*/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

(function() { if ($("body").attr("id") != 'finances') return; $("div#mainview > table").slice(1,4).each( function() { $(this).hide(); });})();
