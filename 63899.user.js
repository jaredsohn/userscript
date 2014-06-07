// ==UserScript==
// @name c74sh.js
// @description	add syntax highlighting to c74 forum
// @include	http://www.thelightningbolts.com/luke/bookmarklets/index2.html
// ==/UserScript==

function letsroll() {

var jsLoader_a = document.createElement('script');
jsLoader_a.src = "http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js";
jsLoader_a.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jsLoader_a);

var cssLoader_a = document.createElement("link");
with(cssLoader_a) {
	type = "text/css";
	rel = "stylesheet";
	href = "http://alexgorbatchev.com/pub/sh/current/styles/shCore.css";
}
document.body.previousSibling.appendChild(cssLoader_a);

var jsLoader_b = document.createElement('script');
jsLoader_b.src = "http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJScript.js";
jsLoader_b.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jsLoader_b);

var cssLoader_b = document.createElement("link");
with(cssLoader_b) {
	type = "text/css";
	rel = "stylesheet";
	href = "http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css";
}
document.body.previousSibling.appendChild(cssLoader_b);

function sh_wait() {
    if(typeof unsafeWindow.SyntaxHighlighter == 'undefined') {
        window.setTimeout(sh_wait,200);
    } else {
        unsafeWindow.SyntaxHighlighter.all();
    }
} 

sh_wait();

}

window.addEventListener("load", letsroll, false);

