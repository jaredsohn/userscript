// ==UserScript==
// @name           wut
// @namespace      ajjr1228
// @description    wuher
// @include        http://services.runescape.com/m=forum/*
// ==/UserScript==

spanz = document.getElementsByTagName('table');

for (i = 0; i < spanz.length; i++){
   	if ((spanz[i].className == 'message jmod')){
		spanz[i].className = 'message moved';
	}
   	else if((spanz[i].className == 'message mod')){
		spanz[i].className = 'message hid';
   	}
}