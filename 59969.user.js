// ==UserScript==
// @name           directoriowarez links fixer
// @description    Elimina la redireccion de links en www.directoriowarez.com
// @namespace      http://userscripts.org/users/pqtkyo
// @include        http://www.directoriowarez.com/*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for(var i=0; i < links.length; i++) {
	links[i].href = links[i].href.replace("http://www.clicdescarga.com/?url=","");
}


