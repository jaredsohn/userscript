// ==UserScript==
// @name           Change dA User Symbols
// @namespace      deviantart.com
// @include        http://*.deviantart.com*
// @description    Removes symbols from deviantART Usernames
// ==/UserScript==

window.addEventListener("load", function(e) 
{
	//get all of our <a> tags
	var urlArray = document.getElementsByTagName("a");
	
	//go through them one by one
	for (var i=0; i<urlArray.length; i++)
	{
		//matches if the class name is "u" which indicates it's a hyperlink to a userpage
		if (urlArray[i].className == "u")
		{
			//make sure this isn't linking to a group!
			var userSymbol = urlArray[i].parentNode.innerHTML.charAt(urlArray[i].parentNode.innerHTML.search(/.{1}<a class/));
			if (userSymbol != "#" && userSymbol!= "!")
			{
				//You can insert any symbol before "~<a class" - Try "!<a class" to make everyone appear banned =P
				urlArray[i].parentNode.innerHTML=urlArray[i].parentNode.innerHTML.replace(/.{1}<a class/, "<abbr title='" + userSymbol + "'>~</abbr><a class");
			}
		}
	}
}, false);