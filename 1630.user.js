// ==UserScript==
// @name      Trope for Flickr
// @namespace   http://forestfortrees.edublogs.edu/
// @description   Allows the searching of a Flickr tag on del.icio.us, Technorati, CiteULike, and Odeo with one click of the mouse.
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

				var searchCiteULikeLink = document.createElement("a");
				searchCiteULikeLink.setAttribute("href", "http://www.citeulike.org/tag/" + tagSearchText);
				searchCiteULikeLink.setAttribute("title", "Search CiteULike for " + tagSearchText);
				var icon_img = document.createElement("img");
				icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAABGElEQVQ4y8WSv44BURTGf/fO3WFKun0H4QUUeqXGC0g8gLeQUWkkCo1aopzwBBoayUai2agUEwoGd+ZsodjImoS1yX7t953fyfmjRER4QfqV4j8BGIDx2DIcWlxXOJ0cej1NLmd+hKfThPX6QqOR+QbM55Z2WwiCDJ6niKIEY9Tdbvu9Zru99cxkoqjXFZ53NbLZ56bSxsDx+PtD6GoVBgNhubSIwGJxYbeLHwYoEZHZzNLvQxhaCgWHVsvh7WOBKZVQWhOHIRwOzD7f6XQiXDcBwPczICmy5bLYKBIRkVMQiHS7d3P//0ipgERrsPa6qPOZRN3/DZMGoFYjaTaJKxUYjRDfT79CGiNerUg2G3SxiJPPPw94RF/Ij6Mlz63sWgAAAABJRU5ErkJggg==");
				icon_img.setAttribute("border", "1");
				icon_img.setAttribute("width", "9");
				icon_img.setAttribute("height", "8");
				icon_img.setAttribute("hspace", "1");
				icon_img.setAttribute("alt", "Search CiteULike for " + tagSearchText);
				searchCiteULikeLink.appendChild(icon_img);

				var searchOdeoLink = document.createElement("a");
				searchOdeoLink.setAttribute("href", "http://www.odeo.com/tag/" + tagSearchText);
				searchOdeoLink.setAttribute("title", "Search Odeo for " + tagSearchText);
				var icon_img = document.createElement("img");
				icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAdVBMVEX/////s9n/rNb/mcz/mcz/jMX+hMH/ebz+drv+crj/Wqz/////9fr/7vb/3+//1uv/0Oj/xOH/vN7/s9n/rNb/mcz/jMX/hcL+hMH/ebz+drv+crj/a7X/ZrL+YrD/Wqz/VKr/Uqj/SqX/RaL/QJ//O53/M5nsA3V6AAAAJ3RSTlMARFVVZmZ3iIiImf/////////////////////////////////////8d95jAAAACXBIWXMAAAsSAAALEgHS3X78AAAAIHRFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyBNWLuRKiQAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjkvMDVakEFiAAAAmElEQVR4nD2P6xaCIBCEt1SykFQsLCxERd7/EVt2pfkxh/n2sBeApLN1biog67RGUig5lxwtYkF1zv7u0SsE6/axe4ydpI/YD4tKPQapCAiw6G+JasZEZnCJa0moMz4w6Amo/rUEmDA/qW42fC5QxGBlo/XRtAbYx8GscW/z2LzoVy3o17TqhYnBTW98TBUP1f97xRyC5/gD1RcWYoxODPwAAAAASUVORK5CYII=");
				icon_img.setAttribute("border", "1");
				icon_img.setAttribute("width", "8");
				icon_img.setAttribute("height", "8");
				icon_img.setAttribute("hspace", "1");
				icon_img.setAttribute("alt", "Search Odeo for " + tagSearchText);
				searchOdeoLink.appendChild(icon_img);

				if(tagNode.parentNode != null)
				{
					tagNode.parentNode.insertBefore(searchDeliciousLink, tagNode);
					tagNode.parentNode.insertBefore(searchTechnoratiLink, tagNode);
					tagNode.parentNode.insertBefore(searchCiteULikeLink, tagNode);			
					tagNode.parentNode.insertBefore(searchOdeoLink, tagNode);			
				}

			}
		}
		
	}

})();	
/*
Trope Logo Base64:
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAACw0lEQVR4nE2SzWtcZRTGf+d9782dr0xmTDRKG4KgpVLRRddKLeJCQRTEhSJUcCXddOE/IYiLupGAO0FFcSO48gOFgq2bREysQ6L9nDSTdpKZuR9z7/u+x0VMmwPP5sB54HnOD1XlUJm+czzTtzXTdzeO7g+1vvbGadVPFnb/fe7DdCsJg8uo4ciIJn1Uv4NwMuPc5xnnn8pudJYm19srbrh4rrcemjdvrbx1b7T3SnAxkQVR1aMeFNn7TbXXeiSzj0FJ2L4UqPZM0u3Sv7c0/Gc97baSlOONPokpie4fjp98XOtPf0bdHqPY6bK7jknaYJpGZiyhFOaTW90/7hZc2/Ysnq5IIh4YaGPpCcLOGbSJ+BGEDD/K0cqhrgARTMh5/pRnsy5k+0L7IX0QoXQXal5Wb6h1CzjB7K7hUkfwDi2naK6EKYQcTIDpGFwG90uciT4ucP4DENWoIsw/goQJjKeEFHwOfgxuBKPrkO9BvCiYv74Xcn3hVMpLZ9QOj5n8Nqbag7jCLM8TzRk0V3wOFqhNwQwgH0DcVST1L36pxr0JFuO3kf4GYRJQE2NiCBpQDeRbyuYqXFm1uLHhxzXojZUI0/1IyM8quhBMA9Oepbq7z/RmdZDXgjRgdAe+/tby6aWI2QSiWMkrwTT46jL+0ZeF5KpIB2k+TNSCkMCkgJ1N2PkNej/Dr39a5lvgIygVTPR/iQ27cqXBNycDrVe9zP0k7Q7JHCQtiDtQ1OD324ZhJUSiKBAEVI5wkPPesqF8hjCuifVEnYha4RAL/V34YSNiEkCMICgBcECU8vpFoTgB5izkkQSH0ZKZjhLXwQ5geQDPLnp6d2KCBkQURBAMkcD5gwcZhBgpAyH1+NRT7kM6gOEEtvYNsVG8CA5QwKMYS/Ka0dkvROsHSM90oN4mqOAqMCL8ctXy98AQ20PyBItgBP4DsLpxMk/kK4kAAAAASUVORK5CYII=
*/