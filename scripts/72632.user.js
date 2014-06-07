// ==UserScript==
// @name                KASKUS Signature Aremania-Biru
// @description         pasang signatur "Sejak Dulu AREMANIA itu BIRU" di setiap posting kaskus umak
// @include             http://www.kaskus.us/newreply.php*
// @include             http://kaskus.us/newreply.php*
// @author              abdurrm 
// ==/UserScript==

var format = "[COLOR=Blue][B]";
var signature = "[/B][/COLOR][RIGHT][FONT=System][B][COLOR=Blue]sejak dulu AREMANIA itu biru[/COLOR][/B][/FONT][/RIGHT]";
var quote = document.getElementsByTagName("textarea").item(0).value;

function arunim () {
document.getElementsByTagName("textarea").item(0).value = quote + format + "\n\n\n\n\n\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)