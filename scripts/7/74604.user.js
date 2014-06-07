// ==UserScript==
// @name           OgameAllyMessageFix
// @namespace      ogame
// @description    Fix for Ally Messages in Ogame Redesign v1.2.1
// @version	1.0.0
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

var url = document.location.href;
    var container = document.getElementById("messagebox");
    container.innerHTML=container.innerHTML.replace(/\\n/g,'<BR>');