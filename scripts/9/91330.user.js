// ==UserScript==
// @name                Scrip Maho
// @description         Serba hijau
// @include             http://www.kaskus.us/newreply.php*
// @include             http://kaskus.us/newreply.php*
// @author              punyaubay
// ==/UserScript==

var format = "[COLOR=Green][B]";
var signature = "                          [/B][/COLOR]";
var quote = document.getElementsByTagName("textarea").item(0).value;

function arunim () {
document.getElementsByTagName("textarea").item(0).value = quote + format + "\n\n\n\n\n\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)