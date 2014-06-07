// ==UserScript==
// @name           Hide quickbar
// ==/UserScript==

$(".quickbar").prepend('<li dir="rtl"><span><a id="hide" href="#">(hide)</a></span></li>');
$("#hide").click(function(){
    $("#quickbar_outer").hide();
    $("#button").show();
});

$("#quickbar_outer").before('<span id="button" style="display:none;"><a id="show" href="#">(show the quickbar)</a></span>');
$("#show").click(function(){
    $("#quickbar_outer").show();
    $("#button").hide();
});

$("#hide").click();