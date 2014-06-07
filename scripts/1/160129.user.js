// ==UserScript==
// @name           BGF Avatar Size Control
// @description    Resizes avatars on BGF
// @namespace      Nyubis
// @author         Nyubis
// @license        BSD Simplified (http://opensource.org/licenses/BSD-3-Clause)
// @version        1.2
// @include        http://www.bornegames.com/forum/*
// @include        https://www.bornegames.com/forum/*
// ==/UserScript==

var size = 96	//Set the new size here

var avatars = document.getElementsByClassName("avatar");
for (var i=0;i<avatars.length;i++){ 
	a=avatars[i];
	a.style.width=size+"px";
	a.style.height=size+"px";
	a.src=a.src.replace(/s(=|%3D)\d*&/g,"s="+size+"&"); 
}