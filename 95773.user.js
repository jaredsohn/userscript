// ==UserScript==
// @name           kere.ws adblock-blocker-remover
// @include        http://kere.ws/*
// @include        http://*.kere.ws/*
// ==/UserScript==

var check = function(){
	if (unsafeWindow.trap_active) {
		unsafeWindow.trap_active = false;
	} else {
		window.setTimeout(check,10);
	}
};
check();