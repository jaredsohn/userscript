// ==UserScript==
// @name           72dpi Additional Emoticons
// @namespace      Electric Rain
// @description    V2.0 - Inserts a new row of customizable emoticons on the 72dpi forums!
// @include        http://forum.72dpiarmy.com/posting.php*
// ==/UserScript==

var allRows = document.getElementsByTagName('tr');  //Puts all rows in the document into an array.
var newRow = document.createElement('tr');  //Creates a new row for our additional icons.
allRows[16].parentNode.insertBefore(newRow,allRows[16]);  //Inserts the new row below the last row of emoticons (row 15).
allRows[16].innerHTML = "<td><a href='javascript:emoticon(\"[img]http://skytroniks.com/images/database/smilies/wtf.gif[/img]\")'><img src='http://skytroniks.com/images/database/smilies/wtf.gif' border='0' alt='WTF' title='WTF'></a></td><td></td><td></td><td></td>";  //Inserts 4 cells into the new row, along with the new emoticons inside them.

document.getElementsByName("message")[0].setAttribute('onchange', 'var theMessage; theMessage = document.getElementsByName("message")[0].value.replace(/:wtf:/, " [img]http://skytroniks.com/images/database/smilies/wtf.gif[/img] "); document.getElementsByName("message")[0].value = theMessage;');  //Automatically replaces any instance of :wtf: with the image specified, "onchange".