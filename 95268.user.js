// ==UserScript==
// @name           DS-ForumLinkAnpasser 
// @description    Stellt den Stammesforum-Link in DS auf &screen=ally&mode=forum um
// @author         Lukas Haimbuchner
// @version        1.0.0
// @include        http://de*.die-staemme.de/game.php*
// ==/UserScript==

var link = document.getElementsByTagName("a");
var newLink = new String(link[40].href);

link[40].href = newLink.replace("redir_forum=", "mode=forum");
link[40].target = "";