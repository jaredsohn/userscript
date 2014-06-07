// ==UserScript==
// @name       Renovate Dashboard page
// @namespace  http://production.mcb.dk/
// @version    1.0
// @description  Adding URL to Link parser and more...
// @match      http://production.mcb.dk/Default.asp
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

$('.ov-rows a').each(function(){$(this).attr('target','_blank');});