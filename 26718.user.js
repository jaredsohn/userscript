// ==UserScript==
// @name ✖乂✖ Auto Signature
// @description Auto signature
// @include http://www.orkut.com/Scrap*
// @include http://www.orkut.com/CommMsg*
// @author ✖乂✖
// ==/UserScript==

var signature = "\[b][maroon]I belong to ✖乂✖[/maroon]";

function lalala () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n" + signature ;
clearInterval (lalalaid)
}
lalalaid = setInterval (lalala,2000)