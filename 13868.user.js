// ==UserScript==
// @name           Steepandcheap.com (SAC) Quantities
// @author         Steve Kreis
// @namespace      sac
// @description    Displays item quantities beneath bar graphs.
// @version        0.1
// @include        http://www.steepandcheap.com/*
// ==/UserScript==

/** the timer used to poll for updated quantities - in seconds */
var timer = 20;
/** the url used for polling the most recent data */
var url   = "http://www.steepandcheap.com";

/**
 * Send the request to update the quantities
 */
function update()
{
	var req = new XMLHttpRequest();
	// specify how to handle the response from the request to obtain the latest amounts
	req.onreadystatechange = function(){
		// when loaded
		if (req.readyState == 4) {
    		// if "OK"
        	if (req.status == 200) {
        		doReplace(req.responseText);
        	} 
    	}
	};
	var curTime = new Date().getTime();
	req.open("GET", url + "?t=" + curTime, true);
	req.send("");
	window.setTimeout(update, 1000 * timer);
}

/**
 * Start the procedure
 */
update();

/**
 * Replaces the fields by appending the updated values
 * below the item name and description
 * @param body - the body returned by the ajax request for the entire page
 */
function doReplace(body)
{
	// obtain the various item selections
	var opts = document.getElementById('sizeSelectBox');

	// obtain the display container
	var variantsDiv = document.getElementById('variants_inv');

	// obtain the fields within the display container
	var fields = getElementsByClass('variant',variantsDiv,'div');

	// determin if items have values - if none
	// we need to reload the page because the items have changed
	var hasCount = false;
	
	// iterate the selection items
	for(var n=1; n < opts.length; n++)
	{
		// grab the item id used to map fields
		var itemId = opts[n].value;
		// get the on hand and total amounts of the items
		var onHand = getValue("id=\"onhand" + itemId + "\" class=\"on_hand\">",body);
		var total  = getValue("id=\"totalinventory" + itemId + "\" class=\"total_inventory\">",body);
		
		hasCount = (onHand != "-" && total != "-") ? true : hasCount;

		var status = "<b>" + onHand + "</b> of " + total;
		
		// update the field to display the onhand & total amounts
		if(document.getElementById("quan" + itemId) == undefined)
		{
			fields[n-1].innerHTML = fields[n-1].innerHTML + "<div id=\"quan" + itemId + "\" style=\"float:left;margin-left:25px;color:rgb(153,1,0);\">&nbsp;</div>";
		}
		onHand = (onHand == "-") ? 0 : onHand;
		total  = (total == "-") ? 0 : total;

		var percent = onHand / total;
		if(onHand == 0 && total == 0)
		{
			status = "Sold Out";
			percent = 0;
		}
		
		document.getElementById("quan" + itemId).innerHTML = "<small>" + status + "</small>";
		
		// update the bar graphs using the same technique as the site
		document.getElementById("onhand" + itemId).style.width = percent*116+'px';
		document.getElementById("totalinventory" + itemId).style.width = (total-onHand)/total*148+'px';
	}
	
	if(!hasCount)
	{
		location.replace(url);
	}
}

/**
 * Returns the value inside of an element 
 * This is a very crude implementation of a full-text search.
 * @param search - the string to search for
 * @param str - the string to search within
 */
function getValue(search,str)
{
	var index = str.indexOf(search);
	return (index == -1) 
	  	   ? "-"
		   : str.substring(index + search.length, str.indexOf("<", index + search.length));
}

/**
 * Returns all elements which match a classname within a 
 * node of a specific tag type
 * @param clazz - the name of the class to match
 * @param node - the node to iterate
 * @param tag - the tag type
 */
function getElementsByClass(clazz,node,tag) {
	var classElements = new Array();
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+clazz+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}