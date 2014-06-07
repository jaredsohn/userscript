// ==UserScript==
// @name            v_v-filmFix
// @namespace       http://axlotl.net/greasemonkey
// @include         http://*villagevoice.com/nycguide*mc_filmreturn*
// ==/UserScript==
//
//	Now the Village Voice, shamelessly table-based in layout
//	and altogether ugly (especially after a recent redesign),
//	does offer one thing of value on their website, namely
//	a select-box-based listing of all the films showing
//	in New York City. But the select box is too small to show any
//	title over 8 characters and the film descriptions stretch
//	down their eensy column one or two words to a line.
//
//	This script fixes that and leaves the rest alone.
//	Oh, and it strips out the classified ads to make room.
//
//      License: GPL: http://www.gnu.org/copyleft/gpl.html
//      copyright (c) 2005, Chris Feldmann
//	complaints:  cwf[]axlotl[]net

function infectStyles(css) {
    var h, s;
    h=document.getElementsByTagName('head')[0];
    if (!h) { return; }
    s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css;
    h.appendChild(s);
}
infectStyles(
'.killCell{'+
'border:2px solid rgb(0,255,0) ! important;'+
'background-color: rgb(213,255,213) ! important;'+
'width: 260px ! important;'+
'padding: 5px ! important'+
'-moz-border-radius: 03% ! important;'+
'}'+
'.movieclockbottom select {'+
'width: 260px ! important;'+
'font-size: 9px; ! important'+
'font-weight: lighter ! important;'+
'}'+
'.theMeat {'+
'border:3px solid rgb(0,86,255) ! important;'+
'background-color: rgb(213,243,255) ! important;'+
'width: 580px ! important;'+
'padding: 10px ! important;'+
'-moz-border-radius: 03%;'+
'}');

var bigTamale = document.evaluate(
     "//TABLE[@width='488']",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
var bt = bigTamale.snapshotItem(0);   // containing table
bt.style.width='860px';

var badCell = document.evaluate(
     "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[last()]//TD",
     document,
     null,
     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
     null);
for (var i=badCell.snapshotLength;i>6;i--){   // strip unneeded cells off the end
     var killCell = badCell.snapshotItem(i-1);
     killCell.parentNode.removeChild(killCell);
}
badCell.snapshotItem(5).className += ' killCell';   // selectbox column
badCell.snapshotItem(4).className += ' theMeat';    // film description column


