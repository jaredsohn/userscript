// ==UserScript==
// @name       Krautchan Country Ball Post Purger
// @namespace  default
// @version    0.1
// @description  Pretty neat scripting, mate
// @match      http://krautchan.net/int/*
// @copyright  2012+, gdmka
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
var allposts, spareposts;
allposts = $(".postreply > .postheader ");
spareposts = allposts.children('img').attr('src');

//change 'us', 'pl' to countryballs you don't want to see
spareposts = allposts.find("img[src*='us']").parents(".postreply").hide('slow').parent().text('Murricah purged');

spareposts = allposts.find("img[src*='pl']").parents(".postreply").hide('slow').parent().text('Wojak purged');

}).call(this);