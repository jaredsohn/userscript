// ==UserScript==
// @name		Diwali Orkut
// @author		Mr.Nobody.. idea by Prashant
// @description		Its diwali skin for Orkut
// @include	 	http://www.orkut.com/*
// ==/UserScript==

        


        document.getElementsByTagName('head')[0].innerHTML=document.getElementsByTagName('head')[0].innerHTML.replace(/http\:\/\/img4\.orkut\.com\/castroskin002\.css/, 'http://img4.orkut.com/skin/S33/diwali001.css');


	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/CommTopics.aspx?cmm=19754710'>EOW</a>&nbsp;|&nbsp;</li>";

	
	
