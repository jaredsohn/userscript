// ==UserScript==
// @name           Force vk.com
// @namespace      http://userscripts.org/
// @description    forces vkontakte.ru links/imgs to vk.com 
// @include        *
// @author         FelikZ ( http://thefelikz.blogspot.com/ )
// @version        1.0
// @copyright      2011
// ==/UserScript==
(function() 
{
	var ar = document.getElementsByTagName('a');
	var href = '';
	for(var i=0; i<ar.length; i++)
	{
		href = String(ar[i].getAttribute('href'));
        ar[i].setAttribute('href', href.replace(/vkontakte.ru/i, 'vk.com'));
	}
        ar = document.getElementsByTagName('img');
        for(var i=0; i<ar.length; i++)
	{
		href = String(ar[i].getAttribute('src'));
        ar[i].setAttribute('src', href.replace(/vkontakte.ru/i, 'vk.com'));
	}
})();