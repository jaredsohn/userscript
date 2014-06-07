// ==UserScript==
// @name	GaiaOnline Marketplace: Link Fixer
// @description Makes item links in the Gaia marketplace link to lowest buy price of that item.-Credit to WindPower for base script
// @include	*gaiaonline.com/marketplace*
// ==/UserScript==
(function () 
{
	var allLinks = document.getElementsByTagName('a')
	for (var i = 0; i < allLinks.length; i++) 
	{
		var curLink = allLinks[i];
		if (curLink.href.substr(0,48) == "http://www.gaiaonline.com/marketplace/itemdetail")
		{
			var combo = curLink.href + "/20/?sortBy=94&start=0"
			var correct = unescape(combo);
			curLink.href = correct;
		}
                if(curLink.href.substr(0,49) == "http://www.gaiaonline.com/marketplace/vendsearch/")
                {
			var combo = curLink.href + "?sortBy=91"
			var correct = unescape(combo);
			curLink.href = correct;
		}
	}
})();