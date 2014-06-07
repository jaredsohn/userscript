// ==UserScript==
// @name           Travian Report & IGM Filter, Tribute Tracker
// @version        4.3.6
// @namespace      http://userscripts.org/scripts/show/34299
// @author         arandia.t
// @description    This filters your reports based on their village of origin
// @include        http://*.travian.*/berichte.php*
// @include        http://*.travian.*/nachrichten.php*
// @include        http://*.travian.*/spieler.php?uid=*
// @exclude        http://*.travian.*/berichte.php?id=*
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

// ====== USER CHANGEABLE VALUES ======
// Change this as you will...
var inbox_size = 13;

// This expands your inbox/report box, but the limitation is that this also
// reveals (potentially) to the server that you are using a script. The server
// (and associated multihunters) tend not to like scripts... use at your own risk.
var forward_fill = true;

// This turns on a randomized delay between polling the server for new messages
// This is a compromise - it should make it impossible to track this script,
// but you will suffer a performance loss. Disable at your own risk.
var delay = true;

// This is whether or not to use the inbuilt archive system if another archive system
// is present. Default false.
var use_archive = false;

// This lets you start loading messages immediately, instead of waiting for
// the signal from you.
var start_load_immediately = false;

// I gotta find a better way to store these options...
// This marks trading reports between your own villages
var read_self_trade = true;

// This marks trading reports with other villages
var read_other_trade = true;

// Can override your default language selection here; just uncomment and
// add the suffix of the language you want
//var g_language = '';
// ====== END OF USER CHANGEABLE VALUES ======

// Changes Log

/****************************************************************************************************************************
 * Date:         | Name:        | Description:
 ****************************************************************************************************************************
 * Sept 19, 2008 | Arandia      | Created. Wrote basic helper functions, debug etc.
 * Sept 23, 2008 | Arandia      | Implemented the main and myVil functions
 * Sept 25, 2008 | Arandia      | Rewrote the main function to be more elegant
 * Oct   1, 2008 | Arandia      | Added a link to turn off filtering
 * Oct   6, 2008 | Arandia      | Fixed the enable/disable link
 * Oct   7, 2008 | Arandia      | Relocated the enable/disable link
 * Oct   7, 2008 | Arandia      | Restructured to allow for multi-language
 * Oct   7, 2008 | Dream1       | Added Arabic support
 * Oct  10, 2008 | ZAn_Ton      | Added Romanian support
 * Oct  10, 2008 | Metador      | Added German support
 * Oct  10, 2008 | MindTwister  | Added Hebrew support
 * Oct  11, 2008 | Brunoa       | Added Portuguese support
 * Oct  11, 2008 | Sasai        | Added Serbian and Bosnian support
 * Oct  11, 2008 | Arandia      | Merged with IGM filter, for more details please see http://userscripts.org/scripts/show/35173
 * Oct  13, 2008 | MrD          | Added Swedish support
 * Oct  13, 2008 | Drewo        | Added Czech and Slovak support
 * Oct  14, 2008 | Dream1       | Revised Arabic support
 * Oct  14, 2008 | BmW          | Added Slovenian support
 * Oct  14, 2008 | Metador      | Modified include pages for German support
 * Oct  14, 2008 | Abelorian    | Added Spanish support (and all associated servers)
 * Oct  15, 2008 | Arandia      | Corrected positioning of message link on Arabic servers
 * Oct  15, 2008 | Arandia      | Also expanded r-t-l positioning support to Hebrew
 * Oct  16, 2008 | Arandia      | Added mouseovers to the village links for the report filter
 * Oct  17, 2008 | Arandia      | Removed the mouseout  and added a report filter key
 * Oct  21, 2008 | Arandia      | Added reset and display for the message filter
 * Oct  22, 2008 | Arandia      | Added the getNext and onNextLoad functions, and modified code everywhere to support forward_fill
 * Oct  23, 2008 | Arandia      | Changed code to cancel timers on mouseover
 * Oct  23, 2008 | QusaiAbuHilal| Extended Arabic translation
 * Oct  23, 2008 | Arandia      | Restructured the code for enhanced elegance, bug fixes
 * Oct  28, 2008 | Dream1       | Revised Arabic support
 * Oct  28, 2008 | Arandia      | Added code to streamline the >> and << arrows, bug fixes
 * Oct  28, 2008 | Foxyhearts   | Added Dutch support
 * Oct  29, 2008 | Arandia      | A small bug fix, for plus users
 * Oct  29, 2008 | Arandia      | Added an indicator for when the entire mailbox has been sorted
 * Nov   5, 2008 | Arandia      | Restructured the timeout cancelation (rather, removed it)
 * Nov   6, 2008 | Arandia      | Started the tribute-checking feature
 * Nov   7, 2008 | Arandia      | Worked on the tribute-checking feature
 * Nov  11, 2008 | Arandia      | Canceled the arrow replacement if forward-fill is off. Finished the tribute-checking feature
 * Nov  12, 2008 | WiCiO        | Added Polish support
 * Nov  12, 2008 | KakTyc       | Added Russian support
 * Nov  13, 2008 | MrD          | Updated Swedish support
 * Nov  13, 2008 | Arandia      | Added check for yesterday's tribute
 * Nov  14, 2008 | Arandia      | Added mouseovers to the vassal village table, and restructured code
 * Nov  15, 2008 | Arandia      | Fixed a bug in filtering the sent messages. Also removed a few language dependancies
 * Nov  16, 2008 | Arandia      | Fixed a bug in the tribute checker
 * Nov  23, 2008 | Arandia      | Started work on the archive functionality
 * Nov  26, 2008 | Arandia      | Fixed a bug in parsing requested reports
 * Nov  30, 2008 | Arandia      | Finished the archive functionality (finally!)
 * Dec  01, 2008 | Arandia      | Fixed a missing onClick, and repaired repeatedly clicking on 'archive'
 * Dec  03, 2008 | Arandia      | Fixed the date formatting, and expanded for other date formats
 * Dec  04, 2008 | Arandia      | Established compatibility with Travian Beyond!
 * Dec  08, 2008 | Arandia      | Added a 'start' button so as to wait for the user before loading messages/reports
 * Dec  08, 2008 | Arandia      | Expanded the 'start' button into a 'stop' button as well
 * Dec  08, 2008 | Arandia      | Stopped the arrows from updating if the script is disabled
 * Dec  09, 2008 | Arandia      | Added the message-inverting feature
 * Dec  09, 2008 | Arandia      | Fixed bugs involving tooltip for startLoading, and archive/plus compatibility
 * Dec  09, 2008 | Arandia      | Added a menu command to refresh the date format
 * Dec  10, 2008 | BmW          | Updated Slovenian support
 * Dec  10, 2008 | beppegg      | Added Italian support
 * Dec  15, 2008 | Arandia      | Started work on function to mark trading reports as read
 * Dec  15, 2008 | WiCiO        | Updated Polish support
 * Dec  21, 2008 | NotStyle     | Added Lithuanian support
 ****************************************************************************************************************************/

var d_none=-1, d_highest=0, d_hi=1, d_med=2, d_low=3, d_lowest=4, d_all=4;
//* d_none is for the final release - don't forget to set it before uploading
var d_level=d_highest;/*/
var d_level=d_low;//*/

// ====== GLOBALS ======
var url = window.location.href;
var latest_url = url;
var server = url.split('/')[2];

var t = []; // For language translations - filled in the last function
if (typeof(g_language) != "undefined") setLanguage(g_language);
else setLanguage(server.split('.')[2]);

// This loads some predefined 64-bit images
var image = [];
loadImages();

var LINK_ID = 'enable'; // This is the same for both msg and rpt
var CLEAR_ID = 'clear';

// Keys to access the GM_values - do not change!
var rpt_en_key = server+'_rpt_enable'; // Whether report filtering is on
var msg_en_key = server+'_msg_enable'; // Whether message filtering is on
var msg_filter_key = server+'_filter'; // This is the name to filter msgs for
var rpt_filter_key = server+'_rpt_filter'; // This is the village to filter rpts for
var archive_msg_key = server+'_msg_archive'; // This is to store the archive of messages
var archive_rpt_key = server+'_rpt_archive'; // This is to store the archive of reports
var vassal_key = server+'_vassal_list'; // A list of all people owing tribute
var date_format_key = server+'_date_format'; // The format for the date

// Message storage
var g_table; // The table where things are displayed
var unfiltered = []; // The initial msgs/rpts on the page
var filtered = []; // The msgs/rpts that pass the filter

// Vassal storage
var g_vassals = []; // A list of all people owing tribute
var g_paid = []; // A list of lists of the vassals payments

// Archive usage
var g_archive_title = []; // The <tr> object titles
var g_archive_content = []; // The <table> object messages
var g_archive_table; // Where to store the display table while showing a message

// Date stuff
var g_date = new Date();
var g_yesterdate = new Date();
g_yesterdate.setDate(g_yesterdate.getDate() - 1);

var g_date_format = GM_getValue(date_format_key, '');
// If we have no saved preference, get the format in use
if (g_date_format == '') retrieveDateFormat();
// Add the option to refresh the chosen date format
GM_registerMenuCommand('Report & IGM Filter: ' + t['Reload date format'], retrieveDateFormat);

var g_filter; // the global parameter to search for
var g_place = 0; // The index to start displaying results from
var g_disp; // The array currently being displayed
var g_vil = myVil(); // The village currently being filtered for
var g_pause = !start_load_immediately; // Whether to pause in loading reports
var en;

var g_cross = '✘';
var g_check = '✔';
var g_dot = '●';

var g_split1 = '☓';
var g_split2 = '☒';

// All errors are global...
var error_beyond = new Error('Travian Beyond detected running on this page');
var error_plus = new Error('This is a plus account!');

var g_update_disp = true;

if (url.indexOf('berichte') != -1){ // We're on the 'report' page
    if (url.indexOf('s=') == -1){ // reset the rpt_filter_key
	GM_setValue(rpt_filter_key, false);
    }

    var run_type = 'report'; // To determine what page we're on later
    var en_key = rpt_en_key;
    window.addEventListener('load', report, false);
}
else if (url.match('nachrichten[.]php[?]id')){ // This is a specific message
    window.addEventListener('load', singleMessage, false);
}
else if (url.match('nachrichten')){ // We're on the 'message' page, but *not* a specific message
    var run_type = 'message'; // To determine what page we're on later
    var en_key = msg_en_key;
    window.addEventListener('load', message, false);
}
else if (url.indexOf('spieler') != -1){ // We're on the 'profile' page
    var run_type = 'profile'; // To determine what page we're on later
    var en_key = msg_en_key;
    window.addEventListener('load', profile, false);
}
else return; // We're on an unknown page (somehow)

//==========================================================================
// These are basic utility functions
//==========================================================================

/*****************************************************
 * Provides basic debugging
 *****************************************************/
function debug(lvl, msg){
    if (lvl <= d_level) GM_log("\n"+msg);
}

/*****************************************************
 * Shortcut to debug at the highest level
 *****************************************************/
function dbg(msg){
    debug(d_highest, msg);
}

/*****************************************************
 * Evaluates the xpath using document.evaluate
 * This always returns an ORDERED_NODE_SNAPSHOT_TYPE
 *****************************************************/
function xPathEval(xpath){
    rtn = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!rtn) debug(d_hi, "Evaluation of xpath '" + xpath + "' failed!");
    return rtn;
}

/*****************************************************
 * This retrieves the user's prefered date.
 *****************************************************/
function retrieveDateFormat(){
    GM_xmlhttpRequest({
	    method: 'GET',
		url: 'http://'+server+'/spieler.php?s=2',
		headers: null,
		onload: function(e){
		    var txt = e.responseText;
		    g_date_format = txt.substr(txt.indexOf('" checked>') - 1, 1);
		    GM_setValue(date_format_key, g_date_format);
	    }
	});
}

/*****************************************************
 * This formats a date into a string appropriately
 *****************************************************/
function formatDate(d){
    var day = d.getDate();
    var mon = d.getMonth()+1; // Runs from 0-11, we want 1-12
    var year = ''+d.getFullYear(); // Convert to a string

    if (day < 10) day = "0"+day; // Don't forget to pad with 0's
    if (mon < 10) mon = "0"+mon;
    year = year[2] + year[3]; // Two-digit year only

    switch (g_date_format){
    case '0': return day + '.' + mon + '.' + year; // Euro
    case '1': return mon + '/' + day + '/' + year; // US
    default: 
    case '2': return day + '/' + mon + '/' + year; // UK
    case '3': return year + '/' + mon + '/' + day; // ISO
    }
}

/*****************************************************
 * This returns an array comprising the names of all
 * of the player's villages
 *****************************************************/
function getVilNames(){
    var rtn = new Array();

    var input = xPathEval('//td[@class="nbr"]');
    if (input.snapshotLength == 0){ // Not present, single-village acct
	debug(d_med, "No point filtering for a single village!");
	return rtn;
    }
    
    for (var i=0; i < input.snapshotLength; i++){
	rtn.push(input.snapshotItem(i).childNodes[2].textContent);
	debug(d_low, rtn[i]);
    }
    
    return rtn;
}

/*****************************************************
 * This extracts the active village name
 *****************************************************/
function myVil(){
    var input = document.getElementById("lright1");
    if (input.innerHTML.indexOf("active_vl\">") != -1){ // Multi-village acct.
	var rtn = GM_getValue(rpt_filter_key);
	if (rtn == false)
	    return input.innerHTML.split('active_vl">')[1].split('</a>')[0];
	return rtn;
    } else {
	debug(d_med, "Single village accounts not currently supported");
	return false;
	// Well, what's the point in filtering your messages by village if you only
	// have one village, really? This is only used for report filtering.
    }
}

/*****************************************************
 * This creates a link with text txt that executes
 * function funct on clicking.
 *****************************************************/
function makeLink(txt, id, funct){
    a = document.createElement("a");
    a.id = id;
    a.style.cssFloat = t['left'];

    a.innerHTML = txt;
    a.addEventListener('click', funct, false);
    a.href = "#";

    return a;
}

/*****************************************************
 * This places a given list in the report table
 *****************************************************/
function swapTables(new_elems){
    // This stores the current display for next time
    if (typeof new_elems != 'undefined') g_disp = new_elems;

    var t_elems = g_table.childNodes;
    footer = t_elems[t_elems.length-1];// The last element in the table

    // Clear the table, but not the header or footer...
    while (t_elems[1] != footer){
	g_table.removeChild(t_elems[1]);
    }

    if (g_disp.length == 0) return; // We have no elements to insert

    // Insert the new elements
    for (var i=0; i < inbox_size && i+g_place < g_disp.length; i++){
	g_table.insertBefore(g_disp[i+g_place], footer);
    }
}

//============================================================================================================
// These are the filtration functions
//============================================================================================================

/*****************************************************
 * This filters a given rpt table (complete with header
 * and footer) for the elements of 'names', and pushes
 * its results into arrays in 'filtered', indexed by the
 * elements of 'names'. It also pushes them unsorted
 * into 'unfiltered'.
 *****************************************************/
function rptFilter(rpt_table, names){
    var today = formatDate(g_date);
    var yesterday = formatDate(g_yesterdate);

    // Make sure to ignore the header and footer...
    // If we're on a trade or similar page, there's an extra header for some reason...
    var i = url.indexOf('t=')==-1 ? 1 : 2; // Hack...
    for (; i < rpt_table.childNodes.length-1; i++){
	// Careful about running out of elements
	if (rpt_table.childNodes[i].childNodes.length <= 1){
	    debug(d_hi, "We ran out of elements!");

	    var e = document.getElementById('start_loading');
	    e.parentNode.parentNode.removeChild(e.parentNode);

	    return false;
	}

	var day = rpt_table.childNodes[i].childNodes[5].textContent.split(' ')[0];

	// Store the unfiltered reports...
	unfiltered.push(rpt_table.childNodes[i]);

	// Deal with encountering vassals... we have to check each one, expensive.. :(
	for (var j=0; j < g_vassals.length; j++){
	    // If the vassal has been found
	    //dbg(g_vassals[j].childNodes[1].textContent);
	    if (rpt_table.childNodes[i].textContent.indexOf(g_vassals[j].childNodes[1].textContent) != -1){
		debug(d_low, "Found "+g_vassals[j].childNodes[1].textContent);
		// Push this message into the appropriate list
		g_paid[g_vassals[j].childNodes[1].textContent].push(rpt_table.childNodes[i]);

		if (g_vassals[j].childNodes[0].textContent == g_check ||
		    g_vassals[j].childNodes[0].textContent == g_dot) continue;

		if (day == today) g_vassals[j].childNodes[0].textContent = g_check;
		if (day == yesterday) g_vassals[j].childNodes[0].textContent = g_dot;
		
		break;
	    }
	}

	// Do this for each village, for each element
	for (j=0; j < names.length; j++){
	    // If the village name is found in the element, push it
	    // (so long as we don't already have too many results)
	    if (rpt_table.childNodes[i].textContent.indexOf(names[j]) != -1){
		filtered[names[j]].push(rpt_table.childNodes[i]);
	    }
	}
    }
    return true;
}

/*****************************************************
 * This filters a given msg table for 'name' and pushes
 * its results into the array 'filter' directly.
 *****************************************************/
function msgFilter(msg_table, name){
    // Make sure to ignore the header and footer...
    for (var i=1; i < msg_table.childNodes.length-1; i++){
	if (msg_table.childNodes[i].childNodes.length <= 1){
	    debug(d_hi, "We ran out of messages");

	    var e = document.getElementById('start_loading');
	    e.parentNode.parentNode.removeChild(e.parentNode);

	    return false;
	}

	unfiltered.push(msg_table.childNodes[i]);

	if (name == msg_table.childNodes[i].childNodes[4].textContent){
	    filtered.push(msg_table.childNodes[i]);
	}
    }
    return true;
}

//============================================================================================================
// There seem to be a lot of functions just dealing with the stupid arrows...
//============================================================================================================

/*****************************************************
 * This changes the viewing index
 *****************************************************/
function arrowsOnClick(e){
    e.stopPropagation();
    e.preventDefault();

    // Incriment/decriment the g_place holder appropriately
    if (e.currentTarget.id == 'leftArrow'){
	if (g_place <= inbox_size){
	    g_place = 0;
	}
	else {
	    g_place -= inbox_size;
	}
    }
    else if (e.currentTarget.id == 'rightArrow'){
	if (g_place + 2*inbox_size > g_disp.length){
	    g_place = g_disp.length - inbox_size;
	}
	else {
	    g_place += inbox_size;
	}
    }
    // Don't pass it any parameter, so keep displaying the same table
    swapTables();
}

/*****************************************************
 * This updates the << and >> links appropriately
 *****************************************************/
function updateArrows(done){
    // We need to modify the << and >> link at the bottom to point accurately
    var a = g_table.childNodes[g_table.childNodes.length - 1];
    for (var index=0; index < a.childNodes.length; index++){
	if (a.childNodes[index].textContent.indexOf('«') != -1) break;
    }

    if (typeof(done) != "undefined" && done == true){ // This adds the checkmark
	var txt = '<span>✔</span>&nbsp;';
    }
    else var txt = '';
    txt += '<a set="yes" id="leftArrow" href="#"><b>«</b></a><a set="yes" id="rightArrow" href="#"><b>»</b></a>&nbsp;';
    
    a.childNodes[index].innerHTML = txt;

    enableArrow(document.getElementById('leftArrow'));
    enableArrow(document.getElementById('rightArrow'));
    return;
}

/*****************************************************
 * This turns off an arrow, and replaces it with text
 *****************************************************/
function disableArrow(e){
    e.removeEventListener('click', arrowsOnClick, false);
}

/*****************************************************
 * This turns on an arrow
 *****************************************************/
function enableArrow(e){
    e.addEventListener('click', arrowsOnClick, false);
}

//============================================================================================================
// These are the message & report-fetching functions
//============================================================================================================

/*****************************************************
 * This runs when the results from the next page load
 *****************************************************/
function onNextLoad(response){
    var txt = response.responseText;

    // This is where we'll put the table
    var temp_table = document.createElement('table');

    if (run_type == 'report'){
	debug(d_low, "Got a new page of reports");
	//dbg(txt);

	// this should extract just the table html
	txt = txt.split('table cellspacing="1" cellpadding="2" class="tbg">')[1];
	txt = txt.split('</form></div></div></div><div id="lright1">')[0];
	txt = txt.substr(2, txt.length - 12);
	debug(d_lowest, txt);

	temp_table.innerHTML = txt;

	var cont = rptFilter(temp_table.childNodes[0], g_filter);

	// Only update the display if we're supposed to
	if (g_update_disp){
	    // Update the display appropriately
	    if (en) swapTables(filtered[g_vil]);
	    else swapTables(unfiltered);
	}
    }
    else if (run_type == 'message'){
	debug(d_low, "Got a new page of messages");

	// this should extract just the table html
	txt = txt.split('<table cellspacing="1" cellpadding="2" class="tbg">')[1];
	txt = txt.split('</table></td></tr><tr><td class="nbr"><span>&#8226;</span>&nbsp;')[0];
	debug(d_lowest, txt);

	temp_table.innerHTML = txt;

	var cont = msgFilter(temp_table.childNodes[1], g_filter);

	// Only update the display if we're supposed to
	if (g_update_disp){
	    // Update the display appropriately
	    if (en) swapTables(filtered);
	    else swapTables(unfiltered);
	}
    }

    if (g_pause) return;

    if (cont){
	if (delay) window.setTimeout(getNext, Math.floor(Math.random()*250)+750);
	else getNext();
    }
    else { // We need to insert a 'done' mark
	updateArrows(true);
    }
}

/*****************************************************
 * This gets the next 10 messages or reports
 *****************************************************/
function getNext(){
    // Don't do this if the user asked us not to
    if (!forward_fill) return;

    debug(d_med, "We're getting the next 10!");

    // Here we want to calculate the url of the next 10 reports

    // If we're on the initial report/message page
    if (latest_url.indexOf('s=')==-1){
	debug(d_low, "'s=' not found in url; append '?s=10'");
	if (latest_url.indexOf('?')!=-1){
	    latest_url += '&s=10';
	}
	else {
	    latest_url += '?s=10';
	}
    }
    // Else we should extract and incriment that value by 10 to get the next page
    else {
	debug(d_low, "'s=' found in url; increment by 10");

	// Strip off any troublesome #'s...
	if (latest_url.indexOf('#') != -1) latest_url = latest_url.split('#')[0];

	a = latest_url.split('s=')[1];
	// Hack to avoid infinite recursion, just in case...
	if (parseInt(a) > 300){
	    updateArrows(true);
	    return;
	}
	latest_url = latest_url.split('s=')[0] + 's='+(parseInt(a)+10);
    }

    debug(d_low, latest_url);

    GM_xmlhttpRequest({
	    method: 'GET',
		url: latest_url,
		headers: null,
		onload: onNextLoad});
}

//============================================================================================================
// These are the archive-related functions
//============================================================================================================

// The idea here is that when the archive button gets clicked, archiveMessage() finds the first checked message.
// It then pushes the HTML onto the archive, and gets the actual message with an xml request. When the request
// returns, it runs archiveMessageOnLoad(), which fills in the message text behind the header HTML. On
// completing, it runs archiveMessage, which finds the *next* checked message and repeats.

/*****************************************************
 * This runs on loading the actual message
 *****************************************************/
function archiveMessageOnLoad(e){
    var txt = e.responseText;

    // Find the text we're looking for
    txt = txt.split('<form method="post" action="nachrichten.php">')[1];
    txt = txt.split('</form></div></div></div><div id="lright1">')[0];
    txt = txt.substr(2); // Strip off a leading newline...

    debug(d_med, txt);

    // Save it
    var ar = GM_getValue(archive_msg_key, '');
    ar += txt;
    GM_setValue(archive_msg_key, ar);

    // Go and get the next message
    archiveMessage();
}

/*****************************************************
 * This adds a message to the archive
 *****************************************************/
function archiveMessage(){
    // Find the first checked message
    // If the next element is the footer, we want to stop the whole cycle...
    for (var i=1; g_table.childNodes[i].childNodes[0].childNodes[0].checked == false; i++)
	if (i+1 == g_table.childNodes.length-1) return;

    var ar = GM_getValue(archive_msg_key, '');

    if (ar) ar += g_split1 + g_table.childNodes[i].innerHTML;
    else ar = g_table.childNodes[i].innerHTML;

    // To separate the listing from the message
    ar += g_split2;

    // The url of the message to save...
    var u = g_table.childNodes[i].childNodes[2].childNodes[0].href;

    // Clear the checkmark so we don't archive this message again
    g_table.childNodes[i].childNodes[0].childNodes[0].checked = false;

    // Save what we have so far...
    GM_setValue(archive_msg_key, ar);

    // Get the message
    GM_xmlhttpRequest({
	    method: 'GET',
		url: u,
		headers: null,
		onload: archiveMessageOnLoad});
}

/*****************************************************
 * This adds the "Archive" button
 *****************************************************/
function archiveButton(){
    var foot = g_table.childNodes[g_table.childNodes.length-1];
    var e = foot.childNodes[3];
    var txt = e.innerHTML;

    if (e.childNodes.length != 1){//txt.match('><')){ // Thus if there are two buttons present...
	if (!use_archive) throw error_beyond; // or error_plus..
	else txt = txt.substring(0, txt.indexOf('>')+1); // Eliminate the Beyond button...
    }

    // Add the Archive button
    txt += '<input class="std" type="submit" value="'+t['Archive']+'" name="archmsg"/>';
    e.innerHTML = txt;

    document.getElementsByName('archmsg')[0].addEventListener('click', function(e){
	    e.stopPropagation();
	    e.preventDefault();
	    archiveMessage();
	}, false);
}

/*****************************************************
 * This displays a single image
 *****************************************************/
function viewArchived(e){
    e.stopPropagation();
    e.preventDefault();

    g_archive_table = document.getElementById('lmid2').childNodes[3];
    var index = e.currentTarget.parentNode.parentNode.id.split('arch_')[1];

    // Remove the current table
    g_archive_table.parentNode.removeChild(g_archive_table);

    // And display the message
    var div = document.createElement('div');
    div.innerHTML = g_archive_content[index].innerHTML;
    document.getElementById('lmid2').appendChild(div);

    // Update the archive link onClick
    var arch = document.getElementById('archlink');
    arch.addEventListener('click', 
			  function(e) {
			      // Don't let the click fall through...
			      e.stopPropagation();
			      e.preventDefault();

			      document.getElementById('lmid2').removeChild(div);
			      document.getElementById('lmid2').appendChild(g_archive_table);

			      // Reinstate *all* the onClicks
			      for (var i = 1; i < g_table.childNodes.length - 1; i++){
				  g_table.childNodes[i].childNodes[1].childNodes[0].addEventListener('click', viewArchived, false);
			      }

			      document.getElementsByName('delmsg')[0].addEventListener('click', archiveDeleteButtonOnClick, false);
			  }, false);
}

/*****************************************************
 * This modifies how the delete button works while
 * viewing archives
 *****************************************************/
function archiveDeleteButtonOnClick(e){
    e.stopPropagation();
    e.preventDefault();

    for (var i=1; i < g_table.childNodes.length - 1;){
	if (g_table.childNodes[i].childNodes[0].childNodes[0].checked == false){
	    i++;
	    continue;
	}

	// Remove the listing from the immediate display
	g_table.removeChild(g_table.childNodes[i]);

	// Remove it from the saved record as well
	// *note* use a base-0 index...
	var arch = GM_getValue(archive_msg_key, '').split(g_split1);
	arch.splice(i-1, 1);
	GM_setValue(archive_msg_key, arch.join(g_split1));
    }
}

/*****************************************************
 * This displays the archive
 *****************************************************/
function archiveLinkOnClick(e){
    // Don't let the click fall through...
    e.stopPropagation();
    e.preventDefault();

    g_update_disp = false;

    // Remove the archive button
    var a = document.getElementsByName('archmsg')[0];
    if (typeof a != 'undefined') a.parentNode.removeChild(a);

    // Modify the delete button
    var a = document.getElementsByName('delmsg')[0];
    a.addEventListener('click', archiveDeleteButtonOnClick, false);

    // Remove the functionality of the archive link
    document.getElementById('archlink').removeEventListener('click', archiveLinkOnClick, false);

    // Load the archives
    var arch = GM_getValue(archive_msg_key, '').split(g_split1);

    for (var i = 0; i < arch.length; i++){
	if (arch[i].length = 0) break;

	var txt = arch[i].split(g_split2)[0];
	debug(d_med, txt);

	var tr = document.createElement('tr');
	for (var j = 1; j < txt.split('<td').length; j++){
	    var td = document.createElement('td');
	    var temp = txt.split('<td')[j];
	    td.innerHTML = temp.substr(temp.indexOf('>')+1).split('</td>')[0];
	    tr.appendChild(td);
	}

	tr.id = 'arch_'+i;
	g_archive_title.push(tr);

	var tab = document.createElement('table');
	tab.innerHTML = arch[i].split(g_split2)[1];
	g_archive_content.push(tab);
    }

    // Display the archives
    swapTables(g_archive_title);

    if (arch[0] == '') return;
    // This calls the function that displays the actual message
    for (var i = 1; i < g_table.childNodes.length - 1; i++){
	g_table.childNodes[i].childNodes[1].childNodes[0].addEventListener('click', viewArchived, false);
    }
}

/*****************************************************
 * This adds the "Archive" link
 *****************************************************/
function archiveLink(){
    var e = document.getElementById('lmid2');
    var txt = e.childNodes[2].innerHTML;

    if (txt.match('<a href="nachrichten.php[?]t=3">')){
	if (!use_archive) throw error_beyond;
	else {
	    var cut = txt.indexOf(' | <a href="nachrichten.php?t=3">');
	    var end = txt.indexOf('</a>', cut);
	    txt = txt.substring(0, cut) + txt.substring(end);
	}
    }

    txt += ' | <a href="#" id="archlink">'+t['Archive']+'</a>';
    e.childNodes[2].innerHTML = txt;

    document.getElementById('archlink').addEventListener('click', archiveLinkOnClick, false);
}

/*****************************************************
 * This starts the Archive-related code
 *****************************************************/
function archive(){
    try {
	archiveButton();
	archiveLink();
    } catch (e){
	return;
    }
}

//============================================================================================================
// These are the vassal-related functions
//============================================================================================================

/*****************************************************
 * This adds a new vassal to the list
 *****************************************************/
function addVassalOnClick(){
    var write_box = document.getElementById('newVassal');
    var v = makeVassal(write_box.value);
    v.childNodes[0].addEventListener('click', deleteVassalOnClick, false);
    g_vassals.push(v);
    g_vassals.sort(function sortBy(a, b){
	    return a.childNodes[1].textContent.toLowerCase() > b.childNodes[1].textContent.toLowerCase();});
    write_box.value = '';

    setVassals();
    setVassalTable();
}

/*****************************************************
 * This deletes a vassal
 *****************************************************/
function deleteVassalOnClick(e){
    // Remove the element
    g_vassals.splice(parseInt(e.currentTarget.parentNode.id.split('vassal_')[1]), 1);

    setVassals();
    setVassalTable();
}

/*****************************************************
 * This displays all trade reports from a vassal
 *****************************************************/
function vassalOnMouseover(e){
    // Cancel the live update, or we'll get mixed results
    g_update_disp = false;

    swapTables(g_paid[e.currentTarget.textContent]);
}

/*****************************************************
 * This makes a vassal table object
 *****************************************************/
function makeVassal(name){
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.width = 30;
    td.textContent = g_cross;
    tr.appendChild(td);
    td = document.createElement('td');
    td.textContent = name;
    tr.appendChild(td);
    return tr;
}

/*****************************************************
 * This extracts the vassal array from the GM_value
 *****************************************************/
function getVassals(){
    g_vassals = [];

    var v = GM_getValue(vassal_key, '').split("||");

    if (v=='') return;
    
    for (var i=0; i < v.length; i++){
	g_vassals[i] = makeVassal(v[i]);
	g_paid[v[i]] = [];
    }
}

/*****************************************************
 * This saves the vassal array into a GM_value
 *****************************************************/
function setVassals(){
    var names = [];
    for (var i=0; i < g_vassals.length; i++){
	names[i] = g_vassals[i].childNodes[1].textContent;
    }
    GM_setValue(vassal_key, names.join("||"));
}

/*****************************************************
 * This wipes fills the vassal table with new elements
 *****************************************************/
function setVassalTable(){
    var tab = document.getElementById('vassalTable').childNodes[1];
    var foot = tab.childNodes[tab.childNodes.length-2];
    
    // Wipe the table
    while (tab.childNodes[2] != foot){
	tab.removeChild(tab.childNodes[2]);
    }
    
    // Fill the table
    for (var i=0; i < g_vassals.length; i++){
	g_vassals[i].id = "vassal_"+i; // Update the ids
	tab.insertBefore(g_vassals[i], foot);
    }
}

/*****************************************************
 * This constructs all the vassal-related elements
 *****************************************************/
function vassal(){
    getVassals();

    var txt = '<br><table class="tbg" cellspacing="1" cellpadding="2" id="vassalTable">\
        <tbody>\
            <tr class="rbg">\
                <td colspan="2"><b>'+t['Vassal Villages']+':</b></td>\
            </tr>\
            <tr><td/><td/></tr>\
        </tbody>\
    </table><br>\
    <table cellspacing="1" cellpadding="2">\
        <tr>\
            <td><input class="fm" type="text" maxlength="20" size="16" value="" id="newVassal" onsubmit="addVassalOnClick();"/></td> \
            <td><input height="20" border="0" width="80" type="image" src="'+image['Add']+'" id="addVassal" value=""/></td>\
        </tr>\
    </table>';

    var div = document.createElement('div');
    div.innerHTML = txt;
    document.getElementById('lright1').appendChild(div);

    setVassalTable();

    // Add mouseClicks to add a vassal
    document.getElementById('addVassal').addEventListener('click', addVassalOnClick, false);

    for (var i=0; i < g_vassals.length; i++){
	var e = document.getElementById('vassal_'+i);
	// Add mouseClicks to delete vassals
	e.childNodes[0].addEventListener('click', deleteVassalOnClick, false);
	// And mouseOvers to show relevant trades
	e.childNodes[1].addEventListener('mouseover', vassalOnMouseover, false);
    }
}

//============================================================================================================
// These are the specific page functions, and their listener functions etc
//============================================================================================================

/*****************************************************
 * This sets the name to filter the message page
 *****************************************************/
function profileOnClick(){
    name = xPathEval('//table[@class="tbg"]').snapshotItem(0).childNodes[1].childNodes[0];

    name = name.textContent.split(' ');
    // pop off the first element of the array, the 'Player' word (might be language-dependant...)
    name.shift();
    name = name.join(' ').split('\n')[0]; // This *should* be the player name, language-insensitive

    debug(d_med, "Filtering for "+name);
    GM_setValue(msg_filter_key, name);

    GM_setValue(en_key, true); // Enable the filter, regardless of it's former state
}

/*****************************************************
 * The profile function, this handles the profile page
 *****************************************************/
function profile(){
    debug(d_med, "We're on a profile page");

    var link_loc = xPathEval('//tr[@class="s7"]');
    link_loc = link_loc.snapshotItem(link_loc.snapshotLength-1).nextSibling;
    // The last such tr is the one we want
    // We want to append the link just after the 'write message' link

    // Make the link
    msg_link = makeLink('&nbsp;&raquo; '+t['View messages'], '', profileOnClick);
    msg_link.href = 'http://'+server+'/nachrichten.php';

    // Embed the link in a td in a tr
    td = document.createElement('td');
    td.colSpan = '2';
    td.appendChild(msg_link);
    tr = document.createElement('tr');
    tr.appendChild(td);

    // Insert the tr into the table
    link_loc.parentNode.insertBefore(tr, link_loc);

    // We have to update the other table column so that the two columns stay balanced; it's normally 11
    xPathEval('//table[@class="tbg"]').snapshotItem(0).childNodes[1].childNodes[6].childNodes[3].rowSpan='12';
}

/*****************************************************
 * This handles clicking the enable/disable link
 * This is for both the message and report pages
 *****************************************************/
function enableOnClick(){
    // Cancel the live update, or we'll get mixed results
    g_update_disp = false;

    var en_link = document.getElementById(LINK_ID);

    // The script's currently on, so turn off
    if (GM_getValue(en_key, true)){
	en = false;
	debug(d_med, 'Turning enable link off');
	en_link.textContent = t['Turn filter on'];
	swapTables(unfiltered);
	GM_setValue(en_key, false);
    }
    // The script's currently off, so turn on
    else {
	debug(d_med, 'Turning enable link on');

	en = true;

	// If we're filtering reports, reset the village filter
	if (en_key == rpt_en_key){
	    GM_setValue(rpt_filter_key, false);
	}

	en_link.textContent = t['Turn filter off'];
	swapTables(filtered);
	GM_setValue(en_key, true);
    }
}

/*****************************************************
 * This handles clicking the 'Clear' link
 * This is specific to the message page
 *****************************************************/
function clearOnClick(e){
    // Cancel the live update, or we'll get mixed results
    g_update_disp = false;

    GM_setValue(msg_filter_key, false);
    en = false;

    swapTables(unfiltered);

    var p = e.currentTarget.parentNode;
    p.removeChild(e.currentTarget.previousSibling); // the '|'
    p.removeChild(e.currentTarget); // the Clear link

    // Reset the onClick for the 'archive' link
    document.getElementById('archlink').addEventListener('click', archiveLinkOnClick, false);
}

/*****************************************************
 * This adds the 'start load' button...
 *****************************************************/
function addStartLoading(){
    // Add the 'start' button...
    var e = document.getElementById('lmid2').childNodes[0];

    var a = document.createElement('a');
    a.innerHTML = '&nbsp;';
    e.appendChild(a);

    var a = document.createElement('a');
    a.href = 'javascript:void(0)';
    var img = document.createElement('img');
    img.size = '12';
    img.title = t[(g_pause ? 'Start' : 'Stop') + ' loading messages'];
    img.id = 'start_loading';
    img.src = image[g_pause ? 'Start' : 'Stop'];
	
    a.appendChild(img);
    e.appendChild(a);

    //a.addEventListener('click', getNext, false);
    a.addEventListener('click', function(e){
	    if (g_pause){
		g_pause = false;
		img.src = image['Stop'];
		img.title = t['Stop loading messages'];
		getNext();
	    }
	    else {
		g_pause = true;
		img.src = image['Start'];
		img.title = t['Start loading messages'];
	    }
	}, false);

    if (!g_pause) getNext();
}

/*****************************************************
 * The message function, this handles the message page
 *****************************************************/
function message(){
    debug(d_med, "We're on a message page");

    en = GM_getValue(en_key, true);
    var name = GM_getValue(msg_filter_key, false);
    g_table = xPathEval('//table[@class="tbg"]').snapshotItem(0).childNodes[1];

    if (forward_fill && en) updateArrows();

    if (name != false){
	debug(d_med, "Filtering for player "+name);
	g_filter = name;
	e = document.getElementById('lmid2').childNodes[2];

	// Add the filter enable/disable link
	//e.innerHTML += ' | <a href="#" id="'+LINK_ID+'">'+t['Turn filter '+(en?'off':'on')]+'</a>';
	// Add the 'Clear' link
	e.innerHTML += ' | <a href="#" id="'+CLEAR_ID+'">'+t['Clear']+' '+name+'</a>';
    }
    else en = false; // If we're enbabled but we don't have a name to filter for

    // Add the archive info
    archive();

    if (name != false){
	// Connect both new links to the appropriate functions
	//document.getElementById(LINK_ID).addEventListener('click', enableOnClick, false);
	document.getElementById(CLEAR_ID).addEventListener('click', clearOnClick, false);
    }

    var cont = msgFilter(g_table, g_filter);

    if (en) swapTables(filtered);
    
    if (cont==false) return;

    addStartLoading();
}

/*****************************************************
 * This handles a individual message view
 *****************************************************/
function singleMessage(){
    var up = true;

    // We need to add the 'invert' link
    e = document.getElementById('lmid2').childNodes[2];
    e.innerHTML += ' | ';

    var a = document.createElement('a');
    a.href = 'javascript:void(0)';

    var img = document.createElement('img');
    img.title = t['Invert'];
    img.src = image['UpArrow'];

    a.appendChild(img);
    e.appendChild(a);

    // We need to add spacing for the reversal to work properly
    var td = xPathEval('//td[@valign="top"]').snapshotItem(0);
    td.innerHTML = td.innerHTML + '<br>';

    a.addEventListener('click', function(e){
	    if (up){
		up = false;
		img.src = image['DownArrow'];
	    }
	    else {
		up = true;
		img.src = image['UpArrow'];
	    }

	    td.innerHTML = td.innerHTML.split('____________<br>').reverse().join('____________<br>');
	}, false);
}

/*****************************************************
 * This handles mousing over the village links
 * Specific to the report page
 *****************************************************/
function villageOnMouseOver(e){
    // Cancel the live update, or we'll get mixed results
    g_update_disp = false;

    // Reset the viewing place
    g_place = 0;

    if (GM_getValue(rpt_en_key) == false) return;

    g_vil = e.currentTarget.childNodes[0].childNodes[2].textContent;

    swapTables(filtered[g_vil]);
}

/*****************************************************
 * The report function, this handles the report page
 *****************************************************/
function report(){
    debug(d_med, "We're on a report page");

    en = GM_getValue(en_key, true);

    // add the vassal table if appropriate
    if (url.indexOf('t=2') != -1) vassal();

    g_filter = getVilNames();
    if (g_filter.length == 0) return; // This is a single-village account

    for (var i=0; i < g_filter.length; i++){
	filtered[g_filter[i]] = []; // Create new sub-arrays indexed by the village names
    }

    // Add the enable/disable link
    var tab = document.getElementById('rep_table');
    if (tab){ // We're dealing with Beyond here...
	var td = document.createElement('td');
	td.innerHTML = '| <a href="#" id="'+LINK_ID+'">'+t['Turn filter '+(en?'off':'on')]+'</a>';
	tab.childNodes[1].appendChild(td); // Throw it on the end of the first table row...
    }
    else { // No Beyond present :D
	e = document.getElementById('lmid2').childNodes[2];
	e.innerHTML += ' | <a href="#" id="'+LINK_ID+'">'+t['Turn filter '+(en?'off':'on')]+'</a>';
    }

    document.getElementById(LINK_ID).addEventListener('click', enableOnClick, false);

    // Drill down to the reports table
    g_table = xPathEval('//table[@class="tbg"]').snapshotItem(0).childNodes[1];

    if (forward_fill && en) updateArrows();

    // Add the mouseover links to the villages... be careful about Beyond...
    e = xPathEval('//table[@class="f10"]').snapshotItem(0).childNodes[0].childNodes;
    for (var i=0; i < e.length; i++){
	e[i].addEventListener('mouseover', villageOnMouseOver, false);
    }

    var cont = rptFilter(g_table, g_filter);

    // Start off displaying the active village
    if (en) swapTables(filtered[g_vil]);

    if (cont == false) return;

    addStartLoading();
}

//============================================================================================================
// These are the language translations, and images
//============================================================================================================

/*****************************************************
 * This deals with the different messages to the user,
 * in different languages. Place at the end because it
 * has a tendency to balloon.
 *****************************************************/
function setLanguage(domain){
    t['left'] = 'left'; // For right-to-left languages... defaults to left-to-right
    // Until we have translations for all the languages
    t['Clear'] = 'Clear';
    t['Vassal Villages'] = 'Vassal Villages';
    t['Archive'] = 'Archive';
    t['Start loading messages'] = 'Start loading messages';
    t['Stop loading messages'] = 'Stop loading messages';
    t['Invert'] = 'Invert';
    t['Reload date format'] = 'Reload date format';
    switch (domain){
    default: // English
	t['Turn filter on'] = 'Turn filter on';
	t['Turn filter off'] = 'Turn filter off';
	t['View messages'] = 'View messages';
	t['Clear'] = 'Clear';
	t['Vassal Villages'] = 'Vassal Villages';
	t['Archive'] = 'Archive';
	t['Start loading messages'] = 'Start loading messages';
	t['Stop loading messages'] = 'Stop loading messages';
	t['Invert'] = 'Invert';
	t['Reload date format'] = 'Reload date format';
	break;
    case 'ae': // Arabic
	t['left'] = 'right';
	t['Turn filter on'] = 'التصفية لاتعمل';
	t['Turn filter off'] = 'التصفية تعمل';
	t['View messages'] = 'عرض الرسائل';
	t['Clear'] = 'إغلاق رسائل ';
	break;
    case 'ba': // Bosnian
	t['Turn filter on'] = 'Uključi filter';
	t['Turn filter off'] = 'Isključi filter';
	t['View messages'] = 'Pogledaj poruke';
	break;
    case 'cz': // Czech
	t['Turn filter on'] = 'Zapnout filtr';
	t['Turn filter off'] = 'Vypnout filtr';
	t['View messages'] = 'Prohlídnout zprávy';
	break;
    case 'nl': // Dutch
	t['Turn filter on'] = 'Filter activeren';
	t['Turn filter off'] = 'Filter de-activeren';
	t['View messages'] = 'Berichten bekijken';
	t['Clear'] = 'Wissen';
	break;
    case 'de': // German
	t['Turn filter on'] = 'Filter aktivieren';
	t['Turn filter off'] = 'Filter deaktivieren';
	t['View messages'] = 'Zeige nachrichten';
	break;
    case 'co': // Hebrew
	t['left'] = 'right';
	t['Turn filter on'] = 'הפעל מסנן';
	t['Turn filter off'] = 'כבה מסנן';
	t['View messages'] = 'בדוק הודעות';
	break;
    case 'it': // Italian
	t['Turn filter on'] = 'Attiva i filtri';
	t['Turn filter off'] = 'Disattiva i filtri';
	t['View messages'] = 'Guarda i messaggi';
	t['Clear'] = 'Ripulisci';
	t['Vassal Villages'] = 'Villaggi vassalli';
	t['Archive'] = 'Archivio';
	break;
    case 'lt': // Lithuanian
	t['Turn filter on'] = 'Įjungti filtrą';
	t['Turn filter off'] = 'Išjungti filtrą';
	t['View messages'] = 'Peržiūrėti žinutes';
	t['Clear'] = 'Išvalyti';
	t['Vassal Villages'] = 'Vasalinės Gyvenvietės';
	t['Archive'] = 'Archyvas';
	t['Start loading messages'] = 'Užkrauti žinutes';
	t['Stop loading messages'] = 'Stabdyti žinučių korvimą';
	t['Invert'] = 'Apversti';
	t['Reload date format'] = 'Perkrauti datą';
	break;
    case 'pl': // Polish
	t['Turn filter on'] = 'Włącz filtr';
	t['Turn filter off'] = 'Wyłącz filtr';
	t['View messages'] = 'Pokaż wiadomości';
	t['Clear'] = 'Wyczyść';
	t['Vassal Villages'] = 'Osady dłużników';
	t['Archive'] = 'Archiwum';
	t['Start loading messages'] = 'Zacznij ładować wiadomości';
	t['Stop loading messages'] = 'Zatrzymaj ładowanie wiadomości';
	t['Invert'] = 'Odwróć';
	break;
    case 'pt': // Portuguese
    case 'br':
	t['Turn filter on'] = 'Ligar o filtro';
	t['Turn filter off'] = 'Desligar o filtro';
	t['View messages'] = 'Ver mensagens';
	break;
    case 'ro': // Romanian
	t['Turn filter on'] = 'Activează Filtru';
	t['Turn filter off'] = 'Dezactivează Filtru';
	t['View messages'] = 'Citește Mesaje'; 
	break;
    case 'ru': // Russian
	t['Turn filter on'] = 'Включить фильтр';
	t['Turn filter off'] = 'Выключить фильтр';
	t['View messages'] = 'Просмотр его сообщений';
	t['Clear'] = 'Очистить';
	break;
    case 'rs': // Serbian
	t['Turn filter on'] = 'Укључи филтер';
	t['Turn filter off'] = 'Искључи филтер';
	t['View messages'] = 'Погледај поруке';
	break;
    case 'sk': // Slovak
	t['Turn filter on'] = 'Zapnúť filter';
	t['Turn filter off'] = 'Vypnúť filter';
	t['View messages'] = 'Pozrieť správy';
	break;
    case 'si': // Slovenian
	t['Turn filter on'] = 'Vklopi filter';
	t['Turn filter off'] = 'Izklopi filter';
	t['View messages'] = 'Pregled sporočil';
    	t['Clear'] = 'Počisti';
    	t['Vassal Villages'] = 'Nekaj kar ti plačuje';
    	t['Archive'] = 'Arhiv';
   	t['Start loading messages'] = 'Začni nalagat (s)poročila';
    	t['Stop loading messages'] = 'Končaj z nalaganjem (s)poročil';
    	t['Invert'] = 'Obrni';
	break;
    case 'es': // Spanish Spain
    case 'ar': // Spanish Argentina 
    case 'cl': // Spanish Chile 
    case 'mx': // Spanish Mexico 
	t['Turn filter on'] = 'Activar filtro';
	t['Turn filter off'] = 'Desactivar filtro';
	t['View messages'] = 'Ver mensajes';
	break;
    case 'se': // Swedish
	t['Turn filter on'] = 'Starta filtret';
	t['Turn filter off'] = 'Stäng av filtret';
	t['View messages'] = 'Se meddelande';
	t['Clear'] = 'Radera';
	t['Vassal Villages'] = 'Vasall stad';
	break;
    }
}

/*****************************************************
 * This stores 64-bit images
 *****************************************************/
function loadImages(){
    // The 'Add' button
    image['Add'] = 'data:image/gif;base64,R0lGODlhUAAUAPcAANHzpeb+tfX+5O7906PkUPH92o7eLrbEoNL9etv9luj6y9b9h8HvgZjiOK3oYtr2sOj9wbLparTwU878csf5ap7mOanrRr/1X5PhLIrdIYLaGHHQAH/YFMDAwND9dP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAUAAUAAAI/wA/fOhAsKDBgwgTKlzIsCFDgQMPeJhIsaLFixMRaNyIsaPHjyAPdIgIsmTFBQlSqlyAwKRLkyI7vASJYMFECBACQFjAEwEAnEBbAsU5EyTBoh5teoAgoClOngmYbpgqAKeAqRsgIPV4dKvFlh4oQPgw9cPTAE0DUA2AVu2GAQm8XuwqN2PYsWQ3FDA7YEDTqxsEFEA7YCpcBnUp0q0rdCzWDQL9Fpg8dfCAAoAFJECc2APBCaBDix5NWvTdvZDJFoBA+XFrrAU2l55NewJBCrhz697NmzfOx5UVVC5AdXjlzb2TK6dA8ILz59CjS49OIcEDw3k/FNZLXK9xvZuni+Mff4GghPPo06tfr57B7wEQFBD/0F2+YardYzNgz7+/BIIWBCjggAQWOGAEF0BQFgAAACbcWw5+p5+BFFZoAUEVZKjhhhx2uGEEP1XGYF4APIjVAyZOpcBmHrboYgUEYSDjjDTWaOOMBoDI4I47MsAAj0DyuJkDNxZpJAYEZaDkkkw26eSSBuQYQQQOTDmlAwQQUKWVWG7pwJdfPinmmEoSpMGZaKap5ppqRunmmxlo8GaUGcwZJZt45okmQQdw4OefgAYq6KCEFmrooYaKFBGijDbq6KOAKiqQQ5RWaumlCAkUEAA7';
    image['Start'] = 'data:image/gif;base64,R0lGODlhEgARAPcAAAAAABpAthlDuRlHvBpIvCZGtyNJuRlLwBpMwBhQxBhUyBhZzBde0Bdi1BZn2BZr3Bds3BZv3xdw3x9x3RVy4hV15RV35x575iJTwiRhziNm0j9oyiF+6Epkwkh30keC20WS62eM12iD0GiG0nuP03qU13yS1Xqa3GWa5GWg6GWh6nmm53qs63mu7niv74ag3YWw66S55ae96Ki55bG846fC7K3E6q3K76fG8KfJ8rDA57DJ773L6rDM8rfN8LbR9LzS88rT68rT7MnZ8dXc7tfe79je79nf8Nvh8Nzi8d7j8t/k8uDl8uHm8+Po9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAASABEAAAjjAP8JFFgkCZMmTZgkGYjkxsB/RJT0cAGCAwcQLnosUfLDAhOBRoa0uFChpMkLLXKUdCJwiAoKMGPKjMlSCYsIESSkwCEQRwoJOHE6KbJjwgMIMJoMbALk6IOnTpKscOAAhdKBPqhqdeCEyYcGDWoYGWgDrFmwS5poYMDg4b8jTJzIlbvkX5MMCxa43TuQiQcFCmTw3ZvkRIIEIa4OJJIkxsKBOjAcQPBCsd0XCDbwGKikxIABBEbMEDhjBIHPJR4KESGgtevXIoS4DWLCQIDbuA2YCMJXCQ0SHQoU6ECChpKHAQEAOw==';
    image['Stop'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAWABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDq/G3xU/sbUBp2hLbXM8RIuJZQWRT/AHBgjJ9T0HTrnGJo/wAZtROpRLrFraCyY4d7aNg6f7XLHIHcYz/I4NhLpkdtpcsg0qMiCWOSGRLeXzD5RYSEkFlO9VG1+c8DIOBatJdCFmk1ydMRvIDw+XDE77vs+Zd8Z4Ledgor89QuBXE5zcr3PqaeFwsKPK6XM+/U9oXXLWRFkiLTRuoZZIxlWBGQQaK5PwTbm+8KW11ZW7Q2sss7xRLIMIpmfC9e3SituaR4ssPh4txfTzMrx38Mlvb4ajpDwW8srnz4pCQjHruGAcH19fr1wNE+FV7Nq0K6lc2ptc5dYXclsduVHH+eOoKKynTjz3senh8biFhGuboe4WNjFp9lFaW6hIYl2qo6Af0+lFFFdS2Pm3q7s//Z';
    image['UpArrow'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0HxV4se5vf+Ef0bzJp3cxTPAfmZucxIex4O5sgKAeQQxSDQ9cn8L3z6Rq0fkWqEZGcrbZzh1OBmE4PP8ADg5AwwTf8OaJpun63rs9paRxSC6ESlc/IhhikKqP4QWYnAx27KMWPFGlWWo2ds91AJHjuYUVgxVgryorrkEHBB5HTIB6gEcMqFVy9qpe926W7f8ABOR0qjftObX8Ldja82P++v50VT/sPSP+gVY/+A6f4UV26nT7x//Z';
    image['DownArrow'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs5p9c8FeKZ7i4mm1HT7+Qud5H73joOgSVVGMcKyr2A/dyalqepeMNVSw0tpra1Qh4z8yEYPE0vQgAj5I+CSMnB/1fc6xaW99pNzBcxCSMoTg8YI5BBHIIIBBHINZHgOGMeELG6CDz7uMTTyY5dz3P8gOgHArhlQqOfKpe49fP0v2ON0Z83Ipe69fP0NP+zr3/AKDV3/36h/8AiKK0qK7bHVyo/9k=';
}