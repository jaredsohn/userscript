// ==UserScript==
// @name           Integrated Pickup Information System
// @namespace      Pickup
// @version        1.2
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description    Integration of pickup in Quake Live. Informations can be retrieved in-game and on the website.
// @author         smove
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum/*
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/166645.meta.js
// @downloadURL    http://userscripts.org/scripts/source/166645.user.js
// ==/UserScript==


// a few things needed for update functionality
var SCRIPT_NAME = "Integrated Pickup Information System",
	SCRIPT_VER	= "1.2",
	GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

var DOLITTLE = function () {};
var isChrome = /chrome/i.test(navigator.userAgent);

var API_URL = "http://api.ctfpickup.eu:23007/";
var IRC_CHANNEL = "ctfpickup";


// Taken from: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
	// Check for function input.
	if ("function" == typeof (source)) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = "(" + source + ")();";
	}

	// Create a script node holding this source code.
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
}


// Don't bother if we're missing critical GM_ functions
if ("undefined" == typeof(GM_xmlhttpRequest)) {
	alert("Your browser/add-on doesn't support GM_xmlhttpRequest, which is "
			+ "required for " + SCRIPT_NAME + " to operate.");
}

/**
 * We can work around other missing GM_ functions using a modified version of...
 *
 * GM_ API emulation for Chrome; 2009, 2010 James Campos
 * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (isChrome || "undefined" == typeof GM_getValue) {
	GM_getValue = function(aName, aDefaultValue) {
		var value = localStorage.getItem(aName);
		if (!value) return aDefaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case "b":
				return value == "true";
			case "n":
				return Number(value);
			default:
				return value;
		}
	};

	GM_setValue = function(aName, aValue) {
		aValue = (typeof aValue)[0] + aValue;
		localStorage.setItem(aName, aValue);
	};
}

if (isChrome || "undefined" == typeof GM_registerMenuCommand) {
	GM_registerMenuCommand = DOLITTLE;
}


/**
 * Use an auto-update script if integrated updating isn't enabled
 * http://userscripts.org/scripts/show/38017
 * NOTE: Modified to remove some checks, since we do that above.
 *       Also added the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 * NOTE: Taken from http://userscripts.org/scripts/show/111519
 */
if (!GM_updatingEnabled) {
	var AutoUpdater_166645 = {
		id: 166645,
		days: 1,
		name: SCRIPT_NAME,
		version: SCRIPT_VER,
		time: new Date().getTime(),
		call: function (response, secure) {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http" + (secure ? "s" : "") + "://userscripts.org/scripts/source/" + this.id + ".meta.js",
				onload: function (xpr) {
					AutoUpdater_166645.compare(xpr, response);
				},
				onerror: function (xpr) {
					if (secure) {
						AutoUpdater_166645.call(response, false);
					}
				}
			});
		},
		enable: function () {
			GM_registerMenuCommand(this.name + ": Enable updates", function () {
				GM_setValue("updated_166645", new Date().getTime() + "");
				AutoUpdater_166645.call(true, true);
			});
		},
		compareVersion: function (r_version, l_version) {
			var r_parts = r_version.split("."),
				l_parts = l_version.split("."),
				r_len = r_parts.length,
				l_len = l_parts.length,
				r = l = 0;
			for (var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
				r = +(r_parts[i] || "0");
				l = +(l_parts[i] || "0");
			}
			return (r !== l) ? r > l : false;
		},
		compare: function (xpr, response) {
			this.xversion = /\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
			this.xname = /\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
			if ((this.xversion) && (this.xname[1] == this.name)) {
				this.xversion = this.xversion[1];
				this.xname = this.xname[1];
			} else {
				if ((xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name)) {
					GM_setValue("updated_166645", "off");
				}
				return false;
			}
			var updated = this.compareVersion(this.xversion, this.version);
			if (updated && confirm("A new version of " + this.xname + " is available.\nDo you wish to install the latest version (" + this.xversion + ")?")) {
				var path = "http://userscripts.org/scripts/source/" + this.id + ".user.js";
				if (window.chrome) {
					prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.", path);
				} else {
					try {
						window.parent.location.href = path;
					} catch (e) {}
				}
			} else {
				if (this.xversion && updated) {
					if (confirm("Do you want to turn off auto updating for this script?")) {
						GM_setValue("updated_166645", "off");
						this.enable();
						if (window.chrome) {
							alert("You will need to reinstall this script to enable auto-updating.");
						} else {
							alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.");
						}
					}
				} else {
					if (response) {
						alert("No updates available for " + this.name);
					}
				}
			}
		},
		check: function () {
			if (GM_getValue("updated_166645", 0) == "off") {
				this.enable();
			} else {
				if (+this.time > (+GM_getValue("updated_166645", 0) + 1000 * 60 * 60 * 24 * this.days)) {
					GM_setValue("updated_166645", this.time + "");
					this.call(false, true);
				}
				GM_registerMenuCommand(this.name + ": Check for updates", function () {
					GM_setValue("updated_166645", new Date().getTime() + "");
					AutoUpdater_166645.call(true, true);
				});
			}
		}
	};
	AutoUpdater_166645.check();
}

//register command to enable/disable info box through GM menu
GM_registerMenuCommand(SCRIPT_NAME + ": Toggle Live Information Box", function() {
	if (GM_getValue("DISPLAY_INFO_BOX", "none") == "none") {
		document.getElementById("ql_pickup_info_box").style.display = "block";
		GM_setValue("DISPLAY_INFO_BOX", "block");
	} else {
		document.getElementById("ql_pickup_info_box").style.display = "none";
		GM_setValue("DISPLAY_INFO_BOX", "none");
	}
});

function pollLiveData(event) {
	var request;
	try {
		request = JSON.parse(event.data);
	} catch (e) {
		return;
	}

	// only live request allowed here
	if (!(request.type) || request.type != "PQ:liveDataRequest") {
		return;
	}
	
	GM_xmlhttpRequest({
		method: 'GET',
		url : API_URL + "channel/" + IRC_CHANNEL + "/live",
		timeout: 500,
		onload: function(data) {
			if (document.getElementById("ql_pickup_added_player") == null) {
				document.getElementById("ql_pickup_cnt").innerHTML = PQT.liveHtml;
				document.getElementById("ql_pickup_cnt").style.height = "130px";
				document.getElementById("ql_pickup_cnt").style.textAlign = "left";
			}
			
			try {
				var response = JSON.parse(data.responseText);
				if (response.ECODE < 0) {
					setTimeout(function() {
						var msg = {
								"type" : "PQ:liveDataRequest",
								"username" : request.username
						};
						window.postMessage(JSON.stringify(msg), "*");	
					}, 10000);
					return;
				}
				
				var aPlayers = response.ADDED_PLAYERS;
				var userAddedStr = "";
				for (i in aPlayers) {
					if (aPlayers[i].QL_NICK.toLowerCase() == request.username) {
						userAddedStr += " You're added.";
					}
				}
				document.getElementById("ql_pickup_added_player").innerHTML = 
						response.NUM_PLAYERS_ADDED +
						" / " + response.PLAYERS_TO_START +
						userAddedStr
						;
				var $sv = document.getElementById("ql_pickup_game_sv");
				if (response.GAME_SERVER == null) {
					$sv.innerHTML = "No Server added yet.";
				} else {
					$sv.innerHTML = "<a href='" + response.GAME_SERVER.SV_LINK + "'>Join Server</a>";
				}
				document.getElementById("ql_pickup_lastgame").innerHTML = response.LAST_GAME + " ago";
				
			} catch (e) {
				GM_log("Couldn't parse requested data: " + e);
				return;
			}
			setTimeout(function() {
						var msg = {
								"type" : "PQ:liveDataRequest",
								"username" : request.username
						};
						window.postMessage(JSON.stringify(msg), "*");
					}, 
					1000
			);
		},
		onerror: function(XMLHttpRequest, textStatus, error) {
			document.getElementById("ql_pickup_cnt").innerHTML =
				"<p style='margin: 3px 0 0 0; font-size: 12px;'><b>Service not available at the moment.</b></p>";
			document.getElementById("ql_pickup_cnt").style.height = "20px";
			document.getElementById("ql_pickup_cnt").style.textAlign = "center";
			setTimeout(function() {
						var msg = {
								"type" : "PQ:liveDataRequest",
								"username" : request.username
						};
						window.postMessage(JSON.stringify(msg), "*");
						},
					10000
			);
		}
	});
}
window.addEventListener("message", pollLiveData, false);


function pollMatchData(event) {
	var request;
	try {
		request = JSON.parse(event.data);
	} catch (e) {
		return;
	}

	// only match request allowed here
	if (!(request.type) || request.type != "PQ:matchDataRequest") {
		return;
	}
	
	GM_xmlhttpRequest({
		method: 'GET',
		url : API_URL + "channel/" + IRC_CHANNEL + "/player/" + request.username + "/lastgame",
		timeout: 500,
		onload: function(data) {
			try {
				var response = JSON.parse(data.responseText);
				if (response.ECODE < 0) {
					document.getElementById("ql_pickup_match").style.display = "none";
					setTimeout(function() {
						var msg = {
								"type" : "PQ:matchDataRequest",
								"username" : request.username
						};
						window.postMessage(JSON.stringify(msg), "*");
					}, 10000);
					return;
				}
				
				var $sv = document.getElementById("ql_pickup_match_msg");
				if (response.GAME_SERVER != null) {
					$sv.innerHTML = "Your match is <b>ready</b>! " +
									"<a href='" + response.GAME_SERVER.SV_LINK + "'>Join this Server!</a>";
					document.getElementById("ql_pickup_match").style.display = "block";
				}
				
			} catch (e) {
				GM_log("Couldn't parse requested data: " + e);
				return;
			}
			setTimeout(function() {
						var msg = {
								"type" : "PQ:matchDataRequest",
								"username" : request.username
						};
						window.postMessage(JSON.stringify(msg), "*");
					}, 
					1000
			);
		},
		onerror: function(XMLHttpRequest, textStatus, error) {
			setTimeout(function() {
						var msg = {
								"type" : "PQ:matchDataRequest",
								"username" : request.username
						};
						window.postMessage(JSON.stringify(msg), "*");
						},
					10000
			);
		}
	});
}
window.addEventListener("message", pollMatchData, false);

/*
 * This will handle single requests made by commands from within QL or this script.
 * Including /teams, /mappick, /missing, /captains and player stats for the website.
 */
function handleRequest(event) {
	var request;
	try {
		request = JSON.parse(event.data);
	} catch (e) {
		return;
	}

	if (!(request.type)) {
		return;
	}

	if ("PQ:teamRequest" == request.type ||
		"PQ:mpRequest" == request.type ||
		"PQ:missRequest" == request.type ||
		"PQ:capRequest" == request.type) {
		GM_xmlhttpRequest({
			method : 'GET',
			url : API_URL + 'channel/' + IRC_CHANNEL + '/game/' + request.serverID,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			onload : function(data) {
				try {
					var response = JSON.parse(data.responseText);
					if ("PQ:teamRequest" == request.type) {
						response.type = "PQ:teamResponse";
					}
					if ("PQ:mpRequest" == request.type) {
						response.type = "PQ:mpResponse";
					}
					if ("PQ:capRequest" == request.type) {
						response.type = "PQ:capResponse";
					}
					if ("PQ:missRequest" == request.type) {
						response.type = "PQ:missResponse";
					}
				} catch (e) {
					GM_log("Couldn't parse requested data: " + e);
					return;
				}
				window.postMessage(JSON.stringify(response), "*");
			}
		});
	}
	
	if ("PQ:playerDataRequest" == request.type) {
		GM_xmlhttpRequest({
			method : 'GET',
			url : API_URL + 'channel/' + IRC_CHANNEL + '/player/' + request.username + '/stats',
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			onload : function(data) {
				try {
					var response = JSON.parse(data.responseText);
					response.type = "PQ:playerDataResponse";
				} catch (e) {
					GM_log("Couldn't parse requested data: " + e);
					return;
				}
				window.postMessage(JSON.stringify(response), "*");
			}
		});
	}
}
window.addEventListener("message", handleRequest, false);

/*
 * Hopefully we'll get a response to our request, this function takes care of it
 */
contentEval(function() {
	
PQT = {
	log: function(msg) {
		if ("undefined" == typeof(console)) {
			PQT.log = function() {};
		} else {
			PQT.log = function(msg) {console.log("IPIS: " + msg);};
			PQT.log(msg);
		}
	},
	liveHtml : "" +
		"<div id='ql_pickup_info_box'>" +
		"<img width='300' height='24' src='http://bot.xurv.org/banner_LivePickupInfo.png' /><br />" +
		"<div id='ql_pickup_match'>" +
		"	<p><span id='ql_pickup_match_msg'></span></p>" +
		"</div>" +
		"<div id='ql_pickup_cnt'>" +
		" <div id='ql_pickup_channel'>" +
		"  <a href='irc://irc.quakenet.org/#ctfpickup'><b>#ctfpickup</b></a><br />" +
		"  <p><b>Last Game:</b> <span id='ql_pickup_lastgame'></span></p>" +
		"  <p><b>Added Players:</b> <span id='ql_pickup_added_player'></span></p>" +
		"  <p><b>Server Link:</b> <span id='ql_pickup_game_sv'></span></p>" +
		" </div>" +
		" <div id='ql_pickup_player_stat'>" +
		"  <br /><b>Player Stats</b><br />" +		
		"  <table><tr><td><b>Rating:</b> <span id='ql_pickup_player_rating'></span></td>" +
		"  <td><b>WinRatio:</b> <span id='ql_pickup_player_winratio'></span></td></tr>" +
		"  <tr><td><b>AvgScore:</b> <span id='ql_pickup_player_score'></span></td>" +
		"  <td><b>* / 30 / 7:</b> <span id='ql_pickup_player_played'></span></td></tr>" +
		"  </table>" +
		" </div>" +
		"</div>" +
		"</div>" +
		"",
/*	 isStandardUser : function(player) {
		GM_xmlhttpRequest({
				synchronous : true,
				method : 'GET',
				url : '/profile/summary/' + player,
				success : function(data) {
					var pattern = new RegExp("premium_status_0", 'g');
					return pattern.test(data);
				}	
			});
	},*/
	handleResponse : function(event) {
		var response;
		try {
			response = JSON.parse(event.data);
		} catch (e) {
			PQT.log("Couldn't parse event data: " + e);
			return;
		}

		// only response messages allowed here
		if (!(response.type)) {
			return;
		}
	
		if (response.ECODE < 0) {
			qz_instance.SendGameCommand("echo Can't find any data for this server.;");
			return;
		}

		if ("PQ:missResponse" == response.type) {
			quakelive.serverManager.RefreshServerDetails(quakelive.currentServerId, {
				onSuccess: function () {
					var sv = quakelive.serverManager.GetServerInfo(quakelive.currentServerId);
					
					if (sv.players.length == 0) {
						qz_instance.SendGameCommand('echo Could not retrieve any player information from this server yet. Try again in a few seconds.;');
						return;
					}

					var p_players = response.TEAM_RED.concat(response.TEAM_BLUE);
					var missing_players = "^3Missing:^7 ";
					var c = 0;
					for (i in p_players) {
						var found = false;
						for (j in sv.players) {
							if (p_players[i].QL_NICK.toLowerCase() == sv.players[j].name.toLowerCase()) {
								found = true;
								break;
							} 
						}
						if (!found) {
							c++;
							missing_players += p_players[i].QL_NICK + " ";
						}
					}
					if (c == 0) {
						missing_players += "No one is missing. Pickup is ready to start.";
					}
					qz_instance.SendGameCommand('say ' + missing_players + ';');
					return;
				}
			});
		}
		
		if ("PQ:mpResponse" == response.type) {
			try {
				var mapPick = "";
				if (response.FORCED_MAP == true) {
					if (response.MAPS_PER_GAME > 1) {
						mapPick = "^3Maps:^7 ";
						var size = response.MAPS.length;
						for (i in response.MAPS) {
							mapPick += response.MAPS[i].NAME;
							if (i != size - 1) {
								mapPick += ", ";
							}
						}
						
					} else {
						mapPick = "^3Map:^7 " + response.MAPS[0].NAME;
					}
				} else {
					mapPick = "^3Map Picker:^7 " + response.MAP_PICKER.QL_NICK;
				}
			} catch (e) {
				PQT.log("An error occured for mappick: " + e);
				return;
			}
			qz_instance.SendGameCommand('say ' + mapPick + ';');
			return;
		}
		
		if ("PQ:capResponse" == response.type) {
			var captains = "^3Captains:^7 ";
			try {
				if (response.FORCED_MAP == true && response.MAPS_PER_GAME > 1) {
					var rPlayers = response.TEAM_RED;
					var bPlayers = response.TEAM_BLUE;
					for (i in rPlayers) {
						if (rPlayers[i].IS_CAPTAIN == true) {
							captains += "^1Red:^7 " + rPlayers[i].QL_NICK;
							if (rPlayers[i].HAS_FIRST_DROP == true) {
								captains += "*";
							}
						}
					}
					for (i in bPlayers) {
						if (bPlayers[i].IS_CAPTAIN == true) {
							captains += " ^4Blue:^7 " + bPlayers[i].QL_NICK;
							if (bPlayers[i].HAS_FIRST_DROP == true) {
								captains += "*";
							}
						}
					}
				} else {
					captains = "^7Game has no captains.";
				}
			} catch (e) {
				PQT.log("An error occured for captains: " + e);
				return;
			}
			qz_instance.SendGameCommand('say ' + captains + ';');
			return;
		}
		
		if ("PQ:teamResponse" == response.type) {
			try {
				var teamR = response.TEAM_RED;
				var teamB = response.TEAM_BLUE;
				var mapPicker = response.MAP_PICKER.QL_NICK;
				var forcedMap = response.FORCED_MAP;
				var mapsPerGame = response.MAPS_PER_GAME;
			} catch (e) {
				PQT.log("An error occured for teams: " + e);
				return;
			}
			
			var teamRString = "^1Red:^7 ";
			var teamBString = "^4Blue:^7 ";
			var tmp;
			for (i in teamR) {
				tmp = teamR[i].QL_NICK;
				if (forcedMap == true && mapsPerGame > 1) {
					if (teamR[i].IS_CAPTAIN == true) {
						tmp = "^3" + teamR[i].QL_NICK + "^7";
						if (teamR[i].HAS_FIRST_DROP == true) {
							tmp += "*";
						}
					}
				}
				if (teamR[i].QL_NICK == mapPicker && forcedMap == false) {
					tmp = "^3" + teamR[i].QL_NICK + "^7";
				}
				teamRString += tmp + " ";
			}
			for (i in teamB) {
				tmp = teamB[i].QL_NICK;
				if (forcedMap == true && mapsPerGame > 1) {
					if (teamB[i].IS_CAPTAIN == true) {
						tmp = "^3" + teamB[i].QL_NICK + "^7";
						if (teamB[i].HAS_FIRST_DROP == true) {
							tmp += "*";
						}
					}
				}
				if (teamB[i].QL_NICK == mapPicker && forcedMap == false) {
					tmp = "^3" + teamB[i].QL_NICK + "^7";
				}
				teamBString += tmp + " ";
			}
			qz_instance.SendGameCommand('say ' + teamRString + ';');
			setTimeout(function(){
				qz_instance.SendGameCommand('say ' + teamBString + ';');
			}, 700);
			return;
		}
		
		if ("PQ:playerDataResponse" == response.type) {
			if (response.ECODE < 0) {
				$("#ql_pickup_player_stat").html("You may have not yet played a game in that channel." +
					"<br />No data available.");
				return;
			}
			$("#ql_pickup_player_rating").html(response.RATING);
			$("#ql_pickup_player_winratio").html(response.WIN_RATIO);
			$("#ql_pickup_player_score").html(response.AVG_SCORE);
			$("#ql_pickup_player_played").html(response.PLAYED_OVERALL + " / " +
											   response.PLAYED_LAST_30_DAYS + " / " +
											   response.PLAYED_LAST_7_DAYS + " / ");
		}
	}
};
window.addEventListener("message", PQT.handleResponse, false);
});

GM_addStyle(	
		"" +
		"#ql_pickup_info_box { " +
		"    display: " + GM_getValue("DISPLAY_INFO_BOX", "block") +";" +
		"}" +
		"#ql_pickup_cnt {" +
		"    width: 298px;" +
		"    height: 130px;" +
		"    text-align: left;" +
		"    color: #000;" +
		"    margin: 0 0 10px 0;" +
		"    font-size: 11px;" +
		"    font-weight: normal;" +
		"	 background: #e7e7e7;" +
		"    border: 1px solid rgb(57, 57, 57);" +
		"}" +
		"#ql_pickup_cnt div {" +
		"    margin: 0 0 0 9px;" +
		"}" +
		"#ql_pickup_cnt p {" +
		"    width: 290px;" +
		"    color: #000;" +
		"    margin: 0 0 0 27px;" +
		"    font-size: 11px;" +
		"    font-weight: normal;" +
		"}" +
		"#ql_pickup_cnt table {" +
		"    margin: 2px 0 0 18px;" +
		"}" +
		"#ql_pickup_cnt td {" +
		"    color: #000;" +
		"    padding: 0 0 0 9px;" +
		"    font-size: 11px;" +
		"    font-weight: normal;" +
		"}" +
		"#ql_pickup_cnt a {" +
		"    color: #DB3213;" +
		"    font-size: 12px;" +
		"    font-weight: normal;" +
		"    line-height: 20px;" +
		"    margin-right: 5px;" +
		"    text-decoration: none;" +
		"}" +
		"#ql_pickup_match { " +
		"    display: none;" +
		"    background: green;" +
		"    text-align: center;" +
		"    color: #fff;" +
		"    padding: 2px;" +
		"    border-left: 1px solid rgb(57, 57, 57);" +
		"    border-right: 1px solid rgb(57, 57, 57);" +
		"}" +
		"#ql_pickup_match a {" +
		"    color: #ffcc00;" +
		"    font-size: 12px;" +
		"    font-weight: normal;" +
		"    line-height: 20px;" +
		"    margin-right: 5px;" +
		"    text-decoration: none;" +
		"}"
);

contentEval(function() {
	var $ui, $tb, intStatusTop, tries = 200;
	intStatusTop = setInterval(function() {
		if ("undefined" == typeof(quakelive)) {
			return;
		}
		
		$ui = $("#post_spon_content");
		$tb = $ui.find("#my_server");
		
		if (--tries && !$tb.length) {
			return;
		}
		clearInterval(intStatusTop);
		intStatusTop = null;
		$tb.before(PQT.liveHtml);

		// once we've added our section, poll for pickup data
		var msg = {
			"type" : "PQ:liveDataRequest",
			"username" : quakelive.username
		};
		window.postMessage(JSON.stringify(msg), "*");

		msg = {
			"type" : "PQ:playerDataRequest",
			"username" : quakelive.username
		};
		window.postMessage(JSON.stringify(msg), "*");

		msg = {
			"type" : "PQ:matchDataRequest",
			"username" : quakelive.username
		};
		window.postMessage(JSON.stringify(msg), "*");
	}, 100);
});

/*
 * QL-Ingame-Commands and aliases are handled here
 */
contentEval(function() {
	if (typeof quakelive != 'object') {
		return;
	}
	var commands = {
		teams : {
			params : false,
			dft : 0,
			fn : function(val) {
				if (!quakelive.currentServerId) {
					qz_instance.SendGameCommand("echo Pickup with Bots? Good luck with that....;");
				} else {
					window.postMessage(JSON.stringify({
						"serverID" : quakelive.currentServerId,
						"type" : "PQ:teamRequest"
					}), "*");
				}
			}
		},
		mappick : {
			params : false,
			dft : 0,
			fn : function(val) {
				if (!quakelive.currentServerId) {
					qz_instance.SendGameCommand("echo Pickup with Bots? Good luck with that...;");
				} else {
					window.postMessage(JSON.stringify({
						"serverID" : quakelive.currentServerId,
						"type" : "PQ:mpRequest"
					}), "*");
				}
			}
		},
		captains : {
			params : false,
			dft : 0,
			fn : function(val) {
				if (!quakelive.currentServerId) {
					qz_instance.SendGameCommand("echo Pickup with Bots? Good luck with that...;");
				} else {
					window.postMessage(JSON.stringify({
						"serverID" : quakelive.currentServerId,
						"type" : "PQ:capRequest"
					}), "*");
				}
			}
		},
		missing : {
			params : false,
			dft : 0,
			fn : function(val) {
				if (!quakelive.currentServerId) {
					qz_instance.SendGameCommand("echo Pickup with Bots? Good luck with that...;");
				} else {
					window.postMessage(JSON.stringify({
						"serverID" : quakelive.currentServerId,
						"type" : "PQ:missRequest"
					}), "*");
				}
			}
		}

	};
	var oldLaunchGame = LaunchGame, ready;
	LaunchGame = function(params, server) {
		ready = false;
		for (i in commands) {
			if (commands[i].params) {
				params.Append('+set ' + i + ' "^7"');
				params.Append('+set ' + i + ' "' + commands[i].dft + '"');
			} else {
				commands[i].dft = 0;
				params.Append('+set GM_qlpqc_' + i + ' "0"');
				params.Append('+alias ' + i + ' "set GM_qlpqc_' + i + ' 1"');
			}
		}
		return oldLaunchGame.apply(this, arguments);
	};
	var oldOnCommNotice = OnCommNotice;
	OnCommNotice = function(error, data) {
		if (error == 0) {
			var msg = quakelive.Eval(data);
			if (msg.MSG_TYPE == 'serverinfo') {
				ready = true;
			}
		}
		return oldOnCommNotice.apply(this, arguments);
	};
	var oldOnCvarChanged = OnCvarChanged;
	OnCvarChanged = function(name, value, replicate) {
		for (i in commands) {
			if ((commands[i].params && name == i)
					|| (!commands[i].params && name == 'GM_qlpqc_' + i)) {
				if (value != commands[i].dft) {
					if (ready) {
						commands[i].fn(value);
					}
					qz_instance.SendGameCommand('set ' + name + ' "'
							+ commands[i].dft + '";');
				}
				replicate = 0;
			}
		}
		return oldOnCvarChanged.apply(this, arguments);
	};
});
