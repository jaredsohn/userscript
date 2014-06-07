// ==UserScript==
// @name		Community link in Orkut Pages
// @author		trojan:abujug
// @description		Puts a link of my community CTF in all orkut pages
// @include	 	http://www.orkut.*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Main#Community.aspx?cmm=51684674'>CTF</a></li>";

	