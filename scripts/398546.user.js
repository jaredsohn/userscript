// ==UserScript==
// @name       Fix BMC Remedy in Chrome
// @namespace  http://www.willcarle.com/
// @version    0.1
// @description  This fixes a display issue with BMC remedy that caused the group dropdown list to be hidden.
// @match      https://endeavour.unfcsd.unf.edu/*
// @copyright  2014+, Will Carle
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function(){
$("div[class*='_ConsoleTitle']").css("border-width", "1px");    
});
