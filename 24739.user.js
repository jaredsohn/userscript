// ==UserScript==
// @name           Post IDs
// @namespace      xbean.gotdns.com
// @description    Puts post IDs next to quote button in topics and link to topic in post-mode search.
// @include        http://www.artofproblemsolving.com/Forum/viewtopic.php*
// @include        http://www.artofproblemsolving.com/Forum/search.php
// ==/UserScript==

var anchors = document.getElementsByTagName("A");

for (i = 0; i < anchors.length; i++)
{
	if (anchors[i])
	{
		var anchor = anchors[i];
		if (anchor.getAttribute("href") && !anchor.innerHTML.match(/^#([1-9][0-9]*)$/))
		{
			var result = anchor.getAttribute("href").match(/^viewtopic\.php\?p=([1-9][0-9]*)(\&search_id=[1-9][0-9]*)?\#[1-9][0-9]*/);
			if (result)
			{
				var newNode = document.createTextNode(" (" + result[1] + ") ");
				anchor.parentNode.insertBefore(newNode, anchors[i]);
			}
			
		}
	}
}