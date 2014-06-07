// ==UserScript==
// @name        Show only players in a game
// @namespace   stonewolf.SOPIAG
// @include     http://gep.gibehatspls.gladosdan.com/index.php?act=database*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1
// @grant		none
// ==/UserScript==

$('tr').has('span:not(:contains("In Team Fortress 2 now!"))').hide();
$('div:not(:contains("Offline, last online"):has("a"):not([class])').parent().parent().parent().parent().parent().parent().hide();
