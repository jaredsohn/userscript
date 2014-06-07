// ==UserScript==
// @name                KASKUS Signature
// @description         Auto Signature
// @include             http://www.kaskus.us/newreply.php*
// @include             http://kaskus.us/newreply.php*
// @author              edited
// ==/UserScript==

var garis = "______________";
var sig1 = "";
var sig2 = "";
var sig3 = "";
var sig4 = "";
var quote = document.getElementsByTagName("textarea").item(0).value;

function arunim () {
document.getElementsByTagName("textarea").item(0).value = quote + "\n" + garis + "\n" + sig1 + "\n" + sig2;
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)