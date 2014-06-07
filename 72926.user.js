// ==UserScript==
// @name           4F Main
// @namespace      4fuckr
// @description    Main Ignore Filter v0.1
// @include        http://4fuckr.com/*
// ==/UserScript==




(function() 
{

	var allT;
	var plonk = new Array("696","5");

	allT = document.getElementsByTagName('div');

	
	for (var i = 0; i < allT.length; i++)
	{
		for each (var x in plonk) 
		{
			x="user_"+x+".htm";
			if(allT[i].id=="comment-show"&&allT[i].innerHTML.match(x))
			{
		    		allT[i].style.display="none";
	  		}
		}
	}

})

();
