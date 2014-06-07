/* TEM LA FIRME - Insertion des smileys par clic

Creation (MM/JJ/AAAA): 12/06/2008
Gillou
http://lggillou.free.fr/script/temlafirmesmileys.user.js

Teste sous GreaseMonkey 0,7.20080121.0
Uniquement pour Mozilla

Script sous license Creative Commons (http://creativecommons.org/licenses/by-nc-nd/2.0/fr/)

*/




// ==UserScript==
// @name           TEM La Firme - Smileys 
// @namespace      V0.1
// @description    Insertion des simleys par clic
// @include        http://www.tem-la-firme.com/poster*
// ==/UserScript==



function insert(smiley) {
  var t = document.getElementsByTagName('textarea')[0];
  if (t.selectionStart >= 0) {
    var pos = t.selectionStart;
    t.value = t.value.substr(0,t.selectionStart)+smiley+t.value.substr(t.selectionStart,t.value.length);
    t.focus();
    t.selectionStart = pos+smiley.length;
    t.selectionEnd = t.selectionStart;
  }
  else {
    t.value+=smiley;
    t.focus();
  }
}
unsafeWindow.insert = insert;

var Form = document.getElementsByName('form1');
if (Form && document.getElementsByTagName('textarea')[0]) {
  var Table = Form[0].getElementsByTagName('table')[0];
  if (Table) {
    TableT = Table.getElementsByTagName('table');
    for (var j=0; j<TableT.length; j++) {
      Table = TableT[j];
      if (Table.rows[0].cells.length == 3) {
        for (var i=0; i<Table.rows.length; i++) {
          if (Table.rows[i].cells[2].textContent.match(/\:([^\:]+)/) || Table.rows[i].cells[2].textContent.match(/\;([^\;]+)/)) {
            Table.rows[i].cells[2].innerHTML = '<center><a style="cursor: pointer; text-decoration: underline;" onclick="insert(\''+Table.rows[i].cells[2].textContent+'\')">'+Table.rows[i].cells[2].textContent+'</a><center>';
          }
        }
      }
    }
  }
}

if (document.getElementsByTagName('table').length > 0) {
  document.getElementsByTagName('table')[2].setAttribute('class', 'smiley1');
  document.getElementsByTagName('table')[3].setAttribute('class', 'smiley2');
  GM_addStyle('table.smiley1 {position: absolute; left: 460px; top: 0px; width: 300px} table.smiley2 {position: absolute; left: 770px; top: 0px; width: 300px}');
}

window.outerHeight = screen.availHeight;
window.outerWidth = screen.availWidth;