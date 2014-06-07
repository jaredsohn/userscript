// ==UserScript==
// @name           test
// @namespace      tag://chatzy
// @description    tets
// @author         KT
// @version        0.0.1
// @date           03.24.2012
// @include        *chatzy.com/49202251928508
// ==/UserScript==

function main() {
document.write('testing');
}
	console.write('chatzy ..... KT.... KT....');
	var script = document.createElement("script");
	script.appendChild(document.createTextNode('('+main+')()'));
	(document.head || document.body || document.documentElement).appendChild(script);
