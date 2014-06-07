// ==UserScript==
// @name           72dpi :wtf: Icon
// @namespace      Electric Rain
// @description    Inserts a :wtf: Icon (or other icon of your choice with a little editing) overtop of the never-used "Arrow" icon (also, or other icon of your choice with a little editing) on the 72dpi forums!
// @include        http://forum.72dpiarmy.com/posting.php*
// ==/UserScript==

var allRows = document.getElementsByTagName('tr');
var theRowColumns = allRows[18].getElementsByTagName('td');

theRowColumns[3].innerHTML = "<a href='javascript:emoticon(\"[img]http://skytroniks.com/images/database/smilies/wtf.gif[/img]\")'><img src='http://skytroniks.com/images/database/smilies/wtf.gif' border='0' alt='WTF' title='WTF'></a>";