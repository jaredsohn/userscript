// This script presents the collected flags visually using google chart API
//
// Some of the functionality is heavily inspired by the
// FoxtrickFlagCollectionToMap module in Foxtrick
// https://www.mozdev.org/projects/overview/foxtrick/
// 
// version 0.3.1
// 2009-05-02
// Copyright (c) 2009, Mikkel Bundgaard
// Released under the Creative Commons Attribution 3.0 Unported license
// http://creativecommons.org/licenses/by/3.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Collect Flags Map", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Collect Flags Map
// @namespace      http://www.teamhb.org/
// @description    Shows a visual representation of the collected flags using google chart API
// @copyright      2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license        (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version        0.3.1
// @include        http://www.teamhb.org/index.php?page=team
// @include        http://teamhb.org/index.php?page=team
// @include        http://www.teamhb.org/index.php?page=team&team_id=*
// @include        http://teamhb.org/index.php?page=team&team_id=*
// @contributor    Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// ==/UserScript==

window.setTimeout( function() 
{
    /**
     * Build the url for the map image
     * Example: http://chart.apis.google.com/chart?cht=t&chs=440x220&chco=ffffff,339933,FF3300&chd=s:A9AA9A&chld=USCAAUFINODK&chtm=world&chf=bg,s,EAF7FE
     */
    function getMapUrl(areaParam, countryCodes, colorOrder) {
        var base = 'http://chart.apis.google.com/chart';
        var chartType = '?cht=t';
	var dimensions = '&chs=440x220';

	// Default country color: black, 
	// Gradient from blue (visited) to yellow (no visited)
        var colors = '&chco=white,blue,yellow'; 
        var order = '&chd=s:' + colorOrder;
        var countries = '&chld=' + countryCodes;
        var area = '&chtm=' + areaParam;
	// Water is light blue
        var background = '&chf=bg,s,EAF7FE';

        var url = base + chartType + dimensions + colors + area + 
	    background + order + countries;

        return url;
    }

    /**
     * Update the presentation on the homepage.
     */
    function updatePage(container, codes, colouringOrder, maximalTop,numFlags) {
	// First create all the urls (for the different presentations)
	var urlAfrica = getMapUrl('africa', codes, colouringOrder);
	var urlAsia = getMapUrl('asia', codes, colouringOrder);
	var urlEurope = getMapUrl('europe', codes, colouringOrder);
	var urlMEast = getMapUrl('middle_east', codes, colouringOrder);
	var urlSAmerica = getMapUrl('south_america', codes, colouringOrder);
	var urlWorld  = getMapUrl('world', codes, colouringOrder); 

	// Create references to the different presentations
	var mapHtml = '<a href="#" onclick="document.getElementById(\'collected-flags-map\').src=\''+
	    urlAfrica +'\';return false;">Africa</a> |  ';
	mapHtml +=    '<a href="#" onclick="document.getElementById(\'collected-flags-map\').src=\''+
	    urlAsia  +'\';return false;">Asia</a> |  ';
	mapHtml +=    '<a href="#" onclick="document.getElementById(\'collected-flags-map\').src=\''+
	    urlEurope +'\';return false;">Europe</a> |  ';
	mapHtml +=    '<a href="#" onclick="document.getElementById(\'collected-flags-map\').src=\''+
	    urlMEast +'\';return false;">Middle East</a>  | ';
	mapHtml +=    '<a href="#" onclick="document.getElementById(\'collected-flags-map\').src=\''+
	    urlSAmerica +'\';return false;">South America</a> |  ';
	mapHtml +=    '<a href="#" onclick="document.getElementById(\'collected-flags-map\').src=\''+
	    urlWorld +'\';return false;">World</a>';
	mapHtml += ' | <span style="font-family:Verdana,Arial,sans-serif; font-size:12px">' + numFlags[0] + ' out of ' + colouringOrder.length + ' flags collected.</span><br/>';
	mapHtml +=    '<img alt="Map" id="collected-flags-map" src="' 
	    + urlWorld + '"/>';

	
	// Find the maximal top to be able to insert the image below the flags
	var lastHeightNum = parseInt(maximalTop.match(/([0-9]+)px/)[1],10);

	// Create div-element to contain the image (and references)
	var newElement = container.appendChild(document.createElement('div'));
	newElement.innerHTML = mapHtml;
	newElement.style.position = 'absolute';
	newElement.style.left = '10px';
	newElement.style.top = (lastHeightNum + 20) + 'px';

	// Make the height of the parent element larger such that it
	// can contain the image
	var height = container.style.height;
	var heightNum = parseInt(height.match(/([0-9]+)px/)[1],10);
	container.style.height = (heightNum + 245) + 'px';
    }

    /**
     * Returns an array where index i is true if country with id i has been visited
     * otherwise index i is false.
     */
    function collectedFlags(flags,length,numFlags) {
	var collected = [];

	collected.length = length;

	// Initialise array
	for (var i = 1; i < collected.length; i++) {
	    collected[i] = false;
	}
	var re  = /([0-9]+)\.gif$/;
	
	// Collect countrycodes
	for (var j = 0; j < flags.snapshotLength; j++) {
	    // Extract the id's from the urls. Ie. 
	    // "http://www.teamhb.org/images/flags/byid/22.gif" => "22"
	    var num = flags.snapshotItem(j).src.match(re)[1];
	    collected[num] = true;
	    numFlags[0]++;
	}
	return collected;
    }


    /**
     * Creates a collection from "contry-number" in THB to 
     * google's "country code"
     */
    function createCollection() {
	// Country codes taken from 
	// http://code.google.com/apis/chart/isocodes.html
	// col: INT -> STR, i.e. "contry-number" in THB to google "country code"
	var col = [];
	col[1] = 'CA';
	col[2] = 'US';
	col[3] = 'AR';
	col[4] = 'CO';
	col[5] = 'BO';
	col[6] = 'BR';
	col[7] = 'CL';
	col[8] = 'CR';
	col[9] = 'MX';
	col[10] = 'UY';
	col[11] = 'AT';
	col[12] = 'BE';
	col[13] = 'HR';
	col[14] = 'DK';
	col[15] = 'FI';
	col[16] = 'FR';
	col[17] = 'JP';
	col[18] = 'GR';
	col[19] = 'HU';
	col[20] = 'PL';
	col[21] = 'IE';
	col[22] = 'NO';
	col[23] = 'MT';
	col[24] = 'NL';
	col[25] = 'IT';
	col[26] = 'IS';
	col[27] = 'PT';
	col[28] = 'RO';
	col[29] = 'RU';
	col[30] = 'CS';
	col[31] = 'SI';
	col[32] = 'ES';
	col[33] = 'SE';
	col[34] = 'CH';
	col[35] = 'TR';
	col[36] = 'GB';
	col[37] = 'CN';
	col[38] = 'IN';
	col[39] = 'ID';
	col[40] = 'DE';
	col[41] = 'KR';
	col[42] = 'MY';
	col[43] = 'SG';
	col[44] = 'DZ';
	col[45] = 'IL';
	col[46] = 'MA';
	col[47] = 'ZA';
	col[48] = 'TN';
	col[49] = 'AE';
	col[50] = 'AU';
	col[51] = 'NZ';
	col[52] = 'FJ';
	col[53] = 'BA';
	col[54] = 'LT';
	col[55] = 'CZ';
	col[56] = 'LV';
        col[57] = 'PY';
	col[58] = 'BG';
	col[59] = 'UA';
	col[60] = 'EE';

	return col;
    }


    /**
     * Returns the colouring of the collected array (an array of booleans)
     * as a string (the concatenation of the individual elements). If the 
     * element is true, then we set the colouring to 'A' (the beginning of the
     * gradient), else we set the colouring to '9' (the end of the gradient).
     * Ie. [true,true,false] => 'AA9'
     */
    function getOrder(collected){
	var mapFun = function(isCollected) {
	    if (isCollected) {
		return 'A';
	    } 
	    else {
		return '9';
	    }
	};
	
        var orderArr = collected.map(mapFun);
	var orderString = orderArr.join('');

        return orderString;
    }

    // First collect all the flags (i.e. the img-tags containing the flag-images)
    var flags = document.evaluate(
		     '//*[@id="home_wrapper"]/div[4]/img',
		     document,
		     null,
		     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		     null);

    // Test whether the club has any flags (i.e. the club is a supporter)
    if (flags.snapshotLength === 0) {
	return;
    }

    // Create the string of country codes
    var col = createCollection();
    var codes = col.join('');

    // Hack to pass variable by reference
    var numFlags = [0];
    // Create an array of visited countries, ie. if country with id
    // 3 is visited then entry 3 in collected is true, otherwise false
    var collected = collectedFlags(flags,col.length,numFlags);

    // Create string representing the colouring of the countries
    var colouringOrder = getOrder(collected);

    // Find parent element and maximal top-value of the images
    var container = flags.snapshotItem(0).parentNode;
    var maximalTop = flags.snapshotItem(flags.snapshotLength-1).style.top;

    // Update the page
    updatePage(container, codes, colouringOrder, maximalTop,numFlags);
}, 100);