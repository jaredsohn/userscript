// ==UserScript==
// @name           Wikipedia category importer
// @author         Spencer kelly
// @namespace      http://spencerwaterbed.com/soft
// @description    Write wikipeida category data to freebase.
// @include        *://en.wikipedia.org/wiki/Category:*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready( function() {

var myurl = document.location.href;
myurl=myurl.replace('http://en.wikipedia.org/wiki/','');




  $('#content .firstHeading').append('<a style="font-size:8px; position:relative; left:40;" href="http://fatcat.freebaseapps.com/index?catbox0=yes&cat='+myurl+'">import</a>');
});