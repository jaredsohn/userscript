// ==UserScript==
// @name        YTFeatherBlueRemover
// @namespace   http://www.youtube.com/
// @description Like the YouTube Feather beta? Don't like the useless blue box on the right side? This will remove it.
// @include     http://*.youtube.com/watch*
// @include     https://*.youtube.com/watch*
// @grant       none
// ==/UserScript==

var divs = document.getElementsByTagName('div');
for (i=0; i<divs.length; i++)
{
	var thisid = divs[i].id;
	if (thisid == 'oo' || thisid == 'cm')
	{
		divs[i].style.visibility = 'hidden';
	}
}