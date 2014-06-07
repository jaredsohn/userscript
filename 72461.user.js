// ==UserScript==
// @name           DSAusbauhilfe
// @namespace      DS
// @author         Bananaz
// @description    Erspart das Scrollen beim Bauen
// @include        http://de*.die-staemme.de*screen=main*
// ==/UserScript==


   /// ----------------------------------------------------------------------------- ///
  ///      Modifikationen und Weiterverbreitung dieses Scripts benoetigen unbedingt ///
 ///                             die Zustimmung des Autors!                        ///
/// ----------------------------------------------------------------------------- ///



function main1() {var x = new Array();var tables = document.getElementsByClassName('vis');for (a = tables.length - 1; a > -1; a--) {if(tables[a].getElementsByTagName('th')[1] != undefined && tables[a].getElementsByTagName('th')[1].innerHTML == 'Bedarf') {var table = tables[a]; break}}var rows = table.getElementsByTagName('tr');var nameExec = /buildings\/(.+)\.png/;var o = new Array();for (a = 1; a < rows.length; a++) {var y = '';var z = '';o = rows[a].getElementsByTagName('td');y = nameExec.exec(o[0].innerHTML)[1];var ausbauExec = /Ausbau auf Stufe (\d+)/;if (o[o.length-1].innerHTML.match(ausbauExec)) {z = '/game.php' + o[o.length-1].getElementsByTagName('a')[0].href.split('game.php')[1];x[a-1].stufe = ausbauExec.exec(o[o.length-1].innerHTML)[1];}x[a-1] = y + '-' + z;}var an = document.getElementById('content_value');an = an.getElementsByTagName('tbody')[0];var m = '<tr>';var n = '<tr>';for (a = 0; a < x.length; a++) {m += '<th width="80px"><img src="/graphic/buildings/' + x[a].split('-')[0] + '.png?1" alt=""></th>';n += '<td>';if (x[a].split('-')[1] == '') {n += '--'}else {n += '<a href="' + x[a].split('-')[1] + '">Auf</a>'}n += '</td>';}m += '</tr>';n += '</tr>';an.innerHTML += '<tr><td colspan="2"><table><tbody>' + m + n + '</tbody></table><td></tr>';}main1();