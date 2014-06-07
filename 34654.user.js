// ==UserScript==
// @name           rapidshare.com
// @namespace      general
// @include        http://rapidshare.com/files/*
// @include        http://*.rapidshare.com/files/*
// ==/UserScript==

// Click Free button, clear timeout, submit final form
var t=document.getElementsByTagName('input'), btnFree;
for(var i=0;i<t.length;i++)
	if(t[i].value.toLowerCase() == 'free user')
		{ btnFree = t[i]; break; }
if(btnFree) {
	var clickEvent = document.createEvent("MouseEvent");
	clickEvent.initEvent("click", false, true);
	btnFree.dispatchEvent(clickEvent);
} else {
	var tmr = setInterval(function(){
		// DOESN'T WORK, the timing is server-side
		//unsafeWindow.c = 0;
		var dlf = document.forms.namedItem('dlf');
		if(dlf) { dlf.submit(); clearInterval(tmr); }
	}, 200);
}

// Remove interface junk
var t = document.getElementsByTagName('p'), downloadlink;
for(var i=0; i<t.length; i++)
	if(t[i].className == 'downloadlink')
		{ downloadlink = t[i]; break; }
var dl = document.getElementById('dl');
if(downloadlink && dl) {
	downloadlink.parentNode.removeChild(downloadlink);
	dl.parentNode.removeChild(dl);
	while(document.body.firstChild)
		document.body.removeChild(document.body.firstChild);
	document.body.appendChild(downloadlink);
	document.body.appendChild(dl);
}

