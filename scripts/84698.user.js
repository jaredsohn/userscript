// ==UserScript==
// @name           UDmonkey
// @namespace      http://wiki.urbandead.com/index.php/User:TouchingVirus
// @description    UDmonkey - A script to add some extra features into Urbandead's UI.
// @include        http://www.urbandead.com/map.cgi
// @include        http://www.urbandead.com/map.cgi*
// @include        http://urbandead.com/map.cgi
// @include        http://urbandead.com/map.cgi*
// @include        http://94.76.232.96/map.cgi
// @include        http://94.76.232.96/map.cgi*
// @exclude        http://www.urbandead.com/map.cgi?logout
// @exclude        http://urbandead.com/map.cgi?logout
// @exclude        http://94.76.232.96/map.cgi?logout
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Configuration Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////
var debug = true;
var doChangeSuburbNameToMapLink = true;
var doAppendCoordsToSuburbName = true;
var doHumanCountOnMap = true;
var doQuickAddRemoveToContacts = true;
var doDumbwit = true;

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Get Important Page Elements
////////////////////////////////////////////////////////////////////////////////////////////////////////	

var leftCell = getElementsByClassName(document, "cp", "td")[0];
var cityMap = getElementsByClassName(leftCell, "c", "table")[0];
var cityCells = cityMap.getElementsByTagName("td");
var headsUpDisplay = getElementsByClassName(leftCell, "gt", "div")[0];
var gameLinks = getElementsByClassName(leftCell, "y", "a");
var gameText = getElementsByClassName(document, "gp", "td")[0];
var roomDescription = getElementsByClassName(gameText, "gt", "div")[0];
var actionForms = getElementsByClassName(gameText, "a", "form");
var isDead = ((headsUpDisplay.innerHTML.search(/you are <b>dead<\/b>/) > -1) ? 1 : 0); // Determine if you're a zombie

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Get Important Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////	
var currentBlock = getCurrentBlock(cityCells);
var currentCoords = getCurrentCoords();
var currentAP = getCurrentAP();

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Script Runtime
////////////////////////////////////////////////////////////////////////////////////////////////////////

if(currentAP > 0)
{
	if (doChangeSuburbNameToMapLink)
	{
		changeSuburbNameToMapLink();
	}

	if(doAppendCoordsToSuburbName)
	{
		appendCoordsToSuburbName();
	}

	if(doHumanCountOnMap)
	{
		//humanCountOnMap(doc, cityCells, roomDescription, currentBlock);
	}

	if(doQuickAddRemoveToContacts)
	{
		appendQuickAddRemoveToContacts();
	}
	
	if(doDumbwit)
	{
		appendDumbwitLink();
	}
}
	
////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Runtime Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////	

/**
* Grabs the AP of the current player. This script does nothing if the player has no AP.
*
* @return int The AP of the character
*/
function getCurrentAP()
{
	return parseInt(headsUpDisplay.innerHTML.match(/You have <b>(\d+)<\/b> Action Points remaining/)[1]);
}


/**
* Changes the suburb name into a link, which links to an Urbandead Map of the surrounding area
* Note that this function should be called before appendCoordsToSuburbName() or else the co-ords
* will become a link too.
*
* @return void
*/
function changeSuburbNameToMapLink()
{
	try
	{
		// The Suburb Name is cityCells[0]
		cityCells[0].innerHTML = '<a href="http://dssrzs.org/map/location/' + currentCoords[0] + '-' + currentCoords[1] + '" target="_blank" alt="Map of ' + cityCells[0].innerHTML + '" title="Map of ' + cityCells[0].innerHTML + '">' + cityCells[0].innerHTML + '</a>';
	}
	catch(error)
	{
		if(debug)
		{
			GM_log('UDmonkey Error: changeSuburbNameToMapLink: '+error);
		}
	}
}

/**
* Appends the current co-ordinates to the suburb name - e.g. "Fryerbank" becomes "Fryerbank [99,82]"
*
* @return void
*/
function appendCoordsToSuburbName()
{
	try
	{
		// The Suburb Name is cityCells[0]
		cityCells[0].innerHTML = cityCells[0].innerHTML + ' [' + currentCoords[0] + ',' + currentCoords[1] + ']';
	}
	catch(error)
	{
		if(debug)
		{
			GM_log('UDmonkey Error: appendCoordsToSuburbName: '+error);
		}
	}
}

/**
* Add the + and - quicklinks for adding/removing contacts directly
* from the main game page
*
* @return void
*/
function appendQuickAddRemoveToContacts()
{
	var gameText_links = gameText.getElementsByTagName('a');
	var links_length = gameText_links.length;
	var quicklink = null;
	var contact_profile_id = null;

	for (i=0;i<links_length;i++) 
	{
		try 
		{
			contact_profile_id = gameText_links[i].href.match(/profile\.cgi\?id=(\d+)$/)[1];
			
			if(contact_profile_id)
			{
				quicklink = gameText_links[i].ownerDocument.createElement('sup');
	
				if(gameText_links[i].className.length)
				{
					quicklink.innerHTML = '<a href="contacts.cgi?c' + contact_profile_id + '=d" target="' + contact_profile_id + '" title="Remove from Contact List">-</a>';
				}
				else
				{
					quicklink.innerHTML = '<a href="contacts.cgi?add=' + contact_profile_id + '" target="' + contact_profile_id + '" title="Add to Contact List">+</a>';
				}

				gameText_links[i].parentNode.insertBefore(quicklink, gameText_links[i].nextSibling);
				links_length++; // Artificially increase links_length to cope with the added element
			}
		}
		catch(error) 
		{
			if(debug)
			{
				GM_log("UDmonkey Error: appendQuickAddRemoveToContacts: "+error); 
			}
		}
	}
}

/**
* Creates a link at the end of the gameLinks (e.g. Contacts, Logout, Skills etc
* for DumbWit. Also creates an empty element for the response.
*
* @return void
*/
function appendDumbwitLink()
{
	try
	{
		dumbwit_element = document.createElement('a');
		dumbwit_element.setAttribute('id','dumbwit');
		dumbwit_element.setAttribute('class','y');
		dumbwit_element.setAttribute('href','#');
		dumbwit_element.innerHTML = 'Dumbwit';
		
		dumbwit_response_element = document.createElement('div');
		dumbwit_response_element.setAttribute('id','dumbwit_response');
		dumbwit_response_element.setAttribute('class','gthome');
		dumbwit_response_element.setAttribute('style','margin-top: 10px; text-align: left; visibility: hidden');
		
		gameLinks_parent = gameLinks[0].parentNode;
		gameLinks_parent.appendChild(dumbwit_element);
		dumbwit_element.addEventListener('click', submitDumbwit, false);
		
		gameLinks_parent.parentNode.insertBefore(dumbwit_response_element, gameLinks_parent); 
	}
	catch(error) 
	{
		if(debug)
		{
			GM_log("UDmonkey Error: appendDumbwitLink: "+error); 
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Supporting Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////	

/**
* Finds the currentBlock in a list of elements by searching them for the absence of x-y
* The currentBlock or tile the user is on doesn't have x-y co-ordindates because it isn't a link
*
* @param elements - A list of TD elements to search through
* @returns An integer which is the element number of the currentBlock in the list of elements
*/
function getCurrentBlock(elements)
{
	try
	{
		var i = 1;
		while(elements[i].innerHTML.search(/"\d+-\d+"/) > -1 && i < elements.length)
		{
			i++;
		}
		return i;
		
	}
	catch(error)
	{
		if(debug)
		{
			GM_log('UDmonkey Error: getCurrentBlock: '+error);
		}
	}	
}

/**
* Finds the co-ordinates of the player's current location
*
* @returns An array of X,Y indicating the current co-ordinates of the player
*/
function getCurrentCoords() //Add a comment with current block coordinates, return coords
{
	try
	{
		// Error if there is less than four TD elements (invalid map)
		if (cityCells.length < 4)
		{
			return [-1,-1];
		}

		var x = x2 = y = y2 = 0;

		// Bottom-Right Corner
		if (currentBlock + 1 >= cityCells.length)
		{
			x = 99;
			y = 99;
		}
		// Not in the Top-Left (x=0,y=0, currentBlock=1)
		else if (currentBlock > 1)
		{
			// Obtain co-ords of block to the left (edge checking)
			var coords = cityCells[currentBlock-1].innerHTML.match(/\d+-\d+/)[0];
			coords = coords.split("-");
			x = parseInt(coords[0]);		
			y = parseInt(coords[1]);

			// Obtain co-ords of block to the right (edge checking)
			coords = cityCells[currentBlock+1].innerHTML.match(/\d+-\d+/)[0];
			coords = coords.split("-");
			x2 = parseInt(coords[0]);
			y2 = parseInt(coords[1]);

			// Add one to x (block to the left) to get currentBlock co-ords according to left
			x++; 

			// Decrement value of x2 (block to the right) to get currentBlock according to right
			x2--;
		}
		// If x-vals are not the same, and x is 2, then you're on the left edge of the map
		// so x2 and y2 are the right co-ordinates. For all other cases, x and y are correct.
		if (x != x2 && x == 2)
		{
			x = x2;
			y = y2;
		}
		return new Array(x, y);
	}
	catch(error)
	{
		if(debug)
		{
			GM_log('UDmonkey Error: getCurrentCoords: '+error);
		}
	}
}

/**
* Handles the AJAX submission to the Dumbwit server. We're using Greasemonkey's XHR because it allows
* cross-domain XHRs whereas on at least firefox, I can't do it otherwise. It also sends the response
* to the handler below
*
* @return void
*/
function submitDumbwit()
{
	try
	{
		var d = new Date();
		var ud_source = document.body.innerHTML;
		
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://iamscott.net/cgi-bin/dumbwit.rb",
			data: "wP=PRIVATE&wT="+window.document.lastModified+"&wZ="+d.getTimezoneOffset()+"&wV=23&wS="+escape(ud_source),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) { handleDumbwitResponse(response) },
		});
	}
	catch(error)
	{
		var dumbwit_response_element = document.getElementById('dumbwit_response');
		dumbwit_response_element.style.visibility = 'visible';
		dumbwit_response_element.innerHTML = 'There appears to be a problem with sending the page to dumbWit';
		
		if(debug)
		{
			GM_log('UDmonkey Error: submitDumbwit: '+error);
		}
	}
}

/**
* Handles the dumbWit response, enabling the response container and setting it's message
* which is either an error, or a link to the dumbwit we just took
*
* @param res - The response from the AJAX submission request
* @return void
*/
function handleDumbwitResponse(res)
{
	// Make the response-holding element visible, it'll be filled one way or another
	var dumbwit_response_element = document.getElementById('dumbwit_response');
	dumbwit_response_element.style.visibility = 'visible';
			
	if(res.readyState == 4 && res.status == 200)
	{
		try
		{
			var dumbwit_url = res.responseText.match(/http\:\/\/iamscott.net\/(\d+).html/)[0];
			dumbwit_response_element.innerHTML = '<b>Dumbwit URL: </b><a href="'+dumbwit_url+'" target="_blank" title="Dumbwit Link">'+dumbwit_url+'</a>';
		}
		catch(error)
		{
			if(debug)
			{
				GM_log('UDmonkey Error: handleDumbwitResponse: '+error);
			}
		}
	}
	else
	{
		dumbwit_response_element.innerHTML = '<b>Dumbwit submission failed: </b> Status '+res.status+', State: '+res.readyState;
	}
}

/**
* Finds an array of elements with the given class name
*
* @param parent - The root node under which to search
* @param className - The classname to search for
* @param type - The type of element to search
* @returns An array of elements of the current type, under the named parent, that have the classname
*/
function getElementsByClassName(parent, className, type)
{
	var returnElements = new Array();

	if (type != null)
	{
		var elements = parent.getElementsByTagName(type);
	} 
	else 
	{
		var elements = parent.getElementsByTagName('*');
	}
	
	var length = elements.length;
	for (var i = 0; i < length; i++)
	{
		if (elements[i].className == className)
		{
			returnElements.push(elements[i]);
		}
	}
	return returnElements;
}