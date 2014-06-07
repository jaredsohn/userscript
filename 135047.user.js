// ==UserScript==
// @name        White and black lists
// @namespace   http://habrahabr.ru/users/rdr/
// @author      rdr
// @include     http://habrahabr.ru/*
// @version     1
// ==/UserScript==


(function()
{
	// white list has priority
	var whiteList = [ "/company/tm/", "/company/microsoft/" ];
	var blackList = [ "/company/", "/podcasts/", "/hub/wp_dev/" ];

    var postEntries = document.querySelectorAll('div.post');
	
	for (var i = 0; i < postEntries.length; i++)
	{
		var aHubEntries = postEntries[i].querySelectorAll('a.hub');

		for (var j = 0; j < aHubEntries.length; j++)
		{

			// whitelisting
			var isWhite = false;

			for (var wli = 0; wli < whiteList.length; wli++)
			{
				if (aHubEntries[j].href.indexOf(whiteList[wli]) != -1)
				{
					isWhite = true;
					break;
				}
			}


			// blacklisting
			var isBlack = false;

			if (!isWhite)
			{
				for (var bli = 0; bli < blackList.length; bli++)
				{
					if (aHubEntries[j].href.indexOf(blackList[bli]) != -1)
					{
						isBlack = true;
						break;
					}
				}
			}

			// action
			if (isBlack)
			{
				postEntries[i].style.color = "#F00"; // debug
				postEntries[i].style.display = "none";
			}
		}
	}
})();