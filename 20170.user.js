// ==UserScript==
// @name           Auto Signature

// @description    Auto signature ... huh
// @include        http://www.orkut.com/Scrap*
// @include        http://www.orkut.com/CommMsg*
// @author        john http://www.orkut.com/Profile.aspx?uid=8507477015726356624
// ==/UserScript==

var signature = "[b][gray]I M ALWYZ RIGHT>>>ONCE I THOUGHT THAT I WAS WRONG...... but i WAS WRONG...[b][/gray]\n";
 
function sign () {
document.getElementsByTagName("textarea").item(0).value = "[/i][/u][/b]\n\n\n" + signature ; 
clearInterval (signid) 
}
signid = setInterval (sign,2000)