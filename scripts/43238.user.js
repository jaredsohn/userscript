// ==UserScript==
// @name          Yahoo Sports - Ignore Dumb Content
// @description   Remove links to content written by idiot hacks on Yahoo Sports
// @include       http://sports.yahoo.com/*
// @exclude       
// @version       1.0
// @date          2009-02-27
// @creator       Deez
// @credits       Partial credit to these similar scripts which inspired this one (http://mybroadband.co.za/vb/showthread.php?t=23573 and http://userscripts.org/scripts/show/24465)
// ==/UserScript==

(function() 
{

	//hide document while modifying
	//document.documentElement.style.display='none';
	document.documentElement.style.visibility="hidden";
	
	
	allLI = document.getElementsByTagName('li');
	
	// Loop to remove all links by dumbasses
	for (var i = 0; i < allLI.length; i++)
	{
		if( allLI[i].innerHTML.match(/Dwyer/) )
		{
			if(!allLI[i].innerHTML.match(/<li/) )
			{
				allLI[i].parentNode.style.display="none";
			}
		}
	}
	//done modifying, show document
	//document.documentElement.style.display='';
	document.documentElement.style.visibility="visible";

})();

