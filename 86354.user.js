// ==UserScript==
// @name          Superantwort++
// @author	  Dlr
// @description   #postform-Erweiterungen
// @version       0.0.3
// @include	  http://www.supertopic.de/forum/*.html*
// @include	  http://supertopic.de/forum/*.html*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==




var o=[


"!!!1einself",
"gefällt mir nicht so",
"deine Mudder",
"Hi!|hallo people, seid ihr cool drauf? :ouw"



];



var tmpl='<a class="ubb" style="margin:0 -2px 0 0;" href="#" onclick="insertUBB(\'_K_ \',\'\',\'message\');'+
'return false;" title="_K_">_K2_</a> ';



$(function(){

$('#postform .floatleft').css('white-space','normal').append('<br/>');

for(x=0;x<o.length;x++){$('#postform .floatleft').append(
tmpl.replace(/_K_/g,o[x].split('|')[1]||o[x]).replace(/_K2_/,o[x].split('|')[0]));}

});



