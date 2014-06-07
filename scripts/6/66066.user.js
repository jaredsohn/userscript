// Copyright (c) 2010 Foppe Hemminga
// Licence: GNU General Public Licence (GPL)
// Feel free to copy, distribute, sell, modify and enjoy this script
// as long as you obey either the GPL 2 or GPL 3 licence.
//
// This script is for Torn City (http://www.torn.com). It will keep track of
// your battle stats.
// Usage: View the index page of Torn City and enjoy a nice graph.

// ==UserScript==
// @name            TornMagicStats
// @version         20100223.1
// @namespace       http://www.hemminga.net/greasemonkey
// @description     Shows your battle and working stats in a nice graph
// @author          Foppe Hemminga 'Afwas' #1337627
// @include         http://torncity.com/index.php
// @include         http://www.torncity.com/index.php
// @include         http://torn.com/index.php
// @include         http://www.torn.com/index.php
// @require 	    http://code.jquery.com/jquery-1.3.2.js
// @require 	    http://people.iola.dk/olau/flot/jquery.flot.js
// @require 	    http://people.iola.dk/olau/flot/jquery.flot.navigate.js
// ==/UserScript==

var smallest = 10000; // large to start with
var rememberI = 0;
function prune(arr){
	for(i in arr){
		if(i > 0){
			var test = arr[i+1] - arr[i-1];
			if(test < smallest){
				smallest = test;
				rememberI = i;
			}
		}
	}
	return rememberI;
}
			
			
jQuery(document).ready(function(){
	var TS_speed = "";
	var TS_strength = "";
	var TS_defence = "";
	var TS_dexterity = "";
	var TS_stats; // Object
	var TS_manual = "";
	var TS_intelligence = "";
	var TS_endurance = "";
	var TS_statsW; // Object
	var TS_settingsStats = new Array();
	// [0] holds the number of datapoints
	TS_settingsStats[0] = 50;
	// [1] holds whether the debug is on (1)
	// showing the just removed datapoint in the graph
	// Turn to 0 to turn off
	TS_settingsStats[1] = 1;

	// TODO: Only run in index.php where the stats are shown
	// Bug: got a zero that was recorded right after login
	// Login leads to this announcement page

	// TODO: It would save a couple of lines if I put all
	// data into one array
	// Get data
	var TS_dateStr = GM_getValue("TS_date", '');
	// Transform to array
	var TS_dateArr = TS_dateStr.split(',');
	for(i in TS_dateArr){
		if(TS_dateArr[i] == '' || TS_dateArr[i] == 0 || TS_dateArr[i] == "0"){
			TS_dateArr.splice(i, 1);
		}	
	}

	var TS_speedStr = GM_getValue("TS_speed", '');
	var TS_speedTimeStr = GM_getValue("TS_speedTime", '');
	var TS_speedArr = TS_speedStr.split(',');
	var TS_speedTimeArr = TS_speedTimeStr.split(',');
	for(i in TS_speedArr){
		// Grr, it seems to be an integer now ?!?
		// TODO: This is not the proper fix for the bug
		// mentioned earlier in the code (see line ~38)
		if(TS_speedArr[i] == '' || TS_speedArr[i] == 0 || TS_speedArr[i]== "0"){
			TS_speedArr.splice(i, 1);
			TS_speedTimeArr.splice(i, 1);
		}
	//	GM_log("TS_speedArr["+i+"] : "+TS_speedArr[i]);
	}
	
	var TS_strengthStr = GM_getValue("TS_strength", '');
	var TS_strengthTimeStr = GM_getValue("TS_strengthTime", '');
	var TS_strengthArr = TS_strengthStr.split(',');
	var TS_strengthTimeArr = TS_strengthTimeStr.split(',');
	for(i in TS_strengthArr){
		if(TS_strengthArr[i] == '' || TS_strengthArr[i] == 0 || TS_strengthArr[i] == "0"){
			TS_strengthArr.splice(i, 1);
			TS_strengthTimeArr.splice(i, 1);
		}	
	}
	
	var TS_defenceStr = GM_getValue("TS_defence", '');
	var TS_defenceTimeStr = GM_getValue("TS_defenceTime", '');
	var TS_defenceArr = TS_defenceStr.split(',');
	var TS_defenceTimeArr = TS_defenceTimeStr.split(',');
	for(i in TS_defenceArr){
		if(TS_defenceArr[i] == '' || TS_defenceArr[i] == 0 || TS_defenceArr[i] == "0"){
			TS_defenceArr.splice(i, 1);
			TS_defenceTimeArr.splice(i, 1);
		}	
	}
	
	var TS_dexterityStr = GM_getValue("TS_dexterity", '');
	var TS_dexterityTimeStr = GM_getValue("TS_dexterityTime", '');
	var TS_dexterityArr = TS_dexterityStr.split(',');
	var TS_dexterityTimeArr = TS_dexterityTimeStr.split(',');
	for(i in TS_dexterityArr){
		if(TS_dexterityArr[i] == '' || TS_dexterityArr[i] == 0 || TS_dexterityArr[i] == "0"){
			TS_dexterityArr.splice(i, 1);
			TS_dexterityTimeArr.splice(i, 1);
		}	
	}
	
	var TS_manualStr = GM_getValue("TS_manual", '');
	var TS_manualTimeStr = GM_getValue("TS_manualTime", '');
	var TS_manualArr = TS_manualStr.split(',');
	var TS_manualTimeArr = TS_manualTimeStr.split(',');
	for(i in TS_manualArr){
		if(TS_manualArr[i] == '' || TS_manualArr[i] == 0 || TS_manualArr[i] =="0"){
			TS_manualArr.splice(i, 1);
			TS_manualTimeArr.splice(i, 1);
		}	
	}
	
	var TS_intelligenceStr = GM_getValue("TS_intelligence", '');
	var TS_intelligenceTimeStr = GM_getValue("TS_intelligenceTime", '');
	var TS_intelligenceArr = TS_intelligenceStr.split(',');
	var TS_intelligenceTimeArr = TS_intelligenceTimeStr.split(',');
	for(i in TS_intelligenceArr){
		if(TS_intelligenceArr[i] == '' || TS_intelligenceArr[i] ==0 || TS_intelligenceArr[i] == "0"){
			TS_intelligenceArr.splice(i, 1);
			TS_intelligenceTimeArr.splice(i, 1);
		}	
	}
	
	var TS_enduranceStr = GM_getValue("TS_endurance", '');
	var TS_enduranceTimeStr = GM_getValue("TS_enduranceTime", '');
	var TS_enduranceArr = TS_enduranceStr.split(',');
	var TS_enduranceTimeArr = TS_enduranceTimeStr.split(',');
	for(i in TS_enduranceArr){
		if(TS_enduranceArr[i] == '' || TS_enduranceArr[i] == 0 || TS_enduranceArr[i] == "0"){
			TS_enduranceArr.splice(i, 1);
			TS_enduranceTimeArr.splice(i, 1);
		}	
	}

	// Remove one point in the range 1..49 
	// randomly. This generates a random integer
	// The reasoning for this algorithm (snippet)
	// "Random number from a given range" comes from
	// http://www.webdevelopersnotes.com/tutorials/javascript/ ->
	// generating_random_numbers_javascript.php3
	// DONE: no more random. Uses prune() instead	
	// var TS_random = Math.floor(TS_settingsStats[0] * Math.random()) + 1

	// This idea is very interesting but implementing at this
	// stage is not good: time and data will run asynchronously
	// TODO: Must implement time/date array for every line
	// See other TODO regarding this issue.
	// DONE: Currently busy with just that
/*
	var TS_random = function(){
		return Math.floor(TS_settingsStats[0] * Math.random()) + 1;
	}
*/
//	GM_log("TS_random: "+TS_random);

/*
	while(TS_dateArr.length >= TS_settingsStats[0]){
		// If the number of items gets to large
		// remove the oldest
		// EDIT: Testing removal of a random point
		var TS_spliced = prune(TS_dateArr);
		TS_spliced = TS_dateArr.splice(TS_spliced, 1);
	}
*/

	while(TS_speedArr.length >= TS_settingsStats[0]){
		var prunedSpeed = prune(TS_speedArr);
		var TS_prunedSpeed = TS_speedArr.splice(prunedSpeed, 1);
		var TS_prunedSpeedTime = TS_speedTimeArr.splice(prunedSpeed, 1);
	}

	while(TS_strengthArr.length >= TS_settingsStats[0]){
		var prunedStrength = prune(TS_strengthArr);
		var TS_prunedStrength = TS_strengthArr.splice(prunedStrength, 1);
		var TS_prunedStrengthTime = TS_strengthTimeArr.splice(prunedStrength, 1);
	}

	while(TS_defenceArr.length >= TS_settingsStats[0]){
		var prunedDefence = prune(TS_defenceArr);
		var TS_prunedDefence = TS_defenceArr.splice(prunedDefence, 1);
		var TS_prunedDefenceTime = TS_defenceTimeArr.splice(prunedDefence, 1);
	}

	while(TS_dexterityArr.length >= TS_settingsStats[0]){
		var prunedDexterity = prune(TS_dexterityArr);
		var TS_prunedDexterity = TS_dexterityArr.splice(prunedDexterity, 1);
		var TS_prunedDexterityTime = TS_dexterityTimeArr.splice(prunedDexterity, 1);
	}

	while(TS_manualArr.length >= TS_settingsStats[0]){
		var prunedManual = prune(TS_manualArr);
		var TS_prunedManual = TS_manualArr.splice(prunedManual, 1);
		var TS_prunedManualTime = TS_manualTimeArr.splice(prunedManual, 1);
	}

	while(TS_intelligenceArr.length >= TS_settingsStats[0]){
		var prunedIntelligence = prune(TS_intelligenceArr);
		var TS_prunedIntelligence = TS_intelligenceArr.splice(prunedIntelligence, 1);
		var TS_prunedIntelligenceTime = TS_intelligenceTimeArr.splice(prunedIntelligence, 1);
	}

	while(TS_enduranceArr.length >= TS_settingsStats[0]){
		var prunedEndurance = prune(TS_enduranceArr);
		var TS_prunedEndurance = TS_enduranceArr.splice(prunedEndurance, 1);
		var TS_prunedEnduranceTime = TS_enduranceTimeArr.splice(prunedEndurance, 1);
	}

	// I have a feeling this can be dome more elegant.
	// On the other hand this does the job spot on.
	// (I had some troubles with nesting tables 
	// returning virtually the cpmplete page if I did
	// $("td:contains('Battle stats')").html() due to the 
	// poor html of Torn)
	// Edit: this code *is* poor, but it does the job.

/*
	TS_stats = $("tr").find(function(){
		TS_stats = $(this).closest("td:contains('Dexterity')");
		if(TS_stats.html()){
		//	TS_stats = TS_temp;
			GM_log("TS_stats : "+TS_stats.html());
		}
	})
*/

	// Manual recursion does the trick here.
	// The problem is the nesting of the tables and
	// tr's / td's on the Torn page
	TS_stats = $("tr td:contains('Dexterity')");
	TS_stats = $(TS_stats).find("td:contains('Dexterity')");
	TS_stats = $(TS_stats).find("td:contains('Dexterity')");
	TS_stats = $(TS_stats).find("td:contains('Dexterity')");
	
	// *This* is spot on!
//	var TS_statsLog =$(TS_stats).html();
//	GM_log("TS_stats : "+TS_statsLog);

	// Add id
	$(TS_stats).attr("id", "TS_statsB");
	// Resize left column through it's parent
	// That's the <tr><td> containing "Statistics:"
	var TS_parent = $("#TS_statsB").parent();
//	GM_log("TS_parent"+$(TS_parent).html());
	TS_parent = $(TS_parent).prev();
	$(TS_parent).find("td:eq(0)").attr("width", "33%");
	$(TS_parent).find("td:eq(1)").attr("width", "64%").attr("id", "TS_graphToggle")
		.html("<font face=\"Arial, Helvetica, sans-serif\" size=\"3\"><strong>Nice graph:</strong></font>");
	
	// The jQuery way of life:
	TS_speed = $(TS_stats).find("b:eq(1)").text();
//	GM_log("TS_speed : "+TS_speed);
	// Remove comma thousands seperator
	TS_speed = TS_speed.replace(/,/g, "");
	// Shortcut to turn it into an integer
	TS_speed = TS_speed * 1;
//	GM_log("TS_speed : "+TS_speed);
	
	TS_strength = $(TS_stats).find("b:eq(2)").text();
//	GM_log("TS_strength : "+TS_strength);
	TS_strength = TS_strength.replace(/[a-zA-Z,]/g, "");
	TS_strength = TS_strength * 1;
//	GM_log("TS_strength : "+TS_strength);
	
	TS_defence = $(TS_stats).find("b:eq(3)").text();
//	GM_log("TS_defence : "+TS_defence);
	TS_defence = TS_defence.replace(/[a-zA-Z,]/g, "");
	TS_defence = TS_defence * 1;
//	GM_log("TS_defence : "+TS_defence);
	
	TS_dexterity = $(TS_stats).find("b:eq(4)").text();
//	GM_log("TS_dexterity : "+TS_dexterity);
	TS_dexterity = TS_dexterity.replace(/[a-zA-Z,]/g, "");
	TS_dexterity = TS_dexterity * 1;
//	GM_log("TS_dexterity : "+TS_dexterity);
	
	// Repeat for Working stats
	TS_statsW = $("tr td:contains('Working stats')");
	TS_statsW = $(TS_statsW).find("td:contains('Working stats')");
	TS_statsW = $(TS_statsW).find("td:contains('Working stats')");
	TS_statsW = $(TS_statsW).find("td:contains('Working stats')");
	
//	var TS_statsWLog =$(TS_statsW).html();
//	GM_log("TS_statsW : "+TS_statsWLog);

	// Move to first <td> under Battle stats>
	var TS_statsWHTML = $(TS_statsW).replaceWith("<td><div style=\""
		+"height:297px; width:567px;\" id=\"TS_statsGraph\"></div>");
	TS_statsWHTML = $(TS_statsWHTML).html();
	$("<br /><br />"+TS_statsWHTML).appendTo("#TS_statsB");	

	// The jQuery way of life:
	TS_manual = $(TS_statsW).find("b:eq(1)").text();
//	GM_log("TS_manual : "+TS_manual);
	// Remove comma thousands seperator
	TS_manual = TS_manual.replace(/,/g, "");
	// Shortcut to turn it into an integer
	TS_manual = TS_manual * 1;
//	GM_log("TS_manual : "+TS_manual);
	
	TS_intelligence = $(TS_statsW).find("b:eq(2)").text();
//	GM_log("TS_intelligence : "+TS_intelligence);
	TS_intelligence = TS_intelligence.replace(/[a-zA-Z,]/g, "");
	TS_intelligence = TS_intelligence * 1;
//	GM_log("TS_intelligence : "+TS_intelligence);
	
	TS_endurance = $(TS_statsW).find("b:eq(3)").text();
//	GM_log("TS_endurance : "+TS_endurance);
	TS_endurance = TS_endurance.replace(/[a-zA-Z,]/g, "");
	TS_endurance = TS_endurance * 1;
//	GM_log("TS_endurance : "+TS_endurance);
	
	// Add data to arrays
	var TS_date = new Date();
	// convert to milliseconds from 1970/1/1
	var TS_time = TS_date.getTime(); 
	TS_speedTimeArr.unshift(TS_time);
	TS_strengthTimeArr.unshift(TS_time);
	TS_defenceTimeArr.unshift(TS_time);
	TS_dexterityTimeArr.unshift(TS_time);
	TS_manualTimeArr.unshift(TS_time);
	TS_intelligenceTimeArr.unshift(TS_time);
	TS_enduranceTimeArr.unshift(TS_time);
	
	// TODO: in some cases 0 or "0" is
	// generated for all these variables.
	// Find out when and why and prevent
	// storing that zero
	if(TS_speed == 0){
		Alert("Line 301: TS_speed "+TS_speed)
	}
	TS_speedArr.unshift(TS_speed);
	TS_strengthArr.unshift(TS_strength);
	TS_defenceArr.unshift(TS_defence);
	TS_dexterityArr.unshift(TS_dexterity);
	TS_manualArr.unshift(TS_manual);
	TS_intelligenceArr.unshift(TS_intelligence);
	TS_enduranceArr.unshift(TS_endurance);

	// Store if anything has changed
	// TODO: Likely the graphs get more exciting if I add a time/date for every stat individually.
	// Now all stats are recorded if one stat changes.
	// DONE
	if(TS_speedArr[0] != TS_speedArr[1]){
		GM_setValue("TS_speed", TS_speedArr.join(","));
		GM_setValue("TS_speedTime", TS_speedTimeArr.join(","));
	}
	if(TS_strengthArr[0] != TS_strengthArr[1]){
		GM_setValue("TS_strength", TS_strengthArr.join(","));
		GM_setValue("TS_strengthTime", TS_strengthTimeArr.join(","));
	}
	if(TS_defenceArr[0] != TS_defenceArr[1]){
		GM_setValue("TS_defence", TS_defenceArr.join(","));
		GM_setValue("TS_defenceTime", TS_defenceTimeArr.join(","));
	}
	if(TS_dexterityArr[0] != TS_dexterityArr[1]){
		GM_setValue("TS_dexterity", TS_dexterityArr.join(","));
		GM_setValue("TS_dexterityTime", TS_dexterityTimeArr.join(","));
	}
	if(TS_manualArr[0] != TS_manualArr[1]){
		GM_setValue("TS_manual", TS_manualArr.join(","));
		GM_setValue("TS_manualTime", TS_manualTimeArr.join(","));
	}
	if(TS_intelligenceArr[0] != TS_intelligenceArr[1]){
		GM_setValue("TS_intelligence", TS_intelligenceArr.join(","));
		GM_setValue("TS_intelligenceTime", TS_intelligenceTimeArr.join(","));
	}
	if(TS_enduranceArr[0] != TS_enduranceArr[1]){
		GM_setValue("TS_endurance", TS_enduranceArr.join(","));
		GM_setValue("TS_enduranceTime", TS_enduranceTimeArr.join(","));
	}

	// Create the two-dimensional arrays
	var TS_flotSpeedArr = new Array();
	var TS_flotStrengthArr = new Array();
	var TS_flotDefenceArr = new Array();
	var TS_flotDexterityArr = new Array();
	var TS_flotManualArr = new Array();
	var TS_flotIntelligenceArr = new Array();
	var TS_flotEnduranceArr = new Array();

	for(i in TS_speedArr){
		TS_flotSpeedArr[i] = new Array();
		TS_flotSpeedArr[i][0] = TS_speedTimeArr[i];
		TS_flotSpeedArr[i][1] = TS_speedArr[i];
	}
	for(i in TS_strengthArr){
		TS_flotStrengthArr[i] = new Array();
		TS_flotStrengthArr[i][0] = TS_strengthTimeArr[i];
		TS_flotStrengthArr[i][1] = TS_strengthArr[i];
	}
	for(i in TS_defenceArr){
		TS_flotDefenceArr[i] = new Array();
		TS_flotDefenceArr[i][0] = TS_defenceTimeArr[i];
		TS_flotDefenceArr[i][1] = TS_defenceArr[i];
	}
	for(i in TS_dexterityArr){
		TS_flotDexterityArr[i] = new Array();
		TS_flotDexterityArr[i][0] = TS_dexterityTimeArr[i];
		TS_flotDexterityArr[i][1] = TS_dexterityArr[i];
	}
	for(i in TS_manualArr){
		TS_flotManualArr[i] = new Array();
		TS_flotManualArr[i][0] = TS_manualTimeArr[i];
		TS_flotManualArr[i][1] = TS_manualArr[i];
	}
	for(i in TS_intelligenceArr){
		TS_flotIntelligenceArr[i] = new Array();
		TS_flotIntelligenceArr[i][0] = TS_intelligenceTimeArr[i];
		TS_flotIntelligenceArr[i][1] = TS_intelligenceArr[i];
	}
	for(i in TS_enduranceArr){
		TS_flotEnduranceArr[i] = new Array();
		TS_flotEnduranceArr[i][0] = TS_enduranceTimeArr[i];
		TS_flotEnduranceArr[i][1] = TS_enduranceArr[i];
	}		

	// Experimental
	// This shows just pruned datapoints in the graph
	if(TS_settingsStats[1] == 1){
		var TS_spliceArr0 = new Array();
		var TS_spliceArr1 = new Array();
		for(i = 0; i <= 3; i++){
			TS_spliceArr0[i] = new Array();
		}
		for(i = 0; i <= 2;i++){
			TS_spliceArr1[i] = new Array();
		}

		TS_spliceArr0[0][0] = TS_prunedSpeedTime;
		TS_spliceArr0[0][1] = TS_prunedSpeed;

		TS_spliceArr0[1][0] = TS_prunedStrengthTime;
		TS_spliceArr0[1][1] = TS_prunedStrength;

		TS_spliceArr0[2][0] = TS_prunedDefenceTime;
		TS_spliceArr0[2][1] = TS_prunedDefence;

		TS_spliceArr0[3][0] = TS_prunedDexterityTime;
		TS_spliceArr0[3][1] = TS_prunedDexterity;
	
		TS_spliceArr1[0][0] = TS_prunedManualTime;
		TS_spliceArr1[0][1] = TS_prunedManual;

		TS_spliceArr1[1][0] = TS_prunedIntelligenceTime;
		TS_spliceArr1[1][1] = TS_prunedIntelligence;

		TS_spliceArr1[2][0] = TS_prunedEnduranceTime;
		TS_spliceArr1[2][1] = TS_prunedEndurance;
	}

	// Show the graph
	// TODO: Change the line colors. They are the same now for both graphs.
	// DONE
	function showBattle(){
		$.plot($("#TS_statsGraph"),
			[ { data: TS_flotSpeedArr, label: "Speed", lines: { show: true }, points: { show: true }, color: 0 },
			{ data: TS_flotStrengthArr, label: "Strength", lines: { show: true }, points: { show: true }, color: 1 },
			{ data: TS_flotDefenceArr, label: "Defence", lines: { show: true }, points: { show: true }, color: 2 },
			{ data: TS_flotDexterityArr, label: "Dexterity", lines: { show: true }, points: { show: true }, color: 3 },
			{ data: TS_spliceArr0, points: { show: true }, color: 4 }],
	
			{ 
			xaxis: { mode: 'time' },
			legend: { position: 'sw' },
		//	points: { show: true }, 
		//	lines: { show: true }
			}
		);
		TS_show = "showLabour";
	}

	function showLabour(){
		$.plot($("#TS_statsGraph"),
			[ { data: TS_flotManualArr, label: "Manual",lines: { show: true }, points: { show: true }, color: 5 },
			{ data: TS_flotIntelligenceArr, label: "Intelligence", lines: { show: true }, points: { show: true }, color: 6 },
			{ data: TS_flotEnduranceArr, label: "Endurance", lines: { show: true }, points: { show: true }, color: 7 },
			{ data: TS_spliceArr1, points: {show: true }, color: 8 }],
	
			{ 
			xaxis: { mode: 'time' },
			legend: { position: 'sw' },
		//	points: { show: true }, 
		//	lines: { show: true }
			}
		);
		TS_show = "showBattle";
	}

	// jQuery toggle() doesn't work, but this does ;)
	var TS_show = "showBattle";
	$("#TS_graphToggle").click(function(){
		if(TS_show == "showBattle"){
			showBattle();
		}
		else if(TS_show == "showLabour"){
			showLabour();
		}
	});

	// Initiate on load
	showBattle();
})
