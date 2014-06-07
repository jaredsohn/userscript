// ==UserScript==
// @name           klawisz info
// @namespace      local
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==

if(unsafeWindow.show_info){
	unsafeWindow.$('textarea').blur(enable);
	unsafeWindow.$('textarea').focus(disable);
	enable();
}

function enable(){
	unsafeWindow.$(document).keydown(keyHandler);
}

function disable(){
	unsafeWindow.$(document).unbind('keydown');
}

function keyHandler(e){
	if(e.keyCode == 9){
		unsafeWindow.show_info();
		e.preventDefault();
	}
}
