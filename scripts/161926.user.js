// ==UserScript==
// @name           X-Addon
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @namespace      Xhodon
// @description    Addon for Xhodon
// @author         Friedrich Puelz, rewritten by nigr(A)ngelus
// @email          fpuelz@gmx.de, nigroangelus@arcor.de
// @license        GPL v2
// @include        http://*.xhodon.*
// @exclude        http://forum.xhodon.*
// @exclude        http://wiki*.xhodon.*
// @exclude        http://chat.xhodon.*
// @version        0.3.7
// @history        0.3.7        03/13/2013: includet guards till lv 17 in Feen
// @history        0.3.7 	07/20/2011: just saving Ress, injecting gold value to Altar
// @history        0.3.6 	04/12/2011: updated to new layout of xhodon, added new guard-infos (Lv.17), new update-routine
// @history        0.3.5 	03/13/2011: fixed elv_magican (not shown before), fixed values for elv_magican doubleaxe_dwarf fire_fay for TrollWelt, fixed bug in guardian preview (works until W14 now), added server selection for guardian units (more work needed). thx to Caraliran!
// @history        0.3.4 	11/25/2010: Provide different styles for unit tooltips and guard info, Store hero attributes and other data seperately for each world, allow to store settings only for the current world, different unit/guard values for each world, Changes from 'nigroangelus': Values for all guard units, values for units/guards in the fairy world, better guard info style
// @history        0.3.3 	11/24/2010: The browser title can now be changed, using ext. script for update checking, now using GM_getValue/GM_setValue to store settings, more unit tooltip options
// @history        0.3.2 	11/22/2010: AddOn settings are now available in the profile page through a new button under "Account settings", new values for the shaman hut (unicorns, storm faries).
// @history        0.3.1 	11/20/2010: Nicer AddOn settings with tooltips, new unit values for the shaman hut (axe swinging dwarfs, double axe dwarfs, elven archer), formatted tick countdown.
// @history        0.3 		11/19/2010: Addon settings can now be stored in a cookie, at the top left corner an "add-on" button is added, each feature can be enabled/disabled separately.
// @history        0.2 		11/19/2010: Separate total values for units of the hero / in the cave and units in the palace, unit tooltips now additionaly display values of a single unit, in the "load hero" page the points are no longer added for all units (only in the tooltip), the script now doesn't not run sometimes any longer.
// @history        0.1.1	11/12/2010: Several optimizations (~6 times faster) + compiled with Google Closure Compiler.
// @history        0.1		11/11/2010: Initial version.
// ==/UserScript==

// Print a debug message on the console. Does nothing if debug_mode is false.
var xVersion="0.3.7";
var xID="95697";
var debug_mode=true;
var debug=((debug_mode&&console&&typeof (console.log)=='function')?function (text) {console.log(text);}:function (text) {});

// Default settings
var settings={
	global:true, // Whether or not these settings are global to all worlds
	guard_info:true, // Show guard info elements
	shaman:true, // Add elements to the shaman hut
	unit_tooltips:true, // Add unit tooltips
	ut_strength_weakness:true, // Show strength/weakness info in unit tooltips
	ut_title:true, // Show a title with a unit image for each unit tooltip
	ut_speed:true, // Show unit speed in unit tooltips
	ut_style:"default", // Style for unit tooltips (default,colorful,small)
	gi_style:"default", // Style for guard info (default,small)
	unit_totals:true, // Add total points and a tooltip with total unit values
	res_calc:true, // Add calculated values to resource building pages
	format_tick:true, // Formats the tick countdown accordingly to it's value
	hide_h_scrollbar:true, // Hide horizontal scrollbar
	dont_block:0 // Call AddOn functions after page has loaded or not (0: directly, 1: some directly, 2: no blocking calls)
}
var HeroData={}
if (GM_getValue("HeroData")) {HeroData=unserialize(GM_getValue("HeroData")); debug("--> GM_getValue('HeroData') Hero stats");}
var ItemBonus={}
if (GM_getValue("ItemBonus")) {ItemBonus=unserialize(GM_getValue("ItemBonus")); debug("--> GM_getValue('ItemBonus') Item effects");}
var Resources=[];
if (GM_getValue("Resources")) {Resources=unserialize(GM_getValue("Resources")); debug("--> GM_getValue('Resources') Production");}
var Ressis=[];
if (GM_getValue("Ressis")) {Ressis=unserialize(GM_getValue("Ressis")); debug("--> GM_getValue('Ressis') avail Amount");}
var page={name:false};
var cur_hero_attr={attack:0,defense:0,live:0};
var server="";
var palace="";

// *****************************************************
// Collection of xhodon element selectors (jQuery style)
// *****************************************************
var xItems={
	// Matches each resource including an image with a link and the resource count
	res: "#palace_resources td",
	// Matches all occurences of units (in the shaman hut,
	// the hero unit transfer, unit buildings, secret cave ...)
	units: "#transfer_hero_units #transfer_table tr td a, "+
		"#transfer_cave #transfer_table tr td a, "+
		"#current_units_production #current_unit_prduction table tbody tr td div, "+
		"#units_build_list form .pngfix",
	// Multiple items with id "#transfer_table"!
	transfer_left: "#transfer_hero_units #transfer_table .top .gray_first, "+
		"#transfer_cave #transfer_table .top .gray_first",
	transfer_right: "#transfer_hero_units #transfer_table .top .gray_last, "+
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
	// Gets tags containing the attribute name followed by ": " and the attribute value
	hero_type: ".heroes .hero_pic",
	hero_attributes: ".upgrade .upgradeBtns strong",
	// Elements which contain text nodes with end times ("hh:mm:00")
	end_time_containers: "#hero_info, #sidebar",
	// The last button in the profile page, after which a button to access the AddOn settings gets placed
	profile_account_buttons: "#sidebar .button",
	// html body div#main-back div#main-top div#main div#overall-content div#content div#messagecontainer div.top_pic div.message-bottom a.stSubmitBtn
	message_buttons: "#messagecontainer .message-bottom .stSubmitBtn",
	// Moving Heroes
	moving_hero_list: "#moving_heroes table tr td a, ",
		/*+"#moving_heroes table tbody tr",*/
	// Ressource Overview top
	ress: "#palace_resources table tbody tr td a",
	// Item Bonus in Avatar overview
	avatar_values: "#avatar_values table tbody tr"
};

// *****************************************************
// Collection of functions that parse xhodon-HTML-pages.
// *****************************************************
var xGet={
	// Get resources in the current palace
	resources:function (shaman) {
		debug ("--> resources()");
		var res={essences:0,crystals:0,powerStones:0,gold:0,mana:0};
		$(xItems.res).each(function (i) {
			var item=$(this);
			var count=parseInt(item.text().replace(/\./g,''));
			if (i==0) res.essences+=count;
			if (i==1) res.crystals+=count;
			if (i==2) res.powerStones+=count;
			if (i==3) res.gold+=count;
			if (i==4) res.mana+=count;
		});
		if (shaman) return res;
		Ressis[palace]=res;
		GM_setValue("Ressis",serialize(Ressis));
		debug("--> GM_setValue('Ressis',"+palace+":[E,C,S,G,M])");
	},
	// Get current Palace
	curPalace:function () {
		var res=$("#palace_selector").text();
		erg=res.substr((res.indexOf(":"))-2,(res.lastIndexOf(":"))+2);
		return erg;
	},
	// Get Item Bonus
	ItemBonus:function () {
		debug ("--> ItemBonus()");
		ItemBonus={};
		$(xItems.avatar_values).each(function () {
			var modifier=$(this).find("td").eq(0).text();
			var value=$(this).find("td").eq(1).text();
			var type=$(this).find("td").eq(2).text();
			if (typeof(ItemBonus[type])=='undefined') {
				ItemBonus[type]={
					typ:type,
					mod:modifier,
					val:value,
				};
			}
			GM_setValue("ItemBonus",serialize(ItemBonus));
			debug ("### "+type+": "+modifier+" "+value);
		});
	},
	// Returns current heroes attribute
	currentHeroAttributes:function () {
		var erg=$("#hero_name").text();
		var res=HeroData[erg];
		return res;
	},
	// Parses hero attributes and stores them to HeroData[hero_name]
	heroAttributes:function () {
		var hero_name=$("#hero_name").text();
		if (typeof(HeroData[hero_name])=='undefined') {
			HeroData[hero_name]={
				attack:0,
				attack_bonus:0,
				defense:0,
				defense_bonus:0,
				live:0,
				live_bonus:0,
			};
		}
		var hero_type=$(xItems.hero_type);
		var item=$(this)
		if (item.hasClass("hero_pegasus")) {}
		if (item.hasClass("hero_zwerg")) {}
		if (item.hasClass("hero_zentaurus")) {}

		var i=0;
		$(xItems.hero_attributes).each(function () {
			var text=$(this).text();
			var pos=text.indexOf(":");
			if (pos==-1) return;
			var attribute=text.substring(0,pos);
			var value=parseInt(text.substring(pos+1));
			if (isNaN(value)) return;
			switch (attribute) {
				case "Attribute": return;
				case "Angriff": HeroData[hero_name].attack=value;break;
				case "Verteidigung": HeroData[hero_name].defense=value;break;
				case "Leben": HeroData[hero_name].live=value;break;
				default: return;
			}
			++i;
		});

/*		var attack_bonus=0;
		var attack_item=0;
		var defense_bonus=0;
		var defense_item=0;
		var live_bonus=0;
		var live_item=0;
		switch (server) {
			case "zentauren":
			case "riesen":
			case "troll":
				attack_bonus=Math.floor((values.attack/100)*(cur_hero_attr.attack*5));
				defense_bonus=Math.floor((values.defense/100)*(cur_hero_attr.defense*7));
				live_bonus=Math.floor((values.live/100)*(cur_hero_attr.live*1));
			break;
			case "feen":
				attack_bonus=Math.floor((values.attack/100)*(cur_hero_attr.attack*2.4075));
				defense_bonus=Math.floor((values.defense/100)*(cur_hero_attr.defense*2.5));
				live_bonus=Math.floor((values.live/100)*(cur_hero_attr.live*2.6721));
			break;
		}
*/
		GM_setValue("HeroData",serialize(HeroData));
		debug("--> GM_setValue('HeroData',"+hero_name+")");
		return i==3?hero_name:false;
	},
	// Get values from the shaman hut
	shamanValues:function () {
		return {
			remaining:parseInt($(xItems.shaman_remaining).text()),
			perTick:parseInt($(xItems.shaman_perTick).text()),
			limit:parseInt($(xItems.shaman_limit).text())
		}
	}
}


// ******************************************************************************
// Collection of functions that return constant xhodon values (or with a factor).
// ******************************************************************************
var xValues={
	// Returns the server its name
	server:function () {
		var erg=/http:\/\/([^\.]*)\.xhodon.*/;
		var res=erg.exec(document.location);
		return res&&res.length>1?res[1]:"";
	},
	// A list of all available unit names
	unit_list:[
		"unicorn","dragon_egg","goblin","icewarrior","powerchild","hysterical_centauress","warriorpriest",
		"wild_centaur","axe_swinging_dwarf","elven_archer","doubleaxe_dwarf","singing_halfgiant",
		"stone_throwing_troll","treegiant","elv_magican","fire_fay","storm_faerie"
	],
	// Approximate values of a guard of the given guard_level
	guardValues:function (guard_level) {
		switch (server) {
			// n=sqrt((guard_life*guard_defense)/(goblins_life*goblins_attack))
			case "zentauren","riesen":
				switch (guard_level) {
					case 1: return {attack:    25,defense:    25,live:    170,unicorns:   8};
					case 2: return {attack:   185,defense:   185,live:   1400,unicorns:  50};
					case 3: return {attack:  1100,defense:  1100,live:   8500,unicorns: 250};
					case 4: return {attack: 12000,defense: 12000,live: 100000,unicorns: 800};
					case 5: return {attack:125000,defense:125000,live:1000000,unicorns:5000};
				}
				var goblins=4*Math.pow(10,guard_level);
				var unicorns=6*Math.pow(10,guard_level-1);
				return {attack:goblins,defense:goblins,live:25*goblins,unicorns:unicorns};
			break;
			case "feen":
				switch (guard_level) {
					case   1: return {attack:           25,           defense:25,      live:    170,unicorns:  10};
					case   2: return {attack:          175,          defense:175,      live:   1300,unicorns:  30};
					case   3: return {attack:         1800,         defense:1800,      live:  13000,unicorns: 250};
					case   4: return {attack:        31000,        defense:31000,      live: 205000,unicorns: 800};
					case   5: return {attack:       302000,       defense:302000,      live:2200000,unicorns:3500};
					case   6: return {attack:      2800000,       defense:280000,     live:22000000,unicorns:22000};
					case   7: return {attack:     12000000,     defense:12000000,     live:90000000,unicorns:52000};
					case   8: return {attack:     90000000,     defense:90000000,    live:660000000,unicorns:172000};
					case   9: return {attack:    485000000,    defense:485000000,   live:3200000000,unicorns:310000};
					case  10: return {attack:   1750000000,   defense:1750000000,  live:11500000000,unicorns:530000};
					case  11: return {attack:   3450000000,   defense:3450000000,  live:23500000000,unicorns:1435000};
					case  12: return {attack:  12000000000,  defense:12000000000,  live:80000000000,unicorns:1670000};
					case  13: return {attack:  27000000000,  defense:27000000000, live:190000000000,unicorns:3500};
					case  14: return {attack:  70000000000,  defense:70000000000, live:310000000000,unicorns:3500};
					case  15: return {attack: 145000000000, defense:145000000000,live:1000000000000,unicorns:3500};
					case  16: return {attack: 410000000000, defense:410000000000,live:2700000000000,unicorns:3500};
					case  17: return {attack:1400000000000,defense:1400000000000,live:8700000000000,unicorns:3500};
				}
				var goblins=3.1*Math.pow(10,guard_level);
				var unicorns=0.25*Math.pow(10,guard_level);
				return {attack:goblins,defense:goblins,live:7*goblins,unicorns:unicorns};
			break;
			case "troll":
				switch (guard_level) {
					case  1: return {attack:           52,defense:           52,live:           150,unicorns:     10};
					case  2: return {attack:          330,defense:          330,live:          1500,unicorns:     60};
					case  3: return {attack:         2900,defense:         2900,live:         14000,unicorns:    600};
					case  4: return {attack:        27000,defense:        27000,live:        105000,unicorns:   3000};
					case  5: return {attack:       171000,defense:       171000,live:        660000,unicorns:  30000};
					case  6: return {attack:       950000,defense:       950000,live:       2750000,unicorns: 150000};
					case  7: return {attack:      3200000,defense:      3200000,live:      10500000,unicorns: 300000};
					case  8: return {attack:      7900000,defense:      7900000,live:      35200000,unicorns: 500000};
					case  9: return {attack:     16000000,defense:     16000000,live:      77100000,unicorns:1500000};
					case 10: return {attack:    107000000,defense:    107000000,live:     455000000,unicorns:2500000};
					case 11: return {attack:    365000000,defense:    365000000,live:    1550000000,unicorns:5500000};
					case 12: return {attack:   1750000000,defense:   1750000000,live:    8300000000,unicorns:9999999};
					case 13: return {attack:  11610000000,defense:  11610000000,live:   58650000000,unicorns:9999999};
					case 14: return {attack:  74000000000,defense:  74000000000,live:  336000000000,unicorns:9999999};
					case 15: return {attack: 250000000000,defense: 250000000000,live: 1300000000000,unicorns:9999999};
					case 16: return {attack:1455000000000,defense:1455000000000,live: 5840000000000,unicorns:9999999};
					case 17: return {attack:7100000000000,defense:7100000000000,live:36000000000000,unicorns:9999999};
					default: debug ("--> Unknown Guard: "+guard_level+" (happened on Troll)");
				}
			break;
			debug ("--> guardValues() Error using: '"+server+"'");
			default: return {attack:9999999999999999,defense:9999999999999999,live:9999999999999999,unicorns:9999999};
		}
	},
	// Get unit values from the given unit_name
	baseUnitValues:function (unit_name) {
		switch (server) {
		case "troll":
			switch (unit_name) {
				case "unicorn":					return{id:unit_name,attack: 0,defense: 0,live: 20,speed:2,points:   7,reviveMushrooms:   3,revivePowerStones:   120,name:'Einhornwagen'};
				case "dragon_egg":				return{id:unit_name,attack: 1,defense: 1,live: 80,speed:5,points:2251,reviveMushrooms:3000,revivePowerStones:120000,name:'Dracheneier'};
				case "goblin":					return{id:unit_name,attack: 1,defense: 1,live: 25,speed:4,points:   5,reviveMushrooms:   3,revivePowerStones:   120,name:'Kobolde'};
				case "icewarrior":				return{id:unit_name,attack: 2,defense: 2,live: 60,speed:4,points:  10,reviveMushrooms:   5,revivePowerStones:   200,name:'Eiskrieger'};
				case "powerchild":				return{id:unit_name,attack: 3,defense: 3,live: 15,speed:5,points:   6,reviveMushrooms:   3,revivePowerStones:   120,name:'Kinder der Macht'};
				case "hysterical_centauress":	return{id:unit_name,attack: 4,defense: 4,live: 19,speed:3,points:  11,reviveMushrooms:   7,revivePowerStones:   280,name:'Hysterische Zentaurinnen'};
				case "warriorpriest":			return{id:unit_name,attack: 4,defense: 4,live: 65,speed:4,points:  17,reviveMushrooms:  10,revivePowerStones:   400,name:'Kriegerpriester'};
				case "wild_centaur":			return{id:unit_name,attack: 9,defense: 8,live: 31,speed:3,points:  21,reviveMushrooms:  13,revivePowerStones:   520,name:'Wilde Zentauren'};
				case "axe_swinging_dwarf":		return{id:unit_name,attack: 6,defense: 7,live:120,speed:4,points:  32,reviveMushrooms:  19,revivePowerStones:   760,name:'Axtschwingende Zwerge'};
				case "elven_archer":			return{id:unit_name,attack:15,defense:17,live:058,speed:4,points:  36,reviveMushrooms:  21,revivePowerStones:   840,name:'Elfenbogensch&uuml;tzen'};
				case "doubleaxe_dwarf":			return{id:unit_name,attack: 6,defense: 7,live:120,speed:5,points:  32,reviveMushrooms:  25,revivePowerStones:  1000,name:'Doppelaxtzwerge'};
				case "singing_halfgiant":		return{id:unit_name,attack:13,defense:14,live:280,speed:3,points:  96,reviveMushrooms:  58,revivePowerStones:     0,name:'Singende Halbriesen'};
				case "stone_throwing_troll":	return{id:unit_name,attack:26,defense:24,live:500,speed:5,points: 135,reviveMushrooms:  81,revivePowerStones:     0,name:'Steinwerfende Bergtrolle'};
				case "treegiant":				return{id:unit_name,attack:32,defense:32,live:120,speed:5,points:  70,reviveMushrooms:  42,revivePowerStones:     0,name:'Baumriese'};
				case "elv_magican":				return{id:unit_name,attack:36,defense:36,live:125,speed:3,points: 108,reviveMushrooms:  65,revivePowerStones:     0,name:'Elfenmagier'};
				case "fire_fay":				return{id:unit_name,attack:20,defense:20,live: 23,speed:3,points:  30,reviveMushrooms:  19,revivePowerStones:     0,name:'Feuerfeen'};
				case "storm_faerie":			return{id:unit_name,attack: 1,defense: 8,live: 65,speed:2,points:  33,reviveMushrooms:  20,revivePowerStones:   800,name:'Sturmfeen'};
				default:						return {}; // Guard
			}
		break;
		case "zentauren":
			switch (unit_name) {
				case "unicorn":					return {id:unit_name,attack: 0,defense: 0,live: 20,speed:2,points:   7,reviveMushrooms:   3,revivePowerStones:   120,name:'Einhornwagen'};
				case "dragon_egg":				return {id:unit_name,attack: 1,defense: 1,live: 80,speed:5,points:2251,reviveMushrooms:3000,revivePowerStones:120000,name:'Dracheneier'};
				case "goblin":					return {id:unit_name,attack: 1,defense: 1,live: 25,speed:4,points:   5,reviveMushrooms:   3,revivePowerStones:   120,name:'Kobolde'};
				case "icewarrior":				return {id:unit_name,attack: 2,defense: 3,live: 50,speed:5,points:  10,reviveMushrooms:   5,revivePowerStones:   200,name:'Eiskrieger'};
				case "powerchild":				return {id:unit_name,attack: 3,defense: 3,live: 15,speed:5,points:   6,reviveMushrooms:   3,revivePowerStones:   120,name:'Kinder der Macht'};
				case "hysterical_centauress":	return {id:unit_name,attack: 4,defense: 4,live: 19,speed:3,points:  11,reviveMushrooms:   7,revivePowerStones:   280,name:'Hysterische Zentaurinnen'};
				case "warriorpriest":			return {id:unit_name,attack: 4,defense: 4,live: 65,speed:4,points:  17,reviveMushrooms:  10,revivePowerStones:   400,name:'Kriegerpriester'};
				case "wild_centaur":			return {id:unit_name,attack: 9,defense: 8,live: 31,speed:3,points:  21,reviveMushrooms:  13,revivePowerStones:   520,name:'Wilde Zentauren'};
				case "axe_swinging_dwarf":		return {id:unit_name,attack: 6,defense: 7,live:120,speed:4,points:  32,reviveMushrooms:  19,revivePowerStones:   760,name:'Axtschwingende Zwerge'};
				case "elven_archer":			return {id:unit_name,attack:15,defense:17,live: 58,speed:4,points:  36,reviveMushrooms:  21,revivePowerStones:   840,name:'Elfenbogensch&uuml;tzen'};
				case "doubleaxe_dwarf":			return {id:unit_name,attack: 9,defense: 8,live:165,speed:5,points:  43,reviveMushrooms:  25,revivePowerStones:  1000,name:'Doppelaxtzwerge'};
				case "singing_halfgiant":		return {id:unit_name,attack:13,defense:14,live:280,speed:3,points:  96,reviveMushrooms:  58,revivePowerStones:     0,name:'Singende Halbriesen'};
				case "stone_throwing_troll":	return {id:unit_name,attack:26,defense:24,live:500,speed:5,points: 135,reviveMushrooms:  81,revivePowerStones:     0,name:'Steinwerfende Bergtrolle'};
				case "treegiant":				return {id:unit_name,attack:32,defense:32,live:120,speed:5,points:  70,reviveMushrooms:  42,revivePowerStones:     0,name:'Baumriese'};
				case "elv_magican":				return {id:unit_name,attack:36,defense:36,live:125,speed:3,points: 108,reviveMushrooms:  65,revivePowerStones:     0,name:'Elfenmagier'};
				case "fire_fay":				return {id:unit_name,attack:19,defense:19,live: 23,speed:3,points:  30,reviveMushrooms:  19,revivePowerStones:     0,name:'Feuerfeen'};
				case "storm_faerie":			return {id:unit_name,attack: 1,defense: 8,live: 65,speed:2,points:  33,reviveMushrooms:  20,revivePowerStones:   800,name:'Sturmfeen'};
				default:						return {}; // Guard
			}
		break;
		case "riesen":
			switch (unit_name) {
				case "unicorn": 				return {id:unit_name,attack: 0,defense: 0,live: 20,speed:2,points:   7,reviveMushrooms:   3,revivePowerStones:   120,name:'Einhornwagen'};
				case "dragon_egg": 				return {id:unit_name,attack: 1,defense: 1,live: 80,speed:5,points:2251,reviveMushrooms:3000,revivePowerStones:120000,name:'Dracheneier'};
				case "goblin": 					return {id:unit_name,attack: 1,defense: 1,live: 25,speed:4,points:   5,reviveMushrooms:   3,revivePowerStones:   120,name:'Kobolde'};
				case "icewarrior": 				return {id:unit_name,attack: 2,defense: 3,live: 50,speed:5,points:  10,reviveMushrooms:   5,revivePowerStones:   200,name:'Eiskrieger'};
				case "powerchild": 				return {id:unit_name,attack: 3,defense: 3,live: 15,speed:5,points:   6,reviveMushrooms:   3,revivePowerStones:   120,name:'Kinder der Macht'};
				case "hysterical_centauress": 	return {id:unit_name,attack: 4,defense: 4,live: 19,speed:3,points:  11,reviveMushrooms:   7,revivePowerStones:   280,name:'Hysterische Zentaurinnen'};
				case "warriorpriest": 			return {id:unit_name,attack: 4,defense: 4,live: 65,speed:4,points:  17,reviveMushrooms:  10,revivePowerStones:   400,name:'Kriegerpriester'};
				case "wild_centaur": 			return {id:unit_name,attack: 9,defense: 8,live: 31,speed:3,points:  21,reviveMushrooms:  13,revivePowerStones:   520,name:'Wilde Zentauren'};
				case "axe_swinging_dwarf": 		return {id:unit_name,attack: 6,defense: 7,live:120,speed:4,points:  32,reviveMushrooms:  19,revivePowerStones:   760,name:'Axtschwingende Zwerge'};
				case "elven_archer": 			return {id:unit_name,attack:15,defense:17,live: 58,speed:4,points:  36,reviveMushrooms:  21,revivePowerStones:   840,name:'Elfenbogensch&uuml;tzen'};
				case "doubleaxe_dwarf": 		return {id:unit_name,attack: 9,defense: 8,live:165,speed:5,points:  43,reviveMushrooms:  25,revivePowerStones:  1000,name:'Doppelaxtzwerge'};
				case "singing_halfgiant": 		return {id:unit_name,attack:13,defense:14,live:280,speed:3,points:  96,reviveMushrooms:  58,revivePowerStones:     0,name:'Singende Halbriesen'};
				case "stone_throwing_troll": 	return {id:unit_name,attack:26,defense:24,live:500,speed:5,points: 135,reviveMushrooms:  81,revivePowerStones:     0,name:'Steinwerfende Bergtrolle'};
				case "treegiant": 				return {id:unit_name,attack:32,defense:32,live:120,speed:5,points:  70,reviveMushrooms:  42,revivePowerStones:     0,name:'Baumriese'};
				case "elv_magican": 			return {id:unit_name,attack:36,defense:36,live:125,speed:3,points: 108,reviveMushrooms:  65,revivePowerStones:     0,name:'Elfenmagier'};
				case "fire_fay": 				return {id:unit_name,attack:19,defense:19,live: 23,speed:3,points:  30,reviveMushrooms:  19,revivePowerStones:     0,name:'Feuerfeen'};
				case "storm_faerie": 			return {id:unit_name,attack: 1,defense: 8,live: 65,speed:2,points:  33,reviveMushrooms:  20,revivePowerStones:   800,name:'Sturmfeen'};
				default: 						return {}; // Guard
			}
		break;
		case "feen":
			switch (unit_name) {
				case "unicorn": 				return {id:unit_name,attack: 0,defense: 0,live: 20,speed:2,points:   7,reviveMushrooms:   3,revivePowerStones:   120,name:'Einhornwagen'};
				case "dragon_egg": 				return {id:unit_name,attack: 1,defense: 1,live: 80,speed:4,points:2251,reviveMushrooms:3000,revivePowerStones:120000,name:'Dracheneier'};
				case "goblin": 					return {id:unit_name,attack: 1,defense: 1,live: 25,speed:4,points:   5,reviveMushrooms:   3,revivePowerStones:   120,name:'Kobolde'};
				case "icewarrior": 				return {id:unit_name,attack: 2,defense: 3,live: 50,speed:4,points:  10,reviveMushrooms:   5,revivePowerStones:   200,name:'Eiskrieger'};
				case "powerchild": 				return {id:unit_name,attack: 3,defense: 3,live: 15,speed:4,points:   6,reviveMushrooms:   3,revivePowerStones:   120,name:'Kinder der Macht'};
				case "hysterical_centauress": 			return {id:unit_name,attack: 4,defense: 4,live: 19,speed:2,points:  12,reviveMushrooms:   7,revivePowerStones:   280,name:'Hysterische Zentaurinnen'};
				case "warriorpriest": 				return {id:unit_name,attack: 4,defense: 4,live: 65,speed:3,points:  19,reviveMushrooms:  10,revivePowerStones:   400,name:'Kriegerpriester'};
				case "wild_centaur": 				return {id:unit_name,attack: 9,defense: 8,live: 31,speed:2,points:  23,reviveMushrooms:  13,revivePowerStones:   520,name:'Wilde Zentauren'};
				case "axe_swinging_dwarf": 			return {id:unit_name,attack: 6,defense: 7,live:120,speed:3,points:  35,reviveMushrooms:  19,revivePowerStones:   760,name:'Axtschwingende Zwerge'};
				case "elven_archer": 				return {id:unit_name,attack:17,defense:19,live: 64,speed:3,points:  40,reviveMushrooms:  21,revivePowerStones:   840,name:'Elfenbogensch&uuml;tzen'};
				case "doubleaxe_dwarf": 			return {id:unit_name,attack:10,defense: 9,live:182,speed:4,points:  49,reviveMushrooms:  25,revivePowerStones:  1000,name:'Doppelaxtzwerge'};
				case "singing_halfgiant": 			return {id:unit_name,attack:16,defense:17,live:336,speed:2,points: 105,reviveMushrooms:  58,revivePowerStones:  2320,name:'Singende Halbriesen'};
				case "stone_throwing_troll": 			return {id:unit_name,attack:34,defense:31,live:650,speed:4,points: 154,reviveMushrooms:  81,revivePowerStones:  3240,name:'Steinwerfende Bergtrolle'};
				case "treegiant": 				return {id:unit_name,attack:38,defense:38,live:144,speed:4,points:  77,reviveMushrooms:  42,revivePowerStones:  1680,name:'Baumriese'};
				case "elv_magican": 				return {id:unit_name,attack:47,defense:47,live:163,speed:2,points: 122,reviveMushrooms:  65,revivePowerStones:  2600,name:'Elfenmagier'};
				case "fire_fay": 				return {id:unit_name,attack:19,defense:19,live: 23,speed:2,points:  30,reviveMushrooms:  19,revivePowerStones:   760,name:'Feuerfeen'};
				case "storm_faerie": 				return {id:unit_name,attack: 1,defense: 8,live: 65,speed:1,points:  33,reviveMushrooms:  20,revivePowerStones:   800,name:'Sturmfeen'};
				default: 					return {}; // Guard
			}
		break;
		debug ("--> baseUnitValues() Error using: '"+server+"'");
		default: return {};
		}
	},
	// Get unit special abilities from the given unit_name
	unitInfosByName:function (unit_name) {
		switch (unit_name) {
			case "unicorn": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: "(keine)",
				weakness: "(keine)"
				});
			case "dragon_egg": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: "(keine)",
				weakness: "(keine)"
				});
			case "goblin": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('fire_fay',"4fach", 'stone_throwing_troll',"2fach"),
				weakness: xHtml.unitAddInfo('icewarrior', "2fach", 'hysterical_centauress', "4fach")
				});
			case "icewarrior": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('elv_magican',"4fach", 'goblin',"2fach")
				+xHtml.unitImageAndText('default',"1/9&nbsp;von&nbsp;Midgardschlangen"),
				weakness: xHtml.unitAddInfo('warriorpriest', "2fach", 'fire_fay', "4fach")
				});
			case "powerchild": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('stone_throwing_troll',"4fach", 'fire_fay',"2fach")
				+xHtml.unitImageAndText('default',"1/6&nbsp;von&nbsp;Midgardschlangen"),
				weakness: xHtml.unitAddInfo('hysterical_centauress', "2fach", 'warriorpriest', "4fach")
				});
			case "hysterical_centauress": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('goblin',"4fach", 'powerchild',"2fach")
				+xHtml.unitImageAndText('default',"1/6&nbsp;von&nbsp;Feuerteufel"),
				weakness: xHtml.unitAddInfo('wild_centaur', "2fach", 'axe_swinging_dwarf', "4fach")
				});
			case "warriorpriest": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('powerchild',"4fach", 'icewarrior',"2fach")
				+xHtml.unitImageAndText('default',"1/6&nbsp;von&nbsp;Feuerteufel"),
				weakness: xHtml.unitAddInfo('axe_swinging_dwarf', "2fach", 'wild_centaur', "4fach")
				});
			case "wild_centaur": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('warriorpriest',"4fach", 'hysterical_centauress',"2fach")
				+xHtml.unitImageAndText('default',"1/12&nbsp;von&nbsp;Zyklopen"),
				weakness: xHtml.unitAddInfo('elven_archer', "2fach", 'doubleaxe_dwarf', "4fach")
				});
			case "axe_swinging_dwarf": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('hysterical_centauress',"4fach", 'warriorpriest',"2fach")
				+xHtml.unitImageAndText('default',"1/14&nbsp;von&nbsp;Zyklopen"),
				weakness: xHtml.unitAddInfo('doubleaxe_dwarf', "2fach", 'elven_archer', "4fach")
				});
			case "elven_archer": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('axe_swinging_dwarf',"4fach", 'wild_centaur',"2fach")
				+xHtml.unitImageAndText('default',"1/18&nbsp;von&nbsp;Zyklopen"),
				weakness: xHtml.unitAddInfo('treegiant', "2fach", 'singing_halfgiant', "4fach")
				});
			case "doubleaxe_dwarf": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('wild_centaur',"4fach", 'axe_swinging_dwarf',"2fach")
				+xHtml.unitImageAndText('default',"1/20&nbsp;von&nbsp;Zyklopen"),
				weakness: xHtml.unitAddInfo('singing_halfgiant', "2fach", 'treegiant', "4fach")
				});
			case "singing_halfgiant": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('elven_archer',"4fach", 'doubleaxe_dwarf',"2fach")
				+xHtml.unitImageAndText('default',"1/25&nbsp;von&nbsp;Todesengel"),
				weakness: xHtml.unitAddInfo('stone_throwing_troll', "2fach", 'elv_magican', "4fach")
				});
			case "stone_throwing_troll": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('treegiant',"4fach", 'singing_halfgiant',"2fach")
				+xHtml.unitImageAndText('default',"1/45&nbsp;von&nbsp;Todesengel"),
				weakness: xHtml.unitAddInfo('goblin', "2fach", 'powerchild', "4fach")
				});
			case "treegiant": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('doubleaxe_dwarf',"4fach", 'elven_archer',"2fach")
				+xHtml.unitImageAndText('default',"1/30&nbsp;von&nbsp;Todesengel"),
				weakness: xHtml.unitAddInfo('elv_magican', "2fach", 'stone_throwing_troll', "4fach")
				});
			case "elv_magican": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('singing_halfgiant',"4fach", 'treegiant',"2fach")
				+xHtml.unitImageAndText('default',"1/35&nbsp;von&nbsp;Todesengel"),
				weakness: xHtml.unitAddInfo('fire_fay', "2fach", 'icewarrior', "4fach")
				});
			case "fire_fay": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: xHtml.unitAddInfo('icewarrior',"4fach", 'elv_magican',"2fach")
				+xHtml.unitImageAndText('default',"1/9&nbsp;von&nbsp;Feuerteufel"),
				weakness: xHtml.unitAddInfo('powerchild', "2fach", 'goblin', "4fach")
				});
			case "storm_faerie": return $.extend(xValues.baseUnitValues(unit_name),{
				strength: "(keine)",
				weakness: "(keine)"
				});
			debug ("--> unitInfosByName() Error using: '"+unit_name+"'");
			default: return {};
		}
	},
	// Get unit values in an object {one,total},
	unitInfos:function (item,count) {
		if (isNaN(count)||typeof(count)=='undefined'||count<0) count=1;
		var values={};
		// Test for named units
		for (i=0;i<xValues.unit_list.length;++i) {
			var unit_name=xValues.unit_list[i];
			if (item.hasClass("unit_"+unit_name)) {values=xValues.unitInfosByName(unit_name); break;}
		}
		// Else it should be a guard
		if (item.hasClass("unit_default")) {
			var id_test=item.attr('href').match(/&id=(\d+)$/);
			if (id_test) {
				var unit_id=parseInt(id_test[1]);
				switch (server) {
				case "zentauren":
                         switch (unit_id) { 
                         case 18: values={id:unit_id,attack:  1,defense:  1,live:   8,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Wurzelwichte'};break; 
                         case 19: values={id:unit_id,attack:  2,defense:  2,live:  12,speed:4,points: 0,reviveMushrooms:0,revivePowerStones:0,name:'Fleischhummeln'};break; 
                         case 21: values={id:unit_id,attack:  3,defense:  3,live:  20,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Gnome'};break; 
                         case 22: values={id:unit_id,attack:  3,defense:  3,live:  24,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Irrlichter'};break; 
                         case 23: values={id:unit_id,attack:  4,defense:  4,live:  28,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Skr&auml;linge'};break; 
                         case 24: values={id:unit_id,attack:  4,defense:  4,live:  32,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Warzengiftratten'};break; 
                         case 25: values={id:unit_id,attack:  5,defense:  5,live:  36,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Sylphen'};break; 
                         case 26: values={id:unit_id,attack:  5,defense:  5,live:  40,speed:3,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Midgardschlangen'};break; 
                         case 27: values={id:unit_id,attack:  6,defense:  6,live:  44,speed:4,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Nymphen'};break; 
                         case 28: values={id:unit_id,attack:  7,defense:  7,live:  48,speed:4,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Schlingpflanzen'};break; 
                         case 29: values={id:unit_id,attack:  8,defense:  8,live:  52,speed:4,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Meerjungfrauen'};break; 
                         case 30: values={id:unit_id,attack:  9,defense:  9,live:  56,speed:4,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Werw&ouml;lfe'};break; 
                         case 31: values={id:unit_id,attack: 10,defense: 10,live:  66,speed:4,points: 3,reviveMushrooms:0,revivePowerStones:0,name:'Gorgonen'};break; 
                         case 32: values={id:unit_id,attack: 11,defense: 11,live:  70,speed:4,points: 3,reviveMushrooms:0,revivePowerStones:0,name:'Harpien'};break; 
                         case 33: values={id:unit_id,attack: 12,defense: 12,live:  88,speed:4,points: 3,reviveMushrooms:0,revivePowerStones:0,name:'Weissadler'};break; 
                         case 34: values={id:unit_id,attack: 13,defense: 13,live: 100,speed:4,points: 3,reviveMushrooms:0,revivePowerStones:0,name:'Morlocks'};break; 
                         case 35: values={id:unit_id,attack: 14,defense: 14,live: 110,speed:4,points: 4,reviveMushrooms:0,revivePowerStones:0,name:'RiesenMarokspinnen'};break; 
                         case 36: values={id:unit_id,attack: 15,defense: 15,live:  90,speed:3,points: 4,reviveMushrooms:0,revivePowerStones:0,name:'Feuerteufel'};break; 
                         case 37: values={id:unit_id,attack: 16,defense: 16,live: 120,speed:4,points: 4,reviveMushrooms:0,revivePowerStones:0,name:'Fenrisw&ouml;lfe'};break; 
                         case 38: values={id:unit_id,attack: 17,defense: 17,live: 130,speed:4,points: 5,reviveMushrooms:0,revivePowerStones:0,name:'D&auml;monen'};break; 
                         case 39: values={id:unit_id,attack: 18,defense: 18,live: 140,speed:5,points: 5,reviveMushrooms:0,revivePowerStones:0,name:'Horngolems'};break; 
                         case 40: values={id:unit_id,attack: 19,defense: 19,live: 150,speed:5,points: 6,reviveMushrooms:0,revivePowerStones:0,name:'Sonnenpferde'};break; 
                         case 41: values={id:unit_id,attack: 20,defense: 20,live: 170,speed:5,points: 6,reviveMushrooms:0,revivePowerStones:0,name:'Minotauren'};break; 
                         case 42: values={id:unit_id,attack: 22,defense: 22,live: 190,speed:5,points: 7,reviveMushrooms:0,revivePowerStones:0,name:'Greife'};break; 
                         case 43: values={id:unit_id,attack: 23,defense: 23,live: 210,speed:5,points: 7,reviveMushrooms:0,revivePowerStones:0,name:'Blutalben'};break; 
                         case 44: values={id:unit_id,attack: 25,defense: 25,live: 160,speed:5,points: 8,reviveMushrooms:0,revivePowerStones:0,name:'Zyklopen'};break; 
                         case 45: values={id:unit_id,attack: 28,defense: 28,live: 230,speed:5,points: 9,reviveMushrooms:0,revivePowerStones:0,name:'Mantikoren'};break; 
                         case 46: values={id:unit_id,attack: 35,defense: 35,live: 260,speed:5,points:10,reviveMushrooms:0,revivePowerStones:0,name:'Behemoths'};break; 
                         case 47: values={id:unit_id,attack: 40,defense: 40,live: 300,speed:5,points:12,reviveMushrooms:0,revivePowerStones:0,name:'Oger'};break; 
                         case 48: values={id:unit_id,attack: 50,defense: 50,live: 390,speed:5,points:15,reviveMushrooms:0,revivePowerStones:0,name:'Sandw&uuml;rmer'};break; 
                         case 49: values={id:unit_id,attack: 60,defense: 60,live: 400,speed:5,points:20,reviveMushrooms:0,revivePowerStones:0,name:'Todesengel'};break; 
                         case 50: values={id:unit_id,attack: 80,defense: 80,live: 630,speed:5,points:24,reviveMushrooms:0,revivePowerStones:0,name:'GoldeneSphinx'};break; 
                         case 51: values={id:unit_id,attack:100,defense:100,live: 700,speed:5,points:30,reviveMushrooms:0,revivePowerStones:0,name:'Feuerstacheldrachen'};break; 
                         case 52: values={id:unit_id,attack:150,defense:150,live: 920,speed:5,points:40,reviveMushrooms:0,revivePowerStones:0,name:'Eisaugendrachen'};break; 
                         case 53: values={id:unit_id,attack:200,defense:200,live:1200,speed:5,points:50,reviveMushrooms:0,revivePowerStones:0,name:'Schlangenhalsdrachen'};break; 
                         default: debug ("--> Unknown UnitID: "+unit_id+" (zentauren)"); 
                         } 
                break;
				case "riesen":
				case "feen":
					switch (unit_id) {
					case 18: values={id:unit_id,attack:  1,defense:  1,live:   8,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Wurzelwichte'};break;
					case 19: values={id:unit_id,attack:  2,defense:  2,live:  12,speed:4,points: 0,reviveMushrooms:0,revivePowerStones:0,name:'Fleischhummeln'};break;
					case 21: values={id:unit_id,attack:  3,defense:  3,live:  20,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Gnome'};break;
					case 22: values={id:unit_id,attack:  3,defense:  3,live:  24,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Irrlichter'};break;
					case 23: values={id:unit_id,attack:  4,defense:  4,live:  28,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Skr&auml;linge'};break;
					case 24: values={id:unit_id,attack:  4,defense:  4,live:  32,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Warzengiftratten'};break;
					case 25: values={id:unit_id,attack:  5,defense:  5,live:  36,speed:4,points: 1,reviveMushrooms:0,revivePowerStones:0,name:'Sylphen'};break;
					case 26: values={id:unit_id,attack:  5,defense:  5,live:  40,speed:3,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Midgardschlangen'};break;
					case 27: values={id:unit_id,attack:  6,defense:  6,live:  44,speed:4,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Nymphen'};break;
					case 28: values={id:unit_id,attack:  7,defense:  7,live:  48,speed:4,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Schlingpflanzen'};break;
					case 29: values={id:unit_id,attack:  8,defense:  8,live:  52,speed:4,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Meerjungfrauen'};break;
					case 30: values={id:unit_id,attack:  9,defense:  9,live:  56,speed:4,points: 2,reviveMushrooms:0,revivePowerStones:0,name:'Werw&ouml;lfe'};break;
					case 31: values={id:unit_id,attack: 10,defense: 10,live:  66,speed:4,points: 3,reviveMushrooms:0,revivePowerStones:0,name:'Gorgonen'};break;
					case 32: values={id:unit_id,attack: 11,defense: 11,live:  70,speed:4,points: 3,reviveMushrooms:0,revivePowerStones:0,name:'Harpien'};break;
					case 33: values={id:unit_id,attack: 12,defense: 12,live:  88,speed:4,points: 3,reviveMushrooms:0,revivePowerStones:0,name:'Weissadler'};break;
					case 34: values={id:unit_id,attack: 13,defense: 13,live: 100,speed:4,points: 3,reviveMushrooms:0,revivePowerStones:0,name:'Morlocks'};break;
					case 35: values={id:unit_id,attack: 14,defense: 14,live: 110,speed:4,points: 4,reviveMushrooms:0,revivePowerStones:0,name:'RiesenMarokspinnen'};break;
					case 36: values={id:unit_id,attack: 15,defense: 15,live:  90,speed:3,points: 4,reviveMushrooms:0,revivePowerStones:0,name:'Feuerteufel'};break;
					case 37: values={id:unit_id,attack: 16,defense: 16,live: 120,speed:4,points: 4,reviveMushrooms:0,revivePowerStones:0,name:'Fenrisw&ouml;lfe'};break;
					case 38: values={id:unit_id,attack: 17,defense: 17,live: 130,speed:4,points: 5,reviveMushrooms:0,revivePowerStones:0,name:'D&auml;monen'};break;
					case 39: values={id:unit_id,attack: 18,defense: 18,live: 140,speed:5,points: 5,reviveMushrooms:0,revivePowerStones:0,name:'Horngolems'};break;
					case 40: values={id:unit_id,attack: 19,defense: 19,live: 150,speed:5,points: 6,reviveMushrooms:0,revivePowerStones:0,name:'Sonnenpferde'};break;
					case 41: values={id:unit_id,attack: 20,defense: 20,live: 170,speed:5,points: 6,reviveMushrooms:0,revivePowerStones:0,name:'Minotauren'};break;
					case 42: values={id:unit_id,attack: 22,defense: 22,live: 190,speed:5,points: 7,reviveMushrooms:0,revivePowerStones:0,name:'Greife'};break;
					case 43: values={id:unit_id,attack: 23,defense: 23,live: 210,speed:5,points: 7,reviveMushrooms:0,revivePowerStones:0,name:'Blutalben'};break;
					case 44: values={id:unit_id,attack: 25,defense: 25,live: 160,speed:4,points: 8,reviveMushrooms:0,revivePowerStones:0,name:'Zyklopen'};break;
					case 45: values={id:unit_id,attack: 28,defense: 28,live: 230,speed:5,points: 9,reviveMushrooms:0,revivePowerStones:0,name:'Mantikoren'};break;
					case 46: values={id:unit_id,attack: 35,defense: 35,live: 260,speed:5,points:10,reviveMushrooms:0,revivePowerStones:0,name:'Behemoths'};break;
					case 47: values={id:unit_id,attack: 40,defense: 40,live: 300,speed:5,points:12,reviveMushrooms:0,revivePowerStones:0,name:'Oger'};break;
					case 48: values={id:unit_id,attack: 50,defense: 50,live: 390,speed:5,points:15,reviveMushrooms:0,revivePowerStones:0,name:'Sandw&uuml;rmer'};break;
					case 49: values={id:unit_id,attack: 60,defense: 60,live: 400,speed:4,points:20,reviveMushrooms:0,revivePowerStones:0,name:'Todesengel'};break;
					case 50: values={id:unit_id,attack: 80,defense: 80,live: 630,speed:5,points:24,reviveMushrooms:0,revivePowerStones:0,name:'GoldeneSphinx'};break;
					case 51: values={id:unit_id,attack:100,defense:100,live: 700,speed:5,points:30,reviveMushrooms:0,revivePowerStones:0,name:'Feuerstacheldrachen'};break;
					case 52: values={id:unit_id,attack:150,defense:150,live: 920,speed:5,points:40,reviveMushrooms:0,revivePowerStones:0,name:'Eisaugendrachen'};break;
					case 53: values={id:unit_id,attack:200,defense:200,live:1200,speed:5,points:50,reviveMushrooms:0,revivePowerStones:0,name:'Schlangenhalsdrachen'};break;
					default: debug ("--> Unknown UnitID: "+unit_id+" (riesen,feen)");
					}
				break;
				case "troll":
					switch (unit_id) {
					case 18: values={id:unit_id,attack:  1,defense:  1,live:   5,speed:3,points:  2,reviveMushrooms:0,revivePowerStones:0,name:'Wurzelwichte'};break;
					case 19: values={id:unit_id,attack:  2,defense:  2,live:  12,speed:3,points:  2,reviveMushrooms:0,revivePowerStones:0,name:'Fleischhummeln'};break;
					case 21: values={id:unit_id,attack:  2,defense:  2,live:  10,speed:3,points:  5,reviveMushrooms:0,revivePowerStones:0,name:'Gnome'};break;
					case 22: values={id:unit_id,attack:  2,defense:  2,live:   7,speed:3,points:  5,reviveMushrooms:0,revivePowerStones:0,name:'Irrlichter'};break;
					case 23: values={id:unit_id,attack:  3,defense:  3,live:  15,speed:3,points:  7,reviveMushrooms:0,revivePowerStones:0,name:'Skr&auml;linge'};break;
					case 24: values={id:unit_id,attack:  5,defense:  5,live:  11,speed:3,points:  7,reviveMushrooms:0,revivePowerStones:0,name:'Warzengiftratten'};break;
					case 25: values={id:unit_id,attack:  5,defense:  5,live:  18,speed:3,points:  9,reviveMushrooms:0,revivePowerStones:0,name:'Sylphen'};break;
					case 26: values={id:unit_id,attack:  5,defense:  5,live:  11,speed:3,points:  7,reviveMushrooms:0,revivePowerStones:0,name:'Midgardschlangen'};break;
					case 27: values={id:unit_id,attack:  4,defense:  4,live:  28,speed:3,points: 11,reviveMushrooms:0,revivePowerStones:0,name:'Nymphen'};break;
					case 28: values={id:unit_id,attack:  2,defense:  2,live:  47,speed:3,points: 11,reviveMushrooms:0,revivePowerStones:0,name:'Schlingpflanzen'};break;
					case 29: values={id:unit_id,attack:  5,defense:  5,live:  30,speed:3,points: 14,reviveMushrooms:0,revivePowerStones:0,name:'Meerjungfrauen'};break;
					case 30: values={id:unit_id,attack:  6,defense:  6,live:  39,speed:3,points: 16,reviveMushrooms:0,revivePowerStones:0,name:'Werw&ouml;lfe'};break;
					case 31: values={id:unit_id,attack:  8,defense:  8,live:  31,speed:3,points: 16,reviveMushrooms:0,revivePowerStones:0,name:'Gorgonen'};break;
					case 32: values={id:unit_id,attack: 12,defense: 12,live:  25,speed:3,points: 18,reviveMushrooms:0,revivePowerStones:0,name:'Harpien'};break;
					case 33: values={id:unit_id,attack: 10,defense: 10,live:  48,speed:3,points: 23,reviveMushrooms:0,revivePowerStones:0,name:'Weissadler'};break;
					case 34: values={id:unit_id,attack: 12,defense: 12,live:  41,speed:3,points: 23,reviveMushrooms:0,revivePowerStones:0,name:'Morlocks'};break;
					case 35: values={id:unit_id,attack: 16,defense: 16,live:  62,speed:3,points: 34,reviveMushrooms:0,revivePowerStones:0,name:'Riesen Marokspinnen'};break;
					case 36: values={id:unit_id,attack: 14,defense: 14,live:  50,speed:3,points: 27,reviveMushrooms:0,revivePowerStones:0,name:'Feuerteufel'};break;
					case 37: values={id:unit_id,attack: 13,defense: 13,live:  54,speed:3,points: 27,reviveMushrooms:0,revivePowerStones:0,name:'Fenrisw&ouml;lfe'};break;
					case 38: values={id:unit_id,attack: 25,defense: 25,live:  37,speed:3,points: 32,reviveMushrooms:0,revivePowerStones:0,name:'D&auml;monen'};break;
					case 39: values={id:unit_id,attack: 19,defense: 19,live:  58,speed:3,points: 35,reviveMushrooms:0,revivePowerStones:0,name:'Horngolems'};break;
					case 40: values={id:unit_id,attack: 17,defense: 17,live:  81,speed:3,points: 39,reviveMushrooms:0,revivePowerStones:0,name:'Sonnenpferde'};break;
					case 41: values={id:unit_id,attack: 24,defense: 24,live:  53,speed:3,points: 36,reviveMushrooms:0,revivePowerStones:0,name:'Minotauren'};break;
					case 42: values={id:unit_id,attack: 21,defense: 21,live:  66,speed:3,points: 39,reviveMushrooms:0,revivePowerStones:0,name:'Greife'};break;
					case 43: values={id:unit_id,attack: 28,defense: 28,live:  72,speed:3,points: 66,reviveMushrooms:0,revivePowerStones:0,name:'Blutalben'};break;
					case 44: values={id:unit_id,attack: 36,defense: 36,live: 107,speed:3,points: 67,reviveMushrooms:0,revivePowerStones:0,name:'Zyklopen'};break;
					case 45: values={id:unit_id,attack: 35,defense: 35,live: 122,speed:3,points: 68,reviveMushrooms:0,revivePowerStones:0,name:'Mantikoren'};break;
					case 46: values={id:unit_id,attack: 51,defense: 51,live: 156,speed:3,points: 93,reviveMushrooms:0,revivePowerStones:0,name:'Behemoths'};break;
					case 47: values={id:unit_id,attack: 42,defense: 42,live: 301,speed:3,points:118,reviveMushrooms:0,revivePowerStones:0,name:'Oger'};break;
					case 48: values={id:unit_id,attack: 57,defense: 57,live: 376,speed:3,points:155,reviveMushrooms:0,revivePowerStones:0,name:'Sandw&uuml;rmer'};break;
					case 49: values={id:unit_id,attack: 83,defense: 83,live: 198,speed:3,points:134,reviveMushrooms:0,revivePowerStones:0,name:'Todesengel'};break;
					case 50: values={id:unit_id,attack: 75,defense: 75,live: 427,speed:3,points:189,reviveMushrooms:0,revivePowerStones:0,name:'Goldene Sphinx'};break;
					case 51: values={id:unit_id,attack:147,defense:147,live: 888,speed:3,points:380,reviveMushrooms:0,revivePowerStones:0,name:'Feuerstacheldrachen'};break;
					case 52: values={id:unit_id,attack:213,defense:213,live:1365,speed:3,points:566,reviveMushrooms:0,revivePowerStones:0,name:'Eisaugendrachen'};break;
					case 53: values={id:unit_id,attack:263,defense:263,live:2180,speed:3,points:793,reviveMushrooms:0,revivePowerStones:0,name:'Schlangenhalsdrachen'};break;
					default: debug ("--> Unknown UnitID: "+unit_id+" (troll)");
					}
					break;
				debug ("--> Error selecting Server ("+server+") for GuardUID: "+unit_id+"'");
				return false;
				}
			}
			else {return false;}
		}
		if (typeof(values.id)=='undefined') return false;
		return {
			one:values,
			total:{
				id:values.id,
				name:values.name,
				count:count,
				attack:count*values.attack,
				defense:count*values.defense,
				live:count*values.live,
				speed:values.speed,
				points:count*values.points,
				reviveMushrooms:count*values.reviveMushrooms,
				revivePowerStones:count*values.revivePowerStones,
				strength:values.strength,
				weakness:values.weakness
			}
		}
	}
}



// Collection of functions that generate HTML to be inserted into a xhodon-page.
var xHtml={
	// Resource production (on resource building pages)
	addResourceCalculations:function (res_kind) {
		var storyTxt=$('#resource_production .storyTxt');
		if (storyTxt==null) return;
		var text=storyTxt.html();
		if (text==null) return;
		if (text.search(/\/Tick/i)==-1) { // Don't read calculation results
			var erg=/Momentane Produktion:\s+([0-9\.]*)\s+\(\+?(-?[0-9\.]*)\)/i;
			var res=erg.exec(text);
			if (res==null) {
				// Try regular expression for resource buildings without any bonus
				var erg=/Momentane Produktion:\s+([0-9\.]*)/i;
				var res=erg.exec(text);
				if (res==null) return;
			}
			text=text.substr(text.lastIndexOf("Produktion"));
			var baseProduction=parseInt(res[1].replace(/\./g,''));
			var extraProduction=res[2]?parseInt(res[2].replace(/\./g,'')):0;
			var production=baseProduction+extraProduction;
			Resources[palace][res_kind]={basis:baseProduction,bonus:extraProduction};
			GM_setValue("Resources",serialize(Resources));
			debug ("--> GM_setValue('Resources',"+res_kind+" = {base:"+baseProduction+",bonus:"+extraProduction+"})");
			text+="<br/><br/><table class='designedTable'>\
				<thead><tr><td class='gray_first'></td><td class='gray_last'></td></tr></thead>\
				<tbody><tr class='top'>\
					<td class='gray_first'>Produktions-Zeit</td>\
					<td class='gray_last'>Ertrag</td>\
				</tr><tr class='brdTop'>\
					<td class='white_first'>pro Tick</td>\
					<td class='clear_last' align='right'>"+xTools.formatNumber(production)+"</td>\
				</tr><tr class='brdTop'>\
					<td class='white_first'>je Stunde</td>\
					<td class='clear_last' align='right'>"+xTools.formatNumber(production*12)+"</td>\
				</tr><tr class='brdTop'>\
					<td class='white_first'>am Tag</td>\
					<td class='clear_last' align='right'>"+xTools.formatNumber(production*12*24)+"</td>\
				</tr><tr class='brdTop'>\
					<td class='white_first'>in <input type='text' maxlength='3' id='calc_hours'/> Stunden</td>\
					<td class='clear_last' align='right'><span id='calc_ress'>---</span></td>\
				</tr></tbody>\
				<tfoot><tr><td class='white_first'></td><td class='clear_last'></td></tr></tfoot>\
				</table>";
			storyTxt.html(text);
			$("#calc_hours").width(25)
				.keydown(function (e) {
					return(e.which>=1&&e.which<=100)||(e.which>=48&&e.which<=57);
				})
				.keyup(function (e) {
					if ((e.which>=48&&e.which<=57)||e.which==8||e.which==46) {
						var val=$(this).val();
						if (val=="") {$("#calc_ress").html("---");}
						else {var hours=parseInt(val); $("#calc_ress").html(xTools.formatNumber(production*12*hours));}
					}
				});
		}
	},
	// Adds information to the shaman hut
	addShamanHutInfos:function (totalValues) {
		var mushroomTable=$(xItems.shaman_test);
		if (mushroomTable.length==0) {return;}
		mushroomTable.css({'margin-top':-10});
		var mushroom=xGet.shamanValues();
		var perTickRow=$(xItems.shaman_perTickRows);
		while (perTickRow.length>1) {perTickRow.last().remove();perTickRow=$(xItems.shaman_perTickRows);}
		var res=xGet.resources(true);
		var mushroomDiff=totalValues.reviveMushrooms-mushroom.remaining;
		var mushroomTicks=Math.ceil(mushroomDiff/mushroom.perTick);
		var mushroomInfo=mushroomDiff<=0
			?"(<span style='color:darkgreen;'>Genug vorhanden</span>)"
			:"(<span style='color:red;'>noch "+xTools.formatNumber(mushroomDiff)+" verf&uuml;gbar in "+xTools.formatTimeFromTicks(mushroomTicks)+" Stunden</span>)";
		var powerStoneInfo=res.powerStones>=totalValues.revivePowerStones
			?"(<span style='color:darkgreen;'>Genug vorhanden</span>)"
			:"(<span style='color:red;'>es fehlen "+xTools.formatNumber(totalValues.revivePowerStones-res.powerStones)+"</span>)";
		$(xItems.shaman_perTickRow).after("\
			<tr class='brdTop xAddon'>\
				<td class='white_first'>Insgesamt ben&ouml;tigte Pilze</td>\
				<td colspan='2' class='white_last'>"+xTools.formatNumber(totalValues.reviveMushrooms)+" \
				<img alt='Pilze' src='http://xhodon.de/xhodon/gfx/icons/mushrooms.png' class='icon20px'> "+mushroomInfo+"</td>\
			</tr><tr class='brdTop xAddon'>\
				<td class='white_first'>Insgesamt ben&ouml;tigte Kraftsteine</td>\
				<td colspan='2' class='white_last'>"+xTools.formatNumber(totalValues.revivePowerStones)+" \
				<img alt='Kraftsteine' src='http://xhodon.de/xhodon/gfx/icons/kraftstein.png' class='icon20px'> "+powerStoneInfo+"</td>\
			</tr><tr class='brdTop xAddon'>\
				<td class='white_first'>Punkte f&uuml;r alle Wesen</td>\
				<td colspan='2' class='white_last'>"+xTools.formatNumber(totalValues.points)+"</td>\
			</tr>\
		");
	},
	// Adds a tooltip element that is used for all units, update values with adjustUnitTooltip()
	addUniversalUnitTooltip:function () {
		var id="addon_tooltip";
		$("body").append("\
			<div id='wisdom_sidebar' class='sbInnerContainer xAddon addon_ut_a universal'>\
			<table class='designedTable' id='"+id+"'>\
			<thead><tr><td class='clear_first'></td><td class='white_last'></td></tr></thead>\
			<tbody><tr class='top'>\
				<td class='clear_first addon_ut_title' style='text-align:right'></td>\
				<td class='white_last addon_ut_count'></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_label addon_ut_label_attack'>Angriff<span class='addon_ut_attack_info'></span>:</td>\
				<td class='white_last addon_ut_value addon_ut_attack'></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_label addon_ut_label_defense'>Verteidigung<span class='addon_ut_defense_info'></span>:</td>\
				<td class='white_last addon_ut_value addon_ut_defense'></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_label addon_ut_label_live'>Leben<span class='addon_ut_live_info'></span>:</td>\
				<td class='white_last addon_ut_value addon_ut_live'></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_label addon_ut_label_speed'>Geschwindigkeit:</td>\
				<td class='white_last addon_ut_value addon_ut_speed'></td>\
			</tr><tr class='addOnBeforeInfo'>\
				<td class='clear_first addon_ut_label addon_ut_label_points'>Punkte<span class='addon_ut_points_info'></span>:</td>\
				<td class='white_last addon_ut_value addon_ut_points'></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_strength' colspan='2'></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_weakness' colspan='2'></td>\
			</tr></tbody>\
			<tfoot><tr><td class='clear_first'></td><td class='clear_last'></td></tr></tfoot>\
			</table>\
			</div>\
		");
	},
	// Updates the values in the universal unit tooltip created with addUniversalUnitTooltip().
	adjustUnitTooltip:function (count_item,item,tooltip,count,infos,infos_one) {
		tooltip.find(".addon_ut_title").html(xHtml.unitImage(infos.id,true,"addon_ut_img")+"&nbsp;"+infos.name);
		tooltip.find(".addon_ut_count").html(xTools.formatNumber(count));
		tooltip.find(".addon_ut_attack").html(xTools.formatNumber(infos.attack));
		tooltip.find(".addon_ut_defense").html(xTools.formatNumber(infos.defense));
		tooltip.find(".addon_ut_live").html(xTools.formatNumber(infos.live));
		tooltip.find(".addon_ut_speed").html(xTools.formatTpgNumber(infos.speed,"&nbsp;tpg"));
		tooltip.find(".addon_ut_points").html(xTools.formatNumber(infos.points));
		tooltip.find(".addon_ut_attack_info").html("&nbsp;("+xTools.formatNumber(infos_one.attack)+")");
		tooltip.find(".addon_ut_defense_info").html("&nbsp;("+xTools.formatNumber(infos_one.defense)+")");
		tooltip.find(".addon_ut_live_info").html("&nbsp;("+xTools.formatNumber(infos_one.live)+")");
		tooltip.find(".addon_ut_points_info").html("&nbsp;("+xTools.formatNumber(infos_one.points)+")");
		tooltip.find(".addon_ut_strength").html("<span class='addon_ut_label_sw'>St&auml;rken:</span> "+infos.strength);
		tooltip.find(".addon_ut_weakness").html("<span class='addon_ut_label_sw'>Schw&auml;chen:</span> "+infos.weakness);
	},
	// Add Ressource per Tick to the current Palace below its Kind of Resource
	addRessProduction:function () {
		$(xItems.ress).each(function () {
			var basis=0;
			var bonus=0;
			var item=$(this);
			if (item.get(0).tagName=="A") {
				if (!item.hasClass("xAddonItem")) {
					var typ=item.attr('href').substr((item.attr('href').lastIndexOf("="))+1);
					if (Resources[palace]) if (Resources[palace][typ]) {
							basis=Resources[palace][typ].basis||0;
							bonus=Resources[palace][typ].bonus||0;
					}
					item.append("<div align=center>(<font color=green onmouseout=\"nd();\" onmouseover=\"return overlib('\
						Basis:"+xTools.formatNumber(basis)+" - \
						Bonus:"+xTools.formatNumber(bonus)+"');\">+"+
						xTools.formatNumber(basis+bonus)+"</font>)</div>");
					item.addClass("xAddonItem");
				}
			}
		});
	},
	// Add unit tooltips where apropriate and prints points after the units names
	addUnitTooltips:function () {
		var totalValues={attack:0,defense:0,live:0,speed:0,points:0,reviveMushrooms:0,revivePowerStones:0};
		var totalValuesPalace={attack:0,defense:0,live:0,speed:0,points:0,reviveMushrooms:0,revivePowerStones:0};
		var hasPalaceUnits=false;
		$(xItems.units).each(function () {
			var item=$(this);
			var palaceUnit=false;
			if (item.get(0).tagName=="A") {
				var nextItem=item.parent().next();
				if (nextItem&&nextItem.get(0).tagName=="TD") {nextItem=nextItem.next();palaceUnit=nextItem&&nextItem.hasClass("clear_last");}
			}
			item.addClass("xAddonItem");
			var count_item;
			if (item.hasClass("pngfix")) {
				count_item=item.next().children(".top").children("a");
				count_item.addClass("xAddonShaman");
			}
			else {
				count_item=item.parent().next();
				count_item.prev().toggleClass("clear_first white_first");
				count_item.toggleClass("clear_middle white_middle xAddonDefault");
			}
			var count=parseInt(count_item.html().replace(/\.|^Menge:\s*|\s+-\s+[A-Za-z\s]*$/g,''));
			var unit_infos=xValues.unitInfos(item,count);
			if (!unit_infos) return;
			var infos=unit_infos.total;
			var infos_one=unit_infos.one;
			// Add to total values
			if (palaceUnit) {
				totalValuesPalace=xTools.addToValues(totalValuesPalace,infos);
				hasPalaceUnits=hasPalaceUnits||count>0;
			}
			else {totalValues=xTools.addToValues(totalValues,infos);}
			if (settings.unit_tooltips) {
				count_item.hover(function (e) {
					var tooltip=$("#addon_tooltip");
					xHtml.adjustUnitTooltip(count_item,item,tooltip,count,infos,infos_one);
					xTools.positionTooltip(e,tooltip);
					tooltip.css({width:150,height:100});
					tooltip.show();
				}, function () {$("#addon_tooltip").hide();}).mousemove(function (e) {
					xTools.positionTooltip(e,$("#addon_tooltip"));
				});
			}
		});
		if (totalValues.speed==0) return totalValues;
		var old_tooltip=$("#tooltip_total");
		if (old_tooltip.length>0) old_tooltip.remove();
		var old_tooltip_palace=$("#tooltip_total_palace");
		if (old_tooltip_palace.length>0) old_tooltip_palace.remove();
		if (settings.unit_totals) {
			// Append total units tooltip(s)
			var id="tooltip_total";
			$("body").append(xHtml.createTotalsTooltip(id,totalValues));
			// Append additional infos
			var inset=$(xItems.transfer_left);
			inset.hover(function (e) {
					var tooltip=$("#"+id);
					xTools.positionTooltip(e,tooltip);
					tooltip.css({width:150,height:100});
					tooltip.show();
			}, function () {$("#"+id).hide();});
			inset.mousemove(function (e) {xTools.positionTooltip(e,$("#"+id));});
			if (inset.text().indexOf("Wesen beim Held")!=-1) {
				inset.html("<small class='xAddon' style='font-weight:normal;'>beim Held: "+xTools.formatNumber(totalValues.points)+" Punkte</small>");
			}
			else if (inset.text().indexOf("Wesen im Palast")!=-1) {
				inset.html("<small class='xAddon' style='font-weight:normal;'>im Palast: "+xTools.formatNumber(totalValues.points)+" Punkte</small>");
			}
			else inset.append("<small class='xAddon' style='font-weight:normal;'> "+xTools.formatNumber(totalValues.points)+" Punkte</small>");
			if (hasPalaceUnits) {
				var id_palace="tooltip_total_palace";
				$("body").append(xHtml.createTotalsTooltip(id_palace,totalValuesPalace));
				var inset=$(xItems.transfer_right);
				inset.hover(function (e) {
					var tooltip=$("#"+id_palace);
					xTools.positionTooltip(e,tooltip);
					tooltip.css({width:150,height:100});
					tooltip.show();
				}, function () {$("#"+id_palace).hide();});
				inset.mousemove(function (e) {xTools.positionTooltip(e, $("#"+id_palace));});
				if (inset.text().indexOf("Wesen in der Grotte")!=-1) {
					inset.html("<small class='xAddon' style='font-weight:normal;'> in der Grotte: "+xTools.formatNumber(totalValuesPalace.points)+" Punkte</small>");
				}
				else if (inset.text().indexOf("Wesen im Palast")!=-1) {
					inset.html("<small class='xAddon' style='font-weight:normal;'>im Palast: "+xTools.formatNumber(totalValues.points)+" Punkte</small>");
				}
				else inset.append("<small class='xAddon' style='font-weight:normal;'> "+xTools.formatNumber(totalValues.points)+" Punkte</small>");
			}
		}
		return totalValues;
	},
	// Adds guard information
	addGuardInfo:function (totalValues) {
		var guard_level=1;
		var guard_values={attack:0,defense:0,live:0,unicorns:0,rating:0};
		var next_guard_values={attack:0,defense:0,live:0,unicorns:0,rating:0};
		var prev_guard_values={attack:0,defense:0,live:0,unicorns:0,rating:0};
		var live_bonus=Math.floor(totalValues.live*cur_hero_attr.live*.02);
		var hero_rating=(totalValues.live+live_bonus)*totalValues.attack;
		while (true) {
			var values=xValues.guardValues(guard_level);
			values.rating=values.live*values.attack;
			var rating=hero_rating>values.rating;

			if ((server=="troll"&&guard_level>17)||!rating) {
				--guard_level;
				next_guard_values=values;
				break;
			}
			else {
				prev_guard_values=guard_values;
				guard_values=values;
			}
			++guard_level;
		}
		var rate_guard=function (hero_rating,guard_rating) {
			var victory_rating=Math.floor((hero_rating/guard_rating)*100);
			if (victory_rating>=1000) {return "<span style='color:#007600;'>Ok</span> ("+xTools.formatNumber(victory_rating)+"%)";}
			else if (victory_rating>=500) {return "<span style='color:#C7C700;'>Verluste</span> ("+xTools.formatNumber(victory_rating)+"%)";}
			else if (victory_rating>=100) {return "<span style='color:#C77600;'>hohe Verluste</span> ("+xTools.formatNumber(victory_rating)+"%)";}
			else {return "<span style='color:#C70000;'>Niederlage!</span> ("+victory_rating+"%)";}
		};
		var guard_victory_rating=rate_guard(hero_rating,guard_values.rating);
		var next_guard_victory_rating=rate_guard(hero_rating,next_guard_values.rating);
		var prev_guard_victory_rating=rate_guard(hero_rating,prev_guard_values.rating);
		if (guard_level>0) {
			var guard_html=function (nr,guard_level,guard_values,rating) {return "\
				<tr class='addon_gi_row addon_gi_"+nr+"'>\
					<td><img class='addon_gi_img' src='http://xhodon.de/xhodon/gfx/map/images/Icons/waechter/level"+guard_level+".png'/></td>\
					<td class='addon_gi_level'>W&auml;chter "+guard_level+":</td>\
					<td class='addon_gi_attack'>"+xTools.formatNumber(guard_values.attack)+"</td>\
					<td class='addon_gi_defense'>"+xTools.formatNumber(guard_values.defense)+"</td>\
					<td class='addon_gi_live'>"+xTools.formatNumber(guard_values.live)+"</td>\
					<td class='addon_gi_unicorns'>"+xTools.formatNumber(guard_values.unicorns*1000)+"</td>\
					<td class='addon_gi_rating'>"+rating+"</td>\
				</tr>";
			};
			$(xItems.hero_transfer_mtop).before("<tr class='top xAddon'>\
				<td class='gray_first' colspan=3>W&auml;chtervorschau</td>\
				<td class='gray_last' colspan=4></td>\
			</tr><tr>\
				<td class='clear_first addon_gi_container' colspan=7>\
					<table id='guard_info'><tbody width=100%>\
					<tr class='addon_gi_header'>\
						<td></td><td></td>\
						<td class='addon_gi_header_attack'>Angriff</td>\
						<td class='addon_gi_header_defense'>Verteidigung</td>\
						<td class='addon_gi_header_live'>Leben</td>\
						<td class='addon_gi_header_resources'>Ressourcen</td>\
						<td class='addon_gi_header_rating'>Bewertung</td>\
					</tr>"+
					(guard_level>1?guard_html(1,guard_level-1,prev_guard_values,prev_guard_victory_rating):"")+
					guard_html(2,guard_level,guard_values,guard_victory_rating)+
					guard_html(3,guard_level+1,next_guard_values,next_guard_victory_rating)+
					"</table>\
				</td>\
			</tr>");
		}
	},
	// Creates a tooltip with the given total values using "id"
	createTotalsTooltip:function (id,values) {
		var attack_bonus=0;
		var attack_item=0;
		var defense_bonus=0;
		var defense_item=0;
		var live_bonus=0;
		var live_item=0;
		switch (server) {
		case "zentauren":
		case "riesen":
		case "troll":
			attack_bonus=Math.floor((values.attack/100)*(cur_hero_attr.attack*5));
			defense_bonus=Math.floor((values.defense/100)*(cur_hero_attr.defense*7));
			live_bonus=Math.floor((values.live/100)*(cur_hero_attr.live*1));
			break;
		case "feen":
			attack_bonus=Math.floor((values.attack/100)*(cur_hero_attr.attack*2.4075));
			defense_bonus=Math.floor((values.defense/100)*(cur_hero_attr.defense*2.5));
			live_bonus=Math.floor((values.live/100)*(cur_hero_attr.live*2.6721));
			break;
		}
		return "<div id='wisdom_sidebar' class='sbInnerContainer xAddon addon_ut_a totals'>\
			<table class='designedTable' id='"+id+"'>\
			<thead><tr><td class='clear_first brdRight'></td><td class='white_last'></td></tr></thead>\
			<tbody><tr class='top'>\
				<td class='clear_first addon_ut_label addon_ut_label_attack'>\
					<b>Angriff</b><br/>\
					Basis:<br/>\
					HeldenBonus:<br/>\
					ItemBonus:<br/>\
					Gesamt:</td>\
				<td class='white_last addon_ut_value addon_ut_attack'>"+
					"<br/>"+
					"<span style='font-weight:normal;color:black;'>"+xTools.formatNumber(values.attack)+"</span><br/>"+
					"<span style='font-weight:normal;color:green;'>"+xTools.formatNumber(attack_bonus)+"</span><br/>"+
					"<span style='font-weight:normal;color:green;'>"+xTools.formatNumber(attack_item)+"</span><br/>"+
					"<span style='font-weight:bold;color:green;'>"+xTools.formatNumber(values.attack+attack_bonus+attack_item)+"</span></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_label addon_ut_label_attack'>\
					<b>Verteidigung</b><br/>\
					Basis:<br/>\
					HeldenBonus:<br/>\
					ItemBonus:<br/>\
					Gesamt:</td>\
				<td class='white_last addon_ut_value addon_ut_attack'>"+
					"<br/>"+
					"<span style='font-weight:normal;color:black;'>"+xTools.formatNumber(values.defense)+"</span><br/>"+
					"<span style='font-weight:normal;color:green;'>"+xTools.formatNumber(defense_bonus)+"</span><br/>"+
					"<span style='font-weight:normal;color:green;'>"+xTools.formatNumber(defense_item)+"</span><br/>"+
					"<span style='font-weight:bold;color:green;'>"+xTools.formatNumber(values.defense+defense_bonus+defense_item)+"</span></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_label addon_ut_label_attack'>\
					<b>Leben</b><br/>\
					Basis:<br/>\
					HeldenBonus:<br/>\
					ItemBonus:<br/>\
					Gesamt:</td>\
				<td class='white_last addon_ut_value addon_ut_attack'>"+
					"<br/>"+
					"<span style='font-weight:normal;color:black;'>"+xTools.formatNumber(values.live)+"</span><br/>"+
					"<span style='font-weight:normal;color:green;'>"+xTools.formatNumber(live_bonus)+"</span><br/>"+
					"<span style='font-weight:normal;color:green;'>"+xTools.formatNumber(live_item)+"</span><br/>"+
					"<span style='font-weight:bold;color:green;'>"+xTools.formatNumber(values.live+live_bonus+live_item)+"</span></td>\
			</tr><tr>\
				<td class='clear_first addon_ut_label addon_ut_label_speed'>Geschwindigkeit:</td>\
				<td class='white_last addon_ut_value addon_ut_speed'>"+xTools.formatNumber(values.speed)+" tpg</td>\
			</tr><tr>\
				<td class='clear_first addon_ut_label addon_ut_label_points'>Punkte:</td>\
				<td class='white_last addon_ut_value addon_ut_points'>"+xTools.formatNumber(values.points)+"</td>\
			</tr></tbody>\
			<tfoot><tr><td class='clear_first brdRight'></td><td class='white_last'></td></tr></tfoot>\
			</table>\
		</div>";
	},
	image:function (icon,alt,tooltip) {
		var tt=typeof(tooltip)=='string'?"onmouseout='nd();' onmouseover=\"return overlib('"+tooltip+"');\" ":"";
		return "<img "+tt+" alt='"+alt+"' src='http://xhodon.de/xhodon/gfx/icons/"+icon+"' class='icon20px'>";
	},
	// Creates an image element which contains the xhodon icon for the given "unit_name".
	// Set the second parameter "big_image" to true to use a bigger icon, default is false.
	unitImage:function (unit_name,big_image,cl) {
		if (typeof(big_image)=='undefined') big_image=false;
		if (typeof(cl)=='undefined') cl="";
		if (big_image) {
			return "<div class='middleUBIcon' style='display:inline-block'><div class='addon_unit_image unit_"+
				unit_name+" "+cl+"' style='display:inline-block; vertical-align:middle;'></div></div>";
		}
		else {
			return "<div class='addon_unit_image unit_"+
				unit_name+" "+cl+"' "+"style='display:inline-block; vertical-align:middle;'></div>";
		}
	},
	// Creates an image element with text after it, both vertically centered.
	unitImageAndText:function (unit_name,text,big_image) {
		var unit_real_name=xValues.baseUnitValues(unit_name).name;
		var addText=typeof(unit_real_name)=='undefined'?"":"&nbsp;("+unit_real_name+")";
		return "<div style='white-space:nowrap; vertical-align:middle;'>"+
			xHtml.unitImage(unit_name,big_image)+"&nbsp;"+text+addText+"</div>";
	},
	// Creates two unit images with text (used to display strength or weakness of units)
	unitAddInfo:function (unit_name1,text1,unit_name2,text2) {
		return xHtml.unitImageAndText(unit_name1,text1)+xHtml.unitImageAndText(unit_name2,text2);
	}
};



// *************************************************************
// Collection of functions that do stuff independent from xhodon
// *************************************************************
var xTools={
	// Updates the position of the given tooltip according to the given event object "e" (eg. from a mouse move event).
	positionTooltip:function (e,tooltip) {
		var top=e.pageY-10;
		var max_bottom=$(window).height()+$(document).scrollTop();
		if (top+tooltip.height()>max_bottom) top=max_bottom-tooltip.height();
		tooltip.css({left:e.pageX+35,top:top});
	},
	// Formats the hours and minutes until the given number of ticks has passed
	formatTimeFromTicks:function (ticks) {
		var minutes=ticks*5;
		var hours=Math.floor(minutes/60);
		minutes-=hours*60;
		return hours+":"+(minutes>=10?minutes:"0"+minutes);
	},
	// Adds the values in infos to the values in "values" and returns the updated values object.
	addToValues:function (values,infos) {
		values.attack+=infos.attack;
		values.defense+=infos.defense;
		values.live+=infos.live;
		if (infos.speed>values.speed) values.speed=infos.speed;
		values.points+=infos.points;
		values.reviveMushrooms+=infos.reviveMushrooms;
		values.revivePowerStones+=infos.revivePowerStones;
		return values;
	},
	// eg. 1234567 => "1.234.567"
	formatNumber:function (number) {
		number=number+""; // ensure it's a string
		var i=number.length-3;
		while (i>0) {
			if (i==1&&number[0]=="-") break;
			number=number.substring(0,i)+"."+number.substring(i,number.length);
			i-=3;
		}
		return number;
	},
	// Formats the unit speed (in tpg) in a color visualizing fast / slow units
	formatTpgNumber:function (speed,text) {
		var color;
		switch (speed) {
			case 1: color="#00cc00";break;
			case 2: color="#339900";break;
			case 3: color="#335500";break;
			case 4: color="#994400";break;
			case 5: color="#cc0000";break;
			default: return xTools.formatNumber(speed);
		}
		return "<span style='color:"+color+";'>"+xTools.formatNumber(speed)+text+"</span>";
	},
	// Inserts a forwarding Button to any Message
	insertMsgButtons:function () {
		debug ("--> Msg-System");
		var message_buttons=$(xItems.message_buttons);
		var forwdxxx=0;
		message_buttons.each(function () {
			var button=$(this);
			if (button&&button.text().indexOf("Löschen")!=-1) {
				forwdxxx=button.attr('href').substr((button.attr('href').lastIndexOf("="))+1);
			}
			if (button&&button.text().indexOf("Weiterleiten")!=-1) forwdxxx=1
		});
		if (forwdxxx!=0&&forwdxxx!=1) {
			debug ("--> Msg-System [ID]: "+forwdxxx);
			$("#messagecontainer .message-bottom").append('\
				<a onclick="return ajax_link(this.href);" \
				href="http://feen.xhodon.de/xhodon/messages.php?write&amp;mode=forward&amp;mid[msg_id]='+forwdxxx+'" \
				class="stSubmitBtn right">Weiterleiten</a>'
			);	
		}
	},
	// Adds the Addon its Configuration Button in the profile
	insertCfgButton:function () {
		if ($("#xAddonConfig").length==0) {
			var profile_account_buttons=$(xItems.profile_account_buttons);
			profile_account_buttons.each(function () {
				var button=$(this);
				if (button&&button.text().indexOf("Account-Einstellungen")!=-1) {
					button.after(
						"<li id='xAddonConfig' class='button small'>\
							<a onclick='showAddonSettings(); return false;' href='#' class='first' style='color:#0000FF;text-align:center;'>X-Addon Config</a>\
						</li>"
					);
				}
			});
		}
	},
	// Script UpdateCheck
	Update:function (check) {
		var scripturl='http://userscripts.org/scripts/source/'+xID;
		if ((check)||(parseInt(GM_getValue('Upd_Check','0'))+86400000<=(new Date().getTime()))) {
			try {
				GM_xmlhttpRequest({
					method:'GET',
					url:scripturl+'.meta.js?'+new Date().getTime(),
					headers:{'Cache-Control':'no-cache'},
					onload:function(res) {
						var erg=res.responseText;
						GM_setValue('Upd_Check',new Date().getTime()+'');
						var rv=/@version\s*(.*?)\s*$/m.exec(erg)[1];
						if (rv>xVersion) {
							if (confirm('Update for xAddon available.\n\ncurrent Version: '+xVersion+'\nremote Version: '+rv+'\n\nInstall now?')) {
								GM_openInTab(scripturl+'.user.js');
							}
							return 0;
						}
						else if (check) {
							alert('U\'re using the latest version of xAddon.\n\ncurrent Version: '+xVersion+'\nremote Version: '+rv);
						}
					}
				});
			}
			catch (err) {if (check) alert('--> Error while updating!\n\n'+err);}
		}
	},
	// div id=moving_heros
	markOwnGuild:function () {
		var hero_list=$(xItems.moving_hero_list);
		hero_list.each(function () {
			alert ($(this));
			var hero=$(this);
			debug ("markOwnGuild: "+hero);
/*			if (hero&&hero.text().indexOf("Loeschen")!=-1) {
				forwdxxx=button.attr('href').substr((button.attr('href').lastIndexOf("="))+1);
			}
			if (button&&button.text().indexOf("Weiterleiten")!=-1) forwdxxx=1
*/
		});
	},
	// Ally related
	checkAlly:function() {
		var inp=$("#allyAltar .input_txt");
		inp.val(Ressis[palace].gold);
	},
};















var settingsFeature=function (options,indentation) {
	options=$.extend({id:"addon_feature",type:"checkbox",text:"",tooltip:"",img:"",options:[],subcheckboxes:[]},options);
	if (typeof(indentation)=='undefined') indentation=0;
	var indent_style=indentation>0?("margin-left: "+(indentation*25)+"px;"):"";
	var t1="<tr><td style='text-align:center; width:25px;"+indent_style+"'>";
	var img=t1+options.img+"</td><td>";
	switch (options.type) {
	case "checkbox":
		return img+"\
			<input type='checkbox' id='"+options.id+"' style='"+indent_style+"'> \
			<label for='"+options.id+"' title='"+options.tooltip+"'>"+options.text+"</label>\
		</td></tr>";
	case "checkbox_group":
		var checkbox_group=img+"\
			<input type='checkbox' id='"+options.id+"' style='"+indent_style+"'> \
			<label for='"+options.id+"' title='"+options.tooltip+"' style='"+indent_style+"'>"+options.text+"</label>\
		</td></tr>";
		for (i=0;i<options.subcheckboxes.length;++i) {// Add sub-checkboxes recursively
			checkbox_group+=settingsFeature(options.subcheckboxes[i],indentation+1);
		}
		return checkbox_group;
	case "select":
		var select_options="";
		for (i=0;i<options.options.length;++i) {
			var option=$.extend({value:"",text:"",tooltip:""},options.options[i]);
			select_options+="<option value='"+option.value+"' title='"+option.tooltip+"'>"+option.text+"</option>";
		}
		return img+"\
			<label for='"+options.id+"' style='"+indent_style+"'>"+options.text+":</label> \
			<select id='"+options.id+"' title='"+options.tooltip+"' style='"+indent_style+"'>"+select_options+"</select>\
		</td></tr>";
	default: return "";
	}
};


//********************
// Save/Load DataStack
function serialize (mixed_value) {
	var _getType=function (inp) {
		var type=typeof inp,match;
		var key;
		if (type=='object' && !inp) return 'null';
		if (type=="object") {
			if (!inp.constructor) return 'object';
			var cons=inp.constructor.toString();
			if (match=cons.match(/(\w+)\(/)) cons=match[1].toLowerCase();
			var types=["boolean","number","string","array"];
			for (key in types) {if (cons==types[key]) {type=types[key]; break;}}
		}
		return type;
	};
	var type=_getType(mixed_value);
	var val,ktype='';
	switch (type) {
	case "function": val=""; break;
	case "undefined": val="N"; break;
	case "boolean": val="b:"+(mixed_value?"1":"0"); break;
	case "number": val=(Math.round(mixed_value)==mixed_value?"i":"d")+":"+mixed_value; break;
	case "string": val="s:"+mixed_value.length+":\""+mixed_value+"\""; break;
	case "array":
	case "object":
		val="a";
		var count=0;
		var vals="";
		var okey;
		var key;
		for (key in mixed_value) {
			ktype=_getType(mixed_value[key]);
			if (ktype=="function") continue;
			okey=(key.toString().match(/^[0-9]+$/) ? parseInt(key) : key);
			vals+=serialize(okey)+serialize(mixed_value[key]);
			count++;
		}
		val+=":"+count+":{"+vals+"}"; break;
	}
	if (type!="object"&&type!="array") val+=";";
	return val;
}
function unserialize (data) {
	var error=function(type,msg,filename,line) {throw new window[type](msg,filename,line);};
	var read_until=function (data,offset,stopchr) {
		var buf=[];
		var chr=data.slice(offset,offset+1);
		var i=2;
		var datalength=data.length;
		while(chr!=stopchr) {
			if ((i+offset)>datalength) error('Error','Invalid');
			buf.push(chr);
			chr=data.slice(offset+(i-1),offset+i);
			i+=1;
		}
		return [buf.length,buf.join('')];
	};
	var read_chrs=function(data,offset,length) {
		buf=[];
		for (var i=0; i<length; i++) {
			var chr=data.slice(offset+(i-1),offset+i);
			buf.push(chr);
		}
		return [buf.length,buf.join('')];
	};
	var _unserialize=function(data,offset) {
		if (!offset) offset=0;
		var buf=[];
		var dtype=(data.slice(offset,offset+1)).toLowerCase();
		var dataoffset=offset+2;
		var typeconvert=new Function('x','return x');
		var chrs=0;
		var datalength=0;

		switch (dtype) {
		case "i":
			typeconvert=new Function('x','return parseInt(x)');
			var readData=read_until(data,dataoffset,';');
			var chrs=readData[0];
			var readdata=readData[1];
			dataoffset+=chrs+1;
			break;
		case "b":
			typeconvert=new Function('x','return (parseInt(x)==1)');
			var readData=read_until(data,dataoffset,';');
			var chrs=readData[0];
			var readdata=readData[1];
			dataoffset+=chrs+1;
			break;
		case "d":
			typeconvert=new Function('x','return parseFloat(x)');
			var readData=read_until(data,dataoffset,';');
			var chrs=readData[0];
			var readdata=readData[1];
			dataoffset+=chrs+1;
			break;
		case "n":
			readdata=null;
			break;
		case "s":
			var ccount=read_until(data,dataoffset,':');
			var chrs=ccount[0];
			var stringlength=ccount[1];
			dataoffset+=chrs+2;
			var readData=read_chrs(data,dataoffset+1,parseInt(stringlength));
			var chrs=readData[0];
			var readdata=readData[1];
			dataoffset+=chrs+2;
			if (chrs!=parseInt(stringlength) && chrs!=readdata.length) {error('SyntaxError','String length mismatch');}
			break;
		case "a":
			var readdata={};
			var keyandchrs=read_until(data,dataoffset,':');
			var chrs=keyandchrs[0];
			var keys=keyandchrs[1];
			dataoffset+=chrs+2;
			for (var i=0; i<parseInt(keys); i++) {
				var kprops=_unserialize(data,dataoffset);
				var kchrs=kprops[1];
				var key=kprops[2];
				dataoffset+=kchrs;
				var vprops=_unserialize(data,dataoffset);
				var vchrs=vprops[1];
				var value=vprops[2];
				dataoffset+=vchrs;
				readdata[key]=value;
			}
			dataoffset+=1;
			break;
		default:
			error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);
			break;
		}
		return [dtype,dataoffset-offset,typeconvert(readdata)];
	};
	return _unserialize(data,0)[2];
}



// ****************************************************************************************************************************
// TODO
var settingsTable=function (options) {
	options=$.extend({title:"",features:""},options);
	return "<table class='designedTable'>\
	<tr class='topBody'>\
		<td class='gray_first'>"+options.title+"</td>\
	</tr><tr>\
		<td class='white_first'><table>"+options.features+"</table></td>\
	</tr></table>";
};

var features={
	// Unit tooltips
	'addon_unit_tooltips':{
		id:"addon_unit_tooltips",
		text:"Einheiten-Tooltips",
		type:"checkbox_group",
		tooltip:"Einheiten-Tooltips anzeigen",
		subcheckboxes:[
			{id:"addon_ut_sub_title",text: "Titel anzeigen",tooltip:"Einen Titel mit gr&ouml;sserem Einheiten-Bild, Einheiten-Namen und der Anzahl anzeigen."},
			{id:"addon_ut_sub_sw",text:"St&auml;rken/Schw&auml;chen anzeigen",tooltip:"St&auml;rken/Schw&auml;chen-Information in den Tooltips anzeigen."},
			{id:"addon_ut_sub_speed",text:"Geschwindigkeit anzeigen",tooltip:"Geschwindigkeiten in den Tooltips anzeigen."}
		]
	},
	// Total unit values
	'addon_unit_totals':{
		id:"addon_unit_totals",
		text:"Gesamt-Einheiten-Werte anzeigen",
		tooltip:"Zusammengerechnete Werte aller Einheiten beim Helden, im Palast und der geheimen Grotte anzeigen.",
		img:"<big><b>&#8721;</b></big>"
	},
	// Guard info
	'addon_guard_info':{
		id:"addon_guard_info",
		text:"W&auml;chter-Info anzeigen",
		tooltip: "Auf der Held Beladen-Seite werden zus&auml;tzliche W&auml;chter-Info angezeigt.",
		img:xHtml.unitImage("default")
	},
	// Shaman hut
	'addon_shaman':{
		id:"addon_shaman",
		text:"Extra-Infos in der Schamanh&uuml;tte",
		tooltip:"Zeigt weitere Infos in der Schamanenh&uuml;tte an, z.B. insgesamt ben&ouml;tigte Pilze f&uuml;r die Wiederbelebung.",
		img:xHtml.image("mushrooms.png")
	},
	// Resource calculation
	'addon_res_calc':{
		id:"addon_res_calc",
		text:"Rohstoffe pro Stunde / Tag / beliebig anzeigen",
		tooltip:"In den Rohstoff-Geb&auml;ude-Seiten werden Werte in andere Zeiteinheiten umgerechnet.",
		img:xHtml.image("essenz.png")
	},
	// Format tick countdown
	'addon_format_tick':{
		id:"addon_format_tick",
		text:"Tick-Countdown formatieren",
		tooltip: "Den Tick-Countdown je nach verbleibender Zeit hervorheben.",
		img:xHtml.image("time/timeleft.gif")
	},
	// Hide horizontal scrollbar
	'addon_hide_h_scrollbar':{
		id:"addon_hide_h_scrollbar",
		text:"Horizontale Scrollleiste verstecken",
		tooltip:"Keine horizontale Scrollleiste anzeigen."
	},
	// Execution time
	'addon_blocking':{
		id:"addon_blocking",
		type:"select",
		text:"Skript-Ausf&uuml;hrungs-Zeitpunkt",
		tooltip: "Mit Erst Anzeigen blockiert das Skript nicht, allerdings wird die Seite erst im Original-Layout angezeigt und dann (sichtbar) ver&auml;ndert.",
		options:[
			{value:"0",text:"Erst alle &Auml;nderungen, dann anzeigen",tooltip:"Gut bei schnellem Rechner. Vor der Anzeige der Seite werden alle &Auml;nderungen durchgef&uuml;hrt."},
			{value:"1",text:"Erst kleinere &Auml;nderungen, dann anzeigen, dann Rest",tooltip:"Kompromiss zwischen den anderen beiden Einstellungen."},
			{value:"2",text:"Erst anzeigen, dann &auml;ndern",tooltip:"Falls das Spiel mit den anderen Einstellungen ausgebremst..wird, blockiert nicht."}
		]
	}
};

var featureSections=[
	{
		title:"Funktionen",features:
			settingsFeature(features['addon_unit_tooltips'])+
			settingsFeature(features['addon_unit_totals'])+
			settingsFeature(features['addon_guard_info'])+
			settingsFeature(features['addon_shaman'])+
			settingsFeature(features['addon_res_calc'])
	},
	{
		title:"Layout",features:
			settingsFeature(features['addon_format_tick'])+
			settingsFeature(features['addon_hide_h_scrollbar'])
	},
	{
		title:"Ausf&uuml;hrung",features:
			settingsFeature(features['addon_blocking'])
	}
];

unsafeWindow.showAddonSettings=function () {
	var tabs="\
	<table class='dynamicTabs'><tr><td>\
		<a class='firstBtn firstBtn_selected'>\
		<table><tbody><tr>\
		<td class='btnStart'><div class='spacer'></div></td>\
		<td class='btnMidd'>X-Addon</td>\
		<td class='btnEnd'><div class='spacer'></div></td>\
		</tr></table>\
		</a>\
	</td></tr></table>";
	// Add feature settings to content string
	var content="";
	for (i=0;i<featureSections.length;++i) {content+=settingsTable(featureSections[i]);}
	// Add "save" button
	content+=settingsTable({
		title:"Einstellungen speichern",
		features:"<input type='button' value='Speichern' onclick='saveButtonClicked();' class='stSubmitBtn' style='margin-left: 10px; margin-top: 10px;'>"
	});
	// Change #content to display the addon settings
	$("#content").html(
		"<h1>Extra <small>- Einstellungen f&uuml;r das X-Addon</small></h1><div class='profileTableContent paddingContent'>"+tabs+content+"</div>"
	);
	// Set current settings values to the form
	$("#addon_guard_info").attr('checked',settings.guard_info);
	$("#addon_shaman").attr('checked',settings.shaman);
	$("#addon_unit_tooltips").attr('checked',settings.unit_tooltips);
	$("#addon_ut_sub_title").attr('checked',settings.ut_title);
	$("#addon_ut_sub_sw").attr('checked',settings.ut_strength_weakness);
	$("#addon_ut_sub_speed").attr('checked',settings.ut_speed);
	$("#addon_unit_totals").attr('checked',settings.unit_totals);
	$("#addon_res_calc").attr('checked',settings.res_calc);
	$("#addon_format_tick").attr('checked',settings.format_tick);
	$("#addon_hide_h_scrollbar").attr('checked',settings.hide_h_scrollbar);
	$("#addon_blocking").val(settings.dont_block+"");
	// Add event handler to top level checkboxes of checkbox groups
	// to enable/disable them appropriately TODO : on init
	for (feature_id in features) {
		var feature=features[feature_id];
		if (feature.type!="checkbox_group") {continue;}
		var subcheckboxes=feature.subcheckboxes;
		$("#"+feature.id).click(function () {
			var enable_sub_cbs=$(this).is(':checked');
			for (i=0;i<subcheckboxes.length;++i) {
				var sub_checkbox=$("#"+subcheckboxes[i].id);
				if (sub_checkbox.length>0) {
					// Toggle sub-checkbox enabled state
					((enable_sub_cbs)?sub_checkbox.removeAttr('disabled'):sub_checkbox.attr('disabled','disabled'));
				}
			}
		});
	}
};

// Detects which page is currently shown.
var currentPage=function () {
	var hash=document.location.hash;
	var pos=hash.indexOf(".php");
	var slashPos=hash.lastIndexOf("/",pos);
	if ( pos==-1||slashPos==-1) {return {name:false};}
	var page=hash.substring(slashPos+1,pos);
	if (page=="building") {
		var id=/building.php\?numeric\[building_id\]=(\d+)/.exec(hash);
		return {name:page,id:(id&&id.length>=1)?id[1]:-1};
	}
	else {return {name:page};}
};


//****************************************************
// Functions initializing the script
//****************************************************
server=xValues.server();
if (settings.format_tick) {
	var tick=$("#klick_countdown");
	window.setInterval(function() {
		var time=tick.html();
		if (time) {
			var mins=parseInt(time.substring(0,1));
			var secs=parseInt(time.substring(2,4));
			var tack=(mins*60+secs);
			tick.css({color:'rgb('+(255-(isNaN(tack)?255:tack))+','+(0+(isNaN(tack)?255:tack))+',0)','font-weight':"bold",'font-size':"1.6em",background:'#000000',opacity:'0.7'});
		}
	},999);
}


//****************************************************
// Initialize AddOn styles
//****************************************************
// Unit tooltip style
switch (settings.ut_style) {
	case "":
	case "default":
		GM_addStyle("\
			.addon_ut_a table {display:none;position:absolute;background:rgba(240,240,240,.8);-border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}\
			.addon_ut_title {font:small-caps 11px Verdana;}\
			.addon_ut_count {font-weight:bold;font-size:1.2em;}\
			.addon_ut_label {font-weight:normal !important;text-align:right;}\
			.addon_ut_value {font-weight:normal; !important;text-align:right;}\
			.addon_ut_label_sw {font-weight:bold;}\
			.addon_ut_attack_info,.addon_ut_defense_info,.addon_ut_live_info,.addon_ut_points_info {color:#808080;}"
		);
	break;
	case "colorful":
		GM_addStyle("\
			.addon_ut_a table {display:none;position:absolute;background:rgba(240,240,240,.8);-border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}\
			.addon_ut_title {font:small-caps 11px Verdana;}\
			.addon_ut_count {font-weight:bold;font-size:1.2em;}\
			.addon_ut_label {font-weight:normal !important;text-align:right;}\
			.addon_ut_value {font-weight:normal; !important;text-align:right;}\
			.addon_ut_label_sw {font-weight:bold;}\
			.addon_ut_attack_info,.addon_ut_defense_info,.addon_ut_live_info,.addon_ut_points_info {color:#808080;}\
			#addon_tooltip thead tr,.addon_ut_title {background-color:#bbbbff;}\
			.addon_ut_strength {background-color:#bbffbb;color:green;}\
			#addon_tooltip tfoot tr,.addon_ut_weakness {background-color:#ffbbbb;color:red;}\
			.addon_ut_label_attack,.addon_ut_attack {color:darkred;}\
			.addon_ut_label_defense,.addon_ut_defense {color:darkgreen;}"
		);
	break;
	case "small":
		GM_addStyle("\
			.addon_ut_a table {display:none;position:absolute;font-size:0.9em;background:rgba(240,240,240,.8);-border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;}\
			.addon_ut_title {font:small-caps 10px Verdana;}\
			.addon_ut_img {height:18px !important;}\
			.addon_ut_count {font-weight:bold;}\
			.addon_ut_label {padding-top:0px !important;padding-bottom:0px !important;font-weight:normal !important;text-align:right;}\
			.addon_ut_value {padding-top:0px !important;padding-bottom:0px !important;font-weight:normal; !important;text-align:right;}\
			.addon_ut_label_sw {font-weight:bold;}\
			.addon_ut_a .addon_unit_image {display:none !important;}\
			.addon_ut_attack_info,.addon_ut_defense_info,.addon_ut_live_info,.addon_ut_points_info {color:#808080;}"
		);
	break;
}

// Guard info style
switch (settings.gi_style) {
	case "":
	case "default":
		GM_addStyle("\
			#guard_info {width:100%;height:100%;font-weight:normal;}\
			.addon_gi_container {padding:0px !important;}\
			.addon_gi_row {}\
			.addon_gi_header {text-align:right;font-weight:bold;}\
			.addon_gi_header_rating {text-align:center;}\
			.addon_gi_1 {background:rgba(160,250,160,.3);}\
			.addon_gi_2 {background:rgba(220,220,160,.3);}\
			.addon_gi_3 {background:rgba(250,160,160,.3);}\
			.addon_gi_img {height:26px;}\
			.addon_gi_level {font-weight:bold;}\
			.addon_gi_attack,.addon_gi_defense,.addon_gi_live,.addon_gi_unicorns {text-align:right;}\
			.addon_gi_rating {text-align:center;}"
		);
	break;
	case "small":
		GM_addStyle("\
			#guard_info {width:100%;height:100%;font-size:9px;}\
			.addon_gi_container {padding:0px !important;}\
			.addon_gi_row {}\
			.addon_gi_header {text-align:right;font-weight:small;}\
			.addon_gi_header_rating {text-align:center;}\
			.addon_gi_1 {background:rgba(0,0,0,.2);}\
			.addon_gi_2 {background:rgba(0,0,0,.1);}\
			.addon_gi_3 {background:rgba(0,0,0,.2);}\
			.addon_gi_img {height:18px;}\
			.addon_gi_level {font-weight:small;}\
			.addon_gi_attack,.addon_gi_defense,.addon_gi_live,.addon_gi_unicorns {text-align:right;}\
			.addon_gi_rating {text-align:center;}"
		);
	break;
}

//****************************************************
// AddOn functions
//****************************************************
/**
http://feen.xhodon.de/xhodon/building.php?numeric[building_id]=1
ID  0 = Baum des Lebens
ID  1 = Kraeuterschule
ID  2 = Kristallhoehle
ID  3 = Steinwurzel
ID  4 = Kriegsbrunnen
ID  5 = ---
ID  6 = Xhodotorischer Kokon
ID  7 = Steinmantel
ID  8 = Kristallturm
ID  9 = ---
ID 10 = Heldenstatue
ID 11 = Palasthof
ID 12 = ---
ID 13 = Zuchtstation
ID 14 = ---
ID 15 = Irres Auge
ID 16 = Harzader
ID 17 = Geheime Grotte
ID 18 = Kristallines Katapult
ID 19 = ---
ID 20 = Schamanenhuette
Kampfsimulator            = http://feen.xhodon.de/xhodon/additional/battlesimulator.php?new
Nachrichteneinstellungen  = http://feen.xhodon.de/xhodon/profile/profile_event.php
Notizblock                = http://feen.xhodon.de/xhodon/additional/notepad.php
Uebersichten Beschwoerung = http://feen.xhodon.de/xhodon/additional/summoning.php
Statistiken               = http://feen.xhodon.de/xhodon/profile/profile_statistics.php
erweiterte Statistik 0-6  = http://feen.xhodon.de/xhodon/profile/profile_statistics.php?tab=0
Wesen in Grotte           = http://feen.xhodon.de/xhodon/additional/transfer_cave.php?mode=in
Wesen aus Grotte          = http://feen.xhodon.de/xhodon/additional/transfer_cave.php?mode=out
**/
var addOn=function () {
    $(".xAddon").remove();
	xHtml.addUniversalUnitTooltip();
	debug ("--> interacting on Page: "+page.name+" (ID: "+page.id+")");
	palace=xGet.curPalace();
	debug ("--> current Palace: "+palace);
	if (!Ressis[palace]) Ressis[palace]=[];
	xGet.resources(false);
	if (!Resources[palace]) Resources[palace]=[];
	xHtml.addRessProduction();
	if (page.name=="ally") xTools.checkAlly();
	if (page.name=="items") xGet.ItemBonus();
	if (page.name=="main") xTools.markOwnGuild();
	if (page.name=="messages") xTools.insertMsgButtons();
	if (page.name=="user_profile") xTools.insertCfgButton(page);
	var totalValues=false;
	if (page.name=="heros") {
		xGet.heroAttributes();
		cur_hero_attr=xGet.currentHeroAttributes();
		totalValues=xHtml.addUnitTooltips();
		xHtml.addGuardInfo(totalValues===false?xHtml.addUnitTooltips():totalValues);
	}
	if (page.name=="building") {
		if (page.id<=3||page.id==16) xHtml.addResourceCalculations(page.id);
		if (page.id==6||page.id==13||page.id==17||page.id==20) totalValues=xHtml.addUnitTooltips();
		if (page.id==20) xHtml.addShamanHutInfos(totalValues===false?xHtml.addUnitTooltips():totalValues);
	}
	update=xTools.Update(false);
}

// Stores the original xhodon function that gets executed after ajax loads.
var orig=unsafeWindow.ajax_load;
unsafeWindow.ajax_load=function (display) {
    orig(display);
	if (display==false) {
		page=currentPage();
		setTimeout(addOn,1);
	}
}

// Save settings button clicked
/*unsafeWindow.saveButtonClicked=function () {
	settings.global=$("#addon_global_settings").is(':checked');
	settings.unit_tooltips=$("#addon_unit_tooltips").is(':checked');
	settings.ut_strength_weakness=$("#addon_ut_sub_sw").is(':checked');
	settings.ut_title=$("#addon_ut_sub_title").is(':checked');
	settings.ut_speed=$("#addon_ut_sub_speed").is(':checked');
	settings.guard_info=$("#addon_guard_info").is(':checked');
	settings.shaman=$("#addon_shaman").is(':checked');
	settings.unit_totals=$("#addon_unit_totals").is(':checked');
	settings.res_calc=$("#addon_res_calc").is(':checked');
 	settings.format_tick=$("#addon_format_tick").is(':checked');
	settings.hide_h_scrollbar=$("#addon_hide_h_scrollbar").is(':checked');
	settings.dont_block=parseInt($("#addon_blocking :selected").attr('value'));
	settings.ut_style=$("#addon_ut_style :selected").attr('value');
	settings.gi_style=$("#addon_gi_style :selected").attr('value');
	storeSettings(settings);
	if (!debug_mode) window.location.reload(false);
}
*/