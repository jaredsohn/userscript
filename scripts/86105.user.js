// ==UserScript==
// @name           Ad_Remover
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://www.anno1777.com/*
// ==/UserScript==


var all = document.getElementsByTagName('table');

for(var i=0; i < all.length; i++) {

	if(all[i].align == 'right'){
		all[i].innerHTML = '';
return;
	};

};
