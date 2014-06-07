// ==UserScript==
// @name			سكربت دبل A
// @namespace			lenni
// @description			Replaces new Facebook sidebar with one like the original.
// @version			1.0.0
// @grant			none
// @include			http://aec1.tribalwars.ae/game.php?village=*4754&screen*=am_farm
// @include			http://aec1.tribalwars.ae/game.php?village=*4754&screen*=am_farm
// @match			http://aec1.tribalwars.ae/game.php?village=*4754&screen*=am_farm
// @match			http://aec1.tribalwars.ae/game.php?village=*4754&screen*=am_farm
// ==/UserScript==


$(function(){
$("<h4>تم تصميم السكربت من قبل <a href=http://forum.tribalwars.ae/member.php?u=24151>keke..2010</a></h4></br>").prependTo("div.body table tr td:eq(0)");

});


$(function(){
$("<button id='keke'>A</button>").prependTo("tbody tr td tr th:eq(32)");
$("#keke").click(function(){
$("div .body table tr td:nth-child(9)").find("a").click();

});
});


$(function(){
$("<button id='B'>B</button>").appendTo("tbody tr td tr th:eq(32)");
$("#B").click(function(){
$("div .body table tr td:nth-child(10)").find("a").click();

});
});

$(function(){
$("<button id='C'>C</button>").prependTo("tbody tr td tr th:eq(33)");
$("#C").click(function(){
$("div .body table tr td:nth-child(11)").find("a").click();

});
});

void(0);