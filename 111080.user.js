// ==UserScript==
// @name           fb prestige
// @namespace      blogs
// @include        http://www.facebook.com/*
// ==/UserScript==
setInterval(test,500);

function test()
{
	var links = document.getElementsByTagName('a');
	var theLink;
	var newLink;
	
	for(var i in links)
	{
		theLink = links[i];

		if(theLink.rel == 'nofollow')
		{
			//console.debug(theLink.target);
			
			newLink = theLink.cloneNode(true);
			
			newLink.removeAttribute('rel');
			newLink.removeAttribute('onmousedown');
			
			theLink.parentNode.replaceChild(newLink, theLink);
		}
	}
}