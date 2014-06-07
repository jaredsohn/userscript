// ==UserScript==
// @name	jQuery Plugin Demo Link Digger
// @author	Firch Tsai
// @email	firchtsai@gmail.com
// @description    Automatic get jQuery Plugin demo link from the project page.
// @namespace      http://firchtsai.com
// @include        http://plugins.jquery.com/project/Plugins/category/*
// @include        http://plugins.jquery.com/most_popular*
// @include        http://plugins.jquery.com/project/Plugins/name
// @include        http://plugins.jquery.com/project/Plugins/date
// ==/UserScript==


var LinkArray;


function GetDemo(thisUrl,thisIndex)
{
	
	DemoLink = document.createElement('div');
	DemoLink.innerHTML="Loading...";
	DemoLink.style.fontSize = "7px";
	DemoLink.style.lineHeight="18px";
	DemoLink.style.width="250px";
	DemoLink.style.backgroundColor = "#99ff66";
	LinkArray[thisIndex].appendChild(DemoLink);
	
	GM_xmlhttpRequest({
			method: 'GET',
			url: thisUrl,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				
				LinkArray[thisIndex].childNodes[1].innerHTML = "";
				
				if(responseDetails.responseText.match(/<a [^<]*>Try out a demonstration<\/a>/gi) != null)
				{
					LinkArray[thisIndex].childNodes[1].innerHTML+=responseDetails.responseText.match(/<a [^<]*>Try out a demonstration<\/a>/gi);
					LinkArray[thisIndex].childNodes[1].style.backgroundColor = "#ffff00";
				}
				else
				{
					LinkArray[thisIndex].childNodes[1].innerHTML="No Demo...";
					LinkArray[thisIndex].childNodes[1].style.backgroundColor = "#999999";
				}
				
				if(responseDetails.responseText.match(/<div[^<]*star avg on.*<\/div>/gi) != null)
				{
					star_array = responseDetails.responseText.match(/<div[^<]*star avg on.*<\/div>/gi);
					
					if(star_array.length > 0)
					{
						LinkArray[thisIndex].childNodes[1].style.fontSize = 7 + (star_array.length*1.5) + "px";
						
						if(star_array.length > 3)
						{
							LinkArray[thisIndex].childNodes[1].style.fontWeight = "bold";
						}
						
						for(star in star_array)
						{
							LinkArray[thisIndex].childNodes[1].innerHTML+= " V ";
						}
					}
				}
				
				if(responseDetails.responseText.match(/<a [^<]*>Home page<\/a>/gi) != null)
				{
					LinkArray[thisIndex].childNodes[1].innerHTML+= "<br>" + responseDetails.responseText.match(/<a [^<]*>Home page<\/a>/gi);
				}
			}
	});
	
}


function GetLinks(){

	
	var allLinks = document.evaluate(
	    "//div[@class='odd' or @class='even']/h2/a",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	
	//alert(allLinks.snapshotLength);
	
	if(allLinks.snapshotLength == 0)
	{
		var allLinks = document.evaluate(
	    "//div[@class='node']/h2/a",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	}
	//alert(allLinks.snapshotLength);
	
	LinkArray = new Array(allLinks.snapshotLength);
	
	for (var i = 0; i < allLinks.snapshotLength; i++)
	{
		var thisLink = allLinks.snapshotItem(i);
		
		LinkArray[i] = thisLink.parentNode;
	}
	
	
	
	for (var j = 0; j < allLinks.snapshotLength; j++)
	{
		var thisLink =allLinks.snapshotItem(j);
		
		GetDemo(thisLink.href,j);
	}    

}

window.addEventListener("load", GetLinks, true);
