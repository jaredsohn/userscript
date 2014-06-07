// ==UserScript==

// @name           Round Table Poker Helper

// @namespace      www.nowhere.com

// @description    Auto-Click the continue button

// @include        http://www.neopets.com/games/draw_poker/round_table_pokers.phtml*

// ==/UserScript==

if(document.body.innerHTML.indexOf('CONTINUE')!=-1)
{
document.body.innerHTML = '<form action= ./round_table_pokers.phtml method=post><input type=hidden name=x_continue value=1><input type="submit" color="blue" value="CONTINUE">';
document.forms[0].submit();
}