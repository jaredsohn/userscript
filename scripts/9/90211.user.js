/** @preserve
// ==UserScript==
// @name           Xhodon AddOn
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @namespace      Xhodon
// @description    Addon for Xhodon
// @author         Friedrich Pülz
// @email          fpuelz@gmx.de
// @license        GPL v2
// @include        http://*.xhodon*.*.php*
// @exclude        http://forum.xhodon.*
// @exclude        http://wikide.xhodon.de/*
// @version        0.3.11
// @history        0.3.11       06/08/2012: Support for unicorn world, support for different tick lengts, add variables for the different servers, currently with a name and tick length for each server, highlight error messages in the debug HTML element (bold and red), if enabled.
// @history        0.3.10       06/14/2011: Better guard rating for guard level >= 6 for the centaur world, removed attack values for guards because guards don't attack, new limits for guard rating strings ("Verluste" and "Hohe Verluste" now gets displayed until a rating of 1000% / 3000% respectively, old limits were 500% / 1000%).
// @history        0.3.9 	06/14/2011: Completed power stone prices for unit revival in the shaman hut for the centaur and giant world (still TODO for the troll and fairy worlds).
// @history        0.3.8 	04/09/2011: Unit and guard values for the giant world (for unit tooltips, guard victory rating).
// @history        0.3.7 	04/08/2011: Updated resource calculation routine to new xhodon layout.
// @history        0.3.6 	03/26/2011: Add guard unit values and average guard values per level for troll.
// @history        0.3.5 	03/24/2011: More guard rating string ("losses" & "high losses") in guard info, add unit values for troll units (thanks to Andreas), fix failing when trying to parse empty JSON, added the elv magicians to the unit list (eg. for tooltips), use jQuery 1.5.1 instead of 1.3.2 (solves problems with the tooltips in Firefox 4 + better performance, may only work with the Scriptish Addon instead of Greasemonkey)
// @history        0.3.4 	11/25/2010: Provide different styles for unit tooltips and guard info, Store hero attributes and other data seperately for each world, allow to store settings only for the current world, different unit/guard values for each world, Changes from 'nigroangelus': Values for all guard units, values for units/guards in the fairy world, besser guard info style
// @history        0.3.3 	11/24/2010: The browser title can now be changed, using ext. script for update checking, now using GM_getValue/GM_setValue to store settings, more unit tooltip options
// @history        0.3.2 	11/22/2010: AddOn settings are now available in the profile page through a new button under "Account settings", new values for the shaman hut (unicorns, storm faries).
// @history        0.3.1 	11/20/2010: Nicer AddOn settings with tooltips, new unit values for the shaman hut (axe swinging dwarfs, double axe dwarfs, elven archer), formatted tick countdown.
// @history        0.3 		11/19/2010: Addon settings can now be stored in a cookie, at the top left corner an "add-on" button is added, each feature can be enabled/disabled separately.
// @history        0.2 		11/19/2010: Separate total values for units of the hero / in the cave and units in the palace, unit tooltips now additionaly display values of a single unit, in the "load hero" page the points are no longer added for all units (only in the tooltip), the script now doesn't not run sometimes any longer.
// @history        0.1.1	11/12/2010: Several optimizations (~6 times faster) + compiled with Google Closure Compiler.
// @history        0.1		11/11/2010: Initial version.
// ==/UserScript==
*/

/** Whether to print debug messages or not.
 * @define {boolean} */
var debug_mode = false;
var nice_debug = false;

/** Print a debug message on the console. Does nothing if debug_mode is false.
  * @private */
var debug = (debug_mode && console && typeof(console.log) == 'function')
    ? function(text) { console.log(text); }
    : function(text) { /*Do nothing*/ };
var debugError = (debug_mode && console && typeof(console.log) == 'function')
    ? function(text) { console.error(text); }
    : function(text) { /*Do nothing*/ };

if ( debug_mode && nice_debug ) {
    $("body").append("<div id='addon_running'>" +
                        "<div id='hideDebugMsg'>Debug-Nachrichten Verbergen</div>" +
                        "AddOn läuft...<br /></div>" +
                        "<div id='showDebugMsg'>Debug-Nachrichten Anzeigen</div>");
    $("#hideDebugMsg").css({'background-color': '#c0c0c0', color: 'blue', cursor: 'pointer'});
    addon_running = $("#addon_running");
    addon_running.css({position: "fixed", 'z-index': 99999, opacity: 0.8,
                    left: "0px", top: "0px", /*display: "none",*/
                    'background-color': "white", padding: "5px",
                    border: "1px solid gray",
                    '-moz-border-radius-bottomright': "5px",
                    '-webkit-border-bottom-right-radius': "5px",
                'border-bottom-right-radius': "5px"});
    $("#showDebugMsg").css({position: "fixed", 'z-index': 99999, opacity: 0.6, 'font-size': 'small',
                    left: "0px", top: "0px", display: "none", color: 'blue',
                    'background-color': "white", padding: "1px",
                    border: "1px solid gray", cursor: 'pointer',
                    '-moz-border-radius-bottomright': "5px",
                    '-webkit-border-bottom-right-radius': "5px",
                    'border-bottom-right-radius': "5px"});

    $("#hideDebugMsg").click( function(){ addon_running.slideUp();
                    $("#hideDebugMsg").slideUp(); $("#showDebugMsg").slideDown(); } );
    $("#showDebugMsg").click( function(){ addon_running.slideDown();
                    $("#hideDebugMsg").slideDown(); $("#showDebugMsg").slideUp(); } );

    debug = debug_mode
	? function(text) {
//             if ( typeof(console) != 'undefined' && typeof(console.log) == 'function' ) console.log(text);
            addon_running.append(text + "<br />")/*.show()*/; }
	: function(text) { /*Do nothing*/ };

        debugError = debug_mode
        ? function(text) {
            //             if ( typeof(console) != 'undefined' && typeof(console.log) == 'function' ) console.log(text);
            addon_running.append("<span style='color:red; font-weight:bold;'>" + text + "</span><br />")/*.show()*/; }
            : function(text) { /*Do nothing*/ };
}

debug("Fietators Xhodon-Script");

// if ( typeof(GM_getValue) != 'function' ) {
//     debug("No GM_getValue function found");
//     GM_getValue = function(arg1, arg2) {};
// }
// if ( typeof(GM_setValue) != 'function' ) {
//     debug("No GM_setValue function found");
//     GM_setValue = function(arg1, arg2) {};
// }

// Default settings for all xhodon worlds
var settings = {
	global: true, // Whether or not these settings are global to all worlds
				  // or specific for the current one

	guard_info: true, // Show guard info elements
	shaman: true, // Add elements to the shaman hut

	unit_tooltips: true, // Add unit tooltips
	ut_strength_weakness: true, // Show strength/weakness info in unit tooltips
	ut_title: true, // Show a title with a unit image for each unit tooltip
	ut_speed: true, // Show unit speed in unit tooltips

	ut_style: "default", // Style to be used by unit tooltips
	gi_style: "default", // Style to be used by the guard info

	unit_totals: true, // Add total points and a tooltip with total unit values
	res_calc: true, // Add calculated values to resource building pages
	format_tick: true, // Formats the tick countdown accordingly to it's value
	update_layout: true, // Improve the layout at some points
	hide_h_scrollbar: true, // Hide horizontal scrollbar
	change_title: "Xhodon - %BUILD_COUNTDOWN", // To change the browser title, false to not do anything
	dont_block: 0 // Call AddOn functions after page has loaded or not
		// (0: call all functions directly, 1: call some directly, 2: no blocking calls)
};
// Initial data object, stored using GM_setValue, seperately for each xhodon world
var data = {
	hero_attributes: {}, // Stores hero attributes (one object for each hero)
	settings: {} // Special settings for this world can be stored here TODO
};

var cur_hero_attr = { attack: 0, defense: 0, live: 0 };
var server = "";

// A list of all available unit names.
var unit_list = ["unicorn", "dragon_egg", "goblin", "icewarrior", "powerchild",
				 "hysterical_centauress", "warriorpriest", "wild_centaur",
				 "axe_swinging_dwarf", "elven_archer", "doubleaxe_dwarf",
				 "singing_halfgiant", "stone_throwing_troll", "treegiant",
				 "fire_fay", "storm_faerie", "elv_magican" ];

// These are the server names for germany
var centaurServer = { name: "zentauren", tick: 5 };
var giantServer = { name: "riesen", tick: 5 };
var fairyServer = { name: "feen", tick: 5 };
var unicornServer = { name: "einhorn", tick: 1 };
var warriorServer = { name: "krieger", tick: 4 };
var trollServer = { name: "troll", tick: 5 };


/**************************************************/
/*** Get current server (zentauren, feen, ... ) ***/
/**************************************************/
var getServerName = function() {
    var re = /http:\/\/([^\.]*)\.xhodon.*/;
    var res = re.exec( document.location );
    return res && res.length > 1 ? res[1] : "";
};
var server = {
    name: "unknown", // Server name
    tick: 0          // Tick length in minutes
};
switch ( getServerName() ) {
    case centaurServer.name:
        server = centaurServer;
        break;
    case unicornServer.name:
        server = unicornServer;
        break;
    case warriorServer.name:
        server = warriorServer;
        break;
    case fairyServer.name:
        server = fairyServer;
        break;
    case giantServer.name:
        server = giantServer;
        break;
    case trollServer.name:
        server = trollServer;
        break;
    default:
        debugError( "Unknown server: " + getServerName() );
        break;
}

/** Collection of xhodon element selectors (jQuery style).
  * @private
  * @const */
var items = {
	// Matches each resource including an image with a link and the resource count
	res: "#palace_resources td",

	// Matches all occurences of units (in the shaman hut,
	// the hero unit transfer, unit buildings, secret cave ...)
	units: "#transfer_hero_units #transfer_table tr td a, " +
		"#transfer_cave #transfer_table tr td a, " +
		"#current_units_production #current_unit_prduction table tbody tr td div, " +
		"#units_build_list form .pngfix",

	// Multiple items with id "#transfer_table"!
	transfer_left: "#transfer_hero_units #transfer_table .top .gray_first, " +
		"#transfer_cave #transfer_table .top .gray_first",
	transfer_right: "#transfer_hero_units #transfer_table .top .gray_last, " +
		"#transfer_cave #transfer_table .top .gray_last",
	hero_transfer_middle: "#transfer_hero_units #transfer_table .top .gray_middle",
	hero_transfer_top: "#transfer_hero_units #transfer_table .top",
	hero_transfer_mtop: "#transfer_hero_resources #transfer_table .top",

	// Shaman hut selectors
	shaman_test: ".mushrooms", // Exists only if the shaman hut is shown
	shaman_remaining: ".mushrooms tbody .top .white_middle",
	shaman_perTickRows: ".mushrooms tbody .brdTop",
	shaman_perTickRow: ".mushrooms tbody .brdTop:first",
	shaman_perTick: ".mushrooms tbody .brdTop:first .white_last",
	shaman_limit: ".mushrooms tbody .btm .white_last",

	// Gets tags containing the attribute name followed by ": "
	// and the attribute value
	hero_attributes: ".upgrade .upgradeBtns strong",

	// Elements which contain text nodes with end times ("hh:mm:00")
	end_time_containers: "#hero_info, #sidebar",

	// The last button in the profile page,
	// after which a button to access the AddOn settings gets placed
	profile_account_buttons: "#sidebar .button"
};

var new_items = {
	profile_buttons_spacer: "<table class='spacer'><tbody><tr><td></td></tr></tbody></table>",
	button: function(id, text, onclick){
		return "<li class='button small' id='" + id + "'><a onclick='" + onclick + "' " +
				"href='#' class='first'>" + text + "</a></li>"
	}
};

var page = { name: false };

// A jQuery plugin that adds toJSON and parseJSON functions
(function ($) {
    var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        s = {
            'array': function (x) {
                var a = ['['], b, f, i, l = x.length, v;
                for (i = 0; i < l; i += 1) {
                    v = x[i];
                    f = s[typeof v];
                    if (f) {
                        v = f(v);
                        if (typeof v == 'string') {
                            if (b) {
                                a[a.length] = ',';
                            }
                            a[a.length] = v;
                            b = true;
                        }
                    }
                }
                a[a.length] = ']';
                return a.join('');
            },
            'boolean': function (x) {
                return String(x);
            },
            'null': function (x) {
                return "null";
            },
            'number': function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            'object': function (x) {
                if (x) {
                    if (x instanceof Array) {
                        return s.array(x);
                    }
                    var a = ['{'], b, f, i, v;
                    for (i in x) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == 'string') {
                                if (b) {
                                    a[a.length] = ',';
                                }
                                a.push(s.string(i), ':', v);
                                b = true;
                            }
                        }
                    }
                    a[a.length] = '}';
                    return a.join('');
                }
                return 'null';
            },
            'string': function (x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            }
        };

	$.toJSON = function(v) {
		var f = isNaN(v) ? s[typeof v] : s['number'];
		if (f) return f(v);
	};

	$.parseJSON = function(v, safe) {
		if ( safe === undefined ) safe = $.parseJSON.safe;
		if ( safe && !/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(v))
			return undefined;
	    if ( v === undefined || v.length == 0 )
			return safe;
		return eval('('+v+')');
	};

	$.parseJSON.safe = false;

})(jQuery);

/** Collection of functions that parse xhodon-HTML-pages.
  * @private
  * @const */
var parse = {
	// Get resources in the current palace
	resources : function() {
		var res = { essences: 0, crystals: 0, powerStones: 0, gold: 0, mana: 0 };
		$(items.res).each(function(i){
			var item = $(this);
			var count = parseInt( item.text().replace(/\./g, '') );
			if ( i == 0 ) {
				res.essences += count;
			} else if ( i == 1 ) {
				res.crystals += count;
			} else if ( i == 2 ) {
				res.powerStones += count;
			} else if ( i == 3 ) {
				res.gold += count;
			} else if ( i == 4 ) {
				res.mana += count;
			}
		});
		return res;
	},

	currentHeroAttributes : function() {
		var hero_name = parse.heroName();
// 		var hero_name_parse = parse.heroAttributes();
// 		if ( hero_name != hero_name_parse ) {
// 			return ;
// 		}

		var ret = data.hero_attributes[hero_name];

		// Compute live bonus from hero attribute
// 		var live_bonus = Math.floor( totalValues.live * cur_hero_attr.live * 0.02 );

		return ret;
	},
	// Returns the name of the current hero
	heroName : function() {
		return $("#hero_name").text();
	},
	// Parses hero attributes and stores them to data.hero_attributes[hero_name]
	heroAttributes : function() {
		var hero_name = parse.heroName();
		if ( typeof(data.hero_attributes[hero_name]) == 'undefined' ) {
                        debugError("Hero data not found ('" + hero_name + "')");
			data.hero_attributes[hero_name] = { attack: 0, defense: 0, live: 0 };
		}

		var i = 0;
		$(items.hero_attributes).each(function(){
			var text = $(this).text();
			var pos = text.indexOf(":");
			if ( pos == -1 ) {
                                debugError("No hero attribute found in '" + text + "'");
				return;
			}

			var attribute = text.substring(0, pos);
			var value = parseInt( text.substring(pos + 1) );
			if ( isNaN(value) ) {
				if ( attribute != "Attribute" ) {
                                    debugError("Hero attribute value couldn't be parsed in '" + text + "'");
				}
				return;
			}

			switch ( attribute ) {
			case "Attribute":
				// Do nothing
				return;
			case "Angriff":
				data.hero_attributes[hero_name].attack = value;
				break;
			case "Verteidigung":
				data.hero_attributes[hero_name].defense = value;
				break;
			case "Leben":
				data.hero_attributes[hero_name].live = value;
				break;
			default:
                                debugError("Unknown attribute name: " + attribute);
				return;
			}
			++i;
		});

		return i == 3 ? hero_name : false;
	},
	// Gets values from the shaman hut
	shamanValues : function() {
		return { remaining: parseInt($(items.shaman_remaining).text()),
				 perTick: parseInt($(items.shaman_perTick).text()),
				 limit: parseInt($(items.shaman_limit).text()) };
	}
};

/** Collection of functions that return constant xhodon values (or with a factor).
  * @private
  * @const */
var xvalues = {
	// Approximate values of a guard of the given guard_level
	guardValues : function( guard_level ) {
		switch ( server.name ) {
		case centaurServer.name:
                case giantServer.name:
                case unicornServer.name: // TEST
			switch ( guard_level ) {
			case 1: return { defense:      25, live:      170, unicorns:     8 };
			case 2: return { defense:     185, live:     1400, unicorns:    50 };
			case 3: return { defense:    1100, live:     8500, unicorns:   250 };
			case 4: return { defense:   12000, live:   100000, unicorns:   800 };
			case 5: return { defense:  125000, live:  1000000, unicorns:  5000 };
			case 6: return { defense: 1250000, live: 10000000, unicorns: 50000 };
                        default: {
                            // guard_level >= 7
                            var goblins = 12 * Math.pow( 10, guard_level - 1 );
                            var unicorns = 5 * Math.pow( 10, guard_level - 2 );
                            return { defense: goblins, live: 8 * goblins, unicorns: unicorns };
                        }
			}

                case fairyServer.name:
			switch (guard_level) {
			case 1: return { defense:      30, live:      750, unicorns:    8 };
			case 2: return { defense:     400, live:    10000, unicorns:   50 };
			case 3: return { defense:    5000, live:   125000, unicorns:  250 };
			case 4: return { defense:  130000, live:  3250000, unicorns:  800 };
			case 5: return { defense: 2000000, live: 50000000, unicorns: 3500 };
			}
			break;

                case trollServer.name:
			switch (guard_level) {
			case 1: return { defense:           52, live:          150, unicorns:      10 };
			case 2: return { defense:          330, live:         1500, unicorns:      60 };
			case 3: return { defense:         2900, live:        14000, unicorns:     600 };
			case 4: return { defense:        27000, live:       105000, unicorns:    3000 };
			case 5: return { defense:       171000, live:       660000, unicorns:   30000 };
			case 6: return { defense:       950000, live:      2750000, unicorns:  150000 };
			case 7: return { defense:      3200000, live:     10500000, unicorns:  300000 };
			case 8: return { defense:      7900000, live:     35200000, unicorns:  500000 };
			case 9: return { defense:     16000000, live:     77100000, unicorns: 1500000 };
			case 10: return { defense:   107000000, live:    455000000, unicorns: 2500000 };
			case 11: return { defense:   365000000, live:   1550000000, unicorns: 5500000 };
			case 12: return { defense:  1750000000, live:   8300000000, unicorns: 9999999 };
			case 13: return { defense: 11610000000, live:  58650000000, unicorns: 9999999 };
			case 14: return { defense: 74000000000, live: 336000000000, unicorns: 9999999 };
			}
			break;

		default:
                        debugError("Server not known: '" + server + "'");
			return { defense: 999999999, live: 99999999999, unicorns: 99999 };
		}
	},
	// Get unit values from the given unit_name
	baseUnitValues : function( unit_name ) {
		switch ( server.name ) {
                    case unicornServer.name:
                        // All revive values are TODO, except for unicorn values
                        switch ( unit_name ) {
                            case "unicorn":
                                return { id: unit_name, name: 'Einhornwagen', attack: 0, defense: 0, live: 20, speed: 2, points: 35,
                                          reviveMushrooms: 25, revivePowerStones: 1000 };
                            case "dragon_egg":
                                return { id: unit_name, name: 'Dracheneier', attack: 1, defense: 1, live: 80, speed: 20, points: 2251,
                                          reviveMushrooms: 3000, revivePowerStones: /*TODO*/0 };
                            case "goblin":
                                return { id: unit_name, name: 'Kobolde', attack: 1, defense: 1, live: 25, speed: 5, points: 5,
                                          reviveMushrooms: 3, revivePowerStones: 120 };
                            case "icewarrior":
                                return { id: unit_name, name: 'Eiskrieger', attack: 2, defense: 3, live: 50, speed: 5, points: 10,
                                          reviveMushrooms: 5, revivePowerStones: 200 };
                            case "powerchild":
                                return { id: unit_name, name: 'Kinder der Macht', attack: 3, defense: 3, live: 15, speed: 5, points: 6,
                                          reviveMushrooms: 3, revivePowerStones: 120 };
                            case "hysterical_centauress":
                                return { id: unit_name, name: 'Hysterische Zentaurinnen', attack: 4, defense: 4, live: 19, speed: 3, points: 12,
                                          reviveMushrooms: 7, revivePowerStones: 280 };
                            case "warriorpriest":
                                return { id: unit_name, name: 'Kriegerpriester', attack: 4, defense: 4, live: 65, speed: 4, points: 19,
                                          reviveMushrooms: 10, revivePowerStones:  400 };
                            case "wild_centaur":
                                return { id: unit_name, name: 'Wilde Zentauren', attack: 9, defense: 8, live: 31, speed: 3, points: 23,
                                          reviveMushrooms: 13, revivePowerStones:  520 };
                            case "axe_swinging_dwarf":
                                return { id: unit_name, name: 'Axtschwingende Zwerge', attack: 6, defense: 7, live: 120, speed: 4, points: 35,
                                          reviveMushrooms: 19, revivePowerStones: 760 };
                            case "elven_archer":
                                return { id: unit_name, name: 'Elfenbogenschützen', attack: 17, defense: 19, live: 64, speed: 4, points: 40,
                                          reviveMushrooms: 21, revivePowerStones: 840 };
                            case "doubleaxe_dwarf":
                                return { id: unit_name, name: 'Doppelaxtzwerge', attack: 10, defense: 9, live: 182, speed: 5, points: 49,
                                          reviveMushrooms: 25, revivePowerStones: 1000 };
                            case "singing_halfgiant":
                                return { id: unit_name, name: 'Singende Halbriesen', attack: 16, defense: 17, live: 336, speed: 3, points: 105,
                                          reviveMushrooms: 58, revivePowerStones: 2320 };
                            case "stone_throwing_troll":
                                return { id: unit_name, name: 'Steinwerfende Bergtrolle', attack: 34, defense: 31, live: 650, speed: 5, points: 154,
                                          reviveMushrooms: 81, revivePowerStones: 3240 };
                            case "treegiant":
                                return { id: unit_name, name: 'Baumriese', attack: 38, defense: 38, live: 144, speed: 5, points: 77,
                                         reviveMushrooms: 42, revivePowerStones: 1680 };
                            case "elv_magican":
                                return { id: unit_name, name: 'Elfenmagier', attack: 47, defense: 47, live: 163, speed: 3, points: 122,
                                          reviveMushrooms: 65, revivePowerStones: 2600 };
                            case "fire_fay":
                                return { id: unit_name, name: 'Feuerfeen', attack: 19, defense: 19, live: 23, speed: 3, points: 30,
                                         reviveMushrooms: 19, revivePowerStones: 760 };
                            case "storm_faerie":
                                return { id: unit_name, name: 'Sturmfeen', attack: 1, defense: 8, live: 65, speed: 2, points: 33,
                                          reviveMushrooms: 20, revivePowerStones: 800 };
                            default:
                                return {};
                        }
                        break;

                case centaurServer.name:
                case giantServer.name:
			switch ( unit_name ) {
			case "unicorn":
				return { id: unit_name, name: 'Einhornwagen', attack: 0, defense: 0, live: 20, speed: 2, points: 7,
					reviveMushrooms: 3, revivePowerStones: 120 };
			case "dragon_egg":
				return { id: unit_name, name: 'Dracheneier', attack: 1, defense: 1, live: 80, speed: 5, points: 2251,
					reviveMushrooms: 3000, revivePowerStones: /*TODO*/0 };
			case "goblin":
				return { id: unit_name, name: 'Kobolde', attack: 1, defense: 1, live: 25, speed: 4, points: 5,
					reviveMushrooms: 3, revivePowerStones: 120 };
			case "icewarrior":
				return { id: unit_name, name: 'Eiskrieger', attack: 2, defense: 3, live: 50, speed: 5, points: 10,
					reviveMushrooms: 5, revivePowerStones: 200 };
			case "powerchild":
				return { id: unit_name, name: 'Kinder der Macht', attack: 3, defense: 3, live: 15, speed: 5, points: 6,
					reviveMushrooms: 3, revivePowerStones: 120 };
			case "hysterical_centauress":
				return { id: unit_name, name: 'Hysterische Zentaurinnen', attack: 4, defense: 4, live: 19, speed: 3, points: 11,
					reviveMushrooms: 7, revivePowerStones: 280 };
			case "warriorpriest":
				return { id: unit_name, name: 'Kriegerpriester', attack: 4, defense: 4, live: 65, speed: 4, points: 17,
					reviveMushrooms: 10, revivePowerStones:  400 };
			case "wild_centaur":
				return { id: unit_name, name: 'Wilde Zentauren', attack: 9, defense: 8, live: 31, speed: 3, points: 21,
					reviveMushrooms: 13, revivePowerStones:  520 };
			case "axe_swinging_dwarf":
				return { id: unit_name, name: 'Axtschwingende Zwerge', attack: 6, defense: 7, live: 120, speed: 4, points: 32,
					reviveMushrooms: 19, revivePowerStones: 760 };
			case "elven_archer":
				return { id: unit_name, name: 'Elfenbogenschützen', attack: 15, defense: 17, live: 58, speed: 4, points: 36,
					reviveMushrooms: 21, revivePowerStones: 840 };
			case "doubleaxe_dwarf":
				return { id: unit_name, name: 'Doppelaxtzwerge', attack: 9, defense: 8, live: 165, speed: 5, points: 43,
					reviveMushrooms: 25, revivePowerStones: 1000 };
			case "singing_halfgiant":
				return { id: unit_name, name: 'Singende Halbriesen', attack: 13, defense: 14, live: 280, speed: 3, points: 96,
					reviveMushrooms: 58, revivePowerStones: 2320 };
			case "stone_throwing_troll":
				return { id: unit_name, name: 'Steinwerfende Bergtrolle', attack: 26, defense: 24, live: 500, speed: 5, points: 135,
					reviveMushrooms: 81, revivePowerStones: 3240 };
			case "treegiant":
				return { id: unit_name, name: 'Baumriese', attack: 32, defense: 32, live: 120, speed: 5, points: 70,
					reviveMushrooms: 42, revivePowerStones: 1680 };
			case "elv_magican":
				return { id: unit_name, name: 'Elfenmagier', attack: 36, defense: 36, live: 125, speed: 3, points: 108,
					reviveMushrooms: 65, revivePowerStones: 2600 };
			case "fire_fay":
				return { id: unit_name, name: 'Feuerfeen', attack: 19, defense: 19, live: 23, speed: 3, points: 30,
					reviveMushrooms: 19, revivePowerStones: 760 };
			case "storm_faerie":
				return { id: unit_name, name: 'Sturmfeen', attack: 1, defense: 8, live: 65, speed: 2, points: 33,
					reviveMushrooms: 20, revivePowerStones: 800 };
		// 	case "default": // Wächter
			default:
				return {};
			}
			break;

                case fairyServer.name:
			switch ( unit_name ) {
			case "unicorn":
				return { id: unit_name, name: 'Einhornwagen', attack: 0, defense: 0, live: 20, speed: 2, points: 7, reviveMushrooms: 3, revivePowerStones: 120 };
			case "dragon_egg":
				return { id: unit_name, name: 'Dracheneier', attack: 1, defense: 1, live: 80, speed: 4, points: 2251, reviveMushrooms: 3000, revivePowerStones: /*TODO*/0 };
			case "goblin":
				return { id: unit_name, name: 'Kobolde', attack: 1, defense: 1, live: 25, speed: 4, points: 5, reviveMushrooms: 3, revivePowerStones: 120 };
			case "icewarrior":
				return { id: unit_name, name: 'Eiskrieger', attack: 2, defense: 3, live: 50, speed: 4, points: 10, reviveMushrooms: 5, revivePowerStones: 200 };
			case "powerchild":
				return { id: unit_name, name: 'Kinder der Macht', attack: 3, defense: 3, live: 15, speed: 4, points: 6, reviveMushrooms: 3, revivePowerStones: 120 };
			case "hysterical_centauress":
				return { id: unit_name, name: 'Hysterische Zentaurinnen', attack: 4, defense: 4, live: 19, speed: 2, points: 12, reviveMushrooms: 7, revivePowerStones: 280 };
			case "warriorpriest":
				return { id: unit_name, name: 'Kriegerpriester', attack: 4, defense: 4, live: 65, speed: 3, points: 19, reviveMushrooms: 10, revivePowerStones:  400 };
			case "wild_centaur":
				return { id: unit_name, name: 'Wilde Zentauren', attack: 9, defense: 8, live: 31, speed: 2, points: 23, reviveMushrooms: 13, revivePowerStones:  520 };
			case "axe_swinging_dwarf":
				return { id: unit_name, name: 'Axtschwingende Zwerge', attack: 6, defense: 7, live: 120, speed: 3, points: 35, reviveMushrooms: 19, revivePowerStones: 760 };
			case "elven_archer":
				return { id: unit_name, name: 'Elfenbogenschützen', attack: 17, defense: 19, live: 64, speed: 3, points: 40, reviveMushrooms: 21, revivePowerStones: 840 };
			case "doubleaxe_dwarf":
				return { id: unit_name, name: 'Doppelaxtzwerge', attack: 10, defense: 9, live: 182, speed: 4, points: 49, reviveMushrooms: 25, revivePowerStones: 1000 };
			case "singing_halfgiant":
				return { id: unit_name, name: 'Singende Halbriesen', attack: 16, defense: 17, live: 336, speed: 2, points: 105, reviveMushrooms: 58, revivePowerStones: /*TODO*/0 };
			case "stone_throwing_troll":
				return { id: unit_name, name: 'Steinwerfende Bergtrolle', attack: 34, defense: 31, live: 650, speed: 4, points: 154, reviveMushrooms: 81, revivePowerStones: /*TODO*/0 };
			case "treegiant":
				return { id: unit_name, name: 'Baumriese', attack: 38, defense: 38, live: 144, speed: 4, points: 77, reviveMushrooms: 42, revivePowerStones: /*TODO*/0 };
			case "elv_magican":
				return { id: unit_name, name: 'Elfenmagier', attack: 47, defense: 47, live: 163, speed: 2, points: 122, reviveMushrooms: 65, revivePowerStones: /*TODO*/0 };
			case "fire_fay":
				return { id: unit_name, name: 'Feuerfeen', attack: 19, defense: 19, live: 23, speed: 2, points: 30, reviveMushrooms: 19, revivePowerStones: /*TODO*/0 };
			case "storm_faerie":
				return { id: unit_name, name: 'Sturmfeen', attack: 1, defense: 8, live: 65, speed: 1, points: 33, reviveMushrooms: 20, revivePowerStones: 800 };
		//  case "default": // Wächter
			default:
				return {};
			}

			break;
                case trollServer.name:
			switch (unit_name) {
			case "unicorn":
				return { id: unit_name, attack: 0, defense: 0, live: 20, speed: 2, points: 7, reviveMushrooms: 3, revivePowerStones: 120, name: 'Einhornwagen' };
			case "dragon_egg":
				return { id: unit_name, attack: 1, defense: 1, live: 80, speed: 5, points: 2251, reviveMushrooms: 3000, revivePowerStones: 120000, name: 'Dracheneier' };
			case "goblin":
				return { id: unit_name, attack: 1, defense: 1, live: 25, speed: 4, points: 5, reviveMushrooms: 3, revivePowerStones: 120, name: 'Kobolde' };
			case "icewarrior":
				return { id: unit_name, attack: 2, defense: 3, live: 50, speed: 5, points: 10, reviveMushrooms: 5, revivePowerStones: 200, name: 'Eiskrieger' };
			case "powerchild":
				return { id: unit_name, attack: 3, defense: 3, live: 15, speed: 5, points: 6, reviveMushrooms: 3, revivePowerStones: 120, name: 'Kinder der Macht' };
			case "hysterical_centauress":
				return { id: unit_name, attack: 4, defense: 4, live: 19, speed: 3, points: 11, reviveMushrooms: 7, revivePowerStones: 280, name: 'Hysterische Zentaurinnen' };
			case "warriorpriest":
				return { id: unit_name, attack: 4, defense: 4, live: 65, speed: 4, points: 17, reviveMushrooms: 10, revivePowerStones: 400, name: 'Kriegerpriester' };
			case "wild_centaur":
				return { id: unit_name, attack: 9, defense: 8, live: 31, speed: 3, points: 21, reviveMushrooms: 13, revivePowerStones: 520, name: 'Wilde Zentauren' };
			case "axe_swinging_dwarf":
				return { id: unit_name, attack: 6, defense: 7, live: 120, speed: 4, points: 32, reviveMushrooms: 19, revivePowerStones: 760, name: 'Axtschwingende Zwerge' };
			case "elven_archer":
				return { id: unit_name, attack: 15, defense: 17, live: 58, speed: 4, points: 36, reviveMushrooms: 21, revivePowerStones: 840, name: 'Elfenbogenschützen' };
			case "doubleaxe_dwarf":
				return { id: unit_name, attack: 9, defense: 8, live: 165, speed: 5, points: 43, reviveMushrooms: 25, revivePowerStones: 1000, name: 'Doppelaxtzwerge' };
			case "singing_halfgiant":
				return { id: unit_name, attack: 13, defense: 14, live: 280, speed: 3, points: 96, reviveMushrooms: 58, revivePowerStones: /*TODO*/0, name: 'Singende Halbriesen' };
			case "stone_throwing_troll":
				return { id: unit_name, attack: 26, defense: 24, live: 500, speed: 5, points: 135, reviveMushrooms: 81, revivePowerStones: /*TODO*/0, name: 'Steinwerfende Bergtrolle' };
			case "treegiant":
				return { id: unit_name, attack: 32, defense: 32, live: 120, speed: 5, points: 70, reviveMushrooms: 42, revivePowerStones: /*TODO*/0, name: 'Baumriese' };
			case "elv_magican":
				return { id: unit_name, attack: 36, defense: 36, live: 125, speed: 3, points: 108, reviveMushrooms: 65, revivePowerStones: /*TODO*/0, name: 'Elfenmagier' };
			case "fire_fay":
				return { id: unit_name, attack: 19, defense: 19, live: 23, speed: 3, points: 30, reviveMushrooms: 19, revivePowerStones: /*TODO*/0, name: 'Feuerfeen' };
			case "storm_faerie":
				return { id: unit_name, attack: 1, defense: 8, live: 65, speed: 2, points: 33, reviveMushrooms: 20, revivePowerStones: 800, name: 'Sturmfeen' };
			default:
				return {};
		    }
		    break;

		default:
			debugError("Unknown xhodon server: '" + server.name + "'");
		}
	},
	// Get unit values and strength/weakness information from the given unit_name
	unitInfosByName : function( unit_name ) {
		switch ( unit_name ) {
		case "unicorn":
			return xvalues.baseUnitValues(unit_name);
		case "dragon_egg":
			return xvalues.baseUnitValues(unit_name);
		case "goblin":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('fire_fay',"4fach", 'stone_throwing_troll',"2fach"),
					weakness: xhodon.unitAddInfo('icewarrior', "2fach", 'hysterical_centauress', "4fach") });
		case "icewarrior":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('elv_magican',"4fach", 'goblin',"2fach") +
						xhodon.unitImageAndText('default',"1/9&nbsp;von&nbsp;Midgardschlangen"),
					weakness: xhodon.unitAddInfo('warriorpriest', "2fach", 'fire_fay', "4fach") });
		case "powerchild":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('stone_throwing_troll',"4fach", 'fire_fay',"2fach") +
						xhodon.unitImageAndText('default',"1/6&nbsp;von&nbsp;Midgardschlangen"),
					weakness: xhodon.unitAddInfo('hysterical_centauress', "2fach", 'warriorpriest', "4fach") });
		case "hysterical_centauress":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('goblin',"4fach", 'powerchild',"2fach") +
						xhodon.unitImageAndText('default',"1/6&nbsp;von&nbsp;Feuerteufel"),
					weakness: xhodon.unitAddInfo('wild_centaur', "2fach", 'axe_swinging_dwarf', "4fach") });
		case "warriorpriest":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('powerchild',"4fach", 'icewarrior',"2fach") +
						xhodon.unitImageAndText('default',"1/6&nbsp;von&nbsp;Feuerteufel"),
					weakness: xhodon.unitAddInfo('axe_swinging_dwarf', "2fach", 'wild_centaur', "4fach") });
		case "wild_centaur":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('warriorpriest',"4fach", 'hysterical_centauress',"2fach") +
						xhodon.unitImageAndText('default',"1/12&nbsp;von&nbsp;Zyklopen"),
					weakness: xhodon.unitAddInfo('elven_archer', "2fach", 'doubleaxe_dwarf', "4fach") });
		case "axe_swinging_dwarf":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('hysterical_centauress',"4fach", 'warriorpriest',"2fach") +
						xhodon.unitImageAndText('default',"1/14&nbsp;von&nbsp;Zyklopen"),
					weakness: xhodon.unitAddInfo('doubleaxe_dwarf', "2fach", 'elven_archer', "4fach") });
		case "elven_archer":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('axe_swinging_dwarf',"4fach", 'wild_centaur',"2fach") +
						xhodon.unitImageAndText('default',"1/18&nbsp;von&nbsp;Zyklopen"),
					weakness: xhodon.unitAddInfo('treegiant', "2fach", 'singing_halfgiant', "4fach") });
		case "doubleaxe_dwarf":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('wild_centaur',"4fach", 'axe_swinging_dwarf',"2fach") +
						xhodon.unitImageAndText('default',"1/20&nbsp;von&nbsp;Zyklopen"),
					weakness: xhodon.unitAddInfo('singing_halfgiant', "2fach", 'treegiant', "4fach") });
		case "singing_halfgiant":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('elven_archer',"4fach", 'doubleaxe_dwarf',"2fach") +
						xhodon.unitImageAndText('default',"1/25&nbsp;von&nbsp;Todesengel"),
					weakness: xhodon.unitAddInfo('stone_throwing_troll', "2fach", 'elv_magican', "4fach") });
		case "stone_throwing_troll":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('treegiant',"4fach", 'singing_halfgiant',"2fach") +
						xhodon.unitImageAndText('default',"1/45&nbsp;von&nbsp;Todesengel"),
					weakness: xhodon.unitAddInfo('goblin', "2fach", 'powerchild', "4fach") });
		case "treegiant":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('doubleaxe_dwarf',"4fach", 'elven_archer',"2fach") +
						xhodon.unitImageAndText('default',"1/30&nbsp;von&nbsp;Todesengel"),
					weakness: xhodon.unitAddInfo('elv_magican', "2fach", 'stone_throwing_troll', "4fach") });
		case "elv_magican":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('singing_halfgiant',"4fach", 'treegiant',"2fach") +
						xhodon.unitImageAndText('default',"1/35&nbsp;von&nbsp;Todesengel"),
					weakness: xhodon.unitAddInfo('fire_fay', "2fach", 'icewarrior', "4fach") });
		case "fire_fay":
			return $.extend(xvalues.baseUnitValues(unit_name),
					{strength: xhodon.unitAddInfo('icewarrior',"4fach", 'elv_magican',"2fach") +
						xhodon.unitImageAndText('default',"1/9&nbsp;von&nbsp;Feuerteufel"),
					weakness: xhodon.unitAddInfo('powerchild', "2fach", 'goblin', "4fach") });
		case "storm_faerie":
			return $.extend(xvalues.baseUnitValues(unit_name), {strength: "(keine)", weakness: "(keine)"});
	// 	case "default": // Wächter
		default:
			return {};
		}
	},
	// Get unit values and strength/weakness information in an object {one, total},
	// where "one" contains values for one unit and "total" contains values for
	// "count" units.
	unitInfos : function( item, count ) {
		if ( isNaN(count) || typeof(count) == 'undefined' || count < 0 ) {
			count = 1;
		}
		var values = {};

		// Test all units
		for ( i = 0; i < unit_list.length; ++i ) {
			var unit_name = unit_list[i];
			if ( item.hasClass("unit_" + unit_name) ) {
				values = xvalues.unitInfosByName( unit_name );
				break;
			}
		}

		// Wächterwesen
		if ( item.hasClass("unit_default") ) {
			var id_test = item.attr('href').match(/&id=(\d+)$/);
		// 	var name_test = item.attr('onmouseover').match(/return\s+overlib\('([^']*)'\);/);
			if ( id_test ) {
				var unit_id = parseInt(id_test[1]);

				switch ( server.name ) {
                                    case unicornServer.name:
                                        switch ( unit_id ) {
                                            // TODO Salamander, Skarabaeus
                                            case 18:
                                                values = { id: unit_id, name: 'Wurzelwichte', attack: 0, defense: 1, live: 8, speed: 2, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 19:
                                                values = { id: unit_id, name: 'Fleischhummeln', attack: 2, defense: 2, live: 12, speed: 4, points: 0, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 21:
                                                values = { id: unit_id, name: 'Gnome', attack: 3, defense: 3, live: 20, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 22:
                                                values = { id: unit_id, name: 'Irrlichter', attack: 3, defense: 3, live: 24, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 23:
                                                values = { id: unit_id, name: 'Skrälinge', attack: 4, defense: 4, live: 28, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 24:
                                                values = { id: unit_id, name: 'Warzengiftratten', attack: 4, defense: 4, live: 32, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 25:
                                                values = { id: unit_id, name: 'Sylphen', attack: 5, defense: 5, live: 36, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 26:
                                                values = { id: unit_id, name: 'Midgardschlangen', attack: 0, defense: 5, live: 40, speed: 2, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 27:
                                                values = { id: unit_id, name: 'Nymphen', attack: 6, defense: 6, live: 44, speed: 4, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 28:
                                                values = { id: unit_id, name: 'Schlingpflanzen', attack: 7, defense: 7, live: 48, speed: 4, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 29:
                                                values = { id: unit_id, name: 'Meerjungfrauen', attack: 8, defense: 8, live: 52, speed: 4, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 30:
                                                values = { id: unit_id, name: 'Werwölfe', attack: 9, defense: 9, live: 56, speed: 4, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 31:
                                                values = { id: unit_id, name: 'Gorgonen', attack: 10, defense: 10, live: 66, speed: 4, points: 3, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 32:
                                                values = { id: unit_id, name: 'Harpien', attack: 11, defense: 11, live: 70, speed: 4, points: 3, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 33:
                                                values = { id: unit_id, name: 'Weißadler', attack: 12, defense: 12, live: 88, speed: 4, points: 3, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 34:
                                                values = { id: unit_id, name: 'Morlocks', attack: 13, defense: 13, live: 100, speed: 4, points: 3, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 35:
                                                values = { id: unit_id, name: 'Riesen Marokspinnen', attack: 14, defense: 14, live: 110, speed: 4, points: 4, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 36:
                                                values = { id: unit_id, name: 'Feuerteufel', attack: 0, defense: 15, live: 90, speed: 2, points: 4, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 37:
                                                values = { id: unit_id, name: 'Fenriswölfe', attack: 16, defense: 16, live: 120, speed: 4, points: 4, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 38:
                                                values = { id: unit_id, name: 'Dämonen', attack: 17, defense: 17, live: 130, speed: 4, points: 5, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 39:
                                                values = { id: unit_id, name: 'Horngolems', attack: 18, defense: 18, live: 140, speed: 5, points: 5, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 40:
                                                values = { id: unit_id, name: 'Sonnenpferde', attack: 19, defense: 19, live: 150, speed: 5, points: 6, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 41:
                                                values = { id: unit_id, name: 'Minotauren', attack: 20, defense: 20, live: 170, speed: 5, points: 6, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 42:
                                                values = { id: unit_id, name: 'Greife', attack: 22, defense: 22, live: 190, speed: 5, points: 7, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 43:
                                                values = { id: unit_id, name: 'Blutalbe', attack: 23, defense: 23, live: 210, speed: 5, points: 7, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 44:
                                                values = { id: unit_id, name: 'Zyklopen', attack: 0, defense: 25, live: 160, speed: 2, points: 8, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 45:
                                                values = { id: unit_id, name: 'Mantikoren', attack: 28, defense: 28, live: 230, speed: 5, points: 9, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 46:
                                                values = { id: unit_id, name: 'Behemoths', attack: 35, defense: 35, live: 260, speed: 5, points: 10, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 47:
                                                values = { id: unit_id, name: 'Oger', attack: 40, defense: 40, live: 300, speed: 5, points: 12, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 48:
                                                values = { id: unit_id, name: 'Sandwürmer', attack: 50, defense: 50, live: 390, speed: 5, points: 15, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 49:
                                                values = { id: unit_id, name: 'Todesengel', attack: 0, defense: 60, live: 400, speed: 4, points: 20, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 50:
                                                values = { id: unit_id, name: 'Goldene Sphinx', attack: 80, defense: 80, live: 630, speed: 5, points: 24, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 51:
                                                values = { id: unit_id, name: 'Feuerstacheldrachen', attack: 100, defense: 100, live: 700, speed: 5, points: 30, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 52:
                                                values = { id: unit_id, name: 'Eisaugendrachen', attack: 150, defense: 150, live: 920, speed: 5, points: 40, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            case 53:
                                                values = { id: unit_id, name: 'Schlangenhalsdrachen', attack: 200, defense: 200, live: 1200, speed: 5, points: 50, reviveMushrooms: 0, revivePowerStones: 0 };
                                                break;
                                            default:
                                                debugError("Wächter-ID unbekannt: " + unit_id);
                                        }
                                        break;

                                case centaurServer.name:
                                case fairyServer.name:
					switch ( unit_id ) {
					case 18:
						values = { id: unit_id, name: 'Wurzelwichte', attack: 1, defense: 1, live: 8, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 19:
						values = { id: unit_id, name: 'Fleischhummeln', attack: 2, defense: 2, live: 12, speed: 4, points: 0, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 21:
						values = { id: unit_id, name: 'Gnome', attack: 3, defense: 3, live: 20, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 22:
						values = { id: unit_id, name: 'Irrlichter', attack: 3, defense: 3, live: 24, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 23:
						values = { id: unit_id, name: 'Skrälinge', attack: 4, defense: 4, live: 28, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 24:
						values = { id: unit_id, name: 'Warzengiftratten', attack: 4, defense: 4, live: 32, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 25:
						values = { id: unit_id, name: 'Sylphen', attack: 5, defense: 5, live: 36, speed: 4, points: 1, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 26:
						values = { id: unit_id, name: 'Midgardschlangen', attack: 5, defense: 5, live: 40, speed: 3, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 27:
						values = { id: unit_id, name: 'Nymphen', attack: 6, defense: 6, live: 44, speed: 4, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 28:
						values = { id: unit_id, name: 'Schlingpflanzen', attack: 7, defense: 7, live: 48, speed: 4, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 29:
						values = { id: unit_id, name: 'Meerjungfrauen', attack: 8, defense: 8, live: 52, speed: 4, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 30:
						values = { id: unit_id, name: 'Werwölfe', attack: 9, defense: 9, live: 56, speed: 4, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 31:
						values = { id: unit_id, name: 'Gorgonen', attack: 10, defense: 10, live: 66, speed: 4, points: 3, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 32:
						values = { id: unit_id, name: 'Harpien', attack: 11, defense: 11, live: 70, speed: 4, points: 3, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 33:
						values = { id: unit_id, name: 'Weißadler', attack: 12, defense: 12, live: 88, speed: 4, points: 3, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 34:
						values = { id: unit_id, name: 'Morlocks', attack: 13, defense: 13, live: 100, speed: 4, points: 3, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 35:
						values = { id: unit_id, name: 'Riesen Marokspinnen', attack: 14, defense: 14, live: 110, speed: 4, points: 4, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 36:
						values = { id: unit_id, name: 'Feuerteufel', attack: 15, defense: 15, live: 90, speed: 3, points: 4, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 37:
						values = { id: unit_id, name: 'Fenriswölfe', attack: 16, defense: 16, live: 120, speed: 4, points: 4, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 38:
						values = { id: unit_id, name: 'Dämonen', attack: 17, defense: 17, live: 130, speed: 4, points: 5, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 39:
						values = { id: unit_id, name: 'Horngolems', attack: 18, defense: 18, live: 140, speed: 5, points: 5, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 40:
						values = { id: unit_id, name: 'Sonnenpferde', attack: 19, defense: 19, live: 150, speed: 5, points: 6, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 41:
						values = { id: unit_id, name: 'Minotauren', attack: 20, defense: 20, live: 170, speed: 5, points: 6, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 42:
						values = { id: unit_id, name: 'Greife', attack: 22, defense: 22, live: 190, speed: 5, points: 7, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 43:
						values = { id: unit_id, name: 'Blutalbe', attack: 23, defense: 23, live: 210, speed: 5, points: 7, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 44:
						values = { id: unit_id, name: 'Zyklopen', attack: 25, defense: 25, live: 160, speed: 4, points: 8, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 45:
						values = { id: unit_id, name: 'Mantikoren', attack: 28, defense: 28, live: 230, speed: 5, points: 9, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 46:
						values = { id: unit_id, name: 'Behemoths', attack: 35, defense: 35, live: 260, speed: 5, points: 10, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 47:
						values = { id: unit_id, name: 'Oger', attack: 40, defense: 40, live: 300, speed: 5, points: 12, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 48:
						values = { id: unit_id, name: 'Sandwürmer', attack: 50, defense: 50, live: 390, speed: 5, points: 15, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 49:
						values = { id: unit_id, name: 'Todesengel', attack: 60, defense: 60, live: 400, speed: 4, points: 20, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 50:
						values = { id: unit_id, name: 'Goldene Sphinx', attack: 80, defense: 80, live: 630, speed: 5, points: 24, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 51:
						values = { id: unit_id, name: 'Feuerstacheldrachen', attack: 100, defense: 100, live: 700, speed: 5, points: 30, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 52:
						values = { id: unit_id, name: 'Eisaugendrachen', attack: 150, defense: 150, live: 920, speed: 5, points: 40, reviveMushrooms: 0, revivePowerStones: 0 };
						break;
					case 53:
						values = { id: unit_id, name: 'Schlangenhalsdrachen', attack: 200, defense: 200, live: 1200, speed: 5, points: 50, reviveMushrooms: 0, revivePowerStones: 0 };
						break;

					default:
                                            debugError("Wächter-ID unbekannt: " + unit_id);
					}
					break;

                                    case trollServer.name:
					switch ( unit_id ) {
					case 18:
					    values = { id: unit_id, name: 'Wurzelwichte', attack: 1, defense: 1, live: 5, speed: 3, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 19:
					    values = { id: unit_id, name: 'Fleischhummeln', attack: 2, defense: 2, live: 12, speed: 3, points: 2, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 21:
					    values = { id: unit_id, name: 'Gnome', attack: 2, defense: 2, live: 10, speed: 3, points: 5, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 22:
					    values = { id: unit_id, name: 'Irrlichter', attack: 2, defense: 2, live: 7, speed: 3, points: 5, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 23:
					    values = { id: unit_id, name: 'Skrälinge', attack: 3, defense: 3, live: 15, speed: 3, points: 7, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 24:
					    values = { id: unit_id, name: 'Warzengiftratten', attack: 5, defense: 5, live: 11, speed: 3, points: 7, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 25:
					    values = { id: unit_id, name: 'Sylphen', attack: 5, defense: 5, live: 18, speed: 3, points: 9, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 26:
					    values = { id: unit_id, name: 'Midgardschlangen', attack: 5, defense: 5, live: 11, speed: 3, points: 7, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 27:
					    values = { id: unit_id, name: 'Nymphen', attack: 4, defense: 4, live: 28, speed: 3, points: 11, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 28:
					    values = { id: unit_id, name: 'Schlingpflanzen', attack: 2, defense: 2, live: 47, speed: 3, points: 11, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 29:
					    values = { id: unit_id, name: 'Meerjungfrauen', attack: 5, defense: 5, live: 30, speed: 3, points: 14, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 30:
					    values = { id: unit_id, name: 'Werwölfe', attack: 6, defense: 6, live: 39, speed: 3, points: 16, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 31:
					    values = { id: unit_id, name: 'Gorgonen', attack: 8, defense: 8, live: 31, speed: 3, points: 16, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 32:
					    values = { id: unit_id, name: 'Harpien', attack: 12, defense: 12, live: 25, speed: 3, points: 18, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 33:
					    values = { id: unit_id, name: 'Weißadler', attack: 10, defense: 10, live: 48, speed: 3, points: 23, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 34:
					    values = { id: unit_id, name: 'Morlocks', attack: 12, defense: 12, live: 41, speed: 3, points: 23, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 35:
					    values = { id: unit_id, name: 'Riesen Marokspinnen', attack: 16, defense: 16, live: 62, speed: 3, points: 34, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 36:
					    values = { id: unit_id, name: 'Feuerteufel', attack: 14, defense: 14, live: 50, speed: 3, points: 27, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 37:
					    values = { id: unit_id, name: 'Fenriswölfe', attack: 13, defense: 13, live: 54, speed: 3, points: 27, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 38:
					    values = { id: unit_id, name: 'Dämonen', attack: 25, defense: 25, live: 37, speed: 3, points: 32, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 39:
					    values = { id: unit_id, name: 'Horngolems', attack: 19, defense: 19, live: 58, speed: 3, points: 35, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 40:
					    values = { id: unit_id, name: 'Sonnenpferde', attack: 17, defense: 17, live: 81, speed: 3, points: 39, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 41:
					    values = { id: unit_id, name: 'Minotauren', attack: 24, defense: 24, live: 53, speed: 3, points: 36, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 42:
					    values = { id: unit_id, name: 'Greife', attack: 21, defense: 21, live: 66, speed: 3, points: 39, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 43:
					    values = { id: unit_id, name: 'Blutalbe', attack: 28, defense: 28, live: 72, speed: 3, points: 66, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 44:
					    values = { id: unit_id, name: 'Zyklopen', attack: 36, defense: 36, live: 107, speed: 3, points: 67, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 45:
					    values = { id: unit_id, name: 'Mantikoren', attack: 35, defense: 35, live: 122, speed: 3, points: 68, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 46:
					    values = { id: unit_id, name: 'Behemoths', attack:51, defense: 51, live: 156, speed: 3, points: 93, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 47:
					    values = { id: unit_id, name: 'Oger', attack: 42, defense: 42, live: 301, speed: 3, points: 118, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 48:
					    values = { id: unit_id, name: 'Sandwürmer', attack: 57, defense: 57, live: 376, speed: 3, points: 155, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 49:
					    values = { id: unit_id, name: 'Todesengel', attack: 83, defense: 83, live: 198, speed: 3, points: 134, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 50:
					    values = { id: unit_id, name: 'Goldene Sphinx', attack: 75, defense: 75, live: 427, speed: 3, points: 189, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 51:
					    values = { id: unit_id, name: 'Feuerstacheldrachen', attack: 147, defense: 147, live: 888, speed: 3, points: 380, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 52:
					    values = { id: unit_id, name: 'Eisaugendrachen', attack: 213, defense: 213, live: 1365, speed: 3, points: 566, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;
					case 53:
					    values = { id: unit_id, name: 'Schlangenhalsdrachen', attack: 263, defense: 263, live: 2180, speed: 3, points: 763, reviveMushrooms: 0, revivePowerStones: 0 };
					    break;

					default:
                                            debugError("Wächter-ID unbekannt: " + unit_id);
					}
					break;
				}
			} else {
                            debugError( "href attribute not matched" );
                            return false;
			}
		}

		if ( typeof(values.id) == 'undefined' ) {
                    debugError("No known unit name found: " + item.attr('class'));
                    return false;
		}

		return { one: values,
				 total: {id: values.id, name: values.name, count: count,
						 attack: count * values.attack,
						 defense: count * values.defense,
						 live: count * values.live, speed: values.speed,
						 points: count * values.points,
						 reviveMushrooms: count * values.reviveMushrooms,
						 revivePowerStones: count * values.revivePowerStones,
						 strength: values.strength, weakness: values.weakness} };
	}
};


/** Collection of functions that generate HTML to be inserted into a xhodon-page.
  * @private
  * @const */
var xhodon = {
	// Resource production (on resource building pages)
	addResourceCalculations : function() {
		var storyTxt = $('#resource_production .storyTxt');
		if ( storyTxt == null ) {
                    debugError("addResourceCalculations(): Element not found!");
                    return;
		}

		var text = storyTxt.html();
		if ( text == null ) {
                    debugError("addResourceCalculations(): Element found, but no content text!");
                    return;
		}
		if ( text.search(/\/Tick/i) == -1 ) { // Don't readd calculation results
			var re = /Momentane Produktion:\s+([0-9\.]*)\s+\(\+?(-?[0-9\.]*)\)/i;
			var res = re.exec(text);
			if ( res == null ) {
				// Try regular expression for resource buildings without any bonus
				var re = /Momentane Produktion:\s+([0-9\.]*)/i;
				var res = re.exec(text);
				if ( res == null ) {
                                    debugError("addResourceCalculations(): Regexp result is null!");
                                    return;
				}
			}

			var baseProduction = parseInt(res[1].replace(/\./g, ''));
			var extraProduction = res[2] ? parseInt(res[2].replace(/\./g, '')) : 0;
			var production = baseProduction + extraProduction;

                        var ticksPerHour = 60 / server.tick;
			var new_text = "&bull; " + x.formatNumber(production) + "/Tick &bull; " +
                                x.formatNumber(production * ticksPerHour) + "/Std. &bull; " +
                                x.formatNumber(production * ticksPerHour * 24) + "/Tag" +
                                "<br /><span id='calc_ress'>---</span> in " +
                                "<input type='text' maxlength='3' id='calc_hours' /> Stunden";
			storyTxt.append( new_text );
			$("#calc_hours").width(25)
				.keydown(function(e){ return (e.which >= 1 && e.which <= 100) ||
							      (e.which >= 48 && e.which <= 57); })
				.keyup(function(e){
					if ( (e.which >= 48 && e.which <= 57) || e.which == 8 || e.which == 46 ) {
						var val = $(this).val();
						if ( val == "" ) {
							$("#calc_ress").html("---");
						} else {
							var hours = parseInt(val);
							$("#calc_ress").html(x.formatNumber(production * ticksPerHour * hours));
						}
					}
				});
		}
	},
	// Adds information to the shaman hut
	addShamanHutInfos : function( totalValues ) {
		var mushroomTable = $(items.shaman_test);
		if ( mushroomTable.length == 0 ) {
			return; // Shaman hut page not shown
		}
// 		debug("Shaman hut page is shown");
		mushroomTable.css( {'margin-top': -10} );

		var mushroom = parse.shamanValues();
		debug(mushroom);

		var perTickRow = $(items.shaman_perTickRows);
		while ( perTickRow.length > 1 ) {
			perTickRow.last().remove();
			perTickRow = $(items.shaman_perTickRows);
		}
		var res = parse.resources();
		debug(res);

		var mushroomDiff = totalValues.reviveMushrooms - mushroom.remaining;
		var mushroomTicks = Math.ceil(mushroomDiff / mushroom.perTick);
		var mushroomInfo = mushroomDiff <= 0 ? "(<span style='color:darkgreen;'>Genug vorhanden</span>)"
						: "(<span style='color:red;'>"+x.formatNumber(mushroomDiff)+" zu wenig = in "+
								x.formatTimeFromTicks(mushroomTicks)+
								" Stunden / um "+x.formatEndTimeFromTicks(mushroomTicks)+"</span>)";
		var powerStoneInfo = res.powerStones >= totalValues.revivePowerStones ? "(<span style='color:darkgreen;'>Genug vorhanden</span>)"
						: "(<span style='color:red;'>"+x.formatNumber(totalValues.revivePowerStones-res.powerStones)+" zu wenig</span>)";

		$(items.shaman_perTickRow).after("<tr class='brdTop fietator'><td class='white_first'>Insgesamt benötigte Pilze</td>" +
							"<td colspan='2' class='white_last'>"+x.formatNumber(totalValues.reviveMushrooms)+
							" <img onmouseout='nd();' onmouseover=\"return overlib('Pilze');\" title='' alt='Pilze' " +
							"src='http://zentauren.xhodon.de/xhodon/gfx/icons/mushrooms.png' class='icon20px'> " +
							mushroomInfo + "</td></tr>" +
							"<tr class='brdTop fietator'><td class='white_first'>Insgesamt benötigte Kraftsteine</td>" +
							"<td colspan='2' class='white_last'>"+x.formatNumber(totalValues.revivePowerStones)+
							" <img onmouseout='nd();' onmouseover=\"return overlib('Kraftsteine');\" title='' alt='Kraftsteine' " +
							"src='http://zentauren.xhodon.de/xhodon/gfx/icons/kraftstein.png' class='icon20px'> " +
							powerStoneInfo + "</td></tr>" +
							"<tr class='brdTop fietator'><td class='white_first'>Punkte für alle Wesen</td>" +
							"<td colspan='2' class='white_last'>"+x.formatNumber(totalValues.points)+"</td></tr>");
	},
	// Adds a tooltip element that is used for all units,
	// update values with adjustUnitTooltip()
	addUniversalUnitTooltip : function() {
		var id = "addon_tooltip";
		$("body").append( "<div id='wisdom_sidebar' class='sbInnerContainer " +
			"fietator addon_ut_a'><table class='designedTable' id='"+id+"'>" +
			"<thead><tr><td class='clear_first brdRight'></td><td class='white_last'></td></tr></thead><tbody>" +
			(settings.ut_title ? "<tr class='top addon_ut_title'></tr>" : "") +
			"<tr class='addon_ut_attack_row'><td class='clear_first addon_ut_label addon_ut_label_attack'>" +
				"Angriff<span class='addon_ut_attack_info'></span>:" +
				"</td><td class='white_last addon_ut_value addon_ut_attack'></td></tr>" +
			"<tr class='addon_ut_defense_row'><td class='clear_first addon_ut_label addon_ut_label_defense'>" +
				"Verteidigung<span class='addon_ut_defense_info'></span>:" +
				"</td><td class='white_last addon_ut_value addon_ut_defense'></td></tr>" +
			"<tr class='addon_ut_live_row'><td class='clear_first addon_ut_label addon_ut_label_live'>" +
				"Leben<span class='addon_ut_live_info'></span>:</td>" +
				"<td class='white_last addon_ut_value addon_ut_live'></td></tr>" +
			(settings.ut_speed ? ("<tr class='addon_ut_speed_row'><td class='clear_first addon_ut_label addon_ut_label_speed'>" +
				"Geschwindigkeit:</td>" +
				"<td class='white_last addon_ut_value addon_ut_speed'></td></tr>") : "") +
			"<tr class='addOnBeforeInfo addon_ut_points_row'><td class='clear_first addon_ut_label addon_ut_label_points'>" +
				"Punkte<span class='addon_ut_points_info'></span>:</td>" +
				"<td class='white_last addon_ut_value addon_ut_points'></td></tr>" +
			"</tbody>" +
			"<tfoot><tr><td class='clear_first brdRight'></td><td class='white_last'>" +
			"</td></tr></tfoot></table></div>" );
	},
	// Updates the values in the universal unit tooltip created with addUniversalUnitTooltip().
	adjustUnitTooltip : function( count_item, item, tooltip, count, infos, infos_one ) {
		if ( settings.ut_title ) {
			tooltip.find(".addon_ut_title").html( (isNaN(count)
				? "<td style='text-align:center' class='clear_first white_last' colspan='2'>"+
				xhodon.unitImage(infos.id, true, "addon_ut_img") + "&nbsp;" + infos.name + "</td></tr>"
				: "<td style='text-align:right' class='clear_first'>"+
				xhodon.unitImage(infos.id, true, "addon_ut_img") + "&nbsp;" + infos.name + ":</td>" +
				"<td class='white_last addon_ut_count'>" + x.formatNumber(count) + "</td></tr>") );
		}
		tooltip.find(".addon_ut_attack").html( x.formatNumber(infos.attack) );
		tooltip.find(".addon_ut_defense").html( x.formatNumber(infos.defense) );
		tooltip.find(".addon_ut_live").html( x.formatNumber(infos.live) );
		if ( settings.ut_speed ) {
			tooltip.find(".addon_ut_speed").html( x.formatTpgNumber(infos.speed, "&nbsp;tpg") );
		}
		tooltip.find(".addon_ut_points").html( x.formatNumber(infos.points) );

		// Add values for a single unit, if the count isn't equal to 1
		if ( typeof(infos_one) != 'undefined' && !isNaN(count) && count != 1 ) {
			tooltip.find(".addon_ut_attack_info").html( "&nbsp;(" + x.formatNumber(infos_one.attack) + ")" );
			tooltip.find(".addon_ut_defense_info").html( "&nbsp;(" + x.formatNumber(infos_one.defense) + ")" );
			tooltip.find(".addon_ut_live_info").html( "&nbsp;(" + x.formatNumber(infos_one.live) + ")" );
			tooltip.find(".addon_ut_points_info").html( "&nbsp;(" + x.formatNumber(infos_one.points) + ")" );
		} else {
			tooltip.find(".addon_ut_attack_info").html( "" );
			tooltip.find(".addon_ut_defense_info").html( "" );
			tooltip.find(".addon_ut_live_info").html( "" );
			tooltip.find(".addon_ut_points_info").html( "" );
		}

		// Remove old strength/weakness info and add new
		tooltip.find(".addon_ut_strength, .addon_ut_weakness").remove();
		if ( settings.ut_strength_weakness && (infos.strength || infos.weakness) ) {
			tooltip.find(".addOnBeforeInfo").after(
					(infos.strength ? "<tr class='addon_ut_strength'><td style='text-align:left' colspan='2' class='clear_first'>"+
						"<span class='addon_ut_label_sw'>Stärken:</span> "+
						infos.strength+"</td></tr>" : "") +
					(infos.weakness ? "<tr class='addon_ut_weakness'><td style='text-align:left' colspan='2' class='clear_first'>"+
						"<span class='addon_ut_label_sw'>Schwächen:</span> "+
						infos.weakness+"</td></tr>" : "") );
		}
	},
	// Add unit tooltips where apropriate and prints points after the units names
	addUnitTooltips : function() {
		var totalValues = { attack: 0, defense: 0, live: 0, speed: 0, points: 0,
							reviveMushrooms: 0, revivePowerStones: 0 };
		var totalValuesPalace = { attack: 0, defense: 0, live: 0, speed: 0, points: 0,
							reviveMushrooms: 0, revivePowerStones: 0 };
		var hasPalaceUnits = false;
		$(items.units).each(function(){
			var item = $(this);
			var palaceUnit = false;
			if ( item.get(0).tagName == "A" ) {
				var nextItem = item.parent().next();
				if ( nextItem && nextItem.get(0).tagName == "TD" ) {
					nextItem = nextItem.next();
					palaceUnit = nextItem && nextItem.hasClass("clear_last");
				}
			}

			item.addClass("fietatorItem");
			var count_item;
			if ( item.hasClass("pngfix") ) { // Schamanenhütte
				count_item = item.next().children(".top").children("a");
				count_item.addClass("fietatorShaman");
			} else {
				count_item = item.parent().next();
				count_item.addClass("fietatorDefault");
			}

			// Remove old appended infos
// 			count_item.children("small").remove();

			var count = parseInt( count_item.html().replace(/\.|^Menge:\s*|\s+-\s+[A-Za-zöäüÖÄÜß\s]*$/g, '') );
			var unit_infos = xvalues.unitInfos( item, count );
			if ( !unit_infos ) {
                            debugError("No unit information found for '" + item + "'!");
                            return;
			}
			var infos = unit_infos.total;
			var infos_one = unit_infos.one;

			// Add to total values
			if ( palaceUnit ) {
				totalValuesPalace = x.addToValues( totalValuesPalace, infos );
				hasPalaceUnits = hasPalaceUnits || count > 0;
			} else {
				totalValues = x.addToValues( totalValues, infos );
			}

			if ( settings.unit_tooltips ) {
	// 			if ( !isNaN(count) && count >= 1 ) {
	// 				count_item.append(" <small style='font-weight:normal; float:right;'>(" + x.formatNumber(infos.points) + " Pkt.)</small>");
	// 			}

				count_item.hover(function(e){
						var tooltip = $("#addon_tooltip");
						xhodon.adjustUnitTooltip( count_item, item, tooltip, count, infos, infos_one );
						x.positionTooltip( e, tooltip );
						tooltip.css({width: 150, height: 100});
						tooltip.show();
					}, function() {
						$("#addon_tooltip").hide();
					}).mousemove(function(e){
						x.positionTooltip(e, $("#addon_tooltip"));
					});
			}
		});

		if ( totalValues.speed == 0 ) {
			return totalValues;
		}
		var old_tooltip = $("#tooltip_total");
		if ( old_tooltip.length > 0 ) {
			old_tooltip.remove();
		}
		var old_tooltip_palace = $("#tooltip_total_palace");
		if ( old_tooltip_palace.length > 0 ) {
			old_tooltip_palace.remove();
		}

		if ( settings.unit_totals ) {
			// Append total units tooltip(s)
			var id = "tooltip_total";
			$("body").append( xhodon.createTotalsTooltip(id, totalValues) );

			// Show / Hide tooltips on hover, move on mousemove
			// Append additional infos
			$(items.transfer_left)
				.hover(function(e){
					var tooltip = $("#"+id);
					x.positionTooltip(e, tooltip);
					tooltip.css({width: 150, height: 100});
					tooltip.show();
				}, function() {
					$("#"+id).hide();
				}).mousemove(function(e){
					x.positionTooltip(e, $("#"+id));
				}).append(" <small class='fietator' style='font-weight:normal;'>(" +
					x.formatNumber(totalValues.points) + " Pkt.)</small>");

			if ( hasPalaceUnits ) {
				var id_palace = "tooltip_total_palace";
				$("body").append( xhodon.createTotalsTooltip(id_palace, totalValuesPalace) );
				$(items.transfer_right)
					.hover(function(e){
						var tooltip = $("#"+id_palace);
						x.positionTooltip(e, tooltip);
						tooltip.css({width: 150, height: 100});
						tooltip.show();
					}, function() {
						$("#"+id_palace).hide();
					}).mousemove(function(e){
						x.positionTooltip(e, $("#"+id_palace));
					}).append(" <small class='fietator' style='font-weight:normal;'>(" +
						x.formatNumber(totalValuesPalace.points) + " Pkt.)</small>");
			}
		}
		return totalValues;
	},
	setupTickFormatting : function() {
		var klick_countdown = $("#klick_countdown");
		window.setInterval( function(){
			var time = klick_countdown.html();
			var minutes = parseInt( time.substring(0, 1) );
			var seconds = parseInt( time.substring(2, 4) );
			var remain = minutes + seconds / 60;
			if ( remain >= (0.8 * server.tick) ) {
                            klick_countdown.css({color: '#E1FF88', 'font-weight': "normal",
                                                 'font-size': "1em"});
                        } else if ( remain >= (0.4 * server.tick) ) {
                            klick_countdown.css({color: '#FFE1A8'});
                        } else if ( remain >= (0.2 * server.tick) ) { // && remain < 2 ) {
                            klick_countdown.css({color: 'orange'});
			} else if ( remain >= (0.1 * server.tick) ) { //&& remain < 1 ) {
                            klick_countdown.css({color: 'red'});
			} else { //if ( remain < 0.5 ) {
                            klick_countdown.css({color: 'red', 'font-weight': "bold",
                                                 'font-size': "1.2em"});
			}
		}, 1000 );
	},
	changeTitle : function( template ) {
		var build_timer = $("#std_alone_build_queue_timer_0");
		if ( build_timer.length >= 1 ) {
			document.title = settings.change_title.replace( "%BUILD_COUNTDOWN",
															build_timer.text() );
		} else {
			document.title = settings.change_title.replace( "%BUILD_COUNTDOWN",
															"Bereit" );
		}
	},
	updateLayout : function( page ) {
		var end_time_containers = $(items.end_time_containers);
		if ( end_time_containers.length > 0 ) {
			// Select/filter TextNodes
			var textNodes = $('*', end_time_containers)
					.contents().filter(function(){ return this.nodeType == 3; });
// 			var finishTime = textNodes[ textNodes.length - 2 ];
// 			if ( finishTime ) {
			for ( i = 0; i < textNodes.length; ++i ) {
				var finishTime = textNodes[i];
				var value = finishTime.nodeValue.replace(/([0-9][0-9]:[0-9][0-9]):00/,
														 "$1");
														//"$1&nbsp;Uhr");
				$(finishTime).replaceWith(value);
			}
		}

		if ( $("#btn_addon_settings").length == 0 ) {
			var profile_account_buttons = $(items.profile_account_buttons);
			profile_account_buttons.each( function(){
				var button = $(this);
				if ( button && button.text().indexOf("Account-Einstellungen") != -1 ) {
					button.after( new_items.profile_buttons_spacer +
								new_items.button("btn_addon_settings", "AddOn-Einstellungen",
												"showAddonSettings(); return false;") );
				}
			});
		}

// 		$.each(textNodes, function () {
// 			// mit this.nodeValue erhält man den Text-Inhalt des Text-Elements im DOM
// 			if ( this.nodeValue.indexOf('Mein') >= 0 ) {
// 				// Ersetzen des TextNodes durch ein HTML-Konstrukt
// 				$(this).replaceWith(this.nodeValue.replace('Mein', '<b>Mein</b>'));
// 			}
// 		});

// 		var re = /erschafft zur Zeit\s+([0-9\.]*)/i;
// 		var res = re.exec(text);
// 		if ( res == null ) {
// 			debugError("addResourceCalculations(): Regexp result is null!");
// 			return;
// 		}
// 		var r = /<img src="http:\/\/zentauren.xhodon.de\/xhodon\/gfx\/icons\/time\/fertig.gif" alt="Fertig"[^>]*>\s*[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/
	},
	// Adds a button to the "Load Hero" page to show guard information
	addGuardInfo : function( totalValues ) {
		var guard_level = 1;
		var guard_values = { attack: 0, defense: 0, live: 0, unicorns: 0, rating: 0 };
		var next_guard_values = { attack: 0, defense: 0, live: 0, unicorns: 0, rating: 0 };
		var prev_guard_values = { attack: 0, defense: 0, live: 0, unicorns: 0, rating: 0 };

		// Compute live bonus from hero attribute
		var live_bonus = Math.floor( totalValues.live * cur_hero_attr.live * 0.02 );

		var hero_rating = (totalValues.live + live_bonus) * totalValues.attack;
		while ( true ) {
			var values = xvalues.guardValues(guard_level);
			values.rating = values.live * values.defense;
			var rating = hero_rating > values.rating;

                        if ( (server == trollServer && guard_level > 14) ||
                             ((server == centaurServer || server == fairyServer ||
                               server == unicornServer || server == warriorServer)
                              && guard_level > 9) || !rating )
			{
			    --guard_level;
			    next_guard_values = values;
			    break;
			} else {
			    prev_guard_values = guard_values;
			    guard_values = values;
			}
			++guard_level;
		}

		var rate_guard = function(hero_rating, guard_rating) {
			var victory_rating = Math.floor((hero_rating / guard_rating) * 100);
			if ( victory_rating >= 3000 ) {
				return "<span style='color:darkgreen;'>Ok</span> (" + x.formatNumber(victory_rating) + "%)";
			} else if ( victory_rating >= 1000 ) {
				return "<span style='color:orange;'>Verluste</span> (" + x.formatNumber(victory_rating) + "%)";
			} else if ( victory_rating >= 100 ) {
				return "<span style='color:orange;'>Hohe Verluste</span> (" + x.formatNumber(victory_rating) + "%)";
			} else {
				return "<span style='color:red;'>Niederlage!</span> (" + victory_rating + "%)";
			}
		};

		var guard_victory_rating = rate_guard(hero_rating, guard_values.rating);
		var next_guard_victory_rating = rate_guard(hero_rating, next_guard_values.rating);
		var prev_guard_victory_rating = rate_guard(hero_rating, prev_guard_values.rating);

		if ( guard_level > 0 ) {
			var guard_html = function( nr, guard_level, guard_values, rating ) {
				return "<tr class='addon_gi_row addon_gi_"+nr+"'>"+
						"<td><img class='addon_gi_img' " +
							"src='http://feen.xhodon.de/xhodon/gfx/map/images/Icons/waechter/level"+guard_level+".png'/></td>"+
						"<td class='addon_gi_level'>W&auml;chter&nbsp;"+guard_level+":</td>"+
						"<td class='addon_gi_defense'>"+x.formatNumber(guard_values.defense)+"</td>"+
						"<td class='addon_gi_live'>"+x.formatNumber(guard_values.live)+"</td>"+
						"<td class='addon_gi_unicorns'>"+x.formatNumber(guard_values.unicorns*1000)+"</td>"+
						"<td class='addon_gi_rating'>"+rating+"</td>"+
						"</tr>";
			};

			$(items.hero_transfer_mtop).before(
				"<tr class='top fietator'>"+
				"<td class='gray_first' colspan=3>Wächtervorschau</td>"+
				"<td class='gray_last' colspan=4><input type='button' onclick='toggleGuardInfo(); return false;' "+
					"value='Anzeigen' id='btn_guard_info' class='stSubmitBtn'></td>"+
				"</tr><tr>"+
				"<td class='clear_first addon_gi_container' colspan=7>"+
					"<table id='guard_info'><tbody width=100%>"+
						// Header
						"<tr class='addon_gi_header'><td></td><td></td>"+
						"<td class='addon_gi_header_defense'>Verteidigung</td>"+
						"<td class='addon_gi_header_live'>Leben</td>"+
						"<td class='addon_gi_header_resources'>Ressourcen</td>"+
						"<td class='addon_gi_header_rating'>Bewertung</td>"+
						"</tr>"+

						// Previous guardian level
						(guard_level > 1
							? guard_html(1, guard_level - 1, prev_guard_values,
										 prev_guard_victory_rating) : "") +

						// Actual guardian level
						guard_html(2, guard_level, guard_values, guard_victory_rating) +

						// Next guardian level
						guard_html(3, guard_level + 1, next_guard_values,
								   next_guard_victory_rating) +
					"</table>"+
					"</td></tr>");
		}
	},
	// Creates a tooltip with the given total "values".
	// The tooltip gets the given "id".
	createTotalsTooltip : function(id, values) {
		// Compute live bonus from hero attribute
		var live_bonus = Math.floor( values.live * cur_hero_attr.live * 0.02 );

// 		$("body").append( "<div id='wisdom_sidebar' class='sbInnerContainer " +
// 			"fietator addon_ut_a'><table class='designedTable' id='"+id+"'>" +
// 			"<thead><tr><td class='clear_first brdRight'></td><td class='white_last'></td></tr></thead><tbody>" +
// 			(settings.ut_title ? "<tr class='top addon_ut_title'></tr>" : "") +
// 			"<tr><td class='clear_first addon_ut_label'>" +
// 				"Angriff<span class='addon_ut_attack_info'></span>:" +
// 				"</td><td class='white_last addon_ut_value addon_ut_attack'></td></tr>" +
// 			"<tr><td class='clear_first addon_ut_label'>" +
// 				"Verteidigung<span class='addon_ut_defense_info'></span>:" +
// 				"</td><td class='white_last addon_ut_value addon_ut_defense'></td></tr>" +
// 			"<tr><td class='clear_first addon_ut_label'>" +
// 				"Leben<span class='addon_ut_live_info'></span>:</td>" +
// 				"<td class='white_last addon_ut_value addon_ut_live'></td></tr>" +
// 			(settings.ut_speed ? ("<tr><td class='clear_first addon_ut_label'>" +
// 				"Geschwindigkeit:</td>" +
// 				"<td class='white_last addon_ut_value addon_ut_speed'></td></tr>") : "") +
// 			"<tr class='addOnBeforeInfo'><td class='clear_first addon_ut_label'>" +
// 				"Punkte<span class='addon_ut_points_info'></span>:</td>" +
// 				"<td class='white_last addon_ut_value addon_ut_points'></td></tr>" +
// 			"</tbody>" +
// 			"<tfoot><tr><td class='clear_first brdRight'></td><td class='white_last'>" +
// 			"</td></tr></tfoot></table></div>" );
		return "<div id='wisdom_sidebar' class='sbInnerContainer fietator addon_ut_a'>" +
			"<table class='designedTable' id='"+id+"'>" +
// 			"style='display:none; position:absolute; -border-radius: 5px; background: rgba(240,240,240,0.8); -moz-border-radius: 5px; -webkit-border-radius: 5px;'
			"<thead><tr><td class='clear_first brdRight'></td>" +
				"<td class='white_last'></td></tr></thead><tbody>" +

			"<tr class='top'><td class='clear_first addon_ut_label addon_ut_label_attack'>Angriff:</td>" +
				"<td class='white_last addon_ut_value addon_ut_attack'>"+
					x.formatNumber(values.attack)+"</td></tr>" +
			"<tr><td class='clear_first addon_ut_label addon_ut_label_defense'>Verteidigung:</td>" +
				"<td class='white_last addon_ut_value addon_ut_defense'>"+
					x.formatNumber(values.defense)+"</td></tr>" +
			"<tr><td class='clear_first addon_ut_label addon_ut_label_live'>Leben:</td>" +
				"<td class='white_last addon_ut_value addon_ut_live'>"+
					x.formatNumber(values.live) + " +" + x.formatNumber(live_bonus) + "</td></tr>" +
			"<tr><td class='clear_first addon_ut_label addon_ut_label_speed'>Geschwindigkeit:</td>" +
				"<td class='white_last addon_ut_value addon_ut_speed'>"+
					x.formatNumber(values.speed)+" tpg</td></tr>" +
			"<tr><td class='clear_first addon_ut_label addon_ut_label_points'>Punkte:</td>" +
				"<td class='white_last addon_ut_value addon_ut_points'>"+
					x.formatNumber(values.points)+"</td></tr>" +
			"</tbody>" +
			"<tfoot><tr><td class='clear_first brdRight'></td><td class='white_last'></td></tr></tfoot></table></div>";
	},
	image : function(icon, alt, tooltip) {
		var tt = typeof(tooltip) == 'string'
			? "onmouseout='nd();' onmouseover=\"return overlib('" + tooltip + "');\" " : "";
		return "<img " + tt + "title='' alt='" + alt + "' " +
			   "src='http://zentauren.xhodon.de/xhodon/gfx/icons/" + icon + "' class='icon20px' />"
	},
	// Creates an image element which contains the xhodon icon for the given "unit_name".
	// Set the second parameter "big_image" to true to use a bigger icon, default is false.
	unitImage : function( unit_name, big_image, cl ) {
		if ( typeof(big_image) == 'undefined' ) {
			big_image = false;
		}
		if ( typeof(cl) == 'undefined' ) {
			cl = "";
		}

		if ( big_image ) {
			return "<div class='middleUBIcon' style='display:inline-block'><div class='addon_unit_image unit_" +
					unit_name + " " + cl + "' style='display:inline-block; vertical-align:middle;'></div></div>";
		} else {
			return "<div class='addon_unit_image unit_" + unit_name + " " + cl + "' " +
				"style='display:inline-block; vertical-align:middle;'></div>";
		}
	},
	// Creates an image element with text after it, both vertically centered.
	unitImageAndText : function( unit_name, text, big_image ) {
		var unit_real_name = xvalues.baseUnitValues(unit_name).name;
		var addText = typeof(unit_real_name) == 'undefined' ? ""
							: "&nbsp;(" + unit_real_name + ")";
		return "<div style='white-space:nowrap; vertical-align:middle;'>" +
			xhodon.unitImage(unit_name, big_image) + "&nbsp;" + text + addText + "</div>";
	},
	// Creates two unit images with text
	// (used for display of strength or weakness of units, always two different units)
	unitAddInfo : function( unit_name1, text1, unit_name2, text2 ) {
		return xhodon.unitImageAndText(unit_name1, text1) +
			   xhodon.unitImageAndText(unit_name2, text2);
	}
};

/** Collection of functions that do stuff independent from xhodon.
  * @private
  * @const */
var x = {
	// Updates the position of the given "tooltip" according to the given
	// event object "e" (eg. from a mouse move event).
	positionTooltip : function( e, tooltip ) {
		var top = e.pageY - 10;
		var max_bottom = $(window).height() + $(document).scrollTop();
		if ( top + tooltip.height() > max_bottom ) {
			top = max_bottom - tooltip.height();
		}
		tooltip.css({left: e.pageX + 35, top: top});
	},
	// Formats the hours and minutes until the given number of ticks has passed
	formatTimeFromTicks : function( ticks ) {
		var minutes = ticks * 5;
		var hours = Math.floor(minutes / 60);
		minutes -= hours * 60;
		return hours + ":" + (minutes >= 10 ? minutes : "0"+minutes);
	},
	// Formats the time in the given number of ticks in "hh:mm" format
	formatEndTimeFromTicks : function( ticks ) {
		var curtime = new Date();
		var ticksSinceMidnight = curtime.getHours() * 12 + Math.ceil(curtime.getMinutes()/5);
		var minutes = (ticks + ticksSinceMidnight) * 5;
		var hours = Math.floor(minutes / 60);
		minutes -= hours * 60;
		return (hours % 24) + ":" + (minutes >= 10 ? minutes : "0"+minutes) + "h";
	},
	// Adds the values in "infos" to the values in "values"
	// and returns the updated values object.
	addToValues : function( values, infos ) {
		values.attack += infos.attack;
		values.defense += infos.defense;
		values.live += infos.live;
		if ( infos.speed > values.speed ) {
			values.speed = infos.speed;
		}
		values.points += infos.points;
		values.reviveMushrooms += infos.reviveMushrooms;
		values.revivePowerStones += infos.revivePowerStones;
		return values;
	},
	// eg. 1234567 => "1.234.567"
	formatNumber : function(number) {
		number = number + ""; // ensure it's a string
		var i = number.length - 3;
		while ( i > 0 ) {
			if ( i == 1 && number[0] == "-" ) {
				break;
			}
			number = number.substring(0, i) + "." + number.substring(i, number.length);
			i -= 3;
		}
		return number;
	},
	// Formats the unit speed (in tpg) in a color visualizing fast / slow units
	formatTpgNumber : function(speed, text) {
		// Add color
		var color;
		switch ( speed ) {
		case 1:
			color = "#00cc00";
			break;
		case 2:
			color = "#339900";
			break;
		case 3:
			color = "#335500";
			break;
		case 4:
			color = "#994400";
			break;
		case 5:
			color = "#cc0000";
			break;
		default:
			return x.formatNumber(speed);
		}
		return "<span style='color:" + color + ";'>" + x.formatNumber(speed) +
				text + "</span>";
	}
};

unsafeWindow.toggleGuardInfo = function() {
	var guard_info = $("#guard_info");
	guard_info.toggle();
	$("#btn_guard_info").val( guard_info.is(':visible') ? "Verbergen" : "Anzeigen" );
};

var settingsFeature = function(options, indentation) {
	options = $.extend({id: "addon_feature", type: "checkbox", text: "",
					    tooltip: "", img: "", options: [], subcheckboxes: []},
					   options);
	if ( typeof(indentation) == 'undefined' ) {
		indentation = 0;
	}
	var indent_style = indentation > 0
			? ("margin-left: " + (indentation * 25) + "px;") : "";
	var t1 = "<tr><td style='text-align:center; width:25px;" + indent_style + "'>";
	var img = t1 + options.img + "</td><td>";

	switch ( options.type ) {
	case "checkbox":
		return img +
				"<input type='checkbox' id='" + options.id +
					"' style='" + indent_style + "' /> " +
				"<label for='" + options.id + "' title='" + options.tooltip + "'>" +
				options.text + "</label></td></tr>";
	case "checkbox_group":
		var checkbox_group = img +
				"<input type='checkbox' id='" + options.id +
					"' style='" + indent_style + "' /> " +
				"<label for='" + options.id + "' title='" + options.tooltip +
					"' style='" + indent_style + "'>" +
					options.text + "</label></td></tr>";
		for ( i = 0; i < options.subcheckboxes.length; ++i ) {
			// Add sub-checkboxes recursively
			checkbox_group += settingsFeature(options.subcheckboxes[i],
											  indentation + 1);
		}

		return checkbox_group;
	case "select":
		var select_options = "";
		for ( i = 0; i < options.options.length; ++i ) {
			var option = $.extend({value: "", text: "", tooltip: ""}, options.options[i]);
			select_options += "<option value='" + option.value + "' title='" +
				option.tooltip + "'>" + option.text + "</option>";
		}
		return img + "<label for='" + options.id + "' style='" + indent_style +
					"'>" + options.text + ":</label> " +
				"<select id='" + options.id + "' title='" + options.tooltip +
				"' style='" + indent_style + "'>" +
				select_options + "</select></td></tr>";
	default:
            debugError("Unknown type '" + options.type + "' in options for settingsFeature() given");
            return "";
	}
};

// TODO
var settingsTable = function(options) {
	options = $.extend({title: "", features: ""}, options);
	return "<table class='designedTable'>" +
				"<tr class='topBody'><td class='gray_first'>" +
				options.title + "</td></tr><tr><td class='white_first'>" +
				"<table>" + options.features + "</table>" +
			"</td></tr></table>";
};

var features = {
	// Global settings?
	'addon_global_settings': {id: "addon_global_settings",
		text: "<b>Globale Einstellungen für alle Welten benutzen</b>",
		tooltip: "Speichert die Einstellungen global für alle Xhodon-Welten. " +
			"Ansonsten werden die Einstellungen separat für die " + server +
			"-Welt gespeichert und die globalen Einstellungen nicht mehr gelesen."},

	// Unit tooltip style alternative
	'addon_ut_style': { id: "addon_ut_style", type: "select",
		text: "Stil für Einheiten-Tooltips",
		tooltip: "Wählen Sie einen der aufgelisteten Stile für die Einheiten-Tooltips.",
		options: [{value: "default", text: "Standard"},
			{value: "small", text: "Kleiner"},
			{value: "colorful", text: "Farbiger"}] },

	// Guard info style
	'addon_gi_style': { id: "addon_gi_style", type: "select",
		text: "Stil für Wächter-Info",
		tooltip: "Wählen Sie einen der aufgelisteten Stile für die Wächter-Info.",
		options: [{value: "default", text: "Standard"},
			{value: "alternative", text: "Alternativ"}] },

	// Unit tooltips
	'addon_unit_tooltips': {id: "addon_unit_tooltips",
		text: "Einheiten-Tooltips", type: "checkbox_group",
		tooltip: "Einheiten-Tooltips anzeigen",
		subcheckboxes: [
			// Show title
			{id: "addon_ut_sub_title", text: "Titel anzeigen",
			 tooltip: "Einen Titel mit größerem Einheiten-Bild, " +
				"Einheiten-Namen und der Anzahl anzeigen."},
			// Show strength/weakness info
			{id: "addon_ut_sub_sw", text: "Stärken/Schwächen anzeigen",
			 tooltip: "Stärken/Schwächen-Information in den Tooltips anzeigen."},
			// Show speed info
			{id: "addon_ut_sub_speed", text: "Geschwindigkeit anzeigen",
			 tooltip: "Geschwindigkeiten in den Tooltips anzeigen."}] },

	// Total unit values
	'addon_unit_totals': {id: "addon_unit_totals",
		text: "Gesamt-Einheiten-Werte anzeigen",
		tooltip: "Zusammengerechnete Werte aller Einheiten beim Helden / " +
			"im Palast / in der geheimen Grotte anzeigen.",
		img: "<big><b>&#8721;</b></big>"},

	// Guard info
	'addon_guard_info': {id: "addon_guard_info",
		text: "Wächter-Info anzeigen",
		tooltip: "Auf der \"Held Beladen\"-Seite wird ein zusätzlicher Knopf " +
			"\"Wächter-Info\" angezeigt um anzuzeigen, gegen welche Wächter-Level " +
			"der Held gewinnen kann.",
		img: xhodon.unitImage("default")},

	// Shaman hut
	'addon_shaman': {id: "addon_shaman",
		text: "Extra-Infos in der Schamanhütte",
		tooltip: "Zeigt weitere Informationen in der Schamanenhütte an, z.B. " +
			"insgesamt benötigte Pilze für die Wiederbelebung.",
		img: xhodon.image("mushrooms.png")},

	// Resource calculation
	'addon_res_calc': {id: "addon_res_calc",
		text: "Rohstoffe pro Tick/Stunde/beliebig anzeigen",
		tooltip: "In den Rohstoff-Gebäude-Seiten werden \"Ressourcen pro Tick\"" +
			"-Werte in andere Zeiteinheiten umgerechnet.",
		img: xhodon.image("essenz.png")},

	// Format tick countdown
	'addon_format_tick': {id: "addon_format_tick",
		text: "Tick-Countdown formatieren",
		tooltip: "Den Tick-Countdown je nach verbleibender Zeit formatieren. " +
			"Bei weniger als 30 Sekunden wird die Schriftgröße z.B. erhöht und " +
			"der Text rot eingefärbt.",
		img: xhodon.image("time/timeleft.gif")},

	// Remove ":00"
	'addon_update_layout': {id: "addon_update_layout",
		text: "\":00\" am Ende von Zeitangaben entfernen",
		tooltip: "End-Zeitpunkte sind immer Tick-genau (5 Minuten), also lohnt " +
			"die Anzeige von Sekunden nicht. Hiermit wird die Sekunden-Anzeige " +
			"entfernt (\":00\").",
		img: xhodon.image("time/fertig.gif")},

	// Hide horizontal scrollbar
	'addon_hide_h_scrollbar': {id: "addon_hide_h_scrollbar",
		text: "Horizontale Scrollleiste verstecken",
		tooltip: "Keine horizontale Scrollleiste anzeigen."},

	// Change browser title
	'addon_change_title': {id: "addon_change_title", // type: "input", TODO
		text: "Bau-Countdown in Browser-Titel anzeigen",
		tooltip: "Zeigt im Browser-Titel die verbleibende Zeit bis zum Abschluss " +
			"des momentan im Bau befindlichen Gebäudes des angezeigten Palastes."},

	// Execution time
	'addon_blocking': {id: "addon_blocking", type: "select",
		text: "Skript-Ausführungs-Zeitpunkt",
		tooltip: "Mit \"Erst anzeigen\" blockiert das Skript nicht, allerdings " +
			"wird die Seite erst im Original-Layout angezeigt und dann (sichtbar) verändert.",
		options: [{value: "0", text: "Erst alle Änderungen, dann anzeigen",
			tooltip: "Gut bei schnellem Rechner. Vor der Anzeige der Seite " +
				"werden alle Änderungen durchgeführt."},
			{value: "1", text: "Erst kleinere Änderungen, dann anzeigen, dann Rest",
			tooltip: "Kompromiss zwischen den anderen beiden Einstellungen."},
			{value: "2", text: "Erst anzeigen, dann ändern",
			tooltip: "Falls das Spiel mit den anderen Einstellungen ausgebremst " +
				"wird, blockiert nicht. Die Seite ist direkt benutzbar, das " +
				"Skript läuft im Hintergrund."}]}
};

var featureSections = [
	{title: "Haupt-AddOn-Funktionen",
	 features: settingsFeature(features['addon_unit_tooltips']) +
			   settingsFeature(features['addon_unit_totals']) +
			   settingsFeature(features['addon_guard_info']) +
			   settingsFeature(features['addon_shaman']) +
			   settingsFeature(features['addon_res_calc']) },
	{title: "Layout",
	 features: settingsFeature(features['addon_format_tick']) +
			   settingsFeature(features['addon_update_layout']) +
			   settingsFeature(features['addon_hide_h_scrollbar']) },
	{title: "Sonstiges",
	 features: settingsFeature(features['addon_change_title']) +
			   settingsFeature(features['addon_blocking']) },
	{title: "Stile",
	 features: settingsFeature(features['addon_ut_style']) +
			   settingsFeature(features['addon_gi_style']) }
];

unsafeWindow.showAddonSettings = function() {
	var tabs =
		"<table class='dynamicTabs'><tr><td>" +
			"<a class='firstBtn firstBtn_selected'>" +
			"<table><tbody><tr><td class='btnStart'><div class='spacer'>" +
				"</div></td><td class='btnMidd'>" +
				"Xhodon-AddOn" +
				"</td><td class='btnEnd'><div class='spacer'></div>" +
			"</td></tr></table></a>" +
		"</td></tr></table>";

	// Add feature settings to content string
	var content = "";
	for ( i = 0; i < featureSections.length; ++i ) {
		content += settingsTable( featureSections[i] );
	}

	// Add "save" button
	content += settingsTable( {title: "Einstellungen speichern",
							   features: settingsFeature(features['addon_global_settings']) +
									"<input type='button' value='Speichern' " +
									"onclick='saveButtonClicked();' class='stSubmitBtn' " +
									"style='margin-left: 10px; margin-top: 10px;' />" } );

	// Change #content to display the addon settings
	$("#content").html( "<h1>AddOn <small>- Einstellungen für das Xhodon-AddOn</small></h1>" +
			"<div class='profileTableContent paddingContent'>" + tabs + content + "</div>");

	// Set current settings values to the form
	$("#addon_guard_info").attr('checked', settings.guard_info);
	$("#addon_shaman").attr('checked', settings.shaman);

	$("#addon_global_settings").attr('checked', settings.global);
	$("#addon_unit_tooltips").attr('checked', settings.unit_tooltips);
	$("#addon_ut_sub_title").attr('checked', settings.ut_title);
	$("#addon_ut_sub_sw").attr('checked', settings.ut_strength_weakness);
	$("#addon_ut_sub_speed").attr('checked', settings.ut_speed);
	if ( !settings.ut_title )
		$("#addon_ut_sub_title").attr('disabled', 'disabled');
	if ( !settings.ut_strength_weakness )
		$("#addon_ut_sub_sw").attr('disabled', 'disabled');
	if ( !settings.ut_speed )
		$("#addon_ut_sub_speed").attr('disabled', 'disabled');
// 	if ( settings.unit_tooltips ) {
// 		if ( !settings.ut_title && !settings.ut_strength_weakness &&
// 				!settings.ut_speed ) {
// 			$("#addon_unit_tooltips").val("compact");
// 		} else if ( !settings.ut_title && !settings.ut_strength_weakness ) {
// 			$("#addon_unit_tooltips").val("noswt");
// 		} else if ( !settings.ut_title ) {
// 			$("#addon_unit_tooltips").val("notitle");
// 		} else {
// 			$("#addon_unit_tooltips").val("all");
// 		}
// 	} else {
// 		$("#addon_unit_tooltips").val("none");
// 	}
// 		"notitle", "noswt", "compact"

	$("#addon_unit_totals").attr('checked', settings.unit_totals);
	$("#addon_res_calc").attr('checked', settings.res_calc);
	$("#addon_format_tick").attr('checked', settings.format_tick);
	$("#addon_update_layout").attr('checked', settings.update_layout);
	$("#addon_hide_h_scrollbar").attr('checked', settings.hide_h_scrollbar);
	$("#addon_change_title").attr('checked', settings.change_title === false ? false : true);
	$("#addon_blocking").val( settings.dont_block + "" );
	$("#addon_ut_style").val( settings.ut_style );
	$("#addon_gi_style").val( settings.gi_style );

	// Add event handler to top level checkboxes of checkbox groups
	// to enable/disable them appropriately TODO : on init
	for ( feature_id in features ) {
		var feature = features[feature_id];
		if ( feature.type != "checkbox_group" ) {
			continue;
		}

		var subcheckboxes = feature.subcheckboxes;
		$("#" + feature.id).click( function(){
				var enable_sub_cbs = $(this).is(':checked');
				for ( i = 0; i < subcheckboxes.length; ++i ) {
					var sub_checkbox = $("#" + subcheckboxes[i].id);
					if ( sub_checkbox.length > 0 ) {
						// Toggle sub-checkbox enabled state
						if ( enable_sub_cbs ) {
							sub_checkbox.removeAttr('disabled');
						} else {
							sub_checkbox.attr('disabled','disabled');
						}
					} else {
                                                debugError("Subcheckbox not found:");
						debug(options.subcheckboxes[i]);
					}
				}
			});
	}
};

var storeSettings = function(settings) {
// 	if ( typeof(localStorage) != 'undefined' ) {
// 		localStorage = settings;
// 	} else {
	debug( "STORE SETTINGS..." );
	debug(settings);

	var json = $.toJSON(settings);
	debug("ADD TIMEOUT");
	setTimeout( function(){
			var globalSettings = $("#addon_global_settings").is(':checked');
			if ( server != "" ) {
				// Store settings special for this world or remove old ones
				data.settings = globalSettings ? {} : settings;
				debug("    - MAKE JSON FROM DATA WITH SETTINGS");
				var jsonData = $.toJSON(data);
				debug("    - READY");
				GM_setValue("XhodonAddOn." + server, jsonData);
			}

			if ( globalSettings || server == "" ) {
				debug( globalSettings + " '" + server + "'" );
				GM_setValue("XhodonAddOn", json);
			}
		}, 0 );

	debug( "...DONE" );
};

var parseSettingsAndData = function() {
// 	if ( typeof(localStorage) != 'undefined' ) {
// 		return localStorage;
// 	} else {
	var ret = { settings: false, data: false };
	var json = GM_getValue("XhodonAddOn", "");
	if ( json.length > 0 ) {
		ret.settings = $.parseJSON(json);
	}

	if ( server != "" ) {
		var jsonWorld = GM_getValue("XhodonAddOn." + server, "");
		if ( typeof(jsonWorld) == 'string' && jsonWorld.length > 0 ) {
			var settingsWorld = $.parseJSON(jsonWorld);
			ret.settings = $.extend(ret.settings, settingsWorld);

			var data_value = $.parseJSON(json);
			if ( typeof(data_value) != 'undefined' &&
				typeof(data_value.settings) != 'undefined' &&
				data_value.settings.global !== true )
			{
				ret.settings = data_value.settings;
				ret.data = data_value;
			}
		}
	}

	return ret;
};

/** Detects which page is currently shown.
  * Returns an object with a name property which contains the name of the
  * currently shown page or false if the detection failed.
  * If the current page name is "building" the returned object also contains
  * a property "id". Here's a list of some IDs and the associated building names.
  *   - ID 0 is mana
  *   - ID 1 is essences
  *   - ID 2 is crystal
  *   - ID 3 is power stones
  *   - ID 6 is xhodot. cocoon
  *   - ID 13 is breeding station
  *   - ID 16 is gold
  *   - ID 17 is secret cave
  *   - ID 20 is shaman hut */
var currentPage = function() {
    var hash = document.location.hash;
    var pos = hash.indexOf(".php");
    var slashPos = hash.lastIndexOf("/", pos);
    if ( pos == -1 || slashPos == -1 ) {
        debugError( "Current page couldn't be detected from hash '" + hash + "'" );
        return { name: false };
    }

    var page = hash.substring( slashPos + 1, pos );
    if ( page == "building" ) {
        var id = /building.php\?numeric\[building_id\]=(\d+)/.exec( hash );
        return { name: page, id: (id && id.length >= 1) ? id[1] : -1 };
    } else {
        return { name: page };
    }
};


/****************************************************/
/*** Functions initializing the script **************/
/****************************************************/

// Read settings and world specific data
var parsed = parseSettingsAndData();
if ( typeof(parsed.settings) == 'undefined' || parsed.settings === false ) {
	debug("No stored settings found, storing default settings");
	storeSettings(parsed.settings); // Store default settings
} else {
	debug("Stored settings found:");
	debug(parsed.settings);
	settings = $.extend(settings, parsed.settings); // Use read settings
}

if ( typeof(parsed.data) != 'undefined' && parsed.data !== false ) {
	debug("Stored data found:");
	debug(parsed.data);
	data = $.extend(data, parsed.data); // Use read data
}

// Apply settings
if ( settings.format_tick ) {
	xhodon.setupTickFormatting();
}

if ( settings.hide_h_scrollbar ) {
	$("#main-back").css({overflow: "hidden"});
}

/****************************************************/
/*** Initialize AddOn styles ************************/
/****************************************************/

// Unit tooltip style
switch ( settings.ut_style ) {
case "": // No style class given, falls through to default style
case "default":
	GM_addStyle(".addon_ut_a table { display:none; position:absolute; \
					background: rgba(240,240,240,0.8); -border-radius: 5px; \
					-moz-border-radius: 5px; -webkit-border-radius: 5px; } \
				 .addon_ut_title { font: small-caps 11px Verdana; } \
				 .addon_ut_count { font-weight:bold; font-size:1.2em; } \
				 .addon_ut_label { font-weight:normal !important; text-align:right; } \
				 .addon_ut_value { font-weight:bold; } \
				 .addon_ut_label_sw { font-weight:bold; } \
				 .addon_ut_attack_info, .addon_ut_defense_info, \
					.addon_ut_live_info, .addon_ut_points_info { color: #808080; }");
	break;

case "colorful":
	GM_addStyle(".addon_ut_a table { display:none; position:absolute; \
					background: rgba(240,240,240,0.8); -border-radius: 5px; \
					-moz-border-radius: 5px; -webkit-border-radius: 5px; } \
				 .addon_ut_title { font: small-caps 11px Verdana; } \
				 .addon_ut_count { font-weight:bold; font-size:1.2em; } \
				 .addon_ut_label { font-weight:normal !important; text-align:right; } \
				 .addon_ut_value { font-weight:bold; } \
				 .addon_ut_label_sw { font-weight:bold; } \
				 .addon_ut_attack_info, .addon_ut_defense_info, \
					.addon_ut_live_info, .addon_ut_points_info { color: #808080; } \
				 #addon_tooltip thead tr, .addon_ut_title { background-color:#bbbbff; } \
				 .addon_ut_strength { background-color:#aaffaa; } \
				 #addon_tooltip tfoot tr, .addon_ut_weakness { background-color:#ffbbbb; } \
				 .addon_ut_attack_row { background-color:#ffbbbb; } \
				 .addon_ut_defense_row { background-color:#aaffaa; }");
	break;

case "small":
	GM_addStyle(".addon_ut_a table { display:none; position:absolute; \
					font-size: 0.9em; \
					background: rgba(240,240,240,0.8); -border-radius: 5px; \
					-moz-border-radius: 5px; -webkit-border-radius: 5px; } \
				 .addon_ut_title { font: small-caps 10px Verdana; } \
				 .addon_ut_img { height: 18px !important; } \
				 .addon_ut_count { font-weight:bold; } \
				 .addon_ut_label { padding-top:0px !important; padding-bottom:0px !important; \
								   font-weight:normal !important; text-align:right; } \
				 .addon_ut_value { padding-top:0px !important; padding-bottom:0px !important; \
								   font-weight:bold; } \
				 .addon_ut_label_sw { font-weight:bold; } \
				 .addon_ut_a .addon_unit_image { display:none !important; } \
				 .addon_ut_attack_info, .addon_ut_defense_info, \
					.addon_ut_live_info, .addon_ut_points_info { color: #808080; }");
	break;

default:
    debugError("Unit tooltip style unknown: " + settings.ut_style);
    break;
}

// Guard info style
switch ( settings.gi_style ) {
case "": // No style class given, falls through to default style
case "default":
	GM_addStyle("#guard_info { width:100%; height:100%; display:none; \
							   font-weight:normal; } \
				 .addon_gi_container { padding:0px !important; } \
				 .addon_gi_row {} \
				 .addon_gi_header { text-align:right; font-weight:bold; } \
				 .addon_gi_header_rating { text-align:center; } \
				 .addon_gi_1 { background:rgba(160,250,160,.3); } \
				 .addon_gi_2 { background:rgba(220,220,160,.3); } \
				 .addon_gi_3 { background:rgba(250,160,160,.3); } \
				 .addon_gi_img { height: 26px; } \
				 .addon_gi_level { font-weight: bold; } \
				 .addon_gi_attack, .addon_gi_defense, .addon_gi_live, \
					.addon_gi_unicorns { text-align: right; } \
				.addon_gi_rating { text-align: center; }");
	break;

case "alternative":
	GM_addStyle("#guard_info { width:100%; height:100%; display:none; \
							   font-weight:normal; } \
				 .addon_gi_container { padding:0px !important; } \
				 .addon_gi_row {} \
				 .addon_gi_header { text-align:center; font-weight:bold; \
					font: small-caps 10px Verdana; } \
				 .addon_gi_1 { background:rgba(190,190,240,.5); } \
				 .addon_gi_2 { background:rgba(190,240,190,.5); } \
				 .addon_gi_3 { background:rgba(240,190,190,.5); } \
				 .addon_gi_img { height: 32px; } \
				 .addon_gi_level { font-weight: bold; font: small-caps 10px Verdana; } \
				 .addon_gi_attack, .addon_gi_defense, .addon_gi_live, \
					.addon_gi_unicorns { text-align: center; } \
				.addon_gi_rating { text-align: center; }");
	break;

default:
    debugError("Guard info style unknown: " + settings.gi_style);
    break;
}

/****************************************************/
/*** AddOn functions ********************************/
/******** to be executed for each ajax_load event ***/
/****************************************************/

var addOnDirect = function() {
    // Remove old items
    $(".fietator").remove();

	// Improves the layout at some points
	if ( settings.update_layout ) {
		xhodon.updateLayout(page);
	}

	if ( page.name == "building" && (page.id <= 3 || page.id == 16) ) {
		// Additional infos for resource building pages
		if ( settings.res_calc ) {
			xhodon.addResourceCalculations();
		}
	}
};

/** Adds all AddOn elements for the current page. Is executed every time a new
  * page has been loaded with ajax. */
var addOn = function() {
// 	debug("****** AddOn start ***************************************");
// 	var start = new Date().getTime();

	parse.heroAttributes();
	cur_hero_attr = parse.currentHeroAttributes();
	storeSettings( settings );

	if ( page.name == "heros" || (page.name == "building" &&
			  (page.id == 20 || page.id == 6 || page.id == 13 || page.id == 17)) ) {
		var totalValues = false;

		// Tooltips for units where applicable
		if ( settings.unit_tooltips || settings.unit_totals ) {
			xhodon.addUniversalUnitTooltip();
			totalValues = xhodon.addUnitTooltips();
		}

		if ( page.name == "heros" ) {
			// Add guard infos for heroes
			if ( settings.guard_info ) {
				xhodon.addGuardInfo( totalValues === false
								? xhodon.addUnitTooltips() : totalValues );
			}
		} else if ( page.name == "building" && page.id == 20 ) {
			// Additional infos for the shaman hut
			if ( settings.shaman ) {
				xhodon.addShamanHutInfos( totalValues === false
								? xhodon.addUnitTooltips() : totalValues );
			}
		}
	}

// 	debug( "...AddOn ready, total time: " + (new Date().getTime() - start) + "ms   <<<<<<<<<" );
};

debug("Start stuff now :)");

/** Stores the original xhodon function that gets executed after ajax loads.
  * @private
  * @const */
var orig = unsafeWindow.ajax_load;
debug( orig );
unsafeWindow.ajax_load = function(display) {
    orig(display);
	debug("ajax_load called with display = " + display);

	if ( display == false ) {
		if ( debug_mode ) {
// 			addon_running.append("AddOn läuft...").show();
			start = new Date().getTime();
		}

		// Check which page is currently shown
		page = currentPage();

		if ( settings.dont_block == 2 ) {
			// Use a timeout, so that the xhodon loading image is hidden
			// and the page can be used, although the addon elements aren't added yet
			setTimeout( addOnDirect, 0 );
			setTimeout( addOn, 1 );
		} else if ( settings.dont_block == 1 ) {
			addOnDirect();
			setTimeout( addOn, 1 );
		} else {
			addOnDirect();
			addOn();
		}

		if ( debug_mode ) {
			addon_running.append("AddOn fertig (" + (new Date().getTime() - start) + "ms).");
// 			setTimeout( function(){addon_running.hide('normal');}, 1000); TODO
		}
	}
};

// Save settings button clicked
unsafeWindow.saveButtonClicked = function() {
	settings.global = $("#addon_global_settings").is(':checked');

	settings.unit_tooltips = $("#addon_unit_tooltips").is(':checked');
	settings.ut_strength_weakness = $("#addon_ut_sub_sw").is(':checked');
	settings.ut_title = $("#addon_ut_sub_title").is(':checked');
	settings.ut_speed = $("#addon_ut_sub_speed").is(':checked');

	settings.guard_info = $("#addon_guard_info").is(':checked');
	settings.shaman = $("#addon_shaman").is(':checked');
	settings.unit_totals = $("#addon_unit_totals").is(':checked');
	settings.res_calc = $("#addon_res_calc").is(':checked');
 	settings.format_tick = $("#addon_format_tick").is(':checked');
 	settings.update_layout = $("#addon_update_layout").is(':checked');
	settings.hide_h_scrollbar = $("#addon_hide_h_scrollbar").is(':checked');
	settings.change_title = $("#addon_change_title").is(':checked')
			? "Xhodon - %BUILD_COUNTDOWN" : false;
	settings.dont_block = parseInt( $("#addon_blocking :selected").attr('value') );

	settings.ut_style = $("#addon_ut_style :selected").attr('value');
	settings.gi_style = $("#addon_gi_style :selected").attr('value');

	debug( "storeSettings()" );
	debug( settings );
	storeSettings( settings );

	// Reload website, but don't reload data from server
	if ( !debug_mode ) { // Don't automatically reload in debug mode
		window.location.reload( false );
	}
}

// Run functions that only need to be called once (not after every new ajax_load)
if ( settings.change_title !== false ) {
	if ( settings.change_title.indexOf("%BUILD_COUNTDOWN") != -1 ) {
		setInterval(
			function(){
				if ( typeof(settings.change_title) == 'string' ) {
					xhodon.changeTitle(settings.change_title);
				}
			}, 1000 );
	} else {
		xhodon.changeTitle(settings.change_title);
	}
}
