// ==UserScript==
// @id             qlranksdisplay@phob.net
// @name           QLRanks.com Display with in-game announce
// @version        0.94
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
// @updateURL      https://userscripts.org/scripts/source/123012.meta.js
// ==/UserScript==

// Set up some stuff for user script updating
var SCRIPT_NAME = "QLRanks.com Display"
  , SCRIPT_VER  = "0.94";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

// Don't bother if Quake Live is down for maintenance
if (/offline/i.test(document.title)) {
  return;
}

// Make sure we're on top
if (window.self != window.top) {
  return;
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


contentEval(function() {
// NOTE: 'var' left off intentionally so other sections can hit it.
  QLRD = {
    // Keep a content-side copy of Elo ratings
    ELO: [],

    // Keep a content-side copy of preferences
    PREFS: [],

    // Format of a QLRD message
    RE_qlrdMessage: /^QLRD:((pref|elo|ingame)Response:|prefChange)/,


    /**
     * Complete an Elo request from cache, or post a request to have it completed
     * @param {Object} aMsg a message object containing {type,name,target}
     * @emits {String} aMsg2 a JSON representation of aMsg
     * NOTE: 'var' left off intentionally so other sections can hit it.
     */
    set: function(aMsg) {
      if (aMsg.name in QLRD.ELO) {
        $(aMsg.target).html(QLRD.ELO[aMsg.name]);
      } else {
        window.postMessage(JSON.stringify(aMsg), "*");
      }
    },


    /**
     * Content-side QLRD message listener
     * @param {Object} aEvent The message event.  Has data, origin, etc.
     * .data should have {type,name,value,target}
     */
    handleMessage: function(aEvent) {
      var response;
      try {
        response = JSON.parse(aEvent.data);
      } catch(e) {return;}

      // Is this our message?
      var respType = QLRD.RE_qlrdMessage.exec(response.type);
      if (null == respType) {
        return;
      }

      // Make sure we have everything
      if (!("name" in response && "value" in response)) {
        return;
      }

      // 'prefChange' type... update our content-side prefs
      if ("prefChange" == respType[1]) {
        QLRD.PREFS[response.name] = response.value;
        return;
      }

      // 'Response' type
      switch (respType[2]) {
        case "elo":
          if (!(response.target && response.value)) {
            return;
          }
          // Update the local cache and target with our content.
          QLRD.ELO[response.name] = response.value;
          $(response.target).html(response.value);
          break;
        case "pref":
          // TODO: consume the pref response?
          break;
        case "ingame":
          window.qlr_Callback(response.name, response.value);
          break;
      }
    }
  };
  window.addEventListener("message", QLRD.handleMessage, false);
}); // end of call to contentEval


// Preferences helper
// TODO: simplify this?  Caching in content now...
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
[{"name":"showRatingForAllGametypes","def":false}].forEach(function(aPref) {
  PREFS.set(aPref.name, GM_getValue(aPref.name, aPref.def));
  logMsg("loaded pref '" + aPref.name + "' => '" + PREFS.get(aPref.name) + "'");
});

/**
 * Handle pref requests and emit a response
 * @param {Object} aEvent The message event.  Has data, origin, etc.
 * @emits {String} aMessage A {type,name,value} response
 * .data should have {type,name,default (if getting),value (if setting)}
 */
function handlePrefRequest(aEvent) {
  var request;
  try {
    request = JSON.parse(aEvent.data);
  } catch(e) {return;}

  // Make sure we have a message type and pref name
  if (!(request.type && request.name)) {
    return;
  }

  var response = {
    "type": "QLRD:prefResponse:",
    "name": request.name,
    "value": null
  };

  // TODO: ditch the "QLRD:prefRequest:" here
  switch(request.type) {
    case "QLRD:prefRequest:get":
      response.type += "get";
      response.value = PREFS.get(request.name, request.default);
    break;
    case "QLRD:prefRequest:set":
      response.type += "set";
      response.value = PREFS.set(request.name, request.value);
      break;
    case "QLRD:prefRequest:toggle":
      response.type += "toggle";
      response.value = PREFS.toggle(request.name);
      break;
    default:
      return;
  }
  window.postMessage(JSON.stringify(response), "*");
}
window.addEventListener("message", handlePrefRequest, false);


// Cache Elo rating values to reduce requests to QLRanks.com
// TODO: Remove/simplify this?  Caching in content now due to msg latency...
var eloCache = {
  _cache: [],

  /**
   * Try to retrieve a value from the cache.
   * If it doesn't exist, try to fetch it from QLRanks.com
   * @param {String} aName the player's name
   * @param {Function} aCallback a function which will consume the return value
   */
  get: function(aName, aCallback) {
    var self = this
      , aCallback = ("function" == typeof(aCallback)) ? aCallback : DOLITTLE
      , name = (aName || "").trim();

    // Make sure we have a valid name
    if (!name) {
      logError("unable to find/use the profile name '" + name + "'");
      return aCallback("error (see console)");
    }

    // Return the value if it has already been retrieved
    if (name in this._cache) {
      logMsg("found cached value '" + name + "' => '" + this._cache[name] + "'");
      return aCallback(this._cache[name]);
    }

    // Request the info from QLRanks.com if we don't have it yet
    logMsg("requesting info for: '" + name + "'");
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://qlranks.com/gmapi.aspx?name=" + name,
      headers: {
        "User-Agent": "monkeyagent",
        "Accept": "text/monkey,text/xml"
      },
      onerror: function() {
        logError("the request failed\n" + details.responseText);
        aCallback("error (see console)");
      },
      onload: function(details) {
        logMsg("got response for '" + name + "': " + details.responseText);
        var tmp = document.createElement("div")
          , elo;
        tmp.innerHTML = details.responseText;
        elo = parseInt(tmp.textContent.trim());
        if (elo) {
          self.set(name, elo);
        } else {
          logError("unable to parse the response from QLRanks.com");
          elo = "error (see console)";
        }
        aCallback(elo);
      }
    });
  },

  /**
   * Set a value in the cache.
   * @param {String} aName the player's name
   * @param {String} aValue an Elo value
   */
  set: function(aName, aValue) {
    this._cache[aName] = aValue;
    logMsg("caching '" + aName + "' => '" + aValue + "'");
  },

  /**
   * Clear the Elo cache, forcing fresh data from QLRanks.com
   */
  reset: function() {
    this._cache = [];
    contentEval(function() {
      QLRD.ELO = [];
    });
    logMsg("Elo data cache cleared");
  }
};


/**
 * Handle Elo requests and emit a response
 * @param {Object} aEvent The message event.  Has data, origin, etc.
 * @emits {String} aMessage A {type,name,value,target} response
 * .data should have {type,name,target}
 */
function handleEloRequest(aEvent) {
  var request;
  try {
    request = JSON.parse(aEvent.data);
  } catch(e) {return;}

  // Make sure we have a message type and player name
  if (!(request.type && request.name)) {
    return;
  }

  var response = {
    "type": "QLRD:eloResponse:",
    "name": request.name,
    "value": null,
    "target": request.target
  };

  // Currently only handling 'get' requests
  switch(request.type) {
    case "QLRD:eloRequest:get":
      response.type += "get";
      eloCache.get(request.name, function(aVal) {
        response.value = aVal;
        window.postMessage(JSON.stringify(response), "*");
      });
      break;
    case "QLRD:eloRequest:getCallback":
      response.type += "get";
      eloCache.get(request.name, function(aVal) {
        response.value = aVal;
        response.type = "QLRD:ingameResponse:";
        window.postMessage(JSON.stringify(response), "*");
      });
      break;
    default:
      return;
  }
}
window.addEventListener("message", handleEloRequest, false);


// If we have GM_registerMenuCommand, create our commands
if (!(window.chrome || "undefined" == typeof(GM_registerMenuCommand))) {
  GM_registerMenuCommand(SCRIPT_NAME + ": Clear the Elo data cache", function() {
    eloCache.reset();
  });

  GM_registerMenuCommand(SCRIPT_NAME + ": Toggle duel Elo rating on non-duel scoreboards",
    function() {
      PREFS.toggle("showRatingForAllGametypes");
      logMsg("'Toggle duel Elo rating on non-duel scoreboards' is now "
        + (PREFS.get("showRatingForAllGametypes") ? "enabled" : "disabled"));
    });
} else {
  GM_registerMenuCommand = DOLITTLE;
}


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
   * Called before #lgi_cli (the player list) is displayed
   * @emits {String} aMessage A {type,name,target} Elo request
   */
  function lgiCli_beforeShow() {
    var $this = $("#lgi_cli")
      , isDuel = "Duel" == $("#lgi_match_gametype span").text().trim()
      , showForAll = QLRD.PREFS["showRatingForAllGametypes"]
      , $scoreCols = $this.find(".lgi_cli_col_2");

    // Currently only showing Elo for the Duel gametype
    // unless forced by the "showRatingForAllGametypes" preference.
    $this.toggleClass("elo", isDuel || showForAll);
    if (!(isDuel || showForAll)) {
      return;
    }

    // For every player...
    // TODO: use a single request to QLRanks.com when it is supported
    $this.find(".lgi_cli_col_1 span").each(function(i) {
      var name = $(this).text()
        , player = name.substring(name.lastIndexOf(" ") + 1);

      // Add the Elo cell
      $scoreCols.eq(i).before("<div class='lgi_cli_col_elo'>"
        + "<a id='lgi_cli_elo_" + player
        + "' href='http://qlranks.com/duel/player/" + player
        + "' target='_blank'>&hellip;</a></div>");

      // Request the Elo rating of the player
      QLRD.set({
        "type": "QLRD:eloRequest:get",
        "name": player,
        "target": "#lgi_cli_elo_" + player
      });
    });
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
    + "  padding: 3px;"
    + "  background-color: #232323;"
    + "  color: #fff"
    + "}"
    + "#qlr_elo p {"
    + "  text-align: center"
    + "}"
    + "#qlr_elo p a {"
    + "  text-decoration: none;"
    + "}"
    + "#qlr_elo p span {"
    + "  font-style: italic;"
    + "  font-weight: bold"
    + "}"
);


/**
 * Override profile's ShowContent to do our magic
 * @param {String} aCon The content passed to the module to display
 */
contentEval(function() {
  var oldShowContent = quakelive.mod_profile.ShowContent;
  quakelive.mod_profile.ShowContent = function QLR_mod_profile_ShowContent(aCon) {
    // The name should be the third part of the path.
    var name = quakelive.pathParts[2] || "";

    // Prepend the Elo rating div so we don't get an annoying FoC.
    var con = "<div id='qlr_elo'><p>"
      + "<a href='http://qlranks.com/duel/player/" + name + "' target='_blank'>"
      + "QLRanks.com Elo Rating: <span>loading&hellip;</span></a></p></div>"
      + aCon;

    // Show the modified profile page.
    oldShowContent.call(quakelive.mod_profile, con);

    // Fill in the value.
    QLRD.set({
      "type": "QLRD:eloRequest:get",
      "name": name,
      "target": "#qlr_elo span:first"
    });
  }


  /**
   * Show the signed-in player's Elo rating in the upper-right info section.
   * Set on an interval since the target isn't immediately available.
   */
  var $pcn
    , player
    , intStatusTop
    , tries = 200; // 20 seconds

  intStatusTop = setInterval(function() {
    $pcn = $("#qlv_statusTop a.player_clan_name");
    if (--tries && !$pcn.length) {
      return;
    }
    clearInterval(intStatusTop);
    intStatusTop = null;

    // Get the player's name
    player = $("#qlv_user_data div.WelcomeText").text().trim();
    player = player.substring(player.lastIndexOf(" ") + 1);

    // Inject...
    $pcn.before("<a href='http://qlranks.com/duel/player/" + player
      + "' target='_blank'>Elo: <span id='qlv_user_data_elo'>&hellip;"
      + "</span></a><div class='cl'></div>");

    // ... and get the Elo rating
    QLRD.set({
      "type": "QLRD:eloRequest:get",
      "name": player,
      "target": "#qlv_user_data_elo"
    });
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
 * Override statstip's GetVersusFrame to do our magic
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
        QLRD.set({
          "type": "QLRD:eloRequest:get",
          "name": player1,
          "target": "#match_vscontainer_elo1 a"
        });
        QLRD.set({
          "type": "QLRD:eloRequest:get",
          "name": player2,
          "target": "#match_vscontainer_elo2 a"
        });
      }, 0);
    }

    // Return the modified content to be appended
    return $mvs;
  }
}); // end of call to contentEval

contentEval(function() {
// players list
  window.qlr_players = [];
  window.qlr_announce = "print ";

// display qlranks
  window.qlr_Done = function () {
    if("undefined" != typeof(window.qlr_timeoutCmd)) {
      window.clearTimeout(window.qlr_timeoutCmd);
    }
    window.qlr_elo_finished = 0;
    window.qlr_request = 0;
    if(window.qlr_players.length < 1) {
      qz_instance.SendGameCommand("print no players found.;");
      return;
    }
    var players = [];
    // step for "say" and "say_team" commands should be more than half a second
    var step = (window.qlr_announce.indexOf("say") < 0)?100:700;
    var mul = 1;
    window.qlr_players.sort(function(a, b) {return b.elo - a.elo});
    //console.debug(window.qlr_players);
    qz_instance.SendGameCommand(window.qlr_announce + "^2qlranks.com in-game elo announcer ^7(highest to lowest):;");
    // automatically display chat for 10 seconds
    qz_instance.SendGameCommand("+chat;");
    window.qlr_timeoutCmd = window.setTimeout(function() {qz_instance.SendGameCommand("-chat;")}, 10000);

    for(var j = 0; j < window.qlr_players.length; j++) {
      var player = window.qlr_players[j];
      players.push("^7" + player.name + " (^3" + player.elo + "^7)");
      // group by 5 names in one line
      if ((j + 1) % 5 == 0) {
        (function (text) {
          window.setTimeout(function() {
            qz_instance.SendGameCommand(window.qlr_announce + text + ";");
          }, mul*step);})
          (players.join(", "));
        players = [];
        mul++;
      }
    }
    if(players.length > 0) {
      (function (text) {
        window.setTimeout(function() {
          qz_instance.SendGameCommand(window.qlr_announce + text + ";");
        }, mul*step);})
        (players.join(", "));
    }
  }

// go through returned elo values
  window.qlr_Callback = function (name, elo) {
    window.qlr_players.push({"name": name, "elo": elo});
    //console.debug("elo_request " + window.qlr_elo_finished + "/" + window.qlr_elo_total);
    // all values are retrieved, time to announce
    if (++window.qlr_elo_finished >= window.qlr_elo_total) {
      window.qlr_Done();
    }
  }

// ugly hack for print command
  var oldcvarsSet = quakelive.cvars.Set;
  quakelive.cvars.Set = function() {
    var dontsave = ["print", "say_team", "say"];
    if($.inArray(arguments[0].toLowerCase(), dontsave) < 0) {
      return oldcvarsSet.apply(this, arguments);
    }
  }
}); // end of call to contentEval

/**
 * Override OnCvarChanged
 */
contentEval(function() {
  window.qlr_request = 0;
  var oldOnCvarChanged = window.OnCvarChanged;
  window.OnCvarChanged = function qlr_OnCvarChanged(cvarName, cvarValue, replicate) {
    if(cvarName == "cl_qlr_request") {
      if(window.qlr_request == 0 && cvarValue == 1 && qz_instance.IsGameRunning()) {
        quakelive.serverManager.RefreshServerDetails(quakelive.currentServerId,
          {
            onSuccess: function () {
              var server = quakelive.serverManager.GetServerInfo(quakelive.currentServerId);
              //console.debug(server, server.map, server.players);
              qz_instance.SendGameCommand("print sending request to qlranks...;");
              window.qlr_elo_total = server.players.length;
              window.qlr_elo_finished = 0;
              window.qlr_players = [];
              //console.debug(server.players);
              for(var j = 0; j < server.players.length; j++) {
                var player = server.players[j];
                //console.debug(player.name);
                window.postMessage(JSON.stringify({
                  "type": "QLRD:eloRequest:getCallback",
                  "name": player.name
                }), "*");
              }
              //window.qlr_timeoutCmd = window.setTimeout(window.qlr_Done(), 15000);
            },
            onError: function () {
            },
            port: "joinserver"
          }
        );
      }
      window.qlr_request = cvarValue;
    } else if(cvarName == "cl_qlr_announce") {
      // we need one space after the command
      window.qlr_announce = cvarValue + ((cvarValue.charAt(cvarValue.length - 1) != " ")?" ":"");
    }
    oldOnCvarChanged.call(cvarName, cvarValue, replicate);
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
  var AutoUpdater_123012={id:123012,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_123012.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_123012.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_123012",new Date().getTime()+"");AutoUpdater_123012.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_123012","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_123012","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_123012",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_123012",0)+1000*60*60*24*this.days)){GM_setValue("updated_123012",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_123012",new Date().getTime()+"");AutoUpdater_123012.call(true,true)})}}};AutoUpdater_123012.check();
}