// ==UserScript==
// @name		ravi's profile link in Orkut Pages
// @author		ravi
// @description		puts a  link of rahul's profile in your orkut pages.
// @include	 	http://www.orkut.*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Main#Profile.aspx?uid=1398105689910302560'>ravi</a></li>";

	