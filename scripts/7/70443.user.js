// ==UserScript==
// @name           ClickOnT
// @namespace      ClickOnT
// @description    ClickOnT
// @version        0.1.0
// @author         Ochetski

// @include        http://*click*teen*
// ==/UserScript==


GM_addStyle("*{margin:0 !important;padding:0 !important;border:0 none !important; background:#000 !important; color:#ccc !important;}");


for(var i=0;i<document.getElementsByTagName('a').length;i++) {
	if(document.getElementsByTagName('a').item(i).href.match(/(url\=)(http\:\/\/(.*))((\&|\?)(.*))/g)) {
		document.getElementsByTagName('a').item(i).href = document.getElementsByTagName('a').item(i).href.replace(/^(.*)(http\:\/\/.*)$/g,"$2");
		document.getElementsByTagName('a').item(i).getElementsByTagName('img').item(0).style.border = "1px solid red";
	}
}

