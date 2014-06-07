// ==UserScript==
// @name           Teracom terrestrial.xml
// @namespace      print
// @description	   Skapar en terrestrial.xml-fil med samtliga sändare när du besöker Teracoms sida för frekvenstabeller.
// @version 		 2.0
// @include 		 http://www.teracom.se/Sandarinformation/Frekvenstabeller/?*region=*
// ==/UserScript==

var tableWrap = document.getElementsByClassName("tableWrap"),
	tables, 
	table, 
	cells, 
	cell, 
	tableClass, 
	foundParentstations, 
	trIndex, 
	cellIndex, 
	i, 
	j,
	channels, 
	channel, 
	textarea,
	locations, 
	name,
	container,
	heading,
	textNode,
	numRows,
	numCols,
	allStations = [],
	tempChannel;
try
{
	container = document.createElement("div");
	heading = document.createElement("h2");
	textNode = document.createTextNode("terrestrial.xml för Dreambox (enbart kompletta sändare)");
	heading.appendChild(textNode.cloneNode(true));
	textarea = document.createElement("textarea");
	locations =  "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>";
	locations += "\n<!-- useable flags are";
	locations += "\n1       ->      Network Scan";
	locations += "\n2       ->      use BAT";
	locations += "\n4       ->      use ONIT";
	locations += "\n8       ->      skip NITs of known networks";
	locations += "\nand combinations of this.-->";
	locations += "\n";
	locations += "\n<locations>";
	numRows = 9;
	if(tableWrap[0])
	{
		tables = tableWrap[0].getElementsByTagName("table")[0];
		tables = tables.getElementsByTagName("tbody")[0];
		tables = tables.getElementsByTagName("tr");
		foundParentstations = 0;
		for(trIndex = 0; trIndex < tables.length; trIndex++)
		{
			table = tables[trIndex];
			tableClass = table.getAttribute("class");
			cells = table.getElementsByTagName("td");
			
			name = cells[0].firstChild.nodeValue;
			name = name.replace(/\//g," ");
			/*
			name = name.replace(/[åä]/g,"a");
			name = name.replace(/[ÅÄ]/g,"A");
			name = name.replace(/[ö]/g,"o");
			name = name.replace(/[Ö]/g,"O");
			*/
			channels = []; // Create channels array that holds the channels of all muxes beeing broadcasted from this parentstation (broadcast tower)
			for(i = 1; i < cells.length - 2; i++)
			{
				channel = cells[i].firstChild;
				if(channel.nodeType === 3)
				{
					tempChannel = cells[i].firstChild.nodeValue * 1;
					
					if(!isNaN(tempChannel))
					{
						channels.push(tempChannel);
					}
					else
					{
						tempChannel = (cells[i].firstChild.nodeValue).split("/");
						if(tempChannel.length > 1)
						{
							for(j = 0; j < tempChannel.length; j++)
							{
								if(!isNaN((tempChannel[j] * 1)))
								{
									channels.push((tempChannel[j] * 1));
								}
							}
						}
						tempChannel = null;
					}
				}
			}
			if(channels.length > 1)
			{
				foundParentstations++;
				allStations.push(createTerrestrialTag(name,channels));
				numRows += 2 + channels.length;
			}
		}
		
		allStations.sort();
		for(i = 0; i < allStations.length; i++)
		{
			locations += allStations[i];
		}
		
		locations += "\n</locations>";
		numRows++;
		//empty(tableWrap);
		textarea.rows = numRows;
		textarea.cols = 213;
		textarea.value = locations;
		textarea.style.borderWidth = "0px";
		container.appendChild(textarea);
		container.style.height = "500px";
		container.style.overflow = "auto";
		container.style.border = "1px solid black";
		container.style.marginBottom = "1.2em";
		tableWrap[0].parentNode.parentNode.insertBefore(container, tableWrap[0].parentNode.parentNode.childNodes[4]);
		tableWrap[0].parentNode.parentNode.insertBefore(heading, tableWrap[0].parentNode.parentNode.childNodes[4]);
	}
	else
	{
		alert("Didn't find any element with id 'tableWrap'. Can't create terrestrial.xml :-( Please visit www.dreamboxx.nu, search for teracomterrestrialxml.user.js and file a bug in the thread belonging to this script.");
	}
}
catch (error)
{
	alert("Error " + error + " Can't create terrestrial.xml :-( Please visit www.dreamboxx.nu, search for teracomterrestrialxml.user.js and file a bug in the thread belonging to this script.");
}


function createTerrestrialTag(sendername,channels)
{
	var terrestrial = "\n  <terrestrial name=\"" + sendername + "\">";
	channels.sort(); // To make the scan go faster
	for(index = 0; index < channels.length; index++)
	{
		terrestrial += createTransponderTag(channels[index]);
	}
	terrestrial += "\n  </terrestrial>";
	return terrestrial;
}

function createTransponderTag(channel)
{
	var transponder = "\n    <transponder";
	transponder += " centre_frequency=\""+ channelToFrequency(channel) + "\"";
	transponder += " bandwidth=\"0\"";
	transponder += " constellation=\"2\"";
	transponder += " code_rate_hp=\"1\"";
	transponder += " code_rate_lp=\"6\"";
	transponder += " guard_interval=\"2\"";
	transponder += " transmission_mode=\"1\"";
	transponder += " hierarchy_information=\"0\"";
	transponder += " inversion=\"2\" />";

	return transponder;
}

function channelToFrequency(channel)
{
	return (474 + (channel - 21) * 8 ) * 1000000;
}

function empty(element)
{
	while (element.firstChild) 
	{
		element.removeChild(element.firstChild);
	}
}