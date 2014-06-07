// ==UserScript==
// @name		cool community 4 u
// @author		jeeshan
// @description		Puts a link of my community cool person in all orkut pages
// @include	 	http://www.orkut.*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Community.aspx?cmm=48636221'>cool person</a></li>";
