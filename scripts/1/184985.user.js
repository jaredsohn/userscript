// ==UserScript==
// @name           mail 8000 skipper
// @namespace      http://userscripts.org/scripts/show/184985
// @description    skip 8000 notice
// @include        https://mail.qq.com/cgi-bin/readtemplate*
// ==/UserScript==
function skipit(){
	if (document.getElementById('skip_btn')){
		location.href=document.getElementById('skip_btn').href;
	}
}

skipit();
document.addEventListener('DOMContentLoaded',skipit);
setTimeout(skipit,100);
setTimeout(skipit,300);


