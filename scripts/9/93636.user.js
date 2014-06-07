// ==UserScript==
// @name           brandaris-boeking
// @namespace      brandaris-boeking
// @description    Zodra 2013 geboekt kan worden komt er een alert!
// @include        http://www.huizebrandaris.nl/admin/kalender/2010
// ==/UserScript==
function refresh(){
	window.location = 'http://www.huizebrandaris.nl/admin/kalender/2010';
}

if(document.body.innerHTML.match(2013)){
	alert('boeken!');
} else {
	setTimeout(refresh, 30000);
	
}