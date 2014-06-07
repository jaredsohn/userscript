// ==UserScript==
// @name           Mustachify
// @namespace      Moose Hole
// @description    Put mustaches on images except gifs because they break if animated
// @include        *
// ==/UserScript==

var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++)
{
	var src = imgs[i].src;
	if(!(/\.gif/i.test(src)))
	{
		imgs[i].src = 'http://mustachify.me/?src=' + src;
	}
}