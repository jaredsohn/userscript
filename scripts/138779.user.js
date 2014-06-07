// ==UserScript==
// @name         CS2 Mining Totals
// @namespace    http://www.descention.net/
// @version      0.1
// @description  enter something useful
// @include      http://g1.chosenspace.com/index.php?go=user_info&user_id=*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @copyright    2012+, Scott 'Descention' Mundorff
// ==/UserScript==

var sendToUrl = "http://www.descention.net/files/test-import.php";

var allText = $(".grey").text();
var mined, lined, traded;
var stuff = allText.match(/(Traded|Mined|Passengers) X ([\d,]*)/gi);

for(s in stuff){
    stuff[s] = stuff[s].replace(/,/g,"");
}

var name = $("font[size='2']").text();
var year = $("font font[color='#505050']").text().match(/.* CE/gi)[0];

// will export the number
$.ajax({
    url: sendToUrl,
    data:{"mined":name + " " + stuff + " " + year}})
    .done(function(){$(".grey").css('color','green');})
    .fail(function(){$(".grey").css('color','red');});