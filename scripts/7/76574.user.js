// ==UserScript==
// @name           amung us cleaner
// @author         Fedmich
// @include        http://whos.amung.us/stats/*
// @description    Removes excess/annoying stuffs on amung.us website. Removes the reminder items to go PRO.
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



function rem_elem(eid){
	var el = document.getElementById(eid);
	if(el){
		el.parentNode.removeChild(el);
	}
}
rem_elem('prohook');
rem_elem('leaderboard');
rem_elem('signupwrapper');
rem_elem('linkhook');
 
function letsJQuery() {
	$('.addthis_toolbox').remove();
	$('#tracer-info').remove();
	$('a[href="/pro/"]').remove();
	$('.fl.hooktxt').remove();
	$('.mediumfont.indent.bold').remove();
	$('.tar.mediumfont.bold').remove();
}
