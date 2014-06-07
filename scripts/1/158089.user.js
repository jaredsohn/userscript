// ==UserScript==
// @name       AudoShowHiddenText
// @namespace  http://lazybaha.tk
// @version    1.0
// @description  自動顯示隱字，免反白
// @match      http://forum.gamer.com.tw/C.php*
// @match      http://forum.gamer.com.tw/Co.php*
// @copyright  2013+, http://lazybaha.tk
// @updateURL  http://userscripts.org/scripts/source/158089.meta.js
// @downloadURL http://userscripts.org/scripts/source/158089.user.js
// ==/UserScript==

(function(g){var e=g.getElementsByTagName("font"),a=e.length,h;for(var b=0;b<a;b++){h=e[b].getAttribute("color");if(h!==null&&h.toUpperCase()==="#FFFFFF"){e[b].setAttribute("style","border:1px solid #AAA;background:#EEE;");e[b].setAttribute("color","#0098d4")}}})(document);