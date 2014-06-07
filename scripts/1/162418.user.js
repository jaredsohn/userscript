// ==UserScript==
// @id             qlctfratings@ictf-stats.com
// @name           QL Ctfratings
// @version        1.0
// @namespace      ictf-stats.com
// @author         tyhjyydesta
// @contributor    wn
// @contributor    szr
// @contributor    syncore
// @contributor    simonov
// @description    In game ratings display for QL ctf mode
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @grant 		   GM_xmlhttpRequest
// @run-at         document-end
// ==/UserScript==

var DEBUG = true, NOOP = function() {
}, logMsg = DEBUG ? function(aMsg) {
	GM_log(aMsg)
} : NOOP, logError = function(aMsg) {
	GM_log("ERROR: " + aMsg)
};


//Don't bother if we're missing critical GM_ functions
if ("undefined" == typeof(GM_xmlhttpRequest)) {
  alert("Your browser/add-on doesn't support GM_xmlhttpRequest, which is "
      + "required for " + SCRIPT_NAME + " to operate.");
  return;
}


/**
 * Function binding... mostly for convenience
 */
if (!Function.prototype.bind) {
  Function.prototype.bind=function(oThis){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function(){},fBound=function(){return fToBind.apply(this instanceof fNOP?this:oThis||window,aArgs.concat(Array.prototype.slice.call(arguments)))};fNOP.prototype=this.prototype;fBound.prototype=new fNOP();return fBound}
}


//Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
	// Check for function input.
	if ("function" == typeof (source)) {
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


// http://stackoverflow.com/questions/11377191/how-to-use-gm-xmlhttprequest-in-injected-code
// allow cross-domain xmlhttpRequest calls from the injected scripts
function doCrossDomainRequest(event) {
	
	if (!(event && event.data)) {
		return;
	}
	
	ax = null;
	
	try {
		ax = JSON.parse(event.data);
	} catch(e) {
		
	}
	
	if (ax == null) {
		return;
	}
	
	if (!("ctfr_active_request" in ax)) {
		return;
	}
	
	logMsg(event.data);
	
	
	delete ax["ctfr_active_request"];
	ax.ctfr_active_response = true;
	
	var variant = ax.variant;
	var exchangeType = ax.exchangeType;
	
	var players = []
	
	if (exchangeType == "ratings") {
		players = ax.allPlayers;
	} else if (exchangeType == "teamBalancing") {
		players = ax.allInGamePlayers;
	}
	
	
	
	 //var target_url = "http://localhost:10080/services/" + exchangeType + "?variant=" + variant + "&players=" + players.join("+");
	var target_url = "http://ictf-stats.com:10080/services/" + exchangeType + "?variant=" + variant + "&players=" + players.join("+");
	
	
	GM_xmlhttpRequest({
	    method: "GET",
	    url: target_url,
	    onload: function(response) {
	    	
	    	var r = null;
	    	try {
    	        r = JSON.parse(response.responseText);
    	    } catch (e) {
    	    	
    	    }
    	    
    	    var ax = this;
	    	ax.response = r;
	    	window.postMessage(JSON.stringify(ax), "*");
	    }.bind(ax),
	    
	    onerror: function(response) {
	    	
	    	var ax = this;
	    	ax.response = null;
	    	window.postMessage(JSON.stringify(ax), "*");
	    }.bind(ax)
		
	});
	
}

window.addEventListener ("message", doCrossDomainRequest, false);


contentEval(function() {
	CTFR = {
		// Logging
		logMsg : function(aMsg) {
			if ("undefined" == typeof (console)) {
				CTFR.logMsg = function() {
				};
			} else {
				CTFR.logMsg = function(aMsg) {/* CTFR.PREFS["debug"] && */
					console.log("CTFR: " + aMsg)
				};
				CTFR.logMsg(aMsg);
			}
		},

		logError : function(aMsg) {
			if ("undefined" == typeof (console)) {
				CTFR.logError = function() {
				};
			} else {
				CTFR.logError = function(aMsg) {
					CTFR.logMsg("ERROR: " + aMsg)
				};
				CTFR.logError(aMsg);
			}
		},

		// Keep a content-side copy of script preferences
		// debug: true;

		activeExchange: null,
		
		inGameOutputQueue: [],
		
		inGameOutputUnbuffered : function(command) {			
			if (!quakelive.IsGameRunning()) {
				return;
			}
			
			var suffix = "";
			
			if (command.outMethod != "echo") {
				suffix = "; wait 130;"
			}
			
			qz_instance.SendGameCommand(command.outMethod + " " + command.msg + suffix);
			
			if (command.isError) {
				CTFR.logError(command.aMsg);
			} else {
				CTFR.logMsg(command.aMsg);
			}
		},
		
//		inGameOutputRemove : function() {
//			alert("Remove");
//			alert(CTFR.inGameOutputQueue.length);
//			CTFR.inGameOutputQueue.shift();
//			alert(CTFR.inGameOutputQueue.length);
//			var continueQueue = (CTFR.inGameOutputQueue.length > 0);
//			alert(continueQueue);
//			if (continueQueue) {
//				CTFR.inGameOutputNext();
//			}
//		},
//		
//		inGameOutputNext : function() {
//			
//			if (CTFR.inGameOutputQueue.length == 0) {
//				return;
//			}
//			
//			var command = CTFR.inGameOutputQueue[0];
//			CTFR.inGameOutputUnbuffered(command);
//			setTimeout(CTFR.inGameOutputRemove(), 1000);
//		},

		inGameOutput : function(outMethod, aMsg, isError) {
			if (outMethod == null) {
				outMethod = "echo";
			}

			if (!(aMsg && quakelive.IsGameRunning())) {
				return;
			}

			var msg = (isError ? "^1[CTFR ERROR]" : "^3[CTFR]") + " ^7" + aMsg + ";";
			
			var command = {}
			command.outMethod = outMethod;
			command.aMsg = aMsg;
			command.msg = msg;
			command.isError = isError;
			
			CTFR.inGameOutputUnbuffered(command);
			
//			var startQueue = (CTFR.inGameOutputQueue.length == 0);			
//			CTFR.inGameOutputQueue.push(command);
//			
//			alert("push: " + CTFR.inGameOutputQueue.length);
//			
//			if (startQueue) {
//				CTFR.inGameOutputNext();
//			}
			
		},
		
		getPadding : function(n) {
			var padding = "";
			for (var i = 0; i < n; i++) {
				padding += ".";
			}
			return padding;
		},
		
		getRatingAsFormattedString : function(playerName, rtg, colorPrefix) {
			var elo = rtg.rating;
			var n = rtg.numGames;
			
			
			var suffix = "";
			
			if (n < 25) {
				suffix = "***";			
			} else if (n < 50) {
				suffix = "**";
			} else if (n < 100) {
				suffix = "*";
			}
			
			
			
			var eloAsStr = "^7" + elo.toFixed(0) + "^7" + suffix;
			
			var paddingLength = 11 - eloAsStr.length;
			if (paddingLength < 0) {
				paddingLength = 0;
			}
			
			var padding = CTFR.getPadding(paddingLength);
			
			var playerRtgAsStr = colorPrefix + "[" + eloAsStr + colorPrefix + "]" + "^7" + padding + " " + "^7" + playerName;
			
			return playerRtgAsStr;
		},

/*		
		getRatingAsFormattedString : function(playerName, rtg, colorPrefix) {
			var elo = rtg.rating;
			var n = rtg.numGames;
			
			var eloAsStr = elo.toFixed(0);
			var numGamesAsStr = n.toString();
			
			var eloPadding = 4 - eloAsStr.length;
			var numGamesPadding = 4 - numGamesAsStr.length;
			
			
			padding = eloPadding + numGamesPadding;
			
			if (padding < 0) {
				padding = 0;
			}
			
//			if (eloPadding < 0) {
//				eloPadding = 0;
//			}
//			
//			if (numGamesPadding < 0) {
//				numGamesPadding = 0;
//			}
			
			
			
//			var eloPaddingAsStr = CTFR.getPadding(eloPadding); 
//			var numGamesPaddingAsStr = CTFR.getPadding(numGamesPadding);
			
			var paddingAsStr = CTFR.getPadding(padding);
			
			//var playerRtgAsStr = colorPrefix + "[^7" + eloAsStr + colorPrefix + "]" + "^7" + eloPaddingAsStr + " ^7" + numGamesAsStr + "^7" + numGamesPaddingAsStr + " ^7" + playerName;
			
			var playerRtgAsStr = colorPrefix + "[^7" + eloAsStr + colorPrefix + " / ^7" + + numGamesAsStr +  colorPrefix + "]" + "^7" + paddingAsStr + " ^7" + playerName;
			
			return playerRtgAsStr;
		},
*/		
		
		outputAllRatingsForPlayers : function(outMethod, playerNamesList, ratingsMap, colorPrefix) {			
			for (var playerName in ratingsMap) {				
				
				var playerPresent = false;
				for (var i = 0; i < playerNamesList.length; i++) {
					var _name = playerNamesList[i];
					if (_name == playerName) {
						playerPresent = true;
						break;
					}
				}
				
				if (playerPresent) {
					var rtg = ratingsMap[playerName];										
					var playerRtgAsStr = CTFR.getRatingAsFormattedString(playerName, rtg, colorPrefix);
					CTFR.inGameOutput(outMethod, playerRtgAsStr, false);
				}
			}			
		},
		
		sumAllRatingsForPlayers : function(playerNamesList, ratingsMap) {
			
			var sum = 0;
			
			for (var playerName in ratingsMap) {				
				
				var playerPresent = false;
				for (var i = 0; i < playerNamesList.length; i++) {
					var _name = playerNamesList[i];
					if (_name == playerName) {
						playerPresent = true;
						break;
					}
				}
				
				if (playerPresent) {					
					var rtg = ratingsMap[playerName];															
					sum += rtg.rating;										
				}
			}
			
			return sum;
		},
		
		
		receiveCrossDomainResponse : function (event) {
			if (!(event && event.data)) {
				return;
			}
			
			ax = null;
			
			try {
				ax = JSON.parse(event.data);
			} catch(e) {
				
			}
			
			if (ax == null) {
				return;
			}
			
			if (!("ctfr_active_response" in ax)) {
				return;
			}
			
			var outMethod = ax.outMethod;
			
			if (ax.response == null) {
				CTFR.inGameOutput(outMethod, "Unable to retrieve result", true);
			} else {
				
				var exchangTypeMap = {"ratings" : "Ratings", "teamBalancing" : "Team balancing"}; 
				
				CTFR.inGameOutput(outMethod, "^3" + exchangTypeMap[ax.exchangeType] + " ^7result for variant ^4[^7" + ax.variant + "^4]", false);
				
				if (ax.exchangeType == "ratings") {
					
					if (ax.mode == "normal") {
						CTFR.outputAllRatingsForPlayers(outMethod, ax.red, ax.response, "^1");
						CTFR.outputAllRatingsForPlayers(outMethod, ax.blue, ax.response, "^4");					
						CTFR.outputAllRatingsForPlayers(outMethod, ax.specs, ax.response, "^3");
					}
					
					sumRed = CTFR.sumAllRatingsForPlayers(ax.red, ax.response);
					sumBlue = CTFR.sumAllRatingsForPlayers(ax.blue, ax.response);
					
					var diff = Math.abs(sumRed - sumBlue);			
					var diffColor = "^6";
					
					if (sumRed > sumBlue) {
						diffColor = "^1";
					}
					
					if (sumBlue > sumRed) {
						diffColor = "^4";
					}
					
					CTFR.inGameOutput(outMethod, "^1RED[^7" + sumRed.toFixed(0) + "^1] ^7: ^4BLUE[^7" + sumBlue.toFixed(0) +"^4] ^7: " + diffColor + "DIFF[^7" + diff.toFixed(0) + diffColor + "]");
					
				} else if (ax.exchangeType == "teamBalancing") {
					//CTFR.inGameOutput(outMethod, "OK", false);
					
					var red = ax.response.team1;
					var blue = ax.response.team2;
					var Q = ax.response.matchQuality * 100.0;
					
					
					CTFR.inGameOutput(outMethod, "^1" + red.join("^7|^1"), false);					
					CTFR.inGameOutput(outMethod, "^4" + blue.join("^7|^4"), false);
					CTFR.inGameOutput(outMethod, "^7" + "Teams are ^3" + Q.toFixed(2) + "% ^7balanced" , false);					
				}
			}
						
			CTFR.activeExchange = null;			
		}

	};
	
	window.addEventListener("message", CTFR.receiveCrossDomainResponse, false);
	
}); // end of call to contentEval


contentEval(function() {
	handleUpdatedServer = function(server) {
		
		var ax = CTFR.activeExchange;		
		outputMethod = ax.outMethod;
		
		var gameType = server.game_type
		
		if (gameType != 5) {
			CTFR.inGameOutput(outMethod, "Only CTF/ICTF game modes are supported", true);
        	CTFR.activeExchange = null;
		} else {
			var insta = (server.g_instagib == 1) ? true : false;
			
			var selectedVariant = quakelive.cvars.Get("_ctfr_variantMethod", "auto").value;
			
			var variant = null;
			if (selectedVariant == "auto") {
				variant = insta ? "ICTF" : "AW_CTF";
			} else {
				variant = selectedVariant.toUpperCase();
			}
			
			var svPlayers = server.players;			
			
			
			
			ax.ctfr_active_request = true;
			ax.variant = variant;
			ax.red = [];
			ax.blue = [];
			ax.specs = [];
			ax.allInGamePlayers = [];
			ax.allPlayers = [];			
			
			
			for (var i = 0; i < svPlayers.length; i++) {
				
				var player = svPlayers[i];
				var playerName = player.name;
				var team = player.team;
				
				playerName = playerName.toLowerCase();
				
				ax.allPlayers.push(playerName);
				
				if (team == 1) {
					ax.red.push(playerName);
					ax.allInGamePlayers.push(playerName);
				} else if (team == 2) {
					ax.blue.push(playerName);
					ax.allInGamePlayers.push(playerName);
				} else {
					ax.specs.push(playerName);
				}				
			}
			
			window.postMessage(JSON.stringify(ax), "*");
			
		}
    	
	}
});


contentEval(function() {

	var oldOnCvarChanged = OnCvarChanged;

	OnCvarChanged = function(name, val, replicate) {
		
		if (name == "_ctfr_announce" || name == "_ctfr_announce_simple" || name == "_ctfr_team_balance") {
			if (1 === parseInt(val) && quakelive.IsGameRunning()) {
				
				var outMethod = quakelive.cvars.Get("_ctfr_outputMethod", "echo").value;
				
				if (CTFR.activeExchange != null) {
					CTFR.inGameOutput(outMethod, "Please wait for the current request to complete...", false);					
				} else {
					var exchangeTypeMap = {"_ctfr_announce" : "ratings", "_ctfr_announce_simple" : "ratings", "_ctfr_team_balance" : "teamBalancing"};
					var exchangeTypeMap2 = {"ratings" : "ratings", "teamBalancing" : "team balancing"};
					
					exchangeType = exchangeTypeMap[name];
					
					
					CTFR.activeExchange = {};
					CTFR.activeExchange.outMethod = outMethod
					CTFR.activeExchange.exchangeType = exchangeType;
					
					if (exchangeType == "ratings") {
						CTFR.activeExchange.mode = (name == "_ctfr_announce") ? "normal" : "simple";
					}
					
					CTFR.inGameOutput(outMethod, "Retrieving ^3" + exchangeTypeMap2[exchangeType] + "^7 data...", false);
					
					quakelive.serverManager.RefreshServerDetails(quakelive.currentServerId, {
				        // Force a new request
				        //cacheTime: -1,
						cacheTime: 1,

				        onSuccess: function() {
				        	var server = quakelive.serverManager.GetServerInfo(quakelive.currentServerId);
				        	handleUpdatedServer(server);
				        },
				        	
				        onError: function(aServer) {
				        	CTFR.inGameOutput(outMethod, "Unable to update current QL server info.", true);
				        	CTFR.activeExchange = null;
				        }
					 });
				}
			}
		}
		
		
		oldOnCvarChanged.call(null, name, val, replicate);
	}

}); // end of call to contentEval


// ** IMPORTANT **
// ** This needs to be added into QL's autoexec.cfg 
// ** J, K, L, O, P are the default binds for supported actions - they can be changed according to user preferences **
// ** IMPORTANT **

/*

bind o "vstr _ctfr_output"
bind p "vstr _ctfr_variant"

bind j "seta _ctfr_team_balance 0; seta _ctfr_team_balance 1;"
bind k "seta _ctfr_announce 0; seta _ctfr_announce 1;"
bind l "seta _ctfr_announce_simple 0; seta _ctfr_announce_simple 1;"

seta _ctfr_outputMethod "echo"
seta _ctfr_variantMethod "auto"

seta _ctfr_output "vstr _ctfr_output1"
seta _ctfr_variant "vstr _ctfr_variant1"

seta _ctfr_output0 "seta _ctfr_outputMethod echo; set _ctfr_output vstr _ctfr_output1; print ^3CTFR: ^7output method is now ^5echo^7 (check the console!)"
seta _ctfr_output1 "seta _ctfr_outputMethod say; set _ctfr_output vstr _ctfr_output2; print ^3CTFR: ^7output method is now ^5say"
seta _ctfr_output2 "seta _ctfr_outputMethod say_team; set _ctfr_output vstr _ctfr_output0; print ^3CTFR: ^7output method is now ^5say_team"

seta _ctfr_variant0 "seta _ctfr_variantMethod auto; set _ctfr_variant vstr _ctfr_variant1; print ^3CTFR: ^7variant is now ^5auto^7"
seta _ctfr_variant1 "seta _ctfr_variantMethod ictf; set _ctfr_variant vstr _ctfr_variant2; print ^3CTFR: ^7variant is now ^5ictf"
seta _ctfr_variant2 "seta _ctfr_variantMethod ictf_premium; set _ctfr_variant vstr _ctfr_variant3; print ^3CTFR: ^7variant is now ^5ictf_premium"
seta _ctfr_variant3 "seta _ctfr_variantMethod aw_ctf; set _ctfr_variant vstr _ctfr_variant4; print ^3CTFR: ^7variant is now ^5aw_ctf"
seta _ctfr_variant4 "seta _ctfr_variantMethod aw_ctf_premium; set _ctfr_variant vstr _ctfr_variant0; print ^3CTFR: ^7variant is now ^5aw_ctf_premium"

*/