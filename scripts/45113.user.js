// ==UserScript==
// @author         Arandia
// @name           Travian Distance Time Calculator
// @version        2.0.5
// @namespace      http://userscripts.org/scripts/show/34079
// @description    Calculates the time from your home city to the square of the map you are mousing over, for a variety of units
// @include        http://*.travian.*/karte.php*
// ==/UserScript==

/*****************************************************************************
 * Copyright 2008, Adrian Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hopes that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org.licenses/>
 *****************************************************************************/

// ======= TO ADD A NEW TRANSLATION =======
// please see the bottom of the script

/***********************************************************************************************************************************************
 * Date:         | Name:        | Description:
 ***********************************************************************************************************************************************
 * Sept 19, 2008 | Arandia      | Created. Wrote basic functions, debug, mouseover etc.
 * Sept 20, 2008 | Arandia      | Added the time output, and input for the Tribe type
 * Sept 20, 2008 | Arandia      | Bugfix, and added hour:min:sec time representation
 * Sept 21, 2008 | Arandia      | Added single-village support, and multi-server support
 * Sept 23, 2008 | Arandia      | Removed dependency on 'Capital' being present on profile page. This helps with multi-language support.
 * Sept 24, 2008 | Arandia      | Added a distance display on individual village view
 * Sept 25, 2008 | Cryborg      | Added French support
 * Sept 25, 2008 | Arandia      | Added autolanguage detection, restructured code
 * Sept 30, 2008 | Arandia      | Fixed bug with Gaulish units, added rudimentary Polish
 * Sept 30, 2008 | Arandia      | Added a changable base reference village
 * Oct   1, 2008 | Arandia      | Modified the reference village UI to avoid reloads
 * Oct   1, 2008 | maDog        | Added Slovenian, reworked languages section
 * Oct   1, 2008 | Signum       | Added partial Polish support (no unit translations)
 * Oct   2, 2008 | maDog        | Completed Slovenian translation
 * Oct   2, 2008 | Signum       | Completed Polish translation
 * Oct   2, 2008 | Arandia      | Bug fix: loaded other  profiles, and messed up ref vil
 * Oct  21, 2008 | polle1       | Added Danish translation
 * Oct  25, 2008 | rtellezi     | Added Spanish translation
 * Oct  29, 2008 | dreamer0     | Added Bosnian support
 * Oct  29, 2008 | Quiroch      | Added partial Portuguese support
 * Oct  29, 2008 | Arandia      | Fixed brace error
 * Oct  30, 2008 | Foxyhearts   | Added Dutch support
 * Nov   6, 2008 | arithmandar  | Added Traditional Chinese support
 * Nov  11, 2008 | chompi       | Added Bulgarian support
 * Nov  11, 2008 | Arandia      | Fixed typo
 * Nov  11, 2008 | tibbwee      | Added Swedish support
 * Nov  11, 2008 | tibbwee      | Added support for speed servers
 * Nov  12, 2008 | Mpekas       | Added Greek support
 * Nov  16, 2008 | Arandia      | Restructured output table (with input from e226329)
 * Nov  16, 2008 | banditsan    | Added Lithuanian support
 * Nov  16, 2008 | e226329      | Added Russian support
 * Nov  16, 2008 | Arandia      | Restructured/wrote to allow ease of table relocation
 * Dec   1, 2008 | fl0de        | Added German support
 * Dec   1, 2008 | i_mar        | Added Turkish support
 * Dec   6, 2008 | Arandia      | Fixed server string parsing
 * Dec  10, 2008 | julius_ps    | Added Italian support
 * Dec  13, 2008 | loomy        | Added Slovak support
 * Dec  13, 2008 | Abdullah     | Added Arabic support
 * Dec  13, 2008 | Arandia      | Automated gathering data from the profile page, and added a tribe-reset option
 *               |              | Also added images, and merchant times. TBD: Support for Tournament Square
 * Dec  14, 2008 | Arandia      | Completed supporting the Tournament Square. Version 2.0.0 released!
 * Dec  14, 2008 | banditsan    | Fixed capitalizations in Lithuanian translations
 * Dec  15, 2008 | Jhesthee     | Added Tagalog support
 * Dec  28, 2008 | MJanee       | Added Hungarian support
 * Jan  27, 2009 | w1ndfly3r    | Added partial Indonesian support
 * Mar  11, 2009 | WA           | Added partial Croatian support
**********************************************************************************************************************************************/

var d_none=-1, d_highest=0, d_hi=1, d_med=2, d_low=3, d_lowest=4, d_all=4;
//* d_none is for the final release - don't forget to set it before uploading
var d_level=d_highest;/*/
var d_level=d_all;//*/

// ====== SETTINGS ======
var cant_see = false;

// You can use the full image names instead of the images themselves if you want
var show_images = true;
// ====== /SETTINGS ======

// Global Vars
var url = window.location.href;
var server = url.split("/")[2];
// True if we're zoomed in on a single village, false if we're overviewing a map of several
var g_view = (url.split("/")[3].indexOf("d=") != -1 && url.split("/")[3].indexOf("&c=") != -1);
// The value to multiply the unit speeds by - for speed server
var g_multi = server.split('.')[0] == 'speed' ? 2 : 1; // Speed server units move twice as fast

var g_names = [];
var g_speedup = []; // The speedup from a tournament square. Village-specific

var tribe_key = server + "_Tribe";
var village_key = server + "_Village"; // This is only used if it's a single-village account
var ref_key = server+"_Ref";
var names_key = server+'_Village_Names'; // This stores all your villages, their coords, and Tourney Square speedup

// random unicode that's very unlikely to be encountered in any text. Used for separating GM_values
var g_split1 = 'â˜“';
var g_split2 = 'â˜’';

var g_speeds, g_units; // For unit names and speeds; indexed by #
var g_table, g_home;
var g_start_point, g_tribe;
var g_tribe_num; // 0=Romans, 1=Teutons, 2=Gauls
var dispT = findDisp(); // Where we display

var t = []; // translations
var g_image = new Array([], [], []); // Images: [[Romans] [Teutons] [Gauls]]

//requestProfileData();
g_tribe = GM_getValue(tribe_key);
if (!g_tribe){ // If we don't have tribe data, go get it!
    requestProfileData();
    GM_setValue(ref_key, false); // This should be set on the *first* loading of the script only
}
// Startup

//* init the global vars. Fills in the error messages. Must be after getting the tribe type.
loadLanguage(server.substr(server.lastIndexOf('.')+1)); /*/
loadLanguage('ae'); //*/

if (show_images) loadImages();

// Give users the option of refreshing the tribe data
// This must be after loading the languages & tribe
GM_registerMenuCommand('Distance Time Calculator: ' + t['Reload Tribe'], requestProfileData);
debug(d_med, "Got tribe "+g_tribe);

// This is our active village's coords
g_home = myVilCoords();

// First try and load the saved 'reference' as the home location
g_start_point = GM_getValue(ref_key, false);
// If there is no reference set, extract the current location and use it as home
if (g_start_point==false){
    debug(d_med, 'No reference village, using value from myVilCoords()');
    g_start_point = g_home;
}
// If we still can't find a home, bother the user until we get one
if (!g_start_point){
    alert(t['home_village_not_found']);
    return;
}
debug(d_med, "Got starting point "+g_start_point);
window.addEventListener('load', main, false); // Run the script!

/*************************************************
 * Provides basic debugging
 *************************************************/
function debug(lvl, msg){
    if (lvl <= d_level){
        GM_log("\n"+msg);
    }
}

/*************************************************
 * Shortcut to debug at the highest level
 *************************************************/
function dbg(msg){
    debug(d_highest, msg);
}

/*************************************************
 * Evaluates the xpath using document.evaluate
 * This always returns an ORDERED_NODE_SNAPSHOT_TYPE
 *************************************************/
function xPathEval(xpath){
    rtn = document.evaluate(xpath, document, null,
			    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!rtn) dbg("Evaluation of xpath '" + xpath + "' failed!");
    return rtn;
}

/*************************************************
 * This extracts all the relevant data from the
 * profile page directly.
 *************************************************/
function requestProfileData(){
    GM_xmlhttpRequest({
	    method: 'Get',
		url: 'http://'+server+'/spieler.php',
		headers: null,
		onload: function (e){
		    var txt = e.responseText;

		    var tribe = txt.match('<tr class="s7"><td>.*')+''; // Match until the end of the line, convert to a string
		    g_tribe = tribe.split('</td><td>')[1].split('</td></tr>')[0]; // Extract the tribe, use it
		    GM_setValue(tribe_key, g_tribe); // And save it
		    debug(d_med, "Got a new tribe: " + g_tribe);

		    // This is only used if we are a single-village account!
		    var coord = txt.split('<span style="display:block;float:left;" class="c">')[1]; // Start looking immediately after the capital
		    g_start_point = coord.split('<td>(')[1].split(')</td>')[0]; // Start using this imediately
		    GM_setValue(village_key, g_start_point); // And save it
		    debug(d_med, "Got a new home village: " + g_start_point);
	    }
	});
}

/*****************************************************
 * This finds the div to display the timing results in
 *****************************************************/
function findDisp(){
    if (cant_see){
	// If we're using non-default positioning, we have to create our own
	// to the right of all of the villages.
	var mid = document.getElementById('lmidall');
	var d = document.createElement('div');
	d.style.cssFloat = 'left';
	d.style.width = '40px';
	d.innerHTML = '&nbsp;';
	mid.appendChild(d);
	d = document.createElement('div');
	d.id = 'lfarright1';
	d.style.cssFloat = "left";
	mid.appendChild(d);
	return d;
    }
    else return document.getElementById('lright1');
}

/*****************************************************
 * This formats the hour value from a float to a string
 *****************************************************/
function formatHours(tot_hours){
    var rc = "";
    var hours = tot_hours % 24;
    if (tot_hours >= 24)
	rc += Math.floor(tot_hours/24)+"d ";
    rc += Math.floor(hours) + ":";
    var min = (hours * 60) % 60;
    if (min < 10) rc += "0";
    rc += Math.floor(min) + ":";
    var sec = (min * 60) % 60;
    if (sec < 10) rc += "0";
    rc += Math.floor(sec);
    return rc;
}

/*****************************************************
 * Returns the distance given two sets of coordinates
 *****************************************************/
function distance(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

/*****************************************************
 * Update village GM_values
 *****************************************************/
function updateVilValues(vils){
    var values = GM_getValue(names_key, '');

    for (var i=0; i < vils.snapshotLength; i++){
	var v = vils.snapshotItem(i);
	var name = v.childNodes[2].textContent;

	if (values.indexOf(name) != -1){
	    // We don't have a way to delete non-existant villages yet,
	    // but this will stop us from overwriting ones we do have.
	    continue;
	}

	var loc = v.nextSibling.textContent;
	loc = loc.match(/[-0-9]{1,4}/) + '|' + loc.split('|')[1].match(/[-0-9]{1,4}/); // We need to parse it to make it readable

	debug(d_med, "Adding a new village entry for "+name+" at ("+loc+")");

	values += g_split1 + name + g_split2 + loc + g_split2 + '1';
    }
    debug(d_low, values);
    // Pop off the first element if it's g_split1
    GM_setValue(names_key, values[0]==g_split1 ? values.substr(1) : values);
}

/*****************************************************
 * Extracts the coords of the active village. Currently
 * only supported if you have multiple villages...
 *****************************************************/
function myVilCoords(){
    input = document.getElementById("lright1");
    if (input.innerHTML.indexOf("active_vl\">") != -1){ // This is a multi-village account
	debug(d_med, "In a multi-village environment");
	// If we have a different number of stored villages than present villages
	var vils = xPathEval('//td[@class="nbr"]');
	if (GM_getValue(names_key, '').split(g_split1).length != vils.snapshotLength){
	    updateVilValues(vils);
	}
	// Get the location of the active vil
	var a = xPathEval('//a[@class="active_vl"]').snapshotItem(0).parentNode.nextSibling.textContent;
	var x = a.match(/[-0-9]{1,4}/);
	var y = a.split('|')[1].match(/[-0-9]{1,4}/);
	return x+"|"+y;
    } else {
	// We're going to have to extract the home village location from the profile page...
	debug(d_med, "In a single-village environment");
	return GM_getValue(village_key);
    }
}

/*****************************************************
 * Extracts the coordinates of the square being moused
 * over.
 *****************************************************/
function myCoords(){
    if (g_view){
	var a = xPathEval('//div[@class="ddb"]').snapshotItem(1);
	if (!a) a = document.getElementById('lmid2').childNodes[0]; // If we're at an oasis...
	return a.textContent.split('(')[1].split(')')[0];
    }
    else return document.getElementById("x").textContent + "|" + document.getElementById('y').textContent;
}

/*****************************************************
 * This calculates the time from the distance and speed
 *****************************************************/
function calcTime(dist, speed, speedup){
    if (dist < 30 || typeof speedup == 'undefined' || speedup == 1)
	return dist/(speed*g_multi);

    var sub30 = 30/(speed*g_multi); // The time to travel the first 30 squares
    var super30 = (dist-30)/(speed*speedup*g_multi); // The time to travel the rest
    return sub30 + super30;
}

/*****************************************************
 * This adds the event listeners to the table
 *****************************************************/
function tableAddListeners(){
    document.getElementById('disp_table').addEventListener('dblclick', setRPOnDblClick, false);
}

/*****************************************************
 * Creates the table to display the timing results
 * Depends on the global 'g_start_point'
 *****************************************************/
function makeTable(add_link){
    d = document.createElement('div');
    d.id = "displayTable";
    d.style.cssFloat = "left";
    var now = myCoords(); // We have to extract the *current* x/y coords
    var dist = distance(g_start_point.split('|')[0], g_start_point.split('|')[1], now.split('|')[0], now.split('|')[1]);

    if (typeof add_link != 'undefined' && add_link){
	// Create a link to save this village as the reference village
	var a = makeLink(GM_getValue(ref_key)==now ? t['Unset as reference village'] : t['Set as reference village'], 'pivot_link');

	// and place this href in a div for positioning...
	var d2 = document.createElement('div');
	d2.innerHTML = '<br>';
	d2.appendChild(a);
	d.appendChild(d2);
    }

    var txt = d.innerHTML;
    if (add_link) txt += '<br>';

    var speedup;
    var values = GM_getValue(names_key, '').split(g_split1);
    for (var i=0; i < values.length; i++){
	if (values[i].indexOf(g_home) != -1){
	    speedup = values[i].split(g_split2)[2];
	    break;
	}
    }

    if (show_images){
	txt += '<div><br><table class="f10" id="disp_table" width="250"><body>';

	// Add the distance
	txt += '<tr><td><img src="'+g_image['distance']+'" title="'+t['distance']+'"/></td>';
	txt += '<td><b>'+Math.round(100*dist)/100+'</b></td>';

	// Add the merchant timing
	txt += '<td>&nbsp;<img src="'+g_image['Merchant']+'" title="'+t['Merchant']+'"/></td>';
	txt += '<td><i><b>'+formatHours(calcTime(dist, g_speeds[10]))+'</b></i></td></tr>';
	//txt += '<td><i><b>'+formatHours(dist/(g_speeds[10]*g_multi))+'</b></i></td></tr>';

	txt += '<tr/><tr/><tr/>'; // And some spacing...

	// Add each of the images & times. Bold the catapult (#7). Two columns...
	for (var i=0; i < g_units.length/2; i++){
	    txt += '<tr>';
	    txt += '<td><img src="'+g_image[g_tribe_num][i]+'" title="'+g_units[i]+'"/>&nbsp;</td>';
	    txt += '<td><i>'+formatHours(calcTime(dist, g_speeds[i], speedup))+'</i></td>';

	    txt += '<td>&nbsp;<img src="'+g_image[g_tribe_num][i+5]+'" title="'+g_units[i+5]+'"/>&nbsp;</td>';
	    txt += '<td><i>'+(i==2?'<b>':'')+formatHours(calcTime(dist, g_speeds[i+5], speedup))+(i==2?'</b>':'')+'</i></td>';

	    txt += '</tr>';
	}

	// Finish off the table and the div
	txt += '</body></table></div>';
    }
    else {
	// Add the distance header
	txt += '<div><br><b>' + t['distance']+":</b>&nbsp;&nbsp;"+Math.round(100*dist)/100;

	// The times for all of the troops. Bold the catapult (#7)
	txt += "<br>"+t['time']+'<br><table class="f10" id="disp_table"><body>';
	for (var i=0; i<g_units.length; i++){
	    txt += '<tr><td>&nbsp;&nbsp;&nbsp;' + g_units[i] + ":</td>";
	    txt += '<td>&nbsp;&nbsp;<i>' + (i==7?'<b>':'') + formatHours(calcTime(dist, g_speeds[i], speedup)) + (i==7?'</b>':'') + "</i></td></tr>";
	}

	// Add the merchant
	txt += '<tr><td>&nbsp;&nbsp;&nbsp;'+t['Merchant']+':</td>';
	txt += '<td>&nbsp;&nbsp;<i><b>'+formatHours(calcTime(dist, g_speeds[10]))+'</b></i></td></tr>';

	// Finish it off
	txt += '</body></table></div>';
    }

    d.innerHTML = txt;
    return d;
}

/*****************************************************
 * This creates a link with text txt that executes
 * function funct on clicking.
 *****************************************************/
function makeLink(txt, id){
    a = document.createElement("a");
    a.id = id;
    a.style.cssFloat = 'left';

    a.innerHTML = txt;
    a.href = "#";

    return a;
}

/*************************************************
 * Adds the specified mouseover and mouseout to 
 * the specified object.
 *************************************************/
function mouser(obj, mouse_over, mouse_out){
    obj.addEventListener('mouseover', mouse_over, false);
    obj.addEventListener('mouseout', mouse_out, false);
}

/*****************************************************
 * This is the mouseover routine for the map squares
 *****************************************************/
function mOverMap(){
    g_table = makeTable();
    dispT.appendChild(g_table);
}

/*****************************************************
 * This is the mouseout routine for the map squares
 *****************************************************/
function mOutMap(){
    dispT.removeChild(g_table);
}

/*****************************************************
 * This is the routine to handle clicking on the 'link'
 * "set as reference village"
 *****************************************************/
function setRefOnClick(){
    var loc = myCoords();
    if (loc == GM_getValue(ref_key)) loc = false;
    GM_setValue(ref_key, loc);

    // makeTable depends on g_start_point, so we need to set it
    if (loc==false) g_start_point = myVilCoords();
    else g_start_point = loc;
    if (!g_start_point){
	alert(home_village_not_found);
	return;
    }

    p = g_table.parentNode;
    p.removeChild(g_table);

    // Replace the table with the new one, and save it
    g_table = makeTable();
    p.appendChild(g_table);
    
    // Change the link text
    e = document.getElementById('pivot_link');
    // There's a small bug here where special characters get formatted for one
    // but not the other
    if (e.textContent != t['Set as reference village']) e.innerHTML = t['Set as reference village'];
    else e.innerHTML = t['Unset as reference village'];

    debug(d_med, "Setting the reference village to "+loc);

    // This changes the table, so we have to reset the event listeners
    tableAddListeners();
}

/*************************************************
 * This gets the rally point level from the user
 * on a double-click of the display table
 *************************************************/
function setRPOnDblClick(){
    // Load the village values
    var coords = myVilCoords(); // This will also update the GM_value
    dbg(coords);
    var values = GM_getValue(names_key, '').split(g_split1);

    if (values.length == 0){
	debug(d_hi, "No name values read! (Is this a single-village account?)");
	return;
    }

    var to_change;
    var i;
    // Read from the GM value
    for (i=0; i < values.length; i++){
	// Find the active village
	if (values[i].indexOf(coords) != -1){
	    to_change = values[i].split(g_split2);
	    break;
	}
    }
    
    var lvl = prompt(t['What level is your Tournament Square?'] + ' <' + to_change[0] + '>');
    lvl = lvl.match('[0-9]{1,2}'); // Take the first 1 or 2 digit number encountered

    // We need to check it to make sure it's safe
    if (typeof lvl == 'undefined' || lvl > 20){ // From our matching, it can't be negative
	debug(d_highest, "Invalid Tournament Square level was entered!");
	return;
    }

    to_change[2] = (1+lvl/10)+''; // Calculate the speedup, and save it as a string
    debug(d_med, "Tournament Square has new level of "+lvl+", giving a speedup of "+to_change[2]);

    // Rewrite the GM value
    values[i] = to_change.join(g_split2);
    GM_setValue(names_key, values.join(g_split1));

    // Redraw the table
    var p = g_table.parentNode;
    p.removeChild(g_table);
    g_table = makeTable(false);
    p.appendChild(g_table);

    // We have to reset the listeners too
    tableAddListeners();
}

/*****************************************************
 * The main function, this starts the processes
 *****************************************************/
function main(){
    var id;
    // This is a individual village view
    if (g_view){ // This is a single village
	debug(d_med, "Single village view");

	g_table = makeTable(true);
	dispT.appendChild(g_table);
	g_table = g_table.childNodes[2];

	document.getElementById('pivot_link').addEventListener('click', setRefOnClick, false);
	tableAddListeners();
    } else { // This is a standard map view - place mouseovers on all the tiles
	debug(d_med, "Map view");
	for (var i=0; i<7; i++){
	    for (var j=0; j<7; j++){
		id = 'a_'+i+'_'+j;
		elem = document.getElementById(id);
		if (!elem) debug(d_highest, "Could not find map element "+id+"!");
		else mouser(elem, mOverMap, mOutMap);
	    }
	}
    }
}

/*************************************************
 * Supported languages translations...
 * Place here to be out of the way - it tends to
 * balloon...
 *************************************************/
function loadLanguage(serverDomain){
    // These have yet to be translated to all languages... use English until we get them
    t['merchant'] = 'Merchant';
    t['Reload Tribe'] = "Reload Tribe";
    t['What level is your Tournament Square?'] = 'What level is your Tournament Square?';
    /*************************************************************************************************
     * TO ADD A TRANSLATION:
     *************************************************************************************************
     * All translations are welcome. Please post the code on the comments section of my script. When
     * writing a translation, please keep a few things in mind:
     *  1) The tribe names (Romans, Gauls, Teutons) have to match what is used on the server *EXACTLY*
     *     (caps and all - 'Gauls', not 'gauls'). If this isn't the case, the script will not work!
     *  2) Long unit names can cause display problems. If the unit's name is very long (ex Theutates
     *     Thunders), then it's OK to abreviate it (ex TT). Overly lengthy unit names cause a messy
     *     display!
     *  3) 'hrs' is an abbreviation for 'hours' in English. This can (and should) be translated too,
     *     unless of course you want to just leave it off.
     *************************************************************************************************/
    switch (serverDomain){
    default:
	/***********************************************
	 * ENGLISH
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Could not find your tribe type - please visit your profile page";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "No record of your home village location - please visit your profile page";
	t['Set as reference village'] = "Set as reference village";
	t['Unset as reference village'] = "Unset as reference village";
	t['distance'] = "Distance";
	t['time'] = "<b>Time:</b> (hrs)";
	t['Reload Tribe'] = "Reload Tribe";
	t['Merchant'] = 'Merchant';
	t['What level is your Tournament Square?'] = 'What level is your Tournament Square?';

	switch (g_tribe){
	case 'Romans':
	    g_units = new Array('Legionnaire', 'Praetorien', 'Imperian', 'E. Legati',
				'E. Imperatoris', 'E. Caesaris', 'Ram', 'Fire Catapult',
				'Senator', 'Settler');
	    g_tribe_num = 0;
	    break;
	case 'Teutons':
	    g_units = new Array('Maceman', 'Spearman', 'Axeman', 'Scout', 'Paladin',
				'Teutonic Knight', 'Ram', 'Catapult', 'Chieftain', 'Settler');
	    g_tribe_num = 1;
	    break;
	case 'Gauls':
	    g_units = new Array('Phalanx', 'Swordsman', 'Pathfinder', 'Theutates Thunder', 'Druidrider',
				'Haeduan', 'Ram', 'Trebuchet', 'Chief', 'Settler');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Issues in tribe detection! Tribe = "+g_tribe);
	}
	break;
    case 'ae':
	/***********************************************
	 *Arabic
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Ù‚Ø¨ÙŠÙ„ØªÙƒ ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙØ© - Ù‚Ù… Ø¨Ø²ÙŠØ§Ø±Ø© Ø¨Ø·Ø§Ù‚Ø© Ø§Ù„Ø¹Ø¶ÙˆÙŠØ©";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Ù„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø¹Ø§ØµÙ…ØªÙƒ - Ù‚Ù… Ø¨Ø²ÙŠØ§Ø±Ø© Ø¨Ø·Ø§Ù‚Ø© Ø§Ù„Ø¹Ø¶ÙˆÙŠØ©";
	t['Set as reference village'] = "Ø£Ø¬Ø¹Ù„ Ù‡Ø°Ù‡ Ø§Ù„Ù‚Ø±ÙŠØ© Ù‚Ø±ÙŠØªÙŠ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©";
	t['Unset as reference village'] = "Ù„Ø§ ØªØ¬Ø¹Ù„Ù‡Ø§ Ù‚Ø±ÙŠØªÙŠ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©";
	t['distance'] = "Ø§Ù„Ù…Ø³Ø§ÙØ©";
	t['time'] = "<b>Ø§Ù„ÙˆÙ‚Øª</b> (Ø³Ø§Ø¹Ø©)";

	switch (g_tribe){
	case 'Ø§Ù„Ø±ÙˆÙ…Ø§Ù†':
	    g_units = new Array('Ø¬Ù†Ø¯ÙŠ Ø£ÙˆÙ„', 'Ø­Ø±Ø§Ø³ Ø§Ù„Ø£Ù…Ø¨Ø±Ø§Ø·ÙˆØ±', 'Ø¬Ù†Ø¯ÙŠ Ù…Ù‡Ø§Ø¬Ù…', 'ÙØ±Ù‚Ø© ØªØ¬Ø³Ø³',
			       'Ø³Ù„Ø§Ø­ Ø§Ù„ÙØ±Ø³Ø§Ù†', 'ÙØ±Ø³Ø§Ù† Ù‚ÙŠØµØ±', 'ÙƒØ¨Ø´', 'Ø§Ù„Ù…Ù‚Ù„Ø§Ø¹ Ø§Ù„Ù†Ø§Ø±ÙŠ',
			       'Ø­ÙƒÙŠÙ…', 'Ù…Ø³ØªÙˆØ·Ù†');
	    g_tribe_num = 0;
	    break;
	case 'Ø§Ù„Ø¬Ø±Ù…Ø§Ù†':
	    g_units = new Array('Ù…Ù‚Ø§ØªÙ„ Ø¨Ù‡Ø±Ø§ÙˆØ©', 'Ù…Ù‚Ø§ØªÙ„ Ø¨Ø±Ù…Ø­', 'Ù…Ù‚Ø§ØªÙ„ Ø¨ÙØ£Ø³', 'Ø§Ù„ÙƒØ´Ø§Ù', 'Ù…Ù‚Ø§ØªÙ„ Ø§Ù„Ù‚ÙŠØµØ±',
			       'ÙØ±Ø³Ø§Ù† Ø§Ù„Ø¬Ø±Ù…Ø§Ù†', 'Ù…Ø­Ø·Ù…Ø© Ø§Ù„Ø£Ø¨ÙˆØ§Ø¨', 'Ø§Ù„Ù…Ù‚Ù„Ø§Ø¹', 'Ø§Ù„Ø²Ø¹ÙŠÙ…', 'Ù…Ø³ØªÙˆØ·Ù†');
	    g_tribe_num = 1;
	    break;
	case 'Ø§Ù„Ø¥ØºØ±ÙŠÙ‚':
	    g_units = new Array('ÙƒØªÙŠØ¨Ø©', 'Ù…Ø¨Ø§Ø±Ø²', 'Ø§Ù„Ù…Ø³ØªÙƒØ´Ù', 'Ø±Ø¹Ø¯ Ø§Ù„Ø¬Ø±Ù…Ø§Ù†', 'ÙØ±Ø³Ø§Ù† Ø§Ù„Ø³Ù„Øª',
			       'ÙØ±Ø³Ø§Ù† Ø§Ù„Ù‡ÙŠØ¯ÙˆØ§Ù†Ø±', 'Ù…Ø­Ø·Ù…Ø© Ø§Ù„Ø£Ø¨ÙˆØ§Ø¨', 'Ø§Ù„Ù…Ù‚Ù„Ø§Ø¹ Ø§Ù„Ø­Ø±Ø¨ÙŠ', 'Ø±Ø¦ÙŠØ³', 'Ù…Ø³ØªÙˆØ·Ù†');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Ù‡Ù†Ø§Ù„Ùƒ Ù…Ø´ÙƒÙ„Ø© ÙÙŠ ØªØ­Ø¯ÙŠØ¯ Ù‚Ø¨ÙŠÙ„ØªÙƒ");
	}
	break;
    case "ba":
      	/***********************************************
      	 * BOSANSKI (Bosnian)
      	 ***********************************************/
      	debug(d_med, "Bosanski");
      	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
      	    "Ne mozemo naci vase pleme:\n"+
      	    "Molimo vas posjetite svoj profil.";
      	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
      	    "Ne mozemo naci vas glavni grad.\n"+
      	    "Molimo vas posjetite svoj profil.";
      	t['Set as reference village'] = "Postavi kao 'reference' selo";
      	t['Unset as reference village'] = "Zaustavi kao 'reference' selo";
      	t['distance'] = "Udaljenost";
      	t['time'] = "<b>Vrijeme:</b>";
      
      	switch (g_tribe){
      	case 'Rimljani':
      	    g_units = new Array('Legionar', 'Pretorijanac', 'Imperijanac', 'E. Legati',
      			      'E. Imperatoris', 'E. Caesaris', 'Ratni ovan', 'Vatreni katapult',
      			      'Senator', 'Naseljenik');
      	    g_tribe_num = 0;
      	    break;
      	case 'Teutonci':
      	    g_units = new Array('Batinar', 'Kopljanik', 'Borac sa sjekirom', 'IzviÄ‘aÄ', 'Paladin',
      			      'Teutonski Vitez', 'Ovan', 'Katapult', 'Poglavica', 'Naseljenik');
      	    g_tribe_num = 1;
      	    break;
      	case 'Gali':
      	    g_units = new Array('Falanga', 'MaÄevalac', 'IzviÄ‘aÄ',
      			      'Teutateov grom', 'Druidski jahaÄ', 'Heduan', 'Ovan',
      			      'Katapult', 'StarjeÅ¡ina', 'Naseljenik');
      	    g_tribe_num = 2;
      	    break;
      	default:
      	    alert("Problemi sa detekcijom plemena");
      	}
      	break;
    case "bg":
	/***********************************************
	 * BULGARIAN
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "ÐÐµ Ðµ Ð¾Ñ‚ÐºÑ€Ð¸Ñ‚Ð° Ñ€Ð°ÑÐ°Ñ‚Ð° Ð²Ð¸ - Ð¼Ð¾Ð»Ñ Ð¿Ð¾ÑÐµÑ‚ÐµÑ‚Ðµ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»ÑŠÑ‚ ÑÐ¸";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "ÐÐµ Ðµ Ð¾Ñ‚ÐºÑ€Ð¸Ñ‚Ð¾ Ð³Ð»Ð°Ð²Ð½Ð¾Ñ‚Ð¾ Ð²Ð¸ ÑÐµÐ»Ð¾ - Ð¼Ð¾Ð»Ñ Ð¿Ð¾ÑÐµÑ‚ÐµÑ‚Ðµ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»ÑŠÑ‚ ÑÐ¸";
	t['Set as reference village'] = "Ð—Ð°Ð´Ð°Ð¸ ÐºÐ°Ñ‚Ð¾ ÑÑ‚Ð°Ñ€Ñ‚Ð¾Ð²Ð° Ñ‚Ð¾Ñ‡ÐºÐ°";
	t['Unset as reference village'] = "ÐŸÑ€ÐµÐ¼Ð°Ñ…Ð½Ð¸ ÑÑ‚Ð°Ñ€Ñ‚Ð¾Ð²Ð° Ñ‚Ð¾Ñ‡ÐºÐ°";
	t['distance'] = "Ð Ð°Ð·ÑÑ‚Ð¾ÑÐ½Ð¸Ðµ";
	t['time'] = "<b>Ð’Ñ€ÐµÐ¼Ðµ:</b>";

	switch (g_tribe){
	case 'Ð Ð¸Ð¼Ð»ÑÐ½Ð¸':
	    g_units = new Array('Ð›ÐµÐ³Ð¸Ð¾Ð½ÐµÑ€', 'ÐŸÑ€ÐµÑ‚Ð¾Ñ€Ð¸Ð°Ð½ÐµÑ†', 'Ð˜Ð¼Ð¿ÐµÑ€Ð¸Ð°Ð½', 'Equites Legati',
			      'Equites Imperatoris', 'Equites Caesaris', 'Ð¡Ñ‚ÐµÐ½Ð¾Ð±Ð¾Ð¹Ð½Ð¾&nbsp;ÐžÑ€ÑŠÐ´Ð¸Ðµ', 'ÐžÐ³Ð½ÐµÐ½ ÐºÐ°Ñ‚Ð°Ð¿ÑƒÐ»Ñ‚',
			      'Ð¡ÐµÐ½Ð°Ñ‚Ð¾Ñ€', 'Ð—Ð°ÑÐµÐ»Ð½Ð¸Ðº');
	    g_tribe_num = 0;
	    break;
	case 'Ð¢ÐµÐ²Ñ‚Ð¾Ð½Ñ†Ð¸':
	    g_units = new Array('Ð‘Ð¾ÐµÑ† Ñ Ð±Ð¾Ð·Ð´ÑƒÐ³Ð°Ð½', 'ÐšÐ¾Ð¿Ð¸ÐµÐ½Ð¾ÑÐµÑ†', 'Ð‘Ð¾ÐµÑ† Ñ Ð±Ñ€Ð°Ð´Ð²Ð°', 'Ð¡ÑŠÐ³Ð»ÐµÐ´Ð²Ð°Ñ‡', 'ÐŸÐ°Ð»Ð°Ð´Ð¸Ð½',
			      'Ð¢ÐµÐ²Ñ‚Ð¾Ð½ÑÐºÐ¸&nbsp;Ñ€Ð¸Ñ†Ð°Ñ€', 'Ð¢Ð°Ñ€Ð°Ð½', 'ÐšÐ°Ñ‚Ð°Ð¿ÑƒÐ»Ñ‚', 'ÐŸÑ€ÐµÐ´Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»', 'Ð—Ð°ÑÐµÐ»Ð½Ð¸Ðº');
	    g_tribe_num = 1;
	    break;
	case 'Ð“Ð°Ð»Ð¸':
	    g_units = new Array('Ð¤Ð°Ð»Ð°Ð½Ð³Ð°', 'ÐœÐµÑ‡Ð¾Ð½Ð¾ÑÐµÑ†', 'Ð¡Ð»ÐµÐ´Ð¾Ñ‚ÑŠÑ€ÑÐ°Ñ‡', 'Theutates Thunder', 'Ð”Ñ€ÑƒÐ¸Ð´&nbsp;ÐºÐ¾Ð½Ð½Ð¸Ðº',
			      'Ð¥ÐµÐ´ÑƒÐ°Ð½', 'Ð¢Ð°Ñ€Ð°Ð½', 'Ð¢Ñ€ÐµÐ±ÑƒÑ‡ÐµÑ‚', 'Ð’Ð¾Ð¶Ð´', 'Ð—Ð°ÑÐµÐ»Ð½Ð¸Ðº');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Issues in tribe detection!");
	}
	break;
    case 'hr':
        /***********************************************
         * CROATIAN (basic only)
         ***********************************************/
        t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
            "Could not find your tribe type - please visit your profile page";
        t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
            "No record of your home village location - please visit your profile page";
        t['Set as reference village'] = "Set as reference village";
        t['Unset as reference village'] = "Unset as reference village";
        t['distance'] = "Distance:";
        t['time'] = "<b>Time:</b> (hrs)";
        t['Reload Tribe'] = 'Reload Tribe';
        t['Merchant'] = 'Merchant';
        t['What level is your Tournament Square?'] = 'What level is your Tournament Square?';
        
        switch (race){
        case 'Rimljani':
            units = new Array('Legionnaire', 'Praetorien', 'Imperian', 'E. Legati',
                              'E. Imperatoris', 'E. Caesaris', 'Ram', 'Fire Catapult',
                              'Senator', 'Settler');
            g_tribe_num = 0;
            break;
        case 'Teutonci':
            units = new Array('Maceman', 'Spearman', 'Axeman', 'Scout', 'Paladin',
                              'T. Knight', 'Ram', 'Catapult', 'Chieftain', 'Settler');
            g_tribe_num = 1;
            break;
        case 'Gali':
            units = new Array('Phalanx', 'Swordsman', 'Pathfinder', 'TT', 'Druidrider',
                              'Haeduan', 'Ram', 'Trebuchet', 'Chief', 'Settler');
            g_tribe_num = 2;
            break;
        default:
            alert("Issues in tribe detection!");
        }
        break;
    case "tw":
    case "hk":
	/***********************************************
	 * Traditional Chinese
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator éŒ¯èª¤:\n\n"+
	    "æ‰¾ä¸åˆ°æ‚¨çš„ç¨®æ— - è«‹ç€è¦½æ‚¨çš„å€‹äººè³‡æ–™é é¢";
	t['home_village_not_found'] = "Distance_time_calculator éŒ¯èª¤:\n\n"+
	    "æ‰¾ä¸åˆ°æ‘èŽŠä½ç½®çš„è¨˜éŒ„ - è«‹ç€è¦½æ‚¨çš„å€‹äººè³‡æ–™é é¢";
	t['Set as reference village'] = "è¨­ç‚ºåƒç…§æ‘èŽŠ";
	t['Unset as reference village'] = "å¾žåƒç…§æ‘èŽŠç§»é™¤";
	t['distance'] = "è·é›¢";
	t['time'] = "<b>æ™‚é–“:</b> (hrs)";

	switch (g_tribe){
	case 'ç¾…é¦¬äºº':
	    g_units = new Array('å¤ç¾…é¦¬æ­¥å…µ', 'ç¦è¡›å…µ', 'å¸åœ‹å…µ', 'ä½¿è€…é¨Žå£«',
			      'å¸åœ‹é¨Žå£«', 'å°‡è»é¨Žå£«', 'è¡æ’žè»Š', 'ç«ç„°æŠ•çŸ³æ©Ÿ',
			      'åƒè­°å“¡', 'é–‹æ‹“è€…');
	    g_tribe_num = 0;
	    break;
	case 'æ¢é “äºº':
	    g_units = new Array('æ£æ£’å…µ', 'çŸ›å…µ', 'æ–§é ­å…µ', 'åµå¯Ÿå…µ', 'éŠä¿ ',
			      'æ¢é “é¨Žå£«', 'è¡æ’žè»Š', 'æŠ•çŸ³è»Š', 'å¸ä»¤å®˜', 'é–‹æ‹“è€…');
	    g_tribe_num = 1;
	    break;
	case 'é«˜ç›§äºº':
	    g_units = new Array('æ–¹é™£å…µ', 'åŠå£«', 'æŽ¢è·¯è€…', 'é›·æ³•å¸«', 'å¾·é­¯ä¼Šé¨Žå…µ',
			      'æµ·é “è–é¨Ž', 'è¡æ’žè»Š', 'æŠ•çŸ³è»Š', 'æ—é•·', 'é–‹æ‹“è€…');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("åµæ¸¬ç¨®æ—æ™‚ç™¼ç”ŸéŒ¯èª¤ï¼!");
	}
	break;
    case 'dk':
	/***********************************************
	 * DANISH
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Kunne ikke finde dit folkeslag - GÃ¥ venligst til din profil";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Ingen optegnelser af din by - GÃ¥ venligst til din profil";
	t['Set as reference village'] = "SÃ¦t som default by";
	t['Unset as reference village'] = "fjern som default by";
	t['distance'] = "Afstand:";
	t['time'] = "<b>Tid:</b> (hrs)";

	switch (g_tribe){
	case 'Romere':
	    g_units = new Array('LegionÃ¦r', 'PrÃ¦torianer', 'Imperianer', 'Equites Legati',
			      'Equites Imperatoris', 'Equites Caesaris', 'Rambuk', 'Brandkatapult',
			      'Senator', 'BosÃ¦tter');
	    g_tribe_num = 0;
	    break;
	case 'Germanere':
	    g_units = new Array('KÃ¸llesvinger', 'SpydkÃ¦mper', 'Ã˜ksekÃ¦mper', 'Spejder', 'Paladin',
			      'Teutonrytter', 'Rambuk', 'Katapult', 'StammefÃ¸rer', 'BosÃ¦tter');
	    g_tribe_num = 1;
	    break;
	case 'Gallere':
	    g_units = new Array('Falanks', 'SvÃ¦rdkÃ¦mper', 'Spion', 'Theutaterlyn', 'Druiderytter',
			      'Haeduaner', 'RambuktrÃ¦', 'Krigskatapult', 'HÃ¸vding', 'BosÃ¦tter');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Problemer med at genkende din stamme!");
	}
	break;
    case 'nl':
	/***********************************************
	 * Nederlands (Dutch) by Foxyhearts
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Kon uw stamtype niet bepalen - bezoek uw profielpagina a.u.b.";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Geen informatie over de lokatie van uw hoofddorp - bezoek uw profielpagina a.u.b.";
	t['Set as reference village'] = "Selecteer als referentiedorp";
	t['Unset as reference village'] = "Deselecteer als referentiedorp";
	t['distance'] = "Afstand";
	t['time'] = "<b>Tijd:</b> (hrs)";

	switch (g_tribe){
	case 'Romeinen':
	    g_units = new Array('Legionair', 'Praetoriaan', 'Imperiaan', 'E. Legati',
			      'E. Imperatoris', 'E. Caesaris', 'Ram', 'Vuurkatapult',
			      'Senator', 'Kolonist');
	    g_tribe_num = 0;
	    break;
	case 'Germanen':
	    g_units = new Array('Knuppelvechter', 'Speervechter', 'Bijlvechter', 'Verkenner', 'Paladijn',
			      'G. Ridder', 'Ram', 'katapult', 'Leider', 'Kolonist');
	    g_tribe_num = 1;
	    break;
	case 'GalliÃ«rs':
	    g_units = new Array('Phalanx', 'Zwaardvechter', 'Padvinder', 'TD', 'DruÃ¯deruiter',
			      'Haeduaan', 'Ram', 'Trebuchet', 'Onderleider', 'Kolonist');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Problemen met het bepalen van de stam!");
	}
	break;
    case "fr":
	/***********************************************
	 * FRANCAIS
	 ***********************************************/
	debug(d_med, "Francais");
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Tribu inconnue :\n"+
	    "Merci d'afficher la page de votre profil afin que le script puisse la trouver.";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Impossible de trouver votre capitale.\n"+
	    "Merci d'afficher la page de votre profil afin que le script puisse la trouver.";
	t['Set as reference village'] = "Villageois de rÃ©fÃ©rence";
	t['Unset as reference village'] = "Ne pas le villageois de rÃ©fÃ©rence";
	t['distance'] = "Distance";
	t['time'] = "<b>Heure:</b>";

	switch (g_tribe){
	case 'Romains':
	    g_units = new Array('L&eacute;gionnaire', 'Pr&eacute;torien', 'Imperian', 'E. Legati',
			      'E. Imperatoris', 'E. Caesaris', 'B&eacute;lier', 'Catapulte de feu',
			      'S&eacute;nateur', 'Settler');
	    g_tribe_num = 0;
	    break;
	case 'Germains':
	    g_units = new Array('C. gourdin', 'C. lance', 'C. hache', 'Eclaireur', 'Paladin',
			      'Chevalier', 'B&eacute;lier', 'Catapulte', 'Chef de tribu', 'Settler');
	    g_tribe_num = 1;
	    break;
	case 'Gaulois':
	    g_units = new Array('Phalange', 'C. &agrave; l&eacute;p&eacute;e', 'Eclaireur',
			      'E. de Toutatis', 'C. druide', 'H&eacute;douin', 'B&eacute;lier',
			      'Catapulte', 'Chef', 'Settler');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Issues in tribe detection!");
	}
	break;
    case "de":
	/***********************************************
	 * GERMAN
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Kann den Stamm nicht feststellen - bitte Profilseite besuchen!";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Kein Eintrag des Hauptdorfes - bitte Profilseite besuchen!";
	t['Set as reference village'] = "Als Referenzdorf markieren";
	t['Unset as reference village'] = "Kein Referenzdorf";
	t['distance'] = "Entfernung";
	t['time'] = "<b>Zeit:</b> (std)";

	switch (g_tribe){
	case 'RÃ¶mer':
	    g_units = new Array('LegionÃ¤r', 'PrÃ¤torianer', 'Imperianer', 'E. Legati',
			      'E. Imperatoris', 'E. Caesaris', 'Rammbock', 'Feuerkatapult',
			      'Senator', 'Siedler');
	    g_tribe_num = 0;
	    break;
	case 'Germanen':
	    g_units = new Array('Keulenschwinger', 'SpeerkÃ¤mpfer', 'AxtkÃ¤mpfer', 'SpÃ¤her', 'Paladin',
			      'Teutonenreiter', 'Ramme', 'Katapult', 'StammesfÃ¼hrer', 'Siedler');
	    g_tribe_num = 1;
	    break;
	case 'Gallier':
	    g_units = new Array('Phalanx', 'SchwertkÃ¤mpfer', 'SpÃ¤her', 'Theutates Blitz', 'Druidenreiter',
			      'Haeduaner', 'Rammholz', 'Kriegskatapult', 'HÃ¤uptling', 'Siedler');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Fehler bei Feststellung des Stammes!");
	}
	break;
    case "gr":
      	/***********************************************
      	 * GREEK
      	 ***********************************************/
      	t['tribe_type_not_found'] = "Î£Ï†Î¬Î»Î¼Î± ÏƒÏ„Î¿ Distance_time_calculator:\n\n"+
      	    "Î”ÎµÎ½ Î²ÏÎ­Î¸Î·ÎºÎµ Î· Î¦Ï…Î»Î® ÏƒÎ±Ï‚ - Î•Ï€Î¹ÏƒÎºÎµÏ…Ï„ÎµÎ¯Ï„Îµ Ï„Î¿ Ï€ÏÎ¿Ï†Î¯Î» ÏƒÎ±Ï‚";
      	t['home_village_not_found'] = "Î£Ï†Î¬Î»Î¼Î± ÏƒÏ„Î¿ Distance_time_calculator:\n\n"+
      	    "Î”ÎµÎ½ Î²ÏÎ­Î¸Î·ÎºÎµ Ï„Î¿ Ï‡Ï‰ÏÎ¹ÏŒ ÏƒÎ±Ï‚ - Î•Ï€Î¹ÏƒÎºÎµÏ…Ï„ÎµÎ¯Ï„Îµ Ï„Î¿ Ï€ÏÎ¿Ï†Î¯Î» ÏƒÎ±Ï‚";
      	t['Set as reference village'] = "ÎŸÏÎ¹ÏƒÎ¼ÏŒÏ‚ Ï‰Ï‚ Ï‡Ï‰ÏÎ¹ÏŒ Ï€ÏÎ¿Î­Î»ÎµÏ…ÏƒÎ·Ï‚";
      	t['Unset as reference village'] = "Î”Î¹Î±Î³ÏÎ±Ï†Î® Ï‡Ï‰ÏÎ¹Î¿Ï Ï€ÏÎ¿Î­Î»ÎµÏ…ÏƒÎ·Ï‚";
      	t['distance'] = "Î‘Ï€ÏŒÏƒÏ„Î±ÏƒÎ·";
      	t['time'] = "<b>Î§ÏÏŒÎ½Î¿Ï‚:</b> (ÏŽÏÎµÏ‚)";
      
      	switch (g_tribe){
      	case 'Î¡Ï‰Î¼Î±Î¯Î¿Î¹':
      	    g_units = new Array('Î›ÎµÎ³ÎµÏ‰Î½Î¬ÏÎ¹Î¿Ï‚', 'Î ÏÎ±Î¹Ï„Ï‰ÏÎ¹Î±Î½ÏŒÏ‚', 'Î™Î¼Ï€ÎµÏÎ¹Î±Î½ÏŒÏ‚', 'E.Legati',
      			      'E.Imperatoris', 'E.Caesaris', 'ÎšÏÎ¹ÏŒÏ‚', 'ÎšÎ±Ï„Î±Ï€Î­Î»Ï„Î·Ï‚',
      			      'Î“ÎµÏÎ¿Ï…ÏƒÎ¹Î±ÏƒÏ„Î®Ï‚', 'Î†Ï€Î¿Î¹ÎºÎ¿Ï‚');
      	    g_tribe_num = 0;
      	    break;
      	case 'Î¤ÎµÏÏ„Î¿Î½ÎµÏ‚':
      	    g_units = new Array('Î¡ÏŒÏ€Î±Î»Î¿', 'Î‘ÎºÏŒÎ½Ï„Î¹Î¿', 'Î¤ÏƒÎµÎºÎ¿ÏÏÎ¹', 'Î‘Î½Î¹Ï‡Î½ÎµÏ…Ï„Î®Ï‚', 'Î Î±Î»Î±Ï„Î¹Î½ÏŒÏ‚',
      			      'Î¤.Î™Ï€Ï€ÏŒÏ„Î·Ï‚', 'ÎšÏÎ¹ÏŒÏ‚', 'ÎšÎ±Ï„Î±Ï€Î­Î»Ï„Î·Ï‚', 'Î¦ÏÎ»Î±ÏÏ‡Î¿Ï‚', 'Î†Ï€Î¿Î¹ÎºÎ¿Ï‚');
      	    g_tribe_num = 1;
      	    break;
      	case 'Î“Î±Î»Î¬Ï„ÎµÏ‚':
      	    g_units = new Array('Î¦Î¬Î»Î±Î½Î¾', 'Î£Ï€Î±Î¸Î¯', 'Î‘Î½Î¹Ï‡Î½ÎµÏ…Ï„Î®Ï‚', 'TT', 'Î”ÏÎ¿Ï…Î¯Î´Î·Ï‚',
      			      'Î™Î´Î¿Ï…Î±Î½ÏŒÏ‚', 'ÎšÏÎ¹ÏŒÏ‚', 'ÎšÎ±Ï„Î±Ï€Î­Î»Ï„Î·Ï‚', 'Î‘ÏÏ‡Î·Î³ÏŒÏ‚', 'Î†Ï€Î¿Î¹ÎºÎ¿Ï‚');
      	    g_tribe_num = 2;
      	    break;
      	default:
      	    alert("Î£Ï†Î¬Î»Î¼Î± ÏƒÏ„Î·Î½ Î±Î½Î¯Ï‡Î½ÎµÏ…ÏƒÎ· Ï„Î·Ï‚ Î¦Ï…Î»Î®Ï‚!");
      	}
      	break;
    case 'hu':
	/***********************************************
	 * Hungarian (Magyar)
	 ***********************************************/
	debug(d_med, "Hungarian");

	t['tribe_type_not_found'] = "TÃ¡volsÃ¡g szÃ¡mÃ­tÃ¡si hiba:\n\n"+
	    "Nincs megÃ¡llapÃ­tva az Ã¶n tÃ¶rzse - KÃ©rem lÃ¡togassa meg a profiljÃ¡t";
	t['home_village_not_found'] = "TÃ¡volsÃ¡g szÃ¡mÃ­tÃ¡si hiba:\n\n"+
	    "Nincs megÃ¡llapÃ­tva az Ã¶n faluinak koordinÃ¡tÃ¡i - KÃ©rem lÃ¡togassa meg a profiljÃ¡t";
	t['Set as reference village'] = "BeÃ¡llÃ­tÃ¡s kiindulÃ³ falukÃ©nt";
	t['Unset as reference village'] = "BeÃ¡llÃ­tÃ¡s megszÃ¼ntetÃ©se";
	t['distance'] = "TÃ¡volsÃ¡g";
	t['time'] = "<b>IdÅ‘:</b> (Ã³ra)";
	t['Reload Tribe'] = "TÃ¶rzsek ÃºjratÃ¶ltÃ©se";
	t['Merchant'] = 'KereskedÅ‘';
	t['What level is your Tournament Square?'] = 'Milyen szintÅ± az Ã¶n gyakorlÃ³tere?';

	switch (g_tribe){
	case 'RÃ³mai':
	    g_units = new Array('LÃ©giÃ³s', 'TestÅ‘rsÃ©g', 'Birodalmi', 'E. Legati',
				'E. Imperatoris', 'E. Caesaris', 'FaltÃ¶rÅ‘ kos', 'TÅ±z katapult',
				'SzenÃ¡tor', 'Telepes');
	    g_tribe_num = 0;
	    break;
	case 'GermÃ¡n':
	    g_units = new Array('BuzogÃ¡nyos', 'LÃ¡ndzsÃ¡s', 'CsatabÃ¡rdos', 'FelderÃ­tÅ‘', 'Paladin',
				'Teuton Lovag', 'FaltÃ¶rÅ‘ kos', 'Katapult', 'TÃ¶rzsi vezetÅ‘', 'Telepes');
	    g_tribe_num = 1;
	    break;
	case 'Gall':
	    g_units = new Array('Phalanx', 'Kardos', 'FelderÃ­tÅ‘', 'Theutat VillÃ¡m', 'Druida lovas',
				'Haeduan', 'FalrombÃ³lÃ³', 'Harci-katapult', 'FÅ‘nÃ¶k', 'Telepes');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("TÃ¶rzs detektÃ¡lÃ¡sa! TÃ¶rzs = "+g_tribe);
	}
	break;
    case "it":
	/***********************************************
	 * ITALIAN
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Non riesco a determare la tribÃ¹ - per favore vai alla pagina del profilo";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Non trovo le coordinate del villaggio - per favore vai alla pagina del profilo";
	t['Set as reference village'] = "Imposta come villaggio di riferimento";
	t['Unset as reference village'] = "Cancella come villaggio di riferimento";
	t['distance'] = "Distanza";
	t['time'] = "<b>Tempo:</b> (hrs)";

	switch (g_tribe){
	case 'Romani':
	    g_units = new Array('Legionario', 'Pretoriano', 'Imperiano', 'Leg.Cav.',
			      'Imp.Cav.', 'Cav. Romana', 'Ariete', 'Catapulta',
			      'Senatore', 'Decurione');
	    g_tribe_num = 0;
	    break;
	case 'Teutoni':
	    g_units = new Array('Combattente', 'Lanciere', 'Comb.Ascia', 'Esploratore', 'Paladino',
			      'Cav.Teut.', 'Ariete', 'Catapulta', 'Comandante', 'Decurione');
	    g_tribe_num = 1;
	    break;
	case 'Galli':
	    g_units = new Array('Lanciere', 'Comb.Spada', 'Esploratore', 'Cav.Gallica', 'Cav.Difesa',
			      'Cav.Avanzata', 'Ariete', 'Catapulta', 'CapotribÃ¹', 'Decurione');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Problemi nel rilevamento della tribÃ¹!");
	}
	break;
    case "id":
        /***********************************************
         * Indonesian
         ***********************************************/
        t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
            "Could not find your tribe type - please visit your profile page";
        t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
            "No record of your home village location - please visit your profile page";
        t['Set as reference village'] = "Set as reference village";
        t['Unset as reference village'] = "Unset as reference village";
        t['distance'] = "Distance";
        t['time'] = "<b>Time:</b> (hrs)";
        t['Reload Tribe'] = "Reload Tribe";
        t['Merchant'] = 'Merchant';
        t['What level is your Tournament Square?'] = 'What level is your Tournament Square?';

        switch (g_tribe){
        case 'Romawi':
            g_units = new Array('Legionnaire', 'Praetorian', 'Imperian', 'E. Legati',
                                'E. Imperatoris', 'E. Caesaris', 'Battering Ram', 'Fire Catapult',
                                'Senator', 'Settler');
            g_tribe_num = 0;
            break;
        case 'Teuton':
            g_units = new Array('Clubswinger', 'Spearman', 'Axeman', 'Scout', 'Paladin',
                                'Teutonic Knight', 'Ram', 'Catapult', 'Chief', 'Settler');
            g_tribe_num = 1;
            break;
        case 'Galia':
            g_units = new Array('Phalanx', 'Swordsman', 'Pathfinder', 'Theutates Thunder', 'Druidrider',
                                'Haeduan', 'Ram', 'Trebuchet', 'Chieftain', 'Settler');
            g_tribe_num = 2;
            break;
        default:
            alert("Issues in tribe detection! Tribe = "+g_tribe);
        }
        break;
    case "lt":
	/***********************************************
	 * Lithuanian
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator klaida:\n\n"+
	    "Negaliu nustatyti jÅ«sÅ³ genties - eikite Ä¯ savo profilio puslapÄ¯";
	t['home_village_not_found'] = "Distance_time_calculator klaida:\n\n"+
	    "NÄ—ra Ä¯raÅ¡o apie jÅ«sÅ³ kaimÄ… - eikite Ä¯ savo profilio puslapÄ¯";
	t['Set as reference village'] = "Nustatyti kaip numatytÄ…jÄ¯ miestÄ…";
	t['Unset as reference village'] = "PaÅ¡alinti kaip numatytÄ…jÄ¯ miestÄ…";
	t['distance'] = "Atstumas";
	t['time'] = "<b>Laikas:</b> (hrs)";

	switch (g_tribe){
	case 'romÄ—nai':
	    g_units = new Array('Legionierius', 'Pretorionas', 'Imperionas', 'Raitas legatas',
			      'Imperatoriaus raitelis', 'Cezario raitelis', 'MÅ«radauÅ¾ys', 'Ugnies katapulta',
			      'Senatorius', 'Kolonistas');
	    g_tribe_num = 0;
	    break;
	case 'germanai':
	    g_units = new Array('PÄ—st. su kuoka', 'Ietininkas', 'PÄ—st. su kirviu', 'Å½valgas', 'Paladinas',
			      'GermanÅ³ raitelis', 'Taranas', 'Katapulta', 'GermanÅ³ vadas', 'Kolonistas');
	    g_tribe_num = 1;
	    break;
	case 'galai':
	    g_units = new Array('Falanga', 'PÄ—st. su kardu', 'PÄ—dsekys', 'Raitas perkÅ«nas', 'Raitas druidas',
			      'Raitas hedujas', 'Taranas', 'TrebuÅ¡etas', 'KunigaikÅ¡tis', 'Kolonistas');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Problema nustatant gentÄ¯!");
	}
	break;
    case "pl":
	/***********************************************
	 * Polish
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Nie mogÄ™ odczytaÄ‡ rasy - wejdÅº na stronÄ™ profilu";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Brak lokalizacji Twojej wioski - wejdÅº na stronÄ™ profilu";
	t['Set as reference village'] = "Zaznacz wieÅ› odniesienia";
	t['Unset as reference village'] = "Odznacz wieÅ› odniesienia";
	t['distance'] = "Dystans";
	t['time'] = "<b>Czas:</b> (hrs)";
	debug(d_med, "Polski");

	switch (g_tribe){
	case 'Rzymianie':
	    g_units = new Array('Legionista', 'Pretorianin', 'Centurion', 'E. Legati', 'E. Imperatoris',
			      'E. Caesaris', 'Taran', 'Ognista katapulta', 'Konsul', 'Osadnik');
	    g_tribe_num = 0;
	    break;
	case 'Germanie':
	    g_units = new Array('PaÅ‚karz', 'Oszczepnik', 'Topornik', 'Zwiadowca', 'Paladyn',
			      'GermaÅ„ski rycerz', 'Taran', 'Kapatulta(r)', 'WÃ³dz', 'Osadnik');
	    g_tribe_num = 1;
	    break;
	case 'Galowie':
	    g_units = new Array('Falanga', 'Miecznik', 'Tropiciel', 'Grom T.', 'J. Druidzki', 'Haeduan',
			      'Taran', 'Trebusz', 'Herszt', 'Osadnik');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Uwaga - rozpoznanie rasy!");
	}
	break; 
    case "pt":
    case "br":
      	/***********************************************
      	 * Portuguese
      	 ***********************************************/
      	debug(d_med, "Bosanski");
        t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
            "Could not find your tribe type - please visit your profile page";
        t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
            "No record of your home village location - please visit your profile page";

        t['Set as reference village'] = "Set as reference village";
        t['Unset as reference village'] = "Unset as reference village";
        t['distance'] = "Distance";
        t['time'] = "<b>Time:</b> (hrs)";
      
      	switch (g_tribe){
        case 'Romanos':
            g_units = new Array('LegionÃ¡rio', 'Pretoriano', 'Imperiano', 'E. Legati',
                'E. Imperatoris', 'E. Caesaris', 'ArÃ­ete', 'Catapulta de Fogo',
                'Senador', 'Colonizador');
      	    g_tribe_num = 0;
      	    break;
        case 'TeutÃµes':
            g_units = new Array('Salteador', 'Lanceiro', 'BÃ¡rbaro', 'EspiÃ£o', 'Paladino',
                'Cavaleiro TeutÃ£o', 'ArÃ­ete', 'Catapulta', 'Chefe', 'Colonizador');
      	    g_tribe_num = 1;
      	    break;
        case 'Gauleses':
            g_units = new Array('Falange', 'Espadachim', 'Batedor', 'TrovÃ£o T.', 'C. Druida',
                'Haeduano', 'ArÃ­ete', 'Trabuquete', 'Chefe de ClÃ£', 'Colonizador');
      	    g_tribe_num = 2;
      	    break;
      	default:
      	    alert("Problemi sa detekcijom plemena");
      	}
      	break;
    case "ru":
      	/***********************************************
      	 * RUSSIAN
      	 ***********************************************/
      	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
      	    "ÐÐµ Ð¼Ð¾Ð³Ñƒ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»Ð¸Ñ‚ÑŒ Ð²Ð°ÑˆÑƒ Ñ€Ð°ÑÑÑƒ - Ð¿Ð¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð° Ð·Ð°Ð¹Ð´Ð¸Ñ‚Ðµ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ Ð²Ð°ÑˆÐµÐ³Ð¾ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ñ";
      	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
      	    "ÐÐµ Ð¼Ð¾Ð³Ñƒ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»Ð¸Ñ‚ÑŒ ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ñ‹ Ð²Ð°ÑˆÐµÐ¹ Ð´ÐµÑ€ÐµÐ²Ð½Ð¸ - Ð¿Ð¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð° Ð·Ð°Ð¹Ð´Ð¸Ñ‚Ðµ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ Ð²Ð°ÑˆÐµÐ³Ð¾ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ñ";
      	t['Set as reference village'] = "Ð£ÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ€Ñ‚Ð¾Ð²ÑƒÑŽ Ð´ÐµÑ€ÐµÐ²Ð½ÑŽ";
      	t['Unset as reference village'] = "Ð¡Ð±Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ€Ñ‚Ð¾Ð²ÑƒÑŽ Ð´ÐµÑ€ÐµÐ²Ð½ÑŽ";
      	t['distance'] = "Ð Ð°ÑÑÑ‚Ð¾ÑÐ½Ð¸Ðµ";
      	t['time'] = "<b>Ð’Ñ€ÐµÐ¼Ñ:</b> (Ñ‡Ð°ÑÐ¾Ð²)";
      
      	switch (g_tribe){
      	case 'Ð Ð¸Ð¼Ð»ÑÐ½Ðµ':
      	    g_units = new Array('Ð›ÐµÐ³Ð¸Ð¾Ð½ÐµÑ€', 'ÐŸÑ€ÐµÑ‚Ð¾Ñ€Ð¸Ð°Ð½ÐµÑ†', 'Ð˜Ð¼Ð¿ÐµÑ€Ð¸Ð°Ð½ÐµÑ†', 'Ðš.Ñ€Ð°Ð·Ð²ÐµÐ´Ñ‡Ð¸Ðº',
      			       'Ðš.Ð¸Ð¼Ð¿ÐµÑ€Ð°Ñ‚Ð¾Ñ€Ð°', 'Ðš.Ð¦ÐµÐ·Ð°Ñ€Ñ', 'Ð¢Ð°Ñ€Ð°Ð½', 'ÐžÐ³Ð½.ÐºÐ°Ñ‚Ð°Ð¿ÑƒÐ»ÑŒÑ‚Ð°',
      			       'Ð¡ÐµÐ½Ð°Ñ‚Ð¾Ñ€', 'ÐŸÐ¾ÑÐµÐ»ÐµÐ½ÐµÑ†', 'Ð¢Ð¾Ñ€Ð³Ð¾Ð²ÐµÑ†');
      	    g_tribe_num = 0;
      	    break;
      	case 'Ð“ÐµÑ€Ð¼Ð°Ð½Ñ†Ñ‹':
      	    g_units = new Array('Ð”ÑƒÐ±Ð¸Ð½Ñ‰Ð¸Ðº', 'ÐšÐ¾Ð¿ÑŒÐµÐ½Ð¾ÑÐµÑ†', 'Ð¢Ð¾Ð¿Ð¾Ñ€Ñ‰Ð¸Ðº', 'Ð¡ÐºÐ°ÑƒÑ‚', 'ÐŸÐ°Ð»Ð°Ð´Ð¸Ð½',
      			       'Ð¢ÐµÐ²Ñ‚.ÐšÐ¾Ð½Ð½Ð¸Ñ†Ð°', 'Ð¡Ñ‚ÐµÐ½.ÐžÑ€ÑƒÐ´Ð¸Ðµ', 'ÐšÐ°Ñ‚Ð°Ð¿ÑƒÐ»ÑŒÑ‚Ð°', 'Ð’Ð¾Ð¶Ð´ÑŒ', 'ÐŸÐ¾ÑÐµÐ»ÐµÐ½ÐµÑ†', 'Ð¢Ð¾Ñ€Ð³Ð¾Ð²ÐµÑ†');
      	    g_tribe_num = 1;
      	    break;
      	case 'Ð“Ð°Ð»Ð»Ñ‹':
      	    g_units = new Array('Ð¤Ð°Ð»Ð°Ð½Ð³Ð°', 'ÐœÐµÑ‡Ð½Ð¸Ðº', 'Ð¡Ð»ÐµÐ´Ð¾Ð¿Ñ‹Ñ‚', 'Ð¢ÐµÐ²Ñ‚Ð°Ñ‚ÑÐºÐ¸Ð¹ Ð³Ñ€Ð¾Ð¼', 'Ð”Ñ€ÑƒÐ¸Ð´-Ð²ÑÐ°Ð´Ð½Ð¸Ðº',
      			       'Ð­Ð´ÑƒÐ¹ÑÐºÐ°Ñ ÐºÐ¾Ð½Ð½Ð¸Ñ†Ð°', 'Ð¢Ð°Ñ€Ð°Ð½', 'Ð¢Ñ€ÐµÐ±ÑƒÑ‡ÐµÑ‚', 'ÐŸÑ€ÐµÐ´Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑŒ', 'ÐŸÐ¾ÑÐµÐ»ÐµÐ½ÐµÑ†', 'Ð¢Ð¾Ñ€Ð³Ð¾Ð²ÐµÑ†');
      	    g_tribe_num = 2;
      	    break;
      	default:
      	    alert("ÐžÑˆÐ¸Ð±ÐºÐ° Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð¸Ñ Ñ€Ð°ÑÑÑ‹");
      	}
      	break;
    case 'si':
      	/***********************************************
      	 * Slovenian	 
      	 ***********************************************/
	t['tribe_type_not_found'] = "Napaka prera\u010Dunavanja poti:\n\n"+
      	    "Ni mogoce najti tipa igralca - prosim pojdite na stran s profilom";
	t['home_village_not_found'] = "Napaka prera\u010Dunavanja poti:\n\n"+
      	    "Ni podatka o referen\u010Dni vasi - prosim pojdite na stran s profilom vasi";
      	t['Set as reference village'] = "Postavi za referen\u010Dno vas";
      	t['Unset as reference village'] = "Odstrani kot referen\u010Dno vas";
      	t['distance'] = "Razdalja";
      	t['time'] = "<b>\u010Das poti:</b> (hrs)";

      	switch (g_tribe){
      	case 'Rimljani':
      	    g_units = new Array('Legionar', 'Pretorjan', 'Imperijan', 'Izvidnik',
			      'E. Imperatoris', 'E. Caesaris', 'Oblegovalni oven',
			      'Ognjeni katapult', 'Senator', 'Kolonist');
      	    g_tribe_num = 0;
      	    break;
      	case 'Tevtoni':
      	    g_units = new Array('Gorja\u010Dar', 'Suli\u010Dar', 'Metalec sekir', 'Izvidnik', 'Paladin',
			      'Tevtonski vitez', 'Oblegovalni oven', 'Magnonel', 'Vodja', 'Kolonist');
      	    g_tribe_num = 1;
      	    break;
      	case 'Galci':
      	    g_units = new Array('Falanga', 'Me\u010Devalec', 'Stezosledec', 'TT', 'Druid', 'Haeduan',
			      'Oblegovalni oven', 'Trebu\u0161et', 'Poglavar', 'Kolonist');
      	    g_tribe_num = 2;
      	    break;
	default:
	    alert("Napaka pri dolo\u010Ditvi plemena!");
      	}
	break;
    case "sk":
	/***********************************************
	 * SLOVENSKY
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Nebol nastaveny narod - chod na profil";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Meboli nastavene suradnice tvojej dediny - chod na profil";
	t['Set as reference village'] = "NastaviÅ¥ ako referenÄnÃº dedinu";
	t['Unset as reference village'] = "OdstrÃ¡niÅ¥ referenÄnÃº dedinu";
	t['distance'] = "VzdialenosÅ¥";
	t['time'] = "<b>ÄŒas:</b> (hod)";

	switch (g_tribe){
	case 'Rimania':
	    g_units = new Array('LegionÃ¡r', 'PretoriÃ¡n', 'ImperiÃ¡n', 'E. LegÃ¡ti',
			      'E. Imperatoris', 'E. Caesaris', 'Baranidlo', 'Katapult',
			      'Senator', 'OsadnÃ­k');
	    g_tribe_num = 0;
	    break;
	case 'GermÃ¡ni':
	    g_units = new Array('PÃ¡lkar', 'OÅ¡tepÃ¡r', 'Sekera', 'Å peh', 'Rytier',
			      'Teuton', 'Baranidlo', 'Katapult', 'Vodca', 'OsadnÃ­k');
	    g_tribe_num = 1;
	    break;
	case 'Galovia':
	    g_units = new Array('Falanx', 'Å ermiar', 'SliediÄ', 'T. blesk', 'Druid',
			      'Haeduan', 'Baranidlo', 'Katapult', 'NÃ¡celnÃ­k', 'OsadnÃ­k');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Problemy s detekciou naroda!");
	}
	break; 
    case 'net': // Spanish in general??
    case 'es': // Spanish Spain
    case 'ar': // Spanish Argentina 
    case 'cl': // Spanish Chile 
    case 'mx': // Spanish Mexico 
      	/***********************************************
      	 * Spanish
      	 ***********************************************/
      	debug(d_med, "Spanish");
      	t['tribe_type_not_found'] = "No se pudo encontrar su raza - Por favor, visite su pÃ¡gina Perfil";
      	t['home_village_not_found'] = "No se ha guardado su aldea capital - Por favor, visite su pÃ¡gina Perfil";
      	t['Set as reference village'] = "Poner como aldea de referencia";
      	t['Unset as reference village'] = "Quitar como aldea de referencia";
      	t['distance'] = "Distancia";
      	t['time'] = "<b>Tiempo:</b> (hrs)";
      
      	switch (g_tribe){
      	case 'Romanos':
      	    g_units = new Array('Legionario', 'Pretoriano', 'Imperano', 'E. Legati',
      			       'E. Imperatoris', 'E. Caesaris', 'Carnero', 'Catapulta de fuego',
      			       'Senador', 'Colono');
      	    g_tribe_num = 0;
      	    break;
      	case 'Germanos':
      	    g_units = new Array('Luchador de Porra', 'Lancero', 'Hacheros', 'Emisario', 'PaladÃ­n',
			      'Jinete TeutÃ³n', 'Ariete', 'Catapulta', 'Cabecilla', 'Colono');
      	    g_tribe_num = 1;
      	    break;
      	case 'Galos':
      	    g_units = new Array('Falange', 'Luchador de Espada', 'Batidor', 'Rayo de Teutates',
			      'Jinete Druida', 'Jinete Eduo', 'Carnero de madera', 'Catapulta de guerra',
			      'Cacique', 'Colono');
      	    g_tribe_num = 2;
      	    break;
      	default:
      	    alert("Problemas en la detecciÃ³n de raza!");
      	}
      	break;
    case "se":
      	/***********************************************
      	 * SWEDISH
      	 ***********************************************/
      	t['tribe_type_not_found'] = "Distance_time_calculator felmeddelande:\n\n"+
      	    "Kunde inte hitta din stamtyp - var vÃ¤nlig besÃ¶k din profil";
      	t['home_village_not_found'] = "Distance_time_calculator felmeddelande:\n\n"+
      	    "Kunde inte hitta koordinaterna fÃ¶r din by -  var vÃ¤nlig besÃ¶k din profil";
      	t['Set as reference village'] = "AnvÃ¤nd som referens";
      	t['Unset as reference village'] = "Sluta anvÃ¤nda som referens";
      	t['distance'] = "Distans";
      	t['time'] = "<b>Tid:</b>";
      
      	switch (g_tribe){
      	case 'Romare':
      	    g_units = new Array('LegionÃ¤rer', 'Praetorianer', 'Imperiesoldater', 'SpÃ¥rare',
      			      'Imperieriddare', 'Ceasarriddare', 'MurbrÃ¤cka', 'Eldkatapult',
      			      'Senator', 'Nybyggare');
      	    g_tribe_num = 0;
      	    break;
      	case 'Germaner':
      	    g_units = new Array('Klubbman', 'Spjutman', 'Yxman', 'Scout', 'Paladin',
      			      'Germansk Knekt', 'MurbrÃ¤cka', 'Katapult', '# Stamledare', 'Nybyggare');
      	    g_tribe_num = 1;
      	    break;
      	case 'Galler':
      	    g_units = new Array('Falanx', 'SvÃ¤rdskÃ¤mpe', 'SpÃ¥rare',
      			      'Theutates Blixt', 'Druidryttare', 'Haeduan', 'MurbrÃ¤cka',
      			      'Krigskatapult', 'HÃ¶vding', 'Nybyggare');
      	    g_tribe_num = 2;
      	    break;
      	default:
      	    alert("Problem med stambestÃ¤mning!");
      	}
      	break;
    case "ph":
	/***********************************************
	 * TAGALOG (Philipines)
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Hindi malaman ang uri ng iyong tribo - pakibisita ang iyong profile";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Walang nakatalang lokasyon ng iyong baryo - pakibisita ang iyong profile";
	t['Set as reference village'] = "Gawing palatandaang baryo";
	t['Unset as reference village'] = "Alisin bilang palatandaang baryo";
	t['distance'] = "Layo:";
	t['time'] = "<b>Oras:</b>";
	t['Reload Tribe'] = 'Ibalik ang Tribo';
	t['Merchant'] = 'Mangangalakal';
	t['What level is your Tournament Square?'] = 'Anong antas ng iyong Praktisan?';

	switch (race){
	case 'Mga Romano':
	    units = new Array('Legionnaire', 'Praetorien', 'Imperian', 'E. Legati',
			      'E. Imperatoris', 'E. Caesaris', 'Ram', 'Fire Catapult',
			      'Senator', 'Settler');
	    g_tribe_num = 0;
	    break;
	case 'Mga Teutono':
	    units = new Array('Maceman', 'Spearman', 'Axeman', 'Scout', 'Paladin',
			      'T. Knight', 'Ram', 'Catapult', 'Chieftain', 'Settler');
	    g_tribe_num = 1;
	    break;
	case 'Mga Gaul':
	    units = new Array('Phalanx', 'Swordsman', 'Pathfinder', 'TT', 'Druidrider',
			      'Haeduan', 'Ram', 'Trebuchet', 'Chief', 'Settler');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Mga problema sa pag-alam ng iyong tribo!");
	}
	break;
    case "tr":
	/***********************************************
	 * TURKCE
	 ***********************************************/
	t['tribe_type_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Kabile tipi bulunamadÄ±- Lutfen profil sayfani ziyaret et";
	t['home_village_not_found'] = "Distance_time_calculator error:\n\n"+
	    "Koy yerin kayitli degil - Lutfen profil sayfani ziyaret et";
	t['Set as reference village'] = "Referans koyu olarak kullan";
	t['Unset as reference village'] = "Referans koyu belli degil";
	t['distance'] = "Mesafe";
	t['time'] = "<b>Zaman:</b> (hrs)";

	switch (g_tribe){
	case 'RomalÄ±lar':
	    g_units = new Array('Lejyoner', 'Pretoryan', 'Emperyan', 'Equites Legati',
			      'Equites Imperatoris', 'Equites Caesaris', 'KoÃ§baÅŸÄ±', 'AteÅŸ MancÄ±nÄ±ÄŸÄ±',
			      'SenatÃ¶r', 'GÃ¶Ã§men');
	    g_tribe_num = 0;
	    break;
	case 'Cermenler':
	    g_units = new Array('Tokmak Sallayan', 'MÄ±zrakÃ§Ä±', 'Balta Sallayan', 'Casus', 'Paladin',
			      'Toyton', 'KoÃ§baÅŸÄ±', 'MancÄ±nÄ±k', 'Reis', 'GÃ¶Ã§men');
	    g_tribe_num = 1;
	    break;
	case 'GalyalÄ±lar':
	    g_units = new Array('Phalanx', 'KÄ±lÄ±Ã§lÄ±', 'Casus', 'ToytatÄ±n ÅžimÅŸeÄŸi', 'Druyid',
			      'Heduan', 'KoÃ§baÅŸÄ±', 'MancÄ±nÄ±k', 'Kabile Reisi', 'GÃ¶Ã§men');
	    g_tribe_num = 2;
	    break;
	default:
	    alert("Kabile bulunamadÄ±!");
	}
	break;
    }

    // Now we need the troop speeds...
    switch(g_tribe_num){
    case 0: g_speeds = new Array(6, 5,  7, 16, 14, 10, 4, 3, 4, 5, 18); break; // Romans
    case 1: g_speeds = new Array(7, 7,  6,  9, 10,  9, 4, 3, 4, 5, 12); break; // Teutons
    case 2: g_speeds = new Array(7, 6, 17, 19, 16, 13, 4, 3, 5, 5, 24); break; // Gauls
    }
}

function loadImages(){
    g_image['distance'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAANABoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDoPHXj/wAcWviW60Pwl4YnmFqoMl49q8u/Kg5TGFA5xznJFWfDfjvxJB4I1TWdd0O8kurW2N35TQNDkh3Vl3MMAALvxyQN3baK9To/xoA4nwj8U/DPi22tFjvY7PUpvlawnfDq/cKcAOO4I6jGQDwO13RjgkV5zL8FfDH/AAkUmq2UQtUkDLLahN0YDAhtgJwuQxGCGAz8oXjHokSLBCkUYwiKFUEk4A4HJoA//9k=';
    g_image['Merchant'] = 'data:image/gif;base64,R0lGODlhCgAMAPcAAAAAAAAEBQQAAAACCw4GEwARAA8TAg8WDgQZEg8cFRMLAB0WBB0aCRwgHxQ0KSYoGywhHTUvHyInKy0tISwsJC45Kys+PDo1IjM1MjgyNBxFMzNFNzlLMyJMQjZISjxbXj94aU8/L0c6MUZFM1BQTktXY1xkT0V5Y0B4d1B2a2JfQGxeQ2xlS25sXXFsWHl6anR6el+LjmKupFXRyW3NyXLTyoKAZ5GHbpSRcJyXeZ6bfJqRgJ+Xio+hi6eZjq+qjaWikbOti7GtlLiykKamsrvEp8XFoczXt9POsdjUt83Hy+LW2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAKAAwAAAhuAP/9W7HggQqBCIOEgJBBwQ2E/3L4WEJAwA6ISEQoIWKhQhKIPBp4QNGBA8R/G1LQkKGhCEIbBU7MqAGih0AjBgKUiPEhgRCIMAY4QHAA4Y8WGCQcMTEBiEAWESiQ+DfkAgMdAl2MeCGQAQMcAQEAOw==';
    g_image['Down Arrow'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAGAAkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0KfR76DVG8P2+pyDTb8vcESEtIig/vEDHqCWHXrzn+Lf0/wDYFl/z1v8A/wAD5v8A4qiiuWlFc0vU56UVeXqf/9k=';
    g_image['Up Arrow'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAGAAkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0CSDWbmC88TPexw3FnJL5NvHlo1iiZldSSASSVJ98DOMjZ0v27WP+fCw/8DH/APjdFFcS913XU5F7uq6n/9k=';

    // These are all the troop images. Because we don't want to interact with the server more than we have to...
    // Romans = 0
    g_image[0][0] = 'data:image/gif;base64,R0lGODlhEAAQAIcAACAtITJONTNVNzpUOz9UQEJHQkxbTERoS0tnUFVqWGdsaGZwZnl8eVmCXmeEaGaPamiAbHCFcXWXeI2ajouTlI6YmJCPj5icnIKhh4qkjZujo5+uoKWwsKywsLK2trW5ubq+vrbItrnAubvIvLzAwL7Gxr/Hx8PLy8PMzMbMzcbNzcnWy83V1c/U1NDR0tDW1tXf1dDY2NHZ2dLZ2dTZ2dne3t3i4uHm4eru7uzy7Ozw8PDz8/fz9/T4+PX4+Pj5+fv9/fz//P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAEIALAAAAAAQABAAAAh6AIUIHEhwIA4bNQoqFHKwBoeFBHHIUMGBB0SBPVio0ODiohAdMUpU8OARCA0TFEh49DEDBQUQHoW8OEGhg8cfLVx+WLhjA4wfNVJQuADxRgICEDBYIOpxxYMDAiKI8BgiwIQgBgpAzJFhAIOYIyQ0ABBTyAIHCBSUDQgAOw==';
    g_image[0][1] = 'data:image/gif;base64,R0lGODlhEAAQAOZYAP7//+SVnurb3rRQXbqMkuvb3eCiqeKiq/v7+9jBxIlTWfj395FLU7FRXeScpZtPWOOutK2Ymua+xMRdaa13fvnz9OaRm7KQlL2sruKnrtzV1uepsbqys6een8uKk9h+iYw1P40vO7hUYd2kq+KGkebi4uWPmemMl+HFydOaoc5WZfv5+dFmdMK3uPDe4N2mrcelqLyKkOSXoKiYmtezuLpBUM5mc6+MkPj09N3GyaJlbWRMT/Hm59mts+vt7ZwyP6xWYNxwfeKkq9Fmc8g7TZVpb6BGUKxeZ/v//+vN0JAqN/z7+9mgp5mLjaWBhr2jprFKVq1KVrVocfb29olZXs5pdeTb3OKSm////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFgALAAAAAAQABAAAAd6gFiCg4SCODFANIWLKz0bJx6LhEsSBxZGLZKCAEkGJCIcmlgAKEImUU2iWC4ZARMzqgUvASwXqjwjV0NOqgJMMjY3kiUECT4QDkFFCJJWDyBHH1UUqgA5KjU/OhiiSClKTxUMO5oaUiEdggtTkjADRAqqglRQDRHyWIEAOw==';
    g_image[0][2] = 'data:image/gif;base64,R0lGODlhEAAQAOZWAP3///X29/7//4IRDIQQDejp6G8QC+TFt3pQUHZqSa6Sk9uGbMaimIEIBO7x8bFuauXk4764n/v8/cS+tbm5m9vS0oIWE95/Zu7w8LqtgfT49bKunvz9/saflZUvKuDFuaeXYItjY+/u6+WMcrdHOc2Oh9ivpN1nVZBkZNR8a7m5p76mp/z9+7CIiff6+unp6IUNCbW1rKCDYtqIbfz+/+HCtPf39fv+/nVsS4c2KJSRc/zy8IIvIeeaf5VDNtnJy6CSc/n49fXbz+/z6vr+/peRdXl1R+/Z0duOc5NzcmxAN9S3qvf5+tnY1Obh4nUPCbRUS6B4eLOcgIMTDuZwWodjY////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFYALAAAAAAQABAAAAd4gFaCg4SEOyWFiVYSRykPioQ0HzMeFZCCHEJITwqXVgFLPQZJApcCNQtTVUSXDgcjBC0AiS8QVkwdFwNRkE0bNyZUMCiziiwUDCcNCC6XQ1IkFiEYnioZOUoanj8yRgk6ESKQTlA+MQUBQTaKRUA8K56COCAT8YKBADs=';
    g_image[0][3] = 'data:image/gif;base64,R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
    g_image[0][4] = 'data:image/gif;base64,R0lGODlhEAAQAPcAAP////7+/qCJYgAAAKeRbc6/pf7+/aOMZquWdaSNabGefq2Zd7Gdfa+be6aQbK+bektALfz8+6mSbYl7Y4t7YqCUgauVc6uVdJiNelxSQKqVcndsWHdtW6SOaqeci/v6+Lijgp2HY56JaL6rjMKymb2ulIyGe6yXdLSeez0zI4NwUltQQKiSbnNkS66aeqmUcqqUcfHu55aDZKSMZzswH/Xx7qGLZf79/JiIbqyWdHFlUmZUNqeRbNDEsvTx62laQ8i+rbScdXptWLqxoayVcOzo4HJoWv/8+KWTdIR7bI2Cb6iRbrGnk725sY6IfaWPa+fk33tsUi8oHY1+Y7mmiKeRbqWQb5mGZ5OFbpqFY19QNsu+qdHIuPb08KWPbJB9XJ2Vh21jU6eYf7Kefa+aeLemiczCsZiHbZWCZK6YdraliQwIAZyGZPDt5qWOaYB7cq6ZeJ2Mb6aSc5+HYaSOacKyl7Gef2BROZWBX7SdeKiSb/39/IRzWaCYipGEcLCcfI5/Z66ZeZuJa6CReqeQbKSVfa2YdaiRbbqumgkHBaqbgV9PNbWjhLKiiHhvX414VvDs5rKdfZSMgLGdfp6McK2YdqeQa6mSb6KLZMTAuaSNaJ+Mbq6Zd6+ZePv7+byqjfj49fr49u7q5NPHs/n49qeQba+kkbOefqWOaLKde6mTcHFhRufi2GFSOaCJY6iTbrCadVBFM6ybfriigIB6cdnRwVxRP1FELqWQbEc+LXtyY6qUbqiTcNbPwuHZyrKfgLCZdId3W6OUeqCOcKWOagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AAEIBBBgYAQAR8x0AXBQSpZdhBIQsIKDAbFIgiiNqQGgQAEkPyBEAYaCzIk6o3wZEIhpjhdVh4jcaXIDzA46D2QF60WKFZctHmi9MSFpQwomSRAVHDAg15NXDy5tGkZFzS85GPYAkKApgQMXcCS0ODMLxB8FkxR5EiCAV4NOV3QRBJCp1aJBcYYM3CvQhxFTAIp8AFCLhBgtawbQWPXoizBbgCAJdKIDgoogsGAEstNgAYMSbQQmipWHh4MlOSjgYpEqzBQ/oADgsXSgiptTaCqM0PAizScEPQIccNWhVCVDbCZwyCAkBCoFjUIJsEHAgh4EK0QJVHJLRhk+WBjND7iwgJMIRysFxuhTCAiUgAA7';
    g_image[0][5] = 'data:image/gif;base64,R0lGODlhEAAQAPcAAP///wAAANOsauXCivDQmfDOmNqzdtixcf//29+6feK7fenHjuzKlOzKk924e0MxESwbAOTAhXZdNv/ks9qzdK+Uatq1eMmlbP/lsYRpO//xx9+4fZSFbNu4exQIANCxguzauv///efCifXMiuzJj72lfrGnlNu9ie7JioduQ+S/fufKmY+AZeXAh8KibrOggGVMIE04EunFitu4gPDfvb+xnY59XvPQmd27h///8/3dquvFjPjbrLWqmP/w1V5MMfHOlNCsdMCgbv//4riYYP/xxKSUe4RvT4V0XbWbc+vHkZR7T/vWndq1dsqseeK/hfbYpOTKn/DOmdOsbGBNL+vHjj0tEcWpfZ2ThOC9gtGpafvYoOvHj+C7ftu1duK7gPHWqtGxfigWAKyUbPHOmNO1gvXOj457Wd/Mr+K9guXAiaSHW9+4e+fAgv//+9+4ebqkgs6xgP//6c6pbOfEiZN9Wdqxc+vJk/DQm+zHj7OPVvHRnX1sUcenc3FTIJ2UhdO6k/HQmNavbv//8eC7gMynbu7HieC6ft+6ftu2e2BPMdu2ecWqft/Fm8CfZfrdrKmOXtrAmNWvb+nFjGlPJeC6fWdNJf//8P/rye7Mlt+6e9u1ePXQlOS/hLOZbOC9fs7AqdO/n9i/k0w5G6KCT//98NPFrsWzk2VKHv/rv9u1dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAjxAAEIHEgQwCWCHi6oYGMgwQxGBTaRcfIhkEAECE5IeLDEECcSdIrkIChIS6I0ldpYKgUAlJ8mDVZAGuhmCBosf0zUOAOBhhFMAgMEsLLoU4MvYcro4LEHxymBCigYcHCHi4IUV5hsyURAShQAAgRkYZCnD4eBISihAhTHR8GCSEAU1NAIhlAxGfQQEUUlycAeRx6QGoGikxI8DBYUSDUwwCgzmhwcElGhQxcgfDzBEejozQFEXm4ICYUhwpMdEwYMAnBgioUNk2QUGmNDUZ05qgiAASspQQtCA34MfBHDxaM1JaDYUbOgShAWBU1FkgMgIAA7';
    g_image[0][6] = 'data:image/gif;base64,R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
    g_image[0][7] = 'data:image/gif;base64,R0lGODlhEAAQAOZRAP/EAP/OAP/KAP+sAP/AAP/FAP/JAP+zAP++AP+5AP/TAP/PAP+QAP+1AP+ZAP+rAP+NAP+0AP/GAP/CAP/kAP/QAP/dAP/nAP+eAP/UAP+gAP+cAP/BAP+uAP+bAP+pAP+3AP/jAP+IAP+9AP/DAP/HAP+PAP+fAP9UAP/mAP9bAP+kAP+DAP/bAP+jAP+BAP/IAP/XAP+hAP+WAP+7AP/lAP9gAP/fAP+yAP+EAP+6AP/RAP/cAP+2AP/LAP+SAP+CAP/NAP+TAP+/AP/VAP/pAP+nAP9cAP+LAP+4AP/ZAP/MAP+UAP/WAP+aAP+vAP+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFEALAAAAAAQABAAQAe5gFGCg4SFggICJQ1COTYoEEgyICQBgxg7PDFGHg0jBCQAAIUmOh0OMwgTAC1KhlEXFDUVJidODYUGPgsTGhs/QCIeBBISMIIOHxwECQcPAy7IBRWVhSEpQRkUIa6DRRcLCAEJ3BYUCgYIT809JYQbAwpEBxpQDxE4NAX6ggaIBEwMVBxhAWFFBAACBC2RAGDEAQgvRGBgMCBAgAWDOgzhkCRCghMMJgQwoMAQiAwABlS40cQCt5eDAgEAOw==';
    g_image[0][8] = 'data:image/gif;base64,R0lGODlhEAAQAPeVAP7+/vz8/Pb39quRf4YvL0hcKYVBJ0lbJO7Boa+DcqmQf6EcHeKtlePi4IkTGHpGL404O8CbhvLy8dGdhXdOLfr6+rGNeKqQgc+agfb19MKSfYNfPe2zm+mxlu/x7+3w6ktiMffTtJ4aHY4gHOHk4dmli9qhir+9usvFwN3Z2cqVgIQaHryvpqmhl6GnlHhzRfL09LAXHNbTz9fHxqJlZb3DtJMbHribi9TT1qg3Nk1lJKOBedSsl9K9rlZqONKLObEkIHZMMefl37vAwYNmY4x9cY1iQf/FRebp6HwzH2h2QuXp4auBbY+cgvn5+eCslf39/b61rq+UgvGzmL/AvOaul3QmJoosL8jHxz5XKfS2nPz8+7rCuHtgVYcREqQbHadEP9LCwrBlZaeVhcmfiN3f3YaUjNyjh6IjHdvS0sKZgsPKvLyzrqxbW7aNfPj5+Ku1l6+Fg4CJdpSDZY4SGKYYGbuciMaNes3EvLWFN72NdZwTFLunocqjjHhbTtOfPnOBX3SAc9Wiitaiia+HdNSfiUJZH6wWFoZVPNqmjb2CN7OSgcS5tPDw8cnOx9/Ry5RAOcLHvKgaG2JzVn5ZPP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJUALAAAAAAQABAAAAjKACsJHEiwoEGBADy4gLMkwMEPkUg08WFIhxyHBtdMKnAAhJI5WHAAMFgjUJYXF/gkGIPEIABHZlr4KcLIgoI3BhsB4vKICZlBep4IOVjmBIxFU0xgKMTiYCUqKAhpOVNCUBSnQ26o4DChCh4BBbdAqSRggAY3DOxIMCimzYwMUhKp6cPGCcEKYSDs8bKDR4cIRK7QaDAwjQ1JX+isuIMgRI8ch6ykENjlASIKin4kIQAJDBARDuIIDGKE0oY8R/6MiFFnARoDMgQGBAA7';
    g_image[0][9] = 'data:image/gif;base64,R0lGODlhEAAQAPebAD09PTk5OUVFRTU1NVhYWFtbWzc3N4mSoLnD0lJSUkJCQjw8PDc6QEFOYjk4OFdXV0VEQzU1NGdnZ5+tw0ZGRkdQXDIxL39/fzg3NHJyciYqMEBDSF5eXlFOSWFhYeft905bcEpSXebt9snU5MrV5WxsbDE3Py0zPVNgdMzW5FVgcEBAQENCQFppfzk4N01TXT4+Pj49PJGguKazyDMyMikpKK+80TAyM8PM2rTC1lRTUTMyMVBccEhGRVpaWuHp9GR1jYCAgG5ubnx8fDc3NsXQ4HBwcEVRYsfR4igtNEFAP4CMnqi0xzIxMXmGmTA2QSopJzMxMCooJ0lHRktLSysrKklRXjo6OneDlE9PT1lZWTEwLIeRnkpKSjI4QFFQUNni7d/n8kRCQD9KW0NOXqe1ykVTZ9Xe7UxMTHt7eycmJKWyw05NS+bs9bvI3khJSn5+frjBzuPq9lBQT1ZWVoGBgTU0M0NMWYqVpjEwMDIxLjk9RDQ0NE5OTmNjYsfR4V5rf3h4eFNSUXOBlignJTg+RoaQnT5AQ0JIUo6dtElJSUhISDExMDk6OlVVVb/K2U1QVXNzczQ9S0pYbGZmZnZ2dtff7TU0MoiXro+Pj11cWv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJsALAAAAAAQABAAAAjbADcJHEhwoBsEcQoqHOEkBKQKCgnKuAOhA6I1ETf9GMSAjY4XMzIWaaBAEIE3eDIiISPmSwE/GyYobPNoDIsEHIxoUvGBYBkQkrwomVOgUqQePAaKAKJBDZQYfRyVqENpypMUAm2Y0HNlAJoEHoLA0SKgxhEwmxDssdOFwgoCgTIJyQKjCiEzYXIUugRAgCIJF4b4WASAj4UkODYB2kIkAAA6aTI8oKJgQJQTfzaRQNEIgwMDARYsCGAggpQWBDFZOeSCRpM8jHbcmGSp4BkmSw4c4GIISyI5AgMCADs=';
    // Teutons = 1
    g_image[1][0] = 'data:image/gif;base64,R0lGODlhEAAQAOZgAP39/TElMTAmMoJ5eF1VYIJ4eTUlMDEiLhgaJ9jY2eTg3jIgH0gzPCwcD0AsNEE9QsjAv8G3tNDIxx4WIy4fLbCpqCYbJaugnVhOV/Hv725iZlFLU0gtGlE4Hvby8tvT0ZSLikI4QkIwPN3W1MS4uT4zOmdaXD8yQGNRVyMUEE9BTff19Ly0s0s2NNjNtpSGhjosOpF5ZUo1PjUfJSYjM2E/TEAyP0k8RDMkKv38/KSSi4R6ekQ2PVNNT1A2ISobIf79/cK9vTYtL2tbWxgPFkw2QYNvXTQtPOjg3VVCSDYjGyUhMTAsNuTg3yIhMHBjYMjAwO3q6ezo5+rm5aOWmUUqMSMgMEInLjcnMzIiJVQ6RU49Q5SPkTkrM5eOj8DAwP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGAALAAAAAAQABAAAAeFgGCCg2AALF8PIE2EjABcMw48XVkjjINBOF8oW183O5aCFTJFBCoiGBCgYBFfNl8hAV6qUk8CRxtMJVOqCkIITktfJlGqH0RWNBYSqoIvFCcTUMxgSAsMBwUAzBlGHT4tHtM6HEoNMUDTVFgwKS7TJFdaBkM50z1VNT8X02AJGkkDVjALBAA7';
    g_image[1][1] = 'data:image/gif;base64,R0lGODlhEAAQAOZkAP38/fr3+O7m6piJlaaVsP37/PXw8qWVsu7s7Pbx86ubpe/q7X51hvn4+cTD0qqZoXxsfp2Lm6qUnpiLmKSVn1FNYHxrfN7Q16iUpf79/ZeRl3FgfWBAS5qIksO1vOrl6MOxvZN/izo1PUI2SV48R8q2wMSyvNzP1s/Ey8nAwtbI0IeMk5+Pp49+jINuioN0gp2Zpenh5bOdpn5zg5COoJmJloBrilI3Qv38/JWCkINud9PIzcq6wbats/fy9XxwfLurs5OCmfDp7FVTXvf09XdleYeDk4qAmV5CSbWlroh2gu3m6oJthnpnfcK2u6aUrse4wMu5xZ2NkqWToGZaavv6+ry9yY58mIRuhsCttt7T2nhofOXa4f7+/pSJlot/h0gxP8S1vX5pdpSFlP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAeJgGSCg4SFhoJZPIeHEjoAGQWLgkQyUk4BIUk+izsaXjlkCjQvBodCY1cgMVhHVhSGFw9hNkxbBCwONThkAFxRGEMVIy5PUy0bBxFkJUpUTRYQRR4oRlBkA0FaZAIJVQBdgx8ME2QnKpJkDTMwC+iDPytA7oJfIh3zZD1gYvgpJBxL5iFAcsPEoEAAOw==';
    g_image[1][2] = 'data:image/gif;base64,R0lGODlhEAAQAOZqAIeFi4iKm2RojT0/SPv8/IF/gG5tdYB/gnp8kXp/kGlBEYaFi19fblpfaeHh4m5tfWY7Bujp68jIyMrKy5KRlqagmI18ZVY2EHVzfv79/Zh1TP38/JpzQOfd1Ww+BaysrIWHh6uqraiqsVtjX/Hx8ff4+Jyep5eOq7W1td3Z1Mm/s354enFwclVXb29EE+7p45OTiHZnUMHBw66pqG9uclUpAG9xhWVod2Zlc/v8/VVWZXF0jT84LXFxfnN2imk+DYCAk6+vtd7e4fLw7tTJvKuQb4JdMn9/fu/s6WtSM9LS0Y+PlXRZO8nBxWNlb7q7xXBWOj0/TFxaYpaHd9TSz4OFkYyRnpCQneno6FVZW7GZe/z8+VJVZ5CPk6KmroWJmv///ot2YHl5fcq3oPv7/Ly5vnFLH3N3e2dmdWhrf////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGoALAAAAAAQABAAAAeOgGqCg2obTSdbhIqCGWUgWSszZIuDH1VAA1EtS08RQopYIzoIOFwMNg89GIo5MEk8TmgCO1cLBoodHB4xPjdpASJHXYQvGjUWagkNX14ULEqDREZmKgRqVmcmAFIFg2MuFxWDQWIHNCgkakNaP1BUhBIhMhODRQpTJYpgixBhDpSLmCABuCgFwYMIEyoKBAA7';
    g_image[1][3] = 'data:image/gif;base64,R0lGODlhEAAQANU/AOrz5FuGPoKtZGqYSlN8OYyyc/H06vT58qjEk1qEPYWvaPj49E1zNYKla4coK+Tv3v7//pEqLlB0OHCYVXqnXPn8+ExuNFF3N5G9c3GiUJaNWdjUwb6miX2rXlaAOqlSTbJVTm1SMsXatcfcuIClZvLs5tnozqZdU4ivbaPAj5q9gevv4nu0X71vZmyRUnViOZnAflJ5OMrivJm+f8BKTpoxM7KNertMTFqAQZa7fGZFLbLOnn5JM6RuX1qNQP///yH5BAEAAD8ALAAAAAAQABAAAAaBwJ9wSCwaj8aNrXf6tBbIH8jhiNRuq2grQo3QSlEOTxd6aQxRmY9B8LEAUcDAcgkIHtEDhXFJUEZRFQIXMR4dM3hHggwSCQMYOSIAEEUVCgQXBAkZGDAoBSmJPxAqjDgJFx4DCgUoAkQ7FxY4CCkkExMFCIBDJiQuDWgQBweUUVFBADs=';
    g_image[1][4] = 'data:image/gif;base64,R0lGODlhEAAQAPcAAP///////P///v//9v/+/P///f/++YVsPP/++u3cnu3dne3cnf//+v//9+/gqPPovPDirqyYV+7eo45lJOrdlO7founele7hou7fpI9xO56NVdPIeKWRVe3dn8GjUe/gpmtPHYNdKtPKeKJ6N8e9c7SZXvDirayLTm9MGIJmMd3ajV5FFZJrMYBjOcGkVE43EHNOG4pyQ0A1DJ99O5uETntcJ+7fpZBoJeTYhYBgMpVtOO3doPXryJZ6PtjQgMaycLKaVcS0Z9LCmKyFPMWwaH9gM8+/csq0YIJZJcixYb+xa6eRYfPovsaoU4hkKuHap7ebXbWdWNTSjaGBQvPowMevXYZdKWVGF4hsQqqTWO/ux8mzjYpwO+ffwJ53NqJ+PPLot7aVR+zdlrmmXurbkdzSrZJoLqGFWM/Fderaj2JIFfDlrT0wC9rQdYx0RNbOpmVIGopxPrygUsmzaObjotHFfKeTV/TqxfTpwphwMca/eJR8Se7ipXdTHeDYg31XHn1UJOjcj6+TUe/iqV5TLJmCTu7jpfHktFBEFPHkserin8i+cuXek6uFOohuP+3gm5Z9RMasWcGuXI9mJqB+ScOzdevhoufkosu3l+LWf56LUo55RaR9NZxzNDowC4NlL4tyPvHlte/gp5lyMPDjr2ZIGtrPdaWPUqmRU5J/Spl7OpN7QnZOHaWBRoRsN8u0ZLyfVPXtzK2JRe3fnsvBioJmP6mNVox1P8i0adTDbvHlsW9NF52FVY98S5d+Q8K8fsewY+ffmpyFS6iCPIphItrNdtXTf596Qo5mJtLGe5duNPPpvvbw0KqEPufcjrGRUczFg5h+XJF7Q3BKGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AA0gIFCAgQABAAYkrAQmIYAXoPacmiXKVKMECxIckfPqEYA3tJYUAfGJRhY7hYxR8NEgAIAYB/Q8ODRoF6wAzf7MALJBWTJmWrqU2UIpj5cvTlYIYlHCpScZV3xBCmLDQxMyktrkGtEAQK9N0oKRciBmQiQFEsZEcCZLV60W0O7gIYIEgEtcrKY9OwFFIMGDBwHwCWGLiaJlAJ4IwRSNECI1NVxxmdIngyWXZ3LASaFJmJJiOFCh+VAlEAAAbEppWBUFQwVOmRakuRFm2AUAB1LdImHCgYshHRTsELHID7AAbuJwCJUIQhJkk4iNUtVDxZw1WBzRofKAEQwLpzuhFzBjxIqOX7ykxOJRBxCD0wAMtTr241JAADs=';
    g_image[1][5] = 'data:image/gif;base64,R0lGODlhEAAQAPeyAM7a2gAAAI2VlTw/P8PPzyswMCktMwMCAT5CQkxnboSYoJGYmGBmZjs+PsrY2EdhbUpjakVibFVaWc7a2czY2JGXl1NYWJqxuFFVVI6Wlklrhm1ycXN6eSg8TXV8fK+6uxEVFll2jzVVbh0eHlx4kld4k5ukpD1JTEJYak1pdiYpKUZleI2TkSkrKxsjJ2B+j7vGxrXAv7jEx1Rud77O0a27vaawr01QUcfT01F1iE5ueZ2kpFNYU19nZW58gLW/wI6YmWNpaX6FhZOip4ugo7fDwLXHy7zMzDY5OU1nb4KHhsrS0YiQkUJmikNhZ7C4un+TlztFSsTPzzVNWbrHzcvY12N4fFVkZ7m+v2d4hhonLG+Ch5ers2Vqaj9DQxklLVhdXX2EhElhaV15hzFRaUpqc2tydFR4iFxhXaavrqSsrktsgnuFh5CmsJyqrL3IyJqjo2J9hGRqalZnc5qmp7C7vEZjakNib3B3d6+/wVtgYFleXkVldSEjI3CLmExjbGhubkRYYYmNiTVFS5CYmFRlap+ts4KJiQEBA3WBjBEYIzw/Ps3Z2U5VVxIXHis7QqW5vkprdB8sL0NfaLPDxbG8vElpfK24t7/Ly3mVpoifpkhfZzJIWLjDw4eXoM7a2LO9vSctNMDMzJigoGdtbktuekNHR7/FxXCDjLHBvi0wMKuwr87Z2YqcnsvY2ExTV4agrGFnZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALIALAAAAAAQABAAQAj+AGUJHEhQlicaA0FEsDRGCoA0DABIBMJmwRtZH2rMePSFkwYSJZpckGFoYAInRAAwwjFCiKwuBa5soWPBhKwlWJ6YwcADTY8Tinw0SiQwQAAXKVYoAKBEEBUoNnboEagjUhlKACiIGsCkCgA/L2JskLUp0BCJAgYMJKSqhQc8YQoSPBIlC4AfAk+tImUAUQBHHciImBMKhRGBhQZpmZJjTSY1qUK0AcCiiMADks7wQfVpwp46ADAt4hCLgKxJpe5okngoCAAHALjAuiRAVhI7cVyxAiDACwIkr8Q8gFSBwB8IeSSCUtFJoIQ+N0aZAtPKihuJcBoQhAFIToZKAQEAOw==';
    g_image[1][6] = 'data:image/gif;base64,R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
    g_image[1][7] = 'data:image/gif;base64,R0lGODlhEAAQAOZgAD8/PxMTEzY2NiQkJDMzMx0dHS0tLRQUFBcXF3JyciEhISwsLDs7O2xsbFdXVxwcHGdnZxUVFSkpKRISEkdHRyYmJkFBQYSEhGBgYH5+fmFhYVZWVoqKimNjYx4eHhgYGCAgIDk5OTAwMCoqKhYWFm9vb5GRkXh4eHl5eZaWljU1NYmJibS0tJqammtra2hoaCgoKA8PD62trXR0dKWlpYCAgCMjIzc3Nzg4OEVFRUJCQn9/f46OjltbW5+fnzIyMmpqaoiIiIyMjKKiolFRUWVlZRoaGouLi4WFhZSUlJOTk2RkZENDQw0NDS8vLzo6OkRERCUlJUhISH19fVxcXHd3d1paWo+PjysrKz4+PnV1dVVVVU5OTh8fHz09PaampgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGAALAAAAAAQABAAQAfHgGCCg4SFggQbHChQKStUVls2TQo5D4MJJQk8JhcXIRYUAAMBByIdEgEICwIGByQPFYaCXFdJQEIlAlEwHoMLGlkzWjsQEAYVIkYRB14tGTIJDhYjAA4TBgAgE4UHHlgEA7KyBqA/CBEBhg0mRzQuHBA6A04ggyNDJ1M+QUo1RE8bmERAAAZHjwwJbgBogEIDhgcxCghQheRElRcdMFyQIkDCBwZFJIBR0YDFFwoMlihwECJAgQoMBn2YUKAACQUEwHURx5NQIAA7';
    g_image[1][8] = 'data:image/gif;base64,R0lGODlhEAAQAPewAPT19v///52dnW5tbSgoKDM4PTk9Pjs8Pp6cnePj43F8hJGFfjlDS7u7uebm5ebm5hkaG7u6uZGaoZCbokJDQ7O/yVJQUNvc3Pf4+ZmZm5iYmUhLT9zc23J3eXBsand2d2BsdfHx8Ts6OdDQz+rs7k9WW05RVurd0evu70RJTmFVU4SEg1JUVllgZjg+Qz4/QtvPwS8uL5+nsyYpLu7t7N3e3lFSU+zu77i5uGVlZ9rZ2O3v8fv7/FBTWNTU0/Hw7jVARoiFgu/w8Xx7epKcphMQD7i4t/Xx7bOztFVaYTQ2O2pvc6KipJidp6yrqENMV5CQj5ahqeHj5dXV1UM2LtHR0llZWDxJUr3H09PU1G5tbvn6+5ydnXaEjDU1NTI4PSIiIllYWDs9QHB8gvX19Z6rtfn6+vLy8r++vpCRkE5PUkpLUUNFSkdHSFFUWGhxd66tq2t0ezlCR4qKiYiIiouLi1VXXu7p5YiTmmJnbr/Av1lcXbG3u2hmZa+yua+5wnl5eZiYlqmmpNjW1oeHhjg7QYqKiiopKTI1N7nEyqq1vCImKztFTJKQkFlcYCQmJvb4+DA4Q399e8vGwVxaWIuXnkpMUWBiacbHxqKhoZ6dnV9hY4iQlh0dH2BpcWBlajQ+RURBQBcaH8zMzMHBxQ4RFB0dHr29vF9fYqampxISFPz8/J6QgywrLF9eXXF0eP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALAALAAAAAAQABAAAAjoAGHBUuQmhRwglSAJXLiQU6kBmB5IajTGDEOBfFRB0ZNhEJcGXhLBEgJgoZ0VZxxMWQMI1Z4onlwUUoACViRXqU5RIAXLT5IZFnT8oMRohwlNAThYYSKQjZMLaWqg6dMFiY05OCIooZMDgpEQZESEgQMKAwNBhFoZuNSpzqhACEq8KSIK1gQCGywtaYLIR4Ash/DAugICgKNPMrD8kSAmk4YPMZ6s2iLwCAxWWohUYDGiiqEDX25chEUjyKYeQwS0AbOIxGiBk0Ll6aDmUQEerwXeUVHmlak4uReeoNLihZTgCxd4SMAwIAA7';
    g_image[1][9] = 'data:image/gif;base64,R0lGODlhEgASAPfUAC5jKDBlLfr8/j+FO06iSUSQQDFnLkSRQDl5NjFoLi9lKUKNPkOOP0iaQy5hKylWJihUJi5iK0OPP0maQ02iSEqfRUGIPTp6Ni1eKkeLXS9iLD14VEeJVVawUStdJUWSPkSQPkF/UEF9VkB/V3KfoD6EOtvm81GiTNzm8vv8/ixdKTx9OkCEPi9kLEeAcUqRRkGOOEGNOzJpL0GKOTVwLUiYQ1GoTEONPj6DOWiIjj6DOj2COWC3W0V0ckd9aD2AObnK3EV7e1SwTtnk7Z+1xE6BdGa4YkaIVEJ3YS1ZOHehqjl3NUCJOyxYM0J8Wtjj7EmcRWGsXcHV36C71fn7/TdqTkCHPDl7MEORPC9gMi1fJitbJ8jX6EqEctjk5rzN4EGCTypXKPD0+DBnLTyBMjNkPDBpJvf6/TZnUDNtK0KKPSVOHyVOHi1eKS5lK+Lr9E6DhUCKOT1/OD6BQi9mLC9jKkqeRC9lKzdzMzBnLkB9UDBmKy9cOp67z1OrTjVvMl61WarAyUeLVVixU0KOOjZzM9Lf6UWVPEKLPTd1LkGKPdXk7D6GNbrM2kqdRUNzZzVxMuvx+H6rqEaUQU19dy1fKjVoQz1sXWG5XE2NcJi4xS1bKDp4PEiaRO3z+CtZKDJqLDRuLS9jLEWFUyxfKT1+OTBnKCtdJHSeoECJPJ27x87c58bW6idTHzt9N2K0XUKBV0N2fdrm70aYQWm6ZGy+Zzd4LipaIDFpJ1WHe5Wyxa/Gyzd0NC5gKz53VqXB1cXV3TFmLlisU3uhqpCyw0qNY1+dikueRlavUeLp7jd1NC1gKFaZfjBlLjh4LUOJSTVwMbTI2USEU0CHO////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANQALAAAAAASABIAAAj/AKkJHEhw4JkpQZhlKsiQGisSYAbM0NNwIBVdTsjEgDECSEVqYoZxYsQAS4ZoH7lQWhHnwIdnuz6uQuKMSYEahzYkq2jIx5VUEqBQIJQrUkEUwBo9SjStwDEhduYEIviG2CU+TULhWDBhEDIQWYgM/NJjU6s1dX4ommQDEwE1oHIMjLVsC4YHFywwqMAD0KwSd5JoEuiikgM5haDdaNChlp8Frj6xKaNKQJdeDhDo+LOjgRFajqzgCQPhFponcJpFMKBsSSdhrwggKsVLhgoPlrxIEWEmQDADkF5EOXFgAIIWpE5VGZKiDywae/IkoONmTIIAojS00YJKgMBFxljYHkqjAIB5AApM4Soii6CnX5KKCeJwZJS0EL6UmBAYEAA7';
    // Gauls = 2
    g_image[2][0] = 'data:image/gif;base64,R0lGODlhEAAQAOZ6APr6+vb29vv7/Hx/Z8nJyfT09Pz8/PLy8urq6urr63x8fPX19L/Bvnp9bIWGd1RXSlJTTHl5bFVWSW1vaKWllfj59/Pz8zs8OvLy866uq62trfz8/enp6oKCeWlraYGEcbGwsd3d3czMzLe5tnBwcaSln7e3uM/RurCxoWRmV4SId9jY2M7O0Nrb2IeHh7q6u1lZWby8r5aXl9rdzsjIyCEhIGJkWvLy8cvLzENGQNLVyMDApmptZQsLCYGFcPj4+aGhoVhbUbi6ooyMjJeXhIuMiX5+f9HR0YCBf4OGc15eVN3e3d/f37S1scHDwH+CdXV1YqOlnWhrXJCQf7CxmsXGqLm6opGRkZiXmoCAb56gmPHy8NfX11tbUKWql/j4+KCgoNTU1O/v76enp36AfNbW156ei5OUkpubiWlqYpqej+Pj5KutrP39/Xd6aZKWg9nZ28/Pz6Kho7S0n9fX02FhYPHx8YyNdPv7+6anmv///wAAAAAAAAAAAAAAAAAAACH5BAEAAHoALAAAAAAQABAAAAejgHqCg4IGbRklhIQCFTpOLCB5M4qCAWsraVlCVBRRCZRiNGNGEURmcycoWi2EFgRDdVM7VVYdMU1bhAFxLl1KDR8OZHAbigciVzA5SU9oZwcAigVhYCQQbjJ0C5R6ACEaHileZRjcel9HWCpSDAIG5ggvSBJqP+bdXHI8PiP3eggmJgwIsuReARxFHkB5w8EcHiZALtwZwOaeHQIKavSwceNeIAA7';
    g_image[2][1] = 'data:image/gif;base64,R0lGODlhEAAQAOZuAN/f3/j4+KGhoZubm1JSUlFRUWlpaYwVAISEhJmZmdHQ0OTj4piYmP///owaAJeXl/Ly8vr29O3t7e/t7ZgsAMGwlbOzssLCwMDAwJaWlsaaQLmgadOrWc7O0r3AycWbRJ+fn+Hg4Lqqh/Dw8ZyIWJtcKfv39ebg062trbGztM7Fwqqpqcyzfurq6qFrUMmpbIsXAOHk6tza2UtLS8rQ1caPH9TV19PT04wXAGpqapNUNd/LosTExNrJwfHy9mFhYePl5svN0PPz852dnfv685JQLpAbAJMrBqiprqKiocqcQtvEk/7//8fO0PT29rZwEoWFhUhMVH1+fvTx6cnJyaers3FxcdHR0YqKiqdXLnFxclRUVMKiYdC+mbSfhrx/GsTHyvv48mNjY7JtSOfn55qampeBT7zDxpNUNtDU1W5ubpU8FZGRkfr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAG4ALAAAAAAQABAAQAeSgG6Cg4SDbUIQZEEiNS8eUjNqQ4WUhAoCYlZlglcoRUY4a14aSkuVp4M3AlAggiM+TII8bAQGA4QBAGBVJU9mSECVTS5HYyZObidEqMxuCysWzRgZCAmoVAxbPw+DuR1dOzEXWAU5t4QtNhUbHyRRWkmVE2kpaA4UXywSUw2FZzoHYGRRQYMLhzCUQsjoEaGZm0AAOw==';
    g_image[2][2] = 'data:image/gif;base64,R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
    g_image[2][3] = 'data:image/gif;base64,R0lGODlhEAAQAOZZAP//AKuiffr5/v/+ANzXAL+9Ffn5AOvp9Oro8bu4CPr4ALu4Adva5pyUUc3MB8jEuN3dfMrKAqKYPsjAS6CcNMO9gbW0Tujn8Pf2+J+cWPPz+7SwkLW0F9DPzurqAPz7+f39/+fn7tbU5Oro38XCveDgv9fWncPBAK6qVbGxarm3PZ2WgtbQP+fn8Pj4AL+8E7+8rdnXAOjn78W9ApiVVb+5ct7d5fHv9aWjPL69A/f3/rmxB/Lx6ezp5bq2cN3fANnVC8XCDq6lINPTCeTh3/v7/720JMTEF8nCvp6aHvn4+uDfAH1zZvr6952bctjW1ezsAMfGqv7+/7y8VpWGQvr5//38/MzLuq+lPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFkALAAAAAAQABAAQAd5gFmCg4QBNYSIWVcnKSCJiURCCgAGQRMVI4RFGxFJIo+JGBIxLzMuGS2gVj1RDg1GK6BZTzkoArJKTlA/MLKIHyYlCEg7EL4MWAMAAEtHUw+JN1QsQx4ETFKyGioFFzxNsjoWCR2+WVU+CyTmNhwAOCG+MjRAFAeygQA7';
    g_image[2][4] = 'data:image/gif;base64,R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
    g_image[2][5] = 'data:image/gif;base64,R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
    g_image[2][6] = 'data:image/gif;base64,R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
    g_image[2][7] = 'data:image/gif;base64,R0lGODlhEAAQAPfHAIl6YGxjSpGKbevWsqGVeLq0o6GRdtrIp9DEo62Wd5uDY7OacdHEosa3mYZ5XoV7XLKac5uOdbesl3pwXJ6Yf4JoSbmljbaigbCgg8q1kZOCabSggMa4l+/hwLqihKOSbqeUbqSUeLijh5eGabSfhc26nLeph5WHaNLDo4FwWoZpSZiPbFpPOsi9pIRyWbqoip6GZLusiLGlir2ujbuvkZyNb52ObN3GpMWxi8Gke+LOrOXYvNW9laGPbIh4XXt0VWpcR7WjfNO7lJ+RddfEoZCAYZOGZbqqh6uUbrGigZ2Pesq6lK6igGdeRa6PZcKsiqWHX8aofsavjop/Y97LqaqZeKubf7Cdedm7lYBsUqaYgX9oSbOihNzWxZOLdLemjJ2LctG9m6eXf8Gzj5KEbm1hSZGFb6OUfqiVePHiwHxvWObVsrerlYt7YcS3mX1yWquVd5GDZ5yKZJyHa6KFXZZ5V7eulpSHa9LBoIN0XNjFodHCnlZHMr6xlt7Sr5V6WKefgJmJaZV/X4+FaL2tia2acdK+l+DTsp6Rc4x/ZKOYd72oiMCujHx1ZcOwk5OFaKeTdp+Oda+cf3dsS5yDX7ymgKKQdYh6YJKLbtnJp7ajeqyghsetgZmEat/Rrm1hRpmOd7+wkbqee6eNaLypkJqQb9rQtp6PbZ6Mb62khsG0kZeKaMCxl9XGpbmojK6chL2mh9PAm62adpqDYWVeTqeVe8izkNvLo9/UtXJgSJ+XdqSScXRpUJ+KZtXGosy9ntrSvZuNcH5uWK6nisa5osKph7ugegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMcALAAAAAAQABAAQAj5AI8JFFhMhagSFgYOhPSnSBJPikr1yCXoRS0NBsC8Elhn1AE9fnyFmkEk0w0RZwTKsYHoUpk4BIJZ6pRlAq0CCo0tyKCDWBdgLRJEUjgripA1YxgMcYOCiiRYi6Sw+QAiiIlHS26dCFQJVQofI+BIEJhq1Yofk4xMyUNGyyaFA51AyfGkT4MLrOAeg4HkSIdWv3aYwhPG0RyFdHrxuEKIhgwEaQZgIeFKYAVKhg7h2oMjli0MVjZw8SAGAidZMap80vWAzxYFQIS1QUNql6ZCqt7UYOQgEYcvLlioASWQyalBAZrwugMgQggzShrpPUZhGCABmLzYURgQADs=';
    g_image[2][8] = 'data:image/gif;base64,R0lGODlhEAAQAPfCAP7+/v+OAP39/fHx8f+PADqNItV2CLS9x5BfK8G1pO18ANd2BHp2b7J6NqZlFrEAF91zAOp9Af/Xoty1io2FfjMzM/2IAYiFfy0jFzokDb6BOG40HrSjj+7GmZ1fGLiiey9zHP///4YoLYBOFN93AJyEZtF0C5NQAJxqL/+KAJF/auCUO//ToPeCAJd/ZIh0Wp0AHK2rqv2HAJ+kqLFaALuceGxLIMFwE5sMI9avhaIAHLfDzlRUVNZuAP/Tnvr6+nxbCZiDaON4AaJ7Xi2XI7+bdJaboJ2dnbSXdZ99Wd64j6F6S5KTln9hQfuFAJyHbZiCZsCQWaWlpYl/cJmFao57YnIwHmFTKaGVh/fy63sDHJyHa6d0OKaPc46TmOjo6K+xtHYuHqpcAqdjGzo7PMjIyNV3CmZmZvz8/IRtU0JfFN+3iv/bpcipf6NzPP/YpKBaB//Uoih7HL2hfMXM0oeHiJRmMf+KAzefJZF7XzKWIurq6oOJj11dXct1FNrb2rAAHLqyp9GcYP3Qo5qFanJjUcC/vcF6KK+vr/3Wp9Swh29hTea/kx1FEriegP/nrzdnFSFsGKKTf6lbAbB6Oo2NjZpaE2VjYv7NnJyCZcvLy/Dw8DmPI2NLE/z7+fvPm7rH1YOCgf+IAPiCAIluT8BlANzCkmVIH6F8UjBzHIJDBMjIybq6utnZ2pOPisida2NVQ4wmN4GGjD+CJZV2T87OzcCGRPf29s1tAqdZA957CmxeRntMF62KYoBqUOnq6KuGWuaBDf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMIALAAAAAAQABAAAAj3AIUJ7HNGgMCDCA+WqXBECphVXwAkPFiJRwhNRuh4YTIgoUQ0ZBDVkgVqx4wLrAwK3BOKwiU+BwK94rIFQx2EsOCQKPUEiyUnBl4s6niQV4QUKxi18dUjWI0pPxCisiBKQyEoS0bpQhIkwS+JwsQEWOCmRJVDAfw4UvQpB4c/wk44SJNoDZUbQqIIsjWIhY8ihjLs+vBoQq9cI7rgMqEkDiYJLrTgEDHEFDAaKCjJaGGnwxs2eWDoAPQgFoJJpMwQuEPL1ZxMMTbYOGUljCoPSRRAaCDJU6tNwiLJwaOHCJBOV8Y0YZAFYapGIApwUgNpFiEVtxIGBAA7';
    g_image[2][9] = 'data:image/gif;base64,R0lGODlhEAAQAPexAIYbAH8eAMQwBXscANPM2HYYAIdHTsUsAKQlAK0lAH4YAJIkAIseAKglAKUmAO9NHu5OH/Hz+IceAJohA5sjAHomFKojAKQ2ImwXAngkEaaKnaE1IpdseZEmCMgtALwrAL8oANY7D87S5q4mAPpiPIQdALsrAMXN4684IYQqGnQbAMopAHwcAJZMSIkYAIMgAJQyIrYqALIoAKxTS31ZbtY4CI4gAL64zdNEIO5pU28wKZMdAJMiAODf5+zr8qkpBKs4IqAkANjd6uXh56aVqrFPRI5FSK1OTIZFRaIvDN9BEotibXsVAK6FkupIGIggALG1zt06CIldaLYsA5iQpdxOLeFaP5wwD/tqT/b3+uPl74tUWasiAI4hAH8YAIEaAKCRqXUYAIIhB5MnDKguEIkfALstA7gnAH0YALomAMssALgqAWIVAH4dANMxAaE+L9EzA768zZhLQvr7/WkqI/hcM/NaNv7+/rezyaMhALu81dra594+D6tIQcQpAOLm8+zv9+rv+MEsAOlVM602Hak3Ip8oAnE7PIMbAHQYAMQzC4UgAKMlAMYuAMYsALgkAJZcXddOL8bO5YMdAPz8/urv95UoD8UtALYnAHsZAPhWJ3cYAKomANk6C88xAtk6Cu3v94siAnxfa7SlspU6LZ6Wq9hCHuZhSrgpAJNZX2gTAG4zMsCktp4oCpuPp3dIU34aAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALEALAAAAAAQABAAAAjoAGMJHEhQoCQaR/oULBgBzJs1IOQsHHhiywg/K1oImUgJD6lHjtQU2TPxDhVLaTy4MTNqYiwirc4c6BSFTJyCWoaUGoOpEZ8HcCBlGfjH1So6YhII+qTJiQVRcwRCOVRAVSIEHzxBqBOCi44eAl+hYdGmjIlLSkgMEhAEgxQfsYwM6BKDB6cadrCYQmWDTZgllQwEeMHIwRQcp6woavBExaYMBDR0QCSBwY9IOaoIkEEhQKYKBEBxmABgUolQV5IYWrBoABMkgGIFYkUozw4AXhTA+gLARYobBEU0mYECSKELG2Ck0iMwIAA7';
}