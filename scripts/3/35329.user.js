// ==UserScript==
// @name           Internet Movie Database
// @description    Internet Movie Database - Ad Be Gone (IMDB.com)
// @include        http://www.imdb.com/*
// ==/UserScript==

GM_addStyle("#skippy {text-decoration: underline; cursor: pointer;}");

if (document.getElementById("header") && document.getElementById("video-player-container"))
{
	if (document.getElementById("header").getElementsByTagName("h1")[0])
	{
		var inserthere = document.getElementById("header").getElementsByTagName("h1")[0];

		inserthere.innerHTML += " &gt;&gt;";
		inserthere.setAttribute("id", "skippy");
		inserthere.setAttribute("title", "Greasemonkey: Internet Movie Database - Ad Be Gone (IMDB.com)");
		
		var pl = top.location.href + "player";
		
		try
		{
			inserthere.addEventListener('click',function(){document.getElementById('video-player-container').src = pl;},false);
		}
		catch(err)
		{
			//alert(err);
		} 
		try
		{
			document.getElementById('video-player-container').src = pl;
		}
		catch(err)
		{
			//alert(err);
		} 
	}
}

