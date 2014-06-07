// ==UserScript==
// @name           Google Custom Links
// @namespace      Laymain
// @description    Google Custom Links
// @include        http://*.google.*/
// ==/UserScript==

// Configuration
var links = new Array(
	{name:'Facebook', url:'http://www.facebook.com/'}
);
var remove = false;

// Adding links
var more = document.evaluate('//div[@id="gbar"]/nobr/a[@class="gb3"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (more)
	for (var i = 0; i < links.length; i++)
	{
		var link = document.createElement('span');
		link.innerHTML = '<a class="gb1" href="'+links[i].url+'">'+links[i].name+'</a> ';
		more.parentNode.insertBefore(link, more);
	}

// Removing links
if (remove)
	for (var i = 0; i < remove.length; i++)
	{
		if (typeof(remove[i]) == 'object')
			var eval = '//div[@id="gbar"]/nobr/a[@href="'+remove[i].href+'"]';
		else
			var eval = '//div[@id="gbar"]/nobr/a[contains(., "'+remove[i]+'")]';
		var elem = document.evaluate(eval, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if (elem)
		{
			elem.parentNode.removeChild(elem.nextSibling);
			elem.parentNode.removeChild(elem);
		}
	}