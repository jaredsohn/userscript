// ==UserScript==

// @name           Filestube.com Cleanup
// @namespace      www.traviantrucchi.org
// @author         Dark Simon
// @description    Remove Ads from Filestube.com
// @version        1.00
// @include        http://www.filestube.com/*
// @include        http://filestube.com/*
// @exclude	   http://www.filestube.com/*/go.html

// ==/UserScript==


	var allHTMLTags = new Array();

/* Delete Adv with class */

	function noDisplayClass(theClass)
	{
		var allHTMLTags = document.getElementsByTagName("*");

		for (i=0; i<allHTMLTags.length; i++)
		{
			//Get all tags with the specified class name.
			if (allHTMLTags[i].className == theClass)
				allHTMLTags[i].style.display = 'none';
	    	}
	}

	noDisplayClass('n_right_detail');
	noDisplayClass('resultadv2');
	noDisplayClass('nova');
	noDisplayClass('other_adv2');
	noDisplayClass('file_details_title');


/* Delete Adv with id */

	function noDisplayId(theId)
	{
		var ads = document.getElementById(theId);
   		if (ads && ads.style.display != 'none')
   			 ads.style.display = 'none';  
	}
	
	noDisplayId('recent');


/* Delete Adv in iframe */


iframes = document.getElementsByTagName("iframe");

for(i = 0 ; i < iframes.length; i++)
{ 
   iframe = iframes[i];
   iframe.parentNode.removeChild(iframe);
}
