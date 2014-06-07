// ==UserScript==
// @name		Community link in Orkut Pages Oug l33t Group
// @author		-=XxX=-
// @description		puts a community link of your choice in your orkut pages. To put your community link, edit thw script source by replacing the default comm by your community. Enjoy the script :)
// @include	 	http://www.orkut.*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Community.aspx?cmm=41474612'>OUG l33t Group</a>&nbsp;|&nbsp;</li>";

	