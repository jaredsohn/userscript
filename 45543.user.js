// ==UserScript==
// @name		ajit's profile link in Orkut Pages
// @author		ajit
// @description		puts a  link of ajit's profile in your orkut pages.
// @include	 	http://www.orkut.*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Main#Profile.aspx?uid=4330508333450072946'>ajit</a></li>";