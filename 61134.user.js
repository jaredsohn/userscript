// ==UserScript==
// @name        Sexy Undeads
// @namespace   ---
// @include     http://www.goodgame.ru/*
// @description fap fap
// @author      Fen1kz
// @version     1.0
// @licence     Nya ^_^
// ==/UserScript==

var array_images = document.images;
var ail = array_images.length;
for(i=0; i<ail; i++) {
	if (array_images[i].src == 'http://www.goodgame.ru/datas/icons/4_rjlo3_ico.gif') {
		array_images[i].src = 'http://img26.imageshack.us/img26/4985/droww.png';
	}
	if (array_images[i].src == 'http://www.goodgame.ru/images/analysis_wc/w3xp/undead.gif') {
		array_images[i].src = 'http://img97.imageshack.us/img97/4608/drowmod.png';
	}
}