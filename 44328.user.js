// ==UserScript==
// @name           YOSPOS auto bookmark off
// @description    Automatically disables bookmarking of YOSPOS threads you reply to, but not threads you create.
// @include        http://forums.somethingawful.com/newreply.php*
// ==/UserScript==

var b = document.getElementsByTagName('div');
for(bi=0; bi<b.length; bi++)
{
	if(b[bi].getAttribute('class') == 'breadcrumbs')
	{
		var a = b[bi].getElementsByTagName('a');
		for(ai=0; ai<a.length; ai++)
		{
			if(a[ai].getAttribute('href') == 'forumdisplay.php?forumid=219')
			{
				var s = document.getElementsByName('bookmark');
				for(si=0; si<s.length; si++)
				{
					if(s[si].getAttribute('type') == 'checkbox')
						s[si].checked = false;
				}
			}
		}
	}
}