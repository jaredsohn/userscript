// ==UserScript==
// @name                Signature adha
// @description         pasang signatur "warna biru teks
// @include             http://www.kaskus.us/newreply.php*
// @include             http://kaskus.us/newreply.php*
// @author              punyaubay
// ==/UserScript==

var format = "[RIGHT][B][FONT="Comic Sans MS"][COLOR="green"]";
var signature = "[/COLOR][/FONT][/B][/RIGHT]";
var quote = document.getElementsByTagName("textarea").item(0).value;

function arunim () {
document.getElementsByTagName("textarea").item(0).value = quote + format + "\n\n\n\n\n\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)
