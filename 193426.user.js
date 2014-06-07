// ==UserScript==
// @name	Kingsage Enhancement Suite ml
// @version	1.1.5
// @author	grafilicious
// @include	http://*.kingsage.*/game.php*
// @exclude	http://support.*/*
// @grant	none
// ==/UserScript==

function KESInit($, l, Query){

// TODO: test in chrome, opera, update-reminder,  show cost for 1 level, save everything apart from user settings in another obj?

	//* fix location in opera
	var location = window.location;

	//* global variables
	var version = '1.1.5';
	var host	= location.host; // like "s1.kingsage.de"
	var server  = location.host.split('.')[0].substr(1); // like "1" for s1.kingsage.de

	var page	= document.URL;
	var self	= document.title.substring(document.title.indexOf('- ') + 2);
		self	= self.substring(0, self.indexOf(' -'));
	var arrow 	= '<img src="img/arrow_right_raquo.png">';

	//* units & buildings
	var units		 = { 0: l.units.militia, 1: l.units.sword, 2: l.units.spear, 3: l.units.axe, 4: l.units.bow, 5: l.units.spy, 7: l.units.light, 8: l.units.heavy, 9: l.units.ram, 10: l.units.kata, 11: l.units.snob };
	var unit_runtime = { "farmer": 20, "sword": 22, "spear": 18, "axe": 18, "bow": 18, "spy": 9, "light": 10, "heavy": 11, "ram": 30, "kata": 30, "snob": 35};
	var buildings	 = l.buildings;

	var buildCosts	 = {
		main: 	  {min: 1, max: 50, stone: {b: 	   85, f: 1.17}, wood: {b: 	   70, f: 1.165}, ore: {b: 	   65, f: 1.165}, workers: {b: 	 2, f: 1.12}},
		wood: 	  {min: 0, max: 50, stone: {b: 	   55, f: 1.17}, wood: {b: 	   30, f: 1.165}, ore: {b: 	   40, f: 1.165}, workers: {b: 	 5, f:  1.1}},
		stone: 	  {min: 0, max: 50, stone: {b: 	   40, f: 1.17}, wood: {b: 	   30, f: 1.165}, ore: {b: 	   55, f: 1.165}, workers: {b: 	 5, f:  1.1}},
		iron: 	  {min: 0, max: 50, stone: {b: 	   55, f: 1.17}, wood: {b: 	   40, f: 1.165}, ore: {b: 	   30, f: 1.165}, workers: {b: 	 5, f:  1.1}},
		storage:  {min: 1, max: 50, stone: {b: 	   43, f: 1.17}, wood: {b: 	   40, f: 1.165}, ore: {b: 	   35, f: 1.165}, workers: {b: 0.1, f: 	1.1}},
		hide: 	  {min: 0, max: 30, stone: {b: 	   50, f: 1.17}, wood: {b: 	   40, f: 1.165}, ore: {b: 	   40, f: 1.165}, workers: {b: 	 1, f: 1.15}},
		farm: 	  {min: 1, max: 50, stone: {b: 	   65, f: 1.17}, wood: {b: 	   50, f: 1.165}, ore: {b: 	   50, f:  1.16}, workers: {b: 	 0, f: 	  1}},
		barracks: {min: 0, max: 30, stone: {b: 	  180, f: 1.23}, wood: {b: 	  180, f:  1.21}, ore: {b: 	  120, f:  1.22}, workers: {b: 	 6, f: 1.17}},
		wall: 	  {min: 1, max: 20, stone: {b: 	   60, f: 1.17}, wood: {b: 	   40, f: 1.165}, ore: {b: 	   30, f:  1.16}, workers: {b: 	 4, f: 	1.2}},
		stable:   {min: 0, max: 30, stone: {b: 	  240, f: 1.17}, wood: {b: 	  200, f: 1.165}, ore: {b: 	  220, f:  1.16}, workers: {b:  10, f: 	1.1}},
		market:   {min: 0, max: 30, stone: {b: 	  100, f: 1.17}, wood: {b: 	   80, f: 1.165}, ore: {b: 	   70, f:  1.16}, workers: {b:  10, f: 1.17}},
		garage:   {min: 0, max:  5, stone: {b: 	  400, f: 1.17}, wood: {b: 	  600, f: 1.165}, ore: {b: 	  500, f:  1.16}, workers: {b:  50, f: 	1.4}},
		snob: 	  {min: 0, max: 10, stone: {b:  30000, f:  1.3}, wood: {b:  25000, f: 	1.3}, ore: {b:  25000, f: 	1.3}, workers: {b: 100, f: 	1.2}},
		smith: 	  {min: 0, max:  5, stone: {b:   4000, f:  1.4}, wood: {b: 	 3000, f: 	1.4}, ore: {b:   2500, f: 	1.4}, workers: {b:  25, f: 	1.2}},
		statue:   {min: 0, max:  1, stone: {b: 400000, f: 	 2}, wood: {b: 400000, f: 	  2}, ore: {b: 400000, f: 	  2}, workers: {b: 	 0, f: 1.17}},
		cost: function(building, level) {
			var stone = 0, wood = 0, ore = 0, workers = 0;
			if(typeof level == "number" && level <= building.max && level >= building.min) {
				stone	= Math.round(building.stone.b 	* Math.pow(building.stone.f, level-1)),
				wood	= Math.round(building.wood.b 	* Math.pow(building.wood.f, level-1)),
				ore		= Math.round(building.ore.b		* Math.pow(building.ore.f, level-1)),
				workers	= Math.round(building.workers.b * Math.pow(building.workers.f, level-1));
			}
			return [stone, wood, ore, workers];
		},
		cumulatedCost: function(building, min, max) {
			var stone = 0, wood = 0, ore = 0, workersLow = this.cost(building, min-1)[3], workersHigh = this.cost(building, max)[3];
			for(var i = min + 1; i <= max; i++) {
				cost = this.cost(building, i);
				stone 	+= cost[0];
				wood	+= cost[1];
				ore		+= cost[2];
			}
			return [stone, wood, ore, workersHigh - workersLow];
		},
		getMaximumLevel: function(building, level, stone, wood, iron, workers) {
			var max 		= building.max,
				min 		= level,
				available 	= [stone, wood, iron, workers],
				canBuild 	= function(cumulated, available) {
					return (cumulated[0] <= available[0] && cumulated[1] <= available[1] && cumulated[2] <= available[2] && cumulated[3] <= available[3]);
				},
				addCost		= function(n, o) {
					return [n[0] + o[0], n[1] + o[1], n[2] + o[2], n[3]];
				};
			//can we build max?
			var maxCost = this.cumulatedCost(building, min, max);
			if(canBuild(maxCost, available)) {
				return [max - min].concat(maxCost);
			} else {
				// search for the max level we can build
				var high 	= max-1,
					low  	= min,
					lowCost = this.cumulatedCost(building, low, low),
					lastCost = lowCost;
				for(var i = low + 1; low <= high; i++) {
					var tmpCost = addCost(this.cost(building, i), lastCost);
					if(canBuild(tmpCost, available)) {
						lastCost = tmpCost;
					} else {
						return [i-low].concat(lastCost);
					}
				}
			}
		}
	};

	//* got premium?
	var premium	 = ($('div.buff[style*="premium-account"]').length > 0) ? true : false;
	//* are we playing as av?
	var av = (Query['av']) ? '&av=' + Query['av'] : '';

	//#################################### GLOBAL CSS ####################################//

	var css = '';
		css += '.kes-backlight {display: none; position: fixed; cursor: pointer; width: 100%; height: 100%; padding: 0; margin: 0; top: 0; left: 0; background-color: black; opacity: 0.7; z-index: 199; }';
		css += '.kes-user-settings {display: none; position: fixed; left: 100px; right: 100px; top: 30px; bottom: 30px; background-color: white; z-index: 250; font-family: sans-serif; font-size: 14px; color: #333333; }';
		css += '.kes-user-settings input[type="text"], .kes-user-settings select {border: 1px solid #ccc; padding: 6px 4px; outline: none; border-radius: 2px; margin: 0; width: 70px; max-width: 100%; display: inline-block; margin-bottom: 5px; background: #fff; }';
		css += '.kes-user-settings input[type="text"]:focus, .kes-user-settings select:focus {border: 1px solid #aaa; color: #444; box-shadow:  0 0 3px rgba(0,0,0,.2); }';
		css += '.kes-user-settings select {width: 130px; padding: 4px; }';
		css += '.kes-user-settings ul {padding-left: 20px; }';
		css += '.kes-user-settings li {list-style-type: none; }';
	/**/
		css += '.kes-icons {background: url(data:image/png;base64,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) no-repeat; }';
		css += '.kes-saved {color: #529214; height: 28px; position: absolute; right: 30px; top: 17px; display: none; width: 100px; z-index: 251; }';
		css += '.kes-icon-saved {background-position: -288px 0; display: inline-block; width: 15px; height: 15px; margin: -2px 5px; }';
		css += '.kes-close {position: absolute; top: 10px; right: 7px; z-index: 251; height: 28px; width: 28px; }';
		css += '.kes-close:hover .kes-icon-close {opacity: 0.6; }';
		css += '.kes-icon-close {background-position: -312px 0; display: inline-block; height: 14px; width: 14px; line-height: 14px; margin-top: 1px; vertical-align: text-top; position: relative; left: 7px; top: 5px; }';
		css += '.kes-icon-valid {background-position: -288px 0; display: none; height: 14px; width: 14px; line-height: 14px; margin-top: 3px; vertical-align: top; position: relative; left: 7px; top: 5px; }';
		css += '.kes-icon-invalid {background-position: -144px -120px; display: none; height: 14px; width: 14px; line-height: 14px; margin-top: 3px; vertical-align: top; position: relative; left: 7px; top: 5px; }';
	/**/
		css += '.kes-menu-wrapper {overflow-y: auto; padding-top: 16px; border-right: 1px solid #D9D9D9; box-shadow: -6px 0 6px -6px rgba(0,0,0,0.2) inset; top: 0; right: 0; left: 0; bottom: 0; position: absolute; width: 212px; z-index: 150; }';
		css += '.kes-menu {top: 0; right: 0; left: 0; bottom: 0; margin: 0; user-select: none; }';
		css += '.kes-menu a {color: #21759B; display: block; font-size: 14px; line-height: 18px; margin: 0; padding: 4px 20px 4px 0; position: relative; text-decoration: none; text-shadow: 0 1px 0 #FFFFFF; text-align: right; }';
		css += '.kes-menu a:hover {background: none repeat scroll 0 0 rgba(0,0,0,0.04); color: #21759B; }';
		css += 'a > .kes-icon-home {background-position: 0 -24px; display: inline-block; height: 14px; margin: -2px 5px; width: 13px; }';
		css += 'a:hover > .kes-icon-home {opacity: 0.6; background-color: transparent; }';
		css += '.kes-menu .kes-active {font-weight: bold; color: #333333; }';
	/**/
		css += '.kes-heading {display: block; font-size: 16px; font-weight: bold; line-height: 18px; margin: 0; padding: 4px 20px; position: relative; }';
		css += '.kes-subheading {display: block; font-size: 13px; line-height: 18px; margin: -5px 0; padding: 0 20px; position: relative; }';
		css += '.kes-separator {border-bottom: 1px solid #FFFFFF; border-top: 1px solid #DFDFDF; height: 0; margin: 12px 20px; padding: 0; }';
		css += '.kes-content {bottom: 0; height: auto; left: 213px; margin: 0; overflow: auto; position: absolute; right: 0; top: 45px; width: auto; padding: 20px; }';
		css += '.kes-content-title {text-overflow: ellipsis; overflow: hidden; height: 45px; left: 213px; position: absolute; right: 0; padding-right: 135px; top: 0; z-index: 200; border-bottom: 1px solid #DFDFDF; box-shadow: 0 4px 4px -4px rgba(0,0,0,0.1); }';
		css += '.kes-content-title h1 {font-size: 22px; font-weight: 200; line-height: 45px; margin: 0; padding: 0 16px; }';
		css += '.kes-content .kes-paragraph {background: none repeat scroll 0 0 #F5F5F5; border: 1px solid #DFDFDF; margin: 0 1%; padding: 1% 1% 0; }';
	/**/
		css += '.kes-enable, .kes-disable, .kes-enable span, .kes-disable span {user-select: none;background: url(data:image/gif;base64,R0lGODlhBQAOAeYAAL6+vlyRE4q8Je7u7oC0HZubm0l0EFaKEYqKimKNGJKSklxcXGCUFGmTGfDw8NjY2H2xHdLS0mSTF0JtDXWbKIaGhoKCglJ7E3mqH0tzEnyuIPX19WmfF+np6W2eGm+kGHGmGHZ2dmmZGVuFFd7e3mRkZI2NjYSEhICAgJOyV3mXTXKcH1VVVVGFD12NFVKGEIiIiHGhHI3AJ2FhYYa7HmSaFViOEleCFF6IFnx8fHBwcHp6eo+Pj2pqanJycm5ubnR0dH9/f2xsbHh4eGhoaHmtG3arGnuwHHOpGWecFmKYFGuhF+Xl5YS2I4S5HpSUlIi8H4a5H0+BD5GRkWdnZ4e5JMTExODg4HWmHc/Pz4GyImCQFXOkHX+wIYO2Hqy9lMjIyKysrPLy8nWgIG6bGrzOmbDDj87Yv9Xfw4CxHliHE3CjGHqkIX+lMnyvHW6YHYGeV3inHYa0JXquHFh/IFyCJmWWF1WAFJu2YYKwJIK0I1yPE9XV1ff392ZmZvj4+CH5BAAAAAAALAAAAAAFAA4BAAf/gACCgkyFhQ6IiH+LjI2Oj5CRkpOUlZaXmI59m5t8np4hoaEIpKQKp6dPqqqop1Ovrzyysia1taW4pRW7vL0Wv8DBQcPDOcbGO8nJQ8zMoqFA0dE+1NQ619c/2tpC3d094OBE4+NU5uYl6errLO3tDfDwEPPzUfb2UPn5NPz8Tv//vAgUSKBgQXrzjihUWKRhQyMQISKZOBGERYsfMmZcwpEjh48fk4gUWaNkSSUoUTJYuTKAy5cwbciUeaCmzZsvcuZswZOnlJ8/JwgVuqhDFit/SFjJQmIAGCaI+DzY0OdPBDGMIlRdxGfrn66MwHL1KvYr2bNh0Y5Ny3atW7Nt/+G+ncqIBAlGDvgMYNSBzxUHiwZcebDoQYEKfwCEyFHhwQ4EpwpYQGWBB6oclk9hnrXDlokQuELAKAWkl49eOoKlBvaDWJAex3IQUbbDT7Mhfp6VkAZkRjUfM7DpWLDtxwJvQhaE6zHDDzkLC/xIj7CguZ8/YVhUX5SlQolFZSg0+JNCAhkMZSTESeOFAhn2NCRg8MIvwRGACdwQEJhgjsEERdCDgxELjQCCQwZGdMMaFN3gwUUXcKDRBUl0dEENIF1gx0gGMGBShykZsAdLBtjw0gQHnHjATBO8YNMEUtiUgQE6fQFjTn+oMIEBUizyBR0TLNXBIiQcdRciTICxV/8fGzzAByNiRMBIH1Iu0seTVmL5x5VTasllll2GCeaYW3pppphlovllmmQ2WdddfwzAByJX8DHkA1fs9ccJBRD2RwU5hADAH6cgsMMDT5xiQQGo8DDZKTxsJksOnj1WCmikwBBCL6XtcoIPqgGDgg6u/RBbD7QRcVtuovjBWwm/BYfNDMUd541y4SxAjh/W+bEACtLNsEAEwrIQxh8lVJDFIm3ggcYiebCxghl/yCCDHGOgYa0MGKSwrQBtCCCuAGOMS24V6FYxRhPsNrFCu3qsoMW8WrzRxb1dvKHBvho0gMG/GPgLcANYFIxFAlwkzEUCMTQcQwIeROwBDhJPLMIuxSKMgLEIN9jhsR03SCCyBHdsYfIWF5zsAh0utHyHCi2rccEZMhtAbR1wnLFIIAA7) repeat-x; display: inline-block; }';
		css += '.kes-enable span, .kes-disable span { user-select: none; line-height: 30px; display: block; background-repeat: no-repeat; font-weight: bold; }';
		css += '.kes-enable span { background-position: left -90px; padding: 0 10px; }';
		css += '.kes-disable span { background-position: right -180px;padding: 0 10px; }';
		css += '.kes-disable.selected { background-position: 0 -30px; }';
		css += '.kes-disable.selected span { background-position: right -210px; color: #fff; }';
		css += '.kes-enable.selected { background-position: 0 -60px; }';
		css += '.kes-enable.selected span { background-position: left -150px; color: #fff; }';
		css += '.kes-switch {margin: 5px 0; }';
		css += '.kes-switch label { cursor: pointer; }';
		css += '.kes-switch input { display: none; }';
	/**/
		css += '.kes-table {border-collapse: collapse; border-spacing: 0; box-shadow: 0 0 3px 1px rgba(0,0,0,0.2); max-width: 520px; width: 90%; }';
		css += '.kes-table td, .kes-table th {border-top: 1px solid #DDD; line-height: 20px; padding: 8px; text-align: left; vertical-align: top; }';
		css += '.kes-table th {border-top: none; font-weight: bold; }';
		css += '.kes-table tbody > tr:nth-child(2n+1) > td, .kes-table tbody > tr:nth-child(2n+1) > th {background-color: #F9F9F9; }';
	/**/
		css += '.kes-width {width: 45px; margin: 0 0 0 5px; display: inline-block; vertical-align: text-top;}';
		css += '.kes-padding {margin: 0 5px; display: inline-block;}';
		css += '@media screen and (max-width:1024px) { .kes-user-settings {position: fixed; left: 30px; right: 30px; top: 30px; bottom: 30px; } }';
	/**/
		css += '.kes-notification {position: fixed; transition: all 0.3s ease-out; z-index: 100000; font-family: sans-serif; line-height: 40px; font-size: 35px; top: 25%; left: 25%; opacity: 1; width: 50%; min-height: 40px; text-align: center; background-color: #000; color: #fff; border-radius: 15px; text-shadow: 0 -1px 1px #ddd; box-shadow: 0 15px 15px -15px #000; }';

	//#################################### JQUERY.KES ####################################//

	(function( $ ) {
		//############## PRIVATE HELPER METHODS ##############//
		var privateHelper = {
			encode : (typeof(JSON.stringify) == 'function') ? JSON.stringify : JSON.encode,
			decode : (typeof(JSON.parse) == 'function') ? JSON.parse : JSON.decode,
		};

		var callQueue = [];

		//############## METHODS FOR ALTERING THE DOM ##############//
		var kesForDom = {
			fadeOutRemove: function() {
				return this.each(function() {
					$(this).fadeOut(function() { $(this).remove(); });
				});
			},
			fadeInfadeOut: function() {
				return this.each(function() {
					$(this).fadeIn(function() { $(this).fadeOut(); });
				});
			},
			fadeOutfadeIn: function() {
				return this.each(function() {
					$(this).fadeOut(function() { $(this).fadeIn(); })
				});
			},
			multiCheckBoxes: function(values) {
				return this.each(function(i) {
					$(this).val(values[i]);
				});
			},
			resizeTextarea: function() {
				return this.each(function() {
					var textareaHeight = $(this).prop('scrollHeight'),
						windowHeight = window.innerHeight * 0.9,
						newHeight = (textareaHeight > windowHeight) ? windowHeight : textareaHeight;

						$(this).css({height: newHeight + 'px'});
				});
			},
			nullifyEmptyVal: function() {
				var value = $(this).val();
				return (value === '') ? 0 : value;
			}
		};

		//############## UTILITY METHODS ##############//
		var kesForUtil = {
			//######## SETTINGS ########//
			presets: function() {
				return {
					//* modul on/off
					modul: {
						troopsOnMap				: true,
						marketOptions			: true,
						showAttacksOnMap		: true,
						insertIntoRuntimeCalc	: true,
						highlightgroups			: false,
						massdisband				: true,
						simulator				: true,
						filterOverview			: true,
						bbCodeExport			: true,
						massforward				: true,
						trooplinks				: false,
						targetExport		 	: true,
						massbuild			 	: true,
						setGroupsOnMap			: true
					},
					//* modul end
					kata_select: 'statue',
					spylink_amount: 500,
					units: {
						modul: {
							off: true,
							def: true,
							count: true,
							spy: true
						},
						off: {
							one: { amount: 1, unit:  7 }, two: { amount: 1, unit:  9 },
							color: '#FF8274', abbr: 'O'
						},
						def: {
							one: { amount: 1, unit:  8 }, two: { amount: 1, unit: 12 },
							color: '#98F5FF', abbr: 'D'
						},
						count: {
							one: { amount: 1, unit: 11 }, two: { amount: 1, unit: 12 },
							color: '#FFFAAA', abbr: 'G'
						},
						spy: {
							one: { amount: 1, unit:  5 }, two: { amount: 1, unit: 12 },
							color: '#D15FEE', abbr: 'K'
						}
					},
					market: {
						opt1: {	name:  '10k', option: 'opt1', stone:  10000, wood:  10000, iron:  10000 },
						opt2: { name:  '50k', option: 'opt2', stone:  50000, wood:  50000, iron:  50000 },
						opt3: {	name: '100k', option: 'opt3', stone: 100000, wood: 100000, iron: 100000	},
						opt4: {	name: '200k', option: 'opt4', stone: 200000, wood: 200000, iron: 200000 },
						opt5: {	name: '321k', option: 'opt5', stone: 300000, wood: 100000, iron: 200000 },
						opt6: {	name: '213k', option: 'opt6', stone: 200000, wood: 100000, iron: 300000	},
						d3fault: 'opt4'
					},
					highlightgroups: {
						one: { name: 'a', color: '#004563', group: {} },
						two: { name: 'b', color: '#A90641',	group: {} }
					},
					trooplinks: {
						one: {
							name: 'a', farmer: 0, sword: 0, spear: 0, axe: 0,
							bow: 0,	spy: 0,	light: 0, heavy: 0,	ram: 0,	kata: 0, snob: 0
						},
						two: {
							name: 'b', farmer: 0,	sword: 0, spear: 0,	axe: 0,
							bow: 0,	spy: 0,	light: 0, heavy: 0,	ram: 0,	kata: 0, snob: 0
						},
						three: {
							name: 'c', farmer: 0, sword: 0, spear: 0, axe: 0,
							bow: 0,	spy: 0,	light: 0, heavy: 0, ram: 0, kata: 0, snob: 0
						}
					}
				}
			},
			saveSettings: function(prefix, obj) {
				var save = {};
				for(var i in obj) {
					if (obj[i] instanceof Object) {
						if(prefix.indexOf('highlightgroups') > -1 && i == 'group') {
							var groups = {};
							$('#' + prefix + i + ' input:checked').each(function () {
								var id = $(this).prop('id');
								groups[id] = id;
							});
							save[i] = groups;
						} else {
							save[i] = $.kes('saveSettings', prefix + i + '_', obj[i]);
						}
					} else {
						var elem = $('#' + prefix + i);
						if (elem.is('input[type="checkbox"]')) {
							save[i] = (elem.prop('checked')) ? true : false;
						} else {
							if(i == 'color') {
								save[i] = (isValidColor(elem.val().slice(1))) ? elem.val() : obj[i];
							} else {
								save[i] = elem.val();
							}
						}
					}
				}
				return save;
			},
			//######## UTILITIES ########//
			getUrlParameters: function(url) {
				var query = {}, pair,
					search = url.substring(url.indexOf('?') + 1).split("&"),
				i = search.length;
				while (i--) {
					pair = search[i].split("=");
					query[pair[0]] = decodeURIComponent(pair[1]);
				}
				return query;
			},
			getGroups: function(villageId) {
				var url = '/popup.php?s=groups&m=village&village_id=' + villageId + av;
				var groups = [];
				$.ajax({
					type: 'POST',
					async: false,
					url: url,
					success: function(data) {
						$(data).find('table.borderlist').eq(0).find('tr > td').each(function () {
							var tmpIn = $(this);
							groups.push({ name: tmpIn.text().trim(), id: tmpIn.find('input').attr('value'), checked: (tmpIn.find('input:checked').length == 1) ? true : false })
						});
					}
				});
				return groups;
			},
			getSession: function(url) { // TODO: replace the other session functions
				return $.ajax({
					type: 'post',
					url: url
				});
			},
			genericBBCode: function(creator, data) {
				$('body').append('<div id="kes_box"><textarea style="width: 99%; max-height: 90% !important; resize: none;" id="kes_genericBBCode"></textarea></div><div id="kes_overlay" class="kes-backlight"></div>');

				$('#kes_genericBBCode').text(creator(data));

				$('#kes_overlay').fadeIn().bind('click',function () {
					$('#kes_overlay, #kes_box').kes('fadeOutRemove');
				});
				$('#kes_box').fadeIn();
				$('#kes_genericBBCode').kes('resizeTextarea');
			},
			prettyNumber: function(number) {
				return (number + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
			},
			paddedNumber: function(number) {
				return (parseInt10(number) < 10) ? '0' + number : number;
			},
			prettyTime: function(time) {
				return Math.floor(time / 3600) + ':' + $.kes('paddedNumber', Math.floor((time % 3600) / 60)) + ':' + $.kes('paddedNumber', Math.floor(time % 60));
			},
			queue: function(options) {
				//blindly stolen from http://code.google.com/p/jquery-ajaxq/source/browse/trunk/src/jquery.ajaxq.js

				var optionsCopy = {};
				for (var o in options) {
					if(options.hasOwnProperty(o)) {
						optionsCopy[o] = options[o];
					}
				}
				options = optionsCopy;

				// Override the original callback
				var originalCompleteCallback = options.complete;

				options.complete = function (request, status) {
					// Dequeue the current request
					callQueue.shift();

					// Run the original callback
					if(originalCompleteCallback) originalCompleteCallback(request, status);

					// Run the next request from the queue
					if(callQueue.length > 0) {
						$.ajax(callQueue[0]);
					} else {
						location.reload();
					}
				};

				callQueue.push(options);
				if (callQueue.length == 1) $.ajax(options);
			},
			//######## SAVING/LOADING TO/FROM window.localStorage ########//
			loadKey: function(key) {
				try {
					return privateHelper.decode(window.localStorage.getItem(key));
				} catch(e) {
					return window.localStorage.getItem(key);
				}
			},
			saveKey: function(key, value) {
				return window.localStorage.setItem(key, privateHelper.encode(value));
			},
			deleteKey: function(key) {
				var value = privateHelper.decode(window.localStorage.getItem(key));
				window.localStorage.removeItem(key);
				return value;
			},
			isKey: function(key) {
				return window.localStorage.getItem(key);
			}
		};

		var callKES = function(that, methodArray, method, args) {
			if (methodArray[method]) {
				return methodArray[method].apply( that, args);
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.kes' );
			}
		};

		$.fn.extend({
			kes: function(method) {
				return callKES(this, kesForDom, method, Array.prototype.slice.call( arguments, 1 ));
			}
		});

		$.extend({
			kes: function(method) {
				return callKES(this, kesForUtil, method, Array.prototype.slice.call( arguments, 1 ));
			}
		});
	})($);

	//* Used to see if the correct tab is active (bg-img equals "s_back")
	function identifyActiveTab(link) { return ($('td[background*="s_back"]').find('a[href*="' + link + '"]').length != 0);}

	//* Shortcut for parseInt(x,10)
	function parseInt10(arg) { return parseInt(arg, 10); }

	//* Check if input is a correct hexcolor
	function isValidColor(hexcolor) { return (/^([0-9a-f]{1,2}){6}$/i).test(hexcolor); }

	//* printf shim for easy string replacement
	function printf(string, s) {
		if (s instanceof Array ) {
			var o = string;
			for(var i in s) {
				if (s.hasOwnProperty(i)) {
					o = o.replace('%s', s[i]);
				}
			}
			return o;
		} else {
			return string.replace('%s', s);
		}
	}

	// calculate trooppoints for every player
	function calculateTroopScore(playerPage) {
		var playerPage 	  = $(playerPage);
		var cachedTable   = playerPage.find('table.borderlist').eq(2);
		var totalScore	= cachedTable.find('tr:nth-child(3) > td:last').html().replace(/\./g, "");
		var cities		= cachedTable.find('tr:nth-child(5) > td:last').html().replace(/\./g, "");
		var bonusScore	= (cities-1) * 2250;
		var troopScoremax = cities * 10000;
		var startIndex	= playerPage.find('table.borderlist').eq(3).find('tr > th:last').parent().index();
		var cityScore	 = 0;
		playerPage.find('table.borderlist').eq(3).find('tr:gt(' + startIndex + ')').each(function () {
			cityScore += Number($(this).find('td:last').html().replace(/\./g, ""));
		});
		return [totalScore - (bonusScore + cityScore), troopScoremax];
	}

	function displayAttacksWithSeconds(element) { // TODO: fix for multipage attacks

		function createDate(time) {
			var date = new Date();
			date.setHours(parseInt10(time[0]));
			date.setMinutes(parseInt10(time[1]));
			date.setSeconds(parseInt10(time[2]));
			return date;
		}

		function formatDate(date, text) {
			var formattedDate = text;
				formattedDate = formattedDate.replace(/\d+\.\d+\./, date.getDate() + '.' + $.kes('paddedNumber', (date.getMonth() + 1)) + '.');
				formattedDate = formattedDate.replace(/[0-9]{2}:[0-9]{2}/, date.getHours() + ':' + $.kes('paddedNumber', date.getMinutes()) + ':' + $.kes('paddedNumber', date.getSeconds()));

			return formattedDate;
		}

		$('table.borderlist').eq(element).find('tr').each(function () {
			var cur = $(this);
			if (cur.find('td:last > span').length > 0) {
				var incomming = cur.find('td:last > span').text().split(':');
				var servertime = createDate($('#servertime').text().split(':'));

				servertime.setSeconds(servertime.getSeconds() + parseInt(incomming[2], 10));
				servertime.setMinutes(servertime.getMinutes() + parseInt(incomming[1], 10));
				servertime.setHours(servertime.getHours() + parseInt(incomming[0], 10));

				var replacable = cur.find('td:nth-child(4)');
				var repl = replacable.text(); // original time left without seconds
				var replacer = formatDate(servertime, repl);

				replacable.text(replacer);
			}
		});
	}

	//* Filter overdue Attacks for attack display on map
	function filterOverdueAttacks(attacks) {
		var tmp_attacks = {};
		$.each(attacks, function (villageId) {
			village_attacks = attacks[villageId];
			tmp_attacks[villageId] = {};
			tmp_attacks[villageId].length = 0;
			for(var index in village_attacks) {
				if (village_attacks.hasOwnProperty(index)) {
					var single_attack = village_attacks[index];
					var time = parseInt10(single_attack[6]) - (Date.parse(new Date()) / 1000);
					if (time > 0) {
						tmp_attacks[villageId].length = index;
						tmp_attacks[villageId][tmp_attacks[villageId].length] = single_attack;
					}
				}
			}
			if (tmp_attacks[villageId].length == 0) {
				delete tmp_attacks[villageId];
			}
		});
		var count = 0;
		for (var item in tmp_attacks) {
			if (tmp_attacks.hasOwnProperty(item)) { count++; }
		}
		if (count == 0) {
			$.kes('deleteKey', 'kes_save_attacks');
		} else {
			$.kes('saveKey', 'kes_save_attacks', tmp_attacks);
		}
	}

	function displayTrooplinks() {
		var wordToDigit = { one: 1, two: 2, three: 3 };
		var o = '<div style="padding: 5px;"><span style="font-weight: bold;">(kes) ' + l.trooplinks + '</span>';
		for(var no in k.trooplinks) {
			if (k.trooplinks.hasOwnProperty(no)) {
				o += ' <span style="font-weight: bold;">#' + wordToDigit[no] + ' </span><span class="click kes_mark" id="kes_trooplink_' + no + '">' + arrow + ' ' + k.trooplinks[no].name + ' </span> ';
			}
		}
		return o + '</div>';
	}

	function isNewerVersion(vold, vnew) {
		var o = vold.replace(/\./g, ''), n = vnew.replace(/\./g, '');
		while(o.length != n.length) {
			if (o.length > n.length) { n += '0'; } else { o += '0'; }
		}
		return (parseInt10(n) > parseInt10(o)) ? true : false;
	}

	var draw = {
		helper: {
			colorValidation: function() {
				return '<span class="kes-color-validation"><span class="kes-icons kes-icon-valid"></span><span class="kes-icons kes-icon-invalid"></span></span>';
			},
			returnOptionsForObject: function (obj) {
				out   = '';
				for(var i in obj) {
					if (obj.hasOwnProperty(i)) {
						out += '<option value="' + i + '">' + obj[i] + '</option>';
					}
				}
				return out;
			},
			returnUnitsForTrooplinks: function (no) {
				var troops = k.trooplinks[no];
				var out = '';
				out += '<ul id="kes_trooplinks_' + no + '">';
				out += '<li><span class="kes-width">Name:</span><input type="text" id="kes_trooplinks_' + no + '_name"size="5" value="' + troops.name + '" max-length="7"></li>';
				// TODO unit runtime
				for(var unit in unit_runtime) {
					if (unit_runtime.hasOwnProperty(unit)) {
						out += '<li><span class="kes-width"><img src="/img/units/unit_' + unit + '.png"></span><input id="kes_trooplinks_' + no + '_' + unit + '" type="text" value="' + troops[unit] + '" size="5"></li>';
					}
				}
				out += '</ul>';
				return out;
			},
			getContrast: function (hexcolor) {
				var r = parseInt(hexcolor.substr(0,2),16), g = parseInt(hexcolor.substr(2,2),16), b = parseInt(hexcolor.substr(4,2),16), yiq = ((r*299)+(g*587)+(b*114))/1000;
				return (yiq >= 128) ? 'black' : 'white';
			},
			returnHighlightGroups: function (no) {
				var groups = [];
				var g = k.highlightgroups[no].group;
				if (av != '') {
					//only show groups that we already saved
					for(var i in g) {
						if (g.hasOwnProperty(i)) {
							groups.push(i);
						}
					}
				} else {
					if (premium) {
						$('#group_drop_down > table > tbody > tr').each(function (i) {
							groups[i] = $(this).find('td > a').html();
						});
						groups.shift();
					} else {
						groups.push(l.none);
					}
				}

				var disabled = (av != '') ? 'disabled' : '';
				var out = '';
				for(var i = 0; i < groups.length; i++) {
					var checked = (g[groups[i]]) ? 'checked="checked"' : '';
					out += '<li><p class="kes-switch"><label class="kes-enable' + ((checked) ? ' selected' : '') + '"><span>' + l.on + '</span></label><label class="kes-disable' + ((checked) ? '' : ' selected') + '"><span>' + l.off + '</span></label><input id="' + groups[i] + '" class="checkbox" type="checkbox" ' + checked + ' ' + disabled + ' ><span class="kes-width">' + groups[i] + '</span></li>';
				}

				return out;
			}
		},
		trooplinks: function () {
			var number = ['0', 'one', 'two', 'three'], o = '';
			for(var i = 1; i <=3; i++) {
				o += '<div class="kes-paragraph" style="float: left; min-width: 170px; width: 25%;">';
				o += '<h2>KES ' + l.troops + ' #' + i + '</h2><div class="kes_list">' + this.helper.returnUnitsForTrooplinks(number[i]) + '</div></div>';
			}
			return o;
		},
		highlightgroups: function (highlightgroups) {
			var o = (av != '') ? '<h2 id="groups_av" style="color:red; text-align: center;">' + l.contentHighlightgroups.replacement + '</h2>' : '', no = 1;
			for(var i in highlightgroups) {
				if (highlightgroups.hasOwnProperty(i)) {
					o += '<div class="kes-paragraph" style="float: left; min-width: 250px; width: 25%">';
					o += '<h2>KES ' + l.group + ' #' + no + '</h2><ul id="kes_highlightgroups_' + i + '_group"><li><span class="kes-width">' + l.name + ':</span><input id="kes_highlightgroups_' + i + '_name" size="5" maxlength="4" type="text" value="' + highlightgroups[i].name + '"></li>';
					o += '<li><span class="kes-width">' + l.color + ':</span><input class="kes_color" id="kes_highlightgroups_' + i + '_color" type="text" maxlength="7" size="9" value="' + highlightgroups[i].color + '"';
					o += 'style="text-transform: uppercase; background-color: ' + highlightgroups[i].color + '; color: ' + this.helper.getContrast(highlightgroups[i].color.substring(1)) + ';">' + this.helper.colorValidation() + '</li>';
					o += this.helper.returnHighlightGroups(i) + '</ul></div>';
					no++;
				}
			}
			return o;
		},
		highlighttroops: function (unitsettings, units) {
			var o = '', unitlist = this.helper.returnOptionsForObject(units), list, amount = l.amount, color = l.color, none = l.none;
			for(var modul in unitsettings) {
				if (unitsettings.hasOwnProperty(modul)) {
					var checked = (unitsettings[modul]) ? 'checked="checked"' : '', hidden = '',
						listOne = unitlist, listTwo = unitlist + '<option value="12">' + none +'</option>', hidden = '';
					if (['spy', 'count'].indexOf(modul) > -1) {
						// modul is count or spy
						hidden = 'display: none;';
						listOne = '<option value=' + k.units[modul].one.unit + '></option>';
						listTwo = '<option value="12"></option>';
					}
					o += '<div class="kes-paragraph kes_troops" style="margin: 10px; float: left; width: 35%; min-width: 340px;"><h2>' + l.contentHighlighttroops[modul] + '</h2><p class="kes-switch"><label class="kes-enable' + ((checked) ? ' selected' : '') + '"><span>' + l.on + '</span></label><label class="kes-disable' + ((checked) ? '' : ' selected') + '"><span>' + l.off + '</span></label><input class="checkbox" type="checkbox" id="kes_units_modul_' + modul + '" ' + checked +'></p>';
					o += '<span style="vertical-align: sub;" class="kes-padding">' + l.contentHighlighttroops.abbr + ':</span><input style="width: 24px; text-align:center" type="text" id="kes_units_' + modul + '_abbr" size="1" maxlength="1" value="' + k.units[modul].abbr + '">';
					o += '<span class="kes-padding">' + color + ':</span><input class="kes_color" id="kes_units_' + modul + '_color" type="text" maxlength="7" size="9" value="' + k.units[modul].color + '" style="text-transform: uppercase; background-color: ' + k.units[modul].color + '; color: ' + this.helper.getContrast(k.units[modul].color.substring(1)) + ';">' + this.helper.colorValidation() + '<br />';
					o += '<span class="kes-padding">' + amount + ':</span><input id="kes_units_' + modul + '_one_amount" value="' + k.units[modul].one.amount + '" type="text" size="9" maxlength="5">';
					o += '<span class="kes-padding" style="' + hidden + '">' + l.unit + ' 1:</span><select id="kes_units_' + modul + '_one_unit" style="' + hidden + '"">' + listOne+ '</select><br/>';
					o += '<span class="kes-padding" style="' + hidden + '">' + amount + ':</span><input id="kes_units_' + modul + '_two_amount" value="' + k.units[modul].two.amount + '" type="text" size="9" maxlength="5" style="' + hidden + '">';
					o += '<span class="kes-padding" style="' + hidden + '">' + l.unit + ' 2:</span><select id="kes_units_' + modul + '_two_unit" style="' + hidden + '">' + listTwo + '</select></div>';
				}
			}
			return o;
		},
		modul: function (settings, modul) {
			var o = '';
			for(var m in settings) {
				if (settings.hasOwnProperty(m)) {
					var checked = (modul[m]) ? 'checked="checked"' : '';
					o += '<li class="kes-paragraph" style="margin: 5px 0;"><p class="kes-switch"><label class="kes-enable' + ((checked) ? ' selected' : '') + '"><span>' + l.on + '</span></label><label class="kes-disable' + ((checked) ? '' : ' selected') + '"><span>' + l.off + '</span></label><input id="kes_modul_' + [m] + '" class="checkbox" type="checkbox" ' + checked + '><span class="kes-padding">' + l['modul'][m] + '</span></li>';
				}
			}
			return o;
		},
		returnMarketInputs: function (market) {
			var o = '', c = 1;
			for(var opt in market) {
				if (market.hasOwnProperty(opt) && opt != 'd3fault') {
					o += '<tr><td><span class="kes-padding">#' + c + '</span>';
					o += '<input id="kes_market_' + opt +'_name" value="' + market[opt].name + '" type="text" size="10" maxlength="10"></td><td>';
					o += '<input id="kes_market_' + opt +'_option" value="' + market[opt].option + '" type="text" size="10" maxlength="10" style="display: none;">';
					o += '<input id="kes_market_' + opt +'_stone" value="' + market[opt].stone + '" type="text" size="6" maxlength="6"></td><td>';
					o += '<input id="kes_market_' + opt +'_wood" value="' + market[opt].wood + '" type="text" size="6" maxlength="6"></td><td>';
					o += '<input id="kes_market_' + opt +'_iron" value="' + market[opt].iron + '" type="text" size="6" maxlength="6"></td></tr>';
					c++;
				}
			}
			return o;
		},
		returnMarketDefault: function (market) {
			var o = '';
			for(var opt in market) {
				if (market.hasOwnProperty(opt) && opt != 'd3fault') {
					o += '<option value="' + opt + '">' + k.market[opt].name + '</option>';
				}
			}
			return o;
		}
	};

	function putSettings(start_tab) {

		var html = '';
			html += '<div id="kes_overlay" class="kes-backlight"></div>';
			html += '<div class="kes-user-settings">';
			html += '	<a href="#" id="kes_close" class="kes-close">';
			html += '		<span class="kes-icons kes-icon-close"></span>';
			html += '	</a>';
			html += '	<span id="kes_save_success" class="kes-saved">' + l.saved + '<span class="kes-icons kes-icon-saved"></span></span>';
			html += '	<div>';
			html += '		<div class="kes-menu-wrapper">';
			html += '				<span class="kes-heading">Kingsage Enhancement Suite<a href="http://kes.egoserv.com/whykes" target="_blank"><span class="kes-icons kes-icon-home"></span></a></span><span class="kes-subheading">version ' + version + '</span>';
			html += '			<div class="kes-menu">';
			html += '				<div class="kes-separator"></div>';
			html += '				<a href="#" id="kes_reset_settings">' + l.resetSettings + '</a>';
			html += '				<div class="kes-separator"></div>';
			html += '				<a href="#" rel="content_modules">' + l.enableDisableModules + '</a>';
			html += '				<a href="#" rel="content_trebuchet">' + l.buildingTrebuchet + '</a>';
			html += '				<a href="#" rel="content_spy">' + l.spy + '</a>';
			html += '				<a href="#" rel="content_market">' + l.marketSettings + '</a>';
			html += '				<a href="#" rel="content_troops">' + l.highlighttroops + '</a>';
			html += '				<a href="#" rel="content_groups">' + l.highlightgroups + '</a>';
			html += '				<a href="#" rel="content_trooplinks">' + l.trooplinks + '</a>';
			html += '				<div class="kes-separator"></div>';
			html += '			</div>';
			html += '		</div>';
			html += '		<div id="content_first" class="kes-content-wrapper">';
			html += '			<div class="kes-content-title"><h1>' + l.contentFirstUsage[0] + '</h1></div>';
			html += '			<div class="kes-content" style="line-height: 20px">';
			html += '				<div style="text-align: center"><h2 style="color: crimson;">' + l.contentFirstUsage[1] + '!</h2></div>';
			html += '				' + l.contentFirstUsage.slice(2).join('<br /><br />') + '';
			html += '			</div>';
			html += '		</div>';
			html += '		<div id="content_modules" class="kes-content-wrapper"><div class="kes-content-title"><h1>' + l.enableDisableModules + '</h1></div><div class="kes-content"><ul>' + draw.modul(presets.modul, k.modul) + '</ul></div></div>';
			html += '		<div id="content_trebuchet" class="kes-content-wrapper">';
			html += '			<div class="kes-content-title"><h1>' + l.buildingTrebuchet + '</h1></div>';
			html += '			<div class="kes-content">';
			html += '				' + l.contentTrebuchet + ': <select id="kes_kata_select" style="width: 125px;"> ' + draw.helper.returnOptionsForObject(buildings) + '</select>';
			html += '			</div>';
			html += '		</div>';
			html += '		<div id="content_spy" class="kes-content-wrapper">';
			html += '			<div class="kes-content-title"><h1>' + l.spy + '</h1></div>';
			html += '			<div class="kes-content">' + printf(l.contentSpy, '<input id="kes_spylink_amount" type="text" maxlength="5" size="6" value="' + k.spylink_amount + '">') + '</div>';
			html += '		</div>';
			html += '		<div id="content_market" class="kes-content-wrapper">';
			html += '			<div class="kes-content-title"><h1>' + l.marketSettings + '</h1></div>';
			html += '			<div class="kes-content">';
			html += '				' + l.contentMarket.default_option + ':   <select id="kes_market_d3fault">' + draw.returnMarketDefault(k.market) + '</select>';
			html += '			<table class="kes-table"><tbody>';
			html += '				<tr><th><b>' + l.name + '</b></th><th><b>' + l.contentMarket.stone + '</b></th><th><b>' + l.contentMarket.wood + '</b></th><th><b>' + l.contentMarket.iron + '</b></th></tr>';
			html += '				' + draw.returnMarketInputs(k.market) + '';
			html += '			</tbody></table>';
			html += '			</div>';
			html += '		</div>';
			html += '		<div id="content_troops" class="kes-content-wrapper"><div class="kes-content-title"><h1>' + l.contentHighlighttroops.heading + '</h1></div><div class="kes-content">' + draw.highlighttroops(k.units.modul, units) + '</div></div>';
			html += '		<div id="content_groups" class="kes-content-wrapper"><div class="kes-content-title"><h1>' + l.contentHighlightgroups.heading + '</h1></div><div class="kes-content">' + draw.highlightgroups(k.highlightgroups) +'<br style="clear: left;"></div></div>';
			html += '		<div id="content_trooplinks" class="kes-content-wrapper"><div class="kes-content-title"><h1>' + l.contentTrooplinks + '</h1></div><div class="kes-content">' + draw.trooplinks() + '</div></div>';
			html += '	</div>';
			html += '</div>';
		$('body').append(html);

		//* set default/user-settings for select boxes, order has to be top to bottom (occurence in the html) for this to match properly
		$('#kes_kata_select, #kes_market_d3fault, #kes_units_off_one_unit, #kes_units_off_two_unit, #kes_units_def_one_unit, #kes_units_def_two_unit')
			.kes('multiCheckBoxes', [k.kata_select, k.market[k.market.d3fault].option, k.units.off.one.unit, k.units.off.two.unit, k.units.def.one.unit, k.units.def.two.unit]);
		//* validate colors on the go
		$('input[class*="kes_color"]').keyup(function () {
			var color = $(this).val().slice(1);
			if (isValidColor(color)) {
				$(this).css('background-color', $(this).val());
				$(this).next('.kes-color-validation').find('span').hide().end().find('.kes-icon-valid').css({opacity: 0, display: 'inline-block'}).animate({opacity: 1}, 600);
			} else {
				$(this).next('.kes-color-validation').find('span').hide().end().find('.kes-icon-invalid').css({opacity: 0, display: 'inline-block'}).animate({opacity: 1}, 600);
			}
		});

		$('.kes-enable, .kes-disable').click(function() {
			var parent = $(this).parent('.kes-switch');
			$('.kes-enable, .kes-disable', parent).toggleClass('selected');
			$('.checkbox', parent).prop('checked', !$('.checkbox', parent).prop('checked')).trigger('change');
		});

		//* menu handling
		function switch_tabs(obj) {
			if(obj.attr('rel')) {
				$('.kes-content-wrapper').hide();
				$('.kes-menu a').removeClass('kes-active');
				var id = obj.attr('rel');
				$('#'+id).slideDown(800);
				obj.addClass('kes-active');
			}
		}

		$('.kes-menu a').click(function () { switch_tabs($(this)); });
		switch_tabs($('.kes-menu a[rel="' + start_tab + '"]'));

		//* finally fades in the settings
		setTimeout(initSettings, 50) // setTimeout is a fix for a strange DOM related bug that wouldnt fadeIn the settings on first usage
		//* fades out the settings
		$('#kes_overlay, #kes_close').bind('click', exitSettings);
		//* reset settings
		$('#kes_reset_settings').bind('click', function () {
			q = confirm(l.resetSettings + '?');
			if (q) {
				$.kes('saveKey', 'kes_user_settings', presets);
				exitSettings();
				updateSettings();
			}
		});
		//* save settings

		$('.kes-user-settings').on('change', 'input, select', function(){
			//* save settings
			$.kes('saveKey', 'kes_user_settings', $.kes('saveSettings', 'kes_', presets));
			$('#kes_save_success').kes('fadeInfadeOut');

			//* auto close on save and update settings
			updateSettings();
		});
	}

	function initSettings() {
		$('.kes-backlight').fadeIn(200);
		$('.kes-user-settings').slideDown(600);
	};

	function exitSettings() {
		$('.kes-backlight').fadeOut(600);
		$('.kes-user-settings').slideUp(600);
		setTimeout(function (){ $(".kes-backlight, .kes-user-settings").remove(); }, 700);
	};

	//* Overwrite presets with (existing) user settings
	function updateSettings() { k = $.kes('loadKey', 'kes_user_settings'); }

	//* initialize everything as default;
	var presets = $.kes('presets');
	var k = presets;
	//* check for stored user settings and change vars accordingly
	if ($.kes('isKey', 'kes_user_settings')) {
		updateSettings();
	} else {
		//* this is the first time the script is opened
		putSettings('content_first'); // TODO: doesnt turn up?!
		//* save presets in advance to prevent this from spawning if the users chooses not to click save
		$.kes('saveKey', 'kes_user_settings', k);
		//* if there is no version make sure, new settings get updated by setting the version to zero
		if (!$.kes('isKey', 'kes_version')) {
			$.kes('saveKey', 'kes_version', '0');
		}
	}
	//* if it is a newer version update user settings inserting new settings with default values
	if (isNewerVersion($.kes('loadKey', 'kes_version'), version)) {
		//* update settings
		function iterateSettings(presets, settings) {
			//* sanitiy check for empty prefix objects
			if(Object.getOwnPropertyNames(presets).length == 0) return settings;

			var new_settings = {};
			for(var i in presets) {
				if (settings.hasOwnProperty(i)) {
					if (presets[i] instanceof Object && !(presets[i] instanceof Array)) {
						new_settings[i] = iterateSettings(presets[i], settings[i]);
					} else {
						new_settings[i] = settings[i];
					}
				} else {
					new_settings[i] = presets[i];
				}
			}
			return new_settings;
		}
		var updated_settings = {};
		if ($.kes('isKey', 'kes_user_settings')) {

			try {
				settings = $.kes('loadKey', 'kes_user_settings');
				updated_settings = iterateSettings(presets, settings);
			} catch(e) {
				window.alert(l.adoptSettings);
				updated_settings = presets;
			}

		} else { updated_settings = presets; }
		//* update user_settings
		$.kes('saveKey', 'kes_user_settings', updated_settings);
		//* update version
		updateSettings();
		$.kes('saveKey', 'kes_version', version);
	}

	//* append the settings link
	$('div[id*="lay_castle_widget"] > ul > li').eq(1).append('<a class="widget_icon widget_icon_1" style="cursor: pointer;" id="kes_show_settings">kes</a>');
	$('#kes_show_settings').bind('click', function () { putSettings('content_modules'); });

	//################################################################################################//
	//#################################### FULL METAL ENHANCEMENT ####################################//
	//################################################################################################//

	if (page.match('s=overview') && !page.match('s=overview_villages')) {

		css += '.kes_group_element { display: inline-block; }';

		var place = $('span[onclick*="groups"]').parent(),
			label = $('span[onclick*="groups"]').text() + ': ',
			insert = place.parent().parent().parent().parent().parent().parent().parent(),
			villageId = Query['village'],
			groups = $.kes('getGroups', villageId),
			saveurl = 'popup.php?s=groups&m=village&inta=modifyVillageGroups&village_id=' + villageId + av;

		var formGenerator = function(groups) {
			var currentGroups = [];
			var o = '<br /><table width="790px" class="borderlist"><tr><th>';
				o += label + ' <span id="kes_groups_savestatus" style="color: green; display:none;">' + l.saved + '</span></th></tr><tr><td><form id="kes_groups" action="' + saveurl + '">';
			for(var g in groups) {
				if(groups.hasOwnProperty(g)) {
					var checked = (groups[g].checked) ? 'checked="checked"' : '';
					o += '<span class="kes_group_element"><input name="vg[]" value="' + groups[g].id + '" type="checkbox" ' + checked + '> ' + groups[g].name + ' </span>';
					if(groups[g].checked) {
						// add checked groups to regular group list
						currentGroups.push(groups[g].name);
					}
				}
			}
			o += '</form></td></tr></table><br />';
			if(currentGroups.length > 0) {
				place.text(label + currentGroups.join(', '));
			}
			return (groups.length > 0) ? o : '';
		};

		insert.before(formGenerator(groups));

		$('#kes_groups').delegate('input', 'click', function () {
			var data = $('#kes_groups');
			var newGroups = data.find('input[type="checkbox"]:checked').parent().text();
			$.ajax({
				type: 'POST',
				url: saveurl,
				data: data.serialize(),
				success: function () {
					$('#kes_groups_savestatus').kes('fadeInfadeOut');
					place.text(label + newGroups.replace(/  /g, ', '));
				}
			});
		});

	} else if (page.match('s=build_main')) {
		/* FUNCTIONALITY
		 * batch cancelling destruct orders for buildings
		 */

		var destroyText = $('a[href*="m=destroy"]').text(), tableCount = $('table.borderlist'),	isModernView = $('div.mainBuildList, div.mainBuildModern').length;

		if(tableCount.length == (6 - isModernView)) {
			// buildlist available
			var buildList = tableCount.eq(2), destroyList = $.makeArray(buildList.find('tr > td').parent().filter(function() { return $(this).find('td:first').text().match(destroyText); }));
			if(destroyList.length > 0 && destroyText != '') {
				// there are destroy items running
				buildList.before('<span class="click" id="kes_cancelAllDestroy">(kes) ' + l.cancelAllDestroy + '</span><br />'); // LANG
				$('#kes_cancelAllDestroy').bind('click', function() {
					$(this).kes('fadeOutRemove');

					function cancelDestroy(destroyList, callback) {
						var that = $(destroyList.shift()), link = that.find('a[href*="cancelBuilding"]').attr('href');
						$.ajax({
							type: 'post',
							url: link,
							success: function() {
								that.kes('fadeOutRemove');
								if(destroyList.length == 0 && buildList.length == 1) {
									buildList.kes('fadeOutRemove');
								} else {
									callback(destroyList, callback);
								}
							}
						});
					};
					cancelDestroy(destroyList, cancelDestroy);
				});
			}
		}

		if(k.modul.massbuild && premium) {

			$('a[href*="&s=build_main&a=buildBuilding"]').each(function() {
				var current  = $(this),
					row 	 = current.parent().parent(),
					level 	 = parseInt(current.text().match(/\d{1,2}/), 10) - 1 || 0,
					building = current.attr('href');
					building = building.substring(building.lastIndexOf('=') + 1);

				var modernStyling = (isModernView > 0) ? 'style="color: #F7D48E;" ' : '',
					maximumLevel  = buildCosts.getMaximumLevel( /* building stone wood iron workers */
						buildCosts[building], level, $('#stone').text().replace(".", ""), $('#wood').text().replace(".", ""), $('#iron').text().replace(".", ""), $('a[href*="&s=build_farm"]:first').parent().find('span').text().replace(".", ""));

				var data	= row.find('td'), stone, wood, ore, workers, link;
				if(data.length == 0) {
					// modern views
					stone 	= row.find('.res2'), wood = row.find('.res1'), ore = row.find('.res3'),	workers = row.find('.workers'), link = row.find('.button');
				} else {
					// classic views
					stone 	= data.eq(1), wood = data.eq(2), ore = data.eq(3), workers = data.eq(4), link = data.eq(6);
				}

				stone 	= stone.find('span').text($.kes('prettyNumber', maximumLevel[1]));
				wood	= wood.find('span').text($.kes('prettyNumber', maximumLevel[2]));
				ore		= ore.find('span').text($.kes('prettyNumber', maximumLevel[3]));
				workers	= workers.find('span').text($.kes('prettyNumber', maximumLevel[4]));

				var replacement  = '<a ' + modernStyling + 'href="' + current.attr('href') + '">' + l.buildOne + '</a> ';
					replacement += '<input type="text" maxlength="2" style="width: 17px;" data-max="' + maximumLevel[0] + '" class="kes_buildLevels" value="' + maximumLevel[0] + '"> ';
					replacement += '<span ' + modernStyling + 'class="click kes_massbuild" data-url="' + current.attr('href') + '">' + l.buildMax + '</span>';

					current.replaceWith(replacement);
			});

			$('.contentpane').on('click', '.kes_massbuild', function() {
				var url		= $(this).data('url');
					max		= $(this).siblings('input').data('max'),
					levels 	= $(this).siblings('input').val();
					levels 	= (levels > max) ? max : levels;
				for(var i = 0; i < levels; i++) {
					$.kes('queue', {
						type: 'post',
						url: url,
						success: function(data) {
						 	var content = $(data).find('.contentpane');
							$('.contentpane').replaceWith(content);
						}
					});
				}
			});
		}
	} else if (page.match('s=build_barracks')) {
		/* FUNCTIONALITY
		 * on send choose target for kata
		 * handle x,y input fields (empty if values are 0 on focus, set values 0 if empty on focusout)
		 * add insertAll Button for classic and modern view
		 * add trooplinks if enabled
		 */

		if (identifyActiveTab('&m=command')) {

			if (page.match('sub=send')) {

				$('select[name*="kata_target"]').val(k.kata_select);

			} else {

				function fillInUnits(troops) {
					for(var unit in unit_runtime) {
						if (unit_runtime.hasOwnProperty(unit)) {
							var avail = $('input[name="' + unit +'"]').siblings('span').html().replace(/[\(\)\.]/g, "");
							$('input[name="' + unit + '"]').val((parseInt10(troops[unit]) < parseInt10(avail)) ? troops[unit] : avail);
						}
					}
				}

				function insertAll(elem) { elem.each(function () { $(this).click(); }); }

				//* empty send fields when zero, fill in zeros on focusout
				$('input[id*="send_"]').focusin(function () {
					if ($('#send_x, #send_y').val() == 0) { $('input[id*="send_"]').val(''); }
				}).focusout(function () {
					if ($('#send_x, #send_y').val() == '') { $('input[id*="send_"]').val('0'); }
				});

				//* is classic view?
				if ($('div[class*="button favourites"]').length == 0) {
					$('td[valign="top"] > span[class="click"]').eq(2).before('<span class="click" id="kes_insertAll">' + arrow + ' ' + l.selectAll + '</span><br />');
					$('#kes_insertAll').bind('click', function () { insertAll($('table[class*="borderlist"]').eq(2).find('td > span')); });
					//* add trooplinks
					if (k.modul.trooplinks) { $('table.borderlist').eq(2).after(displayTrooplinks()); }
				//* is modern view!
				} else {
					$('div[class*="boxOptions"]').append('<div class="awesome-button" style="left: 409px; position: absolute; test-align: center; top: 90px;  width: 120px; text-align:center;"><span style="color: #FCD87E;" id="kes_insertAll">' + l.selectAll + '</span></div>');
					$('#kes_insertAll').bind('click', function () { insertAll($('div[class*="quantity"] > span')); });
					//* add trooplinks
					if (k.modul.trooplinks) { $('div.boxOptions').before(displayTrooplinks()); }
				}
				//* when clicked extract id (one, two, three) and fill in the units chosen in the settings
				$('span.kes_mark').click(function () {
					var number = $(this).attr('id');
					fillInUnits(k.trooplinks[number.substring(number.indexOf('kes_trooplink_') + 14)]);
				});
			}
		} else if (k.modul.massdisband && page.match('m=massdisband')) {
			/* FUNCTIONALITY
			 * replaces the original massdisband with one that only runs in 'cut of the top' mode
			 */

			$(document).ready(function () {
				//* replace kingsage button with kes button
				$('input[id*="fillOutButton"]').replaceWith('<input id="kes_disband" type="submit" value="(kes) ' + l.fillIn + '">');
				$('input#kes_disband').click(function () {
					//* collect data for wanted units
					var wanted_units = [];
					$('form#groupFilloutOption > table').find('input[id*="group"]').each(function () {
						var unit = $(this).attr('id').replace('group-', '');
						wanted_units[unit] = $(this).val();
					});
					//* fill in form fields;
					$('table#massDisbandTable > tbody > tr').each(function () {
						$(this).find('td > span[class*="click"]').parent().each(function () {
							var elem = $(this).find('input[id*="amount_"]');
							var unit = $(elem).attr('id');
								unit = unit.substring(unit.indexOf('_') +1 , unit.lastIndexOf('_'));
							var amount = $(elem).attr('value');
							if (parseInt10(amount) > parseInt10(wanted_units[unit])) {
								$(this).find('input[id*="disband_"]').val(parseInt10(amount) - parseInt10(wanted_units[unit]));
							}
						});
					});
				});
			});
		} else if (identifyActiveTab('&type=sim_battle')) {
			/* FUNCTIONALITY
			 * display long numbers
			 * toggles unit/res view
			 */

			//* Module CSS
			css += '.kes_toggle_sim { cursor: pointer; width: 25px; text-align: center; }';

			var cell = $('form[name="kingsage"] > table.borderlist > tbody > tr:last');
			var cellText = cell.find('td:first').text();
			var minus25 = '<span id="minus25" class="click">-25%</span>';
			var plus25 = '<span id="plus25" class="click">+25%</span>';
			cell.find('td:first').html(cellText.replace('-25%', minus25).replace('+25', plus25));

			//add click handler
			$('#minus25, #plus25').click(function () {
				var rel = $(this).html().replace('%', '');
				cell.find('td:last > input').val(rel);
			});

			if (k.modul.simulator && page.match('inta=battle')) {
				//* add switch to toggle units / res views
				$('table.borderlist').slice(1, 4).find('tr:first').prepend('<td class="kes_toggle_sim" rowspan="4">&raquo;</td>');

				//* replace short version (10k etc.) with long numbers
				$('table.borderlist').slice(1, 4).find('tr').each(function () {
					$(this).find('td > span, th > img').each(function () {
						$(this).parent().addClass('kes_toggle');
						var unit_long = $(this).attr('title');
						if (unit_long) {
							unit_long = unit_long.substring(0, unit_long.indexOf(' '));
							$(this).html(unit_long);
						}
					});
					//* hide resources/settlers
					$(this).find('th:gt(11), td:gt(11)').css('display', 'none').addClass('k_toggle').removeClass('kes_toggle');
				});

				//* highlight on hover & bind click events
				$('.kes_toggle_sim').hover(function () { $(this).addClass('marked'); },function () { $(this).removeClass('marked'); });
				$('.kes_toggle_sim').bind('click', function () { $('.kes_toggle, .k_toggle').toggle(); });
			}
		}
	} else if (page.match('s=tools&m=attack_planer')) {
		/* FUNCTIONALITY
		 * handle x,y input fields (empty if values are 0 on focus)
		 */

		$('input[id*="target_"]').focusin(function () {
			if ($('#target_x, #target_y').val() == 0) { $('input[id*="target_"]').val(''); }
		});

	} else if (page.match('s=map')) {
		/* FUNCTIONALITY
		 * handle map enhancements
		 * display errorbox if troops on map is not available because map setting is disabled or not reasearched yet
		 * traverse the map for settlements with attack, groups or troops to be highlighted
		 * display attacks in a box on mouseover
		 * target export for displayed minimap-area
		 */

		//* Module CSS
		css += '#kes_show_attack_info { position: fixed; z-index: 150; box-shadow: 1px 1px 5px #000; display: none; top: 5px; left: 5px; min-width: 250px; max-width: 350px; background-color: #fff; opacity: .9; }';
		css += '#kes_errorbox { position: fixed; width: 500px; z-index: 150; box-shadow: 1px 1px 5px rgb(0, 0, 0); line-height: 1.2; text-align: left; padding:5px; top: 25px; left: 25px; color: #fff; font-size: 11pt; background-color: #871919; }';
		css += '.kes_hastroops { position: absolute; padding: 1px; border: 1px solid black; width: 10px; height: 9px; line-height: 8px; font-weight: bold; }';
		css += '#kes_box { background-color: #fff; display: none; border-radius: 5px; position: fixed; width: 500px; left: 50%; top: 5%; margin-left: -250px; padding: 6px; z-index: 200; }';

		var mapOptionActivated = ($('input[name="map_show_troups"]').attr('checked') == 'checked') ? mapOptionActivated = true : mapOptionActivated = false;
		if (k.modul.troopsOnMap && !mapOptionActivated) {
			//* append notice to activate option
			var cssErrorbox = '';
			$('body').append('<div id="kes_errorbox"></div>');
			if ($('input[name="map_show_troups"]').length == 0) {
				$('#kes_errorbox').html(l.highlighttroopsError);
			} else {
				$('#kes_errorbox').html(l.highlighttroopsActivate);
			}
		}

		if (k.modul.showAttacksOnMap) {
			var saved_attacks = false, attacks = {};
			if ($.kes('isKey', 'kes_save_attacks')) {
				saved_attacks = true;
				attacks = $.kes('loadKey', 'kes_save_attacks');
				//* Check for each attack if it's already overdue, if so remove it
				filterOverdueAttacks(attacks);
			}
		}

		function mapStateChanges() {
			$('td[class*="occupied"] > div > a').each(function () {
				var active = false;
				var meta = $(this).parent().html();
				meta = meta.substring(meta.indexOf('onmouseover'), meta.indexOf('onmouseout') - 1);
				var metaSplit = meta.split(',');
				var village = $(this).attr('href');
				village = village.substring(village.lastIndexOf('id=') + 3);
				// remove av id
				if (av != '') {
					village = village.replace(av, '');
				}
				var playerName = metaSplit[3].substr(2, metaSplit[3].indexOf(' (') - 2);
				//* check if settlement belongs to the user
				var isThisMe = (self.match(playerName) && playerName != '');
				//* mark troops if enabled
				if (k.modul.troopsOnMap && isThisMe && mapOptionActivated) {
					function hasTroops(troops, units, amount) {
						var result = false, unit_1 = units[0], unit_2 = units[1];
						//troops are displayed with [.] so the dots have to be replaced
						if (parseInt10(unit_2) == 12) {
							if (parseInt10(troops[unit_1].replace(/\./g, '')) > amount[0]-1) { result = true; }
						} else {
							if (parseInt10(troops[unit_1].replace(/\./g, '')) > amount[0]-1 && parseInt10(troops[unit_2].replace(/\./g, '')) > amount[1]-1) { result = true; }
						}
						return result;
					}
					//* extract troops
					var troops = metaSplit[metaSplit.length - 4];
					//* sanitize troop string
					troops = troops.substring(2, troops.length -1 );
					troops = troops.split(':');

					function drawTroops(elem, troops, modules, pos) {
						for(var m in modules) {
							if(modules.hasOwnProperty(m)) {
								if(modules[m] && hasTroops(troops, [k.units[m].one.unit, k.units[m].two.unit], [k.units[m].one.amount, k.units[m].two.amount])) {
									elem.append('<div class="kes_hastroops" style="background-color: ' + k.units[m].color + '; color: ' + draw.helper.getContrast(k.units[m].color.substring(1)) + '; top: ' + pos[m].top +'; right: ' + pos[m].right +';">' + k.units[m].abbr +'</div>');
								}
							}
						}
					}
					drawTroops($(this), troops, k.units.modul, {def: {top: '2px', right: '2px'}, off: {top: '2px', right: '15px'}, count: {top: '14px', right: '2px'}, spy: {top: '14px', right: '15px'}});
				}
				//* check for groups to be highlighted if enabled
				if (k.modul.highlightgroups && isThisMe) {
					//* is one group of the grouparray in meta?
					function isSettlementInGroup(meta, groups) {
						var result = false;
						if (Object.getOwnPropertyNames(groups).length != 0) {
							for(var item in groups) {
								if (meta.indexOf(groups[item]) != -1) {
									result = true;
									break;
								}
							}
						}
						return result;
					}
					//* is this a group that we want to highlight?
					if (isSettlementInGroup(meta, k.highlightgroups.one.group)) {
						$(this).attr('kes_g_one', k.highlightgroups.one.name);
					}
					if (isSettlementInGroup(meta, k.highlightgroups.two.group)) {
						$(this).attr('kes_g_two', k.highlightgroups.two.name);
					}
					//* mark groups
					if ($(this).attr('kes_g_one') && $(this).attr('kes_g_two')) {
						$(this).append('<div style="position: absolute; padding: 1px; border-radius: 5px; border: 1px solid black; background-color: #FF7F50;  bottom: 2px; left: 2px; width: 5px; height: 5px;"></div>');
					} else {
						var cssMapGroups = 'position: absolute; padding: 1px; border-radius: 3px; bottom: 0px; left: 0px;';
						if ($(this).attr('kes_g_one')) {
							$(this).append('<div style="' + cssMapGroups + ' background-color:' + k.highlightgroups.one.color + '; color: ' + draw.helper.getContrast(k.highlightgroups.one.color.substring(1)) + ';"><span>' + $(this).attr('kes_g_one') + '</span></div>');
						}
						if ($(this).attr('kes_g_two')) {
							$(this).append('<div style="' + cssMapGroups + ' background-color:' + k.highlightgroups.two.color + '; color: ' + draw.helper.getContrast(k.highlightgroups.two.color.substring(1)) + ';"><span>' + $(this).attr('kes_g_two') + '</span></div>');
						}
					}
				}
				//* check for attacks is enabled
				if (k.modul.showAttacksOnMap && saved_attacks) {
					//* is the village being attacked?
					if (attacks.hasOwnProperty(village)) {
						$(this).attr('kes_villageId', village).parent().parent().attr('attacked', 'true');
					}
				}
			});
		}
		$(document).ready(function () {
			mapStateChanges();
			$('td[title], div[id*="minimap"]').live('click', mapStateChanges);

			if (k.modul.showAttacksOnMap) {
				$('body').append('<div id="kes_show_attack_info">\
					<table>\
						<tr><td id="n"></td><td align="right"><span class="click kes_mark" id="kes_close_attack_info">' + l.close + '</span></td></tr>\
						<tr><td colspan="2"><u>' + l.attacker + '</u></td></tr>\
						<tr><td>' + l.nick + ': </td><td id="p"></td></tr><tr><td>' + l.settlement + ': </td><td id="v"></td></tr>\
						<tr><td>' + l.ally + ': </td><td id="a"></td></tr><tr><td>' + l.arrival + ': </td><td id="t"></td></tr>\
						<tr><td>' + l.moreAttacks + ': </td><td id="m"></td></tr><tr><td id="s" colspan="2"></td></tr>\
					</table></div>');

				function showAttackInformation(villageId) {
					var village_attacks = attacks[villageId], len = village_attacks.length;
					var attack_single = village_attacks[0];

					var time = attack_single[6], n = attack_single[7];
					time = $.kes('prettyTime', parseInt10(time) - (Date.parse(new Date()) / 1000));
					// Alle Angriffe oder nur 20 Angrife anzeigen
					var size = Math.min(len, 20);
					function moreAttacks() { return (len == 0) ? l.none : len; };

					$('#kes_show_attack_info').find('td[id*="n"]').html('<b>' + n + '</b>')
						.end().find('td[id*="p"]').html('<a href="/game.php?s=info_player&id=' + attack_single[1] + av +'" target="_blank">' + attack_single[0] + '</a>')
							.end().find('td[id*="v"]').html('<a href="/game.php?s=info_village&id=' + attack_single[3] + av +'" target="_blank">' + attack_single[2] + '</a>')
								.end().find('td[id*="a"]').html('<a href="/game.php?s=info_ally&id=' + attack_single[5] + av +'" target="_blank">' + attack_single[4] + '</a>')
									.end().find('td[id*="t"]').html(time)
										.end().find('td[id*="m"]').html(moreAttacks())
											.end().find('td[id*="s"]').attr('villageId', villageId)
												.end().find('td[id*="s"]').html(showNextTwenty())
													.end().fadeIn('slow');

					function showNextTwenty() {
						var o;
						if (len == 0) {
							return '';
						} else {
							o = '<span style="text-align: center;" id="kes_show_all">' + printf(l.nextAttacks, size) + '</span><table>';
							for (var i = 1; i <= size; i++) {
								var attack_info = village_attacks[i];
								var y = $.kes('prettyTime', parseInt10(attack_info[6]) - (Date.parse(new Date()) / 1000));
								o += '<tr><td><a href="/game.php?s=info_player&id=' + attack_info[1] + av +'" target="_blank">' + attack_info[0] + '</a></td>';
								o += '<td><a href="/game.php?s=info_village&id=' + attack_info[3] + av +'" target="_blank">' + attack_info[2] + '</a></td><td><b>' + attack_info[7] + '</b></td><td>' + y + '</td></tr>';
							}
							o += '</table>';
							return o;
						}
					}
				}

				function pulse(element) {
					$(element).fadeOut(700).fadeIn(700);
					setTimeout(function () { pulse(element); }, 800);
				}
				pulse('td[attacked*="true"]');

				$('td[attacked*="true"]').live('mouseover', function () {
					showAttackInformation($(this).find('a').attr('kes_villageid'));
				});
				$('#kes_close_attack_info').bind('click', function () {
					$('#kes_show_attack_info').fadeOut();
				});
			}

			//*** targetexport
			//* add ui for target export
			if (k.modul.targetExport) {
				$('#mapContainer').parent().before('<form action="javascript:void(0);">' + l.player + ': <input type="text" id="kes_target"> <input type="checkbox" id="kes_onlyAbandoned"> ' + l.onlyAbandoned + '<input type="checkbox" id="kes_showAsMessage"> ' +l.asBBCode + ' <input type="submit" value="(kes) ' + l.targetExport + '" id="kes_targetExportSubmit"> <span id="kes_targetExport_error" style="color: crimson; font-weight: bold; display: none;"></span></form><br />');
				//* add handler
				$('#kes_targetExportSubmit').click(function () {
					var results = [], target = $('#kes_target').val(), onlyAbandoned = ($('#kes_onlyAbandoned:checked').length == 1);

					//* assemble data
					$('td[class*="occupied"] > div > a').each(function () {
						var meta = $(this).attr('onmouseover');
						var metaSplit = meta.split(',');

						var user = metaSplit[3];
						//* extract coordinates
						var coordinates = meta.match(/\d+\|\d+/);

						var isAbandoned = ($(this).find('img').attr('src').match(/_left.png$/));

						if(onlyAbandoned) {

							if(isAbandoned) {
								results.push(coordinates);
							}

						} else {

							if (user.match(target) != null) {
								results.push(coordinates);
							}

						}

					});

					var displayDataAsBBCode = function (data) {
						var r = data.length + ' ' + l.entries + ' \n';
						for(var i in data) {
							r += '[village]' + data[i] + '[/village] \n';
						}
						return r.substring(0,r.length-2);
					};

					var displayDataAsList = function (data) {
						var r = data.length + ' ' + l.entries + ' \n';
						for(var i in data) {
							r += '"' + data[i] + '",' + '\n';
						}
						return r.substring(0,r.length-2);
					};

					if (results.length > 0) {
						if ($('#kes_targetExport_error:visible').length == 1) {
							$('#kes_targetExport_error').fadeOut();
						}

						var creator = ($('#kes_showAsMessage:checked').length == 1) ? displayDataAsBBCode : displayDataAsList;
						$.kes('genericBBCode', creator, results);

					} else {
						$('#kes_targetExport_error').text(l.noMatch + '.').fadeIn();
					}
				});
			}

			if(k.modul.setGroupsOnMap && premium) {
				// getgroups
				var groups = $.makeArray($('#container_group_drop_down').find('a:gt(0)')).map(function(t, i) { return {id: $.kes('getUrlParameters', $(t).attr('href'))['group'], name: $(t).text() }; }),
					options = groups.map(function(i) { return '<option value="' + i.id + '">' + i.name + '</option>'; });

				$('#mapContainer').parent().before('<div id="kes_setGroupsOnMap"><select id="kes_setGroupsOnMap_select">' + options.join() + '</select> <input type="submit" id="kes_setGroupsOnMap_submit" value="' + l.setGroup + '"> <span id="kes_setGroupsOnMap_success" style="display: none; font-weight: bold;">' + l.saved + '</span></div><br />');

				$('#kes_setGroupsOnMap_submit').click(function() {
					// have to check if group is set to all

					var allGroup = $('#group_drop_down').find('table tr td').eq(0);
					if(allGroup.hasClass('marked')) {
						// reset success icon
						$('#kes_setGroupsOnMap_saved').remove();

						var groupID = $('#kes_setGroupsOnMap_select').val(),
							settlements = [],
							o = 0, n = 0,
							getVillagesOfGroup = function(groupID) {
								return $.ajax({
									type: 'post',
									url: 'popup.php?s=groups&group_id=' + groupID + av
								});
							};

						$.when(getVillagesOfGroup(groupID)).then(function(raw) {
							selectedSetts = $(raw).find('input:checked');
							selectedSetts.each(function() {
								settlements.push($(this).val());
							});

							// old groupcount
							o = settlements.length;

							$('td[class*="occupied"] > div > a').each(function () {
								var meta = $(this).attr('onmouseover'),
									user = meta.split(',')[3],
									id = $.kes('getUrlParameters', $(this).attr('href'))['id'];

									if(user.match(self)) {
										// this is us, probably doesnt matter but we'll check anyways
										if(settlements.indexOf(id) == -1) {
											// settlement is not yet checked thus add
											settlements.push(id);
										}
									}
							});

							// new groupcount
							n = settlements.length;

							if(n != o) {
								$.ajax({
									type: 'post',
									url: 'popup.php?s=groups&m=define&inta=modifyVillageGroups&group_id=' + groupID + av,
									data: 'vg[]=' + settlements.join('&vg[]='),
									success: function() {
										//report success
										$('#kes_setGroupsOnMap_success').css({color: 'green'}).kes('fadeInfadeOut').before('<span id="kes_setGroupsOnMap_saved" class="kes-icons kes-icon-saved"></span>');
									}
								});
							} else {
								$('#kes_setGroupsOnMap_success').css({color: 'green'}).kes('fadeInfadeOut').before('<span id="kes_setGroupsOnMap_saved" class="kes-icons kes-icon-saved"></span>');
							}

						});

					} else {
						// switch the group to all
						if(confirm(l.switchGroup)) {
							location.href = allGroup.find('a').attr('href');
						}
					}

				});

			}

		});
	} else if (page.match('m=attacks')) {
		/* FUNCTIONALITY
		 * insert attack into runtimecalc if enabled
		 * save attack to be displayed on map
		 * display incomming attacks with seconds
		 */

		var table = $('table.borderlist').eq(2);

		function insertIntoRuntimeCalc() {
			if (k.modul.insertIntoRuntimeCalc) {
				$('table.borderlist').eq(2).find('tr').each(function () {
					var cur = $(this);
					if (cur.find('td[class*="list"]')) {
						var children = cur.children();
						var data	 = '&target=' + children.eq(1).find('a:last').html() + '&source=' + children.eq(2).find('a:last').html() + '&time=' + children.eq(4).find('span').attr('time') + '&starttime=' + new Date().getTime();
						//* add link to runtimecalc
						children.eq(0).find('img').replaceWith('<a target="_blank" href="/game.php?&s=tools&m=runtime_calculator' + data + av + '"><img src="/img/command/attack.png"></a>');
					}
				});
			}
		}

		//* load all existing pages!
		//* make ui
		table.before('<span class="click" id="kes_allAttacks">' +  arrow + ' (kes) ' + l.loadAllAttacks + '<br /><br /></span>');

		//* we need the last pagination link to an attack page and the currently displayed page from the url
		var lastPage = $('table.borderlist').eq(2).find('a[href*="attacks&start"]:last').attr('href'),
			display  = document.URL;

		function getPages(last, display) {
			var lastN = (typeof(last) == 'undefined') ? 0 : last.substring(last.indexOf('&start=') + 7);
			if (display.indexOf('&start') > 0) {
				// the url says we are not starting from zero, that means we have to determine whether or not we are currently viewing the last page or if the last pagination link is valid
				var	displayN = display.substring(display.indexOf('&start=') + 7);
				return (lastN > displayN) ? lastN : displayN;
			} else {
				//we are on the first attack page, the pagination link is valid and we can just return that
				return lastN;
			}
		}

		function createQueue(pages) {
			var pages	= pages/50 + 1,
				step	= 50,
				url 	= '/game.php?s=ally&m=attacks&start=' + av,
				queue 	= [];
			for(var i = 0; i < pages; i++) {
				queue.push(url + (i*step));
			}
			return queue;
		}

		var pages 		= getPages(lastPage, display),
			pageQueue 	= createQueue(pages);
			queueLength = pageQueue.length;

		$('#kes_allAttacks').bind('click', function () {

			$(this).replaceWith('<span id="kes_allAttacks">' + l.loading + '... (' + (queueLength - pageQueue.length) + '/' + queueLength + ')<br /><br /></span>');
			// queueloader
			table.find('tr > td').parent().remove()
			var getAttacks = function (page) {
				$.ajax({
					type: 'POST',
					url: page.shift(),
					success: function (data) {
						var attacks = $(data).find('table.borderlist').eq(2).find('img').parent().parent();
						$('table.borderlist').eq(2).append(attacks);
						if (page.length > 0) {
							$('#kes_allAttacks').replaceWith('<span id="kes_allAttacks">' + l.loading + '... (' + (queueLength - pageQueue.length) + '/' + queueLength + ')<br /><br /></span>')
							getAttacks(page);
						} else {
							$('#kes_allAttacks').replaceWith('<span id="kes_allAttacks">' + l.loadingFinished + '<br /><br /></span>');
							setTimeout(function () { $('#kes_allAttacks').kes('fadeOutRemove'); }, 800);

							displayAttacksWithSeconds(2);
							insertIntoRuntimeCalc();
							window.timersDown = []; // reset timers array so that the page doesnt get reloaded

							//filter ui
							table.prepend('<tr style="height: 35px;"><td colspan="4"><form id="kes_filterOption"><input type="radio" name="filter" value="attacker" id="kes_filterAttacker" class="filter"> ' + l.attacker + '\
								<input type="radio" id="kes_filterDefender" value="defender" name="filter" checked="checked" class="filter"> ' + l.defender + '<span style="width: 25px; display: inline-block"> </span>' +  l.nameCoords + ': <input style="width: 100px;" type="text" id="kes_filterInput"> <span id="kes_attackRowCount"></span></div></td>\
								<td colspan="1"><span class="click" id="kes_resetFilter">' + arrow + ' ' + l.reset + '</span></td></tr>');

							//load last target
							if ($.kes('isKey', 'kes_lastAttackFilterInput')) {
								$('#kes_filterInput').val($.kes('loadKey', 'kes_lastAttackFilterInput'));
							}

							// TODO limit for MANY attacks?!
							var filterAttacks = function (event) {

								var keycodes = [ 9, 16, 17, 18, 20, 33, 34, 35];

								if(!event || keycodes.indexOf(event.keyCode) > -1) return;

								var filterOption = $('#kes_filterOption').find('input[type="radio"]:checked').val(),
									filterInput  = $('#kes_filterInput').val();
								if (filterInput == "") {
									// we need more input
									if(event.keyCode != 8) $('#kes_filterInput').css('border', '1px solid red').effect('pulsate', 300, function () { $(this).css('border', '1px solid #CFAB65'); })
								} else {
									//save input
									$.kes('saveKey', 'kes_lastAttackFilterInput', filterInput);
									//start filtering
									var target = (filterOption == 'attacker') ? 2 : 1; // attacker has column 2 in the table defender has column 1
									table.find('tr:gt(1)').show().filter(function () {
										return ($(this).find('td:eq(' + target + ')').text().search(new RegExp(filterInput, "i")) < 0);
									}).hide();

									var attackRowCount = $('table.borderlist').eq(2).find('tr:gt(1)').filter(function () { return ($(this).css('display') != 'none'); }).length;

									suffix = (attackRowCount != 1) ? ' ' + l.attacks : ' ' + l.attack;
									$('#kes_attackRowCount').text(attackRowCount + suffix);
								}
							};

							$('#kes_filterInput').bind('keyup', filterAttacks);
							$('#kes_resetFilter').bind('click', function () { table.find('tr:gt(1)').show(); });
							$('#kes_filterOption').submit(function(event) { event.preventDefault(); });

							filterAttacks();
						}
					}
				});
			}
			getAttacks(pageQueue);
		});

		displayAttacksWithSeconds(2);
		insertIntoRuntimeCalc();

		if (k.modul.showAttacksOnMap) {
			var display_delete = 'none';
			if ($.kes('isKey', 'kes_save_attacks')) {
				display_delete = 'inline';
				filterOverdueAttacks($.kes('loadKey', 'kes_save_attacks'));
			}
			$('table[class*="borderlist"]').eq(2).prepend('<tr><td colspan="5"><span id="kes_save_attacks" class="click kes_mark">' + l.saveAttacks + '</span> \
				<span id="kes_save_attacks_success" style="display: none; color: green;"> ' + l.attacksSaved + '!</span> \
				<span style="display: ' + display_delete + ';" class="click kes_mark" id="kes_delete_attacks">' + l.resetSavedAttacks + '</td></tr>');

			$('#kes_save_attacks').bind('click', function () {
				var kes_attacks = {};
				$('table[class*="borderlist"]').eq(2).find('tr > td[class*="list"]').parent().each(function () {
					var attack		 	= $(this).find('td');
					var def_attack_name = attack.eq(0).text();
					var def_villageId   = attack.eq(1).find('a[href*="info_village"]').attr('href');
					def_villageId	   = def_villageId.substring(def_villageId.lastIndexOf('id=') + 3);
					var off_player	  = attack.eq(2).find('a[href*="info_player"]').html();
					var off_playerId	= attack.eq(2).find('a[href*="info_player"]').attr('href');
					off_playerId		= off_playerId.substring(off_playerId.lastIndexOf('id=') + 3);
					var off_village	 = attack.eq(2).find('a[href*="info_village"]').html();
					var off_villageId   = attack.eq(2).find('a[href*="info_village"]').attr('href');
					off_villageId	   = off_villageId.substring(off_villageId.lastIndexOf('id=') + 3);
					var off_ally		= '-';
					var off_allyId	  = '-';
					if (attack.eq(2).find('a[href*="info_ally"]').html()) {
						off_ally   = attack.eq(2).find('a[href*="info_ally"]').html();
						off_allyId = attack.eq(2).find('a[href*="info_ally"]').attr('href');
						off_allyId = off_allyId.substring(off_allyId.lastIndexOf('id=') + 3);
					}
					// sanitize ids from av
					if (av != '') {
						def_villageId 	= def_villageId.replace(av, '');
						off_playerId 	= off_playerId.replace(av, '');
						off_villageId 	= off_villageId.replace(av, '');
						off_allyId 		= off_allyId.replace(av, '');
					}
					var attack_timeleft = attack.eq(4).find('span').attr('time');
					attack_timeleft	 = (Date.parse(new Date()) / 1000) + parseInt10(attack_timeleft);
					single_attack 		= {0: off_player, 1: off_playerId, 2: off_village, 3: off_villageId, 4: off_ally, 5: off_allyId, 6: attack_timeleft, 7: def_attack_name};
					if (kes_attacks.hasOwnProperty(def_villageId)) {
						kes_attacks[def_villageId].length = kes_attacks[def_villageId].length+1;
						kes_attacks[def_villageId][kes_attacks[def_villageId].length] = single_attack;
					} else {
						kes_attacks[def_villageId] = {};
						kes_attacks[def_villageId].length = 0;
						kes_attacks[def_villageId][kes_attacks[def_villageId].length] = single_attack;
					}
				});
				$.kes('saveKey', 'kes_save_attacks', kes_attacks);
				$('#kes_save_attacks_success').fadeIn('slow').fadeOut('fast');
			});
			$('#kes_delete_attacks').bind('click', function () {
				$(this).fadeOut('slow');
				$.kes('deleteKey', 'kes_save_attacks');
			});
		}
	} else if (k.modul.insertIntoRuntimeCalc && page.match('m=runtime_calculator')) {

		/* FUNCTIONALITY
		 * insert target & source if provided
		 * display eta and grey out units that can not be part of the attack
		 */

		if (page.match('&target=')) {

			var target 		= Query['target'].split('|'),
				source 		= Query['source'].split('|'),
				time 		= Query['time'],
				starttime 	= Query['starttime'];

			$.kes('saveKey', 'time', time);
			$.kes('saveKey', 'starttime', starttime);

			$('input[id*="start"], input[id*="target"]').kes('multiCheckBoxes', source.concat(target));
			$('input[type*="submit"]').click();

		} else if (page.match('&inta=calculate')) {

			var time 		= $.kes('deleteKey', 'time');
				starttime 	= $.kes('deleteKey', 'starttime');
				currenttime = new Date().getTime();

			time = time - Math.floor((currenttime - starttime) / 1000);
			time = (time <= 0) ? 0 : time;
			time = $.kes('prettyTime', time);

			$('table[class*="borderlist"]').eq(4).find('tbody').prepend('<tr><td colspan="3"><p style="color: #DC143C; font-weight: bold; text-align: center;">' + l.runtimecalc + ' ' + time + '</p></td></tr>');

			$('table[class*="borderlist"] > tbody > tr > td[class*="right"]').each(function () {
				var runtime_unit 	= $(this).text().split(':'),
					timeInSeconds 	= time.split(':');

				var inSeconds = function(time) {
					return parseInt10(time[0]) * 3600 + parseInt10(time[1]) * 60 + parseInt10(time[2]);
				};

				runtimeInSeconds = inSeconds(runtime_unit);
				timeInSeconds 	 = inSeconds(timeInSeconds);

				if (timeInSeconds > runtimeInSeconds) { $(this).css('color', 'grey'); }
			});
		}

	} else if (k.modul.marketOptions && page.match('s=build_market') && !page.match('inta') && identifyActiveTab('s=build_market&m=send')) {

		/* FUNCTIONALITY
		 * save last target
		 * insert marketoptions specified in the settings
		 */

		var avail_res = []; // stone, wood, iron

		//* fill in last target
		if ($.kes('isKey', 'kes_lastMarketTarget') && $('input[id="send_x"], input[id="send_y"]').val() == '') {
			var lastTarget = $.kes('loadKey', 'kes_lastMarketTarget');
				lastTarget = lastTarget.split('|');
			$('input[id="send_x"]').val(lastTarget[0]); $('input[id="send_y"]').val(lastTarget[1]);
		}
		//* save target on submit
		$('input[type="submit"]').click(function () {
			var target = $('input[id="send_x"]').val() + '|' + $('input[id="send_y"]').val();
			$.kes('saveKey', 'kes_lastMarketTarget', target);
		});
		//* get avail ressources from values after inputs
		$('table[class*="borderlist"]').eq(3).find('span').each(function () {
			avail_res.push($(this).text().replace(/[\(\)\.]/g, ''));
		});

		var avail_donkeys = $('table[class*="borderlist"]').eq(2).find('tr').eq(1).find('td').eq(0).text();
		// match numbers in string and returns first (current donkey count), this fixes problems in versions that have 2 words for donkey (russia) which broke the first implementation
		avail_donkeys = avail_donkeys.match(/(\d+)/)[0];

		function calculateRes(avail_donkeys, avail_res, wanted_res) {
			var out = [], sum = parseInt10(wanted_res[0]) + parseInt10(wanted_res[1]) + parseInt10(wanted_res[2]);
			//* check if enough donkeys are there
			if (sum <= (parseInt10(avail_donkeys) * 1000)) {
				//* just send res when there are enough
				for (var i = 0; i < 3; i++) {
					if (parseInt10(avail_res[i]) > parseInt10(wanted_res[i])) {
						out.push(wanted_res[i]);
					} else {
						out.push(avail_res[i]);
					}
				}
			} else {
				//* check how to divide res
				var donkeys = parseInt10(avail_donkeys) * 1000, scale = donkeys / sum;
				for(var i = 0; i < 3; i++) {
					if (parseInt10(avail_res[i]) > parseInt10(parseInt10(wanted_res[i]) * scale)) {
						out.push(parseInt10(parseInt10(wanted_res[i]) * scale));
					} else {
						out.push(avail_res[i]);
					}
				}
			}
			$('input[name*="send_res"]').kes('multiCheckBoxes', out);
		}
		calculateRes(avail_donkeys, avail_res, [k.market[k.market.d3fault].stone, k.market[k.market.d3fault].wood, k.market[k.market.d3fault].iron]);

		//* append marketoptions
		function createOptions(market) {
			var o = '';
			for(var opt in market) {
				if (market.hasOwnProperty(opt) && opt != 'd3fault') {
					o += ' <span id="kes_market_' + opt + '" opt="' + opt + '" class="click kes_mark">' + arrow + ' ' + market[opt].name + '</span>';
				}
			}
			return o;
		};

		$('table[class*="borderlist"]').eq(3).append('<tr><td colspan="3"><span id="kes_market_all"  opt="0" class="click kes_mark">' + arrow + ' ' + l.all + '</span>' + createOptions(k.market) +'</tr>');
		$('span[id*="kes_market_"]').bind('click', function () {
			var wanted_res = [], opt = $(this).attr('opt');
			switch (opt) {
				case '0': wanted_res.push('950000', '950000', '950000'); break;
				default: wanted_res.push(k.market[opt].stone, k.market[opt].wood, k.market[opt].iron); break;
			}
			calculateRes(avail_donkeys, avail_res, wanted_res);
		});
	} else if (premium && page.match('s=overview_villages')) {

		if (k.modul.filterOverview && identifyActiveTab('s=overview_villages&m=1')) {

			/* FUNCTIONALITY
			 * calculates distance to a target
			 * sorts settlements according to runtime
			 * also filters for a specified unit minimum
			 */

			 	var unit_runtime = { "farmer": 20, "sword": 22, "spear": 18, "axe": 18, "bow": 18, "spy": 9, "light": 10, "heavy": 11, "ram": 30, "kata": 30, "snob": 35};

			var head = '';
			$('table.borderlist').eq(3).find('tr:first > th:gt(4)').each(function () { head += '<td>' + $(this).html() + '</td>'; });

			var ui =  '<table id="filterTroops_table" class="borderlist" style="width: 820px;">';
				ui +=	'<tr><td><span id="kes_filterTroops_status">' + l.troopFilter + '</span></td>' + head + '</tr>';
				ui +=	'<tr><td><input id="kes_filterTroops"  value="' + l.filter + '" type="submit"></td><td><input type="text" name="farmer" size="4" maxlength="5"></td>';
				ui += 		'<td><input type="text" name="sword" size="4" maxlength="5"></td><td><input type="text" name="spear" size="4" maxlength="5"></td>';
				ui += 		'<td><input type="text" name="axe" size="4" maxlength="5"></td><td><input type="text" name="bow" size="4" maxlength="5"></td>';
				ui +=		'<td><input type="text" name="spy" size="4" maxlength="5"></td><td><input type="text" name="light" size="4" maxlength="5"></td>';
				ui +=		'<td><input type="text" name="heavy" size="4" maxlength="5"></td><td><input type="text" name="ram" size="4" maxlength="5"></td>';
				ui += 		'<td><input type="text" name="kata" size="4" maxlength="5"></td><td><input type="text" name="snob" size="4" maxlength="5"></td></tr>';
				ui += 	'<tr><td>Ziel: <input id="kes_filterTroops_target" type="text" size="7"></td>';
				ui +=		'<td colspan="10">' + l.toa + ': ';
				ui +=				l.days +' <input id="kes_filterTroops_arrival_d" type="text" size="2">' + l.hours + ' <input id="kes_filterTroops_arrival_h" type="text" size="2">';
				ui +=			l.minutes + ' <input id="kes_filterTroops_arrival_m" type="text" size="2"> ' + l.seconds + ' <input id="kes_filterTroops_arrival_s" type="text" size="2">';
				ui +=		' <input type="checkbox" id="kes_filterTroops_onlyTroops">' + l.withoutRuntime + '</td>';
				ui +=		'<td><input type="submit" id="kes_filterTroops_save" value="' + l.save + '"></td>';
				ui +=	'</tr><tr><td colspan="12">' + displayTrooplinks() + '</td></tr></table><br />';

			$('table.borderlist').eq(3).before(ui);

			function getWorldRuntime() {
				$.ajax({
					type: 'post',
					url: '/help.php?m=worldinfo',
					success: function (data) {
						var runtime = 1;
						runtime = parseFloat($(data).find('table.borderlist').eq(0).find('tr:gt(1):lt(1) > td:nth-child(2)').html(), 10);
						$.kes('saveKey', 'kes_worldRuntime', runtime);
					}
				});
			}

			if (!$.kes('isKey', 'kes_worldRuntime')) {
				getWorldRuntime();
			}

			function getInput() {
				var t = {};
				$('#filterTroops_table').find('input:gt(0):not(:last)').each(function (i) {
					if (i != 16) {
						($(this).val() == '') ? t[i] = 0 : t[i] = $(this).val();
					} else {
						($('#kes_filterTroops_onlyTroops:checked').length == 1) ? t[i] = true : t[i] = false;
					}
				});
				return t;
			}

			function calculateDistance(source, target) {
				var distance = Math.sqrt(Math.pow(Math.abs(parseInt10(source[0]) - parseInt10(target[0])), 2) + Math.pow(Math.abs(parseInt10(source[1]) - parseInt10(target[1])), 2));
				return Math.round(distance*100)/100;
			}

			function checkForTroops(wanted, available) {
				var r = false, count_match = 0;
				for(var i = 0;i < wanted.length; i++) { if (parseInt10(wanted[i]) <= parseInt10(available[i])) { count_match++; }}
				r = (count_match == wanted.length);
				return r;
			}

			function createBarracksString(troops) {
				var output = '', labels = ['farmer', 'sword', 'spear', 'axe', 'bow', 'spy', 'light', 'heavy', 'ram', 'kata', 'snob'];
				for(var i = 0; i < labels.length; i++) { output += '&' + labels[i] + '=' + troops[i]; }
				return output;
			}

			function getSlowestUnit(troops) {
				var units = [20, 22, 22, 18, 18, 9, 10, 11, 30, 30, 35];
				for(var i = 0; i < units.length; i++) {
					if (troops[i] == 0) { units[i] = 0; }
				}
				return Math.max.apply(Math, units);
			}

			//* load settings
			var filterTroopsInput = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: '000|000', 12: 0, 13: 0, 14: 0, 15:0, 16: false};
			if ($.kes('isKey', 'kes_filterTroops')) {
				filterTroopsInput = $.kes('loadKey', 'kes_filterTroops');
			}
			//* fill in settings
			$('#filterTroops_table').find('input:gt(0):not(:last)').each(function (i) {
				if (i != 16) {
					$(this).val(filterTroopsInput[i]);
				} else {
					if (filterTroopsInput[i]) {
						$('#kes_filterTroops_onlyTroops').prop('checked', 'checked');
					}
				}
			});
			//* user events
			$('span.kes_mark').click(function () {
				var number = $(this).attr('id');
				var troops = k.trooplinks[number.substring(number.indexOf('kes_trooplink_') + 14)];

				for(var unit in unit_runtime) {
					if (unit_runtime.hasOwnProperty(unit)) {
						$('input[name="' + unit + '"]').val(troops[unit]);
					}
				}

			});
			$('#kes_filterTroops_save').bind('click', function () {
				$.kes('saveKey', 'kes_filterTroops', getInput());
				$('#kes_filterTroops_status').fadeOut().html(l.saved).css('color', 'green').fadeIn('slow', function () {
					$(this).delay(800).html(l.troopFilter).css('color', 'black').fadeIn();
				});
			});
			$('#kes_filterTroops').bind('click', function () {
				$('table.borderlist').eq(4).find('tr:first > th:nth-child(2)').html(l.arrival);
				if (parseInt10($('#kes_filterTroops_noMatch').length) > 0) {
					$('#kes_filterTroops_noMatch').remove();
				}
				var isPaginated 	= false,
					currInput 		= getInput(),
					time 			= parseInt10(currInput[15]) + parseInt10(currInput[14])*60 + parseInt10(currInput[13])*3600 + parseInt10(currInput[12])*86400,
					target 			= currInput[11].split('|'), troops = [currInput[0], currInput[1], currInput[2], currInput[3], currInput[4], currInput[5], currInput[6], currInput[7], currInput[8], currInput[9], currInput[10]],
					barracksString 	= createBarracksString(troops), sortable = [],
					slowestUnit 	= getSlowestUnit(troops),
					lz 				= (1 / parseFloat($.kes('loadKey', 'kes_worldRuntime'), 10)) * parseFloat(slowestUnit, 10) * 60,
					onlyTroops 		= ($('#kes_filterTroops_onlyTroops:checked').length == 1) ? true : false;

				$('table.borderlist').eq(4).find('tr:gt(0)').each(function () {
					//* only if tr is not paginator
					if (!$(this).find('td:first').attr('colspan')) {
						//* collect data
						var source = $(this).find('span[id*="qeText"]').attr('title');
						source = source.match(/[0-9]{3}\|[0-9]{3}/)[0].split('|');
						//* check if runtime is short enough to get there in time
						var distance = calculateDistance(source, target);
						var runtime = Math.ceil(distance*lz);
						if (onlyTroops || runtime < time) {
							//* if there is enough time check if correct amount of troops is available
							var avail_troops = [];
							$(this).find('td:gt(4)').each(function (i) {
								var unit;
								if (i < 10) {
									unit = $(this).attr('title');
									unit = unit.substring(0, unit.indexOf(' '));
									unit = unit.replace(/\./g, '');
								} else {
									unit = $(this).find('a').html();
								}
								avail_troops.push(unit);
							});
							//* has this settlement to be visible or hidden?
							if (!checkForTroops(troops, avail_troops)) {
								$(this).css('display', 'none');
							} else {
								var id = $(this).find('td:first').find('a').attr('href');
									id = id.substring(0, id.lastIndexOf('&s=')+3);
								$(this).attr('time', runtime).css('display', 'table-row').find('td:nth-child(2)').html('<a href="' + id + 'build_barracks&m=command' + barracksString + '&send_x=' + target[0] + '&send_y=' + target[1] + av +'" target="_blank">' + $.kes('prettyTime', runtime) + '</a>');
								sortable.push(runtime);
							}
						} else {
							$(this).css('display', 'none');
						}
					} else { isPaginated = true; $(this).addClass('pagination'); }
				});
				var tbody = $('table.borderlist').eq(4).find('tbody');
				if (parseInt10($('table.borderlist').eq(4).find('tr:gt(0):visible').not('.pagination').length) == 0) {
					var appendice = '<tr id="kes_filterTroops_noMatch"><td colspan="16">' + l.noMatch + '.</td></tr>';
					if (isPaginated) {
						$('table.borderlist').eq(4).find('.pagination:first').after(appendice);
					} else {
						$('table.borderlist').eq(4).find('tr:visible').after(appendice);
					}
				} else {
					//* sort array
					sortable.sort(function (a,b) { return a-b; });
					//* move rows around to fit sort order
					$.each(sortable, function (i, time) { $('table.borderlist').eq(4).find('tr[time*="' + sortable[i] + '"]').appendTo(tbody);});
					if(isPaginated) {
						$('table.borderlist').eq(4).find('.pagination:last').appendTo(tbody);
					}
				}
			});

		} else if (identifyActiveTab('s=overview_villages&m=8')) {

			/* FUNCTIONALITY
			 * enables the user to batch research units
			 * one-click easyness
			 */

			function getResearchSession(villageId) {
				var session;
				$.ajax({
					type: 'get',
					async: false,
					url: '/game.php?village=' + villageId + '&s=build_barracks&m=research' + av,
					success: function (data) {
						var p = $(data).find('a[href*="a=research"]:first').attr('href');
						if (p) {
							session = p.substring(p.indexOf('a=research&p=') + 13, p.indexOf('&unit='));
						}
					}
				});
				return session;
			}

			//* add UI
			$('.contentpane .borderlist').eq(1).find('th').parent().before('<tr><td colspan="13"><span id="kes_research" class="click">' + l.researchMissingTroops + '</span></td></tr>');

			//* add event handling
			$('#kes_research').click(function () {

				$(this).text(l.beingProcessed + '...').css({color: 'crimson', 'font-weight': 'bold'});

				//* data array
				var research = [], session;
				//* loop trough setts, collect data and research by click
				$('.contentpane .borderlist').eq(1).find('img[src*="grey.png"]').parent().parent().each(function (i) {
					//* loop of all tr's with a grey dot
					var research_units = ['farmer', 'sword', 'spear', 'axe', 'bow', 'spy', 'light', 'heavy', 'ram', 'kata', 'snob'],
						current = $(this),
						last = current.find('td:last');

					//* get village
					var villageId = current.find('td:first').find('a').attr('href');
						villageId = villageId.substring(villageId.indexOf('village=') + 8, villageId.indexOf('&s=build_barracks'));

					//* now search for units that need research
					current.find('td:gt(0):lt(10)').each(function (i) {
						if ($(this).find('img[src*="grey.png"]').length) {
							if (last.find('img[src*="unit_' + research_units[i] + '"]').length === 0) {

								if(typeof session === 'undefined') {
									session = getResearchSession(villageId);
								}

								var researchLink = '/game.php?village=' + villageId + '&s=build_barracks&m=research&a=research&p=' + session + '&unit=' + research_units[i] + av;
								research.push(researchLink);
							}
						}
					});
				});

				if (research.length > 0) {

					// cycle missing units
					(function makeResearch(queue) {
						$.ajax({
							type: 'post',
							url: queue.shift(),
							success: function() {
								if(queue.length > 0) {
									makeResearch(queue);
								} else {
									var page = Query['start'];
									page = (typeof page === 'undefined') ? '' : '&start=' + page;
									//* reload when finished
									$.ajax({
										type: 'post',
										url: '/game.php?s=overview_villages&m=8' + page + av,
										success: function (data) {
											var table = $(data).find('.contentpane .borderlist').eq(1);
											$('.contentpane .borderlist').eq(1).replaceWith(table);
											window.alert(l.researchStarted);
										}
									});
								}
							}
						});
					})(research);

				} else {
					$(this).replaceWith(l.noMissingResearch);
					window.alert(l.noMissingResearch);
				}
			});
		} else if (page.match('m=4&type=away_detail')) {
			/* FUNCTIONALITY
			 * enables the user to batch select support in one settlement
			 * save selection over page change
			 */

			var selection = [];
			$('table[class*="borderlist"]').eq(3).find('input[type="checkbox"]').parent().parent().each(function () {
				var villageId = $(this).find('td:first').find('a').attr('href');
				villageId = villageId.substring(villageId.lastIndexOf('=') + 1);
				$(this).find('td:first').attr('colspan', '1').after('<td class="marked_group"><span class="click removeall" villageId="' + villageId + '">' + l.all + '</span></td>');
			});
			if ($.kes('isKey', 'kes_selection')) {
				$('td[colspan*="14"]').append(' <span id="kes_loadSelection" class="click kes_mark">' + l.markSelection + '</span>');
				var selection = $.kes('loadKey', 'kes_selection');

				$('#kes_loadSelection').bind('click', function () {
					for (var i in selection) {
						if (selection.hasOwnProperty(i)) {
							$('table[class*="borderlist"]').eq(3).find('td[class*="marked_group"]').parent().find('td:first > a[href*="' + selection[i] + '"]').each(function () {
								$(this).siblings('input').attr('checked', 'true');
								$(this).parent().parent().find('td[class*="marked_group"]').eq(1).find('span').removeClass('click removeall');
							});
						}
					}
				});

				$('td[colspan*="14"]').append(' <span id="kes_deleteSelection" class="click kes_mark">' + l.deleteSelection + '</span>');
				$('#kes_deleteSelection').bind('click', function () {
					$.kes('deleteKey', 'kes_selection');
					$('#kes_loadSelection, #kes_deleteSelection').kes('fadeOutRemove');
				});
			}

			$('span[class*="removeall"]').bind('click', function () {
				var villageId = $(this).attr('villageId');
				$('table[class*="borderlist"]').eq(3).find('td[class*="marked_group"]').parent().find('td:first > a[href*="' + villageId + '"]').each(function () {
					$(this).siblings('input').attr('checked', 'true');
					$(this).parent().parent().find('td[class*="marked_group"]').eq(1).find('span').removeClass('click removeall');
				});
				selection.push(villageId);
			});

			//* save selection over page change
			$('td[colspan*="14"]:first > a, td[colspan*="14"]:first > input, input[value*="' + l.retrieve + '"]').bind('click', function () {
				if (selection.length != 0) {
					$.kes('saveKey', selection);
				}
			});
		} else if (identifyActiveTab('s=overview_villages&m=6')) {

			displayAttacksWithSeconds(3);

			// runtimecalc for left flag
			if(k.modul.insertIntoRuntimeCalc && identifyActiveTab('m=6&type=all')) {

				var table = $('table.borderlist').eq(3).find('tr > td').parent();

				table.each(function() {
					var cur = $(this);
					if (cur.find('td[class*="list"]')) {
						var children = cur.children();
						var data	 = '&target=' + children.eq(2).find('a:last').html() + '&source=' + children.eq(1).find('a:last').html() + '&time=' + children.eq(4).find('span').attr('time') + '&starttime=' + new Date().getTime();
						//* add link to runtimecalc
						children.eq(0).find('img:first').remove().end().prepend('<a target="_blank" href="game.php?&s=tools&m=runtime_calculator' + data + av + '"><img src="img/command/attack.png"></a>');
					}
				});

			}

			// ignore attacks via flag
			if(identifyActiveTab('m=6&type=notignored')) {

				// setting up ui
				var table = $('table.borderlist').eq(3).find('tr > td');

				table.parent().each(function() {
					var t = $(this).find('td').eq(0),
						attId = '',
						id = $(this).find('td').eq(1).find('a').attr('href');

						attId = $.kes('getUrlParameters', t.find('a').attr('href'))['id'];
						id = $.kes('getUrlParameters', id)['id'];

					t.find('a').eq(0).before('<input type="checkbox" class="kes_help_ignore" data-sid="' + id + '" value="' + attId + '">');
				});
				table.parent().parent().append('<tr><th colspan="3"><input type="checkbox" class="kes_help_ignore" id="kes_ignore_all"> ' + l.selectAll +'</th><td colspan="2"><input id="kes_ignore_submit" type="submit" value="' + l.ignore +'"></td></tr>');

				// event handling
				$('#kes_ignore_all').click(function() {
					$('.kes_help_ignore').prop('checked', $(this).prop('checked'));
				});
				$('#kes_ignore_submit').click(function() {

					var ignore = {};
					$('.kes_help_ignore:checked').each(function() {
						var t = $(this),
							id = t.data('sid'),
							attId = t.val();

						if(!ignore[id]) {
							ignore[id] = [];
						}

						ignore[id].push(attId);
					});

					var villageId = $.kes('getUrlParameters', table.eq(0).parent().find('td').eq(1).find('a').attr('href'))['id'],
						url = 'http://s1.kingsage.de/game.php?village=' + villageId + '&s=build_barracks&m=command';

					$.when($.kes('getSession', url)).then(function(raw) {
						var session = $.kes('getUrlParameters', $(raw).find('form[name="ignore"]').attr('action'))['p'],
							ignoreUrl = 'game.php?village=kes_ignore_placeholder&s=build_barracks&m=command&a=setTroopIgnore&p=' + session + av;

						for(var sett in ignore) {
							if(ignore.hasOwnProperty(sett)) {
								$.kes('queue', {
									type: 'post',
									url: ignoreUrl.replace('kes_ignore_placeholder', sett),
									data: 'ignore[]=' + ignore[sett].join('&ignore[]='),
								});
							}
						}
					});

				});

			}

		} else if (identifyActiveTab('s=overview_villages&m=9')) {

			/* FUNCTIONALITY
			 * enables the user to set/alter groups for villages on the same page
			 * i.e without having to load the popup
			 */

			css += '.kes_multiselect { display: none; }';
			css += '.kes_multiselect_open { display: block !important; }';

			function formGenerator(markedGroups, groups, villageId) {
				var formAction = 'popup.php?s=groups&m=village&inta=modifyVillageGroups&village_id='+ villageId + av,
					html = arrow + ' <span class="click kes_multiselect_opener"><span class="kes_multiselect_count">' + markedGroups.length + '</span> ' + l.selectedGroups + '</span> <span class="kes_multiselect_status" style="display: none"></span><br />';

				html += '<div class="kes_multiselect"><form action=' + formAction + ' method="POST">';

				for(var g in groups) {
					if (groups.hasOwnProperty(g)) {
						var checkStatus = (markedGroups.indexOf(groups[g].name) != -1 ) ? 'checked="checked"' : '';
						html += '<input type="checkbox" class="checkbox" ' + checkStatus + ' name="vg[]" value="' + groups[g].id + '"><span>' + groups[g].name + '</span><br />';
					}
				}
				return html += '</form></div>';
			};

			function submitForm(div) {
				$.ajax({
					type: 'post',
					url: div.find('form').attr('action'),
					data: div.find('form').serialize(),
					success: function () {
						div.siblings('.kes_multiselect_status').css({color: 'green'}).text(l.saved).kes('fadeInfadeOut');
					}
				});
			};

			//toggle form div and submit on close
			$('.kes_multiselect_opener').live('click', function () {
				var div = $(this).siblings('div.kes_multiselect');

				$('div.kes_multiselect_open').each(function () {
					$(this).removeClass('kes_multiselect_open');
				})
				div.toggleClass('kes_multiselect_open');
			});

			//count on change
			$('.checkbox').live('change', function () {
				var form 	 = $(this).parent(),
					count 	 = form.find('.checkbox:checked').length,
					siblings = form.parent().parent().siblings();

				submitForm(form.parent());
				// alter count
				form.parent().siblings('span.click').find('.kes_multiselect_count').text(count);
				siblings.eq(1).text(count);
				//alter group display
				siblings.eq(2).html('<div style="width: 200px;">' + $.map(form.find('.checkbox:checked').next('span'), function (element) { return $(element).text() }).join('; ') + '</div>');
			});


			$(document).ready(function () {

				var tableCache 		= $('table.borderlist').eq(3),
					firstVillageId 	= tableCache.find('tr > td:first').find('a').attr('href');
					firstVillageId 	= firstVillageId.substring(firstVillageId.indexOf('village=') + 8, firstVillageId.indexOf('&s=overview_villages'));
				var groups 			= $.kes('getGroups', firstVillageId);

				tableCache.find('tr > th').parent().find('th:last').css({ width: 'auto' }).end().find('th:eq(2)').css({ width: '200px' });

				var doubleCache 	  = tableCache.find('tr > td').parent().find('td:eq(3)'),
					doubleCacheLength = doubleCache.length,
					stepSize 		  = 100,
					steps 			  = Math.ceil(doubleCacheLength / stepSize),
					step 			  = 0;


				function lazyManipulate(doubleCache) {
					// depending on the amount of settlements it can be very expensive to manipulate all cells "at once" so I built a buffer that delays the manipulation
					doubleCache.slice(step, step + stepSize).each(function () {
						var parent 		 = $(this).parent(),
							markedGroups = parent.find('td:eq(2)'),
							markedGroups = (markedGroups.find('span.notice').length == 1) ? [] : $(this).parent().find('td:eq(2)').text().trim().split("; ");
							villageId 	 = parent.find('td:eq(0)').find('a').attr('href');
							villageId 	 = villageId.substring(villageId.indexOf('village=') + 8, villageId.indexOf('&s=overview'));
						$(this).replaceWith('<td>' + formGenerator(markedGroups, groups, villageId) + '</td>');
					});

					step = step + stepSize;
					steps--;
					if (steps > 0) {
						setTimeout(function () { lazyManipulate(doubleCache) }, 50);
					}
				}
				lazyManipulate(doubleCache);
			});
		}
	} else if (page.match('s=info_village')) {
		/* FUNCTIONALITY
		 * add shortcuts to barracks and main building to every village info page
		 * add shortcuts to attack (with spies or without)
		 */
		var target  = $('a[href*="&s=build_barracks&m=command&target="]').attr('href'),
			id 		= Query['id'],
			player  = $('a[href*="info_player&"]').text();

		if (self.match(player) && player != "") {
			// this is me add links to switch to main / barracks
			$('a[href*="edit_player_colors"]').after('<br /><span><a href="/game.php?village=' + id + '&s=build_barracks' + av + '">' + arrow + ' ' + l.goToBarracks + '</a></span><br />\
				<span><a href="/game.php?village=' + id + '&s=build_main' + av + '">' + arrow + ' ' + l.goToMain + '</a></span>');
		} else {
			// this is an enemy add links to spy attack, barracks and insert koords
			$('a[href*="&s=build_barracks&m=command&target="]').after('<br /><a href="' + target + '&spy=' + k.spylink_amount+ '">' + arrow + ' ' + printf(l.attackWithSpies, k.spylink_amount) +'</a>');
		}

	} else if (page.match('s=info_player') && !(page.match('m=statistics') || page.match('m=conquers'))) {
		/* FUNCTIONALITY
		 * add bbCodeExport and sorting functionality to settlements
		 * basically lets you post into board via ajax
		 * also calculates how well the player has used their available trooppoints
		 */

		//* Module CSS
		css += 'tr.kes_selected td { background: url("img/layout/bg_table_cell_marked2.jpg") repeat-x scroll 0 0 transparent !important; }';
		css += '.unselectable { user-select: none; -moz-user-select: none; -khtml-user-select: none; }';
		css += '.kes_remove_selection { display: inline; background-color: #fff; cursor: pointer; position: relative; float: right; z-index: 150; color: crimson; font-weight: bold; }';
		css += '#kes_showSelectedSetts { position: fixed; background: #FFF; font-size: 10pt; border-radius: 5px; padding: 5px; z-index: 200; top: 10%; left: 50%; margin-left: -310px; width: 620px; max-height: 85%; overflow-y: auto; }';

		//* tags for bbCodeExport
		var post_details 			= { settlementName: 'kes_settname', nick: 'kes_player', village: 'kes_coords', continent: 'kes_continent', points: 'kes_points' };
			post_details.std_input  = post_details.village;

		if (k.modul.bbCodeExport) {

			$('table.borderlist').eq(3).prepend('<tr><th colspan="3"><span class="click" id="kes_enablebbCodeExport">' + arrow +' (kes) ' + l.enableBBCodeExport + '</span></th></tr>');
			$('#kes_enablebbCodeExport').bind('click', function () {
				$(this).parent().parent().replaceWith('<tr><th colspan="3">' + l.exportBBCode + '</td></tr><tr><td id="kes_threadId_avail" colspan="3"></td></tr><tr><td colspan="2">\
				<input type="radio" value="kontinent" name="kes_sel_setts"><span style="vertical-align: bottom; display: inline-block; width: 100px;">' + l.sortContinent + '</span>\
				<input type="radio" value="koords" name="kes_sel_setts" checked="checked"><span style="vertical-align:bottom">' + l.sortCoords + '</span></td><td></td></tr><td colspan="2">\
				<input type="radio" value="points" name="kes_sel_setts"><span style="vertical-align: bottom; display: inline-block; width: 100px">' + l.sortPoints + '</span>\
				<input type="radio" value="name" name="kes_sel_setts"><span style="vertical-align: bottom">' + l.sortName + '</span></td><td><input type="submit" id="kes_sel_setts_submit" value="' + l.bbCode + '"></td></tr>\
				<tr><td colspan="3"><span class="click kes_mark" id="kes_select_all">' + arrow + ' ' + l.selectAll + '</span> <span class="click kes_mark" id="kes_deselect_all">' + arrow + ' ' + l.deselectAll + '</span></td></tr>');

				function getKontinent (koords) { return koords.substring(4,5)+koords.substring(0,1); }
				//* prepend controls
				$('table.borderlist').eq(3).prepend('');
				//* make table unselectable
				$('table.borderlist').eq(3).addClass('unselectable');
				//* write msg whether thread was selected or not
				if ($.kes('isKey', 'kes_thread')) {
					var thread 		= $.kes('loadKey', 'kes_thread');
						threadName  = thread.name;
					$('#kes_threadId_avail').html('<span style="color: green; font-weight: bold;">' + l.thread + ' "' + threadName + '" ' + l.selected + '.</span>');
				} else {
					$('#kes_threadId_avail').html('<span style="color: crimson; font-weight: bold;">' + l.goChooseThread + '.</span>');
				}

				$(document).ready(function () {
					$.fn.selectSettlement = function () {
						if (!$(this).hasClass('kes_selected')) {
							$(this).addClass('kes_selected').find('td:first').find('a, img').css('float', 'left').end().append('<div class="kes_remove_selection"><div style="position: absolute; right: 0;">' + l.deselect + '</div></div>');
						}
					}
					var selectable = false;
					// handle selecting
					$('table.borderlist').eq(3).find('tr:gt(5)')
						.mousedown(function (){ selectable = true; })
							.mouseup(function (){ selectable = false; })
								.mousemove(function () { if (selectable) { $(this).selectSettlement(); } })
									.click(function () { $(this).selectSettlement(); });
					//* deselect handler
					$('.kes_remove_selection').live('click', function () {
						$(this).parent().parent().removeClass('kes_selected').end().end().fadeOut().remove();
					});
				});
				//* select deselect all handlers
				$('#kes_select_all').bind('click', function () { $(this).fadeOut().fadeIn(); $('table.borderlist').eq(3).find('tr:gt(5)').each(function () { $(this).selectSettlement(); }); });
				$('#kes_deselect_all').bind('click', function () { $(this).fadeOut().fadeIn(); $('table.borderlist').eq(3).find('tr:gt(5)').each(function () { $(this).removeClass('kes_selected').find('td:first > div').remove(); }); }).fadeOut().fadeIn();
				//* sort data eventually push to board
				$('#kes_sel_setts_submit').bind('click', function () {
					if ($.kes('isKey', 'kes_thread')) {
						//* collect data
						var thread 	   = $.kes('loadKey', 'kes_thread'),
							threadName = thread.name, mode = $('input[name="kes_sel_setts"]:checked').val(),
							threadId   = thread.id;
							playerName = $('table.borderlist').eq(2).find('tr:first').text().trim();
							playerName = playerName.substring(playerName.indexOf(':') + 1);
							playerName = $.trim(playerName);
						var setts = [];
						$('table.borderlist').eq(3).find('tr.kes_selected').each(function () {
							var settlementName = $(this).find('td:first > a').html(),
								xy = $(this).find('td:nth-child(2) > a').html(),
								x = parseInt10(xy.split('|')[0]), y = parseInt10(xy.split('|')[1]),
								k = getKontinent(xy), p = $(this).find('td:nth-child(3)').html();
								p = p.replace(/\./g, '');
							setts.push({pos: x + '|' + y, continent: k, points: p, sett: settlementName, nick: playerName});
						});

						function formatOutput(sett, r) {
							var o = r;
							o = o.replace(new RegExp('{' + post_details.nick		   + '}', 'g'), ' ' + sett['nick']);
							o = o.replace(new RegExp('{' + post_details.settlementName + '}', 'g'), ' ' + sett['sett']);
							o = o.replace(new RegExp('{' + post_details.village		+ '}', 'g'), ' [village]' + sett['pos'] + '[/village]');
							o = o.replace(new RegExp('{' + post_details.continent	  + '}', 'g'), ' K' + sett['continent']);
							o = o.replace(new RegExp('{' + post_details.points		 + '}', 'g'), ' ' + sett['points']);
							return o;
						}

						function confirmPost(setts, playerName, threadName, threadId, settsPerPosts) {
							var postCount = Math.ceil(setts.length/parseInt(settsPerPosts, 10));
							//* settlement count, post count, playername, threadname, threadId submit button to click
							$('body').append('<div id="kes_overlay" class="kes-backlight" style="display: block !important;"></div>\
								<div class="kes-backlight" style="position: fixed; top: 25px; left: 25px; z-index:200;">\
									<h3 style="color: white; text-align:left; opacity: 1;">' + l.close + '</h3></div>\
									<div id="kes_showSelectedSetts">\
										<div style="line-height: 1.1; text-align: left; width: 50%; margin: 0; float: left; border-right: 1px solid #DDD;">\
											<h3>' + l.summary + ':</h3>\
											' + l.postIn + ' "' + threadName +'" (<a href="/forum.php?s=forum_thread&thread_id=' + threadId + av + '" target="_blank">' + threadId + '</a>)<br /> ' + l.player + ': ' + playerName + '<br />\
											' + l.amountOfSetts + ': ' + setts.length + '<br />' + printf(l.postsToBeCreated, postCount) + '<br /><br />\
											<h3>' + l.formatting + ':</h3>\
											<h4>' + l.header + ':</h4><textarea style="min-width: 290px; max-width: 290px; min-height: 60px; max-height: 60px;" id="kes_post_top"></textarea>\
											<h4>' + l.settlementDisplay + ':</h4>\
											<span class="kes_input click">{' + post_details.nick + '}</span>, <span class="kes_input click">{' + post_details.settlementName + '}</span>, <span class="kes_input click">{' + post_details.village + '}</span>, \
											<span class="kes_input click">{' + post_details.continent + '}</span>, <span class="kes_input click">{' + post_details.points + '}</span><br />\
											<textarea style="min-width: 297px; max-width: 297px; min-height: 90px; max-height: 90px;" id="kes_post_body">{' + post_details.std_input +'}</textarea>\
											<h4>' + l.footer + ':</h4><textarea style="min-width: 290px; max-width: 290px;min-height: 60px; max-height: 60px; height: 60px;" id="kes_post_footer"></textarea>\
											<input id="confirm_post_submit" type="submit" value="' + l.confirm + '">\
										</div>\
										<div style="line-height: 1.1; text-align: left; padding-left: 3px; width: 49%; margin: 0; float: right;">\
										<h3>' + l.preview + ':</h3><span id="kes_post_preview"></span>\
										</div></div>');
							// update preview on change
							function updatePreview() {
								$('#kes_post_preview').html($('#kes_post_top').val() + '<br />' + formatOutput({pos: 'xxx|yyy', continent: 'YX', points: '10000', sett: l.settlement, nick: l.player}, $('#kes_post_body').val()) + '<br />[...]<br />' + $('#kes_post_footer').val());
							}
							updatePreview();
							$('.kes_input').bind('click', function () { $('#kes_post_body').val($('#kes_post_body').val() + $(this).html()); updatePreview(); });
							$('textarea[id*="kes_post_"]').keyup(function () {
								updatePreview();
							});
							$('.kes_overlay').bind('click', function () { $('.kes_overlay, #kes_showSelectedSetts').fadeOut().remove(); $('.kes_input').unbind('click'); });
							$('#confirm_post_submit').bind('click', function () {
								var top	= $('#kes_post_top').val(),
									format = $('#kes_post_body').val(),
									footer = $('#kes_post_footer').val(),
									output = top + '\n' + playerName + '\n',
									count  = 0,
									data   = [];
								for(var i = 0; i < setts.length; i++) {
									output += formatOutput(setts[i], format) + '\n';
									count++;
									if (count == settsPerPosts || i == setts.length-1) {
										output += footer;
										data.push(output);
										output = top + '\n' + playerName + '\n';
										count = 0;
									}
								}
								function makePost(threadId) {
									var single = data.shift();
									$.ajax({
										type: 'post',
										url: '/forum.php?s=forum_thread&thread_id=' + threadId + '&a=forumReplyThread' + av,
										data: 'text=' + single,
										complete: function () {
											if (data.length > 0) {
												makePost(threadId);
											}
										}
									});
								}
								makePost(threadId);
								$('.kes_overlay').click();
							});
						}

						function sortKoords(a, b) {
							var xya = a.pos.split('|'), xyb = b.pos.split('|'),
							a = xya[0]+xya[1], b = xyb[0]+xyb[1];
							return a-b;
						}

						function sortKontinents(a, b) {
							var xya = a.pos.split('|'), xyb = b.pos.split('|'),
							a = (a.continent * 1000) + (xya[0]+xya[1]), b = (b.continent * 1000)+ (xyb[0]+xyb[1]);
							return a-b;
						}

						function sortSetts(setts, mode) {
							switch(mode) {
								case 'kontinent': return setts.sort(sortKontinents); break;
								case 'points'   : return setts.sort(function (a, b) { return a.points-b.points; }); break;
								case 'koords'   : return setts.sort(sortKoords); break;
								default		 : return setts;
							}
						}
						confirmPost(sortSetts(setts, mode), playerName, threadName, threadId, 200);
					} else {
						window.alert(l.chooseThreadFirst + '.');
					}
				});
			});
		}

		var troopScore = calculateTroopScore($('body'));
		//append to cached table
		$('table.borderlist').eq(2).append('<tr><td>' + l.trooppoints + ':</td><td>' + $.kes('prettyNumber', troopScore[0]) + ' (' + ((troopScore[0]/troopScore[1])*100).toFixed(2) + '%)</td></tr>');

	} else if (k.modul.bbCodeExport && page.match('s=ally&m=forum')) {
		/* FUNCTIONALITY
		 * add ui for selecting a thread inside the board to post setts into
		 */

		//* create a button to save threadId, threadName;
		$('iframe[src*="forum.php"]').load(function () {
			var iframeURL = $('iframe[src*="forum.php"]').get(0).contentDocument.location.href;
			if (iframeURL.match('s=forum_thread' + av + '&thread_id=')) {
				var frame = $('iframe[src*="forum.php"]').contents();
				$(frame).find('div.smallButton:first').before('<div id="kes_save_thread" class="smallButton"><span style="cursor: pointer;">(kes) ' + l.saveThread + '</span></div>');
				$(frame).find('#kes_save_thread').bind('click', function () {
					$(this).fadeOut().fadeIn();
					var uri = $('iframe[src*="forum.php"]').contents().find('td.headerInfo > a').attr('href')
					var threadId = uri.substring(uri.indexOf('thread_id=') + 10);
					var threadName = $('iframe[src*="forum.php"]').contents().find('td.headerInfo > a').html();
					// sanitize thread id
					if (av != '') {
						threadId = threadId.replace(av, '');
					}
					var obj = { id: threadId, name: threadName }
					$.kes('saveKey', 'kes_thread', obj);
				});
			}
		});
	} else if (page.match('s=messages') && identifyActiveTab('s=messages&m=in') && !page.match('&id')) {
		/* FUNCTIONALITY
		 * multi-selection of items with colors
		 * also lets you mass-forward reports
		 */

		//* Module CSS
		css += '.kes_padding { padding: 0 5px; }';

		//* multi-all selectors
		$('input[type="checkbox"][name="confbox"]').parent().append(' <span class="click kes_mark kes_padding" rel="reports" toggle="false">' + l.reports + '</span> \
			<span class="click kes_mark kes_padding" rel="mail" toggle="false"><img src="img/messages/mail_read.png"></span> <span class="click kes_mark kes_padding" rel="misc" toggle="false"><img src="img/report/misc.png"></span> <span class="click kes_mark kes_padding" rel="green" toggle="false"><img src="img/dots/green.png"></span>\
			<span class="click kes_mark kes_padding" rel="yellow" toggle="false"><img src="img/dots/yellow.png"></span> <span class="click kes_mark kes_padding" rel="red" toggle="false"><img src="img/dots/red.png"></span> \
			<span class="click kes_mark kes_padding" rel="blue" toggle="false"><img src="img/dots/blue.png"></span> <span class="click kes_mark kes_padding" rel="support" toggle="false"><img src="img/report/support.png"></span>\
			<span class="click kes_mark kes_padding" rel="trade" toggle="false"><img src="img/report/trade.png"></span');

		//* bind clickhandler
		$('.kes_mark').click(function () {
			function selector(rel) {
				switch(rel) {
					case 'reports' 	: return 'img[src*="red"], img[src*="green"],img[src*="blue"],img[src*="yellow"]'; break;
					case 'mail'		: return 'img[src*="mail"]'; break;
					case 'misc'		: return 'img[src*="misc"]'; break;
					case 'red'	 	: return 'img[src*="red"]'; break;
					case 'yellow'  	: return 'img[src*="yellow"]'; break;
					case 'blue'		: return 'img[src*="blue"]'; break;
					case 'green'	: return 'img[src*="green"]'; break;
					case 'support' 	: return 'img[src*="support"]'; break;
					case 'trade'   	: return 'img[src*="trade"]'; break;
				}
			}

			//* lets you toggle the selection
			var toggle = $(this).attr('toggle');
			var selection = $(selector($(this).attr('rel'))).siblings('input[type="checkbox"]');
			if (toggle == 'false') {
				selection.attr('checked', true);
				$(this).attr('toggle', true);
			} else if (toggle == 'true') {
				selection.attr('checked', false);
				$(this).attr('toggle', false);
			}
		});
		if (k.modul.massforward) {

			function forward(type, details, nick) {
				var url, data;
				switch(type) {
					case 'report':
						url = 'game.php?s=messages&m=all&a=reportForward&p=' + details.p + '&id=' + details.id;
						data = 'report_to=' + nick;
						break;
					case 'message':
						url = details.url;
						data = 'msg_to=' + nick + '&confbox=on&' + details.data;
						break;
				}
				$.ajax({ type: 'post', url: url + av, data: data	});
			}

			var messageDetails = function(id) {
				return $.ajax({
					type: 'get',
					url: 'game.php?s=messages&m=forward&id=' + id + av,
				}).promise();
			};

			var reportSession = function(id) {
				return $.ajax({
					type: 'post',
					url: 'game.php?s=messages&m=forward_report&id=' + id + av,
				}).promise();
			};

			//* add ui to input a username
			$('table.borderlist').eq(5).append('<tr><td colspan="3"><span style="font-weight:bold;">' + l.recipient + ': </span><input type="text" id="kes_massforward_nick"> <input type="submit" id="kes_massforward" value="(kes) ' + l.forward + '"> <span style="display: none; font-weight: bold;" id="kes_massforward_text"></span></td></tr>');

			//* input handling
			$('#kes_massforward').bind('click', function (event) {
				event.preventDefault();
				var table 		= $('table.borderlist').eq(5);
					reports 	= table.find('img[src*="red"], img[src*="green"],img[src*="blue"],img[src*="yellow"]').siblings('input:checked');
					messages 	= table.find('img[src*="mail"]').siblings('input:checked');
					nick 		= $('#kes_massforward_nick').val();
					session		= '';

				if ((reports.length != 0 || messages.length != 0)&& nick != '') {

					$(reports).each(function () {
						var id = $(this).val();
						if(session == '') session = reportSession(id);

						session.then(function(results) {
							dt = {};
							dt['id'] = id;
							dt['p'] = $.kes('getUrlParameters', $(results).find('form').attr('action'))['p'];
							forward('report', dt, nick);
						});
					});
					$(messages).each(function() {
						var id = $(this).val(),	dt = messageDetails(id);

						dt.then(function(results) {
							var form 	 = $(results).find('form'),
								details  = {};

							details.url  = form.prop('action');
							details.data = form.find('input[type="checkbox"][name="mid[]"]').serialize();
							forward('message', details, nick)
						});
					});

					$('#kes_massforward_text').html(l.forwardSuccess + '.').css('color', 'green').fadeIn(500).delay(800).fadeOut(100);
				} else {
					$('#kes_massforward_text').html(l.forwardError + '!').css('color', 'red').fadeIn(500).delay(800).fadeOut(100);
				}
			});
		}
	} else if (page.match('s=info_ally') && !premium || identifyActiveTab('s=info_ally&m=profile')) {
		/* FUNCTIONALITY
		 * collect and sort all trooppoints of the alliance's players
		 * also generates bb-code for easy posting into the forum
		 */

		//* Module CSS
		css += '#kes_box { background-color: #fff; display: none; border-radius: 5px; position: fixed; width: 500px; left: 50%; top: 5%; margin-left: -250px; padding: 6px; z-index: 200; }';
		css += '.kes_progressOuter { border:1px solid #CFAB65; overflow: hidden; width:100px; height:10px; background: #CFAB65; }';
		css += '.kes_progressInner { width: 0px; height: 10px; background: #FFCC6E; }';

		//* set up ui
		var cachedTable = $('table.borderlist').eq(2);
		cachedTable.append('<tr><td colspan="2"><span class="click" id="kes_getAllyTroopPoints">' + l.calcTrooppoints +'</span></td></tr>');

		function getPlayerInfo(members, callback) {
			var href = members.shift();
			$.ajax({
				type: 'POST',
				url: href,
				success: function (data) {
					callback(members, data);
				}
			});
		}

		$('#kes_getAllyTroopPoints').bind('click', function () {
			$(this).unbind('click').fadeOut();

			var membersPage = cachedTable.find('a[href*="info_member"]').attr('href');
			$.when($.ajax({
				type: 'POST',
				url: membersPage
			}).then(function (data) {
				var members = [];
				$(data).find('table.borderlist').eq(2).find('a[href*="info_player"]').each(function () {
					members.push($(this).attr('href'));
				});

				function getAllPlayerInfos(members, callback) {
					var allyTroopPoints = [];
					var len = members.length;
					var left = len;
					var i = 0;

					$('#kes_getAllyTroopPoints').removeClass('click').text(l.loading + ': ' + i +'/'+ len).fadeIn().parent().attr('colspan', 0).after('<td><div class="kes_progressOuter"><div id="kes_progress" class="kes_progressInner" maxwidth="100"></div></div></td>');

					function callQueue(members) {
						getPlayerInfo(members, function (members, playerInfo) {
							var player = [];
							var playerName = $(playerInfo).find('h1').eq(1).text();
								playerName = playerName.substring(playerName.indexOf(' ') + 1);
								playerName = playerName.replace(/\(.*\)/, "").trim();

							player.push(playerName);
							player.push(calculateTroopScore(playerInfo));

							i++;
							$('#kes_getAllyTroopPoints').text(l.loading + ': ' + i +'/'+ len);
							$('#kes_progress').css({'width': i*(100/len) + '%'});

							allyTroopPoints.push(player)
							if (--left === 0) {
								$('#kes_getAllyTroopPoints').parent().parent().remove();
								callback(allyTroopPoints);
							} else {
								callQueue(members);
							}
						});
					}
					callQueue(members);
				};
				getAllPlayerInfos(members, showData);

				function showData(allyTroopPoints) {
					//* sort data according to trooppoints
					allyTroopPoints.sort(function (a,b) { return b[1][0] - a[1][0]; });

					var displayDataAsTable = function(data) {
						var o = '';
						var len = data.length;
						for(var i = 0; i < len; i++) {
							o += '<tr><td>' + data[i][0] + '</td><td>' + $.kes('prettyNumber', data[i][1][0]) + ' (' + ((data[i][1][0]/data[i][1][1])*100).toFixed(2) + '%)';
							if (i != len-1) { o += '</td></tr>'; }
						}
						return o;
					};

					var displayDataAsBBCode = function(data) {

					};

					function getDataReady(lineStart, lineMiddle, lineEnd, data) {
						var o = '';
						var len = data.length;
						for(var i = 0; i < len; i++) {
							o += lineStart + data[i][0] + lineMiddle + $.kes('prettyNumber', data[i][1][0]) + ' (' + ((data[i][1][0]/data[i][1][1])*100).toFixed(2) + '%)';
							if (i != len-1) { o += lineEnd; }
						}
						return o;
					}
					var o = arrow + ' <span class="click" id="kes_createBB">(kes) ' + l.bbCode + '</span><table class="borderlist" style="width: 420px;">';
						o += '<tr><th>' + l.player + '</th><th>' + l.trooppoints + '</th></tr>';
						o += getDataReady('<tr><td>', '</td><td>', '</td></tr>', allyTroopPoints);
						o += '</table><br />';

					$('table.borderlist').eq(3).before(o);
					$('#kes_createBB').bind('click', function () {

						$('body').append('<div id="kes_box"><textarea style="width: 99%; resize: none;" id="kes_data"></textarea></div><div id="kes_overlay"></div>');
						$('#kes_data').text(getDataReady('[player]', '[/player] ', '\n', allyTroopPoints)).select();
						$('#kes_overlay').fadeIn().bind('click',function () {
							$('#kes_overlay, #kes_box').kes('fadeOutRemove');
						});
						$('#kes_box').fadeIn();
						$('#kes_data').kes('resizeTextarea');
					});
				}
			}));
		});
	}
	//* append css to head
	var h = document.getElementsByTagName('head')[0],
		injectCss = document.createElement('style');
		injectCss.type = 'text/css';
		injectCss.appendChild(document.createTextNode(css));
		h.appendChild(injectCss);
}

var de = {
	on: 'On',
	off: 'Off',
	name: 'Name',
	donate: 'Donate',
	player: 'Player',
	selectAll: 'Select All',
	settlement: 'Settlement',
	all: 'All',
	save: 'Save',
	saved: 'saved',
	save_success: 'Save succeed',
	filter: 'Filter',
	attacker: 'Attacker',
	trooppoints: 'Troop Points',
	troops: 'Troops',
	settings: 'Settings',
	resetSettings: 'Reset Settings',
	adoptSettings: 'Failed to save the settings, and reset the changes.',
	group: 'Group',
	unit: 'Unit',
	amount: 'Amount',
	color: 'Color',
	none: 'None',
	validColor: 'Choose valid colors',
	invalidColor: 'The colors you choose are not available',
	enableDisableModules: 'Module Management',
	buildingTrebuchet: 'Catapult Target Setting',
	marketSettings: 'Market Settings',
	spy: 'Fast Espionage Setting',
	highlighttroops: 'Highlight Adjustment Association',
	highlightgroups: 'Group Highlight Setup',
	trooplinks: 'Fast Troop Links',
	contentFirstUsage: [
		'Weolcome to KES',
		'Please take your settings',
        'Nice to see you\'ve decided the <b> Kingsage Enhancement Suite </ b> to test it!',
        'The best you take a little time now to look at you on the left side all menu items and their contents and change the settings according to your wishes.',
        'With a click on the "<b> store </ b>"-button at the end over your settings.',
        'Enjoy the use of KES.'],
	contentTrebuchet: 'Predeterminated Catapult Target',
	contentSpy: 'The default amount of spyware %s ',
	contentMarket: {
		default_option: 'Automatic Selection',
		stone: 'Stone',
		wood: 'Wood',
		iron: 'Iron'
	},
	contentHighlighttroops: {
		heading: 'Union to highlight settings',
		abbr: 'Symbol',
		off: 'Attack',
		def: 'Defence',
		count: 'Cont',
		spy: 'Spy'
	},
	contentHighlightgroups: {
		heading: 'Group highlighting setting',
		replacement: 'In the absence of representation not available'
	},
	contentTrooplinks: 'Setting the default Union',
	cancelAllDestroy: '<span style="background-image:url(http://i1186.photobucket.com/albums/z379/araniaexumai/sparkle_zps5a995b94.gif);"><font size="1" style="text-shadow:#0000de 5px 5px 5px" color="#0000de">Tüm inşa işlemlerini iptal et',
	calcTrooppoints: 'Setting default Union soldiers of the Alliance calculate scores',
	loading: 'Loading',
	bbCode: 'BB-Code view',
	reports: '<font size="1" style="text-shadow:#de0000 5px 5px 5px" color="#de0000">Raporlar',
	recipient: '<font size="1" style="text-shadow:#de0000 5px 5px 5px" color="#de0000">Alıcı',
	forward: 'forward',
	forwardSuccess: 'Selected message/s and/or report/s to be transmitted',
	forwardError: 'Or forwarded several reports of a selected photo',
	saveThread: '<font size="1" style="text-shadow:#ef0000 5px 5px 5px" color="#ef0000">Konuyu seç',
	enableBBCodeExport: 'BB-Code exporter',
	exportBBCode: '<font size="1" style="text-shadow:#de0000 5px 5px 5px" color="#de0000">The following selected villages, <br>forum threads in the forum selected by BB-Code is added</font>',
	sortContinent: '<font size="1" style="text-shadow:#de0000 5px 5px 5px" color="#de0000">Sort by continent</font>',
	masscoinFixActive: 'amount embossed',
	sortCoords: '<font size="1" style="text-shadow:#de0000 5px 5px 5px" color="#de0000">Sort by Coordinates:</font>',
	sortPoints: '<font size="1" style="text-shadow:#de0000 5px 5px 5px" color="#de0000">Sort by Ratings</font>',
	sortName: '<font size="1" style="text-shadow:#de0000 5px 5px 5px" color="#de0000">Sort by Name</font>',
	bbCode: 'BB-Code',
	deselectAll: 'Deselect all',
	thread: 'Subject',
	selected: 'Selected',
	goChooseThread: 'Gehe ins Forum und wähle einen Thread aus',
	deselect: 'abwählen',
	close: 'Click to Close on the darkened area',
	summary: 'Selects summary',
	postIn: 'Selection of topics will be written:',
	amountOfSetts: 'The number of selected villages ',
	postsToBeCreated: 'To choose the number of posts to be created: %s ',
	formatting: 'Message Format',
	header: 'Title',
	settlementDisplay: 'Edit post',
	footer: 'Footer',
	confirm: 'Confirm',
	preview: 'Preview',
	chooseThreadFirst: 'Before being able to transfer required to select a topic in the forum',
	goToBarracks: 'Go to barracks',
	goToMain: 'Go to Main',
	attackWithSpies: 'Attack with %s Spies',
	selectedGroups: 'Selected Groups',
	markSelection: 'Mark selection',
	deleteSelection: 'Delete Selection',
	retrieve: 'Retrieve',
	researchMissingTroops: 'Search missing troups',
	beingProcessed: 'Being processed',
	researchStarted: 'Research started',
	noMissingResearch: 'No missing research',
	troopFilter: 'Troop filteri',
	target: 'Target',
	toa: 'Time',
	days: 'Days',
	hours: 'Hours',
	minutes: 'Minutes',
	seconds: 'Seconds',
	withoutRuntime: 'Without runtime',
	save: 'Save',
	arrival: 'Arrival',
	noMatch: 'This selection fits no match ',
	runtimecalc : 'Runtime calc',
	loadAllAttacks: 'Load all attacks',
	loadingFinished: 'Loading finished',
	defender: 'Defender',
	nameCoords: 'Player name or type coordinates',
	reset: 'Reset',
	attack: 'Attack',
	attacks: 'Attacks',
	saveAttacks: 'Save attacks',
	attacksSaved: 'Attacks saved',
	resetSavedAttacks: 'Reset saved attacks',
	highlighttroopsError: 'You can only use if it has been explored in the alchemists "highlight troops" function.',
	highlighttroopsActivate: 'Please activate below the map in the settings "Show troops" the point. This is necessary to allow troops to show on the map.',
	close: 'Close',
	nick: 'Nick',
	ally: 'Ally',
	arrival: 'Arrival',
	moreAttacks: 'This village from the other attacks',
	nextAttacks: 'Other %s attack',
	targetExport: 'Coordinate lists',
	asBBCode: '<font size=1.2>as BB-Code</font>',
	onlyAbandoned: '<font size=1.2>Lists only abandoned villages</font>',
	entries: 'There are villages',
	noMatch: 'No matches found',
	fillIn: 'Fill',
	trooplinks: 'Troop links',
	buildOne: '1 level Rises',
	buildMax: 'Level Rises',
	modul: {
        marketOptions: '<font size="2">Market Shortcuts</font><br><i><font size=1> faster shipping you can add templates to make</font></i>',
		troopsOnMap: '<font size="2">Soldier Highlighting</font><br><i><font size=1> find this feature within the village by soldiers can highlight on the map</font></i>',
		showAttacksOnMap: '<font size="2">Members of the Alliance Attacks Highlight on Map</font><br><i><font size=1> Alliance attack attack the villages with a list of the members of the alliance can highlight on the map</font></i>',
		insertIntoRuntimeCalc: '<font size="2">Add to Alliance Attacks Duration Calculator</font><br><i><font size=1>Alliance attack calculator to add in the list of attacks which time you can see that it is a union</font></i>',
		highlightgroups: '<font size="2">Highlighting Group </font><br><i><font size=1>groups according to their village on the map can highlight</font></i>',
		massdisband: '<font size="2">Ayarlı Terhis</font><br><i><font size=1>...</font></i>',
		simulator: '<font size="2">Classic Simulator</font><br><i><font size=1>Classic simulator can be used again</font></i>',
		filterOverview: '<font size="2">Filter by coordinates Union </font><br><i><font size=1>a village with this feature any time you want between your troops reached the village you can see the army</font></i>',
		bbCodeExport: '<font size="2">Add to coordinate BB-Code</font><br><i><font size=1>Player to selected villages in BB-code can add</font></i>',
		massforward: '<font size="2">Batch Routing </font><br><i><font size=1> chosen message in the message box and in bulk, you can direct reports</font></i>',
		trooplinks: '<font size="2">Templates Ready For Winters Union</font><br><i><font size=1>You can add templates ready for use in military barracks</font></i>',
		targetExport: '<font size="2">Coordinates from Map Listing</font><br><i><font size=1>You can list that appears on the map screen coordinates of the village</font></i>',
		massbuild: '<font size="2">Quick Building Constructions</font><br><i><font size=1>You can build buildings faster</font></i>',
		setGroupsOnMap: 'Gruppen via Karte setzen'
	},
	units: {
		militia: 'Farmer\'s Militia',
		sword: 'Templar',
		spear: 'Squire',
		axe: 'Berseker',
		bow: 'Long-Bow',
		spy: 'Spy',
		light: 'Crusader',
		heavy: 'Black Knigth',
		ram: 'Battering Ram',
		kata: 'Trebuchet',
		snob: 'Cont'
	},
	buildings: {
		main: 'Castle',
		stone: 'Stone',
		wood: 'Wood',
		iron: 'MIron',
		storage: 'Warehousw',
		farm: 'Miller',
		barracks: 'Barracks',
		wall: 'Town Wall',
		stable: 'Donkey Stable',
		market: 'Market',
		garage: 'Alchemist',
		snob: 'Residence',
		smith: 'Goldsmith',
		statue: 'Memorial'
	}
};

var flags = {
	de: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGzSURBVHjaYvTxcWb4+53h3z8GZpZff/79+v3n/7/fDAz/GHAAgABi+f37e3FxOZD1Dwz+/v3z9y+E/AMFv3//+Qumfv9et241QACxMDExAVWfOHkJJAEW/gUEP0EQDn78+AHE/gFOQJUAAcQiy8Ag8O+fLFj1n1+/QDp+/gQioK7fP378+vkDqOH39x9A/RJ/gE5lAAhAYhzcAACCQBDkgRXRjP034R0IaDTZTFZn0DItot37S94KLOINerEcI7aKHAHE8v/3r/9//zIA1f36/R+o4tevf1ANYNVA9P07RD9IJQMDQACxADHD3z8Ig4GMHz+AqqHagKp//fwLVA0U//v7LwMDQACx/LZiYFD7/5/53/+///79BqK/EMZ/UPACSYa/v/8DyX9A0oTxx2EGgABi+a/H8F/m339BoCoQ+g8kgRaCQvgPJJiBYmAuw39hxn+uDAABxMLwi+E/0PusRkwMvxhBGoDkH4b/v/+D2EDyz///QB1/QLb8+sP0lQEggFh+vGXYM2/SP6A2Zoaf30Ex/J+PgekHwz9gQDAz/P0FYrAyMfz7wcDAzPDtFwNAgAEAd3SIyRitX1gAAAAASUVORK5CYII=',
	us: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHzSURBVHjaYkxOP8IAB//+Mfz7w8Dwi4HhP5CcJb/n/7evb16/APL/gRFQDiAAw3JuAgAIBEDQ/iswEERjGzBQLEru97ll0g0+3HvqMn1SpqlqGsZMsZsIe0SICA5gt5a/AGIEarCPtFh+6N/ffwxA9OvP/7//QYwff/6fZahmePeB4dNHhi+fGb59Y4zyvHHmCEAAAW3YDzQYaJJ93a+vX79aVf58//69fvEPlpIfnz59+vDhw7t37968efP3b/SXL59OnjwIEEAsDP+YgY53b2b89++/awvLn98MDi2cVxl+/vl6mituCtBghi9f/v/48e/XL86krj9XzwEEEENy8g6gu22rfn78+NGs5Ofr16+ZC58+fvyYwX8rxOxXr169fPny+fPn1//93bJlBUAAsQADZMEBxj9/GBxb2P/9+S/R8u3vzxuyaX8ZHv3j8/YGms3w8ycQARmi2eE37t4ACCDGR4/uSkrKAS35B3TT////wADOgLOBIaXIyjBlwxKAAGKRXjCB0SOEaeu+/y9fMnz4AHQxCP348R/o+l+//sMZQBNLEvif3AcIIMZbty7Ly6t9ZmXl+fXj/38GoHH/UcGfP79//BBiYHjy9+8/oUkNAAHEwt1V/vI/KBY/QSISFqM/GBg+MzB8A6PfYC5EFiDAABqgW776MP0rAAAAAElFTkSuQmCC'
};

var selectLanguage = function(lang){
	switch(lang) {
		case 'kingsage.de':
			return de; break;
		case 'kingsage.org':
		case 'kingsage.com':
			return de; break;
		default:
			return de; break;
	}
};

(function () {
	var $ = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow.jQuery : jQuery || $;

	var languageSelector = location.host; // e.g. s1.kingsage.de
	languageSelector = languageSelector.substring(languageSelector.indexOf('.')+1,languageSelector.length); // e.g. kingsage.de
	var loca = selectLanguage(languageSelector);

	//* Extract uri parameters
	var Query = (function () {
		var query = {}, pair,
		search = location.search.substring(1).split("&"),
		i = search.length;
		while (i--) {
			pair = search[i].split("=");
			query[pair[0]] = decodeURIComponent(pair[1]);
		}
		return query;
	})();

	KESInit($, loca, Query);

})();