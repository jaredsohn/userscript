// ==UserScript==
// @name           Whirlpool Show Spoilers
// @namespace      http://userscripts.org/users/74605
// @description    Remove spoiler hiding.
// @include        http://chibi-cyber.com/thread*
// ==/UserScript==

showSpoilers(getElementsByClass(document.getElementById('replies'), 'wcspoil'));

function showSpoilers(els)
{
	if (els)
	{
		for (var i = 0; i < els.length; i++)
		{
			var el = els[i];
			el.className = '';
			el.style.color = '#666666';
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
			els.push(child);
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