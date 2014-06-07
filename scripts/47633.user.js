// ==UserScript==
// @name	The Age - Single Page Articles - 2009
// @description	Rewrites links on theage.com.au to ask for single page format.   
// @include	*theage.com.au*
// ==/UserScript==

// This is a modification of Kym Thomas’s excellent SMH single page script. 
// Available here:  http://userscripts.org/scripts/show/43054 ****/


var aNodes = document.getElementsByTagName('a');
for (var i = 0; i < aNodes.length; i++)
{
	if (aNodes[i].href.indexOf('www.theage.com.au') > 0)
	{
		if ((aNodes[i].href.indexOf('?page=-1') < 0) && (aNodes[i].href.indexOf('emailToFriend') < 0) && (aNodes[i].href.indexOf('printArticle') < 0))
		{
			aNodes[i].href = aNodes[i].href + '?page=-1';
		}
	}
		
		    
}









