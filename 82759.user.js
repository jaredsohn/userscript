// ==UserScript==
// @name           Redfin optimizer
// @namespace      mrbb.org
// @description    Optimize Redfin UI
// @include        http://www.redfin.com/*
// ==/UserScript==



function main() {

	// Wait for jQuery
	if ( unsafeWindow.jQuery === undefined) {
		window.setTimeout(main, 250);
		return;
	}
		var j = unsafeWindow.jQuery;

function highlight(node) { somelight(node, "blue"); }
function lowlight(node) { somelight(node, "red"); }


function somelight(node, fontcolor) {
 node
 .css("font-weight", "bold")
 .css("color", fontcolor)
 .css("background-color", "light-yellow");
}


/** Extract "n" from "blah: n" */
function getNumericalValue(node) {
	try {
		total = 0;
		contents = node.text().split("\n");
		console.log(contents);
		for (var i = 0; i < contents.length; i++) {
			fields = contents[i].split(":");
			total += fields.length > 1 ? parseInt(fields[1]) : 0;
		}
		console.log("Numeric: " + total);
		return total; 	
} catch (e) {
		console.log(e);
	return 0;
	}
};

function getLevel(node) {
	return node.text().match("on (.*) Level")[1];
};


/** Toggle collapse/expand of Amenity list blocks. */
function toggle_amenities(headers) {
   for (i = 0; i < headers.length; i++) {
        console.log("toggling " + headers[i]);
       j(".amenity_set :contains('" + headers[i] + "') + .amenity_list" ).toggle();
   }
};


function select_amenity_containing_contents(header, contents) { 
	var selector = ".amenity_set :contains('" + header + "') + .amenity_list :contains('"  + contents + "')";
console.log(selector);
	return j(selector);
}



// Hide stuff we don't care about.
j(".sidebar").hide();
// j("#similar_listings").hide();
// j("#similar_sales").hide();

// Remove extra spacing between amenity blocks.
j(".amenity_set").css("margin-top", "2px");

// Enable click-to-toggle display of amenity blocks.
j(".amenity_set h4").bind("click", function(e) { 
     var header = j(this).text(); 
     console.log("Clicked on " + header);
     toggle_amenities([header]);
});


// Collapse uninteresting amenities.
toggle_amenities([
 'Interior Features', 'Fireplace Information', 'Flooring Information', 
 'Building Information', 'Equipment', 
 'Lot Information', 'School Information', 'Property Features', 'Location Information',
 'Utility Information',  'Financial Information'
]);


	var utility = select_amenity_containing_contents("Room Information",  "Utility");
	var utilityLevel = getLevel(utility);
	var lightup = (utilityLevel == "Upper" || utilityLevel == "Upper") ? highlight : lowlight;
	lightup(utility);


	// Highlight especially interesting information.
	var upperBedrooms = select_amenity_containing_contents("Bedroom Information",  "(Upper)");
	if (!upperBedrooms.text()) {
		// Rambler
		 upperBedrooms = select_amenity_containing_contents("Bedroom Information",  "(Main)");
	}
	var numUpperBedrooms = getNumericalValue(upperBedrooms);

	{
	var lightup = (numUpperBedrooms >= 3) ? highlight : lowlight;
	lightup(upperBedrooms);
	}

	var upperBathrooms = select_amenity_containing_contents("Bathroom Information", "Upper");
	if (!upperBathrooms.text()) {
		// Rambler
		 upperBathrooms = select_amenity_containing_contents("Bathroom Information",  "Main");
	}
	var numUpperBathrooms = getNumericalValue(upperBathrooms);

	{
	var lightup = (numUpperBathrooms >= 2) ? highlight : lowlight;
	lightup(upperBathrooms);
	}

	highlight(select_amenity_containing_contents("Property Information",  "Sq. Ft."));
	
	//alert ("Upper floor: " + numUpperBedrooms + " BR, " + numUpperBathrooms + " BA");
}


function setup() {
	var s = document.createElement('script');
	s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js');
	document.body.appendChild(s);
	main();
}

setup();

