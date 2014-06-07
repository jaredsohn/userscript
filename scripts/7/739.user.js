// ==UserScript==
// @name          My Google Maps
// @namespace     http://justinsomnia.org/
// @description	  Defaults Google Maps to the Directions interface and accepts default values for the starting and/or destination addresses
// @include       http://maps.google.*/
// ==/UserScript==

(function() {

	// check to see if a start address has been set
	// if not set the start address
	if (typeof(GM_getValue('start_address')) == "undefined") 
	{
		start_address = prompt("Enter a default starting address for Google Maps (or leave blank)");
		
		GM_setValue('start_address', start_address);
	} 
	else 
	{
		start_address = GM_getValue('start_address');
	}

	// check to see if a destination address has been set
	// if not set the destination address
	if (typeof(GM_getValue('destination_address')) == "undefined") 
	{
		destination_address = prompt("Enter a default destination address for Google Maps (or leave blank)");
		GM_setValue('destination_address', destination_address);
	} 
	else 
	{
		destination_address = GM_getValue('destination_address');
	}

	// get references to input boxes and set default values
	start_input_box       = document.getElementById("start");
	destination_input_box = document.getElementById("end");

	start_input_box.setAttribute("value", start_address);
	destination_input_box.setAttribute("value", destination_address);

	// enclose in event listener so this happens after the onload event
	window.addEventListener("load", function(e) {
		
		// set form to directions
		_form('directions', false);
		
		// determine what has the focus based on which default values exist
		if (start_address == "")
		{
			start_input_box.focus();
		}
		else if (destination_address == "")
		{
			destination_input_box.focus();
		}
		else
		{
			document.getElementById("submitd").focus();
		}


	}, false);


})();