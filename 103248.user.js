// ==UserScript==
// @name		Anti-premium
// @version		0.1
// @author		KA-Freak
//
// @include		http://s*.kingsage.*/game.php*
// @include		http://s*.kingsage.*/game.php*
// ==/UserScript==
as=document.getElementsByTagName("a")
var i=0
try {
for(i=0;i<=as.length();i++) {
 if(as[i].getAttribute("alt")=="Nutze mächtige Reliquien") {
 as[i].setAttribute("href","http://s5.kingsage.de/help.php?m=bbcodes")
}
} catch(e) {}
}

