// ==UserScript==
// @name        Pandora
// @namespace   http://fluidapp.com
// @description Pandora Growl notifications and condensed design
// @include     *
// @author      Dallas Brown http://www.kdbdallas
// ==/UserScript==

(function ()
{
	if (window.fluid)
	{
		function stylePage()
		{
			document.getElementById("promotional_gallery").style.display = "none !important";
			document.getElementById("promotional_ticker_container").style.display = "none !important";
			document.getElementById("advertisement").style.display = "none !important";
			document.getElementById("radio").style.height = "330px !important";
			document.getElementById("footer").style.display = "none !important";
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