// ==UserScript==
// @name       Bifrost - fix response Window
// @version    0.1
// @description  enter something useful
// @match      https://humtek.hum.au.dk/opgaver/korrespondancevisning.php?id=*
// @require http://code.jquery.com/jquery-1.9.1.js
// @require http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @copyright  2012+, You
// ==/UserScript==

var obj = $(".korrespondancebox").children("tbody").children("tr:nth-child(5)").children("td");
var tekst = obj.html();
var tekstMEOF = tekst.replace(/\n/g, '<br />');
var buttonObj = $("input[value='Ny mail']");
obj.html(tekstMEOF);