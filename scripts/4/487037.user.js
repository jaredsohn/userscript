// ==UserScript==
// @name 			TF2R Distribution Method Detector
// @version 		1.0
// @description 	Adds info on the type of raffle.
// @include 		http://tf2r.com/k*.html
// @copyright 		The_Catman
// ==/UserScript==


/*
// Function already used on site, should not be needed here.
function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
*/

// Find the raffle's UID
var raffle = window.location.pathname;
raffle = raffle.replace(/^\/k/g, "");
raffle = raffle.replace(/\.html/g, "");

// Create raffle type display elements
var label = document.createElement('td');
//label.id = 'split_label';
$(label).html("Distribution: ");
var type = document.createElement('td');
type.id = 'split_type';
$(type).html("...");
$('#entry').attr('colspan', '');
$('#entry').after(type).after(label);

//Determine the type of raffle via (not so)fancy mathematics
$.ajax({
	type: "post",
	url: "http://tf2r.com/job.php",
	dataType: "json",
	data: {
		"checkraffle": "true",
		"rid": raffle,
        "lastentrys": 0,
		"lastchat": 0
	},
	success: function(data){
        if(roundNumber(data.message.wc * data.message.cur_entry, 0) == 100)
            $("#split_type").html("All items to one winner");
        else
            $("#split_type").html("Single item per winner");
	}
});