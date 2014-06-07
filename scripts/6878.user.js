// ==UserScript==
// @name          Font Changer for 2ch Ascii Art
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  Changes font for ascii art @ 2ch.net
// @include       http://*.2ch.net/*
// @include       http://makimo.to/*
// @version       1.2
// ==/UserScript==

(function () {
	var headobj = document.getElementsByTagName('head')[0];
	var styleobj = document.createElement('style');
	styleobj.type = 'text/css';
	styleobj.innerHTML = "dd{font:12pt '\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF','MS PGothic','MS P\uff7a\uff9e\uff7c\uff6f\uff78','MS P\u30b4\u30b7\u30c3\u30af','IPA \u30E2\u30CA\u30FC P\u30B4\u30B7\u30C3\u30AF','IPA MONAPGOTHIC','mona-gothic-jisx0208.1990-0',Mona,Osaka; line-height:18px;}";
	if(headobj){
		headobj.appendChild(styleobj);
	}
})();
