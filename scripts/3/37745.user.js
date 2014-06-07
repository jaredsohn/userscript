// ==UserScript==
// @name           Wakimin
// @description   Deskripsi script
// @include        http://pemalang-underground.aforumfree.com/forum.htm*
// @include        http://pemalang-underground.aforumfree.com/forum.htm*
// @author         Wakimin
// ==/UserScript==

var signature = "http://img146.imageshack.us/img146/72/userbar697267ob4.gif";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)
