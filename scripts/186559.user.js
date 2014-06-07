// ==UserScript==
// @id             qlranksdisplay@phob.net
// @name           QLRanks.com Display
// @version        1.78
// @description    Overlay quakelive.com with Elo data from QLRanks.com
// @namespace      phob.net
// @homepage       http://www.qlranks.com
// @author         wn
// @contributor    szr
// @contributor    syncore
// @contributor    simonov
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/111519.meta.js
// ==/UserScript==


////////////////////////////////////////////////////////////////////////////////////////////////////
// RUN OR NOT
////////////////////////////////////////////////////////////////////////////////////////////////////

// Don't bother if Quake Live is down for maintenance
if (/offline/i.test(document.title)) {
  return;
}

// Make sure we're on top
if (window.self !== window.top) {
  return;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// SETUP
////////////////////////////////////////////////////////////////////////////////////////////////////

var DEBUG = false
  , DOLITTLE = function() {}
  , logMsg = DEBUG ? function(aMsg) {console.log(aMsg)} : DOLITTLE
  , logError = function(aMsg) {console.log("ERROR: " + aMsg)}
  , isChrome = /chrome/i.test(navigator.userAgent)
  , GM_registerMenuCommand = GM_registerMenuCommand ? GM_registerMenuCommand : DOLITTLE
  ;


//Helper to add CSS
function addStyle(aContent) {
  if (Array.isArray(aContent)) aContent = aContent.join("\n");
  var s = document.createElement("style");
  s.type = "text/css";
  s.textContent = aContent;
  document.body.appendChild(s);
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// PREFERENCES HELPER
////////////////////////////////////////////////////////////////////////////////////////////////////

var PREFS = {
    _defaults: [
        {"name": "debug", "def": false}
      , {"name": "showRatingForAllGametypes", "def": false}
      , {"name": "user_gt", "def": "Duel"}
    ]

  , _prefs: {}

    /**
     * Initialize preferences
     */
  , init: function() {
      PREFS._defaults.forEach(function(aPref) {
        PREFS.set(aPref.name, localStorage["qlrd_" + aPref.name] || aPref.def);
        logMsg("loaded pref '" + aPref.name + "' => '" + PREFS.get(aPref.name) + "'");
      });
    }

    /**
     * Get a preference value
     * @param {String} the preference name
     * @param {Boolean|Number|String} a default value
     * @return {Boolean|Number|String} either the stored or default value
     */
  , get: function(aName, aDefault) {
      return (aName in this._prefs ? this._prefs[aName] : aDefault);
    }

    /**
     * Sets the local and stored value of a preference
     * @param {String} the preference name
     * @param {Boolean|Number|String} a value
     * @return {Boolean|Number|String} the value passed as aVal
     */
  , set: function(aName, aVal) {
      this._prefs[aName] = aVal;
      localStorage["qlrd_" + aName] = aVal;

      return aVal;
    }

    /**
     * Toggle a preference value
     * @param {String} the preference name
     * @return {Boolean} the "toggled" value of aName
     */
  , toggle: function(aName) {
      return this.set(aName, !this.get(aName));
    }
};

// Initialize preferences
PREFS.init();


////////////////////////////////////////////////////////////////////////////////////////////////////
// MENU COMMANDS
////////////////////////////////////////////////////////////////////////////////////////////////////

// If we have GM_registerMenuCommand, create our commands
GM_registerMenuCommand("QLRanks.com Display: Clear the player data cache", function() {
  QLRD.PLAYERS = {};
  logMsg("Player data cache cleared");
});

GM_registerMenuCommand("QLRanks.com Display: Toggle Elo rating on unsupported scoreboards", function() {
  PREFS.toggle("showRatingForAllGametypes");
  logMsg("'Toggle Elo rating on unsupported scoreboards' is now "
      + (PREFS.get("showRatingForAllGametypes") ? "enabled" : "disabled"));
});


////////////////////////////////////////////////////////////////////////////////////////////////////
// QLRD RESOURCES/UTILITY
////////////////////////////////////////////////////////////////////////////////////////////////////

//contentEval(function() {
var QLRD = {
    // Cache of player info (Elo, etc.)
    PLAYERS: {}

  // Keep track of each player's requests + targets
  , fillReqs: {}

    // Map LGI (or other source) full name to the abbreviation used on QLRanks.com
    // TODO: fix this... currently just a catch-all for several things
  , GAMETYPES: {
        "ca": "ca"
      , "clan arena": "ca"
      , "ctf": "ctf"
      , "capture the flag": "ctf"
      , "duel": "duel"
      , "ffa": "ffa"
      , "free for all": "ffa"
      , "tdm": "tdm"
      , "team deathmatch": "tdm"
      , "team death match": "tdm" // used by the mapdb
    }

  , OUTPUT: ["print", "echo", "say", "say_team"]

  , activeServerReq: false

  // Helper to echo and print a message
  , igAnnounce: function(aMsg, aIsError) {
      if (!(aMsg && quakelive.IsGameRunning())) {
        return;
      }

      var msg = (aIsError ? "^1[QLRD ERROR]" : "^2[QLRD]") + " ^7" + aMsg + ";";
      qz_instance.SendGameCommand("echo " + msg);

      if (aIsError) {
        qz_instance.SendGameCommand("print " + msg);
        logError(aMsg);
      }
      else {
        logMsg(aMsg);
      }
    }

  /**
   * Complete a request from cache, or initiate a new request
   * @param {Array} an array of "set" object containing {name,targets?}
   */
  , set: function(sets) {
      // Items to be requested from QLRanks.com
      var toRequest = [];

      if (!$.isArray(sets)) {
        sets = [sets];
      }
      logMsg("QLRD.set: got sets: " + JSON.stringify(sets));

      $.each(sets, function(i, s) {
        // Make sure the key is case-insensitive... wn = wN = WN
        try {
          s.name = $.trim(s.name.toLowerCase());
        }
        catch(e) {
          logError("QLRD.set: converting player name: " + e);
          return true;
        }

        // Continue if the formatted name is empty
        if (!s.name.length) {
          return true;
        }

        if ("targets" in s) {
          $.each(s.targets, function(gt, target) {
            var gtLow = gt.toLowerCase();

            // Make sure we're using a good gametype, otherwise remove the target.
            if (!(gtLow in QLRD.GAMETYPES)) {
              delete s.targets[gt];
              logError("QLRD.set: removing invalid gametype '" + gt
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
          logMsg("QLRD.set: loading '" + s.name + "' from cache");
          $.each(s.targets, function(gt, target) {
            $(target).html(QLRD.PLAYERS[s.name][gt].elo)
                     .attr("title", gt.toUpperCase() + " Rank: "
                                  + QLRD.PLAYERS[s.name][gt].rank);
          });
        }
        // ... otherwise QLRanks.com
        else {
          logMsg("QLRD.set: requesting info for '" + s.name + "' from QLRanks.com");
          toRequest.push(s);
        }
      });

      // Pass uncached players to the userscript side
      if (toRequest.length) {
        doEloRequest(toRequest);
      }
    }

    /**
     * Ensure all players are in the cache, then call the callback.
     * @param {Array} an array of player objects (with a 'name' property)
     * @param {String} the gametype, passed back to the callback
     * @param {Function} a callback, sent either an error or players+gt
     */
  , waitFor: function(players, gt, cb) {
      // Waiting 10 seconds for all players to get in the cache, polling every 50ms.
      var countdown = 200;

      // Send empty requests
      logMsg("QLRD.waitFor: setting: " + JSON.stringify(players));
      QLRD.set(players);

      // Wait until all players are in the cache or we've reached the maximum
      // number of tries.
      var checkForPlayers = setInterval(function(players, numPlayers) {
        for (var i = 0; i < numPlayers; ++i) {
          if (!(players[i].name in QLRD.PLAYERS)) {
            if (!--countdown) {
              // Fail.  Send back an error.
              logMsg("QLRD.waitFor: FAIL... couldn't get all players in cache");
              clearInterval(checkForPlayers);
              cb.call(null, true);
            }
            return;
          }
        }

        // Success.  Send back the player objects with Elo filled in for the gametype.
        logMsg("QLRD.waitFor: SUCCESS... all players are in cache");
        clearInterval(checkForPlayers);

        // Fill in the Elo+rank values for the current gametype.
        for (var i = 0, e = players.length; i < e; ++i) {
          players[i]["elo"] = QLRD.PLAYERS[players[i].name][QLRD.GAMETYPES[gt]].elo;
          players[i]["rank"] = QLRD.PLAYERS[players[i].name][QLRD.GAMETYPES[gt]].rank;
        }

        cb.call(null, false, players, gt);
      }.bind(null, players, players.length), 50);
    }

    /**
     * Handle result of {name,value}
     */
  , handleMessage: function(response) {
      // Make sure we have everything
      if (!("name" in response && "value" in response)) {
        return;
      }

      if (!response.value) {
        logError("QLRD.handleMessage: got response missing value (" + response.value
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
        logMsg("QLRD.handleMessage: got response for '" + response.name + "': "
             + JSON.stringify(response.value));

        QLRD.PLAYERS[response.name] = response.value;

        if (!response.targets) return;

        $.each(response.targets, function(gt, target) {
          $(target).html(QLRD.PLAYERS[response.name][gt].elo)
                   .attr("title", gt.toUpperCase() + " Rank: " + QLRD.PLAYERS[response.name][gt].rank);
        });
      }
    }
};
//}); // end of call to contentEval


////////////////////////////////////////////////////////////////////////////////////////////////////
// ELO REQUEST HANDLING LOGIC
////////////////////////////////////////////////////////////////////////////////////////////////////

// Helper to fill in error messages when something goes wrong
function fillError(aNames) {
  var response = {
      "type": "QLRD:eloResponse"
    , "value": {"error": "error (see console)"}
  };

  // For each player from the failed request...
  for (var i = 0, e = aNames.length; i < e; ++i) {
    response.name = aNames[i];
    // ... if there are any fill requests
    if (aNames[i] in QLRD.fillReqs) {
      // ... fill them in with the error message
      for (var j = 0, k = QLRD.fillReqs[aNames[i]].length; j < k; ++j) {
        response.targets = QLRD.fillReqs[aNames[i]][j];
        QLRD.handleMessage(response);
      }

      // Needed so the next request will be sent to the API.  There is a
      // possibility that open fill requests will be lost, but that would
      // be a very rare and unlikely case.
      QLRD.fillReqs[aNames[i]] = [];
    }
    else {
      QLRD.handleMessage(response);
    }
  }
}


/**
 * Handle Elo requests and generate a response
 * @param {Object} The message event.  Has data, origin, etc.
 * .data should be {type: "QLRD:eloRequest", reqs: [{name,targets?}]}
 */
function doEloRequest(aReqs) {
  // Make sure we have an array of "set" objects
  if (!(aReqs && Array.isArray(aReqs))) {
    logError("doEloRequest: passed an invalid or non-Array 'aReqs': " + JSON.stringify(aReqs));
    return;
  }

  var response = {
      "type": "QLRD:eloResponse"
  };

  // Ensure all "set" objects have a valid name
  var namesToRequest = [];
  for (var i = 0, e = aReqs.length, name, x; i < e; ++i) {
    name = aReqs[i].name;
    if (/^\w+$/.test(name)) {
      QLRD.fillReqs[name] = QLRD.fillReqs[name] || [];
      QLRD.fillReqs[name].push(aReqs[i].targets);
      // Only send as part of the request if there were no previously open fill
      // requests for the player.
      if (1 == QLRD.fillReqs[name].length) {
        namesToRequest.push(name);
        continue;
      }      
    }
    // Bad name...
    else {
      logError("doEloRequest: unable to use the player name at index " + i + ": '" + name + "'");
      delete aReqs[i];
      i--;
    }
  }

  if (0 == namesToRequest.length) {
    logError("doEloRequest: passed no valid names");
    return;
  }

  // Request the info from QLRanks.com
  logMsg("doEloRequest: requesting info for: '" + namesToRequest.join("','") + "'");

  $.ajax({
      type: "GET"
    , url: "http://www.qlranks.com/api.aspx?nick=" + namesToRequest.join("+")
  })
  .done(function(aData) {
    logMsg("doEloRequest: got response for '" + namesToRequest.join("','") + "': " + JSON.stringify(aData));

    var players = aData.players;
    if (!players) {
      logError("doEloRequest: JSON for \"" + namesToRequest.join("','") + "\" was missing the 'players' member");
      fillError(namesToRequest);
      return;
    }

    // For each player in the response...
    for (var i = 0, e = players.length, nick, gts = ["ca","ctf","duel","ffa","tdm"]; i < e; ++i) {
      nick = players[i].nick;

      if (!(nick in QLRD.fillReqs || QLRD.fillReqs[nick].length)) {
        continue;
      }

      response.name = nick;

      // ... clean up the numbers
      for (var g = 0, h = gts.length; g < h; ++g) {
        players[i][gts[g]].elo = parseInt(players[i][gts[g]].elo);
        players[i][gts[g]].rank = parseInt(players[i][gts[g]].rank);
      }

      response.value = {
          "ca": players[i].ca
        , "ctf": players[i].ctf
        , "duel": players[i].duel
        , "ffa": players[i].ffa
        , "tdm": players[i].tdm
      };

      // ... send a message for each of the QLRD.fillReqs
      for (var j = 0, k = QLRD.fillReqs[nick].length; j < k; ++j) {
        response.targets = QLRD.fillReqs[nick][j];
        QLRD.handleMessage(response);
      }
      QLRD.fillReqs[nick] = [];
    }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    logError("doEloRequest: the request failed for '" + namesToRequest.join("','") + "'\n" + textStatus);
    fillError(namesToRequest);
    return;
  });
}




////////////////////////////////////////////////////////////////////////////////////////////////////
// ELO IN LIVE MATCH POPUP PLAYER LIST
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Create our own lgi_cli ("player list") to add the Elo column.
 * This does the following:
 *   - widens lgi_cli_ stuff to contain Elo column
 *   - NOTE: the above is commented out... On <-> Off caused a spacing issue
 *   - redesigns the lgi_cli_ stuff, since the old images were a fixed size
 *   - sets the Elo column to the old "Scores" position
 *   - sets the old "Scores" column (number 2) to a new third column position
 */
addStyle([
      "#lgi_cli { display: none; }"
    , "#lgi_cli_top, #lgi_cli_fill, #lgi_cli_bot {"
    , "  width: 280px;"
    , "  background: #232323;"
    , "  border-left: 1px solid #ccc;"
    , "  border-right: 1px solid #ccc;"
    , "}"
    , "#lgi_cli.elo #lgi_cli_top, #lgi_cli.elo #lgi_cli_fill, #lgi_cli.elo #lgi_cli_bot {"
    , "  width: 280px;" // was: 236(orig) + 50
    , "}"
    , "#lgi_cli_top {"
    , "  border-radius: 3px 3px 0 0;"
    , "  border-top: 1px solid #ccc;"
    , "}"
    , "#lgi_cli_bot {"
    , "  height: 5px;"
    , "  border-bottom: 1px solid #ccc;"
    , "  border-radius: 0 0 3px 3px;"
    , "}"
    , "#lgi_cli_content {"
    , "  width: 262px;"
    , "}"
    , "#lgi_cli.elo #lgi_cli_content {"
    , "  width: 262px;" // 212 + 50
    , "}"
    , ".lgi_headcol_elo, .lgi_cli_col_elo {"
    , "  display: none;"
    , "}"
    , "#lgi_cli.elo .lgi_headcol_elo {"
    , "  display: inline;"
    , "  left: 165px;"
    , "  position: absolute;"
    , "  text-align: center;"
    , "  width: 50px;"
    , "}"
    , "#lgi_cli.elo .lgi_cli_col_elo {"
    , "  display: inline;"
    , "  height: 20px;"
    , "  left: 157px;"
    , "  overflow: hidden;"
    , "  position: absolute;"
    , "  text-align: center;"
    , "  width: 50px;"
    , "}"
    , "#lgi_cli.elo .lgi_is_friend a {"
    , "  color: #ffcc00;"
    , "}"
    , ".lgi_headcol_2 {"
    , "  left: 165px;"
    , "}"
    , "#lgi_cli.elo .lgi_headcol_2 {"
    , "  left: 215px;" // 165 + 50
    , "}"
    , ".lgi_cli_col_2 {"
    , "  left: 157px;"
    , "}"
    , "#lgi_cli.elo .lgi_cli_col_2 {"
    , "  left: 207px;" // 157 + 50
    , "}"
]);


//contentEval(function() {
// Remove any existing lgi_cli
$("#lgi_cli").remove();

// Add the new lgi_cli with our Elo column
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
$("#lgi_cli").on("beforeShow", function() {
  var $this = $(this)
    , $tip = $("#lgi_tip")
    , gt = $("#lgi_match_gametype span").text().trim().toLowerCase()
    , isSupported = gt in QLRD.GAMETYPES
    , showForAll = PREFS.get("showRatingForAllGametypes")
    , $scoreCols = $this.find(".lgi_cli_col_2")
    ;

  // Currently only showing Elo for supported gametypes
  // unless forced by the "showRatingForAllGametypes" preference.
  // TODO: the next line is causing #lgi_cli to hide for unsupported game modes... need to fix
  //$this.toggleClass("elo", isSupported || showForAll);
  $this.addClass("elo");

  if (!isSupported) {
    if (showForAll) {
      gt = "duel";
    }
    else {
      return;
    }
  }

  gt = QLRD.GAMETYPES[gt];

  // For every player...
  var sets = [];

  $this.find(".lgi_cli_col_1 span").each(function(i) {
    var name = $(this).text()
      , player = name.substring(name.lastIndexOf(" ") + 1)
      ;

    // Add the Elo cell
    $scoreCols.eq(i).before("<div class='lgi_cli_col_elo'>"
        + "<a id='lgi_cli_elo_" + player + "' href='http://www.qlranks.com/"
        + gt + "/player/" + player
        + "' target='_blank'>&hellip;</a></div>");

    // Request the Elo rating of the player
    var s = {"name": player, "targets": {}};
    s["targets"][gt] = "#lgi_cli_elo_" + player;
    sets.push(s);
  });

  // Send the request
  QLRD.set(sets);
});


/**
 * Override jQuery's show() so we can intercept interesting things before and after it runs
 * @param {String} the speed at which to show the element
 * @param {String} an optional callback for after the element in shown
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
    oldShow.apply($this, [aSpeed, newCallback]);
  });
}
//}); // end of call to contentEval


////////////////////////////////////////////////////////////////////////////////////////////////////
// PROFILE PAGE ELO BAR
////////////////////////////////////////////////////////////////////////////////////////////////////

// Set up the styling for the profile module's Elo rating div
addStyle([
      "#qlr_elo {"
    , "  margin: 0 auto 5px;"
    , "  background-color: #232323;"
    , "  color: #fff;"
    , "}"
    , "#qlr_elo div {"
    , "  display: inline-block;"
    , "  width: 100px;"
    , "  padding: 3px;"
    , "  text-align: center;"
    , "}"
    , "#qlr_elo div:first-child {"
    , "  width: 130px;"
    , "  border-right: 1px solid #fff;"
    , "}"
    , "#qlr_elo div:nth-child(odd) {"
    , "  background-color: #333;"
    , "}"
    , "#qlr_elo div a {"
    , "  display: inline-block;"
    , "  width: 100%;"
    , "  text-decoration: none;"
    , "}"
    , "#qlr_elo div span {"
    , "  font-style: italic;"
    , "  font-weight: bold;"
    , "}"
]);


/**
 * Override profile's ShowContent to show the Elo bar
 * @param {String} aCon The content passed to the module to display
 */
//contentEval(function() {
var oldShowContent = quakelive.mod_profile.ShowContent;
quakelive.mod_profile.ShowContent = function QLR_mod_profile_ShowContent(aCon) {
  // The name should be the third part of the path.
  var name = quakelive.pathParts[2] || "";

  // Prepend the Elo rating div so we don't get an annoying FoC.
  var con = "<div id='qlr_elo'>"
      + "<div><a href='http://www.qlranks.com/duel/player/" + name + "' target='_blank'>QLRanks.com Elo</a></div>"
      + "<div><a href='http://www.qlranks.com/duel/player/" + name + "' target='_blank'>Duel: <span id='qlr_elo_duel'>loading&hellip;</span></a></div>"
      + "<div><a href='http://www.qlranks.com/tdm/player/" + name + "' target='_blank'>TDM: <span id='qlr_elo_tdm'>loading&hellip;</span></a></div>"
      + "<div><a href='http://www.qlranks.com/ctf/player/" + name + "' target='_blank'>CTF: <span id='qlr_elo_ctf'>loading&hellip;</span></a></div>"
      + "<div><a href='http://www.qlranks.com/ca/player/" + name + "' target='_blank'>CA: <span id='qlr_elo_ca'>loading&hellip;</span></a></div>"
      + "<div><a href='http://www.qlranks.com/ffa/player/" + name + "' target='_blank'>FFA: <span id='qlr_elo_ffa'>loading&hellip;</span></a></div>"
      + "</div>"
      + aCon;

  // Show the modified profile page.
  oldShowContent.call(quakelive.mod_profile, con);

  // Fill in the value.
  QLRD.set({
      "name": name
    , "targets": {
          "duel": "#qlr_elo_duel"
        , "tdm": "#qlr_elo_tdm"
        , "ctf": "#qlr_elo_ctf"
        , "ca": "#qlr_elo_ca"
        , "ffa": "#qlr_elo_ffa"
      }
  });
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// CURRENT PLAYER ELO IN UPPER-RIGHT
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Show the signed-in player's Elo rating in the upper-right info section.
 * Set on an interval since the target isn't immediately available.
 */
var $st
  , $pcn
  , intStatusTop
  , tries = 200 // ~20 seconds
  ;

intStatusTop = setInterval(function() {
  $st = $("#qlv_statusTop");
  $pcn = $st.find("a.player_clan_name");

  if (--tries && !$pcn.length) {
    return;
  }

  clearInterval(intStatusTop);
  intStatusTop = null;

  // Styling
  addStyle([
      "#qlv_user_data_elo_gametype { cursor: pointer; border-bottom: 1px dotted; }"
    , "#qlv_user_data_elo_gametype_menu { display: none; }"
    , "#qlv_user_data_elo_gametype_menu span { cursor: pointer; margin-right: 10px; }"
    , "#qlv_user_data_elo_gametype_menu span.selected { border-bottom: 1px dotted; }"
  ]);

  // Inject...
  $pcn.before("<span id='qlv_user_data_elo_gametype' title='Click to change QLRanks.com Elo gametype'>" + PREFS.get("user_gt") + "</span>"
            + "<div id='qlv_user_data_elo_gametype_menu'>"
            + "<span>CA</span><span>CTF</span><span>Duel</span><span>FFA</span><span>TDM</span></div>: "
            + "<a id='qlv_user_data_elo' href='http://www.qlranks.com/" + PREFS.get("user_gt").toLowerCase() + "/player/"
            + quakelive.username + "' target='_blank'>&hellip;</a>"
            + "<div class='cl' style='margin-bottom: 5px'></div>");

  // ... and get the Elo rating
  var s = {"name": quakelive.username, "targets": {}};
  s["targets"][PREFS.get("user_gt")] = "#qlv_user_data_elo";
  QLRD.set(s);

  // Set up the toggle
  $("#qlv_user_data_elo_gametype").on("click", function() {
    $(this).hide();
    $("#qlv_user_data_elo_gametype_menu").css("display", "inline-block").show().focus();
  });

  $("#qlv_user_data_elo_gametype_menu").on("click", "span", function() {
    var $this = $(this)
      , new_gt = $this.text()
      ;

    // Hide the options
    $this.parent().hide();

    // Clear the selected class from siblings, and set on this
    $this.siblings("span.selected").removeClass("selected");
    $this.addClass("selected");

    // Update from the clicked gametype
    $("#qlv_user_data_elo_gametype").text(new_gt).show();

    // Do nothing more if the gametype didn't change
    if (new_gt == PREFS.get("user_gt")) {
      logMsg("ignoring identical 'user_gt': " + new_gt);
      return;
    }

    // Update the URL
    $("#qlv_user_data_elo").attr("href",
        "http://www.qlranks.com/" + new_gt.toLowerCase() + "/player/" + quakelive.username);

    // Show the appropriate Elo #
    var s = {"name": quakelive.username, "targets": {}};
    s["targets"][new_gt] = "#qlv_user_data_elo";
    QLRD.set(s);

    // Update the script's user_gt preference
    logMsg("change pref 'user_gt' from '" + PREFS.get("user_gt") + "' to '" + new_gt + "'");
    PREFS.set("user_gt", new_gt);
  })
  .find("span:contains('" + PREFS.get("user_gt") + "')").addClass("selected");
}, 100);
//}); // end of call to contentEval


////////////////////////////////////////////////////////////////////////////////////////////////////
// ELO IN POSTGAME MATCH STATS POPUP
////////////////////////////////////////////////////////////////////////////////////////////////////

// Set up styling for the versus frame's Elo rating links
addStyle([
      "#match_vscontainer_elo1, #match_vscontainer_elo2 {"
    , "  position: absolute;"
    , "  z-index: 11;"
    , "  top: 70px;"
    , "}"
    , "#match_vscontainer_elo1 {"
    , "  left: 32px;"
    , "}"
    , "#match_vscontainer_elo2 {"
    , "  right: 33px;"
    , "}"
    , "#match_vscontainer_elo1 a, #match_vscontainer_elo2 a {"
    , "  text-decoration: none;"
    , "}"
    , "#match_vscontainer_elo1 a:hover, #match_vscontainer_elo2 a:hover {"
    , "  text-decoration: underline;"
    , "}"
]);


/**
 * Override statstip's DisplayStatsTooltip and GetVersusFrame to fill in Elo data
 */
//contentEval(function() {
var oldGetVersusFrame = quakelive.statstip.GetVersusFrame;
quakelive.statstip.GetVersusFrame = function(gameType, player1, player2, team1, team2) {
  var $mvs = oldGetVersusFrame.call(quakelive.statstip, gameType, player1, player2, team1, team2)
    , gameType = gameType.toLowerCase()
    ;

  // For Duel...
  if ("duel" == gameType) {
    player1 = player1.PLAYER_NICK;
    player2 = player2.PLAYER_NICK;

    // Player 1 (left side)
    $mvs.find(".flagNum1")
        .after("<div id='match_vscontainer_elo1'>"
             + "<a href='http://www.qlranks.com/duel/player/" + player1
             + "' target='_blank'>&hellip;</a></div>")

    // Player 2 (right side)
    $mvs.find(".flagNum2")
        .before("<div id='match_vscontainer_elo2'>"
              + "<a href='http://www.qlranks.com/duel/player/" + player2
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
//}); // end of call to contentEval


////////////////////////////////////////////////////////////////////////////////////////////////////
// IN-GAME ELO
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Override OnCvarChanged to track our in-game commands
 */
//contentEval(function() {
var oldOnCvarChanged = OnCvarChanged;
OnCvarChanged = function(name, val, replicate) {
  switch (name) {
    case "_qlrd_announce":
      logMsg("cvar '" + name + "' changed to '" + val + "'");

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
      QLRD.igAnnounce("`Mafakka Updating current server info...", false);

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

          // Wait for all server players to be available in the QLRD cache.
          var names = $.map(server.players, function(p) {return {"name": p.name}});
          QLRD.waitFor(names, gt, function(error, players, gt) {
            // Always clear the active request flag.
            QLRD.activeServerReq = false;

            // Stop if something went wrong.
            if (error) {
              QLRD.igAnnounce("Unable to retrieve QLRanks.com data.", true);
              return;
            }

            // Sort players by Elo (descending).
            

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

            qz_instance.SendGameCommand(currentOut + " ^2[QLRD] " + gt.toUpperCase() + " results:;");
            for (var i = 0, out = [], len = players.length; i < len; ++i) {
              out.push("^5" + players[i].name + " ^7(^3" + players[i].elo + "^7)");

              // Group by 4, delaying commands as needed
              if ((i+1) % 4 == 0 || (i+1) == len) {
                setTimeout(function(txt, isLast) {
                  qz_instance.SendGameCommand(currentOut + " ^2[QLRD] " + txt + ";");
                  if (isLast) {
                    setTimeout(function() {
                      QLRD.igAnnounce("Done.", false);
                    }, step);
                  }
                }.bind(null, out.join("mm, "), (i+1) == len), mul++ * step);
                out = [];
              }
            }
          });
        },
        onError: function(aServer) {
          QLRD.igAnnounce("Unable to update current server info.", true);
          QLRD.activeServerReq = false;
        }
      });
      break;

    case "_qlrd_outputMethod":
      logMsg("cvar '" + name + "' changed to '" + val + "'");

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
//}); // end of call to contentEval


////////////////////////////////////////////////////////////////////////////////////////////////////
// ELO WHEN HOVERING OVER PLAYER NAME LINK
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Watch for hovering over profile links to show a QLRanks data title/tooltip
 */
//contentEval(function() {
  var RE_profile = /profile\/summary\/(\w+)/i;

  $("body").delegate("a", "mouseover", function() {
    if (this.qlndSkip) return;

    var res = RE_profile.exec(this.href) || RE_profile.exec(this.onclick)
      , self = this
      , txt
      ;

    if (!res) {
      self.qlndSkip = true;
      return;
    }

    res = res[1].toLowerCase();
    txt = self.textContent.toLowerCase();

    // Does the link text end with the player's name?
    if (-1 === txt.indexOf(res, txt.length - res.length)) {
      self.qlndSkip = true;
      return;
    }

    // "duel" is just filler
    QLRD.waitFor([{name: res}], "duel", function(aError) {
      if (aError) {
        self.title = "Unable to load QLRanks data for " + res;
      }
      else {
        // NOTE: FF 3.6 (QLPrism?) doesn't support \n in the title attr
        var p = QLRD.PLAYERS[res];
        self.title = "Duel: " + p.duel.elo + " (" + p.duel.rank + ") | "
                   + "TDM: " + p.tdm.elo + " (" + p.tdm.rank + ") | "
                   + "CTF: " + p.ctf.elo + " (" + p.ctf.rank + ") | "
                   + "CA: " + p.ca.elo + " (" + p.ca.rank + ") | "
                   + "FFA: " + p.ffa.elo + " (" + p.ffa.rank + ")";
        self.qlndSkip = true;
      }
    });
  });
//}); // end of call to contentEval
