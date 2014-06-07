// ==UserScript==
// @name           Avanturist.org.LASTMESSAGEB_PATCH
// @description    Avanturist.org forum last message buttons PATCH
// @version        0.1.2
// @include        http://avanturist.org*
// @include        http://www.avanturist.org*
// @include        https://avanturist.org*
// @include        https://www.avanturist.org*
// ==/UserScript==

var i,j;
var e;
var w;

e=document.styleSheets;
for (i=0; i<e.length; i++) {
	w=e[i].cssRules;
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.button-blue a.lastMessage'){
			w[j].style.backgroundImage="url('http://www.dubta.ru/pict/lastmessage32.GIF')";
			w[j].style.width='18px';
			w[j].style.height='24px';
			break;
		};
	};
};

