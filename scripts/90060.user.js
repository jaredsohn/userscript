// ==UserScript==
// @name           TF2Wiki.net links converter
// @namespace      http://userscripts.org/users/WindPower
// @description    Converts tf2wiki.net links to wiki.teamfortress.com
// @include        *
// ==/UserScript==

(function () 
{
	var allLinks = document.getElementsByTagName('a');
	var r = /^https?:\/\/(?:[^\/.]+\.)*tf2wiki\.net\/(wiki\/([\s\S]*))?/i;
	for (var i = 0; i < allLinks.length; i++) 
	{
		var curLink = allLinks[i];
		var result = r.exec(curLink.href);
		if (result)
		{
			var newLink = curLink.cloneNode(true);
			if(!result[1])
			{
				newLink.href = 'http://wiki.teamfortress.com/';
			}
			else
			{
				newLink.href = 'http://wiki.teamfortress.com/wiki/' + result[2];
			}
			curLink.parentNode.insertBefore(newLink, curLink);
			curLink.parentNode.removeChild(curLink);
		}
	}
})();