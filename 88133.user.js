// ==UserScript==
// @name           WoW Armory AH Links Popup
// @namespace      Aikar
// @description	   Makes Auction House Links on the World Of Warcraft Armory (wowarmory) open in a popup window instead of making you leave the page. Useful for checking out potential gear upgrades.
// @include        http://www.wowarmory.com/search.xml?searchType=items*
// ==/UserScript==


 /*replaceFindAH = setInterval(function(){
 
	 if(typeof Auction != 'undefined')
	 {*/
		unsafeWindow.Auction.findInAH = function(name, load) 
		{
			name = name.replace("'", "\'");
			unsafeWindow.setcookie('armory.ah.search', name, false);

			if (load)
				unsafeWindow.Auction.openPage('search');
			else
				unsafeWindow.open('/auctionhouse/index.xml#search');
		}/*
		clearInterval(replaceFindAH);
	}
}, 500);*/