// ==UserScript==
// @name           fukken-sage
// @namespace      http://userscripts.org/users/133663
// @description    Sage as a default? Not for me, thanks.
// @include        http://*.easymodo.net/cgi-board.pl/*/thread/*
// ==/UserScript==

with(unsafeWindow) {
	window.onload=null;
	arr=location.href.split(/#/);
	if(arr[1]) 
		replyhighlight(arr[1]);
	
	if(document.forms.postform && document.forms.postform.NAMAE)
		document.forms.postform.NAMAE.value=get_cookie("name");
	
	if(document.forms.postform && document.forms.postform.MERU) {
		if(get_cookie("email")) {
			document.forms.postform.MERU.value=get_cookie("email");
		} else {
			document.forms.postform.MERU.value=null;
		}
	}

	if(document.forms.postform && document.forms.postform.delpass)
		document.forms.postform.delpass.value=get_cookie("delpass");
}