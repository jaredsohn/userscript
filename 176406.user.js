// ==UserScript==
// @name          Autotask Ticket Status Colorize
// @description   Makes it easier to differentiate between ticket statuses
// @version       0.1
// @homepage      https://userscripts.org/scripts/show/176406
// @downloadURL   https://userscripts.org/scripts/source/176406.user.js
// @installURL    https://userscripts.org/scripts/source/176406.user.js
// @updateURL     https://userscripts.org/scripts/source/176406.meta.js
// @date          2013-08-23
// @author        dstotijn
// @contact       dstotijn@gmail.com
// @license       MIT License http://nrm.mit-license.org/2012
// @include       https://*.autotask.net/serviceDesk/TicketsList/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js

// ==/UserScript==

var red = "#DE0000";
var green = "#59AD44";
var blue = "#1B84E0";
var orange = "#F7981B";

// Blue statuses
$("#Table6 > tbody > tr > td").filter(function() {
  return $(this).text() === "New";
}).css("color", blue).css("font-weight", "bold");

// Red statuses
$("#Table6 > tbody > tr > td").filter(function() {
  return $(this).text() === "In Progress" ||
         $(this).text() === "Waiting Internal";
}).css("color", red).css("font-weight", "bold");

// Green statuses
$("#Table6 > tbody > tr > td").filter(function() {
  return $(this).text() === "Dispatched" ||
         $(this).text() === "Waiting Customer" ||
         $(this).text() === "Waiting Vendor";
}).css("color", green);

// Orange statuses
$("#Table6 > tbody > tr > td").filter(function() {
  return $(this).text() === "Customer Replied";
}).css("color", orange).css("font-weight", "bold");