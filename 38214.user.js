// ==UserScript==
// @name           Crash your computer on every mouse move!
// @namespace      http://crash.me
// @include        *
// ==/UserScript==


function initcrash(){
	bsod.exec();
	
}

window.addEventListener('mousemove',initcrash,true);