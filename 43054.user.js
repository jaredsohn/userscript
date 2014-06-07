// ==UserScript==
// @name	SMH Single Page 2009
// @description	Rewrites Sydney Morning Herald links to ask for single page format.  
// @include	*smh.com.au*
// ==/UserScript==


var aNodes = document.getElementsByTagName('a');
for (var i = 0; i < aNodes.length; i++)
{
	if (aNodes[i].href.indexOf('www.smh.com.au') > 0)
	{
		if ((aNodes[i].href.indexOf('?page=-1') < 0) && (aNodes[i].href.indexOf('emailToFriend') < 0) && (aNodes[i].href.indexOf('printArticle') < 0))
		{
			aNodes[i].href = aNodes[i].href + '?page=-1';
		}
	}
		
		    
}









