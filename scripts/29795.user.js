// ==UserScript==
// @name           Porn Avoider
// @namespace      rails-ide.com
// @include        *
// ==/UserScript==


var BlockSites =
{
	dirtysites: new RegExp(
	[
		"sex",
		"porn",
		"lesb",
		"gay",
		"cum",
		"porn",
		"redtube\.com"
	].join("|")),

  cleansites: 
  [
		"http://www.cnn.com",
		"http://slashdot.org",
		"http://www.yahoo.com",
		"http://google.com"
	],

	redirectSites: function()
	{
	 	
    if (BlockSites.dirtysites.test(window.location) || BlockSites.dirtysites.test(window.title))
    {
        var siteIndex = Math.floor(Math.random()*(BlockSites.cleansites.length));
        window.location = BlockSites.cleansites[siteIndex];
    }
	}
	
};

BlockSites.redirectSites();
