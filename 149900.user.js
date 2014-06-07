// ==UserScript==
// @id             qlranksdisplay@phob.net
// @name           QLRanks.com Display
// @version        1.21
// @description    Overlay quakelive.com with Elo data from QLRanks.com
// @namespace      phob.net
// @homepage       http://qlranks.com
// @author         wn
// @contributor    szr
// @contributor    syncore
// @contributor    simonov
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @iconURL        https://s3.amazonaws.com/uso_ss/13663/large.jpg
// @updateURL      https://userscripts.org/scripts/source/111519.meta.js
// ==/UserScript==

// Set up some stuff for user script updating
var SCRIPT_NAME = "QLRanks.com Display"
  , SCRIPT_VER  = "1.21";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;


// Set up some utility things
var DEBUG = false
  , DOLITTLE = function() {}
  , logMsg = DEBUG ? function(aMsg) {GM_log(aMsg)} : DOLITTLE
  , logError = function(aMsg) {GM_log("ERROR: " + aMsg)};

// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
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
  return;
}


// We can work around other missing GM_ functions
/**
 * GM_ API emulation for Chrome; 2009, 2010 James Campos
 * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (window.chrome || "undefined" == typeof(GM_getValue)) {
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
if ("undefined" == typeof(GM_addStyle)) {
  GM_addStyle = function(css) {
    var head = document.getElementsByTagName("head")[0];
    if (head) {
      var style = document.createElement("style");
      style.textContent = css;
      style.type = "text/css";
      head.appendChild(style);
    }
  }
}

if (window.chrome || "undefined" == typeof(GM_registerMenuCommand)) {
  GM_registerMenuCommand = DOLITTLE;
}


/**
 * Function binding... mostly for convenience
 */
if (!Function.prototype.bind) {
  Function.prototype.bind=function(oThis){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function(){},fBound=function(){return fToBind.apply(this instanceof fNOP?this:oThis||window,aArgs.concat(Array.prototype.slice.call(arguments)))};fNOP.prototype=this.prototype;fBound.prototype=new fNOP();return fBound}
}
contentEval(function() {
if (!Function.prototype.bind) {
  Function.prototype.bind=function(oThis){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function(){},fBound=function(){return fToBind.apply(this instanceof fNOP?this:oThis||window,aArgs.concat(Array.prototype.slice.call(arguments)))};fNOP.prototype=this.prototype;fBound.prototype=new fNOP();return fBound}
}
}); // end of call to contentEval


/**
 * Use an auto-update script if integrated updating isn't enabled
 * http://userscripts.org/scripts/show/38017
 * NOTE: Modified to remove some checks, since we do that above.
 *       Also added the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled) {
  var AutoUpdater_111519={id:111519,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_111519.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_111519.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_111519",new Date().getTime()+"");AutoUpdater_111519.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_111519","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_111519","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_111519",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_111519",0)+1000*60*60*24*this.days)){GM_setValue("updated_111519",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_111519",new Date().getTime()+"");AutoUpdater_111519.call(true,true)})}}};AutoUpdater_111519.check();
}


// Don't bother if Quake Live is down for maintenance
if (/offline/i.test(document.title)) {
  return;
}

// Make sure we're on top
if (window.self != window.top) {
  return;
}

/**
 * Important one-time notifications
 */
if (!GM_getValue("qlrd_notified_105", false)) {
  GM_setValue("qlrd_notified_105", true);
  contentEval(function() {
  // Poll every 2 seconds
  var notifier = setInterval(function() {
    // Unlikely, but don't interfere if the game is running.
    if ($("#qlv_user_data").length && !quakelive.IsGameRunning()) {
      clearInterval(notifier);
      var msg = "Hello!  This latest update adds some nice features, specifically "
              + "Clan Arena + Team Deathmatch support and an in-game Elo announcer.<br/><br/>"
              + "To see the full changelog, and how to use the in-game Elo announcer, "
              + "please visit the script's page on UserScripts.Org "
              + "<a href='http://userscripts.org/scripts/show/111519/' target='_blank'>here</a>. "
              + "Thanks!";
      qlPrompt({
        title: "QLRanks.com Display Notice",
        body: msg,
        fatal: false,
        alert: true
      });
    }
  }, 2E3);
  }); // end of call to contentEval
}


// If we have GM_registerMenuCommand, create our commands
GM_registerMenuCommand(SCRIPT_NAME + ": Clear the player data cache", function() {
  contentEval(function() {
    QLRD.PLAYERS = {};
    QLRD.logMsg("Player data cache cleared");
  });
  logMsg("Player data cache cleared");
});

GM_registerMenuCommand(SCRIPT_NAME + ": Toggle Elo rating on unsupported scoreboards",
    function() {
  PREFS.toggle("showRatingForAllGametypes");
  logMsg("'Toggle Elo rating on unsupported scoreboards' is now "
      + (PREFS.get("showRatingForAllGametypes") ? "enabled" : "disabled"));
});


/**
 * Content-side cache of player info, preferences, and utilities.
 * NOTE: 'var' left off intentionally so other sections can hit it.
 */
contentEval(function() {
QLRD = {
  // Logging
  logMsg: function(aMsg) {
    if ("undefined" == typeof(console)) {
      QLRD.logMsg = function() {};
    }
    else {
      QLRD.logMsg = function(aMsg) {QLRD.PREFS["debug"] && console.log("QLRD: " + aMsg)};
      QLRD.logMsg(aMsg);
    }
  },

  logError: function(aMsg) {
    if ("undefined" == typeof(console)) {
      QLRD.logError = function() {};
    }
    else {
      QLRD.logError = function(aMsg) {QLRD.logMsg("ERROR: " + aMsg)};
      QLRD.logError(aMsg);
    }
  },

  // Keep a content-side cache of player info (Elo, etc.)
  PLAYERS: {},

  // Keep a content-side copy of script preferences
  PREFS: {},

  // Map LGI (or other source) full name to the abbreviation used on QLRanks.com
  // TODO: fix this... currently just a catch-all for several things
  GAMETYPES: {
    "ca": "ca",
    "clan arena": "ca",
    "duel": "duel",
    "tdm": "tdm",
    "team deathmatch": "tdm",
    "team death match": "tdm" // used by the mapdb
  },

  OUTPUT: ["print", "echo", "say", "say_team"],

  activeServerReq: false,

  // Helper to echo and print a message
  igAnnounce: function(aMsg, isError) {
    if (!(aMsg && quakelive.IsGameRunning())) {
      return;
    }

    var msg = (isError ? "^1[QLRD ERROR]" : "^2[QLRD]") + " ^7" + aMsg + ";";
    qz_instance.SendGameCommand("echo " + msg);

    if (isError) {
      qz_instance.SendGameCommand("print " + msg);
      QLRD.logError(aMsg);
    }
    else {
      QLRD.logMsg(aMsg);
    }
  },

  /**
   * Complete a request from cache, or post a request to have it completed
   * @param {Array} arr an array of "set" object containing {name,targets?}
   */
  set: function(sets) {
    // Items to be requested from QLRanks.com
    var toRequest = [];

    if (!$.isArray(sets)) {
      sets = [sets];
    }
    QLRD.logMsg("got sets: " + JSON.stringify(sets));

    $.each(sets, function(i, s) {
      // Make sure the key is case-insensitive... wn = wN = WN
      try {
        s.name = $.trim(s.name.toLowerCase());
      }
      catch(e) {
        QLRD.logError("QLRD.set: converting player name: " + e);
        return true;
      }

      // Continue if the formatted name is an empty string
      if (0 == s.name.length) {
        return true;
      }

      if ("targets" in s) {
        $.each(s.targets, function(gt, target) {
          var gtLow = gt.toLowerCase();
          // Make sure we're using a good gametype, otherwise remove the target.
          if (!(gtLow in QLRD.GAMETYPES)) {
            delete s.targets[gt];
            QLRD.logError("QLRD.set: removing invalid gametype '" + gt
                        + "' for player '" + s.name + "'");
            return true;
          }
          // The gametype key should always be lowercase to match QLRD.GAMETYPES
          if (gtLow != gt) {
            s.targets[gtLow] = $.trim(target.toLowerCase());
            delete s.targets[gt];
          }
        });
      }
      else {
        s.targets = {};
      }

      // Fulfill from the cache if possible
      if (s.name in QLRD.PLAYERS) {
        QLRD.logMsg("loading '" + s.name + "' from cache");
        $.each(s.targets, function(gt, target) {
          $(target).html(QLRD.PLAYERS[s.name][gt].elo)
                   .attr("title", gt.toUpperCase() + " Rank: "
                                + QLRD.PLAYERS[s.name][gt].rank);
        });
      }
      // ... otherwise QLRanks.com
      else {
        QLRD.logMsg("requesting info for '" + s.name + "' from QLRanks.com");
        toRequest.push(s);
      }
    });

    // Pass uncached players to the userscript side
    if (toRequest.length) {
      window.postMessage(JSON.stringify({"type":"QLRD:eloRequest", "reqs": toRequest}), "*");
    }
  },


  /**
   * Message listener
   * @param {Object} aEvent The message event.  Has data, origin, etc.
   * .data should have {type,name,value}
   */
  handleMessage: function(aEvent) {
    if (!(aEvent && aEvent.data)) {
      return;
    }

    var response;
    try {
      response = JSON.parse(aEvent.data);
    } catch(e) {return QLRD.logError("handleMessage: " + e)}

    // Make sure we have everything
    if (!("name" in response && "value" in response)) {
      return;
    }

    switch (response.type) {
      case "QLRD:prefChange":
        QLRD.PREFS[response.name] = response.value;
        QLRD.logMsg("loaded pref '" + response.name + "' => '" + response.value + "'");
        return;
      case "QLRD:eloResponse":
        if (!response.value) {
          QLRD.logError("got eloResponse missing value (" + response.value
                 + ") for '" + response.name + "'");
          return;
        }
        // Don't cache if there was an error, just display the message.
        // TODO: combine the target stuff with QLRD.set somehow
        if (response.value["error"]) {
          if (response.targets) {
            $.each(response.targets, function(gt, target) {
              $(target).html(response.value["error"]);
            });
          }
        }
        // Update the local cache and target (if any) with our content.
        else {
          QLRD.logMsg("got response for '" + response.name + "': "
               + JSON.stringify(response.value));
          QLRD.PLAYERS[response.name] = response.value;
          if (response.targets) {
            $.each(response.targets, function(gt, target) {
              $(target).html(QLRD.PLAYERS[response.name][gt].elo)
                       .attr("title", gt.toUpperCase() + " Rank: "
                                    + QLRD.PLAYERS[response.name][gt].rank);
            });
          }
        }
        break;
    }
  }
};
window.addEventListener("message", QLRD.handleMessage, false);
}); // end of call to contentEval


// Preferences helper
var PREFS = {
  _prefs: {},

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
    var msg = {
      "type": "QLRD:prefChange",
      "name": aName,
      "value": aVal
    };
    window.postMessage(JSON.stringify(msg), "*");
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
[
  {"name":"debug","def":false},
  {"name":"showRatingForAllGametypes","def":false},
  {"name":"user_gt","def":"Duel"}
].forEach(function(aPref) {
  PREFS.set(aPref.name, GM_getValue(aPref.name, aPref.def));
  logMsg("loaded pref '" + aPref.name + "' => '" + PREFS.get(aPref.name) + "'");
});


/**
 * Handle Elo requests and emit a response
 * @param {Object} aEvent The message event.  Has data, origin, etc.
 * .data should have {type,name,value}
 */
function handlePrefRequest(aEvent) {
  var request;
  try {
    request = JSON.parse(aEvent.data);
  } catch(e) {return}

  // Make sure we have a message type and pref name
  if (!(request.type && request.name && request.value)) {
    return;
  }

  // Only respond to a preference update
  if ("QLRD:prefUpdate" != request.type) {
    return;
  }

  // Update the script value
  logMsg("change pref '" + request.name + "' from '" + PREFS.get(request.name)
       + "' to '" + request.value + "'");
  PREFS.set(request.name, request.value);
}
window.addEventListener("message", handlePrefRequest, false);


/**
 * Handle Elo requests and emit a response
 * @param {Object} aEvent The message event.  Has data, origin, etc.
 * .data should be {type:"QLRD:eloRequest",reqs:[{name,targets?}]}
 */

// Keep track of each player's requests + targets
var fillReqs = {};

// Helper to fill in error messages when something goes wrong
function fillError(names) {
  var response = {
    "type": "QLRD:eloResponse",
    "value": {"error": "error (see console)"}
  };

  // For each player from the failed request...
  for (var i = 0, e = names.length; i < e; ++i) {
    response.name = names[i];
    // ... if there are any fill requests
    if (names[i] in fillReqs) {
      // ... fill them in with the error message
      for (var j = 0, k = fillReqs[names[i]].length; j < k; ++j) {
        response.targets = fillReqs[names[i]][j];
        window.postMessage(JSON.stringify(response), "*");
      }

      // Needed so the next request will be sent to the API.  There is a
      // possibility that open fill requests will be lost, but that would
      // be a very rare and unlikely case.
      fillReqs[names[i]] = [];
    }
    else {
      window.postMessage(JSON.stringify(response), "*");
    }
  }
}

function handleEloRequest(aEvent) {
  var request;
  try {
    request = JSON.parse(aEvent.data);
  } catch(e) {return}

  // Make sure we have a message type
  if (!(request.type)) {
    return;
  }

  // Only respond to an Elo request
  if ("QLRD:eloRequest" != request.type) {
    return;
  }

  // Make sure we have an array of "set" objects
  var reqs = request.reqs;
  if (!(reqs && "[object Array]" == Object.prototype.toString.call(reqs))) {
    logError("handleEloRequest: passed a request with an invalid or non-Array 'reqs'");
    return;
  }

  var response = {
    "type": "QLRD:eloResponse"
  };

  // Ensure all "set" objects have a valid name
  var names = [];
  for (var i = 0, e = reqs.length, name, x; i < e; ++i) {
    name = reqs[i].name;
    if (/\w/.test(name)) {
      fillReqs[name] = fillReqs[name] || [];
      fillReqs[name].push(reqs[i].targets);
      // Only send as part of the request if there were no previously open fill
      // requests for the player.
      if (1 == fillReqs[name].length) {
        names.push(name);
        continue;
      }      
    }
    // Bad name...
    else {
      logError("handleEloRequest: unable to use the player name at index " + i
             + ": '" + name + "'");
      //response.value = {"error": "error (see console)"};
      //window.postMessage(JSON.stringify(response), "*");
      delete reqs[i];
      i--;
    }
  }

  if (0 == names.length) {
    logError("handleEloRequest was passed no valid names");
    return;
  }

  // Request the info from QLRanks.com
  logMsg("requesting info for: '" + names.join("','") + "'");
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://qlranks.com/api.aspx?nick=" + names.join("+"),
    onerror: function(names, details) {
      logError("the request failed for '" + names.join("','") + "'\n" + details.responseText);
      fillError(names);
      return;
    }.bind(null, names),
    onload: function(names, details) {
      logMsg("got response for '" + names.join("','") + "': "
           + details.responseText.replace(/[\r\n]/g, "  "));

      try {
        var players = JSON.parse(details.responseText).players;
      }
      catch(e) {
        logError("bad JSON for '" + names.join("','") + "'\n" + e);
        fillError(names);
        return;
      }

      // For each player in the response...
      for (var i = 0, e = players.length, nick, gts = ["ca","duel","tdm"]; i < e; ++i) {
        nick = players[i].nick;

        if (nick in fillReqs && fillReqs[nick].length) {
          response.name = nick;

          // ... clean up the numbers
          for (var g = 0, h = gts.length; g < h; ++g) {
            players[i][gts[g]].elo = parseInt(players[i][gts[g]].elo);
            players[i][gts[g]].rank = parseInt(players[i][gts[g]].rank);
          }
          response.value = {
            "ca": players[i].ca,
            "duel": players[i].duel,
            "tdm": players[i].tdm
          };

          // ... send a message for each of the fillReqs
          for (var j = 0, k = fillReqs[nick].length; j < k; ++j) {
            response.targets = fillReqs[nick][j];
            window.postMessage(JSON.stringify(response), "*");
          }
          fillReqs[nick] = [];
        }
      }
    }.bind(null, names)
  });
}
window.addEventListener("message", handleEloRequest, false);


/**
 * Create our own lgi_cli ("player list") to add the Elo column.
 * This does the following:
 *   - widens lgi_cli_ stuff to contain Elo column
 *   - NOTE: the above is commented out... On <-> Off caused a spacing issue
 *   - redesigns the lgi_cli_ stuff, since the old images were a fixed size
 *   - sets the Elo column to the old "Scores" position
 *   - sets the old "Scores" column (number 2) to a new third column position
 */
// TODO: nasty string concatenation...
// TODO: group common selectors? -moz-something? Chrome support?
GM_addStyle(
      "#lgi_cli { display: none; }"
    + "#lgi_cli_top, #lgi_cli_fill, #lgi_cli_bot {"
    + "  width: 280px;"
    + "  background: #232323;"
    + "  border-left: 1px solid #ccc;"
    + "  border-right: 1px solid #ccc;"
    + "}"
    + "#lgi_cli.elo #lgi_cli_top, #lgi_cli.elo #lgi_cli_fill, #lgi_cli.elo #lgi_cli_bot {"
    + "  width: 280px;" // was: 236(orig) + 50
    + "}"
    + "#lgi_cli_top {"
    + "  border-radius: 3px 3px 0 0;"
    + "  border-top: 1px solid #ccc;"
    + "}"
    + "#lgi_cli_bot {"
    + "  height: 5px;"
    + "  border-bottom: 1px solid #ccc;"
    + "  border-radius: 0 0 3px 3px;"
    + "}"
    + "#lgi_cli_content {"
    + "  width: 262px;"
    + "}"
    + "#lgi_cli.elo #lgi_cli_content {"
    + "  width: 262px;" // 212 + 50
    + "}"
    + ".lgi_headcol_elo, .lgi_cli_col_elo {"
    + "  display: none;"
    + "}"
    + "#lgi_cli.elo .lgi_headcol_elo {"
    + "  display: inline;"
    + "  left: 165px;"
    + "  position: absolute;"
    + "  text-align: center;"
    + "  width: 50px;"
    + "}"
    + "#lgi_cli.elo .lgi_cli_col_elo {"
    + "  display: inline;"
    + "  height: 20px;"
    + "  left: 157px;"
    + "  overflow: hidden;"
    + "  position: absolute;"
    + "  text-align: center;"
    + "  width: 50px;"
    + "}"
    + "#lgi_cli.elo .lgi_is_friend a {"
    + "  color: #ffcc00;"
    + "}"
    + ".lgi_headcol_2 {"
    + "  left: 165px;"
    + "}"
    + "#lgi_cli.elo .lgi_headcol_2 {"
    + "  left: 215px;" // 165 + 50
    + "}"
    + ".lgi_cli_col_2 {"
    + "  left: 157px;"
    + "}"
    + "#lgi_cli.elo .lgi_cli_col_2 {"
    + "  left: 207px;" // 157 + 50
    + "}"
);


contentEval(function() {
// Remove any existing lgi_cli
$("#lgi_cli").remove();

// Add the new lgi_cli with our Elo column
// TODO: nasty string concatenation...
$("body").append(
      "<div id='lgi_cli'>"
    + "<div id='lgi_cli_top'>"
    + "<div class='lgi_headcol_1'>Player Name</div>"
    + "<div class='lgi_headcol_elo'>QLR Elo</div>"
    + "<div class='lgi_headcol_2'>Score</div>"
    + "</div>"
    + "<div id='lgi_cli_fill'>" + "<div id='lgi_cli_content'></div>" + "</div>"
    + "<div id='lgi_cli_bot'>" + "</div>"
    + "</div>"
);


/**
 * Called before #lgi_cli (the player list) is displayed.
 */
function lgiCli_beforeShow() {
  var $this = $("#lgi_cli")
    , gt = $("#lgi_match_gametype span").text().trim().toLowerCase()
    , isSupported = gt in QLRD.GAMETYPES
    , showForAll = QLRD.PREFS["showRatingForAllGametypes"]
    , $scoreCols = $this.find(".lgi_cli_col_2");

  // Currently only showing Elo for supported gametypes
  // unless forced by the "showRatingForAllGametypes" preference.
  $this.toggleClass("elo", isSupported || showForAll);

  if (!isSupported) {
    if (showForAll) {
      gt = "duel";
    }
    else {
      return;
    }
  }

  // For every player...
  // TODO: use a single request to QLRanks.com when it is supported
  var sets = [];
  $this.find(".lgi_cli_col_1 span").each(function(i) {
    var name = $(this).text()
      , player = name.substring(name.lastIndexOf(" ") + 1);

    // Add the Elo cell
    $scoreCols.eq(i).before("<div class='lgi_cli_col_elo'>"
        + "<a id='lgi_cli_elo_" + player + "' href='http://qlranks.com/"
        + QLRD.GAMETYPES[gt] + "/player/" + player
        + "' target='_blank'>&hellip;</a></div>");

    // Request the Elo rating of the player
    var s = {"name": player, "targets": {}};
    s["targets"][QLRD.GAMETYPES[gt]] = "#lgi_cli_elo_" + player;
    sets.push(s);
  });
  QLRD.set(sets);
}


/**
 * Override jQuery's show() so we can intercept interesting things
 * @param {String} aSpeed the speed at which to show the element
 * @param {String} aCallback an optional callback for after the element in shown
 */
var oldShow = $.fn.show;
$.fn.show = function(aSpeed, aCallback) {
  return $(this).each(function() {
    var $this = $(this);
    var newCallback = function() {
      if ($.isFunction(aCallback)) {
        aCallback.apply($this);
      }
      $this.trigger("afterShow");
    };
    $this.trigger("beforeShow");
    // Listen for lgi_cli being shown so we can add our content
    // HACK: Prism wasn't picking up on the 'beforeShow' event...
    // TODO: get rid of lgiCli_beforeShow...
    if ("lgi_cli" == $this.attr("id")) {
      lgiCli_beforeShow();
    }
    oldShow.apply($this, [aSpeed, newCallback]);
  });
}
}); // end of call to contentEval


// Set up the styling for the profile module's Elo rating div
// TODO: nasty string concatenation...
GM_addStyle(
      "#qlr_elo {"
    + "  margin: 0 auto 5px;"
    + "  background-color: #232323;"
    + "  color: #fff;"
    + "}"
    + "#qlr_elo div {"
    + "  display: inline-block;"
    + "  width: 160px;"
    + "  padding: 3px;"
    + "  text-align: center;"
    + "}"
    + "#qlr_elo div:first-child {"
    + "  border-right: 1px solid #fff;"
    + "}"
    + "#qlr_elo div:nth-child(odd) {"
    + "  background-color: #333;"
    + "}"
    + "#qlr_elo div a {"
    + "  display: inline-block;"
    + "  width: 100%;"
    + "  text-decoration: none;"
    + "}"
    + "#qlr_elo div span {"
    + "  font-style: italic;"
    + "  font-weight: bold;"
    + "}"
);


/**
 * Override profile's ShowContent to show the Elo bar
 * @param {String} aCon The content passed to the module to display
 */
contentEval(function() {
var oldShowContent = quakelive.mod_profile.ShowContent;
quakelive.mod_profile.ShowContent = function QLR_mod_profile_ShowContent(aCon) {
  // The name should be the third part of the path.
  var name = quakelive.pathParts[2] || "";

  // Prepend the Elo rating div so we don't get an annoying FoC.
  var con = "<div id='qlr_elo'>"
      + "<div><a href='http://qlranks.com/duel/player/" + name + "' target='_blank'>QLRanks.com Elo Ratings</a></div>"
      + "<div><a href='http://qlranks.com/duel/player/" + name + "' target='_blank'>Duel: <span id='qlr_elo_duel'>loading&hellip;</span></a></div>"
      + "<div><a href='http://qlranks.com/tdm/player/" + name + "' target='_blank'>TDM: <span id='qlr_elo_tdm'>loading&hellip;</span></a></div>"
      + "<div><a href='http://qlranks.com/ca/player/" + name + "' target='_blank'>CA: <span id='qlr_elo_ca'>loading&hellip;</span></a></div>"
      + "</div>"
      + aCon;

  // Show the modified profile page.
  oldShowContent.call(quakelive.mod_profile, con);

  // Fill in the value.
  QLRD.set({
    "name": name,
    "targets": {
      "duel": "#qlr_elo_duel",
      "tdm": "#qlr_elo_tdm",
      "ca": "#qlr_elo_ca"
    }
  });
}


/**
 * Show the signed-in player's Elo rating in the upper-right info section.
 * Set on an interval since the target isn't immediately available.
 */
var $st
  , $pcn
  , intStatusTop
  , tries = 200; // ~20 seconds

intStatusTop = setInterval(function() {
  $st = $("#qlv_statusTop"), $pcn = $st.find("a.player_clan_name");
  if (--tries && !$pcn.length) {
    return;
  }
  clearInterval(intStatusTop);
  intStatusTop = null;

  // Inject...
  $pcn.before("<span class='qlv_user_data_elo_gametype' title='Click to change QLRanks.com Elo gametype'>" + QLRD.PREFS["user_gt"] + "</span>"
            + "<select class='qlv_user_data_elo_gametype' style='display:none'>"
            + "<option>CA</option><option>Duel</option><option>TDM</option></select>: "
            + "<a id='qlv_user_data_elo' href='http://qlranks.com/" + QLRD.PREFS["user_gt"].toLowerCase() + "/player/"
            + quakelive.username + "' target='_blank'>&hellip;</a>"
            + "<div class='cl'></div>");

  // ... and get the Elo rating
  var s = {"name": quakelive.username, "targets": {}};
  s["targets"][QLRD.PREFS["user_gt"]] = "#qlv_user_data_elo";
  QLRD.set(s);

  // Set up the gametype "toggle"
  // TODO: Handle the user clicking the same option in the select... maybe.
  $st.find("span.qlv_user_data_elo_gametype")
    .css({
      "border-bottom": "1px dotted",
      "cursor": "pointer"
    })
    .bind("click", function() {
      $(this).hide();
      $st.find("select.qlv_user_data_elo_gametype").show().focus();
    })
    .end()
    .find("select.qlv_user_data_elo_gametype")
    .bind("blur change", function() {
      var new_gt = $(this).find("option:selected").text();

      // Hide the select
      $(this).hide();

      // Update from the selected option
      $st.find("span.qlv_user_data_elo_gametype")
         .text(new_gt)
         .show();

      // Do nothing more if the gametype didn't change
      if (new_gt == QLRD.PREFS["user_gt"]) {
        QLRD.logMsg("ignoring identical 'user_gt': " + new_gt);
        return;
      }

      // Update the URL
      $("#qlv_user_data_elo").attr("href",
          "http://qlranks.com/" + new_gt.toLowerCase() + "/player/" + quakelive.username);

      // Show the appropriate Elo #
      var s = {"name": quakelive.username, "targets": {}};
      s["targets"][new_gt] = "#qlv_user_data_elo";
      QLRD.set(s);

      // Update the script's user_gt preference
      var msg = {
        "type": "QLRD:prefUpdate",
        "name": "user_gt",
        "value": new_gt
      };
      window.postMessage(JSON.stringify(msg), "*");
    })
    .find("option:contains('" + QLRD.PREFS["user_gt"] + "')").attr("selected", "selected");
}, 100);
}); // end of call to contentEval


// Set up styling for the versus frame's Elo rating links
GM_addStyle(
      "#match_vscontainer_elo1, #match_vscontainer_elo2 {"
    + "  position: absolute;"
    + "  z-index: 11;"
    + "  top: 70px;"
    + "}"
    + "#match_vscontainer_elo1 {"
    + "  left: 32px;"
    + "}"
    + "#match_vscontainer_elo2 {"
    + "  right: 33px;"
    + "}"
    + "#match_vscontainer_elo1 a, #match_vscontainer_elo2 a {"
    + "  text-decoration: none;"
    + "}"
    + "#match_vscontainer_elo1 a:hover, #match_vscontainer_elo2 a:hover {"
    + "  text-decoration: underline;"
    + "}"
);


/**
 * Override statstip's GetVersusFrame to fill in Elo data
 */
contentEval(function() {
var oldGetVersusFrame = quakelive.statstip.GetVersusFrame;
quakelive.statstip.GetVersusFrame = function QLR_statstip_GetVersusFrame() {
  var $mvs = oldGetVersusFrame.apply(quakelive.statstip, arguments);

  // Only show for Duel
  if ($mvs.find(".gameTypeIcon img[src*='duel']").length) {
    var player1 = $mvs.find(".nameNum1").text()
      , player2 = $mvs.find(".nameNum2").text();

    // Player 1 (left side)
    $mvs.find(".flagNum1")
        .after("<div id='match_vscontainer_elo1'>"
             + "<a href='http://qlranks.com/duel/player/" + player1
             + "' target='_blank'>&hellip;</a></div>")

    // Player 2 (right side)
    $mvs.find(".flagNum2")
        .before("<div id='match_vscontainer_elo2'>"
              + "<a href='http://qlranks.com/duel/player/" + player2
              + "' target='_blank'>&hellip;</a></div>");

    // Wait a bit so the versus frame gets inserted.
    setTimeout(function() {
      var s1 = {"name": player1, "targets": {}};
      s1["targets"]["duel"] = "#match_vscontainer_elo1 a";

      var s2 = {"name": player2, "targets": {}};
      s2["targets"]["duel"] = "#match_vscontainer_elo2 a";

      QLRD.set([s1,s2]);
    }, 0);
  }

  // Return the modified content to be appended
  return $mvs;
}
}); // end of call to contentEval


/**
 * Override OnCvarChanged to track our in-game commands
 */
contentEval(function() {
var oldOnCvarChanged = OnCvarChanged;
OnCvarChanged = function(name, val, replicate) {
  switch (name) {
    case "_qlrd_announce":
      QLRD.logMsg("cvar '" + name + "' changed to '" + val + "'");

      // Ignore if not 1 or QL is not running
      if (1 !== parseInt(val) || !quakelive.IsGameRunning()) {
        break;
      }

      // Give the request some time to complete
      if (QLRD.activeServerReq) {
        QLRD.igAnnounce("Please wait for the current request to complete...", false);
        break;
      }

      QLRD.activeServerReq = true;
      QLRD.igAnnounce("Updating current server info...", false);

      // Refresh the current server's details
      quakelive.serverManager.RefreshServerDetails(quakelive.currentServerId, {
        // Force a new request
        cacheTime: -1,

        onSuccess: function() {
          var server = quakelive.serverManager.GetServerInfo(quakelive.currentServerId);

          // Stop if no players were returned
          if (0 == server.players.length) {
            QLRD.igAnnounce("No players were returned by Quake Live.  "
                          + "Please try again in a few seconds.", true);
            QLRD.activeServerReq = false;
            return;
          }

          // Make sure we're using a gametype tracked by QLRanks
          try {
            var gt = mapdb.getGameTypeByID(server.game_type).title.toLowerCase();
          }
          catch(e) {
            QLRD.igAnnounce("Unable to determine server gametype. " + e, true);
            QLRD.activeServerReq = false;
            return;
          }
          if (!(gt in QLRD.GAMETYPES)) {
            QLRD.igAnnounce(gt.toUpperCase() + " is not currently tracked by QLRanks.", true);
            QLRD.activeServerReq = false;
            return;
          }

          QLRD.igAnnounce("Collecting QLRanks.com data (" + server.players.length
                        + " players)...", false);

          // Empty requests to get player info
          QLRD.set($.map(server.players, function(p) {return {"name": p.name}}));

          // Waiting 10 seconds for all players to get in the cache, polling every 50ms.
          var countdown = 200;

          // Wait until all players are in the cache or we've reached the
          // maximum number of tries.
          // NOTE: 'this' is the array of server players
          var checkForPlayers = setInterval(function(numPlayers, gt) {
            for (var i = 0; i < numPlayers; ++i) {
              if (!(this[i].name in QLRD.PLAYERS)) {
                if (!--countdown) {
                  QLRD.igAnnounce("Unable to retrieve QLRanks.com data.", true);
                  QLRD.activeServerReq = false;
                  clearInterval(checkForPlayers);
                }
                return;
              }
            }

            QLRD.activeServerReq = false;
            clearInterval(checkForPlayers);

            // Got all the player info.  Sort players by Elo (descending).
            var players = $.map(this, function(p, i) {
              return {"name": p.name, "elo": QLRD.PLAYERS[p.name][QLRD.GAMETYPES[gt]].elo};
            }).sort(function(a, b) {return b.elo - a.elo});

            // Display the results.
            // NOTE: mul is "1" to separate the header from the results
            var mul = 1
              , currentOut = quakelive.cvars.Get("_qlrd_outputMethod", QLRD.OUTPUT[0]).value
              , step = $.inArray(currentOut, ["echo","print"]) > -1 ? 100 : 700;

            // Show the chat pane for 10 seconds if output method is 'print',
            // otherwise it will be difficult to notice.
            if ("print" == currentOut) {
              qz_instance.SendGameCommand("+chat;");
              setTimeout(function() {
                qz_instance.SendGameCommand("-chat;");
              }, 10E3);
            }

            qz_instance.SendGameCommand(currentOut + " ^2QLRanks: " + gt.toUpperCase() + " results:;");
            for (var i = 0, out = []; i < numPlayers; ++i) {
              out.push("^7" + players[i].name + " ^7(^4" + players[i].elo + "^7)");

              // Group by 4, delaying commands as needed
              if ((i+1) % 4 == 0 || (i+1) == numPlayers) {
                setTimeout(function(txt, isLast) {
                  qz_instance.SendGameCommand(currentOut + " ^2QL " + txt + ";");
                  if (isLast) {
                    setTimeout(function() {
                      QLRD.igAnnounce("Done.", false);
                    }, step);
                  }
                }.bind(null, out.join(", "), (i+1) == numPlayers), mul++ * step);
                out = [];
              }
            }
          }.bind(server.players, server.players.length, gt), 50);
        },
        onError: function(aServer) {
          QLRD.igAnnounce("Unable to update current server info.", true);
          QLRD.activeServerReq = false;
        }
      });
      break;

    case "_qlrd_outputMethod":
      QLRD.logMsg("cvar '" + name + "' changed to '" + val + "'");

      // See if the value is valid.  If not, set it to a good one.
      var oi = 0;
      val = $.trim((val+"")).toLowerCase();
      for (var i = 0, e = QLRD.OUTPUT.length; i < e; ++i) {
        if (val == QLRD.OUTPUT[i]) {
          oi = i;
          break;
        }
      }
      val = QLRD.OUTPUT[oi];
      replicate = 1;
      break;
  }
  oldOnCvarChanged.call(null, name, val, replicate);
}
}); // end of call to contentEval
