// ==UserScript==
// @name           Logirc
// @namespace      Logirc
// @include        http://natar.travian.org*
// @include        http://natar.travian.org/*
// @include        http://natar.travian.org:8080/*
// ==/UserScript==

/*****Parte modificabile dall'utente*************/
	get_nickname = "IlMioNick";
	get_channel="#travian.it";
	get_button="Clicca e chatta!";
/************************************************/
window.flippa = function(){ 
elements = document.getElementsByTagName('input');
elements[0].value = get_nickname;
elements[1].value = get_channel;
elements[2].value = get_button; 
}
window.clicca = function(){ 
elements = document.getElementsByTagName('input');
elements[2].click();
}
window.setTimeout(flippa, 1000);
window.setTimeout(clicca, 2000);
