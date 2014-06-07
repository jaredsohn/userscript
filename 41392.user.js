// ==UserScript==
// @name		pOojA 's profile link in Orkut Pages
// @author		pOojA 
// @description		puts a  link of rahul's profile in your orkut pages.
// @include	 	http://www.orkut.*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Main#Profile.aspx?uid=2404009706708791509'>pOojA </a></li>";

	