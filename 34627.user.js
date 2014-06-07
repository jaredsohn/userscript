// ==UserScript==
// @name		Anudeep's profile link in Orkut Pages
// @author		Anudeep
// @description		puts a  link of Anudeep's profile in your orkut pages.
// @include	 	http://www.orkut.*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Main#Profile.aspx?uid=4558630657389872855'>Anudeep</a></li>";

	