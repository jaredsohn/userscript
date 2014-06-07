// ==UserScript==
// @name        maopeluda auto login
// @namespace   jQueryFTW
// @description Loga automaticamente no maopeluda.com
// @include     http://www.maopeluda.com/site/*
// @exclude     http://www.maopeluda.com/site/ucp.php?mode=logout*
// @version     1
// ==/UserScript==



if(!GM_getValue('p')){
	p = prompt('Enter your password: ');
	GM_setValue('p', p);
} else if(!GM_getValue('u')){
	u = prompt('Enter your username: ');
	GM_setValue('u', u);
} else {
	
	var al = document.getElementsByName('autologin')[0];
	var vo = document.getElementsByName('viewonline')[0];
	
	if (al && !al.checked) {
		al.click();
	}
	
	if (vo && !vo.checked) {
		vo.click();
	}
	
	
	var u = document.getElementsByName("username")[0];
	var e = document.getElementsByClassName('button1')[0];
		
	if (!e && u) {
		u.value = GM_getValue('u');
		document.getElementsByName("password")[0].value = GM_getValue('p');
		document.getElementsByClassName('btnmain')[0].click();
	} else if (e && u) {
		u.value = GM_getValue('u');
		document.getElementsByName("password")[0].value = GM_getValue('p');
		e.click();
	}
	
}
