// ==UserScript==
// @name          noPicsNoService
// @namespace     http://www.bengarvey.com/download/scripts
// @description	  Filters out furniture listings on craigslist.org that don't include photos
// @include       http://*.craigslist.*/fur/
// @include       http://craigslist.*/fur/
// @include       http://*.craigslist.*/fur/index*.html
// @include       http://craigslist.*/fur/index*.html
// ==/UserScript==
// Notes:
//   * is a wildcard character

(function() {

	// Define some variables and constants
	const HTMLNODE 		= 1;
	const ATTRIBUTENODE	= 2;
	const TEXTNODE 		= 3;

	var i, j, k, m		= 0;
	var filterThis 		= true;
	var count 		= 0;
	var temp		= "";
	var first		= true;

	// Use these to show how many listings we hid
	dateNodes		= new Array();
	countValues		= new Array();

	// Get our paragraph tags
	paragraphs = document.getElementsByTagName( "p" );
	
	// Define our regex object
	hasPic = new RegExp("(pic)|(next)");

	// Loop through paragraphs
	for(i=0; i<paragraphs.length; i++) 
	{
		// Look for a table inside a p tag and that's the date.
		if (paragraphs[i].getElementsByTagName("table").length > 0 || paragraphs[i].getElementsByTagName("br").length > 0)
		{	filterThis = false;
		
			// Look to see if this is the date node
			// Making the world safer for our children's children's children's children, but not our children's children's children's children's children
			if (!paragraphs[i].getElementsByTagName("br").length > 0)
			{	theseKids = paragraphs[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes;	
       		
        			for (m=0; m<theseKids.length; m++)
        			{	
        				if (theseKids[m].nodeType == TEXTNODE)
        				{	dateNodes.push(theseKids[m]);
        			
						// If this is the first one, don't bother pushing a count yet
						if (!first)
						{	countValues.push(count);						
						}
						else
						{	first = false;							
						}

						count = 0;
        				}
        			}						
			}

			// No need to check this node any further
			i++;			
		}

		if (i < paragraphs.length)
		{
        		// Get child nodes
        		kids = paragraphs[i].childNodes;
        
        		// Loop through child nodes
        		for (j=0; j<kids.length; j++)
        		{	
        			// Listings have no attributes in their p tag, so we can skip these
        			if (kids[j].nodeType == ATTRIBUTENODE)
        			{	filterThis = false;
        				break;	
        			}			
        			else if (kids[j].nodeType == HTMLNODE)  // See if this is an HTML element node
        			{	
        				// Pick up the grand kids
        				gkids = kids[j].childNodes;
        
        				// Loop through grand kids
        				for (k=0; k<gkids.length; k++)
        				{	
											
        					// If we find any text nodes with "pic" in the text, we keep it
                        			if ( (gkids[k].nodeType == TEXTNODE && hasPic.test(gkids[k].nodeValue)) || gkids[k].nodeValue == null) 
                                		{	filterThis = false;
        						break;
        					}
        				}
        			}
        		}
		}
        
        	// Have we found "pic" anywhere?  If not, kill it.
        	if (filterThis)
        	{	paragraphs[i].style.display = "none";
        		count = count+1;
        	}
		
		// Reset variable
		filterThis = true;
	}

	// Toss the last value into the array
	countValues.push(count);				

	// Add a count of all the hidden listings for that day
	for(i=0; i<dateNodes.length; i++)
	{	dateNodes[i].nodeValue = dateNodes[i].nodeValue + " (" + countValues[i] + " hidden for not having pics)";
	}

})();