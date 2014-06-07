// ==UserScript==
// @name           Alan's Fight List updater
// @namespace      Alan's Fight List updater
// @include        http://bots4.net/fight*
// @require        http://www.kryogenix.org/code/browser/sorttable/sorttable.js
// @require        //ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

content = $("#content").html();
var str = content.split("<h2>Level Range</h2>");
var dex = str[1].split("</p>");
var list = '<h2>Level Range</h2>'+dex[0]+'</p>';

$("#content").append(list);
$(".tight").addClass('sortable');