// ==UserScript==
// @name        electronix
// @namespace   electronix
// @include     http://electronix.ru/forum/*
// @version     0.1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant GM_log

var UserID;
UserID = "44487";

//$(".postcolor").css("font-family", "Droid Sans Mono");
$("tr:has(td:has(#mklogostrip))").remove();
$("tr:has(.navigatore)").remove();
$("#gfooter").remove();
var str = '<div class="ipb-top-right-link"><a href="http://electronix.ru/forum/index.php?act=Search&CODE=gettopicsuser&mid=' + UserID + '">My Topics</a></div>';
$("#submenu").append(str);
str = '<div class="ipb-top-right-link"><a href="http://electronix.ru/forum/index.php?act=Search&CODE=getalluser&mid=' + UserID + '">My Comments</a></div>';
$("#submenu").append(str);
str = '<div class="ipb-top-right-link"><a href="http://electronix.ru/index.php?pid=13">Access FTP</a></div>';
$("#submenu").append(str);


$('img[emoid]').each(function(item) {
    $(this).before($(this).attr("emoid"));
    $(this).remove();
});
// ==/UserScript==