// ==UserScript==
// @name        Kandorya Wiki link
// @namespace   Kandorya Wiki link
// @description Kandorya Wiki link
// @include     http://forum.kandorya.com/*
// @require		http://code.jquery.com/jquery-latest.min.js
// @version     1
// ==/UserScript==

jQuery('table.transparent').find('div.postbody').each(function(){
	var text = jQuery(this).html();
	diese = text.split('#');

		for(i=0;i<diese.length;i++){
		if (diese[i]){
			mot = diese[i].split(' ');
			mot = mot[0].split('<');
			if(mot[0].indexOf('">') == -1 ){
				text = text.replace(mot[0],'<a href="http://www.kandorya.com/k_wiki/index.php?title='+mot[0]+'">'+mot[0]+'</a>');
				jQuery(this).html(text);
			}
		}
	}
});