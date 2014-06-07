// ==UserScript==
// @name           fix talkbacks in Shavuz articles
// @namespace      shmulik.zekar.co.cc/shavuz
// @include        http://www.shavuz.co.il/recruit/*
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @description    fix talkbacks in Shavuz articles on Firefox, also add a "hand cursor" at the titles (which clickable)
// ==/UserScript==

unsafeWindow.ShowHide = function(name){	
	if(document.getElementById(name).style.display=="block"){	document.getElementById(name).style.display="none";}	
	else{	document.getElementById(name).style.display="block";}
}
GM_addStyle("tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tbody span{cursor:pointer;}");