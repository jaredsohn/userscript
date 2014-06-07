// ==UserScript==
// @name           Travian IGM filter
// @version        1.0.5
// @namespace      http://userscripts.org/scripts/show/35173
// @author         Arandia
// @description    Filters your IGM inbox based on sender
// @include        http://s*.travian.*/nachrichten.php*
// @include        http://s*.travian.*/spieler.php*
// @exclude        http://s*.travian.*/nachrichten.php?id=*
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

// Changes Log

/********************************************************************************************
 * Date:           | Name:      | Description:
 ********************************************************************************************
 * Oct   6, 2008   | Arandia    | Split from the report filtering script. See for more
 *                 |            | details: http://userscripts.org/scripts/show/34299
 * Oct   8, 2008   | Arandia    | Fixed a table column mismatch problem on viewing profiles
 * Oct   8, 2008   | Arandia    | Implemented the filtering of the message table
 * Oct   8, 2008   | Arandia    | Fixed a minor bug in determining the name to filter
 * Oct   9, 2008   | Arandia    | Restructured code to allow for multi-language support
 * Oct   9, 2008   | Dream1     | Added Arabic support
 * Oct  10, 2008   | Arandia    | Fixed a bug regarding special characters in player names
 * Oct  10, 2008   | Metador    | Added German support
 * Oct  10, 2008   | ZAn_Ton    | Added Romanian support
 * Oct  10, 2008   | MindTwister| Added Hebrew support
 * Oct  11, 2008   | Brunoa     | Added Portuguese support
 * Oct  11, 2008   | Sasai      | Added Serbian and Bosnian support
 ********************************************************************************************/

debug(d_med, "Starting the message filter script!");

var d_none=-1, d_highest=0, d_hi=1, d_med=2, d_low=3, d_lowest=4, d_all=4;
//* d_none is for the final release - don't forget to set it before uploading
var d_level=d_none;/*/
var d_level=d_low;//*/

var url = window.location.href;
var server = url.split('/')[2];

var filter_key = server+'_filter'; // Who to filter for
//var filter; // The temporal version of filter_key

var en_key = server+'_en'; // Whether it's on or not
var en; // Enabled/disabled
var enable_link;

var msg_table; // The table holding the messages
var msg_archive = new Array(); // The archive holding what was initially present
var msg_disp = new Array();
var links = new Array(); // All the links

var t = new Array(); // The translation array

window.addEventListener('load', main, false);

/*****************************************************
 * Provides basic debugging
 *****************************************************/
function debug(lvl, msg){
    if (lvl <= d_level){
        GM_log("\n"+msg);
    }
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
    if (!rtn) dbg("Evaluation of xpath '" + xpath + "' failed!");
    return rtn;
}

/*****************************************************
 * This creates a link with text txt that executes
 * function funct on clicking.
 *****************************************************/
function makeLink(txt, id, funct, href){
    a = document.createElement("a");
    a.id = id;
    a.style.cssFloat = 'left';

    a.innerHTML = txt;
    a.addEventListener('click', funct, false);
    if (typeof(href) == 'undefined') a.href = "#";
    else a.href = href;

    return a;
}

/*****************************************************
 * This places a given list in the msg table
 *****************************************************/
function swapTables(table){
    var msgs = msg_table.childNodes;
    // Remove all the elements currently in the report table
    // But don't remove the header or footer...
    footer = msg_table.childNodes[msg_table.childNodes.length-1];// The last element in the table
    while (msg_table.childNodes[1] != footer){
	msg_table.removeChild(msg_table.childNodes[1]);
    }
    // Now insert the elements from 'table'
    for (var i=0; i < table.length; i++){
	msg_table.insertBefore(table[i], footer);
    }
}

/*****************************************************
 * This handles clicking the enable/disable link
 *****************************************************/
function onClick(){
    if (en){
	en = false;
	enable_link.textContent = t['Turn filter on'];
	swapTables(msg_archive);
    }
    else {
	en = true;
	enable_link.textContent = t['Turn filter off'];
	swapTables(msg_disp);
    }
    GM_setValue(en_key, en);
}

/*****************************************************
 * This sets the GM values to filter for the profile
 *****************************************************/
function profileOnClick(){
    name = xPathEval('//table[@class="tbg"]').snapshotItem(0).childNodes[1].childNodes[0];
    name = name.textContent.split(' ');
    name.shift(); // pop off the first element of the array, the 'Player' word (might be language-dependant...)
    name = name.join(' ').split('\n')[0]; // This *should* be the player name, language-insensitive

    debug(d_low, "Filtering for "+name);
    GM_setValue(filter_key, name);

    GM_setValue(en_key, true); // Enable the filter, regardless of it's former state
}

/*****************************************************
 * The main function, this starts the processes
 *****************************************************/
function main(){
    setLanguage(server.split('.')[2]); // Load the appropriate language
    //setLanguage('de'); // Load the given language

    if (url.indexOf('spieler') != -1){ // We're on someone's profile page
	debug(d_med, "We're on a profile page");

	var link_loc = xPathEval('//tr[@class="s7"]');
	link_loc = link_loc.snapshotItem(link_loc.snapshotLength-1).nextSibling;
	// The last such tr is the one we want

	msg_link = makeLink('&nbsp;&raquo; '+t['View messages'], '', profileOnClick,
			    'http://'+server+'/nachrichten.php');
	td = document.createElement('td');
	td.colSpan = '2';
	td.appendChild(msg_link);
	tr = document.createElement('tr');
	tr.appendChild(td);

	link_loc.parentNode.insertBefore(tr, link_loc);

	// We have to update the other table column so that the two columns stay balanced; it's normally 11
	xPathEval('//table[@class="tbg"]').snapshotItem(0).childNodes[1].childNodes[6].childNodes[3].rowSpan='12';

    } else { // We're on the message page, filter the messages
	debug(d_med, "We're on a message page");

	en = GM_getValue(en_key, true);
	name = GM_getValue(filter_key, false);

	if (name==false) return;

	debug(d_med, "Filtering for player "+name);

	e = document.getElementById('lmid2').childNodes[2];
	e.innerHTML += ' | <a href="#" id="enable">'+(en?t['Turn filter off']:t['Turn filter on'])+'</a>';
	enable_link = document.getElementById('enable');
	enable_link.addEventListener('click', onClick, false);

	msg_table = xPathEval('//table[@class="tbg"]').snapshotItem(0).childNodes[1];
	for (var i=1; i<msg_table.childNodes.length-1; i++){
	    msg_archive.push(msg_table.childNodes[i]);

	    debug(d_low, msg_table.childNodes[i].childNodes[4].textContent + " = " +name+"? "+
		  (msg_table.childNodes[i].childNodes[4].textContent == name));
	    if (name == msg_table.childNodes[i].childNodes[4].textContent){
		msg_disp.push(msg_table.childNodes[i]);
	    }
	}
	if (en) swapTables(msg_disp);
    }
}

/*****************************************************
 * This deals with the different messages to the user,
 * in different languages. Place at the end because it
 * has a tendency to balloon.
 *****************************************************/
function setLanguage(domain){
    switch (domain){
    default: // English
    case 'com':
    case 'us':
    case 'uk':
	t['Turn filter on'] = 'Turn filter on';
	t['Turn filter off'] = 'Turn filter off';
	t['View messages'] = 'View messages';
	break;
    case 'ae': // Arabic
	t['Turn filter on'] = 'فلتر الرسائل لايعمل';
	t['Turn filter off'] = 'فلتر الرسائل يعمل';
	t['View messages'] = 'عرض الرسائل';
	break;
    case 'de': // German
	t['Turn filter on'] = 'Filter aktivieren';
	t['Turn filter off'] = 'Filter deaktivieren';
	t['View messages'] = 'Zeige nachrichten';
	break;
    case 'ro': // Romanian
	t['Turn filter on'] = 'Activează Filtru';
	t['Turn filter off'] = 'Dezactivează Filtru';
	t['View messages'] = 'Citește Mesaje'; 
	break;
    case 'co': // Hebrew
	t['Turn filter on'] = 'הפעל מסנן';
	t['Turn filter off'] = 'כבה מסנן';
	t['View messages'] = 'בדוק הודעות';
	break;
    case 'pt': // Portuguese
    case 'br':
	t['Turn filter on'] = 'Ligar o filtro';
	t['Turn filter off'] = 'Desligar o filtro';
	t['View messages'] = 'Ver mensagens';
	break;
    case 'rs': // Serbian
	t['Turn filter on'] = 'Укључи филтер';
	t['Turn filter off'] = 'Искључи филтер';
	t['View messages'] = 'Погледај поруке';
	break;
    case 'ba': // Bosnian
	t['Turn filter on'] = 'Uključi filter';
	t['Turn filter off'] = 'Isključi filter';
	t['View messages'] = 'Pogledaj poruke';
	break;
    }
}
