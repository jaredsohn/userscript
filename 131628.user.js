// ==UserScript==
// @name           Lolyat forum image resizer
// @namespace      http://forum.lowyat.net
// @description    Scale down large images in posts on Lowyat forum board. Made by /k/upitard for /k/upitard
// @version        1.2
// @updateURL      https://userscripts.org/scripts/source/131628.meta.js
// @downloadURL    https://userscripts.org/scripts/source/131628.user.js
// @include        http://forum.lowyat.net/topic/*
// @include        https://forum.lowyat.net/topic/*
// @include        http://forum.lowyat.net/index.php?showtopic=*
// @include        https://forum.lowyat.net/index.php?showtopic=*
// @grant          none
// ==/UserScript==

var maxwidth=screen.width*0.65;
function scaledownimg()
{
	var c_postbox = document.querySelectorAll("td.post1, td.post2");
	for (i=0; i<c_postbox.length; i++)
	{
		var t_img = c_postbox[i].getElementsByTagName('img');
		for (n=0; n<t_img.length; n++)
		{
			if (t_img[n].width > maxwidth)
			{
				var imgres = t_img[n].width + 'px × ' + t_img[n].height + 'px';

				t_img[n].width = maxwidth;
				t_img[n].title = 'This image has been scaled down (orig size is ' + imgres + ')';
			}
		}
	}
}

document.body.addEventListener("load", scaledownimg, true);

