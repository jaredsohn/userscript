// ==UserScript==
// @name           yospos background image
// @include        http://forums.somethingawful.com/forumdisplay.php?forumid=219
// @include        http://forums.somethingawful.com/showthread.php?*
// ==/UserScript==

var yosp = false;

if(document.location.href.indexOf('forumid=219') != -1)
	yosp = true;
else
{
	var b = document.getElementsByTagName('div');
	for(bi=0; bi<b.length; bi++)
	{
		if(b[bi].getAttribute('class') == 'breadcrumbs')
		{
			var a = b[bi].getElementsByTagName('a');
			for(ai=0; ai<a.length; ai++)
			{
				if(a[ai].getAttribute('href') == 'forumdisplay.php?forumid=219')
					yosp = true;
			}
		}
	}
}

if(yosp)
	document.body.style.background = 'url(\'http://img.waffleimages.com/ee6428ebd7f9d888ed30dbf18694df327b5a3687/bill-cosby.jpg\')';