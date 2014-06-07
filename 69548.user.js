
// Prevent Pandora Timeout
// version 1.0
// 2009-11-06
//
// ==UserScript==

// @name	Prevent Pandora Timeout
// @author	phithenumber@gmail.com
// @namespace	http://pandora.com

// @description	Refreshes Pandora every 59 minutes to prevent it from timing out at 1 hr
// @include	http://www.pandora.com/
// @include	http*://*.pandora.com/*
// @include	http://pandora.com/*

// ==/UserScript==



function timedRefresh(timeoutPeriod) 
{
setTimeout("location.reload(true);",timeoutPeriod);
 }



JavaScript:timedRefresh(3540000) // This is set to 59 minutes in milliseconds


// ==UserScript==
//
// @name        Pandora
// @namespace   http://fluidapp.com
// @description Pandora Growl notifications and condensed design
// @include     *
// @author      Dallas Brown http://www.kdbdallas
//
// ==/UserScript==

(function ()
{
	if (window.fluid)
	{
		function stylePage()
		{
			document.getElementById("promotional_gallery").style.display = "false !important";
			document.getElementById("promotional_ticker_container").style.display = "false !important";
			document.getElementById("advertisement").style.display = "false !important";
			document.getElementById("radio").style.height = "true !important";
			document.getElementById("footer").style.display = "false !important";
		}

		function songPlayed(args)
		{
			window.fluid.showGrowlNotification({
				title: "Now Playing", 
				description: args.songName + "\nby " + args.artistName, 
				sticky: false,
				identifier: "Pandora",
				icon: args.artURL
			});
		}

		setTimeout(stylePage, 3000);

		Pandora.setEventHandler("SongPlayed", songPlayed);
    }
})();