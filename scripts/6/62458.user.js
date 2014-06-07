// ==UserScript==
// @name           Travian Map Popup
// @namespace      Apurba Roy
// @description    Pops up map square detail in new popup window.
// @include        http://*.travian.*/karte.php*
// @exclude        http://*.travian.*/karte.php?d=*
// ==/UserScript==

var w = window.innerWidth;;
var h = window.innerHeight;

var popW = 700, popH = 600;

var leftPos = (w-popW)/2, topPos = (h-popH)/2;

var areas = document.getElementsByTagName('area');
for (var i = 0; i < areas.length; i++) {
	var a = areas[i];	
	if (a.href.search(/karte[.]php[?]d=/i) != -1) {
		a.setAttribute("onclick", "window.open('" + a.href + "', new Date().getTime(), 'scrollbars=1,width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"'); return false;");		
	}
}