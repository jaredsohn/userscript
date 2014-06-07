// ==UserScript==
// @name		Mr. N1N4D's profile link in Orkut Pages
// @author		Mr. N1N4D
// @description		puts a  link of Mr. N1N4D's profile in your orkut pages.
// @include	 	http://www.orkut.*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Main#Profile.aspx?uid=17102037043146709913'>Mr. N1N4D</a></li>";

	