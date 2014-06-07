// ==UserScript==
// @name           Travian Message Popup
// @namespace      Travian:ondy1985
// @description    Pops up message detail in new window
// @include        http://*.travian.*/berichte.php*
// @include        http://*.travian.*/nachrichten.php*
// @exclude        http://*.travian.*/*?id=*
// ==/UserScript==

var w = window.innerWidth;;
var h = window.innerHeight;

var popW = 700, popH = 600;

var leftPos = (w-popW)/2, topPos = (h-popH)/2;

for (var i = 0; i < document.links.length; i++) {
	var a = document.links[i];	
	if (a.href.search(/(be|nach)richte[n]?[.]php[?]id=/i) != -1) {
		a.setAttribute("onclick", "window.open('" + a.href + "', new Date().getTime(), 'scrollbars=1,width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"'); return false;");		
	}
}