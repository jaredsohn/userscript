
// ==UserScript==
// @name Waffles Highlight Format / Custom Term
// @namespace Unknown
// @description Changes font colour of specified formats to specified colours.
// You may also enter your own string/text, that if found in the title
// the title will be highlighted the specified colour. E.g. "iPhone" or "24bit"
// @include *waffles.fm/browse.php*
// @include *waffles.fm/topten.php*
// @revision 1.1
// ==/UserScript==

// User Settings
//------------------------------------------------------------------------------

// Enter your own term to highlight (note: currently set to false below)
// These will override the colours set by format below
var customString1 = "iPhone";
var customString2 = "24bit";
var customString3 = "24 bit";

// Change default colour of all torrents
var highlightDefault = false;

// Change colour of specified formats/ custom term
var highlightString1 = false;
var highlightString2 = false;
var highlightString3 = false;
var highlightMultichannel = true;
var highlightFlac = true;
var highlight320 = false;
var highlightV0 = true;
var highlightV2 = true;
var highlight256 = false;
var highlight224 = false;
var highlight192 = false;

// Set the custom colours (always overrides default)
var colourString1 = "RED";
var colourString2 = "RED";
var colourString3 = "RED";
var colourDefault = "BLACK";
var colourMultichannel = "RED";
var colourFlac = "#CE4C00"; // Orange-ish
var colour320 = "BLACK";
var colourV0 = "BLACK";
var colourV2 = "GREEN";
var colour256 = "BLACK";
var colour224 = "BLACK";
var colour192 = "BLACK";
//------------------------------------------------------------------------------

// Includes support for small 'v' in v0 and v2
var formats = [customString1, customString2, customString3,
	"MultiChannel", "FLAC", "320", "V0", "V2", "256", "224", "192", "v0", "v2"];

var highlight = [highlightString1, highlightString2, highlightString3,
	highlightMultichannel, highlightFlac, highlight320,highlightV0, highlightV2,
	highlight256, highlight224, highlight192, highlightV0, highlightV2];

var formatColours = [colourString1, colourString2, colourString3,
	colourMultichannel, colourFlac, colour320, colourV0, colourV2,
	colour256, colour224, colour192, colourV0, colourV2];

// Check if on browse or topten page
if(location.pathname == "/browse.php")
{
	var browseTable = document.getElementById('browsetable');
	var rows = browseTable.getElementsByTagName('tr');
	colourFormatsInTable(rows);
}

else if(location.pathname == "/topten.php")
{
	var mainTD = document.getElementById("browsetable").parentNode; // As there are multiple Tables with SAME Id.
	var browseTables = mainTD.getElementsByTagName("TABLE");
	
	for(var j = 0; j < browseTables.length; j++)
	{
		var rows = browseTables[j].getElementsByTagName('tr');
		colourFormatsInTable(rows);
	}
}



function colourFormatsInTable(rows)
{
	var columns, divs, embeddedDiv, torrentLinks, torrentName;
	for(var i = 0; i < rows.length; i++)
	{
		columns = rows[i].getElementsByTagName('td');
		if(columns[1])
		{
			divs = columns[1].getElementsByTagName('div');
			if(divs[0])
			{
				embeddedDiv = divs[0].getElementsByTagName('div');
				if(embeddedDiv[0])
				{
					torrentLinks = embeddedDiv[0].getElementsByTagName('A');
					if(torrentLinks[1])
					{
						torrentName = torrentName = torrentLinks[1].innerHTML;
						
						// Next section used to get around span tags (inserted when search is used)
						spans = torrentLinks[1].getElementsByTagName("SPAN");
						if(spans.length != 0)
						{
							var lessThanSignPos, moreThanSignPos;
							var before, after;
							
							while(true)
							{
								lessThanSignPos = torrentName.indexOf('<');
								moreThanSignPos = torrentName.indexOf('>');
								if(lessThanSignPos == -1 || moreThanSignPos == -1)
								{
									break;
								}
								
								before = torrentName.substr(0, lessThanSignPos);
								after = torrentName.substr(moreThanSignPos + 1);
								
								torrentName = before + after;
							}
						}
						
						for(var k = 0; k < formats.length; k++)
						{
							if(torrentName.indexOf(formats[k]) != -1 && highlight[k])
							{
								torrentLinks[1].style.color = formatColours[k];
								break;
							}
						}
						if(highlightDefault && k == formats.length)
						{
							torrentLinks[1].style.color = colourDefault;
						}
					}
				}
			}
		}
	}
}