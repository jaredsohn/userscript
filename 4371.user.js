// $Id: theabyss_tuning.user.js,v 1.24 2006-06-28 13:45:40 pl Exp $
// This script was forked from ravenblack tuning v1.78
// ==UserScript==
// @name The Abyss Tuning
// @namespace http://dummy4242.googlepages.com/theabyss
// @description The Abyss Tuning by dummy4242@gmail.com
// @include file:///home/pl/GM/SAMPLE/*php*
// @include http://abyss-uk.com/city/city.php*
// @include http://www.abyss-uk.com/city/city.php*
// @exclude
// ==/UserScript==
// .
// You may use this Greasemonkey script freely provided :
//   - the original author (dummy4242@gmail.com) is properly credited
//   - the original web page is shown : http://dummy4242.googlepages.com
//   - if you ever redistribute it or give it to a friend or a foe, it must
//     be at NO CHARGE and it must be in an unmodified form
//   - you understand that:
//        -> there is no warranty at all with regards to your installation and
//        the damage this script may do
//        -> this script may not work at all or as expected
// .
// If you feel like forking this code, you MUST ASK ME. I know I won't be able
// to forbid it but as it's currently under development, I'd prefer
// contributions to a fork and I'm open to collaborations (patches, ideas, etc).
// I'll probably release this script in a more standard open source license
// when I'm satisfied with its state and when I'm bored with editing it.
// .
// FWIW, the {{{ and }}} are used by vim to fold the source ;)
// .
// Check the list below and send me feedback to help me choose the next thing I'll add !
// .
// TODO
//  - fetch the updated positions of the guild & shops (req'd by Entropy)
//  - add a 'friend'/'foe' list handling
//  - add a fast select for interesting places to program the HUD & route
//  (partially done)
//  - wrap the GM_[gs]etValue to prefix them with the vampire name in case a
//  player plays several vampires
//  - maybe add a simple image map (200x200 pixels image/svg or css) with a red
//     overlayed dot to show the current absolute position
//    (partially done but too slow)
//  - use integers instead of floating (if that improves a bit speed - though it's fast enough here)
//  - add an about popup/screen/credits/etc
// .
// Credits:
//  - Most locations data come from c damaph's excellent map (http://www.realm2.net/vampire)
//    If you find some inaccuracies, typos, etc - please notify me.
// .
// Note:
//  * I adapted the coordinates to my preferences (streets have integer numbers, case by their sides a +- 0.5)
//  * Currently, values accessed with GM_[sg]etValue() are meant to be accessed by means of buttons callbacks

// Game localization
const user_script_long_version = "$Id: theabyss_tuning.user.js,v 1.24 2006-06-28 13:45:40 pl Exp $\n";
var user_script_version = user_script_long_version.replace(/.*1\.(\d+).*/g, "$1");
const user_script_latest_version_url = "http://dummy4242.googlepages.com/theabyss_tuning-latest_version.txt";
const user_script_homepage = "http://dummy4242.googlepages.com/theabyss";
const user_script_contact_email = "dummy4242 at gmail dot com";

// Get a Unix timestamp
function time() {
	var tmp = new Date;
	return tmp.getTime() / 1000;
}

// Put something insanely big if you do not want to check online
const online_check_period = 7 * 86400;
var latest_online_check = parseInt(GM_getValue("update_timestamp", 0));


const transit_cost_coins = 50;
const transit_cost_action_point = 0;
const action_point_str = 'MP';
const money_unit_str = 'coins';

// Configurable options
var show_script_version = true;

var show_num_coord = GM_getValue("show_num_coord", 1);	// Show numerical coordinates (1.5,3.5) ?
	var use_hyperlink_positions = true;

const resize_city_blocks = true;			// Resize city blocks
	const city_block_w = 200;			// width in pixels
	const city_block_h = 150;			// height in pixel

const tat_font_size = '10px';

const hide_city_name = true;

const use_composite_direction = true;	// if true:  '5NW then 5N'
					// if false: '10N 5W'

var show_config = GM_getValue("show_config", 1);

// Let's go object...
var array_object = new Array();

var show_extra_links = GM_getValue("show_extra_links", 1);	// Show extra links ?
	var extra_links = [
		[ "Abyss Info 2", "http://www.freewebs.com/abyssinfo2/index.html" ],
		[ "Vampschool", "http://vampschool.spiritlioness.com" ]
	];

// FIXME: fix the mess between route, route path, hud, etc
var show_route = GM_getValue("show_route", 1);		// Show the route (Walk to ... Take the train,,,)
							// & the destination selection
	var show_destination_selection = true;		// Display the 'Where do you want to go ?' select boxes

	var route_use_stations = GM_getValue("route_use_stations", 1);	// Use the stations status ?

var enable_hud = GM_getValue("enable_hud", 1);		// Show the direction arrow in the central square
							// Note: hud stands for 'head up display'

const enable_unicode_arrows = true;			// True: direction arrows in unicode
							// False: cardinal points (NW, N, etc)
							// Test your browser at:
							//     http://www.alanwood.net/unicode/arrows.html


// {{{ ===================== DATA =====================
// DATA: Ravenblack streets are named from 0 to 101
var streets_name = [
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

// IN : street name
// RET: > 0 = value / -1 error
function street_name_to_number(name) {
	for (var i=0; i < streets_name.length; ++i) {
		if (streets_name[i] == name) {
			return i;
		};
	}
	return -1;
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

// {{{ ---------------------- CODE - GENERIC FUNCTIONS ---------------------------

// Returns the ordinal string corresponding to n (integer)
// E.g.: 1->1st , 12-> 12th, ...
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

// Returns the minimum value between x and y (numbers)
function min(x, y) {
// {{{
	return Math.min(x, y);
// }}}
}

// Returns the maximum value between x and y (numbers)
function max(x, y) {
// {{{
	return Math.max(x, y);
// }}}
}

// Returns the absolute value of x (number)
function abs(x) {
// {{{
	return Math.abs(x);
// }}}
}

// Serializes a 2d array
// FIXME: the characters ',' and '|' should not be into the 2d array but I'm lazy
// FIXME: add a magic number at the beginning
// Valid regex: w(,w)*(|w(,w)*)*
function serialize_array_2d(arr) {
// {{{
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
// Control characters: , and |
// FIXME: the characters ',' and '|' should not be into the 2d array but I'm lazy
// FIXME: add a magic number at the beginning
// Valid regex: w(,w)*(|w(,w)*)*
function unserialize_array_2d(str) {
// {{{
	var arr1 = str.split('|');
	var arr = new Array();
	for (var i = 0; i < arr1.length; ++i) {
		arr[i] = arr1[i].split(',');
	}
	return arr;
// }}}
}

// }}}


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

// HTML buttons
var button_toggle_config = null;
var button_toggle_extra_links = null;
var button_toggle_route = null;
var button_toggle_hud = null;
var button_toggle_num_coord = null;
var button_check_update = null;

// The characters used to show the arrows in the HUD
var arrows_array = ["NW", "N", "NE", "W", "o", "E", "SW", "S", "SE"];

// Note : the order is TL, T, TR, L, Middle, R, BL, B, BR
if (enable_unicode_arrows) {
// Simple arrows:
//	arrows_array = ["\u2196", "\u2191", "\u2197", "\u2190", 'o', "\u2192", "\u2199", "\u2193", "\u2198"];
	arrows_array = ["\u21d6", "\u21d1", "\u21d7", "\u21d0", 'o', "\u21d2", "\u21d9", "\u21d3", "\u21d8"];
}

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
function generate_direction(from_x, from_y, to_x, to_y, enable_hud, update_hud) {
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
			direction += " + ";
			direction += 2 * (abs(y_shift)-abs(x_shift)) + arrow(y_delta, 1);
		} else if (abs(x_shift) > abs(y_shift)) {
			direction = 2 * abs(y_shift) + arrow(y_delta, x_delta);
			direction += " + ";
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
		document.getElementById("rbt_hud").innerHTML = "<b>Direction: " + arrow(y_delta, x_delta) + "</b>";
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
	route += "Take the train up to " + places_station_tmp[0][0] + " station (" + transit_cost_action_point + action_point_str + " + "+transit_cost_coins+" "+ money_unit_str + ").<br>";
	route += "Walk to your destination (" + places_station_tmp[0][3] + action_point_str + ": "+
		 generate_direction(places_station_tmp[0][1], places_station_tmp[0][2], to_x, to_y, false, false) + ")<br>";

	route += "Total travel cost: " + (parseInt(dist_to_station) + transit_cost_action_point + parseInt(places_station_tmp[0][3])) + action_point_str + " & " + transit_cost_coins + " " + money_unit_str + ".<br>";

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
		GM_setValue("destination_x", ""+val_x);
		val_y = GM_getValue("destination_y", 1);
		route_use_stations = GM_getValue("route_use_stations", 1);
	} else if (obj == select_dest_y) {
		val_y = obj.options[obj.selectedIndex].value;
		GM_setValue("destination_y", ""+val_y);
		val_x = GM_getValue("destination_x", 1);
		route_use_stations = GM_getValue("route_use_stations", 1);
	} else if (obj == select_use_stations) {
		val_x = GM_getValue("destination_x", 1);
		val_y = GM_getValue("destination_y", 1);
		route_use_stations = obj.options[obj.selectedIndex].value;
		GM_setValue("route_use_stations", ""+route_use_stations);
	} else {
		val_x = GM_getValue("destination_x", 1);
		val_y = GM_getValue("destination_y", 1);
		route_use_stations = GM_getValue("route_use_stations", 1);
	}

	// Force the types to what they should be
	val_x = parseFloat(val_x);
	val_y = parseFloat(val_y);
	route_use_stations = parseInt(route_use_stations);

	parag.innerHTML += shortest_path(val_x, val_y, route_use_stations);
	// }}}
}

// This code generates a hyperlink positon which updates the route path
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
			select_dest_x.selectedIndex = 2*dx-1;
			select_dest_y.selectedIndex = 2*dy-1;
			GM_setValue("destination_x", "" + dx);
			GM_setValue("destination_y", "" + dy);
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
		GM_setValue(gm_cookie, 1);
	} else {
		dst.style.display = 'none';
		GM_setValue(gm_cookie, 0);
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
		GM_setValue("show_num_coord", 1);
	} else {
		do_show = false;
		dst.style.display = 'none';
		GM_setValue("show_num_coord", 0);
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

	if (!GM_xmlhttpRequest) {
		outdiv.innerHTML += 'Error: GM_xmlhttpRequest not available - upgrade Greasemonkey' + r.status+'<br>';
		return;
	}
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
				result += 'A newer stable version is available.<br>';
			}
			result += 'Visit: <a href="' + user_script_homepage + '">' + user_script_homepage + '</a><br>';
			outdiv.innerHTML += result;

			GM_setValue("update_timestamp", "" + time());
		}
		});

	} catch(e) {
		outdiv.innerHTML += 'Error: an exception occured (' + e + ')<br>';
	}

	// }}}
}

// Roles
//  - Compute current location and sets it in current_x, current_y
//  - Add fixed size to the blocks TD's
//  - If show_num_coord is set, display the values in each block
// Return false in case of a failure
function do_get_current_location() {
// {{{
	var docTables = document.getElementsByTagName('table');
	var item = docTables[7];
	if (!item) {
		return false;
	}

	//item.setAttribute("id", "citymap");
	var tds = item.getElementsByTagName('td');
	if (tds.length != 9) {
		return;
	}
	var blocks_x = new Array();
	var blocks_y = new Array();

	// We search a block which shows valid coordinates
	var goodidx = -1;
	for (var i = 0; i < tds.length; ++i) {
		blocks[i] = tds[i];

		var fonts = tds[i].getElementsByTagName("font");
		var tmp = fonts[0].firstChild.nodeValue;
		tmp = tmp.replace(/\s+(\S*)/g, ' $1');
		tmp = tmp.replace(/^\s+(.*)/, '$1');
		var tmp1 = tmp.replace(/(\S+) and (\d+)\S+/, '$1');
		var tmp2 = tmp.replace(/(\S+) and (\d+)\S+/, '$2');

		if (resize_city_blocks) {
			blocks[i].setAttribute("width", city_block_w);
			blocks[i].setAttribute("height", city_block_h);
		}


		if (goodidx < 0 && tmp1 && tmp2) {
			goodidx = i;
			blocks_x[goodidx] = 2.0 * parseFloat(street_name_to_number(tmp1)) - 1.0;
			if (blocks_x[goodidx] < 0) {
				return false;
			}
			blocks_y[goodidx] = 2.0 * parseFloat(tmp2) - 1.0;
		}
	}
	if (goodidx == -1) {
		// No good block index
		return false;
	}

	blocks[4].innerHTML += '<div id="rbt_hud">rbt_hud'+goodidx+'x'+blocks_x[goodidx]+'x'+blocks_y[goodidx]+'</div>';
	//blocks[4].setAttribute("style", 'border: yellow 2px dotted;');

	// This is the adjustment tables if goodidx = 4...
	// It may be a little dirty but it works
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
	table.style.fontSize = tat_font_size;
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

	var outtab = document.getElementById('tat_panel');

	var tmpdiv;

	var prefdiv;
	prefdiv = document.createElement("div");
	prefdiv.setAttribute("id", "rbt_prefs");
	prefdiv.innerHTML += "<b>The Abyss Tuning</b> " + user_script_version + "&nbsp;";
	outtab.appendChild(prefdiv);

	button_toggle_config = document.createElement("button");
	button_toggle_config.style.border = "dotted grey 1px;";
	button_toggle_config.innerHTML = "Configuration";
	prefdiv.appendChild(button_toggle_config);

	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_config");
	tmpdiv.style.display = (show_config) ? 'block' : 'none';
	prefdiv.appendChild(tmpdiv);

		tmpdiv.innerHTML = "<hr><b>CONFIGURATION</b><br>";

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

		tmpdiv.appendChild(document.createElement("br"));

		button_toggle_num_coord = document.createElement("button");
		button_toggle_num_coord.style.border = "dotted grey 1px;";
		button_toggle_num_coord.innerHTML = "Numerical coordinates on the map";
		tmpdiv.appendChild(button_toggle_num_coord);

		tmpdiv.appendChild(document.createElement("br"));

		button_check_update = document.createElement("button");
		button_check_update.style.border = "dotted grey 1px;";
		button_check_update.innerHTML = "Check update online";
		tmpdiv.appendChild(button_check_update);

	// Just a test container
	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_test");
	outtab.appendChild(tmpdiv);

	// Just the container
	tmpdiv = document.createElement("div");
	tmpdiv.setAttribute("id", "rbt_check_update");
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
			"You are at " + streets_name[parseInt(current_x)] + " (" + current_x + ") x " + current_y +
			", where do you want to go&nbsp;?<br>";

	var tmpOption;

	// vertical streets
	var dest_x = GM_getValue("destination_x", -1);
	select_dest_x = document.createElement("select");
	select_dest_x.name = "select_dest_x";
	select_dest_x.id = "select_dest_x";
	select_dest_x.style.width = "15em";

	for (var i = 0.5; i <= 100; i+= 0.5) {
		tmpOption = document.createElement("option");
		tmpOption.setAttribute("value", i);
		if (i == parseInt(i) + 0.5) {
			tmpOption.innerHTML += streets_name[parseInt(i)] + " East (" + i + ")";
		} else {
			tmpOption.innerHTML += streets_name[parseInt(i)] + " (" + i + ")";
		}
		if (i == dest_x) {
			tmpOption.setAttribute("selected", "selected");

		}
		select_dest_x.appendChild(tmpOption);
	}
	tmpdiv.appendChild(select_dest_x);

	tmpdiv.appendChild(document.createElement("br"));

	// horizontal streets
	var dest_y = GM_getValue("destination_y", -1);
	select_dest_y = document.createElement("select");
	select_dest_y.name = "select_dest_y";
	select_dest_y.id = "select_dest_y";
	select_dest_y.style.width = "15em";

	for (var i = 0.5; i <= 100; i += 0.5) {
		tmpOption = document.createElement("option");
		tmpOption.setAttribute("value", "" + i);
		if (i == parseInt(i) + 0.5) {
			tmpOption.innerHTML += ordinal(parseInt(i)) + " South " + " (" + i + ")";
		} else {
			tmpOption.innerHTML += ordinal(parseInt(i)) + " (" + i + ")";
		}
		if (i == dest_y) {
			tmpOption.setAttribute("selected", "selected");

		}
		select_dest_y.appendChild(tmpOption);
	}
	tmpdiv.appendChild(select_dest_y);

	tmpdiv.appendChild(document.createElement("br"));

	route_use_stations = GM_getValue("route_use_stations", 1);
	select_use_stations = document.createElement("select");
	select_use_stations.name = "use_stations";
	select_use_stations.id = "use_stations";

	tmpOption = document.createElement("option");
	tmpOption.setAttribute("value", 0);
	tmpOption.innerHTML += ("Do not use stations");
	if (route_use_stations == 0) {
		tmpOption.setAttribute("selected", "selected");
	}
	select_use_stations.appendChild(tmpOption);
	tmpOption = document.createElement("option");
	tmpOption.setAttribute("value", 1);
	tmpOption.innerHTML += ("Use stations");
	if (route_use_stations == 1) {
		tmpOption.setAttribute("selected", "selected");
	}
	select_use_stations.appendChild(tmpOption);

	tmpdiv.appendChild(select_use_stations);

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

	// Bind the event listeners - for the button items
	button_toggle_config.addEventListener('click', function(event) { toggle_display(event, this); }, true);

	// BUTTONS
	for (var i = 0; i < array_object.length; ++i) {
		var tmpobj = array_object[i];
		tmpobj.toggle_button.addEventListener('click', function(event) { toggle_display(event, this); }, true);
	}

	button_toggle_extra_links.addEventListener('click', function(event) { toggle_display(event, this); }, true);
	button_toggle_route.addEventListener('click', function(event) { toggle_display(event, this); }, true);
	button_toggle_hud.addEventListener('click', function(event) { toggle_display(event, this); }, true);

	button_toggle_num_coord.addEventListener('click', function(event) { toggle_display_num_coord(event, this); }, true);

	button_check_update.addEventListener('click', function(event) { check_update(event, this); }, true);

	return true;
	// }}}
}



// =============================================================================

// --- Display customization
function customize_display_theabyss() {
// {{{

	document.body.style.margin = "0";

	if (hide_city_name) {
		var docH2s = document.getElementsByTagName('h2');
		if (docH2s.length == 1) {
			docH2s[0].style.display = 'none';
		}
	}

	var docBRs = document.getElementsByTagName('br');
	docBRs[2].style.display = 'none';
	docBRs[3].style.display = 'none';


	var docTables = document.getElementsByTagName('table');
	var item;

	// ----
	item = docTables[3];
	item.style.width = "100%;";
	//setAttribute("style", 'width: 100%; border:2px red dotted ;');
	///item.setAttribute("style", 'width: 100%; border:2px red dotted ;');

	// ----
	item = docTables[5];
	var cell0 = item.getElementsByTagName('tr')[0].firstChild.nextSibling;
	var cell1 = cell0.nextSibling.nextSibling;
	var cell2 = cell1.nextSibling.nextSibling;

	cell1.style.width='1%';
	cell2.setAttribute("valign", 'top');
	//item.setAttribute("style", 'border:2px green dotted ;');

	// ----
	item = docTables[9];

	item.innerHTML += '<div style="width: 30em; border: dotted yellow 2px; margin: 3px; font-size: 11px;" id="tat_panel"></div>';
// }}}
}

// Name must be 1 word
function add_obj(_i, _name, _title, _nearest, _dist_threshold, _places, _default) {
	array_object[_i] = {
		div_id: "rbt_" + _name,
		button_name: _name,
		name_title: _title,
		nearest: _nearest,
		dist_threshold: _dist_threshold,
		places: _places,
		cookie_name: "show_" + _name,
		cookie_default: _default,
		show: GM_getValue("show_" + _name, _default),
		toggle_button: null
	};
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
	], 1);

add_obj(1, "Bars", "BARS", 3, 50, [
	// {{{ Coordinates of 91 bars
	["Abbot's Tavern",			14.5,	33.5	],
	["Angel's Wings (Farmer's Arms)",	80.5,	45.5	],
	["Archer's Tavern",			22.5,	11.5	],
	["Baker's Tavern",			90.5,	16.5	],
	["Balmer's Tavern",			12.5,	13.5	],
	["Barker's Tavern",			28.5,	3.5	],
	["Bishop's Tavern",			32.5,	51.5	],
	["Black Sheep",				25.5,	92.5	],
	["Blinking Pixix",			67.5,	99.5	],
	["Book and Beggar",			82.5,	37.5	],
	["Booker's Tavern",			58.5,	38.5	],
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
	["Cooper's Tavern (see Two Sisters)",	49.5,	36.5	],
	["Cosy Walrus",				27.5,	32.5	],
	["Crouching Tiger",			14.5,	10.5	],
	["Crow's Nest Tavern",			72.5,	46.5	],
	["Dancer's Tavern",			52.5,	68.5	],
	["Dog House",				36.5,	6.5	],
	["Draper's Tavern",			31.5,	48.5	],
	["Drunk Cup",				99.5,	94.5	],
	["Falconer's Tavern",			47.5,	90.5	],
	["Farmer's Arms (see Angel's Wings)",	80.5,	45.5	],
	["Fiddler's Tavern",			85.5,	20.5	],
	["Fisher's Tavern",			11.5,	84.5	],
	["Five French Hens",			32.5,	68.5	],
	["Fletcher's Tavern",			88.5,	91.5	],
	["Flying Nun",				47.5,	30.5	],
	["Forester's Tavern",			88.5,	70.5	],
	["Fourty-Two, Pub",			62.5,	34.5	],
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
	["Looming Head",			78.5,	2.5	],
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
	["Severed Shadow",			45.5,	83.5	],
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
	["Two Sisters (Cooper's Tavern)",	49.5,	36.5	],
	["Vagabond's Tavern",			48.5,	5.5	],
	["Wart and Whisk",			28.5,	86.5	],
	["Weevil and Stallion",			65.5,	55.5	],
	["Whirling Dervish",			38.5,	89.5	],
	["Wild Hunt",				43.5,	11.5	]
	// }}}
	], 1);

add_obj(2, "Stations", "STATIONS", 1, 60,
	places_station, 0);

add_obj(3, "Hospitals", "HOSPITALS", 2, 100, [
	// {{{
	["Ferret-25",		11.5,	25.5	],
	["Pilchard-9",		31.5,	9.5	],
	["Killjoy-8",		72.5,	8.5	],
	["Zinc-16",		99.5,	16.5	],
	["Aardvark-35",		1.5,	35.5	],
	["Pine-26",		32.5,	26.5	],
	["Emerald-44",		59.5,	44.5	],
	["Qualms-30",		84.5,	30.5	],
	["Aardvark-55",		1.5,	55.5	],
	["Yak-68",		47.5,	68.5	],
	["Beryl-52",		53.5,	52.5	],
	["Sorrow-65",		88.5,	65.5	],
	["(0,150-50,200)???",	4242,	4242	],
	["Vulture-80",		43.5,	80.5	],
	["Ivory-82",		67.5,	82.5	],
	["Oppression-78",	80.5,	78.5	]
	// }}}
	] , 0);

add_obj(4, "Misc.", "MISC", 10, 200, [
	// {{{
	[ "Coin exchange",	62.0,	53.5	],
	[ "Forge",		44.5,	58.5	],
	[ "Halls of Seraph",	70.5,	80.5	],
	[ "Monastery [HOLY]",	14.5,	40.5	],
	[ "Pawn shop",		23.5,	12.5	],
	[ "Vivificus Abeo",	66.5,	13.5	],
	[ "Boneyard",		18.5,	55.5	],
	[ "Graveyard [HOLY]",	24.5,	49.5	]
	// }}}
	], 1);

add_obj(5, "Quests", "QUESTS", 3, 50, [
	// {{{
	["Spring Cleaning (L35)",	45.5,	85.5	],
	["Priestesses of Light (L155)",	23.5,	8.5	]
	// }}}
	], 0);


// Main loop
if (false) {
	// Do nothing
} else {
	customize_display_theabyss();
	if (!do_get_current_location()) {
		// FIXME: The page seems to be loaded twice (this may be related to how GM works)
		// - one the do_get_current_location() fails
		// - the other it suceeds
//		GM_log("do_get_current_location() failed");
	} else {
		if (!do_show_extra_info()) {
			GM_log("do_show_extra_info() failed");
		}
		if (abs(time() - latest_online_check) > online_check_period) {
			check_update(null, null);
		}
	}
}


//////////////////////////////////////////////////////////////////////////////
// EXPERIMENTAL FEATURES - ENABLE WITH CAUTION

// {{{
// TEST: Map feature
if (false) {
	var mapdiv = document.createElement("div");
	mapdiv.setAttribute("id", "test_map");
	mapdiv.setAttribute("style", 'position:relative; top: 0px; left:0px; width: 200px; height:200px; border-style: solid; border-width: 3px; border-color: #00F; background-image: url(http://localhost:8080/200x200.png); ');

	function put_div(x, y, size, color) {
		var tmpdiv2  = document.createElement("div");
		var halfsize = parseInt(size) / 2;
		tmpdiv2.setAttribute("style", 'position:absolute; top:' + (parseInt(2 * y) - halfsize)+'px; left:' + (parseInt(2 * x) - halfsize) + 'px; background-color: ' + color + '; width:' + size + 'px; height: ' + size + 'px;');
		mapdiv.appendChild(tmpdiv2);
	}

	var junk = [
			[places_station, '#770']
		];
	for (var j = 0; j < junk.length; ++j) {
		var color = junk[j][1];
		var places = junk[j][0];
		for (var i = 0; i < places.length; ++i) {
			put_div(places[i][1], places[i][2], 4, color);
		}
	}

	put_div(current_x, current_y, 7, '#F00');
	var dest_x = parseFloat(GM_getValue("destination_x",1));
	var dest_y = parseFloat(GM_getValue("destination_y",1));
	put_div(dest_x, dest_y, 7, '#00F');

//	for (var dx = min(dest_x, current_x) ; dx <= max(dest_x, current_x); dx += 10) {
//		for (var dy=min(dest_y, current_y); dy <= max(dest_y, current_y); dy += 10) {
//			put_div(dx, dy, 3,  '#F0F');
//		}
//	}
	document.getElementById("rbt_test").appendChild(mapdiv);

}


// }}}

// }}} ===================== CODE =====================

