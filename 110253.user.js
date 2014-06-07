// ==UserScript==
// @name           SouthParkStudios.com Hack
// @namespace      http://www.zobbieisle.com/
// @description    Bypass SouthParkStudios' block on users from other countries
// @include        http://*.southparkstudios.com/*
// @include        http://southparkstudios.com/*
// @include        http://southparkstudios.com/
// @include        http://www.southparkstudios.com/
// @include        http://*.southparkstudios.com/*
// ==/UserScript==

x = document.getElementsByTagName("div");
for(var i in x){
	if(x[i].style.zIndex == "10010"){
		x[i].style.display='none';
	}
}