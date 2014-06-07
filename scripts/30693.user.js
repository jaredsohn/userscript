// ==UserScript==

// @name           BetterTabs

// @namespace      tabs@kwierso.com

// @description    Redoes the tabs in the RT header for great justice.

// @include        http://*.roosterteeth.com/*

// @exclude        http://delta.roosterteeth.com/*

// ==/UserScript==



(function()

{

	//define what you want each tab to do and look like.

	//mind you, space is limited, don't break the page!



	//RT

		var RTText = "Rooster Teeth";

		var RTLink = "";



	//RvB

		var RvBText = "Red vs. Blue";

		var RvBLink = "";



	//SH

		var SHText = "The Strangerhood";

		var SHLink = "";



	//PANICS

		var PanicsText = "PANICS";

		var PanicsLink = "";



	//Magic

		var MagicText = "1-800-Magic";

		var MagicLink = "";



	//AH

		var AHText = "Achievement Hunter";

		var AHLink = "";



	//Delta

		var DeltaText = "Delta";

		var DeltaLink = "";



	//Grifball

		var GBText = "Grifball";

		var GBLink = "";



	//Store

		var StoreText = "The Store";

		var StoreLink = "";





	//DON'T MESS WITH ANYTHING BELOW THIS LINE!



	var tabholder = document.getElementById("tab");

	var anchors = tabholder.getElementsByTagName("a");

	var holders = [[],[]];


	holders[[0,0]] = document.URL.replace(/(delta|www|rvb|sh|panics|magic)\.roosterteeth\.com/, "www.roosterteeth.com");
	holders[[0,1]] = "Rooster Teeth";

	holders[[1,0]] = document.URL.replace(/(delta|www|rvb|sh|panics|magic)\.roosterteeth\.com/, "rvb.roosterteeth.com");
	holders[[1,1]] = "Red vs. Blue";

	holders[[2,0]] = document.URL.replace(/(delta|www|rvb|sh|panics|magic)\.roosterteeth\.com/, "sh.roosterteeth.com");
	holders[[2,1]] = "The Strangerhood";

	holders[[3,0]] = document.URL.replace(/(delta|www|rvb|sh|panics|magic)\.roosterteeth\.com/, "panics.roosterteeth.com");
	holders[[3,1]] = "PANICS";

	holders[[4,0]] = document.URL.replace(/(delta|www|rvb|sh|panics|magic)\.roosterteeth\.com/, "magic.roosterteeth.com");
	holders[[4,1]] = "1-800-Magic";

	holders[[5,0]] = "http://ah.roosterteeth.com";
	holders[[5,1]] = "Achievement Hunter";

	holders[[6,0]] = document.URL.replace(/(delta|www|rvb|sh|panics|magic)\.roosterteeth\.com/, "delta.roosterteeth.com");
	holders[[6,1]] = "Delta";

	holders[[7,0]] = "http://www.grifball.com";
	holders[[7,1]] = "Grifball";

	holders[[8,0]] = "http://www.roosterteethstore.com";
	holders[[8,1]] = "The Store";


	for(i = 0; i<anchors.length; i++)

	{

		//alert(anchors[i].innerHTML);

		if(i == 0)

		{

			if(RTLink != "")

			anchors[i].href = RTLink;
			else 
			{	//alert(holders[[0,1]]);
				if(RTText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(RTText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(RTText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(RTText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(RTText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(RTText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(RTText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(RTText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(RTText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}

				
			}

			anchors[i].innerHTML = RTText;

		}

		if(i == 1)

		{

			if(RvBLink != "")

			anchors[i].href = RvBLink;
			else 
			{	if(RvBText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(RvBText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(RvBText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(RvBText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(RvBText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(RvBText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(RvBText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(RvBText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(RvBText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}
				
			}

			anchors[i].innerHTML = RvBText;

		}

		if(i == 2)

		{

			if(SHLink != "")

			anchors[i].href = SHLink;
			else 
			{	if(SHText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(SHText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(SHText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(SHText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(SHText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(SHText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(SHText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(SHText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(SHText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}
				
			}

			anchors[i].innerHTML = SHText;

		}

		if(i == 3)

		{

			if(PanicsLink != "")

			anchors[i].href = PanicsLink;
			else 
			{	if(PanicsText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(PanicsText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(PanicsText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(PanicsText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(PanicsText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(PanicsText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(PanicsText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(PanicsText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(PanicsText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}
				
			}

			anchors[i].innerHTML = PanicsText;

		}

		if(i == 4)

		{

			if(MagicLink != "")

			anchors[i].href = MagicLink;
			else 
			{	if(MagicText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(MagicText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(MagicText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(MagicText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(MagicText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(MagicText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(MagicText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(MagicText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(MagicText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}
				
			}

			anchors[i].innerHTML = MagicText;

		}

		if(i == 5)

		{

			if(AHLink != "")

			anchors[i].href = AHLink;
			else 
			{	if(AHText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(AHText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(AHText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(AHText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(AHText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(AHText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(AHText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(AHText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(AHText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}
				
			}

			anchors[i].innerHTML = AHText;

		}

		if(i == 6)

		{

			if(DeltaLink != "")

			anchors[i].href = DeltaLink;
			else 
			{	if(DeltaText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(DeltaText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(DeltaText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(DeltaText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(DeltaText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(DeltaText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(DeltaText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(DeltaText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(DeltaText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}
				
			}

			anchors[i].innerHTML = DeltaText;

		}

		if(i == 7)

		{

			if(GBLink != "")

			anchors[i].href = GBLink;
			else 
			{	if(GBText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(GBText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(GBText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(GBText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(GBText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(GBText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(GBText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(GBText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(GBText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}
				
			}

			anchors[i].innerHTML = GBText;

		}

		if(i == 8)

		{

			if(StoreLink != "")

			anchors[i].href = StoreLink;
			else 
			{	if(StoreText == holders[[0,1]])
				{
					anchors[i].href = holders[[0,0]];
				
				}
				if(StoreText == holders[[1,1]])
				{
					anchors[i].href = holders[[1,0]];
				
				}
				if(StoreText == holders[[2,1]])
				{
					anchors[i].href = holders[[2,0]];
				
				}
				if(StoreText == holders[[3,1]])
				{
					anchors[i].href = holders[[3,0]];
				
				}
				if(StoreText == holders[[4,1]])
				{
					anchors[i].href = holders[[4,0]];
				
				}
				if(StoreText == holders[[5,1]])
				{
					anchors[i].href = holders[[5,0]];
				
				}
				if(StoreText == holders[[6,1]])
				{
					anchors[i].href = holders[[6,0]];
				
				}
				if(StoreText == holders[[7,1]])
				{
					anchors[i].href = holders[[7,0]];
				
				}
				if(StoreText == holders[[8,1]])
				{
					anchors[i].href = holders[[8,0]];
				
				}
				
			}

			anchors[i].innerHTML = StoreText;

		}



	}



	

})();