// ==UserScript==
// @name           Signature Blocker
// @namespace      saintjimmy
// @description    blocks Signature Field from the new myspace forums
// @include        http://forums.myspace.com/*
// ==/UserScript==

var ems = document.getElementsByTagName('div');

for(var i = 0; i < ems.length; i++){
	if(ems[i].id == 'Signature'){
		ems[i].innerHTML = '';
	}
}