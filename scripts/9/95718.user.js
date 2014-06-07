// ==UserScript==
// @name           Dpreview - remove top panel
// @namespace      http://userscripts.org/users/lorriman
// @description    Top panel removal
// @include        *.dpreview.com*
// @version .1
// ==/UserScript==

divs=document.getElementsByTagName('div');
for(x=0;x<divs.length;x++){
	if(divs[x].getAttribute('class')=='ad top wrapper'){
		divs[x].style.display='none';
	}
}
