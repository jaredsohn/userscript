// ==UserScript==
// @name           google redirect remover
// @namespace      quark@lihdd.net
// @description    remove annoying redirects of google search results
// @include        http://www.google.*/search?*
// ==/UserScript==


function rwt() {
	return true;
}

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(rwt);
