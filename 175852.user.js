// ==UserScript==
// @name           إخفاء البار السريع
// ==/UserScript==

$(".quickbar").prepend('<li dir="rtl"><span><a id="hide" href="#">(إخفاء)</a></span></li>');
$("#hide").click(function(){
    $("#quickbar_outer").hide();
    $("#button").show();
});

$("#quickbar_outer").before('<span id="button" style="display:none;"><a id="show" href="#">(إظهار البار السريع)</a></span>');
$("#show").click(function(){
    $("#quickbar_outer").show();
    $("#button").hide();
});

$("#hide").click();