// ==UserScript==
// @name		community in home page by Alexander 
// @author		trojan:abujug
// @description		puts the community link in ur homepage..
// @include	 	http://www.orkut.com/*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/CommTopics.aspx?cmm=13739628'>Extreme Orkut</a>&nbsp;|&nbsp;</li>";

	


//Alexander