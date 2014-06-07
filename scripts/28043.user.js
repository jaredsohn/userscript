// ==UserScript==
// @name           Add GLB Outbox
// @namespace      GLB
// @description    Add Outbox link
// @include    http://goallineblitz.com/game/home.pl
// ==/UserScript==

window.setTimeout( function() 
{

var accountInfo= document.getElementById('my_account_content');

if (accountInfo) {
    var newRow = accountInfo.insertRow(3);
    var newCell = newRow.insertCell(0);   
   newCell.colspan = '2';
   newCell.innerHTML = '<a href="/game/outbox.pl">Outbox</a>';
}


},100);