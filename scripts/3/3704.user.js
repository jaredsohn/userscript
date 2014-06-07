// $Id: ravenblack_tuning.user.js,v 1.163 2007-07-26 19:05:27 pl Exp $
// 
// Copyright (C) 2006-2007 Pierre L a.k.a Josh Green a.k.a. dummy4242 (@) gmail.com
//
// ==UserScript==
// @name Ravenblack Tuning
// @namespace http://dummy4242.googlepages.com/vampires
// @description Ravenblack Tuning by dummy4242@gmail.com
// @include http://quiz.ravenblack.net/blood.pl*
// @exclude
// ==/UserScript==
//
// ***********************************************************************************
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 2
// as published by the Free Software Foundation.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
// ***********************************************************************************
// 
// Please read the license text at: http://www.gnu.org/copyleft/gpl.html
//
// Coding style and notes
// ~~~~~~~~~~~~~~~~~~~~~~
// - the '{{{' and '}}}' are used by vim to tell it to fold the source code
// - coordinates: Aardvark x 1 = 1x1 and SE of Aardvark x 1 = 1.5 x 1.5
//
// What might possibly go in
// ~~~~~~~~~~~~~~~~~~~~~~~~~
// - automagically handle the guild & shop freshness
// - add 'friend' or 'foe' list to know who's who
//
// Credits
// ~~~~~~~
// Thanks to c daMaph's excellent map (http://www.realm2.net/vampire), the
// dynamic places are available. 
// Thanks to cliffburton's page, some shops and guilds are available.

(function() {

// Game localization - note this field is used to be automatically updated by CVS
const user_script_long_version = "$Id: ravenblack_tuning.user.js,v 1.163 2007-07-26 19:05:27 pl Exp $\n";

GM_log(user_script_long_version);

// Get a simple number to represent the game version
var user_script_version = user_script_long_version.replace(/.*1\.(\d+).*/g, "$1");

// Where should we check for an updated version ? This file only contains 1
// line with a number which is compared to the number in user_script_version
const user_script_latest_version_url = "http://dummy4242.googlepages.com/ravenblack_tuning.txt";
const user_script_homepage = "http://dummy4242.googlepages.com/vampires";

// Whom to send mail to ?
// ( If I were not that shy, I'd dare to say, who's your daddy :D ? )
const user_script_contact_email = "dummy4242 at gmail dot com";

// When are supposed to check online ? Put an insanely huge value if you want
// to disable version checking.
const online_check_period = 7 * 86400;

// The following lines should be tuned to adapt to cost increase/decrease or
// even other similar games (The Abyss City has different coins and item names)
const transit_cost_coins = 5;
const transit_cost_action_point = 3;
const action_point_str = 'AP';
const money_unit_str = 'coins';

// Edit these to advertise whomever's site you feel like.
const extra_links = [
	["c daMaph's map", "http://www.realm2.net/vampire/map.php"],
	["A view in the dark", "http://vampire.cliffburton.de/"],
	["deCarnac's map for Vampires! (SVG)", "http://web.telia.com/%7Eu11318310/"],
	["The Perfect Map", "http://caerfyrddin.org/Andron%27s%20Crypt/Map.gif"]
];

// Edit this if you only want 1 direction when you enable the HUD (head-up-display).
// Set to 1 to find the old display mode
const mono_direction = 0;

// Use the inline image (faster) if 1 (or does lots of redraw if 0)
var use_embedded_map_img = 1;
if (window.navigator.userAgent.match(/windows nt/ig)) {
	use_embedded_map_img = 0;
}

// {{{ ---------------------- CODE - NON-SPECIFIC FUNCTIONS ---------------------------
// These functions are completely not Ravenblack Tuning specific and might be
// of use for other projects (hey, you never know :)

// Return the value associated to a cookie
// IN: cookiename (string)
// RET: cookie value
function get_cookie(cookiename) {
// {{{
	var cookies = '' + document.cookie;
	var start = cookies.indexOf(cookiename + '=');
	if (start < 0) {
		return '';
	}
	var end = cookies.indexOf(';', start);
	if (end < 0) {
		end = cookies.length; 
	}
	return unescape(cookies.substring(start + cookiename.length + 1, end));
// }}}
}

// Sets a cookie
// RET: none
function set_cookie(cookiename, cookievalue) {
	// {{{
	const delay_in_ms = 7 * 86400 * 1000;
	var d = new Date();
	var d_ms = Date.parse(d);
	d.setTime(d_ms + delay_in_ms);
	var UTCstring = d.toUTCString();
	document.cookie = cookiename + "=" + cookievalue + ";expires=" + UTCstring;
	// }}}
}

// Get a Unix timestamp (integer number of seconds since 1/1/1970)
// RET: integer value (seconds)
function time() {
	// {{{
	var tmp = new Date;
	return parseint(tmp.getTime() / 1000);
	// }}}
}

// Convert a delay (t in seconds) into a readable string
// RET: string
function human_time_delay(t) {
// {{{
	var d = parseint(t / 86400);
	t -= d * 86400;
	var h = parseint(t / 3600);
	t -= h * 3600;
	var m = parseint(t / 60);

	if (d > 0) {
		return d + "d " + h + "h";
	}
	if (h > 0) {
		return h + "h " + m + "min";
	}
	if (m < 0) {
		return "none";
	} else if (m == 0) {
		return "a few seconds";
	} else {
		return m + "min";
	}
// }}}
}

// Returns the ordinal string corresponding to an integer (1->1st, 12->12th, ...)
// IN: integer value 'n' 
// RET: string
function ordinal(n) {
	// {{{
	if ((4 <= n) && (n <= 19)) {
		return n + "th";
	}
	switch (n % 10) {
		case 1: return n+"st";
		case 2: return n+"nd";
		case 3: return n+"rd";
		default: return n+"th";
	}
	// }}}
}
// Make sure base 10 is used no matter what
// IN: anything
// RET: integer value
function parseint(n) {
// {{{
	return parseInt(n, 10);
// }}}
}


// Returns the minimal value between several numbers
min = Math.min;

// Returns the maximal value between several numbers
max = Math.max;

// Returns the absolute value of x (number)
abs = Math.abs;

// Serializes a 2d array
// Notes:
// - the characters ',' and '|' must not be in the 2D array
// - optionally, add a magic number to check
// - I'm not feeling quite comfortable with the toString() since I'd have to use an eval-like function
// Valid regex: w(,w)*(|w(,w)*)*
function serialize_array_2d(arr) {
// {{{
	if (!arr) {
		return '';
	}
	if (!arr.length) {
		return '';
	}
	var str='';
	var i = 0;
	str += '' + arr[i][0];
	for (var j = 1; j < arr[i].length; ++j) {
		str += ',' + arr[i][j];
	}

	for (var i = 1; i < arr.length; ++i) {
		str += '|';
		str += '' + arr[i][0];
		for (var j = 1; j < arr[i].length; ++j) {
			str += ',' + arr[i][j];
		}
	}
	return str;
// }}}
}

// Unserializes a string into a 2d array
// Notes:
// Control characters: , and |
// - the characters ',' and '|' must not be in the 2D array
// - optionally, add a magic number to check
// - I'm not feeling quite comfortable with the toString() since I'd have to use an eval-like function
// Valid regex: w(,w)*(|w(,w)*)*
function unserialize_array_2d(str) {
// {{{
	var arr = new Array();
	if (!str) {
		return arr;
	}
	var arr1 = str.split('|');
	for (var i = 0; i < arr1.length; ++i) {
		arr[i] = arr1[i].split(',');
	}
	return arr;
// }}}
}

// }}}

// **************************************************************************
// *** PREFERENCE STORAGE FUNCTIONS
// {{{

// There are 2 kinds of preferences:
//  - global preferences common to every character (such as shops and guild locations)
//  - private preferences which apply to only 1 vampire (how many coins he/she has or where he/she is headed to)
//
// This part also handles authentication scheme maintaining

// Get the current vampire name (hidden in the html cookie)
// FIXME: handle the case where no cookie is present
var current_vampire_name = function () {
	 // {{{
	var tmp = get_cookie('ip');
	if (!tmp) {
		return '';
	}
	return tmp.split("#")[0];
	// }}}
} ();
var current_vampire_password = function () {
	 // {{{
	var tmp = get_cookie('ip');
	if (!tmp) {
		return '';
	}
	return tmp.split("#")[1];
	// }}}
} ();

// Sets a preference
function internal_setval(_varname, _value, _type, _shared) {
// {{{
	var prefix = (_shared) ? '' : (current_vampire_name + '_');
	if (_type == 'int') {
		GM_setValue(prefix + _varname, parseint(_value));
	} else if (_type == 'float') {
		// float must be stored as a string
		GM_setValue(prefix + _varname, '' + parseFloat(_value));
	} else {
		GM_setValue(prefix + _varname, '' + _value);
	}
// }}}
}
// Gets a preference
function internal_getval(_varname, _defaultvalue, _type, _shared) {
// {{{
	var prefix = (_shared) ? '' : (current_vampire_name + '_');
	if (_type == 'int') {
		return parseint(GM_getValue(prefix + _varname, _defaultvalue));
	} else if (_type == 'float') {
		return parseFloat(GM_getValue(prefix + _varname, _defaultvalue));
	} else {
		return GM_getValue(prefix + _varname, _defaultvalue);
	}

// }}}
}

function set_string_shared(varname, varvalue) {
	internal_setval(varname, varvalue, 'string', true);
}
function get_string_shared(varname, defaultvalue) {
	return internal_getval(varname, defaultvalue, 'string', true);
}
function set_int_shared(varname, varvalue) {
	internal_setval(varname, varvalue, 'int', true);
}
function get_int_shared(varname, defaultvalue) {
	return internal_getval(varname, defaultvalue, 'int', true);
}
function set_int(varname, varvalue) {
	internal_setval(varname, varvalue, 'int', false);
}
function get_int(varname, defaultvalue) {
	return internal_getval(varname, defaultvalue, 'int', false);
}
function set_float(varname, varvalue) {
	internal_setval(varname, varvalue, 'float', false);
}
function get_float(varname, defaultvalue) {
	return internal_getval(varname, defaultvalue, 'float', false);
}

// The login + password database
var vampire_credentials = unserialize_array_2d(get_string_shared("vampire_credentials", ""));

// The current vampire in the vampire_credentials array
var current_vampire_idx = -1;

// Try to find the vampire in the credentials, if the account is not found, it is added
// Note:
// - maybe add a configuration option
function update_credentials(login, password) {
	// {{{
	if (!vampire_credentials) {
		vampire_credentials = new Array();
	}
	var cred_len = vampire_credentials.length;
	for (i = 0; i < cred_len; ++i) {
		if (login == vampire_credentials[i][0]) {
			current_vampire_idx = i;
			// credential found
			return;
		}
	}
	alert("Saving credentials for " + login);
	vampire_credentials[cred_len] = [login, password];
	current_vampire_idx = cred_len;
	set_string_shared("vampire_credentials", serialize_array_2d(vampire_credentials));
	// }}}
}

// Update and store login + password
if (current_vampire_name) {
	update_credentials(current_vampire_name, current_vampire_password);
}

// Handle the switch to the prev Alt in line
function switch_to_prev_alt() {
	// {{{
	var prev_vampire_idx = (current_vampire_idx + vampire_credentials.length - 1) % vampire_credentials.length;
	set_cookie('ip', vampire_credentials[prev_vampire_idx][0] + '#' + vampire_credentials[prev_vampire_idx][1]);
	// Reload the page
	window.location = window.location.href;
	// }}}
}

// Handle the switch to the next Alt in line
function switch_to_next_alt() {
	// {{{
	var next_vampire_idx = (current_vampire_idx + 1) % vampire_credentials.length;
	set_cookie('ip', vampire_credentials[next_vampire_idx][0] + '#' + vampire_credentials[next_vampire_idx][1]);
	// Reload the page
	window.location = window.location.href;
	// }}}
}

// Display a popup showing the alts' logins
function list_alts() {
	// {{{
	var cred_len = vampire_credentials.length;
	var tmp = vampire_credentials[0][0];
	for (i = 1; i < cred_len; ++i) {
		tmp += ', ' + vampire_credentials[i][0] ;
	}
	alert('I know of: ' + tmp);
	// }}}
}

// Reset all login/password stored 
function flush_alts() {
	// {{{
	set_string_shared("vampire_credentials", "");
	window.location = window.location.href;
	// }}}
}

// }}}
// **************************************************************************
// **************************************************************************

// Put something insanely big if you do not want to do the online version check
var latest_online_check = get_int_shared("update_timestamp", 0);

// This is the simple cache system
var dynamic_places_serialized = get_string_shared("dynamic_places_serialized", "Please refresh,42.5,42.5|online...,42.5,43.5");
var dynamic_places = unserialize_array_2d(dynamic_places_serialized);
var dynamic_places_timestamp = get_int_shared("dynamic_places_timestamp", 0);

// Configurable options
var show_script_version = true;

var show_num_coord = get_int("show_num_coord", 1);	// Show numerical coordinates (1.5,3.5) ?
	var use_hyperlink_positions = true;

const resize_city_blocks = true;			// Resize city blocks
	const city_block_w = 200;			// width in pixels
	const city_block_h = 150;			// height in pixel

const hide_advice_paragraph = true;			// Remove the line reading
							// 'Instead of ... the How To Play'

const remove_luring_bonus = true;				// Remove the lines reading
							// 'You can get ten...public forums'

var swallow_city = true;		// Swallow the city map ?
					// Basically, either it put the info
					// below the map (false), or by its side (true)
	var swallowed_city_at_left = true;	// true : City | Info
						// false: Info | City

const use_composite_direction = true;	// if true:  '5NW then 5N'
					// if false: '10N 5W'

var show_config = get_int("show_config", 1);

// Let's go object...
var array_object = new Array();

var show_extra_links = get_int("show_extra_links", 1);	// Show extra links ?

// Note: maybe clean the code with route, route path, hud, etc
var show_route = get_int("show_route", 1);		// Show the route (Walk to ... Take the train,,,)
							// & the destination selection
	var show_destination_selection = true;		// Display the 'Where do you want to go ?' select boxes

	var route_use_stations = get_int("route_use_stations", 1);	// Use the stations status ?

var enable_hud = get_int("enable_hud", 1);		// Show the direction arrow in the central square
							// Note: hud stands for 'head up display'

var enable_minimap = get_int("enable_minimap", 1);	// Show the minimap


// Test your browser at: http://www.alanwood.net/unicode/arrows.html
// 0: N, S, E, W
// 1: simple unicode arrows
// 2: double unicode arrows
var direction_indicator_flavor = get_int("direction_indicator_flavor", 2);


// {{{ ===================== DATA =====================
// DATA: Ravenblack streets are numbered from 0 to 101
const streets_name = [
// {{{
"WCL",
"Aardvark", "Alder", "Buzzard", "Beech", "Cormorant", "Cedar", "Duck", "Dogwood", "Eagle", "Elm",
"Ferret", "Fir", "Gibbon", "Gum", "Haddock", "Holly", "Iguana", "Ivy", "Jackal", "Juniper",
"Kraken", "Knotweed", "Lion", "Larch", "Mongoose", "Maple", "Nightingale", "Nettle", "Octopus", "Olive",
"Pilchard", "Pine", "Quail", "Quince", "Raven", "Ragweed", "Squid", "Sycamore", "Tapir", "Teasel",
"Unicorn", "Umbrella", "Vulture", "Vervain", "Walrus", "Willow", "Yak", "Yew", "Zebra", "Zelkova",
"Amethyst", "Anguish", "Beryl", "Bleak", "Cobalt", "Chagrin", "Diamond", "Despair", "Emerald", "Ennui",
"Flint", "Fear", "Gypsum", "Gloom", "Hessite", "Horror", "Ivory", "Ire", "Jet", "Jaded",
"Kyanite", "Killjoy", "Lead", "Lonely", "Malachite", "Malaise", "Nickel", "Nervous", "Obsidian", "Oppression",
"Pyrites", "Pessimism", "Quartz", "Qualms", "Ruby", "Regret", "Steel", "Sorrow", "Turquoise", "Torment",
"Uranium", "Unctuous", "Vauxite", "Vexation", "Wulfenite", "Woe", "Yuksporite", "Yearning", "Zinc", "Zestless",
"ECL"
// }}}
];

// Hash table
var streets_name_to_number_data = new Array();
for (var i = 0; i < streets_name.length; ++i) {
	streets_name_to_number_data[streets_name[i]] = i;
}

// Converts a street name to a number
// IN : street name
// RET: > 0 = value / -1 error
function street_name_to_number(name) {
	ret = streets_name_to_number_data[name];
	if (!ret) {
		return -1;
	}
	return ret;
}

// Converts a street number to a name
// IN : street number
// RET string
function number_to_street_name(_n) {
	var n = parseint(_n);
	if (n < 0 || n > 101) {
		GM_log('number_to_street_name failed' + _n);
		return 'INTERNAL-ERROR';
	}
	return streets_name[n];
}

// DATA: PLACES station array - used almost everywhere
// Contents is "name", x, y, scratchvalue
// {{{
var places_station = [
	// {{{
	["Calliope",	25.5,	25.5	],
	["Clio",	50.5,	25.5	],
	["Erato",	75.5,	25.5	],
	["Euterpe",	25.5,	50.5	],
	["Melpomene",	50.5,	50.5	],
	["Polyhymnia",	75.5,	50.5	],
	["Terpsichore",	25.5,	75.5	],
	["Thalia",	50.5,	75.5	],
	["Urania",	75.5,	75.5	]
	// }}}
];
// }}}



// }}} ===================== DATA =====================


// {{{ ===================== CODE - EDIT WITH CARE =====================

// This function show the content of a 2D array in the rbt_test div
function debug_display_array_2d(arr) {
	// {{{
	var test_item = document.getElementById("rbt_test");
	if (!test_item) {
		GM_log('Error: no rbt_test item');
	}
	test_item.innerHTML += "XXX debug_display_array_2d:start XXX<br>";
	for (var i = 0 ; i < arr.length; ++i) {
		for (var j = 0 ; j < arr[i].length; ++j) {
			test_item.innerHTML += 'arr['+i+']['+j+'] == '+ arr[i][j] + '<br>';
		}
	}
	test_item.innerHTML += "XXX debug_display_array_2d:end XXX<br>";
	// }}}
}



// Global variables
// The 9 blocks from 0 (TL) to 8 (BR)
var blocks = [];

// The current position
var current_x = 4242;
var current_y = 4242;

// HTML selections
var select_dest_x = null;
var select_dest_y = null;
var select_use_stations = null;
var select_quicksel = null;

// HTML buttons
var button_toggle_config = null;
var button_toggle_extra_links = null;
var button_toggle_route = null;
var button_toggle_hud = null;
var button_toggle_minimap = null;
var button_toggle_num_coord = null;
var button_check_update = null;
var button_check_dynamic_places = null;
var button_direction_indicator_flavor = null;

// The characters used to show the arrows in the HUD

const ARROWS_ARRAYS = [
  // letters
  ["NW", "N", "NE", "W", "o", "E", "SW", "S", "SE"],
  ["^&gt;", "^", "^&lt;", "&lt;", "o", "&gt;", "v&lt;", "v", "v&gt;"],
  // simple unicode arrows
  ["\u2196", "\u2191", "\u2197", "\u2190", 'o', "\u2192", "\u2199", "\u2193", "\u2198"],
  // double unicode arrows
  ["\u21d6", "\u21d1", "\u21d7", "\u21d0", 'o', "\u21d2", "\u21d9", "\u21d3", "\u21d8"]
];

if (direction_indicator_flavor < 0 || direction_indicator_flavor > ARROWS_ARRAYS.length) {
	direction_indicator_flavor = 3;
}
var arrows_array = ARROWS_ARRAYS[direction_indicator_flavor];


// Simple linear distance function
// Note: stations are not considered
function distance_AP(x1, y1, x2, y2) {
// {{{
	return 2.0 * max(abs(x1 - x2), abs(y1 - y2));
// }}}
}

// Return a string indicating how to go from (from_x, from_y) to (to_x, to_y)
// If enable_hud is set, will update the DOM node id 'rbt_hud'
// Note: road through stations are not taken into account
function generate_direction(from_x, from_y, to_x, to_y, enable_hud, update_hud, star) {
	// {{{
	var x_delta;
	var x_shift = to_x - from_x;
	if (x_shift < 0) {
		x_delta = 0;
	} else if (x_shift == 0) {
		x_delta = 1;
	} else {
		x_delta = 2;
	}

	var y_delta;
	var y_shift = to_y - from_y;
	if (y_shift < 0) {
		y_delta = 0;
	} else if (y_shift == 0) {
		y_delta = 1;
	} else {
		y_delta = 2;
	}

	function arrow(yd, xd) {
		return arrows_array[3 * yd + xd];
	}
	var direction;
	if (use_composite_direction) {
		if (x_shift == 0 && y_shift == 0) {
			direction = "Here!";
		} else if (x_shift == 0) {
			direction = 2 * abs(y_shift) + arrow(y_delta, x_delta);
		} else if (y_shift == 0) {
			direction = 2 * abs(x_shift) + arrow(y_delta, x_delta)
		} else if (abs(x_shift) == abs(y_shift)) {
			direction = 2 * abs(x_shift) + arrow(y_delta, x_delta);
		} else if (abs(x_shift) < abs(y_shift)) {
			direction = 2 * abs(x_shift) + arrow(y_delta, x_delta);
			direction += "&nbsp;+&nbsp;";
			direction += 2 * (abs(y_shift)-abs(x_shift)) + arrow(y_delta, 1);
		} else if (abs(x_shift) > abs(y_shift)) {
			direction = 2 * abs(y_shift) + arrow(y_delta, x_delta);
			direction += "&nbsp;+&nbsp;";
			direction += 2 * (abs(x_shift)-abs(y_shift)) + arrow(1, x_delta);
		} else {
			// should not happen or I have messed up my tests ;)
			direction = "INTERNAL ERROR: xs=" + x_shift + " ys=" + y_shift;
		}
	} else {
		direction = 2 * abs(x_shift) + arrow(0, x_delta) + "/"+ 2 * abs(y_shift) + arrow(y_delta, 0);
	}

	// Show the direction to go in the central square
	if (update_hud) {
		var dir;
		if (mono_direction) {
			dir = arrow(y_delta, x_delta);
		} else {
			if (abs(x_shift) == abs(y_shift) || x_shift == 0 || y_shift == 0) {
				dir = arrow(y_delta, x_delta);
			} else if (abs(x_shift) < abs(y_shift)) {
				dir = arrow(y_delta, x_delta) + arrow(y_delta, 1);
			} else if (abs(x_shift) > abs(y_shift)) {
				dir = arrow(y_delta, x_delta) + arrow(1, x_delta);
			} else {
				dir = 'FIXME';
			}
			if (x_shift == 0 && y_shift == 0 && star) {
				dir = star;
			}
		}
		document.getElementById("rbt_hud").innerHTML = "<b>Direction:&nbsp;" + dir + "</b>";
	}

	return direction;
	// }}}
}

// Compute the shortest distance from current_x, current_y to to_x, to_y, optionally using stations
// Return a HTML string
// Handle the HUD for the direction to follow
function shortest_path(to_x, to_y, use_stations) {
	// {{{
	var route = "<br>";
	var from_x = current_x;
	var from_y = current_y;

	var dist_by_foot = distance_AP(from_x, from_y, to_x, to_y);
	var dist_to_station = places_station[0][3];

	if (dist_by_foot == 0) {
		route += "You are already there ! No need to move.<br>";
		// generate_direction() is used to update the direction arrows
		generate_direction(current_x, current_y, to_x, to_y, enable_hud, true);
		return route;
	}

	if ((!use_stations) || (dist_by_foot < dist_to_station)) {
		route += "Walk to your destination ("  + dist_by_foot + action_point_str + ": " +
			 generate_direction(current_x, current_y, to_x, to_y, enable_hud, true) + ")<br>";
		return route;
	}

	var places_station_tmp = new Array();
	for (var i = 0; i < places_station.length; ++i) {
		places_station_tmp[i] = new Array();
		places_station_tmp[i][0] = places_station[i][0];
		places_station_tmp[i][1] = places_station[i][1];
		places_station_tmp[i][2] = places_station[i][2];
		places_station_tmp[i][3] = -1;
	}
	// Compute the distance from to_x, to_y to stations and sort them
	sort_places(to_x, to_y, places_station_tmp);

	var best_dist_to_dest = dist_to_station + transit_cost_action_point + places_station_tmp[0][3];

	// Same AP cost ? then walk
	if (best_dist_to_dest >= dist_by_foot) {
		route += "Walk to your destination ("  + dist_by_foot + action_point_str + ": " +
			 generate_direction(current_x, current_y, to_x, to_y, enable_hud, true) + ")<br>";
		return route;
	}

	if (dist_to_station > 0) {
		route += "Walk to the " + places_station[0][0] + " station (" + dist_to_station + action_point_str + ": "+
			 generate_direction(current_x, current_y, places_station[0][1], places_station[0][2], enable_hud, true) + ")<br>";
	}
	if (dist_to_station == 0) {
		generate_direction(current_x, current_y, places_station[0][1], places_station[0][2], enable_hud, true, '*&nbsp;' + places_station_tmp[0][0]);
	}
	route += "Take the train up to " + places_station_tmp[0][0] + " station (" + transit_cost_action_point + action_point_str + " + "+transit_cost_coins+" "+ money_unit_str + ").<br>";
	route += "Walk to your destination (" + places_station_tmp[0][3] + action_point_str + ": "+
		 generate_direction(places_station_tmp[0][1], places_station_tmp[0][2], to_x, to_y, false, false) + ")<br>";

	route += "Total travel cost: " + (parseint(dist_to_station) + transit_cost_action_point + parseint(places_station_tmp[0][3])) + action_point_str + " & " + transit_cost_coins + " " + money_unit_str + ".<br>";

	return route;
	// }}}
}


// Event listener used to update the directions & route path - tied to select boxes
function common_func(event, obj) {
	// {{{
	if(event) {
		event.stopPropagation();
		event.preventDefault();
	}

	var parag = document.getElementById("rbt_route_path");
	while (parag.hasChildNodes()) {
		parag.removeChild(parag.firstChild);
	}
	var val_x, val_y;
	// Note GM_setValue() may only store integers or strings but not floats hence this workaround
	if (obj == select_dest_x) {
		val_x = obj.options[obj.selectedIndex].value;
		set_float("destination_x", val_x);
		val_y = get_float("destination_y", 1);
		route_use_stations = get_int("route_use_stations", 1);
		select_quicksel.selectedIndex = 0;
	} else if (obj == select_dest_y) {
		val_y = obj.options[obj.selectedIndex].value;
		set_float("destination_y", val_y);
		val_x = get_float("destination_x", 1);
		route_use_stations = get_int("route_use_stations", 1);
		select_quicksel.selectedIndex = 0;
	} else if (obj == select_use_stations) {
		val_x = get_float("destination_x", 1);
		val_y = get_float("destination_y", 1);
		route_use_stations = obj.options[obj.selectedIndex].value;
		set_int("route_use_stations", route_use_stations);
	} else if (obj == select_quicksel) {
		var dx = obj.options[obj.selectedIndex].getAttribute("newX");
		var dy = obj.options[obj.selectedIndex].getAttribute("newY");
		if (dx < 0 || dy < 0) {
			return;
		}

		select_dest_x.selectedIndex = 2 * dx - 1;
		select_dest_y.selectedIndex = 2 * dy - 1;
		set_float("destination_x", dx);
		set_float("destination_y", dy);
		common_func(null, null);
		return;

	} else {
		val_x = get_float("destination_x", 1);
		val_y = get_float("destination_y", 1);
		route_use_stations = get_int("route_use_stations", 1);
	}

	// Force the types to what they should be
	val_x = parseFloat(val_x);
	val_y = parseFloat(val_y);
	route_use_stations = parseint(route_use_stations);

	parag.innerHTML += shortest_path(val_x, val_y, route_use_stations);
	// }}}
}

// This code generates a hyperlink position which updates the route path
// Ex: domobject.appendChild(generate_hyperlink_position(42,42));
function generate_hyperlink_position(in_x, in_y) {
	// {{{
	var ital = document.createElement("i");
	ital.innerHTML += "(" + in_x + "," + in_y + ")";
	if (in_x < 0.5 || in_x > 100) {
		return ital;
	}
	if (in_y < 0.5 || in_y > 100) {
		return ital;
	}
	ital.setAttribute("newX", "" + in_x);
	ital.setAttribute("newY", "" + in_y);
	ital.style.textDecoration = "none";

	ital.addEventListener(
		'click',
		function(event) {
			var dx = this.getAttribute("newX");
			var dy = this.getAttribute("newY");
			select_dest_x.selectedIndex = 2 * dx - 1;
			select_dest_y.selectedIndex = 2 * dy - 1;
			select_quicksel.selectedIndex = 0;
			set_float("destination_x", dx);
			set_float("destination_y", dy);
			common_func(event, null);
		},
		true);

	ital.addEventListener(
		'mouseover',
		function(event) {
			this.style.textDecoration = "underline";
		},
		true);

	ital.addEventListener(
		'mouseout',
		function(event) {
			this.style.textDecoration = "none";
		},
		true);
	return ital;
	// }}}
}

// Event listener used to update the displayed parts - tied to buttons
function toggle_display(event, obj) {
	// {{{

	if(event) {
		event.stopPropagation();
		event.preventDefault();
	}

	var dst_id, gm_cookie;
	if (obj == button_toggle_config) {
		gm_cookie = "show_config";
		dst_id = "rbt_config";
	} else if (obj == button_toggle_extra_links) {
		gm_cookie = "show_extra_links";
		dst_id = "rbt_extra_links";
	} else if (obj == button_toggle_route) {
		gm_cookie = "show_route";
		dst_id = "rbt_route";
	} else if (obj == button_toggle_hud) {
		gm_cookie = "enable_hud";
		dst_id = "rbt_hud";
	} else if (obj == button_toggle_minimap) {
		gm_cookie = "enable_minimap";
		dst_id = "rbt_minimap";
	} else {
		// BUTTONS
		for (var i = 0; i < array_object.length; ++i) {
			if (obj == array_object[i].toggle_button) {
				gm_cookie = array_object[i].cookie_name;
				dst_id = array_object[i].div_id;
				break;
			}
		}
		if (!gm_cookie) {
			return;
		}
	}
	var dst = document.getElementById(dst_id);
	if (!dst) {
		return;
	}

	if (dst.style.display == 'none') {
		dst.style.display = 'block';
		set_int(gm_cookie, 1);
	} else {
		dst.style.display = 'none';
		set_int(gm_cookie, 0);
	}
	// }}}
}

// Event listener used to update the displayed parts - tied to buttons
function toggle_display_num_coord(event, obj) {
	// {{{

	if(event) {
		event.stopPropagation();
		event.preventDefault();
	}

	if (obj != button_toggle_num_coord) {
		return;
	}

	var do_show;
	var dst;

	dst = document.getElementById("block0coord");
	if (dst.style.display == 'none') {
		do_show = true;
		dst.style.display = 'block';
		set_int("show_num_coord", 1);
	} else {
		do_show = false;
		dst.style.display = 'none';
		set_int("show_num_coord", 0);
	}

	for (var i = 1; i < 9; ++i) {
		var dst = document.getElementById("block"+i+"coord");
		if (do_show) {
			dst.style.display = 'block';
		} else {
			dst.style.display = 'none';
		}
	}
	// }}}
}

// Event listener used to check online if there is an updated version
function check_update(event, obj) {
	// {{{
	if(event) {
		event.stopPropagation();
		event.preventDefault();
	}
	var outdiv = document.getElementById("rbt_check_update");
	if (!outdiv) {
		return;
	}
	outdiv.innerHTML = "<hr><b>CHECK UPDATE ONLINE</b><br>";
	outdiv.innerHTML += "Please send feedback to: " + user_script_contact_email + "<br>";
	try {
		GM_xmlhttpRequest(
		{ method: 'GET',
		url: user_script_latest_version_url,
		onload: function (r) {
			if (r.status != 200) {
				outdiv.innerHTML += 'Error: cannot check web page error=' + r.status;
				return;
			}
			var remoteVersion = r.responseText.replace(/^(\S+).*/g, "$1");
			var result = 'Versions: local=' + user_script_version + ' online=' + remoteVersion + '<br>';

			var rem = parseFloat(remoteVersion);
			var loc = parseFloat(user_script_version);
			if (loc == rem) {
				result += 'Your version is up-to-date.<br>';
			} else if (loc >= rem) {
				result += 'You are using a development version.<br>';
			} else {
				result += 'A newer version is available.<br>';
			}
			result += 'Visit: <a href="' + user_script_homepage + '">' + user_script_homepage + '</a><br>';
			outdiv.innerHTML += result;

			set_int_shared("update_timestamp", time());
		}
		});

	} catch(e) {
		outdiv.innerHTML += 'Error: an exception occured (' + e + ')<br>';
	}

	// }}}
}

// Update the quick selection box
function update_quicksel_contents() {
	// {{{

	while (select_quicksel.hasChildNodes()) {
		select_quicksel.removeChild(select_quicksel.firstChild);
	}

	tmpOption = document.createElement('option');
	tmpOption.setAttribute("newX", "" + -1);
	tmpOption.setAttribute("newY", "" + -1);
	tmpOption.text = '* Select new destination *';
	select_quicksel.appendChild(tmpOption);

	for (var j = 0; j < array_object.length; ++j) {
		var tmpobj = array_object[j];

		// Does the object wants to be quicksel'ectable
		if (!tmpobj.quicksel) {
			continue;
		}

		tmpOption = document.createElement('option');
		tmpOption.setAttribute("newX", "" + -1);
		tmpOption.setAttribute("newY", "" + -1);
		tmpOption.text = '';
		select_quicksel.appendChild(tmpOption);

		tmpOption = document.createElement('option');
		tmpOption.setAttribute("newX", "" + -1);
		tmpOption.setAttribute("newY", "" + -1);
		tmpOption.text = '#' + tmpobj.button_name + ' #################';
		select_quicksel.appendChild(tmpOption);

		for (var i=0; i< tmpobj.places_alpha.length; ++i) {
			tmpOption = document.createElement('option');
			tmpOption.setAttribute("newX", "" + tmpobj.places_alpha[i][1]);
			tmpOption.setAttribute("newY", "" + tmpobj.places_alpha[i][2]);
			tmpOption.text = '  '+ tmpobj.places_alpha[i][0] + ' (' + tmpobj.places_alpha[i][1] + ', ' + tmpobj.places_alpha[i][2] + ')';
			select_quicksel.appendChild(tmpOption);
		}
	}
	// }}}
}

// Event listener used to check online if there is an updated guild version
function check_dynamic_places(event, obj) {
	// {{{
	if (event) {
		event.stopPropagation();
		event.preventDefault();
	}
	var outdiv = document.getElementById("rbt_check_dynamic_places");
	if (!outdiv) {
		return;
	}

	// fetch_from_cdamaph call fetch_from_cliffburton which will call cache_result
	// Those 3 function will us dyn_arr and dyn_arr_idx to store data
	var dyn_arr = new Array();
	var dyn_arr_idx = 0;

	function cache_result(outdiv) {
		// {{{
		outdiv.innerHTML += 'Storing data... ';
		outdiv.innerHTML += 'found ' + dyn_arr.length + ' record(s)... ';
		dynamic_places_serialized = serialize_array_2d(dyn_arr);
		outdiv.innerHTML += '1/4... ';
		set_string_shared("dynamic_places_serialized", dynamic_places_serialized);
		outdiv.innerHTML += '2/4... ';

		// This is slightly tricky here as we need to upgrade
		// the Guilds+shop object places AND places_alpha and
		// maintain one copy alpha-ordered and the other
		// AP-orderd...

		dynamic_places = dyn_arr;
		var tmp_dyn_arr = new Array();
		for (var i = 0; i < dyn_arr.length; ++i) {
			tmp_dyn_arr[i] = dyn_arr[i];
		}
		// FIXME FIXME: using 5 is plain ugly...
		array_object[5].places = dyn_arr;
		array_object[5].places_alpha = tmp_dyn_arr;

		outdiv.innerHTML += '3/4... ';
		dynamic_places_timestamp = time();
		outdiv.innerHTML += '4/4... ';
		set_string_shared("dynamic_places_timestamp", dynamic_places_timestamp);
		outdiv.innerHTML += 'OK<br>';

		outdiv.innerHTML += 'Updating quick selection... ';
		update_quicksel_contents();
		outdiv.innerHTML += 'OK<br>';
		
		set_int_shared("dynamic_places_timestamp", time());
		// }}}
	}

	// FIXME: integrate this
	function fetch_from_cliffburton() {
		// {{{
		outdiv.innerHTML += "From cliffburton...";
        
		try {
			GM_xmlhttpRequest(
			{ method: 'GET',
			url: "http://vampire.cliffburton.de/",
			onload: function (r) {
				if (r.status != 200) {
					outdiv.innerHTML += 'Error: cannot check web page error=' + r.status;
					return;
				}
        
				outdiv.innerHTML += 'Parsing page... ';

				var response = r.responseText;
				var idx_start = r.responseText.indexOf('<table');
				var workingtext = response.slice(idx_start);
				var idx_start = workingtext.indexOf('<tr');
				var workingtext = workingtext.slice(idx_start);
				var idx_end  = workingtext.indexOf('</table>');
				workingtext = workingtext.slice(0, idx_end);
        
				workingtext = workingtext.replace(/<th>.*<\/th>/g, "").replace(/<tr>/g, "").replace(/<\/tr>/g, "|").replace(/<td>/g, "").replace(/<\/td>/g, ",");
        
				var arr1 = workingtext.split('|');
				var arr = new Array();
				for (var i = 0; i < arr1.length; ++i) {
					arr[i] = arr1[i].split(',');
				}
 
				var j = 0;
				for (var i = 0; i < arr.length; ++i) {
					if (!arr[i] || !arr[i][0] || !arr[i][1]) {
						continue;
					}
        
					var location_str = arr[i][1];
        
					// Sanity check: external data so we are never
					// really far from random stuff... anyway I
					// rather think of parsing errors ;)
					// If values are weird or unknown, we skip the entry
        
					var x_name = location_str.replace(/^\s*SE\s+of\s+(\S+)\s+and\s+(\d+).*/, "$1");
					var tmp_x = parseFloat(street_name_to_number(x_name));
					if (tmp_x < 0) {
						GM_log("unknown street name '"+x_name+"'");
						continue;
					}
					if (tmp_x < 0.5 || tmp_x > 100.0) {
						GM_log("out of bound tmp_x='"+tmp_x+"'");
						continue;
					}
        
					var y_name = location_str.replace(/^\s*SE\s+of\s+(\S+)\s+and\s+(\d+).*/, "$2");
					var tmp_y = parseFloat(y_name);
					if (tmp_y < 0.5 || tmp_y > 100.0) {
						GM_log("out of bound tmp_y='"+tmp_y+"'");
						continue;
					}
        
					// Guilds are South-East of the crossing (hence the +0.5/+0.5)
					dyn_arr[dyn_arr_idx] = [ arr[i][0], (tmp_x + 0.5), (tmp_y + 0.5) ];
					dyn_arr_idx++;
					j++;
        
				}
				outdiv.innerHTML += 'OK<br>';
        
				cache_result(outdiv);
        
			}
        
			});
        
		} catch(e) {
			outdiv.innerHTML += 'Error: an exception occured (' + e + ')<br>';
		}
		// }}}
	}

	function fetch_from_cdamaph() {
		// {{{
		outdiv.innerHTML += "From cdamaph...";
		try {
			GM_xmlhttpRequest(
			{ method: 'GET',
			url: "http://www.realm2.net/vampire/locscsv.php",
			onload: function (r) {
				if (r.status != 200) {
					outdiv.innerHTML += 'Error: cannot check web page error=' + r.status;
					return;
				}
        
				outdiv.innerHTML += 'Parsing page... ';
        
				// FIXME make this parsing a bit more foolproof
				var response = r.responseText.replace(/\n$/, "");
        
				var lines = response.split('\n');
				var arr = new Array();
				for (var i = 0; i < lines.length; ++i) {
					arr[i] = lines[i].split(',');
				}
        
				// Parsing done: arr[nbline][nbcol] should contain
				//   (type,description string,street name, street number)
        
				for (var i = 0; i < arr.length; ++i) {
					// FIXME: c daMaph has been kind enough to add
					// the type field but I won't use it currently
//	//				if (arr[i][0] != 'guild' || arr[i][0] != 'shop') {
//	//					continue;
//	//				}
        
					// Sanity check: external data so we are never
					// really far from random stuff... anyway I
					// rather think of parsing errors ;)
					// If values are weird or unknown, we skip the entry
        
					var tmp_x = parseFloat(street_name_to_number(arr[i][2]));
					if (tmp_x < 0) {
						GM_log("unknown street name '"+arr[i][2]+"'");
						continue;
					}
					// WCL is OK
					if (tmp_x > 100.0) {
						GM_log("out of bound tmp_x='"+tmp_x+"'");
						continue;
					}
					var tmp_y;
					if (arr[i][3].match(/ncl/ig)) {
						// NCL exception (not reported as 0th street
						tmp_y = 0.0;
					} else { 
						tmp_y = parseFloat(arr[i][3]);
						if (tmp_y < 0.5 || tmp_y > 100.0) {
							GM_log("out of bound tmp_y='"+tmp_y+"'");
							continue;
						}
					}
        
					// Guilds are South-East of the crossing (hence the +0.5/+0.5)
					dyn_arr[dyn_arr_idx] = [ ((arr[i][0] == 'guild') ? "Guild: " : "Shop:" ) + arr[i][1], (tmp_x + 0.5), (tmp_y + 0.5) ];
					dyn_arr_idx++;
							
				}
				outdiv.innerHTML += 'OK<br>';
  
				fetch_from_cliffburton();      
//				cache_result(outdiv, dyn_arr);
        
			}
			});
        
		} catch(e) {
			outdiv.innerHTML += 'Error: an exception occured (' + e + ')<br>';
		}
		// }}}
	}

	outdiv.innerHTML = "<hr><b>GETTING CURRENT LOCATIONS...</b><br>";
	outdiv.innerHTML += "Please send feedback to: " + user_script_contact_email + "<br>";
	outdiv.innerHTML += 'Feel free to thank <a href="http://www.realm2.net/vampire/">c daMaph</a> and <a href="http://vampire.cliffburton.de/">Cliffburton</a> for those locations&nbsp;!<br><br>';
	fetch_from_cdamaph();

	// }}}
}

// Roles
//  - Compute current location and sets it in current_x, current_y
//  - Add fixed size to the blocks TD's
//  - If show_num_coord is set, display the values in each block
// Return false in case of a failure
function do_get_current_location() {
// {{{
	var docTds = document.getElementsByTagName("td");
	if (!docTds) {
		return false;
	}

	var blocks_x = new Array();
	var blocks_y = new Array();

	// itemno corresponds to the 3x3 block: Top-Left is 0, center is 4, Bottom-Right is 8
	var itemno = 0;
	for (var i = 0; i < docTds.length; ++i) {
		var cls = docTds[i].getAttribute("class");
		if (!cls) {
			continue;
		}

		// -1 indicates a coordinate not set yet
		blocks_x[itemno] = -1;
		blocks_y[itemno] = -1;
		if (cls == "city" || cls == "street" || cls == "intersect") {
			var cn = docTds[i].childNodes;
			for (var j = 0; j < cn.length; ++j) {
				if (! cn[j].hasChildNodes) {
					continue;
				}
				var ccn = cn[j].childNodes;
				for (var k = 0; k < ccn.length; ++k) {
					// see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/idl-definitions.html
					var ELEMENT_NODE = 1;
					if (ccn[k].nodeType != ELEMENT_NODE) {
						continue;
					}
					if (ccn[k].getAttribute("name") == "x") {
						blocks_x[itemno] = parseint(ccn[k].getAttribute("value"));
					} else if (ccn[k].getAttribute("name") == "y") {
						blocks_y[itemno] = parseint(ccn[k].getAttribute("value"));
					}
				}
			}
		}
		if (cls == "city" || cls == "street" || cls == "intersect" || cls == "cityblock") {
			if (resize_city_blocks) {
				docTds[i].setAttribute("width", city_block_w);
				docTds[i].setAttribute("height", city_block_h);
			}
			blocks[itemno] = docTds[i];
			++itemno;
		}
	}

	// We must have exactly 9 blocks
	if (itemno != 9) {
		return false;
	}

	// We search a block which shows valid coordinates as:
	//  - blocks in blue don't have coordinates
	//  - current block doesn't have some
	//  - we handle the case where x && y might not be available at the same time...
	var goodidx = -1;
	for (var i = 0; i < 9; ++i) {
		if (blocks_x[i] >= 0 && blocks_y[i] >= 0) {
			goodidx = i;
			break;
		}
	}
	if (goodidx == -1) {
		// No good block index
		return false;
	}

	// This is the adjustment tables if goodidx == 4...
	// It may be slightly dirty but it works :}
	var adjust_x = new Array(-1, 0, 1, -1, 0, 1, -1, 0, 1);
	var adjust_y = new Array(-1, -1, -1, 0, 0, 0, 1, 1, 1);

	var dx = (9 + 4 - goodidx) % 3;
	dx = (dx == 2) ? -1 : dx;

	var dy = 1 - Math.floor(goodidx / 3);

	for (var i = 0; i < 9; ++i) {
		blocks_x[i] = blocks_x[goodidx] + adjust_x[i] + dx;
		blocks_y[i] = blocks_y[goodidx] + adjust_y[i] + dy;
	}

	for (var i = 0 ; i < 9; ++i) {
		if (use_hyperlink_positions) {
			var tmpdiv;
			if (i == 4) {
				tmpdiv = document.createElement("div");
				tmpdiv.style.textAlign = "center";
				tmpdiv.setAttribute("id", "rbt_hud");
				tmpdiv.style.display = (enable_hud) ? 'block' : 'none';
				blocks[i].appendChild(tmpdiv);
			}


			tmpdiv = document.createElement("div");
			tmpdiv.setAttribute("id", "block"+i+"coord");
			tmpdiv.style.textAlign = "center";
			tmpdiv.appendChild(generate_hyperlink_position(blocks_x[i]/2.0+0.5, blocks_y[i]/2.0+0.5));
			tmpdiv.style.display = (show_num_coord) ? 'block' : 'none';
			blocks[i].appendChild(tmpdiv);

		} else {
			blocks[i].innerHTML += "<br><i>("+(blocks_x[i]/2.0+0.5)+","+(blocks_y[i]/2.0+0.5)+")</i><br>";
		}
	}

	current_x = blocks_x[4]/2.0+0.5;
	current_y = blocks_y[4]/2.0+0.5;

	// Idea suggested by ViperX: keep a instant value of your account balance
	var i = 4;
	if (blocks[i].firstChild && blocks[i].firstChild.getAttribute("class") == 'bank') {
		var account_balance;
		try {
			var msg = blocks[i].parentNode.parentNode.parentNode.parentNode.nextSibling.data;
			msg = msg.replace(/Welcome to Omnibank. Your account has /g, "")
						    .replace(/ coins in it./g, "");
			account_balance = parseint(msg);
		} catch(e) {
			account_balance = -1;
		}
		set_int('account_balance', account_balance);
		set_int('account_balance_timestamp', time());
	}

	return true;
// }}}
}


// Compute the distances in AP from (from_x, from_y) to
//   (places[i][1], places[i][2]) and put it into places[i][3]
// Then sort places by increasing distance
function sort_places(from_x, from_y, places) {
	// {{{
	function dist_sort(e1, e2) {
		return e1[3] - e2[3];
	}

	for (var i = 0 ; i < places.length; ++i) {
		places[i][3] = distance_AP(from_x, from_y, places[i][1], places[i][2]);
	}
	places.sort(dist_sort);
	// }}}
}

// Return a HTML string containing at most max_count places, withing dist_threshold AP from places
// Note: places MUST have been sorted and respect the format (name, x, y, distance)
function show_nearest(places, max_count, dist_threshold) {
	// {{{
	var table = document.createElement("table");
	table.setAttribute("width", "100%");
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	for (var i = 0; i < min (places.length, max_count); ++i) {
		if (places[i][3] <= dist_threshold) {
			var tr = document.createElement("tr");
			tbody.appendChild(tr);
			var td;

			td = document.createElement("td");
			td.innerHTML = places[i][0];
			tr.appendChild(td);

			td = document.createElement("td");
			td.setAttribute("width", "20%");
			if (use_hyperlink_positions) {
				td.appendChild(generate_hyperlink_position(places[i][1], places[i][2]));
			} else {
				td.innerHTML = "<i>(" + places[i][1] + "," + places[i][2] + ")</i>";
			}
			tr.appendChild(td);

			td = document.createElement("td");
			td.setAttribute("width", "15%");
			td.innerHTML = "<b>" + places[i][3] + action_point_str +"</b>";
			tr.appendChild(td);

			td = document.createElement("td");
			td.setAttribute("width", "25%");
			td.innerHTML = generate_direction(current_x, current_y, places[i][1], places[i][2], false, true);
			tr.appendChild(td);


		}
	}
	return table;
	// }}}
}

// Roles : do most of the computation, directions, info, best places etc
// Return false in case of a failure
function do_show_extra_info() {
	// {{{

	var docTables = document.getElementsByTagName("table");
	if (!docTables) {
		return false;
	}
	if (docTables.length != 2) {
		return false;
	}

	var citytab = docTables[1].parentNode;

	// FIXME fix this mess with CSS stuff & position, one day

	var outtab;
	if (swallow_city) {
		var spaceyDivs;
		spaceyDivs = document.evaluate(
			"//div[@class='spacey']",
			document,
    			null,
    			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    			null);
		var citydiv = spaceyDivs.snapshotItem(0);
		// Not used but for memory:
		// var infodiv = spaceyDivs.snapshotItem(1);

		citydiv.style.width = "100%";

		var newTable = document.createElement("table");
		var newTbody = document.createElement("tbody");

		var newTR = document.createElement("tr");

		var swallowTD = document.createElement("td");
		swallowTD.appendChild(citytab.parentNode);

		var infoTD = document.createElement("td");
		infoTD.style.border = "solid white 1px";
		infoTD.style.padding = "4px";
		outtab = infoTD;

		if (swallowed_city_at_left) {
			newTR.appendChild(swallowTD);
			newTR.appendChild(infoTD);
		} else {
			newTR.appendChild(infoTD);
			newTR.appendChild(swallowTD);
		}

		newTbody.appendChild(newTR)
		newTable.appendChild(newTbody);

		citydiv.appendChild(newTable);
	} else {
		outtab = citytab;
	}
	outtab.setAttribute("id", "rbt_outtab");

	var tmpdiv;

	var prefdiv;
	prefdiv = document.createElement("div");
	prefdiv.setAttribute("id", "rbt_prefs");
	prefdiv.innerHTML += "<b>Ravenblack Tuning</b> " + user_script_version + "&nbsp;";
	outtab.appendChild(prefdiv);

	button_toggle_config = document.createElement("button");
	button_toggle_config.style.border = "dotted grey 1px;";
	button_toggle_config.innerHTML = "Configuration";
	prefdiv.appendChild(button_toggle_config);

	button_prev_alt = document.createElement("button");
	button_prev_alt.style.border = "dotted grey 1px;";
	button_prev_alt.innerHTML = "&lt;";
	prefdiv.appendChild(button_prev_alt);

	button_next_alt = document.createElement("button");
	button_next_alt.style.border = "dotted grey 1px;";
	button_next_alt.innerHTML = "&gt;";
	prefdiv.appendChild(button_next_alt);

	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_config");
	tmpdiv.style.display = (show_config) ? 'block' : 'none';
	prefdiv.appendChild(tmpdiv);

		tmpdiv.innerHTML = "<hr><b>CONFIGURATION</b><br>";

		tmpdiv.appendChild(document.createElement("br"));

		tmpdiv.appendChild(document.createTextNode("Vampire name: " + current_vampire_name));
		tmpdiv.appendChild(document.createElement("br"));
		
		var tmp = get_int("account_balance_timestamp", -1);
		var tmp_str = "Account balance: ";
		if (tmp > 0) {
			tmp_str += get_int("account_balance", -1) + " (" + human_time_delay(time() - tmp) + " ago)";
		} else {
			tmp_str += "none (visit a bank !)";
		}
		tmpdiv.appendChild(document.createTextNode(tmp_str));


		tmpdiv.appendChild(document.createElement("br"));

		for (var i = 0; i < array_object.length; ++i) {
			var tmpobj = array_object[i];
			var button_toggle = document.createElement("button");
			button_toggle.style.border = "dotted grey 1px;";
			button_toggle.innerHTML = tmpobj.button_name;
			tmpdiv.appendChild(button_toggle);
			tmpobj.toggle_button = button_toggle;
		}

		tmpdiv.appendChild(document.createElement("br"));

		button_toggle_extra_links = document.createElement("button");
		button_toggle_extra_links.style.border = "dotted grey 1px;";
		button_toggle_extra_links.innerHTML = "Web links";
		tmpdiv.appendChild(button_toggle_extra_links);

		button_toggle_route = document.createElement("button");
		button_toggle_route.style.border = "dotted grey 1px;";
		button_toggle_route.innerHTML = "Route";
		tmpdiv.appendChild(button_toggle_route);

		button_toggle_hud = document.createElement("button");
		button_toggle_hud.style.border = "dotted grey 1px;";
		button_toggle_hud.innerHTML = "HUD";
		tmpdiv.appendChild(button_toggle_hud);

		button_toggle_minimap = document.createElement("button");
		button_toggle_minimap.style.border = "dotted grey 1px;";
		button_toggle_minimap.innerHTML = "Minimap";
		tmpdiv.appendChild(button_toggle_minimap);

		button_toggle_num_coord = document.createElement("button");
		button_toggle_num_coord.style.border = "dotted grey 1px;";
		button_toggle_num_coord.innerHTML = "Num. coord.";
		tmpdiv.appendChild(button_toggle_num_coord);

		tmpdiv.appendChild(document.createElement("br"));

		button_check_update = document.createElement("button");
		button_check_update.style.border = "dotted grey 1px;";
		button_check_update.innerHTML = "Check for<br>newer version<br>online";
		tmpdiv.appendChild(button_check_update);

		button_check_dynamic_places = document.createElement("button");
		button_check_dynamic_places.style.border = "dotted grey 1px;";
		button_check_dynamic_places.innerHTML = "Update shops &<br>guilds<br>online";
		tmpdiv.appendChild(button_check_dynamic_places);

		button_direction_indicator_flavor = document.createElement("button");
		button_direction_indicator_flavor.style.border = "dotted grey 1px;";
		button_direction_indicator_flavor.innerHTML = "Change<br>direction<br>indicator (" + direction_indicator_flavor +")";
		tmpdiv.appendChild(button_direction_indicator_flavor);
		tmpdiv.appendChild(document.createElement("br"));

		button_list_alts = document.createElement("button");
		button_list_alts.style.border = "dotted grey 1px;";
		button_list_alts.innerHTML = "List alts known";
		tmpdiv.appendChild(button_list_alts);

		button_flush_alts = document.createElement("button");
		button_flush_alts.style.border = "dotted grey 1px;";
		button_flush_alts.innerHTML = "Reset all alts";
		tmpdiv.appendChild(button_flush_alts);

	// Just a test container
	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_test");
	outtab.appendChild(tmpdiv);

	// Just a test container
	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_minimap");
	outtab.appendChild(tmpdiv);

	// Just the container
	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_check_update");
	outtab.appendChild(tmpdiv);

	// Just the container
	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_check_dynamic_places");
	outtab.appendChild(tmpdiv);


	// BUTTONS
	for (var i = 0; i < array_object.length; ++i) {
		var tmpobj = array_object[i];
		tmpdiv = document.createElement("div");
		tmpdiv.setAttribute("id", tmpobj.div_id);
		outtab.appendChild(tmpdiv);
		sort_places(current_x, current_y, tmpobj.places);
		tmpdiv.innerHTML += "<hr><b>" + tmpobj.name_title + "</b> - the " + tmpobj.nearest + " nearest within " + tmpobj.dist_threshold + action_point_str +"<br>";
		tmpdiv.appendChild(show_nearest(tmpobj.places, tmpobj.nearest, tmpobj.dist_threshold));
		tmpdiv.style.display = (tmpobj.show) ? 'block' : 'none';
	}

	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_extra_links");
	tmpdiv.style.display = (show_extra_links) ? 'block' : 'none';
	tmpdiv.innerHTML += "<hr><b>EXTRALINKS</b><br>";
	for (var i = 0; i < extra_links.length; ++i) {
		tmpdiv.innerHTML += "<a href=\"" + extra_links[i][1] + "\">"+extra_links[i][0]+"</a><br>";
	}
	outtab.appendChild(tmpdiv);


	var route_div = document.createElement("div");
	route_div.setAttribute("id", "rbt_route");
	route_div.style.display = (show_route) ? 'block' : 'none';
	outtab.appendChild(route_div);


	// {{{ Destination selection - select menus generation
	tmpdiv  = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_destination_selection");
	route_div.appendChild(tmpdiv);

	tmpdiv.innerHTML += "<hr><b>ROUTE</b><br>" +
			"You are at " + number_to_street_name(current_x) + " (" + current_x + ") x " + current_y +
			", where do you want to go&nbsp;?<br>";

	var tmpOption;

	// vertical streets
	var dest_x = get_float("destination_x", -1);
	select_dest_x = document.createElement("select");
	select_dest_x.name = "select_dest_x";
	select_dest_x.id = "select_dest_x";
	select_dest_x.style.width = "15em";

	for (var i = 0.5; i <= 100; i+= 0.5) {
		var half = (i == parseint(i) + 0.5) ? " East" : "";
		tmpOption = document.createElement("option");
		tmpOption.value = i;
		tmpOption.text = number_to_street_name(i) + half + " (" + i + ")";
		if (i == dest_x) {
			tmpOption.selected = "selected";
		}
		select_dest_x.appendChild(tmpOption);
	}
	tmpdiv.appendChild(select_dest_x);

	tmpdiv.appendChild(document.createElement("br"));

	// horizontal streets
	var dest_y = get_float("destination_y", -1);
	select_dest_y = document.createElement("select");
	select_dest_y.name = "select_dest_y";
	select_dest_y.id = "select_dest_y";
	select_dest_y.style.width = "15em";

	for (var i = 0.5; i <= 100; i += 0.5) {
		var half = (i == parseint(i) + 0.5) ? " South" : "";
		tmpOption = document.createElement("option");
		tmpOption.value = i;
		tmpOption.text = ordinal(parseint(i)) + half + " (" + i + ")";
		if (i == dest_y) {
			tmpOption.selected = "selected";
		}
		select_dest_y.appendChild(tmpOption);
	}
	tmpdiv.appendChild(select_dest_y);

	tmpdiv.appendChild(document.createElement("br"));

	route_use_stations = get_int("route_use_stations", 1);
	select_use_stations = document.createElement("select");
	select_use_stations.name = "use_stations";
	select_use_stations.id = "use_stations";

	tmpOption = document.createElement("option");
	tmpOption.value = "0";
	tmpOption.text = "Do not use stations";
	if (route_use_stations == 0) {
		tmpOption.selected = "selected";
	}
	select_use_stations.appendChild(tmpOption);

	tmpOption = document.createElement("option");
	tmpOption.value = "1";
	tmpOption.text = "Use stations";
	if (route_use_stations == 1) {
		tmpOption.selected = "selected";
	}
	select_use_stations.appendChild(tmpOption);

	tmpdiv.appendChild(select_use_stations);

	tmpdiv.appendChild(document.createElement("br"));
	tmpdiv.appendChild(document.createElement("br"));

	select_quicksel = document.createElement("select");
	select_quicksel.name = "quicksel";
	select_quicksel.id = "quicksel";

	update_quicksel_contents();

	tmpdiv.appendChild(select_quicksel);

	// }}}

	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_route_path");
	route_div.appendChild(tmpdiv);

	// Update the display
	common_func(null, null);

	// Bind the event listeners - for the select items
	select_dest_x.addEventListener('change', function(event) { common_func(event, this); } , true);
	select_dest_y.addEventListener('change', function(event) { common_func(event, this); } , true);
	select_use_stations.addEventListener('change', function(event) { common_func(event, this); } , true);
	select_quicksel.addEventListener('change', function(event) { common_func(event, this); } , true);

	// Bind the event listeners - for the button items
	button_toggle_config.addEventListener('click', function(event) { toggle_display(event, this); }, true);
	button_prev_alt.addEventListener('click', function(event) { switch_to_prev_alt(); }, true);
	button_next_alt.addEventListener('click', function(event) { switch_to_next_alt(); }, true);

	// BUTTONS
	for (var i = 0; i < array_object.length; ++i) {
		var tmpobj = array_object[i];
		tmpobj.toggle_button.addEventListener('click', function(event) { toggle_display(event, this); }, true);
	}

	button_toggle_extra_links.addEventListener('click', function(event) { toggle_display(event, this); }, true);
	button_toggle_route.addEventListener('click', function(event) { toggle_display(event, this); }, true);
	button_toggle_hud.addEventListener('click', function(event) { toggle_display(event, this); }, true);
	button_toggle_minimap.addEventListener('click', function(event) { toggle_display(event, this); }, true);

	button_toggle_num_coord.addEventListener('click', function(event) { toggle_display_num_coord(event, this); }, true);

	button_check_update.addEventListener('click', function(event) { check_update(event, this); }, true);
	button_check_dynamic_places.addEventListener('click', function(event) { check_dynamic_places(event, this); }, true);
	button_list_alts.addEventListener('click', function(event) { list_alts(); }, true);
	button_flush_alts.addEventListener('click', function(event) { flush_alts(); }, true);


	button_direction_indicator_flavor.addEventListener('click', function(event) {
		direction_indicator_flavor = (direction_indicator_flavor + 1 ) % ARROWS_ARRAYS.length;
		set_int("direction_indicator_flavor", direction_indicator_flavor); 
		button_direction_indicator_flavor.innerHTML = "Change<br>direction<br>indicator (" + direction_indicator_flavor +")";
		}, true);


	return true;
	// }}}
}

// Show the mini-map
// Note:
// - an optimization might be to use an inline image instead of using an image
function do_show_minimap() {
	// {{{
	const vampire_color = '#F00'
	const destination_color = '#00F';

	const real_width = 200;				// 100 streets
	const real_height = 200;			// 100 streets
	const map_width = 200;				// px
	const map_height = 200;				// px
	var ratio_width = map_width / real_width;
	var ratio_height = map_height / real_height;

	var titlediv = document.createElement("div");
	titlediv.innerHTML = "<hr><b>MINI-MAP</b><br>";

	var mapdiv = document.createElement("div");
	mapdiv.id = "minimap";
	mapdiv.style.margin = '0 auto';
	mapdiv.style.position = 'relative';
	mapdiv.style.width = map_width + 'px';
	mapdiv.style.height = map_height + 'px';
	mapdiv.style.border = 'dotted #00f 2px';
	mapdiv.style.overflow = 'hidden';
//	mapdiv.style.background = 'url(http://localhost:8080/200x200.png)';

	if (use_embedded_map_img) {
		var img = document.createElement("img");
		// Generated with: http://software.hixie.ch/utilities/cgi/data/data
		// {{{
		img.style.position = 'absolute';
		img.style.top = '0';
		img.style.left = '0';
		img.style.width = '200px';
		img.style.height = '200px';
		// Web access
		//img.src = "http://dummy4242.googlepages.com/minimap";
		// Local access
		img.src = "data:image/gif;base64,R0lGODlhyADIAPEAAAAAAHd3AMzMzAAAACH5BAAAAAAALAAAAADIAMgAAAL%2BhC%2Bpy%2B1p3jq0Wtoiu7zL3YXhN12kIlbnCp7p2IKvt842wHK5neHs37thagjisBQUaoAlSy%2BZejKnyiPJ%2BnHGmtUpFytYonhMsTdcNUvAD%2B05W3T5vvErGaimpuf2vMP91lYHBzW4dhdoV3iz41eYCNmnYvQSqSjTRdloaGmpQxl1uHm2V7k1xtYpqCo4Q6jpVRqKhOnISntL5%2FqWKidL4ws89poLKhvYK%2FkLCAeD%2B8dX3Ly8%2BXlbWm0SabsYrbyXzdyJbSxO6j2d3K0UPvnMzasdbC0dLLUu1A4mBn9uDu2snqR7tZaRE1iGGsJcBg0uTPjr4bWGERP1%2B0GRnUT%2BNRmPWUQXr%2BOuhxwRpcvHqqQ%2BkQHleDJ5KM1EgidZziLycuQ3RrB2SCnZMia4GLYu4vt3VMQojN40ABVWEyWtoiDnKS0Hk5iokFC3WjWaMivATD4v%2Beu6CqvEgkGf8qSJyt04uXiqsrV71uEpCGT3xlUXiy7TdhMprgz6FW9gwCrVhjWM9Sbhx5z8XqSXs%2BFhtMPuam3F2aVlkZsRj30Lrdvn0%2FISwmVZOvRdyWii1k0KF5lCPTIjX32mevBsQ2ATa%2BRts3ddpB%2BLL%2FaIPPlxpsx1O48%2BFLt0sX4w126umG%2FeyklE69puKjcacdcxldUefr1it%2Bh1Go%2BP%2FH1n3D3%2B9wutb99O5IGnn3isVReXeucB2FV3snHxGn5m%2FdXaNPUw2Bg%2BSwH3HST0IchXe7FBtlIxIvqWoX8I1bdchXNd%2BJuKHS7EIooP4iQNiKkJNx5sNnqnB4yApVUgRAMueGOISQam4IwnnbNhZ1QNKV%2BAoAG5TVN2XSZYkaD9tGWXBy4TQJlmQjmcGGaeSV2MH6xZZopKFqkjS3AGgCaSasLZomkN3CmnfHSKmVQad6py06FttuUNoBJ6SGiaeyiaGT2U%2Fqjln3CeiF2EyjlwKZECWhHqqJEu4Oha7Gn5qaZrmmfqnq8uumSqG51KIWq3cUVbVL2OqSquSk63a49LDiv%2BVnAkCVulVLfqKiO09%2B0TZqHxHfQsd6ymR6t3VFmLqIucxuqir%2BVyVemxjnEYrrT%2FuUlglnolthaytDloJbry7iZgvc3eC5K7Z6WL7ZPgBUpsvzjmN%2BGH2X0DKbXWUmnvtY8m2PC2FXGoo8HTnqvhi8MZ26qTzUZ8ZK7wXsnsoFh%2BLHBBsBK88pjj5mnkxhBPSLOfI%2Ftr8ogts6bezf8uiaDRqwlNMdF%2BGYjyr4%2FwzNDFFUttzLIls2ysdQB6rTS5PtPRNa%2BkPTc2k5KmXZhg%2FGh8Nnwd86hyvkK6zYfD81JtN9XmAhxkvcm5XPPMYjd4cdhMOyt3XyaqC%2FThW3f%2B%2B%2FDjL0eec0aislxw1Zc3CfrBmu%2F4N%2BOeg0z6wqd3xO67VDYd7tIi62k653lLyLagQH%2BbI9yd295n4T9v%2FrTTDEedMrJac2uu7FDvfLzoXMJudu5kp455PPRmL3niYiou%2BHyoR45168qHxT3lL%2FWcfNAUzpT%2Buh8tPrfHGMMYLOBZTgz5u%2BUJBL7SBQpnV0uWV973nEEFDmy4CpvOCNee12XKNdJLmQOhIyOrDEx7xWvX%2BFbnOPfZr0W6CR3yqHfC2qHNakeT4ALjl8KYBY9k7XNOADH3QNUVEGHCM9%2Fs2gQrvfELguLyHbNu6MMvZYx%2FUTqDo%2Bo0KT798E1SRBL%2BDaE4riceMYqzWt8KSmW9tdWwfVRc0%2Bfq9gItntGJVUTjFbeYxU19cIciUOMcvQDG%2FtFRgnE04x1LYUcZkiCPa7TZH8kogUBazFBynBwLCHlHJo6GhxiqJCKfJ0CbeGqCtLOkJikIs0%2FaA1N96yR6IkQ%2FzfQnk6VEI4NQScq4DSSW5XPl12i5SFWOMpSt3OMpcZnK3PExhMEcHS%2FHSKJZHrN%2BtqzRMnPpye0YLpreE6QvqZnDTVaycYXEpigpMzhcSkyM3kwY%2B5LJyiLyr5wGjCAyVbhOOLJTl9gDojihCU9yzrOXCbynNvNpyn3yM3rpHGdADynQIYqwnsO0Zgv%2Bmee6hIYQLE9JZTGLyU%2FW%2BU2Z0SKmIc35UY%2FGs5Y2JI4Ra3lNiNrudyEFKcoYiEWFrrRyEWXpS6snz2y2FKDN5OkG37jNewrTmJSBKTYxqs7MMfOnK%2FTmP3NY0jB6zajUfCoGqfrOmHrrpNE8ZyTJVSIbWbWq%2BxooWH0z1qyW06tLDWlYOdbDnr6yrCrd6PXg2s24plSac3FoEk82SYQibZ4e3NsM1SdW%2BWG1kGl1JPQUW1O1Gs2lfCPqYSfzMcxWUKrdM%2BtdITvT6Q2toCwMrUg72jR0IjaGiAMqT%2BkTPJsqjLVbda1fPdNBfaLwaAR5Wzzv5ljb5Pagu62tf4T%2ByNim%2BhRYOCVpaZVbXNnodHu2beBzuclCn013ttCFl1Ou2113Xm67wq3uOJEYWfF%2BtViovUCpGiuM9y7EjrE914ko6d42Eu9T8kUIfSn3j%2FviE1X6pZuFFNDfDPrmvxASowntKjMEF9hLYyFwFw9YXwMw%2BH49fbDzfpDgzFiYTZDCR4gP9zhInPimCVixDh%2FqYtPybjXovSFlsTuuvsFjgFPsqwFxDF7PrhaUPaYje0NJ20sO%2Bcj7c6uBUbzZ0S55oZh8cYl7pz%2FiLhd4w6VyPa9sOe9yVWc8Ti56q%2FxhpCI1IGX%2B6pm9%2FNdnatWyAAbv%2F1bESaFKlp4ZtrN7aJT%2BZznndHQU1SNHX1hl0WpU0ExuXlE5CNc1D%2FbGUebsXoOMT4muV6l1fSaYO0vYSisUuTdykKQLa2gtJ4zUZzS1nncrY0yjlLeBve2DZbtYk%2Fa5obrWrZLj%2FNBZAxm%2BNDv1KoXSRB8P1dLMFXRMk63Eti071bh1tjzDnGaTZVSvoN3prGF96C6zOtNSriinF43hfgK7vOdWsrl3zecvG8nDEX0jvedU5zmDe7%2B%2FXmheoRVV3P3Yjej7M6KrbaqDRzuWbyUyXp%2BLL1l7D9rpHXR0%2BS3ghTO1bXeWq5%2FXbU9UZ3vf4aaWkA3HYmVXK9z2zjfeYPhZ5KU81%2FA2KMzbyrWaeIEc5RUn%2BfJSpOhA78jmnz4mzB%2F7vKCH7rtB51LN%2B11oW7s8x3umcKzd%2BXSf73Tm2RK2qKUeG67%2FnNtJBjumxA5ppHe3hMdmq8Rjl7Uos32X4KS2L4ErcZzDWXcPV%2B24mZ0N1s695GOm6d9b63DAEvHbuZS0vk1X0qktntuidbzFt7xCeq9a6O8G9bZxLTrNQ57z27I8rylQAAA7";
		// }}}

		mapdiv.appendChild(img);
	}

	// x & y should be logical coordinates (between 0 & real_width)
	function put_div(x, y, size, color) {
		var tmpdiv2  = document.createElement("div");
		var halfsize = parseint(size) / 2;
		tmpdiv2.style.backgroundColor = color;
		tmpdiv2.style.position = 'absolute';
		tmpdiv2.style.top = parseint((2 * y - halfsize) * ratio_width) + 'px';
		tmpdiv2.style.left = parseint((2 * x - halfsize) * ratio_height) + 'px'; 
		tmpdiv2.style.width = parseint(size * ratio_width) + 'px';
		tmpdiv2.style.height = parseint(size * ratio_height) + 'px';
		mapdiv.appendChild(tmpdiv2);
	}


	var junk = new Array();
	if (!use_embedded_map_img) {
		junk[junk.length] = [array_object[0].places, '#ccc', 14, 2];
		junk[junk.length] = [places_station, '#770', 6, 0, 2];
	}
	junk[junk.length] = [dynamic_places, '#f0f', 5, 0, 2];

	for (var j = 0; j < junk.length; ++j) {
		var places = junk[j][0];
		var color = junk[j][1];
		var size1 = junk[j][2];
		var size2 = junk[j][3];
		for (var i = 0; i < places.length; ++i) {
			put_div(places[i][1], places[i][2], size1, color);
		}
		if (size2 > 0) {
			for (var i = 0; i < places.length; ++i) {
				put_div(places[i][1], places[i][2], size2, '#000');
			}
		}
	}

	var legend_div = document.createElement("div");
	legend_div.style.textAlign = "center";
	var tmpspan;

	// The destination 'dot'
	put_div( get_float("destination_x", 1.0), get_float("destination_y", 1.0), 8, destination_color);

	tmpspan = document.createElement("span");
	tmpspan.style.backgroundColor = destination_color;
	tmpspan.innerHTML = '<b>&nbsp;Destination&nbsp;</b>';
	legend_div.appendChild(tmpspan);

	// The vampiric 'dot'
	put_div(current_x, current_y, 8, vampire_color);

	tmpspan = document.createElement("span");
	tmpspan.style.backgroundColor = vampire_color;
	tmpspan.innerHTML = '<b>&nbsp;' + current_vampire_name + '&nbsp;</b>';
	legend_div.appendChild(tmpspan);

	// Build the whole div
	document.getElementById("rbt_minimap").appendChild(titlediv);
	document.getElementById("rbt_minimap").appendChild(mapdiv);
	document.getElementById("rbt_minimap").appendChild(legend_div);

	document.getElementById("rbt_minimap").style.display = (enable_minimap) ? 'block' : 'none';
	// }}}
}

// =============================================================================

// --- Display customization
function customize_display_ravenblack() {
// {{{

	if (hide_advice_paragraph) {
		// rbt_advice_parag
		tmp = document.getElementsByTagName("p");
		if (!tmp) {
			return false;
		}
		if (tmp.length < 1) {
			return false;
		}
		tmp[0].style.display = 'none';
	}

	// Role remove the part reading 'You can get ten...public forums'
	// Return false in case of a failure
	function do_remove_luring_bonus() {
		// {{{
		var divs = document.getElementsByTagName("div");

		if (divs.length < 3) {
			return false;
		}
		var miscinfodiv = divs[divs.length - 3];
		if (miscinfodiv.getAttribute("class") != "spacey") {
			return false;
		}

		var lastgoodelt = miscinfodiv.getElementsByTagName("a")[1];

		// FIXME the regex seems to be buggy
		if (false && !lastgoodelt.href.match(/^\/blood.pl\?action=viewvamp/g)) {
			return false;
		}
		var toflush = lastgoodelt.nextSibling;
		while (toflush) {
			miscinfodiv.removeChild(toflush);
			toflush = lastgoodelt.nextSibling;
		}
		return true;
		// }}}
	}

	if (remove_luring_bonus) {
		if (!do_remove_luring_bonus()) {
			GM_log("do_remove_luring_bonus() failed");
		}
	}
// }}}
}

// Misc informations:
//   _i      integer starting from 0 to the end (every part must be filled)
//   _name   1 word
//   _title  the title
//   _nearest             the nearest in the AP sense
//   _dist_threshold      don't look over this AP threshold
//   _places		  an array
//   _default             should the box be displayed as a default ?
//   _quicksel            should the places appear in the quicksel
function add_obj(_i, _name, _title, _nearest, _dist_threshold, _places, _default, _quicksel) {
	// {{{

	// Note: javascript is object so basically we keep a list of reference
	// ordered alphabetically in places_alpha but not a copy !
	var tmp_places_alpha = new Array();
	for (var i = 0; i < _places.length; ++i) {
		tmp_places_alpha[i] = _places[i];
	}
	array_object[_i] = {
		div_id: "rbt_" + _name,
		button_name: _name,
		name_title: _title,
		nearest: _nearest,
		dist_threshold: _dist_threshold,
		places: _places,
		cookie_name: "show_" + _name,
		cookie_default: _default,
		show: get_int("show_" + _name, _default),
		toggle_button: null,
		places_alpha: tmp_places_alpha,
		quicksel: _quicksel
	};
	// }}}
}

add_obj(0, "Banks", "BANKS", 5, 30, [
	// {{{ Coordinates of 200 banks
	["Aardvark-82",		1.5,	82.5	],
	["Alder-40",		2.5,	40.5	],
	["Alder-80",		2.5,	80.5	],
	["Amethyst-16",		51.5,	16.5	],
	["Amethyst-37",		51.5,	37.5	],
	["Amethyst-99",		51.5,	99.5	],
	["Anguish-30",		52.5,	30.5	],
	["Anguish-73",		52.5,	73.5	],
	["Anguish-91",		52.5,	91.5	],
	["Beech-26",		4.5,	26.5	],
	["Beech-39",		4.5,	39.5	],
	["Beryl-28",		53.5,	28.5	],
	["Beryl-40",		53.5,	40.5	],
	["Beryl-65",		53.5,	65.5	],
	["Beryl-72",		53.5,	72.5	],
	["Bleak-14",		54.5,	14.5	],
	["Buzzard-13",		3.5,	13.5	],
	["Cedar-1",		6.5,	1.5	],
	["Cedar-52",		6.5,	52.5	],
	["Cedar-80",		6.5,	80.5	],
	["Chagrin-23",		56.5,	23.5	],
	["Chagrin-39",		56.5,	39.5	],
	["Cobalt-46",		55.5,	46.5	],
	["Cobalt-81",		55.5,	81.5	],
	["Cobalt-88",		55.5,	88.5	],
	["Cormorant-93",	5.5,	93.5	],
	["Despair-1",		58.5,	1.5	],
	["Despair-75",		58.5,	75.5	],
	["Dogwood-4",		8.5,	4.5	],
	["Duck-37",		7.5,	37.5	],
	["Duck-77",		7.5,	77.5	],
	["Eagle-64",		9.5,	64.5	],
	["Eagle-89",		9.5,	89.5	],
	["Elm-98",		10.5,	98.5	],
	["Emerald-19",		59.5,	19.5	],
	["Emerald-90",		59.5,	90.5	],
	["Emerald-99",		59.5,	99.5	],
	["Ennui-20",		60.5,	20.5	],
	["Ennui-78",		60.5,	78.5	],
	["Fear-15",		62.5,	15.5	],
	["Ferret-32",		11.5,	32.5	],
	["Ferret-90",		11.5,	90.5	],
	["Fir-2",		12.5,	2.5	],
	["Flint-37",		61.5,	37.5	],
	["Flint-45",		61.5,	45.5	],
	["Flint-47",		61.5,	47.5	],
	["Flint-5",		61.5,	5.5	],
	["Gloom-34",		64.5,	34.5	],
	["Gloom-71",		64.5,	71.5	],
	["Gloom-89",		64.5,	89.5	],
	["Gloom-90",		64.5,	90.5	],
	["Haddock-46",		15.5,	46.5	],
	["Haddock-52",		15.5,	52.5	],
	["Haddock-67",		15.5,	67.5	],
	["Haddock-74",		15.5,	74.5	],
	["Haddock-88",		15.5,	88.5	],
	["Hessite-39",		65.5,	39.5	],
	["Hessite-76",		65.5,	76.5	],
	["Holly-96",		16.5,	96.5	],
	["Horror-49",		66.5,	49.5	],
	["Horror-59",		66.5,	59.5	],
	["Ire-31",		68.5,	31.5	],
	["Ire-42",		68.5,	42.5	],
	["Ire-53",		68.5,	53.5	],
	["Ire-97",		68.5,	97.5	],
	["Ivory-5",		67.5,	5.5	],
	["Ivory-71",		67.5,	71.5	],
	["Ivy-0",		18.5,	0.5	],
	["Ivy-70",		18.5,	70.5	],
	["Ivy-79",		18.5,	79.5	],
	["Jackal-43",		19.5,	43.5	],
	["Jaded-25",		70.5,	25.5	],
	["Jaded-48",		70.5,	48.5	],
	["Jaded-71",		70.5,	71.5	],
	["Juniper-16",		20.5,	16.5	],
	["Juniper-20",		20.5,	20.5	],
	["Juniper-98",		20.5,	98.5	],
	["Knotweed-15",		22.5,	15.5	],
	["Knotweed-29",		22.5,	29.5	],
	["Kraken-13",		21.5,	13.5	],
	["Kraken-18",		21.5,	18.5	],
	["Kraken-3",		21.5,	3.5	],
	["Kraken-34",		21.5,	34.5	],
	["Kraken-45",		21.5,	45.5	],
	["Kraken-48",		21.5,	48.5	],
	["Kraken-7",		21.5,	7.5	],
	["Kyanite-40",		71.5,	40.5	],
	["Kyanite-6",		71.5,	6.5	],
	["Larch-33",		24.5,	33.5	],
	["Larch-7",		24.5,	7.5	],
	["Larch-91",		24.5,	91.5	],
	["Lead-11",		73.5,	11.5	],
	["Lead-21",		73.5,	21.5	],
	["Lead-88",		73.5,	88.5	],
	["Lion-80",		23.5,	80.5	],
	["Lonely-93",		74.5,	93.5	],
	["Malachite-11",	75.5,	11.5	],
	["Malachite-32",	75.5,	32.5	],
	["Malachite-87",	75.5,	87.5	],
	["Malaise-36",		76.5,	36.5	],
	["Malaise-4",		76.5,	4.5	],
	["Malaise-50",		76.5,	50.5	],
	["Maple-34",		26.5,	34.5	],
	["Maple-84",		26.5,	84.5	],
	["Maple-85",		26.5,	85.5	],
	["Mongoose-78",		25.5,	78.5	],
	["Mongoose-79",		25.5,	79.5	],
	["Mongoose-91",		25.5,	91.5	],
	["Nervous-10",		78.5,	10.5	],
	["Nettle-37",		28.5,	37.5	],
	["Nettle-67",		28.5,	67.5	],
	["Nickel-93",		77.5,	93.5	],
	["Obsidian-36",		79.5,	36.5	],
	["Obsidian-79",		79.5,	79.5	],
	["Octopus-27",		29.5,	27.5	],
	["Octopus-71",		29.5,	71.5	],
	["Octopus-77",		29.5,	77.5	],
	["Olive-9",		30.5,	9.5	],
	["Olive-99",		30.5,	99.5	],
	["Oppression-2",	80.5,	2.5	],
	["Oppression-89",	80.5,	89.5	],
	["Pessimism-19",	82.5,	19.5	],
	["Pessimism-44",	82.5,	44.5	],
	["Pessimism-87",	82.5,	87.5	],
	["Pilchard-44",		31.5,	44.5	],
	["Pilchard-60",		31.5,	60.5	],
	["Pine-42",		32.5,	42.5	],
	["Pine-44",		32.5,	44.5	],
	["Pyrites-11",		81.5,	11.5	],
	["Pyrites-24",		81.5,	24.5	],
	["Pyrites-90",		81.5,	90.5	],
	["Quail-10",		33.5,	10.5	],
	["Quail-12",		33.5,	12.5	],
	["Quail-18",		33.5,	18.5	],
	["Quail-26",		33.5,	26.5	],
	["Quail-36",		33.5,	36.5	],
	["Quail-41",		33.5,	41.5	],
	["Quail-58",		33.5,	58.5	],
	["Quail-74",		33.5,	74.5	],
	["Qualms-28",		84.5,	28.5	],
	["Qualms-57",		84.5,	57.5	],
	["Qualms-75",		84.5,	75.5	],
	["Quartz-75",		83.5,	75.5	],
	["Quince-48",		34.5,	48.5	],
	["Quince-61",		34.5,	61.5	],
	["Ragweed-31",		36.5,	31.5	],
	["Ragweed-56",		36.5,	56.5	],
	["Raven-11",		35.5,	11.5	],
	["Raven-15",		35.5,	15.5	],
	["Raven-79",		35.5,	79.5	],
	["Raven-98",		35.5,	98.5	],
	["Regret-70",		86.5,	70.5	],
	["Ruby-18",		85.5,	18.5	],
	["Ruby-45",		85.5,	45.5	],
	["Sorrow-48",		88.5,	48.5	],
	["Sorrow-9",		88.5,	9.5	],
	["Squid-10",		37.5,	10.5	],
	["Squid-24",		37.5,	24.5	],
	["Steel-31",		87.5,	31.5	],
	["Steel-64",		87.5,	64.5	],
	["Steel-7",		87.5,	7.5	],
	["Sycamore-16",		38.5,	16.5	],
	["Tapir-0",		39.5,	0.5	],
	["Tapir-11",		39.5,	11.5	],
	["Tapir-41",		39.5,	41.5	],
	["Teasel-60",		40.5,	60.5	],
	["Teasel-66",		40.5,	66.5	],
	["Teasel-92",		40.5,	92.5	],
	["Torment-23",		90.5,	23.5	],
	["Torment-28",		90.5,	28.5	],
	["Torment-31",		90.5,	31.5	],
	["Umbrella-20",		42.5,	20.5	],
	["Umbrella-80",		42.5,	80.5	],
	["Unctuous-23",		92.5,	23.5	],
	["Unctuous-43",		92.5,	43.5	],
	["Unicorn-11",		41.5,	11.5	],
	["Unicorn-78",		41.5,	78.5	],
	["Uranium-1",		91.5,	1.5	],
	["Uranium-48",		91.5,	48.5	],
	["Uranium-93",		91.5,	93.5	],
	["Uranium-97",		91.5,	97.5	],
	["Vauxite-68",		93.5,	68.5	],
	["Vauxite-91",		93.5,	91.5	],
	["Vexation-24",		94.5,	24.5	],
	["Vulture-43",		43.5,	43.5	],
	["Vulture-82",		43.5,	82.5	],
	["WCL-77",		0.5,	77.5	],
	["Willow-84",		46.5,	84.5	],
	["Woe-44",		96.5,	44.5	],
	["Woe-85",		96.5,	85.5	],
	["Yak-45",		47.5,	45.5	],
	["Yak-82",		47.5,	82.5	],
	["Yak-94",		47.5,	94.5	],
	["Yearning-75",		98.5,	75.5	],
	["Yearning-93",		98.5,	93.5	],
	["Yew-4",		48.5,	4.5	],
	["Zebra-61",		49.5,	61.5	],
	["Zelkova-23",		50.5,	23.5	],
	["Zelkova-73",		50.5,	73.5	],
	["Zinc-74",		99.5,	74.5	]
	// }}}
	], 1, 0);

add_obj(1, "Bars", "BARS", 3, 50, [
	// {{{ Coordinates of 91 bars - may not be quite up to date - by convention no definite article ('the')
	["Abbot's Tavern",			14.5,	33.5	],
	["Angel's Wings",			80.5,	45.5	],
	["Archer's Tavern",			22.5,	11.5	],
	["Baker's Tavern",			90.5,	16.5	],
	["Balmer's Tavern",			12.5,	13.5	],
	["Barker's Tavern",			28.5,	3.5	],
	["Bishop's Tavern",			32.5,	51.5	],
	["Thief of Hearts",			25.5,	92.5	],
	["Blinking Pixix",			67.5,	99.5	],
	["Book and Beggar",			82.5,	37.5	],
	["The Lounge",				58.5,	38.5	],
	["Booze Hall",				75.5,	70.5	],
	["Bowyer's Tavern",			15.5,	64.5	],
	["Brain and Hatchling",			81.5,	41.5	],
	["Bridger's Tavern",			74.5,	78.5	],
	["Brimming Brew",			74.5,	87.5	],
	["Broken Lover",			84.5,	43.5	],
	["Burning Brand",			85.5,	90.5	],
	["Butcher's Tavern",			71.5,	19.5	],
	["Butler's Tavern",			84.5,	61.5	],
	["Carpenter's Tavern",			57.5,	1.5	],
	["Cart and Castle",			45.5,	68.5	],
	["Carter's Tavern",			48.5,	78.5	],
	["Chandler's Tavern",			35.5,	71.5	],
	["Clam &amp; Champion",			4.5 ,	19.5	],
	["Cosy Walrus",				27.5,	32.5	],
	["Crouching Tiger",			14.5,	10.5	],
	["Crow's Nest Tavern",			72.5,	46.5	],
	["Dancer's Tavern",			52.5,	68.5	],
	["Dog House",				36.5,	6.5	],
	["Draper's Tavern",			31.5,	48.5	],
	["Drunk Cup",				99.5,	94.5	],
	["Falconer's Tavern",			47.5,	90.5	],
	["Fiddler's Tavern",			85.5,	20.5	],
	["Fisher's Tavern",			11.5,	84.5	],
	["Five French Hens",			32.5,	68.5	],
	["Ferryman's Arm",			47.5,	30.5	],
	["Forester's Tavern",			88.5,	70.5	],
	["Fourty-Two, Pub",			62.5,	34.5	],
	["Freudian Slip",			88.5,	91.5	],
	["Freeman's Tavern",			87.5,	26.5	],
	["Ghastly Flabber",			45.5,	62.5	],
	["Golden Partridge",			23.5,	95.5	],
	["Gunny's Shack",			79.5,	54.5	],
	["Hanged Man",				41.5,	92.5	],
	["Harper's Tavern",			13.5,	98.5	],
	["Hawker's Tavern",			68.5,	63.5	],
	["Hearth and Sabre",			94.5,	2.5	],
	["Hunter's Tavern",			12.5,	72.5	],
	["Kestrel",				8.5 ,	54.5	],
	["King's Arm",				75.5,	76.5	],
	["Last Days",				25.5,	15.5	],
	["Leecher's Tavern",			23.5,	1.5	],
	["Lightbringer",			78.5,	42.5	],
	["Flirting Angel",			78.5,	2.5	],
	["Marbler's Tavern",			36.5,	78.5	],
	["Marsupial",				98.5,	48.5	],
	["McAllister Tavern",			65.5,	97.5	],
	["Mercer's Tavern",			81.5,	70.5	],
	["Miller's Tavern",			11.5,	44.5	],
	["Moon",				8.5 ,	78.5	],
	["Ox and Bow",				13.5,	44.5	],
	["Oyler's Tavern",			87.5,	3.5	],
	["Packer's Tavern",			54.5,	64.5	],
	["Painter's Tavern",			57.5,	92.5	],
	["Palm and Parson",			19.5,	53.5	],
	["Pelter's Tavern",			89.5,	71.5	],
	["Poltroon",				33.5,	85.5	],
	["Porter's Tavern",			87.5,	23.5	],
	["Red Arch",				54.5,	0.5	],
	["Rider's Tavern",			53.5,	98.5	],
	["Rogue's Tavern",			84.5,	5.5	],
	["Round Room",				85.5,	21.5	],
 	["Peace de R&eacute;sistance",		45.5,	83.5	],
	["Shattered Platter",			32.5,	91.5	],
	["Shinning Devil",			77.5,	57.5	],
	["Shooter's Tavern",			9.5 ,	67.5	],
	["Sign of the Times",			2.5 ,	57.5	],
	["Stick and Stag",			60.5,	80.5	],
	["Stick in the Mud",			80.5,	70.5	],
	["Stripey Dragon",			7.5 ,	7.5	],
	["Sun",					76.5,	87.5	],
	["Sunken Sofa",				9.5 ,	34.5	],
	["Teapot and Toxin",			10.5,	93.5	],
	["Ten Turtle Doves",			52.5,	98.5	],
	["Vagabond's Tavern",			48.5,	5.5	],
	["Wart and Whisk",			28.5,	86.5	],
	["Weevil and Stallion",			65.5,	55.5	],
	["Whirling Dervish",			38.5,	89.5	],
	["Two Sisters",				49.5,	36.5	],
	["Wild Hunt",				43.5,	11.5	]
	// }}}
	], 1, 1);

add_obj(2, "Stations", "STATIONS", 1, 60,
	places_station, 0, 1);

add_obj(3, "Misc.", "MISCELLANEOUS", 3, 50, [
	// {{{
	["AmadisdeGaula's Stellaburgi",		95.5,	38.5	],
	["Annabelle's Paradise",		59.5,	85.5	],
	["Aphaytha's Covenshire",		51.5,	69.5	],
	["Aphaythean Vineyards",		46.5,	13.5	],
	["Archangel's Castle",			4.5,	4.5	],
	["Avant's Garden",			51.5,	68.5	],
	["CHASS's Forever Blues Hall",		90.5,	75.5	],
	["COVE",				22.5,	51.5	],
	["Cair Paravel",			23.5,	27.5	],
	["Capadocian Castle",			24.5,	49.5	],
	["Carnal Desires",			18.5,	66.5	],
	["Castle RavenesQue",			35.5,	0.5	],
	["Castle of Shadows",			89.5,	86.5	],
	["DarkestDesire's Chambers",		58.5,	56.5	],
	["Devil Miyu's Abeir-Toril",		62.5,	2.5	],
	["Devil Miyu's Edge of Reason",		62.5,	0.5	],
	["Devil Miyu's Lair",			62.5,	1.5	],
	["Freedom Trade Alliance",		51.5,	46.5	],
	["Graveyard",				24.5,	50.5	],
	["Hall of Binding",			44.5,	40.5	],
	["Hall of Severance",			45.5,	40.5	],
	["Halls of Heorot",			70.5,	75.5	],
	["Halls of the Shadow Court",		66.5,	99.5	],
	["Hesu's Place",			35.5,	24.5	],
	["Hexenkessel",				19.5,	83.5	],
	["High Council",			79.5,	49.5	],
	["Inner Circle Manor",			57.5,	26.5	],
	["Ivory Tower",				50.5,	76.5	],
	["La Maison des Vengeurs",		79.5,	88.5	],
	["Majica's Playground",			46.5,	50.5	],
	["Moonlight Gardens",			89.5,	87.5	],
	["Ms Delgado's Manor",			88.5,	69.5	],
	["Palazzo Lucius",			49.5,	27.5	],
	["Peacekeeper's Mission 1",		59.5,	67.5	],
	["Peacekeeper's Mission 2",		41.5,	33.5	],
	["Peacekeeper's Mission 3",		59.5,	33.5	],
	["SCORPIOUS1's Tower of Truth",		98.5,	58.5	],
	["SIE Compound",			35.5,	13.5	],
	["Saki's Fondest Wish",			27.5,	17.5	],
	["Sakura Garden",			77.5,	77.5	],
	["Shadow Bat's Sanctorium",		55.5,	76.5	],
	["Steele Industries",			42.5,	44.5	],
	["WhiteLighter and oOPHYy's Abode",	76.5,	94.5	],
	["Wolfshadow's and Crazy's RBC Casino",	73.5,	72.5	],
	["bitercat's mews",			23.5,	42.5	],
	["espy's Jaded Sorrows",		70.5,	69.5	],
	["obsidian's Silver Towers",		79.5,	50.5	],
	["obsidian's ch&acirc;teau noir",	79.5,	99.5	],
	["renovate's grove",			42.5,	71.5	],
	["setitevampyr's Temple",		35.5,	50.5	],
	["sinister soul's Asylum",		16.5,	21.5	],
	["stormy jayne's web",			77.5,	99.5	],
	["tejas_dragon's Lair",			50.5,	69.5	],
	["Jaxi's and Speedy's Cave",		35.5,	23.5	],
	["Gypsychild's Caravan",		90.5,	69.5	],
	["AdaMaS' Castle Mahorela",		66.5,	29.5	],
	["Rev Awk's Regency",			46.5,	83.5	],
	["Hall of Shifting Realms",		79.5,	15.5	],
	["obsidian's Penthouse", 		79.5,	29.5	],
	["obsidian, Phoenixxe and Em's Heaven's Gate",	79.5,	45.5],
	["The Lokason Myrkrasetur",		95.5,	40.5]


	

	// }}}
	], 0, 1);

add_obj(4, "Quests", "QUESTS", 3, 50, [
	// {{{
	["Locate 1: Aardvark-1",	1,	1	],
	["Locate 1: Aardvark-100",	1,	100	],
	["Locate 1: Zestless-1",	100,	1	],
	["Locate 1: Zestless-100",	100,	100	],
	["Locate 2: Aardvark-50",	1,	50	],
	["Locate 2: Zestless-50",	100,	50	],
	["Locate 2: Zelkova-1",		50,	1	],
	["Locate 2: Zelkova-100",	50,	100	],
	["Locate 3: Sycamore-38",	38,	38	],
	["Locate 3: Sycamore-63",	38,	63	],
	["Locate 3: Gypsum-63",		63,	63	],
	["Locate 3: Gypsum-38",		63,	38	]
	// }}}
	], 0, 1);

add_obj(5, "Guilds &amp; Shops", "GUILDS &amp; SHOPS", 3, 50,
	dynamic_places, 0, 1);


if (!GM_xmlhttpRequest) {
	alert('Error: GM_xmlhttpRequest() method is not available - you have to upgrade Firefox and/or Greasemonkey. Sorry.');
	return;
}

// Main loop
if (window.location.href.match(/^action=viewvamp/g)) {
	// Do nothing
} else {
	customize_display_ravenblack();
	if (!do_get_current_location()) {
		// FIXME: The page seems to be loaded twice (this may be related to how GM works)
		// - one the do_get_current_location() fails
		// - the other it suceeds
//		GM_log("do_get_current_location() failed");
	} else {
		if (!do_show_extra_info()) {
			GM_log("do_show_extra_info() failed");
		}
		do_show_minimap();
		if (abs(time() - latest_online_check) > online_check_period) {
			check_update(null, null);
		}
		if (abs(time() - dynamic_places_timestamp) > online_check_period) {
			check_dynamic_places(null, null);
		}
	}
}

// }}} ===================== CODE =====================

}) ();

