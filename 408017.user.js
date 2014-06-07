// ==UserScript==
// @name        longecityadblock
// @namespace   longecityadblock
// @include     http://*longecity.org/forum/topic/*
// @version     1
// @grant       none
// ==/UserScript==
var els = document.getElementsByClassName('group_title');
for (var i=0;i<els.length;i++){
	if(els[i].innerHTML.indexOf('Advert') != -1){
		els[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(els[i].parentNode.parentNode.parentNode.parentNode);
	}
}