// ==UserScript==
// @name	GaiaOnline Link Fixer
// @namespace   http://www.techspeak.2ya.com/
// @description Searches for links on GaiaOnline, and fixes them to remove the warning frame.
// @include	*gaiaonline.com*
// ==/UserScript==
(function () 
{
	var allLinks = document.getElementsByTagName('a')
	for (var i = 0; i < allLinks.length; i++) 
	{
		var curLink = allLinks[i];
		if (curLink.href.substr(0,43) == "http://www.gaiaonline.com/gaia/redirect.php")
		{
			var extr = curLink.href.substr(46);
			var correct = unescape(extr);
			curLink.href = correct;
		}
	}
})();