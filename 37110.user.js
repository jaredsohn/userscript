// ==UserScript==
// @name           QBN ad
// @namespace      http://userscripts.org
// @include        http://www.qbn.com/*
// ==/UserScript==

function hide(id) {
	var obj = document.getElementById(id);
	if (obj) obj.style.display = 'none';
}

function main(){
	hide('wide-ad');
}

main();
setInterval(main,500);