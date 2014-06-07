// ==UserScript==
// @name           ITA Polish v1.4
// @namespace      http://johnath.com/ita
// @description    A script that polishes up the matrix.itasoftware search pages.
// @include        http://matrix.itasoftware.com/*
// ==/UserScript==

/* 
Copyright Johnathan Nightingale, 2007

Change History:
	v1.4 - Added extra webflyer params field (initially just minimum mileage per segment)
	v1.3 - Added support for more custom windows in 30 day search
	v1.2 - Added link to advanced query construction 
	v1.1 - Bug fix, add titles to generated airport icons
	v1.0 - Original Release, supporting airport lookup, auto-fill of preferred/sales city
			and WebFlyer links

 */

/*******************************************************/
/* Useful constants.  You may want to customize these. */

const PREFERRED_SALES_CITY = "YYZ";
const PREFERRED_DEPARTURE_CITY = PREFERRED_SALES_CITY;  // Usually a safe guess

// Original credit http://www.ratg.org/images/floaters/icons/airport_icon.gif
const ENABLE_AIRPORT_ICON = true;
const AIRPORT_ICON = "http://johnath.com/extras/airport_icon.gif"; 
const AIRPORT_CODESHEET = "http://www.orbitz.com/pagedef/content/air/airportCodes.jsp?popupsDisabled=false";

// Used to add mileage calc links to search results
const ENABLE_MILEAGE_LINKS = true;
const EXTRA_WEBFLYER_PARAMS = 'min=500';
const MILEAGE_CALCULATOR_URL = 'http://webflyer.com/travel/milemarker/getmileage.php?' + EXTRA_WEBFLYER_PARAMS + '&city=';
const MILEAGE_CALCULATOR_DELIM = '&city=';

// Used to add a link to the action bar along the top right directly to query construction
const ADVANCED_QUERY_HELP_URL = 'http://matrix.itasoftware.com/cvg/dispatch/help/advanced-topics';

/* Probably nothing worth customizing below this line -- */
/*********************************************************/

/*****************************************/
/* Auto-set default sales/departure city */
/*****************************************/

var salesCity = document.getElementsByName("cvgQuery.salesCity")[0];
if(salesCity) {
	salesCity.value = PREFERRED_SALES_CITY;
}

// Departure city is one of two names depending on the type of search being done
var departureCity = document.getElementsByName("cvgQuery.outboundSlice.originSet.userInput")[0] || 
			document.getElementsByName("cvgQuery.sliceArray[0].originSet.userInput")[0];

if(departureCity) {
	departureCity.value = PREFERRED_DEPARTURE_CITY;
}

/****************************/
/* Add airport lookup popup */
/****************************/

// Convenience method to build the HTML for an airport lookup page popup
function buildAirplaneLink() {

	// Build an anchor-wrapped img tag that launches the airport code ref
	var anchorTag = document.createElement("a");
	anchorTag.addEventListener("click", function() {
		window.open(AIRPORT_CODESHEET, "", "width=600px, height=600px, resizable, scrollbars=yes")
	}, true);
	anchorTag.target = "_top";
	anchorTag.href = "#";
	anchorTag.title = "Airport Code Reference";
	
	var imgTag = document.createElement("img");
	imgTag.src = AIRPORT_ICON;
	imgTag.width = 16;
	imgTag.height = 16;
	imgTag.border = 0;
	imgTag.style.padding = "4px 0px 0px 2px";

	anchorTag.appendChild(imgTag);
	return anchorTag;
}

// Add airport lookup after departure and return city inputs 
if(ENABLE_AIRPORT_ICON && departureCity) {
	departureCity.parentNode.insertBefore(buildAirplaneLink(), departureCity.nextSibling);
}

var returnCity = document.getElementsByName("cvgQuery.outboundSlice.destinationSet.userInput")[0];
if(ENABLE_AIRPORT_ICON && returnCity) {
	returnCity.parentNode.insertBefore(buildAirplaneLink(), returnCity.nextSibling);
}

/****************************************************/
/* Add link to Advanced Query Construction help doc */
/****************************************************/

// Only add this to the action bar on search pages
if(document.URL.indexOf('http://matrix.itasoftware.com/cvg/dispatch/prego') >= 0) {

	// We want to add an entry to the table created at the top right as a command bar
	var commandBarTable = document.getElementsByTagName('table')[0];
	var anchors = commandBarTable.getElementsByTagName('a');
	for(a = 0; a < anchors.length; a++) {
		if(anchors[a].href.indexOf('/cvg/dispatch/help') >= 0) {
			// This is the existing help link.  Insert a couple of extra nodes in after this one, with 
			// our second help link
			var parentNode = anchors[a].parentNode;
			var nextSibling = anchors[a].nextSibling;
			
			var newLink = document.createElement('a');
			newLink.href = ADVANCED_QUERY_HELP_URL;
			newLink.innerHTML = "Advanced Query Help";
			newLink.target = "_blank";
			
			// Now insert a spacer and our new help link
			parentNode.insertBefore(document.createTextNode("  -  "), nextSibling);
			parentNode.insertBefore(newLink, nextSibling);
					
			break;
		}
	}
	
	
}


/***********************************************************************/
/*  Add WebFlyer links to search results (to calculate total mileage)  */
/***********************************************************************/

if(ENABLE_MILEAGE_LINKS && 
	((document.URL.indexOf("http://matrix.itasoftware.com/cvg/dispatch/bonsaiproxy/bsp") >= 0) ||
	(document.URL.indexOf("http://matrix.itasoftware.com/cvg/dispatch/bonsaiproxy/ps") >= 0)))	{

	// This is a search results pane.  Basically it's just a big table, with one itinerary per row.  
	// Our approach will be to iterate over the list of <tr>'s, and for each one, add a new <td> to the end
	// with webflyer links.  Building the webflyer links requires us to know which cities are visited,
	// so stay tuned for crazy parse semantics.  Note that the for loop skips the first row, since that is
	// column headers
	var trList = document.body.getElementsByTagName("tr");
	for(i = 1; i < trList.length; i++) {
		var currentRow = trList[i];
		var tdList = currentRow.getElementsByTagName("td");
		
		// Each row has several <td>'s in it, unsurprisingly.  The ones we care about are
		// the 5th (index 4) which contains origins and destinations, and the 6th (index 5)
		// which has information about layovers.  The site is helpful enough to wrap all airport
		// codes in <span> tags with title text to allow for tooltips -- this also makes it easy for us
		// to extract airport codes since we can just pull the text content of each span tag.  We don't
		// know how many legs the trip will have - 1 (one-way), 2 (round trip) and N (multi-leg) are possible,
		// so we store the legs in an array, and keep track of which leg we're currently working with
		var legs = new Array();
		legs[0] = new Array();
		var currentLeg = 0;
		
		// Parse the origin/destination column
		for(tdChild = 0; tdChild < tdList[4].childNodes.length; tdChild++) {
			var nextChild = tdList[4].childNodes[tdChild];
			if(nextChild.tagName == "SPAN") {
				// Span tags have airport codes as children, push the content to the appropriate list
				legs[currentLeg].push(nextChild.innerHTML);
			} else if (nextChild.tagName == "BR") {
				// A <br> tag separates each travel leg, so we must be done with the previous leg
				currentLeg++;
				legs[currentLeg] = new Array();
			}			
		}
		
		// We now have a complete list of travel legs, but each leg could include multiple layovers.
		// Scan the layover column for additional stops, and insert them into the appropriate legs.  Reset
		// the currentLeg counter since we're starting from the beginning again.
		
		currentLeg = 0;
		for(tdChild = 0; tdChild < tdList[5].childNodes.length; tdChild++) {
			var nextChild = tdList[5].childNodes[tdChild];
			if(nextChild.tagName == "SPAN") {
				// We have a layover.  We want to add it to the end of the list, except that we already have
				// the final destination on the end, so pop that into a temp var first
				var dest = legs[currentLeg].pop();
				legs[currentLeg].push(nextChild.innerHTML);
				legs[currentLeg].push(dest);
			} else if (nextChild.tagName == "BR") {
				currentLeg++;
			}
		}
		
		// The list is complete.  Add a TD to this row and within it add webflyer links for each leg.
		var newTD = document.createElement("td");
		for(leg = 0; leg < legs.length; leg++) {
			if(legs[leg] && legs[leg].length > 0) {
				var newAnchor = document.createElement("a");
				newAnchor.href = MILEAGE_CALCULATOR_URL + legs[leg].join(MILEAGE_CALCULATOR_DELIM);
				newAnchor.setAttribute("style", "text-decoration: none;");
				newAnchor.innerHTML = "WebFlyer for " + legs[leg].join();
				newTD.appendChild(newAnchor);
				newTD.appendChild(document.createElement('br'));
			}
		}
		currentRow.appendChild(newTD);
	}
}

/**********************************************************/
/* Augment the list of available windows in 30 day search */
/**********************************************************/
var flexDateCombo = document.getElementsByName('cvgQuery.flexDateDuration')[0];
if(flexDateCombo && flexDateCombo.tagName == "SELECT") {
	// We found our combo box, add some other useful values.  Insert them second in the list, since having 1
	// week at the top of the list still makes sense
	var insertionPoint = flexDateCombo.firstChild.nextSibling;
		
	// Two week option
	var newOption = document.createElement('option');
	newOption.value = '13-15';
	newOption.innerHTML = 'about 2 weeks (13-15)';
	flexDateCombo.insertBefore(newOption, insertionPoint);
	
	// Three week option
	newOption = document.createElement('option');
	newOption.value = '20-22';
	newOption.innerHTML = 'about 3 weeks (20-22)';
	flexDateCombo.insertBefore(newOption, insertionPoint);
	
	// Custom option (defaults to 1-1, but basically exists to trigger the listener which plugs in 
	// your own values - see below)
	newOption = document.createElement('option');
	newOption.value = '1-1';
	newOption.innerHTML = 'Custom...';
	flexDateCombo.insertBefore(newOption, insertionPoint);
	
	// 0-1 night option
	newOption = document.createElement('option');
	newOption.value = '0-1';
	newOption.innerHTML = '0-1 nights';
	flexDateCombo.insertBefore(newOption, insertionPoint);
		
	flexDateCombo.addEventListener("change", function(e) {
		
		// If the user selected custom, prompt them and build a new option
		var target = e.currentTarget;
		if(target.selectedIndex >= 0 && target.options[target.selectedIndex].text == 'Custom...') {
			var fromNights = window.prompt("Building Custom interval.  From how many nights?");
			if(!fromNights) {
				target.selectedIndex = 0;
				return;
			}
			
			var toNights = window.prompt("To how many nights?");
			if(!toNights) {
				target.selectedIndex = 0;
				return;
			}
			
			var newOption = document.createElement('option');
			newOption.value = fromNights + '-' + toNights;
			newOption.innerHTML = 'Custom (' + newOption.value + ')';
			target.appendChild(newOption);
			target.selectedIndex = target.options.length - 1;				
		}
		
	}, true);
}



