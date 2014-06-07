// ==UserScript==
// @name		Take A Look To Mr.Different Hidden Page's On Orkut
// @author		Mr.Different !
// @description		:)This Script Show's The Hidden Page's Of Mr.Different On Orkut. It is just placed before to CHANGE THEME Link. Njoy Surfing !
// @include	 	http://www.orkut.co*
// ==/UserScript==

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Main#Profile.aspx?uid=7421394215558022547'>Mr.Different</a></li>";