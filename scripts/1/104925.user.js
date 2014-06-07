// ==UserScript==
// @name           Fixed Facebook Menu Bar
// @description    Makes the Facebook Menu Bar position:fixed for usability's sake
// @version        1.0.1
// @homepage       http://userscripts.org/users/83500/scripts
// @include        http://www.facebook.*
// @include        http://facebook.*
// ==/UserScript==
// only do that when the user is connected, since its not necessary otherwise
if(document.getElementById("blueBar").className!='loggedOut'){
	// fix the blue bar
	document.getElementById("blueBar").style.position='fixed';
	document.getElementById("blueBar").style.zIndex='999';
	// fix jewels & stuff
	document.getElementById("pageHead").style.position='fixed';
	document.getElementById("pageHead").style.top='0px';
	document.getElementById("pageHead").style.width=document.getElementById("content").offsetWidth+'px';
	document.getElementById("pageHead").style.zIndex='999';
	// add the menu bars height to contents padding
	document.getElementById("content").style.paddingTop='41px';
}