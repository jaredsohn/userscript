// ==UserScript==
// @name      Flickr Tag Convergence
// @namespace   http://forestfortrees.edublogs.edu/
// @description   Allows the searching of a Flickr tag on del.icio.us and Technorati with one click of the mouse.
// @include     http://www.flickr.com/photos/*
// @include     http://flickr.com/photos/*
// ==/UserScript==

/*------------------------------------------------------------------------------------------------

 Flickr Tag Convergence v0.1
 22 August 2005
 Jeremy Price
 http://forestfortrees.edublogs.org

------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------

Flickr Tag Convergence is a Greasemonkey script which adds the ability with the click of the 
mouse to search for a Flickr tag on the del.icio.us or Technorati.  The script adds a small icon 
of the respective sites to the left of each tag listed on a Flickr photo page.  Clicking on the 
icon next to the Flickr tag will open the respective tag page for del.icio.us or Technorati.  

I am a bricoleur; thank you to Joseph Rozier (http://mrjoro.org) for his extremely useful 
Flickr Multi-Tag Search script and for releasing it under the Creative Commons by-nc-sa license.  
I was able to tease it apart to see how it works, and make this script work as well.  The tagsDiv 
sniffer is mostly his.  Also thank you to Paolo Massa (http://moloko.itc.it/paoloblog/) and 
his Identity Burro script.  I repurposed his data:image icons for del.icio.us and Technorati for the 
Flickr Tag Convergence script.

------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike License. 
To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/ or send a 
letter to Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.

------------------------------------------------------------------------------------------------*/


(function()
{

	// items are added using the tagSearchText
	// each item is {link, tagSearchText, selected}
	var tags = new Array();
	
	var searchDiv = document.createElement("div");
	
	var tagsDiv =  document.getElementById("thetags"); 

	if(tagsDiv != null)
	{
		// get the user id
		if(location.href != null)
		{
			// parse the url of the current page to get
			// the userid we will use for the tag
			// search that is specific to this user
			// (as opposed to the tag search for public
			// photos)
			
			// the URL is in the format http://<server>/photos/<userid>
			var photosIndex = location.href.indexOf('photos/');
			var startIndex = photosIndex+7;
			var nextslash = location.href.indexOf('/',startIndex);
			userId = location.href.substring(startIndex,nextslash);
		}
	
		// we'll place the search at the end of the tagsDiv	
		tagsDiv.appendChild(searchDiv);
	
	
		// place the link to add/remove a tag from searcing next
		// to each tag...
		// this XPath expression finds the div with id "thetags"
		// (which contains the tags links on the photo page), and
		// then finds the links within the tag that have
		// "/photos/tags" in the URL (which is the globe link
		// next to each tag); we get two pices of information from
		// that--where to place our link, and also the tag itself

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
				
				// create the del.icio.us link
				var searchDeliciousLink = document.createElement("a");
				searchDeliciousLink.setAttribute("href", "http://del.icio.us/tag/" + tagSearchText);
				searchDeliciousLink.setAttribute("title", "Search del.icio.us for " + tagSearchText);
				var icon_img = document.createElement("img");
				icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAK3RFWHRDcmVhdGlvbiBUaW1lAOMgMjIg6eXw6SAyMDA1IDA1OjQ3OjQzICswMjAw7OgyTQAAAAd0SU1FB9UGFgMyOcQmuP8AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAAcUlEQVR42mNsbGzk5eVlQAUfP4IQGuDj+8zQ19f3HwPU1/9nYEBHBQV9TAykgKGqmrEe6P///9FEf/yw+PHDHE2Qn38+y8ePHydMmIAmkZeXl5+vjia4du2/weNLmoZgXV3d58+f0UR5eHgwE+b3798Bmzk9yeQIiMcAAAAASUVORK5CYII=");
				icon_img.setAttribute("border", "0");
				icon_img.setAttribute("width", "8");
				icon_img.setAttribute("height", "8");
				icon_img.setAttribute("hspace", "1");
				icon_img.setAttribute("alt", "Search del.icio.us for " + tagSearchText);
				searchDeliciousLink.appendChild(icon_img);

				// create the Technorati link
				var searchTechnoratiLink = document.createElement("a");
				searchTechnoratiLink.setAttribute("href", "http://www.technorati.com/tag/" + tagSearchText);
				searchTechnoratiLink.setAttribute("title", "Search Technorati for " + tagSearchText);
				var icon_img = document.createElement("img");
				icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcRAh0YOybr8gAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAABrUlEQVQY042PP2gTcRTHP7/f3fWO1oQcSaNV0Epti4I2g6RgjAjqojgUB+1QHIQ6tIsoSLcuWigupZRQFAQFBwXxD7o4KYqjTkaLpITa0pScjc3Z5C53PQdp6D+Ln+29x+e97xOuXw0e50Z5khujPZzgdvIVmtQpVn/w6PsIHwsvsZx5Ig0xuuNn6T1wk92N7YjJLzeCB1N3UKVKJv2Wg5FjLFSmGfyQZu73LBuJGlEmjr9HvsjfBcDU4+wPHQHgeT6zpQRgVS2eTo8jS84vAAQSKRQAXN9hO8q1ReRqUXIKzNhZAM7vu4ppmFtKTVojPa2DKHsvMQzgByvYXpF0ywVMfSepXeewnBnK7k8C4bJDi5CIpRhK3OOQmUKknhGsbpNC0tdxnSudI/XYds1i2S9hKGFCWgyB+PvaWhGgNdTJ/ZOf0aSxKWZtpcqn4hty5SzqxmHMaMYPPF7nx3k4dYtwQzNNqknFWyJvZ6l4LidaelB1RcPxa3XR9iz63x0lt/QNgPnlwqbLuqIhk/FT65pfF7N16V8k46eR1w5n6Ip28z8oQnKxbYAzey7zBwVZkfap5KGPAAAAAElFTkSuQmCC");
				icon_img.setAttribute("border", "0");
				icon_img.setAttribute("width", "9");
				icon_img.setAttribute("height", "8");
				icon_img.setAttribute("hspace", "1");
				icon_img.setAttribute("alt", "Search Technorati for " + tagSearchText);
				searchTechnoratiLink.appendChild(icon_img);

				if(tagNode.parentNode != null)
				{
					tagNode.parentNode.insertBefore(searchDeliciousLink, tagNode);
					tagNode.parentNode.insertBefore(searchTechnoratiLink, tagNode);
				}

			}
		}
		
	}

})();	
