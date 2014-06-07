// ==UserScript==
// @name           Auto Signature
// @description    Auto signature..
// @include        http://www.orkut.com/CommMsg*
// @include        http://www.orkut.co.in/CommMsg*
// @author        aRuNiM
// ==/UserScript==

var signature = "[red][b]*~ [8)][:)] ..:: [u][purple]~คl๏ภє ค๔๔เςtє๔~

°◕┌─●รเĿξทт●─┐◕° [/u][/purple][b][red] ::.. [:)][8)] ~*\n";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)