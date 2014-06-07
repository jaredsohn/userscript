// ==UserScript==
// @name         DS-HideElements
// @namespace    Zorbing
// @description  Das Skript ermöglicht das ein- und ausblenden von bestimmten Elementen
// @version      1.2
// @author       Zorbing
// @copyright    2012 Zorbing - http://userscripts.org/users/Zorbing
// @license      GNU General Public License (GPL)
// @include      http://de*.die-staemme.de/game.php?*
// @include      http://ch*.staemme.ch/game.php?*
// @include      http://en*.tribalwars.net/game.php?*
// @include      http://uk*.tribalwars.co.uk/game.php?*
// @include      http://us*.tribalwars.us/game.php?*
// @updateURL    https://userscripts.org/scripts/source/144585.meta.js
// ==/UserScript==

(function() {     
	var win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window,
	jQuery = win.jQuery,
	$ = jQuery,
	alert = win.UI.InfoMessage,
	texts = {
		de: {
			foldWarnings: "Einklappen",
			unfoldWarnings: "Ausklappen",
			hideAttacks: "Zeige nur Dörfer, die noch nicht angegriffen werden.",
		},
		ch: {
			foldWarnings: "Einklappen",
			unfoldWarnings: "Ausklappen",
			hideAttacks: "Zeige nur Dörfer, die noch nicht angegriffen werden.",
		},
		en: {
			foldWarnings: "Fold",
			unfoldWarnings: "Unfold",
			hideAttacks: "Show only villages that are not attacked.",
		}
	},
	lib = new HypixDSLib('dshe', true, false),
	game_data = lib.game_data;
	if ( lib.lang == 'uk' || lib.lang == 'us' )
		texts = texts.en;
	else
		texts = texts[lib.lang];
	// Ist leider nicht zugelassen worden:
	//win.ScriptAPI.register( 'DSHideElements', 8.6, 'Zorbing', 'zorbing@gmx.net' );
	
	var hideScriptWarnings = lib.storage.getValue('hideScriptWarnings', false);
	$('#script_warning').prepend('<a style="float: right; margin-top: -3px; display: '+ (hideScriptWarnings ? 'none' : 'block') +';" href="javascript:;">' +
		texts.foldWarnings +
	'</a>' +
	'<a style="float: right; margin-top: -3px; display: '+ (hideScriptWarnings ? 'block' : 'none') +';" href="javascript:;">' +
		texts.unfoldWarnings +
	'</a>')
	.find('a')[0].addEventListener('click', function() {
		$('#script_warning').css({ 'height': 8, 'overflow': 'hidden' });
		$('#script_warning a:lt(2)').toggle();
		hideScriptWarnings = true;
		lib.storage.setValue('hideScriptWarnings', hideScriptWarnings);
	}, true);
	$('#script_warning').find('a')[1].addEventListener('click', function() {
		$('#script_warning').css({ 'height': '', 'overflow': '' });
		$('#script_warning a:lt(2)').toggle();
		hideScriptWarnings = false;
		lib.storage.setValue('hideScriptWarnings', hideScriptWarnings);
	}, true);
	if ( hideScriptWarnings )
		$('#script_warning').css({ 'height': 8, 'overflow': 'hidden' });
	
	var Farm_Assistent = {
		hide_attacks: lib.storage.getValue('am_farm_hide_attacks', false),
		init: function() {
			if ( !$('#am_widget_Farm').length )
				return;
			this.initGUI();
			$('#am_widget_Farm')[0].addEventListener('DOMNodeInserted', function(e) {
				if ( e.originalTarget.id != 'dsfa_row' && !$(e.originalTarget).parents('#dsfa_row').length )	// Endlosrekursion verhindern
					Farm_Assistent.initGUI();
			}, false);
		},
		initGUI: function() {
			if ( !$('#dsfa_hide_attacks').length ) {
				$('#am_widget_Farm table:first tr:first').clone().attr('id', 'dsfa_row').insertAfter('#am_widget_Farm table:first tr:first').find('td:first').html(
					'<input type="checkbox" id="dsfa_hide_attacks"'+ (Farm_Assistent.fa_hide_attacks ? ' checked' : '') +'> ' +
					'<label for="dsfa_hide_attacks">'+ texts.hideAttacks +'</label>'
				);
				$('#dsfa_hide_attacks')[0].addEventListener('change', Farm_Assistent.hideAttacks, true);
				
				this.hideAttacks();
				this.colorAttackedRows();
			}
		},
		hideAttacks: function() {
			Farm_Assistent.hide_attacks = $('#dsfa_hide_attacks').is(':checked')
			lib.storage.setValue('dsfa_am_farm_hide_attacks', Farm_Assistent.hide_attacks);
			if ( Farm_Assistent.hide_attacks ) {
				$('.row_a').each(function() {
					if ( $(this).find('td:eq(3)').html().match(/command\/attack\.png/) )
						$(this).hide();
				});
				$('.row_b').each(function() {
					if ( $(this).find('td:eq(3)').html().match(/command\/attack\.png/) )
						$(this).hide();
				});
			} else {
				$('.row_a').each(function() {
					$(this).show();
				});
				$('.row_b').each(function() {
					$(this).show();
				});
			}
		},
		colorAttackedRows: function() {
			$('.row_a').each(function() {
				if ( $(this).find('td:eq(3)').html().match(/command\/attack\.png/) )
					$(this).find('td').css('background-color', '#F0727E');
			});
			$('.row_b').each(function() {
				if ( $(this).find('td:eq(3)').html().match(/command\/attack\.png/) )
					$(this).find('td').css('background-color', '#FF959A');
			});
		}
	}
	
	Farm_Assistent.init();
	
	function HypixDSLib(prefix, forceGM, useIdx) {
		// Hypix's storage-class; thanks for providing!
		var lib = this;
		this.prefix = prefix;
		this.Debugger = function() {
			this.log = function() {
				for ( var i = 0; i < arguments.length; ++i ) {
					var msg = arguments[i];
					if ( typeof(GM_log) != "undefined" )
						GM_log(msg);
					else if ( typeof(opera) != "undefined" )
						opera.postError(msg);
					if ( typeof(console) != "undefined" )
						console.log(msg);
				}
			}
			
			this.dumpObj = function(obj, tabs) {
				if ( !tabs ) {
					tabs = '';
					var str = "\nDumpObj:\n{";
				} else {
					var str = "\n" + tabs + "{";
				}
				var ntabs = tabs + "\t";
				for ( var key in obj ) {
					if ( typeof(obj[key] ) == "object" ) {
						str += "\n" + ntabs + key + ":";
						str += this.dumpObj(obj[key], ntabs)
					} else if ( typeof(obj[key]) != "function" ) {
						if ( typeof(obj[key]) == "string" )
							str += "\n" + ntabs + key + ": \"" + obj[key] + "\"";
						else
							str += "\n" + ntabs + key + ": " + obj[key] + "";
					}
				}
				str += "\n" + tabs + "}";
				if ( tabs == '' )
					this.log(str);
				return str;
			}
			
			this.dumpVar = function(obj, lnbr) {
				lib.debug.log(dump(obj, lnbr));
			}
			var dump = function(obj, lnbr) {
				var ret = typeof (obj) + ' ' + obj + (lnbr ? '\n' : '');
				if ( typeof(obj) == "number" ) {
					ret = 'Number('+ obj +')'+ (lnbr ? '\n' : '');
				} else if ( typeof(obj) == "string" ) {
					ret = 'String('+ obj.length +') "'+ obj +'"'+ (lnbr ? '\n' : '');
				} else if ( typeof(obj) == 'object' && (obj instanceof Array) ) {
					ret = 'array('+ obj.length +') {'+ (lnbr ? '\n' : ' ');
				} else if ( typeof(obj) == "object" ) {
					ret = 'object {'+ (lnbr ? '\n' : ' ');
				}
				if ( typeof(obj) == "object" ) {
					for ( var key in obj ) {
						ret += '['+ (typeof(key) == "string" ? '"' : '') + key + (typeof(key) == "string" ? '"' : '') +'] => '+ dump(obj[key], lnbr) + (lnbr ? '' : ' ');
					}
					ret += '}'+ (lnbr ? '\n' : '');
				}
				return ret;
			}
		}
		this.StorageHandler = function(forceGM, useIdx) {
			var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox") > -1,
			win = gm ? unsafeWindow : window,
			ls = false,
			intGetValue,
			intSetValue,
			prefix = lib.prefix;
			try {
				ls = typeof(win.localStorage) != "undefined";
			} catch(e) {
				lib.debug.log(e.message);
			}
			var setIdx = function(key, inIdx) {
				if ( typeof(inIdx) == "undefined" )
					inIdx = true;
				if ( useIdx && inIdx ) {
					var idx = intGetValue("idx", ";");
					if (!new RegExp(";" + key + ";").test(idx))
						intSetValue("idx", idx + key + ";", false);
				}
			}
			var delIdx = function(key) {
				if ( useIdx ) {
					var idx = intGetValue("idx", ";");
					idx = idx.replace(new RegExp(";" + key + ";", "g"), ";");
					intSetValue("idx", idx, false);
				}
			}
			var idxListValues = function(re) {
				var allkeys = intGetValue("idx", ";").split(";");
				var serverKeys = [];
				if ( typeof(re) != "undefined" )
					var reKey = new RegExp(re);
				for ( var i = 1; i < allkeys.length - 1; i++ ) {
					if ( reKey ) {
						res = res[1].match(reKey);
						if ( res )
							serverKeys.push(res);
					} else
						serverKeys.push(res[1]);
				}
				return serverKeys;
			}
			if ( forceGM && gm || !ls ) {
				if ( gm ) {
					prefix = prefix +"_"+ document.location.host.split('.')[0];
					intSetValue = function(key, value, inIdx) {
						setIdx(key, inIdx);
						GM_setValue(prefix +"_"+ key, value);
					};
					intGetValue = function(key, defaultValue) {
						return GM_getValue(prefix +"_"+ key, defaultValue);
					}
					this.deleteValue = function(key) {
						delIdx(key);
						GM_deleteValue(prefix +"_"+ key);
					}
					if ( this.useIdx )
						this.listValues = idxListValues;
					else
						this.listValues = function(re) {
							var allkeys = GM_listValues();
							var serverKeys = [];
							var rePrefix = new RegExp("^" + prefix + "_(.*)$");
							if ( typeof(re) != "undefined" )
								var reKey = new RegExp(re);
							for ( var i = 0; i < allkeys.length; i++ ) {
								var res = allkeys[i].match(rePrefix);
								if ( res ) {
									if ( reKey ) {
										res = res[1].match(reKey);
										if ( res )
											serverKeys.push(res);
									} else
										serverKeys.push(res[1]);
								}
							}
							return serverKeys;
						}
				} else {
					this.error("No suitable storage capability found!"); end;
				}
			} else if ( ls ) {
				intSetValue = function(key, value, inIdx) {
					if ( useIdx )
						setIdx(key, inIdx);
					localStorage.setItem(prefix + "_" + key, value);
				};
				intGetValue = function(key, defaultValue) {
					var value = localStorage.getItem(prefix + "_" + key);
					if ( value )
						return value;
					else
						return defaultValue;
				};
				this.deleteValue = function(key) {
					delIdx(key);
					localStorage.removeItem(prefix + "_" + key);
				}
				if ( this.useIdx )
					this.listValues = idxListValues;
				else
					this.listValues = function(re) {
						if ( this.useIdx ) {
							return idxListValues(intGetValue("idx", "").split(";"));
						} else {
							var keys = [];
							var rePrefix = new RegExp("^" + prefix + "_(.*)$");
							if ( typeof(re) != "undefined" )
								var reKey = new RegExp(re);
							for ( var i = 0; i < win.localStorage.length; i++ ) {
								var res = localStorage.key(i).match(rePrefix);
								if ( res ) {
									if ( reKey ) {
										res = res[1].match(reKey);
										if ( res )
											keys.push(res);
									} else
										keys.push(res[1]);
								}
							}
							return keys;
						}
					}
			} else {
				this.error("No suitable storage capability found!");
				end;
			}
			this.clear = function(re) {
				var keys = this.listValues(re);
				for ( var i = 0; i < keys.length; i++ )
					this.deleteValue(keys[i]);
			}
			this.setValue = function(key, value) {
				switch ( typeof(value) ) {
					case "object":
					case "function":
						intSetValue(key, "j" + JSON.stringify(value));
						break;
					case "number":
						intSetValue(key, "n" + value);
						break;
					case "boolean":
						intSetValue(key, "b" + ( value ? 1 : 0));
						break;
					case "string":
						intSetValue(key, "s" + value);
						break;
					case "undefined":
						intSetValue(key, "u");
						break;
				}
			}
			this.getValue = function(key, defaultValue) {
				var str = intGetValue(key);
				if ( typeof(str) != "undefined" ) {
					switch ( str[0] ) {
						case "j":
							try {
								return JSON.parse(str.substring(1));
							} catch(e) {
								alert(key + ": " + texts.gui.valueError);
								return defaultValue;
							}
						case "n":
							return parseFloat(str.substring(1));
						case "b":
							return str[1] == "1";
						case "s":
							return str.substring(1);
						default:
							this.deleteValue(key);
					}
				}
				return defaultValue;
			}
			this.getString = function(key) {
				return intGetValue(key);
			}
			this.setString = function(key, value) {
				intSetValue(key, value);
			}
		}
		this.parseParams = function(url) {
			url = url.replace(location.hash, "");
			// Wegschneiden von allem was nach # kommt
			url = url.substring(url.indexOf('?') + 1);
			url = url.replace(/&amp;/g, '&');
			var hash = url.indexOf('#');
			if ( hash > -1 ) {
				url = url.substring(0, hash - 1);
			};
			url = url.split('&');
			var params = {
				get : function(name, def) {
					if ( typeof(this[name]) == "undefined" )
						return def;
					else
						return this[name];
				}
			};
			for ( var i = 0; i < url.length; i++ ) {
				var param = url[i].split('=');
				params[param[0]] = param[1];
			}
			return params;
		}
		this.getGameData = function() {
			var game_data;
			if ( typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox") > -1 ) {
				game_data = unsafeWindow.game_data;
			}
			if ( !game_data ) {
				var script = document.createElement("script");
				script.type = "application/javascript";
				script.textContent = "var input=document.createElement('input');" +
				"input.type='hidden';" +
				"input.value=JSON.stringify(game_data);" +
				"input.id='game_data';" +
				"document.body.appendChild(input);";
				document.body.appendChild(script);
				var input = document.getElementById("game_data");
				if ( input )
					eval("game_data=" + input.value + ";");
				document.body.removeChild(script);
			}
			if ( game_data )
				game_data.link_base = game_data.link_base.replace(/&amp;/g, "&");
			return game_data;
		}
		this.createLink = function(screen) {
			var lnk = this.game_data.link_base.replace(/screen=/, "screen=" + screen);
			var len = arguments.length - 1;
			for ( var i = 1; i < len; i++ ) {
				lnk += "&" + arguments[i] + "=";
				i++;
				if ( i < len )
					lnk += arguments[i];
			}
			if ( arguments[len] == true )
				lnk.replace(/&/g, "&amp;");
			return lnk;
		}
		this.alert = function(message, fadeOutTime, mclass) {
			var script = document.body.appendChild(document.createElement("script"));
			script.type = "text/javascript";
			if ( arguments.length < 2 )
				script.innerHTML = "$(document).ready(function(){ UI.InfoMessage('"+ message +"'); });";
			else if ( arguments.length > 2 )
				script.innerHTML = "$(document).ready(function(){ UI.InfoMessage('"+ message +"',"+ fadeOutTime +",'"+ mclass +"'); });";
		}
		this.success = function(message, fadeOutTime, mclass) {
			if ( typeof(fadeOutTime) == "undefined" )
				fadeOutTime = 2000;
			if ( typeof(mclass) == "undefined" )
				mclass = 'success';
			else
				mclass += ' success';
			this.alert(message, fadeOutTime, mclass);
		}
		this.error = function(message, fadeOutTime, mclass) {
			if ( typeof(fadeOutTime) == "undefined" )
				fadeOutTime = 2000;
			if ( typeof(mclass) == "undefined" )
				mclass = 'error';
			else
				mclass += ' error';
			this.alert(message, fadeOutTime, mclass +' error');
		}
		this.debug = new this.Debugger();
		this.storage = new this.StorageHandler(forceGM, useIdx);
		this.params = this.parseParams(location.href);
		this.server = document.location.host.split('.')[0];
		var res = this.server.match(/^([a-z]{2})s?(\d+)/);
		if ( res ) {
			this.lang = res[1];
			this.world = parseInt(res[2], 10);
		} else {
			this.lang = "de";
			this.world = -1;
		}
		this.worldString = this.lang + this.world;
		
		if ( this.params.screen )
			this.game_data = this.getGameData();
	}
})();