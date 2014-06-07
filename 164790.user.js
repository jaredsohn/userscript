// ==UserScript==
// @id             conquerclub-autorefresh
// @name           conquerclub-autorefresh
// @version        1.0
// @namespace      
// @author         gaga
// @description    Autorefreshes conquerclub games
// @include        http://www.conquerclub.com/game.php?game=*
// @run-at         document-end
// ==/UserScript==

setInterval("sendRequest()", 3000);