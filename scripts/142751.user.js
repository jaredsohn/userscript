// ==UserScript==
// @name           What.CD - Hide bitrates
// @namespace      one800higgins
// @description    Lets you hide certain bitrates/formats you don't want to DL
// @include        http://what.cd/*
// @include		   https://what.cd/*
// ==/UserScript==

(function()
{
	// /CD|Vinyl|MP3|192|APS|V2|V1|256|APX|V0|320|AAC|Ogg|FLAC|ALAC|APE|WavPack|AC3|DTS/;

	var hideBitrates 		= /APE|Ogg/; 		// Hide whatever you want from the above list, separated by |s, in between /s.	
	var preferredBitrates 	= /FLAC/;	// Highlight whatever you want from the above list, separated by |s, in between /s.
	var highlightPreferred	= true;			// Toggle highlighting (true or false)
	var highlightColor		= '#AEBA96';	// Moldy green 

	// Ignore below..
	var classes = ["group_torrent","torrent"];

	for (var i = 0; i < classes.length; i++) {

		var links = document.getElementsByClassName(classes[i]);

		Array.forEach(links, function (el){

			// Hide bitrates we don't want to see
			if (el.innerHTML.search(hideBitrates)>-1)

				el.style.display = "none";	

			// Highlight the bitrates we like
			if (highlightPreferred)
			{
				if (el.innerHTML.search(preferredBitrates)>-1)
				{
					// Mmm,
					var cols = el.getElementsByTagName('TD');
					Array.forEach(cols, function (el){				
						el.setAttribute("style", "background-color: " + highlightColor + " !important"); // helps overide and kill :hover
					});
				}
			}
		});
	}
})();

// Version 0.0.5 - Updated highsociety75's script to reflect class changes on Top 10 page
// Version 0.0.4 - Added SSL support and updated comments - Contribution by FatherMcGruder
// Version 0.0.3 - Changed for(var i in links) to Array.forEach and added highlighting on preferred bitrates
// Version 0.0.2 - Changed getElementsByTagName('a') to getElementsByClassName to improve efficiency