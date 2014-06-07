// ==UserScript==
// @name           Include:Neopets: Burger King Canada Code Redeemer
// @description    Not for separate use
// @author         Dilly Bar
// @include        *www.neopets.com/bk/
// @version        1.0
// ==/UserScript==
var bkcode = new Array("A967","F213","H483","K563","L392","M547","M823","N176","S246","S794","T415","T673");
for (var i=0;i<bkcode.length;i++)
{
for (var b=0;b<8;b++){
document.getElementById("code_1").value=bkcode[i];
bk_check_code(false);
remove_rollover("msg_div");}}