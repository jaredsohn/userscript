// ==UserScript==
// @name           Whirlpool OP Highlight
// @namespace      http://userscripts.org/users/74605
// @description    Highlight replies by the original poster.
// @include        http://forums.whirlpool.net.au/forum-replies.cfm?t=*
// ==/UserScript==

highlightReplies(getElementsByClass(document.getElementById('replies'), 'op'));

function highlightReplies(els)
{
	if (els)
	{
		for (var i = 0; i < els.length; i++)
		{
			var el = els[i];
			for (var j = 0; j < el.childNodes.length; j++)
				if (el.childNodes[j].tagName == 'TD')
					if ((el.childNodes[j].className == 'bodyuser') || (el.childNodes[j].className == 'bodypost'))
						el.childNodes[j].className = el.childNodes[j].className + '_u';
		}
	}
}

function getElementsByClass(el, className)
{
	var els;
	for (var i = 0; i < el.childNodes.length; i++)
	{
		var child = el.childNodes[i];
		if (child.className == className)
		{
			if (!els) els = [];
			els.push(child.parentNode.parentNode);
		}
		
		var cels = getElementsByClass(child, className);
		if (cels)
		{
			if (!els) els = [];
			for (var j = 0; j < cels.length; j++)
				els.push(cels[j]);
		}
	}
	return els;
}