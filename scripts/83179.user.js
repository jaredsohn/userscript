// ==UserScript==
// @name           message Re: in gray
// @namespace      yahoo
// @description    puts Re: messages in gray
// @include        http://groups.yahoo.com/group/*messages*
// ==/UserScript==

function mesGris(){
var	llista = document.querySelectorAll('span');
	for (var i=0; i<llista.length; i++){
		if (llista[i].innerHTML.indexOf('Re: ')>=0){ 
			llista[i].style["background"]='Silver';
			}
	} // for i	
}

mesGris();