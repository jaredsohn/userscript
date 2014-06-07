// ==UserScript==
// @name	Motherless random hotkey
// @namespace	http://userscripts.org/users/190735
// @author		LML
// @include	http://motherless.com/*
// @version	2010-07-10
// ==/UserScript==

document.addEventListener('keyup',function(e) {
if(e.keyCode == '36')
{
this.location.href="http://motherless.com/random/image";
}
},false)