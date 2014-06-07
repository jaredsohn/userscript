// ==UserScript==
// @run-at         document-start
// @name           BRChan - NO BAN
// @author         Include
// @description    Evita de ser detectado pelo sistema de bans depois de trocar de IP
// @version        2.0
// @include        http://*.brchan.org/*
// ==/UserScript==

var ua = window.navigator.userAgent;

if (opera) {
	window.opera.addEventListener('BeforeScript', main, false);
}
else {
	window.addEventListener('beforescriptexecute', main, false);
}

function main(e) { 
	window.navigator.__defineGetter__('platform', function(){
		return getCookie('postpassword');
	});
}