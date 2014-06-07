// ==UserScript==
// @name           Auto Signature By SKD
// @description    Auto signature By SKD..
// @include        http://www.orkut.com/CommMsg*
// @include        http://www.orkut.co.in/CommMsg*
// @author        skd
// ==/UserScript==

var signature = "[b]~$~[u][rED]To Avoid Critisism :- Do Nothing, Say Nothing nd Be Nothing[/red][/u]~$~ \n\n\n[8)][u]..::SKD was here::..[8)]  \n";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)