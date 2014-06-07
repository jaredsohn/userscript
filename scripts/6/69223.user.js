// ==UserScript==

// @name           Platzhalter

// @namespace      sdgsdgserg

// @include        http://de*.die-staemme.de/forum.php?screen=view_thread&thread_id=*

// ==/UserScript==

var a = document.createElement("a");
a.innerHTML = "<a title='Platzhalter' href=\"javascript: insertBBcode('message', '"+String.fromCharCode(160)+"', '');\"><img src='http://david97.kilu.de/platz.png'></a>";
document.getElementsByClassName("vis")[0].getElementsByTagName("div")[0].appendChild(a);