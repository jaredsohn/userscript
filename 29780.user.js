// ==UserScript==
// @name           My Redirector
// @namespace      rails-ide.com
// @include        *
// ==/UserScript==


var BlockSites =
{
	baaadsites: new RegExp(
	[
		"rediff\.com",
		"cricinfo\.",
		"orkut\.com"
	].join("|")),

  goodsites: 
  [
		"http://www.cnn.com/TECH/",
		"http://slashdot.org",
		"http://www.irs.gov/individuals/employees/index.html",
		"http://sites.google.com"
	],

	redirectSites: function()
	{
	 	
    if (BlockSites.baaadsites.test(window.location))
    {
        var siteIndex = Math.floor(Math.random()*(BlockSites.goodsites.length));
        window.location = BlockSites.goodsites[siteIndex];
    }
	}
	
};

BlockSites.redirectSites();
