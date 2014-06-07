// ==UserScript==
// @name           72dpi :wtf: Icon (For PMs)
// @namespace      Electric Rain
// @description    Inserts a :wtf: Icon (or other icon of your choice with a little editing) overtop of the never-used "Arrow" icon (also, or other icon of your choice with a little editing) on the 72dpi forums! (This is for PMs.)
// @include        http://forum.72dpiarmy.com/privmsg.php?mode=reply*
// @include        http://forum.72dpiarmy.com/privmsg.php?mode=post*
// ==/UserScript==

var allRows = document.getElementsByTagName('tr');
var theRowColumns = allRows[16].getElementsByTagName('td');

theRowColumns[3].innerHTML = "<a href='javascript:emoticon(\"[img]http://skytroniks.com/images/database/smilies/wtf.gif[/img]\")'><img src='http://skytroniks.com/images/database/smilies/wtf.gif' border='0' alt='WTF' title='WTF'></a>";