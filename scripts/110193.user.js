// ---------------------------------------
// The west legjobb ruha kivállasztó
// ---------------------------------------
//
// this script will add button to window with job information
// (any job and also town building and fort building) and if button is pushed, 
// finds best clothes for current job from inventory
// 
// author: Szotlan
// version: 1.5
// licence: 
// 	licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// 	http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// ==UserScript==
// @name The west legjobb ruha kivállasztó
// @namespace http://userscripts.org/users/110193
// @description Finds best items for selected job (works also for building in town or fort)
// @include http://*.the-west.*
// @exclude http://www.the-west.*
// @exclude http://forum.the-west.*
// ==/UserScript==

/**
 * Content Script Injection
 *
 * runs script in content scope rather than in greasemonkey sandbox
 * source: http://wiki.greasespot.net/Content_Script_Injection
 */
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }
  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

/*
 * call contentEval so whole code is executed
 * in content scope rather than greasemonkey
 * sandbox
 */
contentEval(function() {
	window.addEvent('domready', function() {
		//set this variable to true if you want
		//to see debugging output with details
		//about calculation
		var debug = false;
		var log = null;
		var sb = null;

		//better processing for string
		//concatenation
		var StringBuffer = function(str) {
			this.strings = new Array("");
			this.append(str);
			return this;
		};

		StringBuffer.prototype.append = function(str) {
			if (str) {
				this.strings.push(str);
			}
			return this;
		};

		StringBuffer.prototype.clear = function() {
			this.strings.length = 1;
			return this;
		};

		StringBuffer.prototype.removeLast = function() {
			this.strings.length -= 1;
			return this;
		};

		StringBuffer.prototype.toString = function() {
			return this.strings.join("");
		};

		// For convenience...
		Date.prototype.format = function (mask, utc) {
			return dateFormat(this, mask, utc);
		};

		/*
		 * Date Format 1.2.3
		 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
		 * MIT license
		 *
		 * Includes enhancements by Scott Trenda <scott.trenda.net>
		 * and Kris Kowal <cixar.com/~kris.kowal/>
		 *
		 * Accepts a date, a mask, or a date and a mask.
		 * Returns a formatted version of the given date.
		 * The date defaults to the current date/time.
		 * The mask defaults to dateFormat.masks.default.
		 */

		var dateFormat = function () {
			var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
				timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
				timezoneClip = /[^-+\dA-Z]/g,
				pad = function (val, len) {
					val = String(val);
					len = len || 2;
					while (val.length < len) val = "0" + val;
					return val;
				};

			// Regexes and supporting functions are cached through closure
			return function (date, mask, utc) {
				var dF = dateFormat;

				// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
				if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
					mask = date;
					date = undefined;
				}

				// Passing date through Date applies Date.parse, if necessary
				date = date ? new Date(date) : new Date;
				if (isNaN(date)) throw SyntaxError("invalid date");

				mask = String(dF.masks[mask] || mask || dF.masks["default"]);

				// Allow setting the utc argument via the mask
				if (mask.slice(0, 4) == "UTC:") {
					mask = mask.slice(4);
					utc = true;
				}

				var	_ = utc ? "getUTC" : "get",
					d = date[_ + "Date"](),
					D = date[_ + "Day"](),
					m = date[_ + "Month"](),
					y = date[_ + "FullYear"](),
					H = date[_ + "Hours"](),
					M = date[_ + "Minutes"](),
					s = date[_ + "Seconds"](),
					L = date[_ + "Milliseconds"](),
					o = utc ? 0 : date.getTimezoneOffset(),
					flags = {
						d:    d,
						dd:   pad(d),
						ddd:  dF.i18n.dayNames[D],
						dddd: dF.i18n.dayNames[D + 7],
						m:    m + 1,
						mm:   pad(m + 1),
						mmm:  dF.i18n.monthNames[m],
						mmmm: dF.i18n.monthNames[m + 12],
						yy:   String(y).slice(2),
						yyyy: y,
						h:    H % 12 || 12,
						hh:   pad(H % 12 || 12),
						H:    H,
						HH:   pad(H),
						M:    M,
						MM:   pad(M),
						s:    s,
						ss:   pad(s),
						l:    pad(L, 3),
						L:    pad(L > 99 ? Math.round(L / 10) : L),
						t:    H < 12 ? "a"  : "p",
						tt:   H < 12 ? "am" : "pm",
						T:    H < 12 ? "A"  : "P",
						TT:   H < 12 ? "AM" : "PM",
						Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
						o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
						S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
					};

				return mask.replace(token, function ($0) {
					return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
				});
			};
		}();

		// Some common format strings
		dateFormat.masks = {
			"default":      "ddd mmm dd yyyy HH:MM:ss",
			shortDate:      "m/d/yy",
			mediumDate:     "mmm d, yyyy",
			longDate:       "mmmm d, yyyy",
			fullDate:       "dddd, mmmm d, yyyy",
			shortTime:      "h:MM TT",
			mediumTime:     "h:MM:ss TT",
			longTime:       "h:MM:ss TT Z",
			isoDate:        "yyyy-mm-dd",
			isoTime:        "HH:MM:ss",
			isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
			isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
		};

		// Internationalization strings
		dateFormat.i18n = {
			dayNames: [
				"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
				"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			]
		};

		/**
		 * Object representing interface translations
		 */
		var I18n = function() {
			var self = this; //scope variable
			self.lang = "en"; //default language
			self.setLanguage = function(lang) {
				self.lang = lang;
			};
			self.getLanguage = function() {
				return self.lang;
			};
			self.phrases = 
			{
				en:
				{
					no_items_found: "Nincs megfelelő találat",	
					items_have_been_highlighted: "Találtam jobb ruhákat",
					already_wearing_items: "Már a legjobb ruhák vannak rajtad",
					item: "item",
					items: "items",
					to_change: "módosít",
					button_change_clothes: "Ruhák cseréje",
					button_best_items: "Legjobb ruhák",
					processing_wait_please: "Kérlek várj ...",
					done: "Kész",
					error: "Hiba ",
					duel_melee: "Lőfegyver",
					duel_firearms: "Ütőfegyver" 
				},
				cz:
				{
					no_items_found: "Nebylo nalezeno žádné vhodné oblečení",	
					items_have_been_highlighted: "Navrhované oblečení bylo označeno",
					already_wearing_items: "Již máš na sobě všechno navrhované oblečení",
					item: "oblečení",
					items: "oblečení",
					to_change: "na převlečení",
					button_change_clothes: "Převléct oblečení",
					button_best_items: "Nejlepší oblečení",
					processing_wait_please: "Probíhá zpracování, čekejte prosím ...",
					done: "Hotovo",
					error: "Chyba",
					duel_melee: "Chladná zbraň",
					duel_firearms: "Střelná zbraň" 
				}
				/**
				 * here will go other translations
				 */
			};
			/**
			 * returns phrase for current language
			 * if phrase doesn't exist in current language
			 * english phrase is search - if it exist in english, then
			 * english version of 'phrase_name' is returned otherwise
			 * phrase is unknown and therefore '???' string is returned
			 */
			self.getPhrase = function(phrase_name) {
				var phrase = self.phrases[self.lang][phrase_name];
				if (phrase) 
				{
					return phrase;
				}
				else
				{
					var en_phrase = self.phrases["en"][phrase_name];
					return (en_phrase ? en_phrase : "???");
				}
			};
		};

		/**
		 * global variable representing Language instance
		 */
		var lang = new I18n();

		/**
		 * sets interface language based on the domain
		 * of the-west server
		 */
		var setInterfaceLanguage = function() {
			var parts = location.hostname.split(".");
			var domain = parts[parts.length - 1];
			switch(domain) {
				//here may be other languages
				case "cz" : lang.setLanguage("cz"); break;
				default: lang.setLanguage("en");
			}
		};

		/**
		 * adds new line to log buffer
		 */
		var appendToLog = function(text, hideDate) {
			if (sb) {
				sb.append("\n");
				if (!hideDate) {
					var now = new Date();
					sb.append(now.format('"[" mm.dd.yyyy HH:MM:ss","L" ]  "'));
				}
				sb.append(text);
			}
		};

		/**
		 * prints log into debugging window
		 */
		var printLog = function() {
			if (sb && log) {
				log.appendText(sb.toString());
				sb.clear();
			}
		};

		//settings
		var createCookie = function(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		};

		var readCookie = function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		};

		var eraseCookie = function(name) {
			createCookie(name,"",-1);
		};

		var random = function(lower, upper) {
			return (Math.floor((Math.random() * (upper - lower + 1)) + lower));
		};

		/**
		 * append window with debugging output if debugging is enabled
		 */
		(function() {
			if (debug) {
				log = new Element('textarea');
				log.style.width = '100%';
				log.style.height = '500px';
				$('footer').appendChild(log);
				sb = new StringBuffer();
				if (debug) {
					appendToLog('=========================================================', true);
					appendToLog('  The west legjobb ruha kivállasztó - Debugging Output  ', true);
					appendToLog('=========================================================', true);
					appendToLog('', true);
					printLog();
				}
			}
		})();

		/*
		 * wrapper for items
		 * 
		 * in the-west core script character attributes and skills 
		 * are stored in Character object
		 * 	attributes: 
		 * 		Character.attributes = {}; property is attribute name
		 * 	skills: 
		 * 		Character.skill_names[attribute] = []; array with names
		 */ 	
		var ItemWrapper = function(optobj) {
			//default values
			this.skillBonus = {}; //dynamic programming cache, don't calculate bonus everytime we need it
			this.item = null; //the west item object
			this.wearing = false; //if character is already wearing item or needs to carry it
			//set values
			for (var i in optobj) { this[i] = optobj[i]; }
		};
		/**
		 * returns bonus points of current item for provided 'skill' parameter
		 * if 'skill' is unknown or if item doesn't add any bonus on
		 * current skill returns 0
		 */
		ItemWrapper.prototype.getSkillBonus = function(skill) {
			//bonus not calculated yet
			if (!this.skillBonus[skill]) {
				var obj = this.item.obj;
				var bonus = 0;
				//check skill bonus
				if (obj.bonus.skills.length != 0) {
					if (obj.bonus.skills[skill] != undefined) {
						bonus += obj.bonus.skills[skill];
					}
				}
				//check attribute bonus
				if (obj.bonus.attributes.length != 0) {
					for (var key in obj.bonus.attributes) {
						if (Character.skill_names[key].contains(skill)) {
							bonus += obj.bonus.attributes[key];
						}
					}
				}
				this.skillBonus[skill] = bonus;
			}
			return this.skillBonus[skill];
		};

		ItemWrapper.prototype.toString = function() {
			return (this.item) ? this.item.obj.name : "";
		};

		/**
		 * returns array with all possible wear types
		 *
		 * (in version 1.3 of the-west were added new wear types - pants and belt
		 * maybe, there will be some other in future, so it's better to obtain values
		 * dynamically straight from the core code)
		 */
		var wearTypesList = function() {
			//note: it's not necessary to check all available wear types in game
			//because we only have items from bag or items we are wearing
			//(so types of these items are enough)
			
			var result_set = [];
			
			var bag = Bag.getInstance();
			//first loop through bag object
			for (var key in bag.items) {
				var item = bag.items[key];
				var type = item.get_type();
				if (!result_set.contains(type)) result_set.include(type);
			}

			var wear = Wear.wear;
			//then go through wear items
			for (var key in wear) {
				var item = wear[key];
				var type = item.get_type();
				if (!result_set.contains(type)) result_set.include(type);
			}

			return result_set;
		};
	

		/**
		 * creates map of both inventory and wear items
		 * it is usefull for better later processing
		 * skips all items that we can't wear because of
		 * restrictions (character sex, character class
		 * and item required level)
		 * map structure (key => value)
		 * 	key: item type = "body" | "yield" | "neck" | "foot" | "head" | "right_arm" | "left_arm" | "animal"
		 * 	value: array with items [ item1, item2, ..., itemN ]
		 *
		 * TODO test restrictions: character sex, character class 
		 * 	these restrictions are implemented but not tested yet (but they should work :))
		 */ 
		var getItemsMap = function() {
			if (debug) {
				appendToLog("Creating items map");
			}
			var items = {};
			var sets = {}; //contains items that may be part of a set
			//first go through bag items
			var bag = Bag.getInstance();
			if (debug) appendToLog("\tProcessing bag items ...");
			for (var key in bag.items) {
				var item = bag.items[key];
				//skip items which are not for my character sex
				var characterSex = item.obj.characterSex;
				if (characterSex && characterSex != Character.characterSex) { 
					if (debug) {
						appendToLog("\tSkipping " + item.obj.name + " because it requires " + characterSex + " sex (your sex is " + Character.characterSex + ")");
					}
					continue; 
				}
				//skip items which are not for my character class
				var characterClass = item.obj.characterClass;
				if (characterClass && characterClass != Character.characterClass) { 
					if (debug) {
						appendToLog("\tSkipping " + item.obj.name + " because it requires to you be " + characterClass + " (your class is " + Character.characterClass + ")");
					}
					continue; 
				}
				//skipp items which require higher level than my actual level
				var level = item.obj.level;
				if (level && level > Character.level) { 
					if (debug) {
						appendToLog("\tSkipping " + item.obj.name + " because it requires at least level " + level + " (your level is " + Character.level + ")");
					}
					continue; 
				}
				var type = item.obj.type;
				if (items[type] == undefined) { items[type] = []; }
				if (debug) appendToLog("\tAdding '" + item.obj.name + "'");
				items[type].push(new ItemWrapper({"item": item, "wearing": false}));

				//check if item may be part of a set
				var set = item.obj.set;
				if (set) {
					if (sets[set.key] == undefined) { sets[set.key] = []; }
					if (debug) appendToLog("\t'" + item.obj.name + "' may be part of set ('" + set.name + "'). Adding it to suspected set items.");
					sets[set.key].push(new ItemWrapper({"item": item, "wearing": false}));
				}
			}

			//then go through wear
			//notice that there's no need for checking character sex,
			//character class or item required level - if there was any
			//restriction, the-west server side wouldn't have let to 
			//wear this item before (it would show error)
			var wear = Wear.wear;
			if (debug) appendToLog("\tProcessing wear items ...");
			for (var key in wear) {
				var item = wear[key];
				var type = item.obj.type;
				if (items[type] == undefined) { items[type] = []; }
				if (debug) appendToLog("\tAdding '" + item.obj.name + "'");
				items[type].push(new ItemWrapper({"item": item, "wearing": true}));

				//check if item may be part of a set
				var set = item.obj.set;
				if (set) {
					if (sets[set.key] == undefined) { sets[set.key] = []; }
					if (debug) appendToLog("\t'" + item.obj.name + "' may be part of set ('" + set.name + "'). Adding it to suspected set items.");
					sets[set.key].push(new ItemWrapper({"item": item, "wearing": true}));
				}
			}
			if (debug) {
				appendToLog("Map created");
			}
			return { "items": items, "sets": sets };
		};

		/**
		 * --- wear types ---			
		 * 	type: 
		 * 		"body" | "yield" | "neck" | "foot" | "belt" |
		 * 		"head" | "right_arm" | "left_arm" | "animal" | "pants"
		 *
		 * --- skills & attributes ---
		 * 	skill: 
		 * 		"build" | "punch" | "tough" | "endurance" | "health" |
		 * 		"ride" | "reflex" | "dodge" | "hide" | "swim" |
		 * 		"aim" | "shot" | "pitfall" | "finger_dexterity" | "repair" |
		 * 		"leadership" | "tactic" | "trade" | "animal" | "appearance"
		 */

		/**
		 * map with job ids
		 *
		 * (less chance to make mistake and easy
		 * changes if ids change in future)
		 */
		var JobIds = {
			"building_wind_mills": 44,
			"catching_horses": 48,
			"charlatan": -1, //TODO: complete
			"constructing_a_ranch_house": 84,
			"cowboy": 22,
			"drilling_for_oil": 67,
			"evangelizing": 62,
			"felling_trees" : 27,
			"fire_fighter": 90,
			"harvesting_fields": 8,
			"hunt_buffalo": 52, 
			"hunt_coyotes": 51,
			"hunt_grizzly_bears": -1, //TODO: complete
			"hunt_wolves": 58, 
			"hunting_turkey": 20,
			"installing_a_barbed_wire_fence": 30,
			"milling_grains": 13,
			"mow_pasture": 12,
			"picking_agaves": 86,
			"picking_sugar_cane": 6,
			"shoeing_horses": 88,
			"smuggling": -1, //TODO: complete
			"tanning_deer_skin": 17,
			"transport_ammunition": 50
		};

		/**
		 * represents item sets
		 * there is no option to obtain bonuses dynamically,
		 * so we must hard-code bonuses
		 *
		 * 'bonus' attribute in each set contains only those bonuses
		 * that matter in calculation (for example speed bonus is not
		 * included)
		 *
		 * values were taken from weststats:
		 * 	http://en.weststats.com/Itemsets/
		 *
		 * "strength":		"build"      | "punch"  | "tough"   | "endurance"        | "health"
		 * "flexibility":	"ride"       | "reflex" | "dodge"   | "hide"             | "swim"
		 * "dexterity":		"aim" 	     | "shot"   | "pitfall" | "finger_dexterity" | "repair"
		 * "charisma":		"leadership" | "tactic" | "trade"   | "animal"           | "appearance"
		 *
		 * TODO: complete golden set
		 */
		var ItemSetsBonuses = {
			"set_farmer": {
				"bonus": {
					"2": {
						"attributes": {
							"flexibility": 1,
							"strength": 1
						}
					},
					"3": {
						"attributes": {
							"flexibility": 1,
							"strength": 1,
							"dexterity": 1,
							"charisma": 1
						}
					},
					"4": {
						"attributes": {
							"flexibility": 2,
							"strength": 2,
							"dexterity": 2,
							"charisma": 2
						}
					}
				}
			},
			"set_mexican": {
				//sombrero, brown poncho, sandals, mexican bandana, tequila, donkey
				"bonus": {
					"2": {
						"attributes": {
							"strength": 1
						}
					},
					"3": {
						"attributes": {
							"strength": 2
						}
					},
					"4": {
						"attributes": {
							"strength": 4
						}
					},
					"5": {
						"attributes": {
							"strength": 6
						}
					},
					"6": {
						"attributes": {
							"strength": 9
						}
					}
				}
			},
			"set_indian": {
				"bonus": {
					"2": {
						"skills": {
							"hide": 8	
						},
						"attributes": {
							"flexibility": 2
						}
					},
					"3": {
						"skills": {
							"hide": 8,
							"swim": 8
						},
						"attributes": {
							"flexibility": 5
						}
					},
					"4": {
						"skills": {
							"hide": 8,
							"swim": 8,
							"pitfall": 8

						},
						"attributes": {
							"flexibility": 8
						}
					},
					"5": {
						"skills": {
							"hide": 8,
							"swim": 8,
							"pitfall": 8,
							"animal": 8

						},
						"attributes": {
							"flexibility": 12
						}
					}
				}	
			},
			"set_quackery": {
				"bonus": {
					"2": {
						"skills": {
							"endurance": 5,
							"trade": 5
						},
						"attributes": {
							"dexterity": 1
						}
					},
					"3": {
						"skills": {
							"endurance": 10,
							"trade": 10
						},
						"attributes": {
							"dexterity": 2
						}
					},
					"4": {
						"skills": {
							"endurance": 15,
							"trade": 15
						},
						"attributes": {
							"dexterity": 4
						}
					},
					"5": {
						"skills": {
							"endurance": 20,
							"trade": 20
						},
						"attributes": {
							"dexterity": 6
						}
					},
					"6": {
						"skills": {
							"endurance": 20,
							"trade": 20,
							"reflex": 18,
							"tough": 18,
							"aim": 18,
							"shot": 18

						},
						"attributes": {
							"dexterity": 9
						}
					}
				}
			},
			"set_pilgrim_male": {
				"bonus": {
					"2": {
						"skills": {
//							"build": 5 //TODO: check if bonus is for skill or just adds labor points for all jobs that has 'build' skill requirement
						}
					},
					"3": {
						"skills": {
//							"build": 15 //TODO: check if bonus is for skill or just adds labor points for all jobs that has 'build' skill requirement
						}
					},
					"4": {
						"skills": {
//							"build": 30 //TODO: check if bonus is for skill or just adds labor points for all jobs that has 'build' skill requirement
						}
					},
					"5": {
						"skills": {
//							"build": 50 //TODO: check if bonus is for skill or just adds labor points for all jobs that has 'build' skill requirement
						}
					}
				}
			},
			"set_pilgrim_female": {
				"bonus": {
					"2": {
						"skills": {
//							"build": 5 //TODO: check if bonus is for skill or just adds labor points for all jobs that has 'build' skill requirement
						}
					},
					"3": {
						"skills": {
//							"build": 15 //TODO: check if bonus is for skill or just adds labor points for all jobs that has 'build' skill requirement
						}
					},
					"4": {
						"skills": {
//							"build": 30 //TODO: check if bonus is for skill or just adds labor points for all jobs that has 'build' skill requirement
						}
					},
					"5": {
						"skills": {
//							"build": 50 //TODO: check if bonus is for skill or just adds labor points for all jobs that has 'build' skill requirement
						}
					}
				}
			},
			"set_gentleman": {
				"bonus": {
					"2": {
						"skills": {
							"appearance": 8
						},
						"attributes": {
							"charisma": 1
						},
						"jobs": {
							"all": 5
						}
					},
					"3": {
						"skills": {
							"appearance": 8,
							"leadership": 8

						},
						"attributes": {
							"charisma": 3
						},
						"jobs": {
							"all": 15
						}
					},
					"4": {
						"skills": {
							"appearance": 8,
							"leadership": 8,
							"trade": 8
						},
						"attributes": {
							"charisma": 6
						},
						"jobs": {
							"all": 30
						}
					},
					"5": {
						"skills": {
							"appearance": 16,
							"leadership": 8,
							"trade": 8
						},
						"attributes": {
							"charisma": 10
						},
						"jobs": {
							"all": 50
						}
					}
				}
			},
			"set_dancer": {
				"bonus": {
					"2": {
						"skills": {
							"appearance": 10 
						},
						"attributes": {
							"charisma": 2
						},
						"jobs": {
							"all": 10
						}
					},
					"3": {
						"skills": {
							"appearance": 10,
							"animal": 10

						},
						"attributes": {
							"charisma": 5
						},
						"jobs": {
							"all": 25
						}
					},
					"4": {
						"skills": {
							"appearance": 10,
							"animal": 10,
							"finger_dexterity": 10
						},
						"attributes": {
							"charisma": 9
						},
						"jobs": {
							"all": 40
						}
					}
				}
			},
			"greenhorn_set": {
				"bonus": {
					"2" : {},
					"3" : {},
					"4" : {},
					"5" : {},
					"6" : {},
					"7" : {
						"jobs": {
							"all": 5
						}
					},
					"8" : {
						"attributes": {
							"charisma": 1,
							"strength": 1
						},
						"jobs": {
							"all": 15
						}
					}
				}
			},
			"fireworker_set": {
				"bonus": {
					"1": {}
				}
			}
		};

		//init dynamic properties of ItemSetsBonuses object
		(function() {
			//fire_fighter
			ItemSetsBonuses["fireworker_set"].bonus[1].jobs = {};
			ItemSetsBonuses["fireworker_set"].bonus[1].jobs[JobIds["fire_fighter"]] = 15;
			//greenhorn_set
			//2 items
			ItemSetsBonuses["greenhorn_set"].bonus[2].jobs = {};
			ItemSetsBonuses["greenhorn_set"].bonus[2].jobs[JobIds["picking_sugar_cane"]] = 10;
			//3 items
			ItemSetsBonuses["greenhorn_set"].bonus[3].jobs = {};
			ItemSetsBonuses["greenhorn_set"].bonus[3].jobs[JobIds["picking_sugar_cane"]] = 10;
			ItemSetsBonuses["greenhorn_set"].bonus[3].jobs[JobIds["felling_trees"]] = 20;
			//4 items
			ItemSetsBonuses["greenhorn_set"].bonus[4].jobs = {};
			ItemSetsBonuses["greenhorn_set"].bonus[4].jobs[JobIds["picking_sugar_cane"]] = 10;
			ItemSetsBonuses["greenhorn_set"].bonus[4].jobs[JobIds["felling_trees"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[4].jobs[JobIds["tanning_deer_skin"]] = 20;
			//5 items
			ItemSetsBonuses["greenhorn_set"].bonus[5].jobs = {};
			ItemSetsBonuses["greenhorn_set"].bonus[5].jobs[JobIds["picking_sugar_cane"]] = 10;
			ItemSetsBonuses["greenhorn_set"].bonus[5].jobs[JobIds["felling_trees"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[5].jobs[JobIds["tanning_deer_skin"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[5].jobs[JobIds["hunting_turkey"]] = 20;
			//6 items
			ItemSetsBonuses["greenhorn_set"].bonus[6].jobs = {};
			ItemSetsBonuses["greenhorn_set"].bonus[6].jobs[JobIds["picking_sugar_cane"]] = 10;
			ItemSetsBonuses["greenhorn_set"].bonus[6].jobs[JobIds["felling_trees"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[6].jobs[JobIds["tanning_deer_skin"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[6].jobs[JobIds["hunting_turkey"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[6].jobs[JobIds["cowboy"]] = 20;
			//7 items
			ItemSetsBonuses["greenhorn_set"].bonus[7].jobs = {};
			ItemSetsBonuses["greenhorn_set"].bonus[7].jobs[JobIds["picking_sugar_cane"]] = 10;
			ItemSetsBonuses["greenhorn_set"].bonus[7].jobs[JobIds["felling_trees"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[7].jobs[JobIds["tanning_deer_skin"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[7].jobs[JobIds["hunting_turkey"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[7].jobs[JobIds["cowboy"]] = 20;
			//8 items
			ItemSetsBonuses["greenhorn_set"].bonus[8].jobs = {};
			ItemSetsBonuses["greenhorn_set"].bonus[8].jobs[JobIds["picking_sugar_cane"]] = 10;
			ItemSetsBonuses["greenhorn_set"].bonus[8].jobs[JobIds["felling_trees"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[8].jobs[JobIds["tanning_deer_skin"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[8].jobs[JobIds["hunting_turkey"]] = 20;
			ItemSetsBonuses["greenhorn_set"].bonus[8].jobs[JobIds["cowboy"]] = 20;


		 	//set_mexican
			//3 items
			ItemSetsBonuses["set_mexican"].bonus[3].jobs = {};
			ItemSetsBonuses["set_mexican"].bonus[3].jobs[JobIds["picking_agaves"]] = 60;
			//4 items
			ItemSetsBonuses["set_mexican"].bonus[4].jobs = {};
			ItemSetsBonuses["set_mexican"].bonus[4].jobs[JobIds["picking_agaves"]] = 60;
			ItemSetsBonuses["set_mexican"].bonus[4].jobs[JobIds["drilling_for_oil"]] = 70;
			//5 items
			ItemSetsBonuses["set_mexican"].bonus[5].jobs = {};
			ItemSetsBonuses["set_mexican"].bonus[5].jobs[JobIds["picking_agaves"]] = 60;
			ItemSetsBonuses["set_mexican"].bonus[5].jobs[JobIds["drilling_for_oil"]] = 70;
			ItemSetsBonuses["set_mexican"].bonus[5].jobs[JobIds["smuggling"]] = 80;
			//6 items
			ItemSetsBonuses["set_mexican"].bonus[6].jobs = {};
			ItemSetsBonuses["set_mexican"].bonus[6].jobs[JobIds["picking_agaves"]] = 60;
			ItemSetsBonuses["set_mexican"].bonus[6].jobs[JobIds["drilling_for_oil"]] = 70;
			ItemSetsBonuses["set_mexican"].bonus[6].jobs[JobIds["smuggling"]] = 80;
			ItemSetsBonuses["set_mexican"].bonus[6].jobs[JobIds["transport_ammunition"]] = 90;

			//set_farmer
			//
			//2 items
			ItemSetsBonuses["set_farmer"].bonus[2].jobs = {};
			ItemSetsBonuses["set_farmer"].bonus[2].jobs[JobIds["milling_grains"]] = 10;
			ItemSetsBonuses["set_farmer"].bonus[2].jobs[JobIds["mow_pasture"]] = 10;
			ItemSetsBonuses["set_farmer"].bonus[2].jobs[JobIds["harvesting_fields"]] = 10;
			//3 items
			ItemSetsBonuses["set_farmer"].bonus[3].jobs = {};
			ItemSetsBonuses["set_farmer"].bonus[3].jobs[JobIds["milling_grains"]] = 10;
			ItemSetsBonuses["set_farmer"].bonus[3].jobs[JobIds["mow_pasture"]] = 10;
			ItemSetsBonuses["set_farmer"].bonus[3].jobs[JobIds["harvesting_fields"]] = 10;
			ItemSetsBonuses["set_farmer"].bonus[3].jobs[JobIds["shoeing_horses"]] = 20;
			ItemSetsBonuses["set_farmer"].bonus[3].jobs[JobIds["installing_a_barbed_wire_fence"]] = 20;
			ItemSetsBonuses["set_farmer"].bonus[3].jobs[JobIds["cowboy"]] = 20;
			//4 items
			ItemSetsBonuses["set_farmer"].bonus[4].jobs = {};
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["milling_grains"]] = 10;
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["mow_pasture"]] = 10;
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["harvesting_fields"]] = 10;
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["shoeing_horses"]] = 20;
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["installing_a_barbed_wire_fence"]] = 20;
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["cowboy"]] = 20;
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["catching_horses"]] = 40;
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["constructing_a_ranch_house"]] = 40;
			ItemSetsBonuses["set_farmer"].bonus[4].jobs[JobIds["building_wind_mills"]] = 40;

			//set_indian
			//
			//2 items
			ItemSetsBonuses["set_indian"].bonus[2].jobs = {};
			ItemSetsBonuses["set_indian"].bonus[2].jobs[JobIds["hunt_coyotes"]] = 30;
			//3 items
			ItemSetsBonuses["set_indian"].bonus[3].jobs = {};
			ItemSetsBonuses["set_indian"].bonus[3].jobs[JobIds["hunt_coyotes"]] = 30;
			ItemSetsBonuses["set_indian"].bonus[3].jobs[JobIds["hunt_buffalo"]] = 40;
			//4 items
			ItemSetsBonuses["set_indian"].bonus[4].jobs = {};
			ItemSetsBonuses["set_indian"].bonus[4].jobs[JobIds["hunt_coyotes"]] = 30;
			ItemSetsBonuses["set_indian"].bonus[4].jobs[JobIds["hunt_buffalo"]] = 40;
			ItemSetsBonuses["set_indian"].bonus[4].jobs[JobIds["hunt_wolves"]] = 50;
			//5 items
			ItemSetsBonuses["set_indian"].bonus[5].jobs = {};
			ItemSetsBonuses["set_indian"].bonus[5].jobs[JobIds["hunt_coyotes"]] = 30;
			ItemSetsBonuses["set_indian"].bonus[5].jobs[JobIds["hunt_buffalo"]] = 40;
			ItemSetsBonuses["set_indian"].bonus[5].jobs[JobIds["hunt_wolves"]] = 50;
			ItemSetsBonuses["set_indian"].bonus[5].jobs[JobIds["hunt_grizzly_bears"]] = 60;

			//set_pilgrim_male
			//2 items
			ItemSetsBonuses["set_pilgrim_male"].bonus[2].jobs = {};
			ItemSetsBonuses["set_pilgrim_male"].bonus[2].jobs["construction"] = 5;
			//3 items
			ItemSetsBonuses["set_pilgrim_male"].bonus[3].jobs = {};
			ItemSetsBonuses["set_pilgrim_male"].bonus[3].jobs["construction"] = 15;
			//4 items
			ItemSetsBonuses["set_pilgrim_male"].bonus[4].jobs = {};
			ItemSetsBonuses["set_pilgrim_male"].bonus[4].jobs["construction"] = 30;
			//5 items
			ItemSetsBonuses["set_pilgrim_male"].bonus[5].jobs = {};
			ItemSetsBonuses["set_pilgrim_male"].bonus[5].jobs["construction"] = 50;
			ItemSetsBonuses["set_pilgrim_male"].bonus[5].jobs[JobIds["evangelizing"]] = 150;
			
			//set_pilgrim_female
			//2 items
			ItemSetsBonuses["set_pilgrim_female"].bonus[2].jobs = {};
			ItemSetsBonuses["set_pilgrim_female"].bonus[2].jobs["construction"] = 5;
			//3 items
			ItemSetsBonuses["set_pilgrim_female"].bonus[3].jobs = {};
			ItemSetsBonuses["set_pilgrim_female"].bonus[3].jobs["construction"] = 15;
			//4 items
			ItemSetsBonuses["set_pilgrim_female"].bonus[4].jobs = {};
			ItemSetsBonuses["set_pilgrim_female"].bonus[4].jobs["construction"] = 30;
			//5 items
			ItemSetsBonuses["set_pilgrim_female"].bonus[5].jobs = {};
			ItemSetsBonuses["set_pilgrim_female"].bonus[5].jobs["construction"] = 50;
			ItemSetsBonuses["set_pilgrim_female"].bonus[5].jobs[JobIds["evangelizing"]] = 150;

			//set_quackery
			//
			//2 items
			ItemSetsBonuses["set_quackery"].bonus[2].jobs = {};
			ItemSetsBonuses["set_quackery"].bonus[2].jobs[JobIds["charlatan"]] = 30;
			//3 items
			ItemSetsBonuses["set_quackery"].bonus[3].jobs = {};
			ItemSetsBonuses["set_quackery"].bonus[3].jobs[JobIds["charlatan"]] = 60;
			//4 items
			ItemSetsBonuses["set_quackery"].bonus[4].jobs = {};
			ItemSetsBonuses["set_quackery"].bonus[4].jobs[JobIds["charlatan"]] = 90;
			//5 items
			ItemSetsBonuses["set_quackery"].bonus[5].jobs = {};
			ItemSetsBonuses["set_quackery"].bonus[5].jobs[JobIds["charlatan"]] = 120;
			//6 items
			ItemSetsBonuses["set_quackery"].bonus[6].jobs = {};
			ItemSetsBonuses["set_quackery"].bonus[6].jobs[JobIds["charlatan"]] = 120;
		})();


		/**
		 * returns bonus if 'numItems' are used from item set with name 'setName'
		 * 'skillsCountObj' represents input formula to maximize
		 * 'jobId' is id of job we want to do (some item sets have bonus points for specific jobs)
		 */
		var getItemSetBonus = function(setName, numItems, skillsCountObj, jobId) {
			if (!ItemSetsBonuses[setName]) { 
				if (debug) appendToLog("I don't know set '" + setName + "'"); 
				return 0;
			}
			if (numItems < 1) { return 0; } //there's no bonus if we use only one item of set
			if (!ItemSetsBonuses[setName].bonus[numItems]) { if (debug) appendToLog("I don't know bonus for set '" + setName + "' if you wear " + numItems + " items, returning 0"); return 0; }

			var bonus = 0;
			//check skills addition
			var bonusObj = ItemSetsBonuses[setName].bonus[numItems];
			if (bonusObj["skills"]) {
				for (var skill in skillsCountObj) {
					if (bonusObj["skills"][skill]) {
						bonus += bonusObj["skills"][skill] * skillsCountObj[skill];
					}
				}
			}
			//check attributes addition
			if (bonusObj["attributes"]) {
				for (var skill in skillsCountObj) {
					for (var attr in bonusObj["attributes"]) {
						if (Character.skill_names[attr].contains(skill)) {
							bonus += bonusObj["attributes"][attr] * skillsCountObj[skill];
						}
					}
				}
			}
			//current item set adds bonus on current job
			if (bonusObj["jobs"] && (bonusObj["jobs"][jobId] || bonusObj["jobs"]["all"])) {
				bonus += (bonusObj["jobs"]["all"]) ? bonusObj["jobs"]["all"] : bonusObj["jobs"][jobId];
			}
			return bonus;
		};


		/**
		 * wraps ItemWrapper into new object
		 * which contains original ItemWrapper
		 * and calculated bonus for current job
		 */
		var wrapItemWithBonus = function(item,bonus) {
			return {
				item: item,
				bonus: bonus
			};
		};

		/**
		 * returns best item of provided type that maximizes formula provided via skillsCountObj parameter
		 * params:
		 * 	skillsCountObj - array[skill] = count 	example: array["tough"] = 2
		 * 	type: what type of wear ( "body" | "yield" | "neck" | "foot" | "head" | "right_arm" | "left_arm" | "animal")
		 */
		var getBestItem = function(map, type, skillsCountObj) {
			if (debug) {
				appendToLog("Now I'm trying to find best item for " + type);
			}
			if (map.items[type] == undefined) { return null; } //we have no item of provided type
			var bestItem = null; 
			var maxBonus = 0; //bonus maximum
			if (!map.items[type]) return null;
			map.items[type].each(function(item) {
				var itemBonus = 0;
				for (var key in skillsCountObj) {
					itemBonus += skillsCountObj[key] * item.getSkillBonus(key);
				}
				if (debug) appendToLog('\tProcessing item ' + item.item.obj.name + ' [ +' + itemBonus + ' ]');
				if (bestItem != null) {
					//we found better item so change
					//bestItem to current item
					if (bestItem.bonus < itemBonus) {
						bestItem = wrapItemWithBonus(item,itemBonus);
						maxBonus = itemBonus;
						if (debug) {
							appendToLog('\tChanging best item to ' + item.item.obj.name + ' [ +' + itemBonus + ' ]');
						}
					} else if (bestItem.bonus == itemBonus && !bestItem.item.wearing && item.wearing) {
						//current item has same bonus as bestItem
						//from these two items we prefer item 
						//which is character already wearing
						bestItem = wrapItemWithBonus(item,itemBonus);
						if (debug) {
							appendToLog('\tChanging best item to ' + item.item.obj.name + ' because you are already wearing it');
						}
					}
				} else {
					//this is first iteration so we 
					//set first item as the best one
					bestItem = wrapItemWithBonus(item,itemBonus);
					maxBonus = itemBonus;
					if (debug) {
						appendToLog('\tSetting best item to ' + item.item.obj.name + ' [ +' + itemBonus + ' ]');
					}
				}
			});
			//if item doesn't add any bonus there's no need to change clothes, therefore return null
			return (maxBonus != 0) ? bestItem : null;
		};

		/**
		 * returns array containing values
		 * from 0 to n - 1
		 *
		 * returns:
		 * 	[ 0, 1, ..., n - 1 ]
		 */
		var range = function(n) {
			var result = [];
			for (var i=0; i < n; i++) {
				result[i] = i;
			}
			return result;
		};

		/** 
		 * returns all subsets of size k from 
		 * the set of intergers 0 .. n - 1
		 *
		 * we want to choose
		 * all k-subsets out of n-set
		 * there are exactly choose(n,k)
		 * of these subsets
		 * ( choose(n,k) = n! / ( (n - k)! * k!) )
		 *
		 * now suppose that set is represented by array (quite funny :))
		 * to choose all 3-subsets from that array,
		 * if we had set of 3-subsets with indexes
		 * of elements in array, we would just
		 * read each subset based on 3 indexes
		 *
		 * and thats exactly what this function does
		 * returns these indexes!
		 *
		 * example: call to getAllkSubsetsIndexes(5,3)
		 * as written above there are choose(n,k)
		 * subsets = choose(5,3) = 10
		 *
		 * function returns this array (not exactly in this order as we are working with "sets"):
		 * 	[ 
		 * 		[0,1,2], [0,1,3], [0,1,4], [0,2,3], [0,2,4], 
		 * 		[0,3,4], [1,2,3], [1,2,4], [1,3,4], [2,3,4]
		 * 	]
		 *
		 *
		 * main idea was taken from: http://code.activestate.com/recipes/500268-all-k-subsets-from-an-n-set/
		 * but it took me a long time to understand it (and to understand Python's yield) :)
		 */
		var getAllkSubsetsIndexes = function(n, k) {
			if (n < 0) { throw new Error("N must be greater or equal to zero"); return; }
			if (k < 0) { throw new Error("K must be greater or equal to zero"); return; }
			//if we choose 0-subset of n-set,
			//the result is empty set
			if (n < k || k == 0) {
				return [[]];
			}
			//if we choose n-subsets of n-set,
			//then the result is the set itself
			if (n == k) {
				return [range(n)];
			}
			//now comes the tricky part
			//based on formula
			//	choose(n,k) = choose(n-1,k-1) + choose(n-1,k)
			//we recursively calculate result
			//
			//ok, so .. really .. what is going on here? :)
			//
			//first we divide the set into two parts:
			//first part contains only one element (X)
			//and second part (2) cointains the rest of the set
			//in other words we extract element (X) from the set
			//
			//the result will be union of two subresults: (A) and (B) 
			//
			//(A): 
			//	we find all subsets of size k-1 in
			//	(2) and then add (X) to each element of
			//	this result set
			//	(in these results WILL be (X))
			//(B):
			//	we find all subsets of size k in (2)
			//	(in these results WON'T be (X))
			//
			//in other words we find all k-subsets that (X)
			//is part of and all k-subsets that (X) isn't 
			//part of and union them
			var union = [];

			//choose(n-1,k-1)
			var p1 = getAllkSubsetsIndexes(n - 1, k - 1); //find (k-1)-subsets that doesn't contain extracted element (X)
			for (var i=0; i < p1.length; i++) {
				p1[i].push(n - 1); //add extracted element (X) to each (k-1)-subset
				union[i] = p1[i];
			}

			//choose(n-1,k)
			var p2 = getAllkSubsetsIndexes(n - 1, k); //find all k-subsets that doesn't contain extracted element (X)
			for (var i=0; i < p2.length; i++) {
				union[i + p1.length] = p2[i];
			}

			return union;
		};

		/**
		 * returns all k-subsets of set 'set'
		 * inputs: 
		 * 	set: array of elements (not set at all :))
		 * 	k: integer > 0
		 */
		var getAllKSubsets = function(set, k) {
			var subsets = [];
			var n = set.length;
			var indexes = getAllkSubsetsIndexes(n, k);
			for (var i=0; i < indexes.length; i++) {
				var subset = [];
				for (var j=0; j < indexes[i].length; j++) {
					subset.push(set[indexes[i][j]]);
				}
				subsets.push(subset);
			}
			return subsets;
		};

		/**
		 * returns map which contains best items from inventory,
		 * in other words which maximize skill bonuses provided
		 * via 'requiredSkills' parameter
		 *	key: wear_type
		 *	value: ItemWrapper object
		 * if no suitable items are found returns empty object
		 * params:
		 * 	requiredSkills - list with 5 skills required for job (skills may repeat)
		 *
		 * returns: {
		 *   "map" : { wearType1 : item1, wearType2 : item2, ... wearTypeN : itemN },
		 *   "bonus" : total bonus if used all items from map
		 * }
		 */
		var getBestJobItems = function(requiredSkills, jobId) {
			if (requiredSkills == undefined) {
				throw new Error("You must provide requiredSkills parameter");
			}
			var requiredSkillsCount = {};
			for (var i=0; i < requiredSkills.length; i++) {
				var skill = requiredSkills[i];
				requiredSkillsCount[skill] = (requiredSkillsCount[skill] == undefined) ? 1 : requiredSkillsCount[skill] + 1;
			}
			if (debug) {
				var sb = new StringBuffer();
				var first = true;
				for (var key in requiredSkillsCount) {
					sb.append(!first ? " + " : "").append(requiredSkillsCount[key]).append(" * ").append(key);
					first = false;
				}
				appendToLog('Maximizing function: ' + sb.toString());
				delete sb;
			}
			var bestItemsMap = {};
			//now find best items for each wear type
			var totalBonusUsingWearTypes = 0; //total bonus if items are selected only by wearType
			var suspectedItemSet = {};
			var map = getItemsMap(); //get map with items
			if (debug) appendToLog("Finding best item for each type (no items sets yet)");
			var wear_types = wearTypesList();
			//["body","yield","neck","foot","head","right_arm","left_arm","animal","pants"]
			wear_types.each(function(wearType) {
				var best = getBestItem(map, wearType, requiredSkillsCount);
				if (best != null) {
					totalBonusUsingWearTypes += best.bonus;
					//is suggested item part of item set?
					var itemSet = best.item.item.obj.set;
					if (itemSet) {
						var itemId = best.item.item.obj.item_id;
						var key = itemSet.key;
						//just check if item set that is in 'set' attribute
						//really contains this item .. maybe redundant
						if (itemSet.items[itemId]) {
							if (!suspectedItemSet[key]) { suspectedItemSet[key] = []; }
							suspectedItemSet[key].push(best);
						}
					}
					bestItemsMap[wearType] = best;
					if (debug) {
						appendToLog("Best item for " + wearType + ' is ' + best.item.item.obj.name + ' [ +' + best.bonus + ' ]');
					}
				} else {
					if (debug) {
						appendToLog("I didn't find any suitable item for " + wearType);
					}
				}
			});
			//now if we have chosen items that are part of any itemSet and therefore
			//may add extra bonus, check it.
			var extraBonus = 0;
			for (var setName in suspectedItemSet) {
				var setItems = suspectedItemSet[setName];
				var numItems = setItems.length;
				extraBonus += getItemSetBonus(setName, numItems, requiredSkillsCount, jobId);
			}
			//add extra bonus because suggested items are also part of set which increases bonus
			totalBonusUsingWearTypes += extraBonus;
			if (debug) appendToLog('Total bonus using items chosen using calculation based on best item for each wear type is: +' + totalBonusUsingWearTypes); 
			
			//we found that there are items that may be part of item set
			//try to combine these items with yet calculated items so it
			//would add more bonus than without using item set
			var bestCombination = {}; //best combination object using item sets
			var bestCombinationBonus = 0; //and its total bonus
			if (!isObjectEmpty(map.sets)) {
				if (debug) appendToLog("Some items may be part of item set. Trying to combine items and increase bonus (hopefully).");
				for (var setName in map.sets) {
					var set = map.sets[setName];
					if (set.length < 1) {
						if (debug) appendToLog("\tSkipping set '" + setName + "' because you have no items from it (and therefore no bonus)");
						continue;
					}

					if (debug) appendToLog("\n\n\nProcessing set '" + setName + "' ...");
					set = eliminateDuplicateSetItems(set);

					//now change each element in set by wrapping it using wrapItemWithBonus function
					//c'mon .. this is really mess !! .. I REALLY should refactor 
					//whole code so it would be MUCH clearer
					for (var i=0; i < set.length; i++) {
						var itemBonus = 0;
					       	for (var key in requiredSkillsCount) {
							itemBonus += requiredSkillsCount[key] * set[i].getSkillBonus(key);
						}
						set[i] = wrapItemWithBonus(set[i], itemBonus); 
					}
					map.sets[setName] = set; //change original map with wrapped array
					//find best i-subset of set[setName]
					for (var i=1; i <= set.length; i++) {
						var iSubsets = getAllKSubsets(set, i);
						if (debug) appendToLog("Checking all " + iSubsets.length + " subsets of size " + i + " from set '" + setName);
						for (var j=0; j < iSubsets.length; j++) {
							var blaStr = mapToString(changeItems({},iSubsets[j]));
							if (debug) appendToLog("__________" + blaStr);
							var currentCombination = changeItems(bestItemsMap, iSubsets[j]);
							var itemsBonus = getTotalBonus(currentCombination)
							var setBonus = getItemSetBonus(setName, i, requiredSkillsCount, jobId)
							var currentCombinationBonus =  itemsBonus + setBonus;
							var currentCombinationString = ((debug) ? mapToString(currentCombination) : "");

							if (debug) appendToLog('Processing combination ' + currentCombinationString + ' [ +' + currentCombinationBonus + ' = ' + itemsBonus + ' + ' + setBonus + ' ]');
							if (isObjectEmpty(bestCombination)) {
								//don't even set because it is still worse than above
								//calculated items
								if (currentCombinationBonus <= totalBonusUsingWearTypes) {
									if (debug) appendToLog("Skiping combination " + currentCombinationString + " because it has less or equal bonus than combination " + mapToString(bestItemsMap) + " ( " + currentCombinationBonus + " <= " + totalBonusUsingWearTypes + " )");
									continue;
								}
								bestCombination = currentCombination;
								bestCombinationBonus = currentCombinationBonus;
								if (debug) appendToLog("Setting best combination with item set to " + currentCombinationString + " [ +" + currentCombinationBonus + " ] (using  " + i + " items of '" + setName + "')");
								continue;
							}
							if (bestCombinationBonus < currentCombinationBonus) {
								bestCombination = currentCombination;
								bestCombinationBonus = currentCombinationBonus;
								if (debug) appendToLog("Changing best combination with item set to " + currentCombinationString + " [ +" + currentCombinationBonus + " ] (using " + i + " items of '" + setName + "')");
							};

						} //process j-th subset of size i
					}
				} //for each possible set
			} //sets are not empty
			if (!isObjectEmpty(bestCombination)) bestItemsMap = bestCombination;

			var totalBonus = (!isObjectEmpty(bestCombination) ? bestCombinationBonus : totalBonusUsingWearTypes);
			if (debug) {
				appendToLog('I suggest these items to wear');
				for (var key in bestItemsMap) {
					appendToLog('\t' + key + ': ' + bestItemsMap[key].item.item.obj.name);
				}
				appendToLog('Total bonus is: +' + totalBonus);
			}
			return {
				"map" : bestItemsMap,
				"bonus" : totalBonus
			};
		};

		var eliminateDuplicateSetItems = function(set) {
			var map = {};

			//put to map by wear type
			for (var i=0; i < set.length; i++) {
				map[set[i].item.obj.type] = set[i];
			}

			//put back to array
			var result = [];
			for (var wearType in map) {
				result.push(map[wearType]);
			}

			return result;

		};

		/**
		 * returns string containing names of items in map
		 * input structure: same as getTotalBonus()
		 */
		var mapToString = function(map) {
			var sb = new StringBuffer("[");
			for (var wearType in map) {
				sb.append(map[wearType].item.toString()).append(",");
			}
			sb.removeLast();
			return sb.append("]").toString();
		};

		/**
		 * returns sum of bonuses of items from map
		 * inputs:
		 * 	map: {
		 *		"body": {
		 *			item: ItemWrapper1,
		 *			bonus: bonus1
		 *		},
		 *		"head": {
		 *			item: ItemWrapper2,
		 *			bonus: bonus2
		 *		},
		 *		...
		 *		wearTypeN: {
		 *			item: ItemWrapperN,
		 *			bonus: bonusN
		 *		}
		 * 	}
		 */
		var getTotalBonus = function(map) {
			var sum = 0;
			for (var wearType in map) {
				sum += map[wearType].bonus;
			}
			return sum;
		};

		/**
		 * changes items in 'original' with items from 'toChange'
		 * based on 'toChange' elements wear type
		 * inputs:
		 * 	original: map: key = wearType, value = ItemWrapper
		 * 	toChange: array of ItemWrappers
		 * returns:
		 * 	array containing all elements from 'toChange' and
		 * 	remaining elements from 'original'
		 */
		var changeItems = function(original, toChange) {
			var newOne = {};
			//copy
			for (var type in original) {
				newOne[type] = original[type];
			}
			//change items
			for (var i=0; i < toChange.length; i++) {
				newOne[toChange[i].item.item.obj.type] = toChange[i];
			}
			return newOne;
		};

		/**
		 * highlights suggested items to change
		 * if character is already wearing these items
		 * message window is displayed
		 */
		var processSuggestedItems = function(items) {
			var bag = Bag.getInstance();
			//list of items which were highlighted in inventory window
			//var itemsToChange = [];
			var item_ids = [];
			//items parameter may contain items
			//which is character already wearing
			//if character is wearing all of suggested
			//items, show information window so that
			//user knowns that the script was doing something :)
			var wearingAllItems = true;
			
			for (var type in items) {
				var item = items[type].item;
				//skip suggested items that I'm already wearing
				if (item.wearing) { 
					var dom_elm = $("char_" + type);
					if (dom_elm)
					{
						//dom_elm.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAcSURBVBhXY/h/JhSE7nQBEQMqBywGEWKAKIBwALVpJCmZGAR1AAAAAElFTkSuQmCC) repeat';
//						dom_elm.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACBSURBVDhPndPLEYAgDARQoBVqpAltUWuJH2QmEUI2eDWPlZ0YiSisPmkVPi6uJJ97jfQnN+nHTDqxlB7cSRiPZMgFKEyRQLIuLTyV75Ic27dkuYhts6RM5tOA7D67GkyO7gxLq7Dawa8LVkyavJvLlqydrWfKX7Kfs6S8M58G5I0vW48oTSxCvkgAAAAASUVORK5CYII%3D) no-repeat top left';	
					}
					continue; 
				}
				wearingAllItems = false;
				//itemsToChange.push({item: item, type: type});
				item_ids.push(item.item.get_inv_id());
			}

			if (wearingAllItems) {
				new HumanMessage(lang.getPhrase("already_wearing_items"));
			} else {
				highlightSuitableItems(item_ids);
				sortBagItems(item_ids);
				var div = new Element('div');
				div.appendChild(createChangeClothesButton(item_ids));
				injectElementToTop(div, $("bag") /*$("window_inventory_content").getElement("h2")*/);
			}
		};

		/**
		 * changes position of items in bag so that
		 * best items selected for the job will be first ones
		 *
		 * input: array of items to put at the begining of bag
		 */
		var sortBagItems = function(item_ids) {
			var bag = $('bag');
			if (!bag) { alert("Can't find bag element. Please report this error."); }
			for (var i=0; i < item_ids.length; i++) {
				var elm = getBagItemDomElement(item_ids[i]);
				elm.inject(bag, 'top');
			}
		};

		var getBagItemDomElement = function(inv_id) {
			var elm = $('item_' + inv_id);
			if (!elm && debug) {
				appendToLog("Bag element with id 'item_" + inv_id + "' is null");
			}
			return elm;
		};

		/**
		 * changes clothes from array of items
		 * provided via 'items' parameter
		 * if character is already wearing
		 * item, then skips to the next one
		 */
		var highlightSuitableItems = function(item_ids) {
			for (var i=0; i < item_ids.length; i++) {
				var id = item_ids[i];
				var elm = getBagItemDomElement(id);
				//highlight item in bag
				elm.style.background = '#fc5';
			}
	
			/*	
			var remains = item_ids.length;
			var callback = function(data) {
				try {
					if (!data) return;
					//do nothing if some other object was removed from inventory
					if (!item_ids.contains(data[0])) return;
					remains--;
					if (remains == 0) {
						alert("removing listener");
						WEvent.remove('inventory_remove', this);
					}
					//decrease count of remaining items to change
					var counter = $("best-items-selector-counter");
					if (counter) counter.innerHTML = remains;
				} catch (err) {
					WEvent.remove('inventory_remove', this);
				}
			};
			WEvent.register("inventory_remove", { exec: callback });	
			*/
			//check each child so that javascript won't stop
			//processing if DOM element doesn't exist
//			if (item_ids.length > 0) {
//				var windowContent = $("window_inventory_content");
//				if (windowContent) {
//					var inventoryHeader = windowContent.getElement("h2");
//					if (inventoryHeader) {
//						var counter = new Element("i", {id: "best-items-selector-counter", style: "color: rgb(45,91,137); font-size: 80%; "});
//						var rest = new Element("i", {style: "color: rgb(45,91,137); font-size: 60%; "});
//						counter.appendText(item_ids.length);
//						rest.appendText(" " + (item_ids.length > 1 ? lang.getPhrase("item") : lang.getPhrase("items")) + " " + lang.getPhrase("to_change"));
//						inventoryHeader.appendText("  ");
//						inventoryHeader.appendChild(counter);
//						inventoryHeader.appendChild(rest);
//					}
//				}
//			}

			new HumanMessage(lang.getPhrase("items_have_been_highlighted"), { type: 'success' });
			
			/*
			var removeHighlight = function() {
				for (var i=0; i < highlightedItems.length; i++) {
					var item = highlightedItems[i];
					$('item_' + item.item.item.get_inv_id()).style = item.originalStyle;
				}
			};

			//we need to remove items highlight so that if
			//inventory window is refreshed no items are highlighted
			//first do this if 'closeall' button is pushed on any
			//of displayed windows
			$$('a.window_closeall').each(function(elm) {
				elm.addEvent('click', function(event) {
					elm.removeEvent('click', this);
					removeHighlight();
				});
			});
			//and also if inventory window is closed by clicking 'close' button
			$ES('a.window_close', 'window_inventory_title').each(function(elm) {
				elm.addEvent('click', function(event) {
					elm.removeEvent('click', this);
					removeHighlight();
				});
			});
			*/
		};

		/**
		 * helper function to determine
		 * if provided object is empty
		 * or not (has at least one property)
		 */
		var isObjectEmpty = function (ob) {
			for(var i in ob){ return false;}
			return true;
		}

		/**
		 * returns microtime
		 * usefull for calculating time consumption
		 * source: http://www.navioo.com/javascript/tutorials/Javascript_microtime_1583.html
		 */
		var microtime = function (asString) {  
			var now = new Date().getTime() / 1000;  
			var s = parseInt(now);
			return (asString) ? (Math.round((now - s) * 1000) / 1000) + ' ' + s : now;  
		}

		/**
		 * creates button which automatically changes suggested clothes
		 *
		 * html:
		 * 	<a href="javascript://void(0);" class="button button_wrap">
		 * 		<span class="button_left"></span>
		 * 		<span class="button_middle">Change clothes</span>
		 * 		<span class="button_right"></span>
		 * 		<span style="clear:both;"></span>
		 * 	</a>
		 */
		var createChangeClothesButton = function(item_ids) {
			var button = createButton(lang.getPhrase("button_change_clothes") + " [" + item_ids.length + "]");
			var bag = Bag.getInstance();
			if (!bag) alert("Can't find Bag object. Please report error");
			if (item_ids.length == 0) { return; }
			var click_handler = function(event) {
				button.removeEvent("click", click_handler);
				//change text in '<span class="middle">'
				button.getChildren()[1].empty().appendText(lang.getPhrase("processing_wait_please"));
				var callback = function(data) {
					try {
						if (!data) return;
						//do nothing if some other object was removed from inventory
						if (item_ids[current] != data[0]) return;

						//decrease count of remaining items to change
						//var counter = $("best-items-selector-counter");
						//if (counter) counter.innerHTML = parseInt(counter.innerHTML) - 1;

						//go to next item
						current++;
					
						if (current >= item_ids.length) 
						{
							WEvent.remove('inventory_remove', this);
							//change text in '<span class="middle">'
							button.getChildren()[1].empty().appendText(lang.getPhrase("done"));

							var final_click_handler = function(event) {
								button.removeEvent("click", final_click_handler);
								AjaxWindow.close("inventory");
							};

							button.addEvent("click", final_click_handler);
						} 
						else 
						{
							/*
							 * simulate human behaviour by adding random
							 * timeout before next item is changed
							 */
							setTimeout(function() {
								bag.carry(item_ids[current]);
							}, random(0, 500) 
							);
						}
					} catch (err) {
						WEvent.remove('inventory_remove', this);
						//change text in '<span class="middle">'
						button.getChildren()[1].empty().appendText(lang.getPhrase("error"));
					}
				};
				WEvent.register("inventory_remove", { exec: callback });
				//start changing clothes
				var current = 0;
				bag.carry(item_ids[current]);
			};
			button.addEvent("click", click_handler);
			return button;
		};

		/**
		 * appends DOM element 'what' to element 'where'
		 */
		var appendElement = function(what, where) {
			if (!where) return;
			where.appendChild(what);
		};

		var injectElementToTop = function(what, where) {
			if (!what) return;
			what.inject(where, 'top');
		};

		var injectAfterElement = function(what, where) {
			if (!what) return;
			what.inject(where, 'after');
		};
		
		
		/**
		 * creates button with text provided by title parameter
		 *
		 * html:
		 * 	<a href="javascript://void(0);" class="button button_wrap">
		 * 		<span class="button_left"></span>
		 * 		<span class="button_middle">title</span>
		 * 		<span class="button_right"></span>
		 * 		<span style="clear:both;"></span>
		 * 	</a>
		 */
		var createButton = function(title) {
			var buttonWrap = new Element('a', { href: "javascript://void(0);" });
			var buttonLeft = new Element('span');
			var buttonMiddle = new Element('span');
			var buttonRight = new Element('span');
			var cleaner = new Element('span', { style: "clear:both;" });
			buttonLeft.addClass("button_left");
			buttonMiddle.addClass("button_middle");
			buttonMiddle.appendText(title);
			buttonRight.addClass("button_right");
			buttonWrap.addClass('button');
			buttonWrap.addClass('button_wrap');
			buttonWrap.appendChild(buttonLeft);
			buttonWrap.appendChild(buttonMiddle);
			buttonWrap.appendChild(buttonRight);
			buttonWrap.appendChild(cleaner);
			return buttonWrap;	
		};

		/**
		 * creates button which starts calculation on 'onclick' event
		 *
		 * html:
		 * 	<a href="javascript://void(0);" class="button button_wrap">
		 * 		<span class="button_left"></span>
		 * 		<span class="button_middle">Best items</span>
		 * 		<span class="button_right"></span>
		 * 		<span style="clear:both;"></span>
		 * 	</a>
		 */
		var createCalculationButton = function(taskSkills, optObj) {
		       //	jobId, title_suffix) {
			var options = {
				jobId: -1
			};
			for (var opt in optObj) options[opt] = optObj[opt];

			var button = createButton(lang.getPhrase("button_best_items"));
			var click_handler = function(event) {
				//button.removeEvent("click", click_handler);
				//first we must open inventory window so that
				//we could access Bag and Wear objects
				//this is done via Ajax call which completes
				//when 'window_update_finished' event is fired
				var callback = function(data) {
					//remove processing for event
					//so that nothing is done if user
					//opens other windows
					WEvent.remove('window_update_finished', this);
					//event is fired after load of every Ajax window
					//we will process only requests which open inventory
					if (data["name"] != "inventory") { return; }
					var startTime = microtime();
					if (debug) {
						appendToLog('==== CALCULATION STARTED ====');
					}
					//find best items for job
					var items = getBestJobItems(taskSkills, options.jobId);
					if (!isObjectEmpty(items.map)) {
						//now process suggested items
						processSuggestedItems(items.map);
					} else {
						if (debug) {
							appendToLog("I didn't find any suitable items");
						}
						new HumanMessage(lang.getPhrase("no_items_found"));
					}
					var endTime = microtime();
					if (debug) {
						appendToLog('Calculation time: ' + (endTime - startTime).toString() + ' s');
						appendToLog('==== CALCULATION FINISHED ====\n');
						printLog();
					}
				};
				WEvent.register('window_update_finished', {
					exec: callback
				});
				AjaxWindow.show("inventory");
			};
			button.addEvent('click', click_handler);
			return button;
		};


		/**
		 * handler for processing Ajax requests
		 *
		 * every request which shows dialog window
		 * with job information is usefull for us
		 * as well as request which shows dialog
		 * for town building
		 *
		 * job:
		 * 	parses job coordinates from request
		 * 	so that we can retrieve object with
		 * 	job informations (skill requirements
		 * 	we want to maximize)
		 * town build:
		 * 	we pass constant skill requirements
		 * 	(3x build, 1x repair,
		 * 	1x leadership) 
		 * fort build:
		 * 	we pass constant skill requirements
		 * 	(3x build, 1x repair,
		 * 	1x leadership)
		 * duel:
		 * 	skills requirements are passed based on
		 * 	what do we want: either 1) best offense or
		 * 	2) best defense
		 *
		 * 	1)
		 * 	2)
		 */
		var processJobWindow = function(url) {
			//parse url
			var params = {};
			var parts = url.split("?");
			if (parts.length <= 1) { return; }
			var args = parts[1].split("&");
			for (var i=0; i < args.length; i++) {
				var arg = args[i].split("=");
				params[arg[0]] = arg[1];
			}
			if (!params["window"]) { return; }
			switch (params["window"]) {
				case "job":
					if (params["x"] == undefined || params["y"] == undefined) return;
					//now we must get to job object
					//this is kind of a hack but I didn't find better way yet :)
					var handlers = WEvent.events["jobCalcDuration_" + params["x"] + "_" + params["y"]];
					var jobObject = null;
					for (var i=0; i < handlers.length; i++) {
						var handler = handlers[i]["func"];
						//this one should be the job object
						if (handler.bind != undefined) { jobObject = handler.bind; break; }
					}
					if (jobObject == null) {
						throw new Error("Could not find job object (maybe bug or newer version of the-west code)");
					}
					//job calculation object
					var taskSkills = jobObject.jobCalc.task_skills;
					//alert("jobId:" + jobObject.jobCalc.jobId);
					if (debug) {
						appendToLog('Found job window, appending button');
						printLog();
					}
					//append button for calculation
					//var where = $("window_job_" + params["x"] + "_" + params["y"] + "_content").getElements(".jobPointsDescription")[0];
					//if (where) {
					//	injectAfterElement(createCalculationButton(taskSkills, jobObject.jobCalc.jobId), where);
					//} else {
					var malus = jobObject.jobCalc.malus;
					var jobId = jobObject.jobCalc.jobId;
					var button = createCalculationButton(taskSkills, { "jobId" : jobId });
					var content = $("window_job_" + params["x"] + "_" + params["y"] + "_content");
					var div = new Element("div");
					button.inject(div);

					div.inject(content.getElements(".jobDescription")[0],'bottom');

/*					
					(function() {
						var callback = function(data) {
							WEvent.remove('window_update_finished', this);
							if (data["name"] != "inventory") { return; }
							//find best items for job
							var items = getBestJobItems(taskSkills, jobId);

							var infoDiv = new Element('div');
							infoDiv.appendText('Best items stats: ' + items.bonus + "/" + malus);
							infoDiv.inject(div);
						};
						
						WEvent.register('window_update_finished', {
							exec: callback
						});
			
						AjaxWindow.show("inventory");
						AjaxWindow.bringToTop($("window_job_" + params["x"] + "_" + params["y"])); 
					})();
*/


					//	appendElement(createCalculationButton(taskSkills, jobObject.jobCalc.jobId), $("window_job_" + params["x"] + "_" + params["y"] + "_content").getFirst().getFirst().getFirst());
					//}
					break;
				case "cityhall_build":
					if (!params["building"]) return;
					if (debug) {
						appendToLog('Found town building window, appending button');
						printLog();
					}
					appendElement(createCalculationButton(['build','build','build','repair','leadership'], {"jobId" : "construction"}), $("window_cityhall_build_" + params["building"] + "_content").getElements('p')[0]);
					break;
				case "headquarter_build":
					if (!params["fortbuilding"]) return;
					if (debug) {
						appendToLog('Found fort building window, appending button');
						printLog();
					}
					appendElement(createCalculationButton(['build','build','build','repair','leadership'], {"jobId" : "construction"}), $("window_headquarter_build_" + params["fortbuilding"] + "_content").getFirst().getFirst());
					break;
				case "duel":
					if (debug) {
						appendToLog('Found duel window, appending button');
						printLog();
					}
					//TODO change task skills input
					/** 
					 * "strength":		"build" | "punch" | "tough" | "endurance" | "health"
					 * "flexibility":	"ride" | "reflex" | "dodge" | "hide" | "swim"
					 * "dexterity":		"aim" | "shot" | "pitfall" | "finger_dexterity" | "repair"
					 * "charisma":		"leadership" | "tactic" | "trade" | "animal" | "appearance"
					 **/
					//appendElement(createCalculationButton(['aim','tactic','dodge','punch'], null, lang.getPhrase("duel_melee")), $("duel_picture"));
					//appendElement(createCalculationButton(['aim','tactic','dodge','shot'], null, lang.getPhrase("duel_firearms")), $("duel_picture"));
					break;
				default: return;
			}
		};

		/**
		 * initialize script after 5 seconds
		 *
		 * thats because in the-west core script
		 * there's 5 seconds (why?) delay before calling
		 * update of user data, so we should wait a while 
		 * before everything is loaded correctly
		 */
		window.setTimeout(function() {
			/**
			 * extends Ajax processing,
			 * we want to process every Ajax request
			 * which returns dialog window with
			 * job information
			 *
			 * (is there a better way to determine
			 * when we should put selection button
			 * to calculate best items ?) 
			 *
			 * binding is quite tricky - we can't just extend 
			 * Ajax class and assing reference to overloaded class
			 * back to original class because original class contains
			 * methods which are not prototype (main problem is in
			 * mootools chaining .. ), so we create separate
			 * extended object and then assign reference to it's
			 * initialize method to initialize method of original
			 * class
			 */
			var Extended = Ajax.extend({
				initialize: function (url, options) {
    					this.parent(url, options);

					this.addEvent('onComplete', function() {
						processJobWindow(url);	
					});

				},
			     	
			});
			
			Ajax.prototype.initialize = Extended.prototype.initialize;

			/**
			 * set language so that interface is internationalized
			 */
			setInterfaceLanguage();
		}, 5000);
	}); //'domready' event
});

/**
 * Monkey Updater
 */
function update(filename) {
	var body=document.getElementsByTagName('body')[0];
	script=document.createElement('script');
	script.src=filename;
	script.type='text/javascript';
	body.appendChild(script);
	var today = new Date();
	GM_setValue('muUpdateParam_143', String(today));
}
/**
 * Verify if it's time to update
 */
function CheckForUpdate() {
	var lastupdatecheck = GM_getValue('muUpdateParam_143', 'never');
	var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=143&version=1.4.20110315';
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; /* one day in milliseconds */
	if(lastupdatecheck != 'never') { 
		today = today.getTime(); /* get today's date */
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day;
		/**
		 * Find out how many days have passed
		 * If one day has passed since the last 
		 * update check, check if a new version 
		 * is available
		 */
		if(interval >= 1) {
			update(updateURL);
		}
	} else {
		update(updateURL);
	}
}
CheckForUpdate();
