// ==UserScript==
// @name      Flickr ZipInfo
// @namespace   http://forestfortrees.edublogs.edu/
// @description   Provides information links for Flickr photos tagged with a US zip code.  The tag must be in the form of "zip00000" or "zip00000-0000" as per the guidelines of the Zip Code USA photogroup.
// @include     http://www.flickr.com/photos/*
// @include     http://flickr.com/photos/*
// ==/UserScript==

/*------------------------------------------------------------------------------------------------

 Flickr ZipInfo v0.1
 6 October 2005
 Jeremy Price
 http://forestfortrees.edublogs.org

------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------

Flickr ZipInfo, designed for photos tagged with a US zip code, provides links to a map of the zip 
code area via Google Maps and demographics for the zip code via the US Census Bureau.  Photos 
must be tagged in the form of "zip00000" or "zip00000-0000" as per the guidelines of the 
Zip Code USA photogroup.  See the Zip Code USA About Page at http://www.flickr.com/groups/zipcode/.

Zip Code USA member pberry had mentioned interfacing with the pollution database Scorecard 
(http://www.scorecard.org/).  LarryB noted that Scorecard provides information at the county, 
rather than zip code, level.  The code is there to link to Scorecard; the comment wrappers just need 
to be removed.

Thanks to Beej Jorgensen for his Google Maps tip.

Future enhancements may include interfacing with the Google Map Zip Code application at 
http://maps.huge.info/, or at least using their database of zip code outline polygons and the 
Google Maps API.  This may beyond my scope of expertise -- anyone can feel free to jump in 
and help!

I am a bricoleur; thank you to Joseph Rozier (http://mrjoro.org) for his extremely useful 
Flickr Multi-Tag Search script and for releasing it under the Creative Commons by-nc-sa license.  
I was able to tease it apart to see how it works, and make this script work as well.  The tagsDiv 
sniffer is mostly his.

------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike License. 
To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/ or send a 
letter to Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.

------------------------------------------------------------------------------------------------*/


(function()
{

	// Find the tags on the page and parse
	var tags = new Array();
	
	var searchDiv = document.createElement("div");
	
	var tagsDiv =  document.getElementById("thetags"); 

	if(tagsDiv != null)
	{
	
		// this XPath expression finds the div with id "thetags"
		// (which contains the tags links on the photo page), and
		// then finds the links within the tag that have
		// "/photos/tags" in the URL (which is the globe link
		// next to each tag);

		var tagsPattern = "//div[@id = 'thetags']/div/a[contains(@href,'/photos/tags/')]";
		var tagNodesSnapshot = 
			document.evaluate( tagsPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );			

		for(var i=0; i<tagNodesSnapshot.snapshotLength; i++)
		{
			var tagNode = tagNodesSnapshot.snapshotItem(i);
			
			var tagSearchText;
			
			// we want the text immediately after the / (so
			// add the length of the "/photos/tags/" text)...
            // the format is now /photos/tags/<tag>/, so 
            // we need to remove the final /

			var urlStart = tagNode.href.indexOf("/photos/tags/");
			var tagStart = urlStart + 13;
            var tagEnd = tagNode.href.indexOf("/",tagStart);
            if(tagEnd == -1)
            {
				tagEnd = tagNode.href.length();
            }

			tagSearchText = tagNode.href.substring(tagStart,tagEnd);

			if(tagSearchText != null)
			{
				// Now pull out the tags that begin with "zip"
				if(tagSearchText.substring(0,3) == "zip")
				{
					// Check the next five characters to see if they are numbers;
					// This lessens the potential that photos tagged with "zipper" or "zip-a-dee-doo-da" will slip through
					var zipCode = tagSearchText.substring(3,8);
					if (zipCode == parseFloat(zipCode)) {
						// We have a zip code:  create and style the container
						var zipDiv = document.createElement("div");
						zipDiv.setAttribute("style", "border: solid 1px #cccccc; padding: 0.35em; background-color: #ffffcc;");
						// Insert the Zip Code USA group logo
						var zipLogoData = "iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAA3NCSVQICAjb4U/gAAAAJFBMVEX////MzMyZmZlmZmYzMzMAAAD////MzMyZmZlmZmYzMzMAAAC2XqexAAAADHRSTlMAEUR3qt3///////+S+N8JAAAACXBIWXMAAAsSAAALEgHS3X78AAAAIHRFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyBNWLuRKiQAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTAvMDcvMDU/yivIAAABwElEQVR4nF2SPW/bMBCGSakF2k1OCjRyFrvNVC9yE8Cws+Rrqf9FljrJD2hkecokkp7stpBITa2Cmh9T3AKRqD9XSVRcN5yOD+6O771HAMyB4NmBt+zkGRop5f2fc7ASZNnZItZICK3+9Mtw1zFoP2eFKurCXlNuFwUPgnUVtr+aNMhWeOrr6jKWqWGfYkqkLNtDjkktBnKqDWrn6YVnEKcBYx6wZNK033skAoubNRhx2Yg45pNpPgnUrianjdRxdnUVXRNd0Psn9TvZdeSzWSG25ux9oSJSIjndEGDnCCWCnW1bsV8oIc8ghN2dj405CcfBb2C7rggWhhxrLkkH2MjngXlhJFWmsAds4rP2shL7Rt4zjogH4Hnr0HpXlWnpfcjwdMt7mKdgyBNcmnLQ7x55ppUzzAj6AYB7MqC1XS/ZknDkP5SSnQGrrbCEDvg8LlFvseg3TiSz1Twu17EXNnaBtlIRDlMAP08uW/B9hS1doW9w/Fb6uZvWzfJZNF99t+9e3MYh+lktfahlRELmdlwUxwNRFvbKjYXIn99ddI9a5/DQAVAwKjFV2tn8ulcqKpSS+uHfjK8pjbX4JdYb8heKl6vuBdNeXQAAAABJRU5ErkJggg==";
						var zipLogo = document.createElement("img");
						zipLogo.setAttribute("src", "data:image/png;base64," + zipLogoData);
						zipLogo.setAttribute("align", "left");
						zipLogo.setAttribute("style", "padding: 0.35em; border: 0;");
						zipLogo.setAttribute("alt", "Zip Code USA Logo");
						zipDiv.appendChild(zipLogo);
						zipDiv.appendChild(document.createTextNode("Zip Code Info For " + zipCode + ":"));
						zipDiv.appendChild(document.createElement("br"));
						// Create the link to Google Maps
						var gMapZipLink = document.createElement("a");
						gMapZipLink.setAttribute("href", "http://maps.google.com/maps?q="+zipCode);
						gMapZipLink.setAttribute("title", "Map Zip Code "+zipCode);
						gMapZipLink.setAttribute("class","Grey");
						gMapZipLink.appendChild(document.createTextNode("Map"));
						zipDiv.appendChild(gMapZipLink);
						zipDiv.appendChild(document.createElement("br"));
						// Create the link to Census FactFinder
						var demZipLink = document.createElement("a");
						demZipLink.setAttribute("href", "http://factfinder.census.gov/servlet/SAFFFacts?_lang=en&_sse=on&ActiveGeoDiv=geoSelect&_zip="+zipCode);
						demZipLink.setAttribute("title", "Demographics For "+zipCode);
						demZipLink.setAttribute("class","Grey");
						demZipLink.appendChild(document.createTextNode("Demographics"));
						zipDiv.appendChild(demZipLink);
// Remove the comment wrappers (the slash-asterisk) below to link to the Scorecard pollution database
/*
						zipDiv.appendChild(document.createElement("br"));
						var scoreZipLink = document.createElement("a");
						scoreZipLink.setAttribute("href", "http://www.scorecard.org/community/index.tcl?zip_code="+zipCode);
						scoreZipLink.setAttribute("title", "Pollution Scorecard For "+zipCode);
						scoreZipLink.setAttribute("class","Grey");
						scoreZipLink.appendChild(document.createTextNode("Pollution"));
						zipDiv.appendChild(scoreZipLink);
*/
						// Render the ZipInfo container
						tagsDiv.appendChild(zipDiv);
					}
				}
			}
		}
		
	}

})();	
