// ==UserScript==
// @name          View geocache in KMS
// @namespace     Zentriple
// @description	  The script makes a link to KMS next to the UTM coordinates in any geocache page. The link opens the UTM coordinates in the danish Kort- & Matrikelstyrelsen map.
// @include       http://geocaching.com/geocache/*
// @include       http://www.geocaching.com/geocache/*
// @grant         none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @downloadURL   https://userscripts.org/scripts/source/100395.user.js
// @updateURL     https://userscripts.org/scripts/source/100395.meta.js
// @version       2013.8.23
// ==/UserScript==

(function() {

	// CSS (jQuery) selectors
	var utm_coordinates_element = $('#ctl00_ContentBody_LocationSubPanel'); // Element where we will grab the coordinates from
	var online_maps_element = $('#ctl00_ContentBody_MapLinks_MapLinks'); // Element for "For online maps..." list

	// Only continue if there are UTM coordinates in the page
	if($(utm_coordinates_element).length) {

		// Get the string and strip whitespaces
		$(utm_coordinates_element).find('br').remove();
		var coordinate_string = $(utm_coordinates_element).html().trim();

		// Function to find first occurrence in string - http://phpjs.org/functions/strpos:545
		function strpos (haystack, needle, offset) {
			var i = (haystack+'').indexOf(needle, (offset || 0));
			return i === -1 ? false : i;
		}

		// Find positions where N and E coordinates start
		var e_position = strpos(coordinate_string, ' E ', 0);
		var n_position = strpos(coordinate_string, ' N ', 0);
		
		// Only continue if both E and N exist in the string
		if(e_position !== false && n_position !== false) {
			// Get the N and E coordinates
			var e_coordinate = coordinate_string.substr(e_position+3, (n_position+3)-(e_position+3)-3);
			var n_coordinate = coordinate_string.substr(n_position+3, coordinate_string.length-n_position-3);

			// Append the KMS link to the end of the coordinates
			var kms_link = 'http://kmswww3.kms.dk/kortpaanettet/index.htm?searchType=c_COORDINATES&serviceName=topo25&inputSogedata='+n_coordinate+';'+e_coordinate;
			$(online_maps_element).append('<li><a id="kms_link_list" target="_blank" href="'+kms_link+'">Kort- & Matrikelstyrelsen</a></li>');
			$(utm_coordinates_element).after(' <a id="kms_link" target="_blank" href="'+kms_link+'">KMS</a><br />');
		}
	}

})();
