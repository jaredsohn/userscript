// ==UserScript==
// @name           Google anti cyclone victims
// @namespace      http://www.trancenotes.com/
// @description    removes the cyclone victims thing from out beloved google, for those who could give a dam.
// @include        *google.com/
// @include        *google.com.*/
// @include        *google.com/webhp
// ==/UserScript==
	var nav = document.getElementsByTagName("FONT");
	var navx;
	
	var i=0;
	for (i=0;i<nav.length;i++)
	{
		//alert(nav[i].innerHTML.indexOf("Support victims"));
		if(nav[i].innerHTML.indexOf("Support victims") != -1){
			navx=nav[i];
		}
	}
	
	navx.parentNode.removeChild(navx);