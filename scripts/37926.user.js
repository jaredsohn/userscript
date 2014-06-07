// ==UserScript==
// @name           yospos auto sig on
// @include        http://forums.somethingawful.com/newthread.php*
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
				var s = document.getElementsByName('signature');
				for(si=0; si<s.length; si++)
				{
					if(s[si].getAttribute('type') == 'checkbox')
						s[si].setAttribute('checked',true);
				}
			}
		}
	}
}