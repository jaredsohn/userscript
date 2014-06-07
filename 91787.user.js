// ==UserScript==
// @name           Travian - NPC helper
// @description    NPC helper Like Plus under building/upgrading link in building
// @include        http://*.travian*.*/build.php?*
// @version        1.0
// ==/UserScript==

function ID(id) { return document.getElementById(id) };
function PR(string) { return parseInt(string) };
function L(num) { return ID("l" + num).innerHTML.split("/")[0]; };
function CM(value) { return value.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&,"); };

var target =  ID("contract");
var HTML = target.innerHTML;
var GET = HTML.split(/<img\b[^>]*>/);

var A = GET[1].replace(" | ", "").replace(/<span\b[^>]*>(.*)<\/span>/, "$1");
var B = GET[2].replace(" | ", "").replace(/<span\b[^>]*>(.*)<\/span>/, "$1");
var C = GET[3].replace(" | ", "").replace(/<span\b[^>]*>(.*)<\/span>/, "$1");
var D = GET[4].replace(" | ", "").replace(/<span\b[^>]*>(.*)<\/span>/, "$1");

var E = PR(A) + PR(B) + PR(C) + PR(D);
var F = PR(L('1')) + PR(L('2')) + PR(L('3')) + PR(L('4'));
var G = PR(F) - PR(E);

var FN = 'font-size';
var dir = 'direction';
var S = '&nbsp;'; var red = 'color: red'; var grn = 'color: green';
if (HTML.match(/little_res/) && (E == F || F > E)) {
    var NPC = '<td><a href="/build.php?gid=17&t=3&bid=8&r1=' + A + '&r2=' + B + '&r3=' + C + '&r4=' + D + '"><img class="npc" src="img/x.gif" /></a></td><td style="' + dir + ': ltr; ' + FN + ':12px;">' + S + S + 'Total' + S + '[<span style="' + grn + '">+' + CM(G) + '</span>]</td>';
} else if (E > F) {
    var NPC = '<td style="' + dir + ': ltr; ' + FN + ':12px;">' + S + S + 'Total' + S + '[<span style="' + red + '">' + CM(G) + '</span>]</td>';
} else {
    var NPC = '<td style="' + dir + ': ltr; ' + FN + ':12px;">Total' + S + '[<span style="' + grn + '">+' + CM(G) + '</span>]</td>';
};

var Table = document.createElement("table");
Table.setAttribute("cellspacing", "0");
Table.setAttribute("style", "direction:ltr; width:auto;");
Table.innerHTML = '<tbody><tr>' + NPC + '</tr></tbody>';
target.appendChild(Table);
