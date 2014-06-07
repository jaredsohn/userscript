// ==UserScript==
// @name           GitHub Compare View Linker
// @namespace      github_compare_view_linker
// @description    Creates links to compare commits with master
// @include        http://github.com/*/*/commit/*
// @include        http://github.com/*/*/commits*
// @include        https://github.com/*/*/commit/*
// @include        https://github.com/*/*/commits*
// ==/UserScript==

function _do()
{
	var a = document.getElementsByTagName("title")[0].innerHTML;

	var aa = a.match(/^Commit ([a-z0-9]{32})/); // aa[1] is commit hash
	if(!aa)
	{
		// WE'RE ON COMMIT LISTING
		if(!a.match(/^Commit History for /))
			return; // Something gone very wrong

		var b = document.getElementsByTagName("div");
		for(var B in b)
		{
			if(b[B].className == "envelope commit")
			{
				// this is commit!
				var p = b[B].getElementsByTagName("pre")[0].firstChild; // this is commit msg
				var revision_text = "";
				var bb = p.innerHTML.match(/^\[(\d+)\]/); // if bb then bb[1] is commit revision
				if(bb)
					revision_text = bb[1];
				else
					revision_text = p.href.match(/([a-z0-9]{32})/)[1];

				var l = b[B].getElementsByTagName("div");
				for(var L in l)
				{
					if(l[L].className == "machine")
					{
						l[L].innerHTML = l[L].innerHTML + '<br /><a href="../compare/' + revision_text + '...master">Compare to master</a>';
						break;
					}
				}
			}
		}
	}
	else
	{
		// WE'RE ON COMMIT PAGE
		var b = document.getElementsByTagName("pre")[0].innerHTML; // this is commit msg
		var revision_text = "";
		var bb = b.match(/^\[(\d+)\]/); // if bb then bb[1] is commit revision
		if(bb)
			revision_text = bb[1];
		else
			revision_text = aa[1];

		var c = document.getElementsByTagName("div");
		var t; // this is div with commit ----, tree ----, parent ----
		for(var C in c)
		{
			if(c[C].className == "machine")
			{
				t = c[C];
				break;
			}
		}
        t.innerHTML = t.innerHTML + '<br /><a href="../compare/' + revision_text + '...master">Compare to master</a>';
	}
}
_do();
