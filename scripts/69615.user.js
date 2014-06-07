// ==UserScript==
// @name          4chan-numbers
// @namespace     http://diveintogreasemonkey.org/download/
// @description   disables hiding of post numbers on 4chan
// @include       http://boards.4chan.org/*
// ==/UserScript==

var allHTMLTags=[];
var allHTMLTags=document.getElementsByTagName("*");

for (i=0; i<allHTMLTags.length; i++)
{

	if (allHTMLTags[i].className=='quotejs')
	{

		if (allHTMLTags[i].href.indexOf('javascript') === 0)
		{
			allHTMLTags[i].innerHTML=allHTMLTags[i].href.substr(18,9);
		}
		else
		{
			if (allHTMLTags[i].href.indexOf('http://') === 0)
			{
				if(allHTMLTags[i].href.indexOf('q') == 40)
				{
					allHTMLTags[i].innerHTML=allHTMLTags[i].href.substr(41,9);
				}
					
			}
		}
	}
}