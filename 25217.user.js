// ==UserScript==
// @name		Fan Club
// @author		trojan:abujug
// @description		puts ur community link in ur homepage..edit script source with ur community
// @include	 	http://www.orkut.com/*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Community.aspx?cmm=48941985'>Fan Club</a>&nbsp;|&nbsp;</li>";