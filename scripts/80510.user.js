// ==UserScript==
// @name           odesk enhance
// @namespace      http://www.odesk.com
// @author         Fedmich
// @match        http://www.odesk.com/jobs/*
// @match        https://www.google.com/adsense/report/overview*
// @include        http://www.odesk.com/jobs/*
// @include        https://www.google.com/adsense/report/overview*

// @description    Removes the warning message if you are navigating to other website from the odesk job pages.
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.pack.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	$('a[href^=http://www.odesk.com/leaving_odesk.php]')
	.each(function(){
		this.href = this.href.replace('http://www.odesk.com/leaving_odesk.php?ref=','')
				.replace('http%3A','http:').replace(/%2F/g,'/').replace('%23','');
		this.target='_blank';
	});
	
}

