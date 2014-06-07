// ==UserScript==
// @id             quakestats
// @name           QuakeStats Auto Update
// @version        0.1
// @namespace      quakestats.com
// @author         Normalised
// @description    QuakeStats.com auto update script. Submits your match stats as soon as your game finishes. Adapted from qlranks.com ELO display script : http://userscripts.org/scripts/show/111919
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

function QLStats(unsafeWindow) {


// Don't bother if Quake Live is down for maintenance
if (/offline/i.test(document.title)) {
  return;
}

// Browser stuff...
var isPrism = "platform" in unsafeWindow;

// Make sure we're on top in non-Prism browsers
if (!isPrism && unsafeWindow.self != unsafeWindow.top) {
  return;
}

// Don't bother if we're missing critical GM_ functions
if (typeof GM_xmlhttpRequest == "undefined") {
  alert("Your browser/add-on doesn't support GM_xmlhttpRequest");
  return;
}

// We can work around other missing GM_ functions
/**
 * GM_ API emulation for Chrome; 2009, 2010 James Campos
 * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (typeof GM_getValue == "undefined") {
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
  }
  GM_setValue = function(aName, aValue) {
    aValue = (typeof aValue)[0] + aValue;
    localStorage.setItem(aName, aValue);
  }
}

var GM_addStyle = GM_addStyle || function(css) {
  var head = document.getElementsByTagName("head")[0];
  if (head) {
    var style = document.createElement("style");
    style.textContent = css;
    style.type = "text/css";
    head.appendChild(style);
  }
}

// Set up some utility things
var DEBUG = false
  , DOLITTLE = function() {}
  , logMsg = DEBUG ? function(aMsg) {GM_log(aMsg)} : DOLITTLE
  , logError = function(aMsg) {GM_log("ERROR: " + aMsg)};

// Preferences helper
var PREFS = {
  _prefs: [],

  /**
   * Get a preference value
   * @param {String} aName the preference name
   * @param {Boolean|Number|String} aDefault a default value
   * @return {Boolean|Number|String} either the stored or default value
   */
  get: function(aName, aDefault) {
    return ((aName in this._prefs) ? this._prefs[aName] : aDefault);
  },

  /**
   * Sets the local and stored value of a preference
   * @param {String} aName the preference name
   * @param {Boolean|Number|String} aVal a value
   * @return {Boolean|Number|String} the value passed as aVal
   */
  set: function(aName, aVal) {
    this._prefs[aName] = aVal;
    GM_setValue(aName, aVal);
    return aVal;
  },

  /**
   * Toggle a preference value
   * @param {String} aName the preference name
   * @return {Boolean} the "toggled" value of aName
   */
  toggle: function(aName) {
    return this.set(aName, !this.get(aName));
  }
};

// Initialize preferences
[{"name":"updateStatsWhenGameFinishes","def":true}].forEach(function(aPref) {
  PREFS.set(aPref.name, GM_getValue(aPref.name, aPref.def));
  logMsg("loaded pref '" + aPref.name + "' => '" + PREFS.get(aPref.name) + "'");
});

// If we have GM_registerMenuCommand, create our commands
if (GM_registerMenuCommand) {
  GM_registerMenuCommand(SCRIPT_NAME + ": Auto update stats when game finishes",
      function() {
    PREFS.toggle("updateStatsWhenGameFinishes");
    logMsg("'Auto update stats when game finishes "
        + (PREFS.get("updateStatsWhenGameFinishes") ? "enabled" : "disabled"));
  });
}

var document = unsafeWindow.document;

/**
 * Get vars from the site
 */
var $ = unsafeWindow.jQuery,
    quakelive = unsafeWindow.quakelive
	
qlstats = {};
	
// red -> green -> blue, 5 means equal
var colours = [[255,0,0],[255,82,0],[255,164,0],[255,255,0],[130,255,0],[0,255,0],[0,255,90],[0,255,180],[0,225,255],[0,166,255],[0,90,255]];
	
	function matchFinished() {
		$.get("/profile/matches_by_week/" + quakelive.username,getMatchIds);
	}
	
	function getMatchIds(data) {
	
		var ids = [];
		var parts = [];
		$(".areaMapC", data).each(function() {
			parts = $(this).attr('id').split("_");
			if(parts[0] == "duel") {
				$.getJSON("/stats/matchdetails/" + parts[1], matchJSONLoaded);
			}
		});
	}
	
	function remoteRequest(request) {
		request.headers = {
			"User-Agent": "monkeyagent",
			"Accept": "text/monkey,text/xml",
			"Content-Type": "application/x-www-form-urlencoded"
		}

		request.method = request.method || "GET";
		setTimeout(function() {
		    GM_xmlhttpRequest(request);
		},0);
	}
	
	function matchJSONLoaded(json) {
		var request = {
			url:"http://quakestats.com/queue/processMatchFromGM",
			method:"POST",
			data: "id=" + json["PUBLIC_ID"] + "&matchData=" + JSON.stringify(json),
			onload:function(details) {
			},
			onerror:function() {
				GM_log("Error sending match");
			}
		};
		remoteRequest(request);
	}
		
	function getLastRecordedMatch() {
		// get time and id of last match quakestats.com has for current user
	}
		
	function getWinsLossesQuits(name,node) {
		$.getJSON("http://quakestats.com/stats/winsLossesQuits/" + quakelive.username + "/" + name + "?callback=?", function(data){
			if(data.error) {
				GM_log("WLQ Error : " + data.error);
			} else {
				var wins = parseInt(data.wins);
				var losses = parseInt(data.losses);
				var quits = parseInt(data.quits);
				if(wins == 0) {
					if(wins + losses + quits > 0) {
						node.append("&nbsp;(0%)");
					}
				} else {
					var winRatio = Math.round(wins * 100 / (wins + losses + quits));
					node.append("&nbsp;(" + winRatio + " %)");
				}
			}
		});
	}
	
	// var oldShowApp = quakelive.mod_friends.roster.UI_ShowApp;
	
	// quakelive.mod_friends.roster.UI_ShowApp = function QLS_mod_friends_roster_UI_ShowApp(a) {
		
		// oldShowApp.call(quakelive.mod_friends.roster);
		
		// for(f in quakelive.mod_friends.roster.fullRoster) {
			// var r = quakelive.mod_friends.roster.fullRoster[f];
			// if(r.IsOnline()) {
				// getELO(r.player_nick,r.node);
				// getWinsLossesQuits(r.player_nick,r.node);
			// }
		// }
	// }
	
	quakelive.AddHook("OnGameExited", matchFinished);
	
	quakelive.AddHook("OnContentLoaded", getLastRecordedMatch);
	
/**
 * Use an auto-update script if integrated updating isn't enabled
 * http://userscripts.org/scripts/show/38017
 * NOTE: Modified to remove some checks, since we do that above.
 *       Also added the new version number to the upgrade prompt.
 */
if (!window.chrome && !GM_updatingEnabled) {
  var AutoUpdater_111919={id:111919,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_111919.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_111919.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_111919",new Date().getTime()+"");AutoUpdater_111919.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_111919","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){try{unsafeWindow.parent.location.href="http://userscripts.org/scripts/source/"+this.id+".user.js"}catch(e){}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_111919","off");this.enable();alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_111919",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_111919",0)+1000*60*60*24*this.days)){GM_setValue("updated_111919",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_111919",new Date().getTime()+"");AutoUpdater_111919.call(true,true)})}}};AutoUpdater_111919.check();
}	
}
  
/**
 * Inject the script
 */
if (new RegExp('Firefox/\\d', 'i').test(navigator.userAgent)) { 
  // Firefox
  QLStats(unsafeWindow);
} else {
  // Chrome
  var scriptNode = document.createElement('script');
  scriptNode.setAttribute('type', 'text/javascript');
  scriptNode.text = '(' + QLStats.toString() + ')(window);';
  document.body.appendChild(scriptNode);
}