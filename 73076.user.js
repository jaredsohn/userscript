// ==UserScript==
// @id           qlnab@phob.net
// @name         Quake Live New Alt Browser
// @version      1.82
// @namespace    http://userscripts.org/scripts/show/73076
// @homepage     http://userscripts.org/scripts/show/73076
// @description  A new redesign of the Quake Live server browser.
// @icon         https://phob.net/ql_new_alt_browser/thumb.png
// @screenshot   https://phob.net/ql_new_alt_browser/large.png https://phob.net/ql_new_alt_browser/thumb.png
// @author       wn
// @include      http://*.quakelive.com/*
// @exclude      http://*.quakelive.com/forum*
// @run-at       document-end
// @updateURL    https://userscripts.org/scripts/source/73076.meta.js
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
    _prefix: "qlnab_"

  , _defaults: [
        {name: "ql_alt_gametypeIcon", def: false}
      , {name: "ql_alt_bestPickHighlight", def: false}
      , {name: "ql_alt_browser_sort", def: "[[6,1]]"}
      , {name: "ql_alt_filters_exclude", def: ""}
      , {name: "ql_alt_filters_include", def: ""}
      , {name: "ql_alt_parameters", def: ""}
      , {name: "ql_alt_demo", def: ""}
    ]

  , _prefs: {}
  , _handlers: {}

    /**
     * Initialize preferences
     */
  , init: function() {
      PREFS._defaults.forEach(function(aPref) {
        PREFS.set(aPref.name, localStorage[PREFS._prefix + aPref.name] || aPref.def);
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
      return (aName in PREFS._prefs ? PREFS._prefs[aName] : aDefault);
    }

    /**
     * Sets the local and stored value of a preference
     * @param {String} the preference name
     * @param {Boolean|Number|String} a value
     * @return {Boolean|Number|String} the value passed as aVal
     */
  , set: function(aName, aVal) {
      PREFS._prefs[aName] = aVal;
      localStorage[PREFS._prefix + aName] = aVal;
      PREFS.trigger(aName);
      return aVal;
    }

    /**
     * Toggle a preference value
     * @param {String} the preference name
     * @return {Boolean} the "toggled" value of aName
     */
  , toggle: function(aName) {
      return PREFS.set(aName, !PREFS.get(aName));
    }

    // Trigger pref handler (or handlers) with the current pref value
  , trigger: function(aPrefName) {
    if (aPrefName in PREFS._prefs && aPrefName in PREFS._handlers) {
      for (var i = 0, e = PREFS._handlers[aPrefName].length; i < e; ++i) {
        PREFS._handlers[aPrefName][i].call(null, PREFS._prefs[aPrefName]);
      }
    }
  }

  , addHandler: function(aPrefName, aHandler) {
    if (!(aPrefName in PREFS._handlers)) {
      PREFS._handlers[aPrefName] = [];
    }
    PREFS._handlers[aPrefName].push(aHandler);
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// HANDLERS FOR WHEN PREFS CHANGE
////////////////////////////////////////////////////////////////////////////////////////////////////

// Toggle gametype icon display
PREFS.addHandler("ql_alt_gametypeIcon", function(newVal) {
  // show gametype image rather than text
  if (newVal) {
    $("#qlv_postlogin_matches tbody span.agameicon").each(function() {
      $(this).replaceWith("<img class='agameicon' src='" + $(this).attr("src")
                        + "' title='" + $(this).text() + "' />");
    });
  }
  // show gametype text rather than image
  else {
    $("#qlv_postlogin_matches tbody img.agameicon").each(function() {
      $(this).replaceWith("<span class='agameicon' src='"
                        + $(this).attr("src") + "'>"
                        + $(this).attr("title") + "</span>");
    });
  }
});

// Toggle best pick highlighting
PREFS.addHandler("ql_alt_bestPickHighlight", function(newVal) {
  $("#qlv_postlogin_matches tbody tr.bestpick").toggleClass("noHighlight", "true" != newVal);
});
//}); // end of call to contentEval


////////////////////////////////////////////////////////////////////////////////////////////////////
// INITIALIZE PREFS (TRIGGERING HANDLERS)
////////////////////////////////////////////////////////////////////////////////////////////////////
PREFS.init();


////////////////////////////////////////////////////////////////////////////////////////////////////
// MENU COMMANDS
////////////////////////////////////////////////////////////////////////////////////////////////////

GM_registerMenuCommand("Quake Live New Alt Browser: toggle gametype icon", function() {
  PREFS.set("ql_alt_gametypeIcon", !PREFS.get("ql_alt_gametypeIcon", true));
});

GM_registerMenuCommand("Quake Live New Alt Browser: toggle recommended server highlighting", function() {
  PREFS.set("ql_alt_bestPickHighlight", !PREFS.get("ql_alt_bestPickHighlight", false));
});


////////////////////////////////////////////////////////////////////////////////////////////////////
// MAIN STYLES
////////////////////////////////////////////////////////////////////////////////////////////////////

addStyle([
    ".postlogin_nav ul li { font-weight:bold; }"
  , "#ql_alt_filters_include, #ql_alt_filters_exclude { width: 90%; border:1px solid black; margin-top:1em; }"
  , "#ql_alt_filters_exclude { margin-bottom: 1em; }"
  , "#qlv_postlogin_matches p { background: transparent; }"
    // width: 1280+ = 100%, 1152-1279 = 94%, 1024-1151 = 85%, < 1024 = 52%
  , "#ql_alt_browser { width: " + (screen.width < 1280 ? screen.width < 1024 ? "52%" : screen.width < 1152 ? "85%" : "94%" : "100%") + "; color: black; background-color: rgba(255, 255, 255, 0.4); }"
  , "#ql_alt_browser thead tr { background: black }"
  , "#ql_alt_browser thead th { padding: 6px 0; cursor: pointer; color: white; font-weight: bold; text-shadow: 1px 1px 5px #666; filter: dropshadow(color=#666, offx=1, offy=1); }"
  , "#ql_alt_browser thead th.headerSortUp, .bestpick, .filter_enabled { text-shadow: 1px 1px 5px #f00; filter: dropshadow(color=#f00, offx=1, offy=1); }"
  , "#ql_alt_browser thead th.headerSortDown { text-shadow: 1px 1px 5px #fb4; filter: dropshadow(color=#fb4, offx=1, offy=1); }"
  , "#ql_alt_browser tbody td { padding: 3px 0; }"
  , ".noHighlight { text-shadow: none; filter: none; }"
  , ".alocation_flag { width: 16px; height: 11px }"
  , ".agameicon { padding: 1px 0 }"
  , ".agameicon span { display: none; }"
  , ".agameicon + .agamemods { position: static; display: none; height: 16px; }"
  , "span.agameicon + .agamemods { height: auto; position: relative; bottom: -1px; }"
  , ".alocation_text, .aping, .agameicon, .amapname, .agamelabel, .aplayers { cursor: default; }"
  , ".agamerank { float: left; height: 18px; width: 18px; }"
  , ".aplayers { padding-left: 4px; }"
  , ".header, .headerSortUp, .headerSortDown { background: transparent; font-size: 100%; }"
  , ".normalZebraOff,.blueZebraOff,.redZebraOff,.normalZebraOn,.blueZebraOn,.redZebraOn,.teamZebraOff,.teamZebraOn { background-image: none; }"
  , ".odd, .normalZebraOn { background-color: rgba(204, 204, 204, 0.35); }"
  , ".odd:hover, .normalZebraOn:hover { background-color: rgba(219, 219, 219, 1); }"
  , ".even, .normalZebraOff { background-color: rgba(255, 255, 255, 0.35); }"
  , ".even:hover, .normalZebraOff:hover { background-color: rgba(235, 235, 235, 1); }"
  , ".link { cursor: pointer; }"
  , ".link.share_link_img { float: left; margin-top: 3px; margin-left: 4px; }"
  , ".cond { letter-spacing: -1px; }"
  , ".bold { font-weight: 600; }"
]);


////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE SORTING AND PERSISTENCE
////////////////////////////////////////////////////////////////////////////////////////////////////

// Player sorting (e.g. 7/8)
$.tablesorter.addParser({
  id: "players",
  is: function(s) {
    return false;
  },
  format: function(s) {
    var sp = s.split("/");
    return parseFloat(sp[0] + "." + (sp[1] << 2));
  },
  type: "numeric"
});
$.tablesorter.addParser({
  id: "rank",
  is: function(s) {
    return false;
  },
  format: function(s) {
    s = s.substr(s.indexOf("rank_") + 5, 1);
    return (s == "p" ? -9 : s);
  },
  type: "numeric"
});

// Sort persistence
$.tablesorter.addWidget({
  id: "sortPersist",
  format: function(table) {
    if (table.config.debug) {
      var time = new Date();
    }
    var key = "ql_alt_browser_sort";
    var val = PREFS.get(key);

    var data = {};
    var sortList = table.config.sortList;
    var tableId = $(table).attr("id");
    var valExists = (typeof(val) != "undefined" && val != null);
    if (sortList.length > 0) {
      if (valExists) {
        data = JSON.parse(val);
      }
      data[tableId] = sortList;
      PREFS.set(key, JSON.stringify(data));
    }
    else {
      if (valExists) {
        var data = JSON.parse(val);
        if (typeof(data[tableId]) != "undefined" && data[tableId] != null) {
          sortList = data[tableId];
          if (sortList.length > 0) {
            $(table).trigger("sorton", [sortList]);
          }
        }
      }
    }
    if (table.config.debug) {
      $.tablesorter.benchmark("Applying sortPersist widget", time);
    }
  }
});
//}); // end of call to contentEval


////////////////////////////////////////////////////////////////////////////////////////////////////
// CUSTOM SERVER LIST VIEW
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Set up the prototype for a server manager listener
 */
//contentEval(function() {
function qlnabServerManagerListener() {
  qlnabServerManagerListener.prototype.OnRefreshServersSuccess = function() {};
  qlnabServerManagerListener.prototype.OnRefreshServersError = function() {};
  qlnabServerManagerListener.prototype.OnStartRefreshServers = function() {};
  qlnabServerManagerListener.prototype.OnSaveFilterSuccess = function() {};
  qlnabServerManagerListener.prototype.OnSaveFilterError = function() {};
}


/**
 * Set up the prototype for the server list view
 */
var cols = 6;
var o = {
  target: "ql_alt_browser tbody",
  max: 0,
  group_cache_size: 6
}

function qlnabServerListView() {}
qlnabServerListView.prototype = new qlnabServerManagerListener;

qlnabServerListView.prototype.SetDisplayProps = function(d) {
  this.props = $.extend({}, o, d);
}

qlnabServerListView.prototype.GetContainerNodeId = function() {
  return this.props.target;
}

qlnabServerListView.prototype.GetServerNodeId = function(d) {
  return "match_" + d.public_id;
}

qlnabServerListView.prototype.UpdateServerNode = function(server, $row) {
  var gametype = mapdb.getGameTypeByID(server.game_type);
  var gtTitle = gametype.name.toUpperCase() + " - " + gametype.title;
  var gameLabel = " (" + (server.premium ? "Premium " : "") + server.host_name + ")";
  var rank = GetSkillRankInfo(server.skillDelta);
  var max_players = server.teamsize > 0 ? server.teamsize * (gametype.name == "ffa" ? 1 : 2) : server.max_clients;
  var players = server.num_clients + "/" + max_players;

  var map = mapdb.getBySysName(server.map.toLowerCase());
  map = map ? map.name : "Unknown";

  var locName, locObj, flagURL;
  if (locObj = locdb.GetByID(server.location_id)) {
    // From /user/load locations
    // TODO: update this... the values below are very old.
    locName = locObj.GetCityState() + (InArray(server.location_id, [14,27,29,32,37,43]) ?
        " #1" : InArray(server.location_id, [30,33,34,36,39,42,44]) ?
        " #2" : InArray(server.location_id, [51]) ?
        " #3" : "");
    flagURL = locObj.GetFlagIcon();
  }
  else {
    locName = "QUAKE LIVE";
    flagURL = "/images/flags3cc/usa.gif";
  }

  if ($row.find(".qlv_inner_line").length == 0) {
    $row.html("<td class='qlv_inner_line'><img class='alocation_flag' src='' /></td>" +
           "<td align='left' class='alocation_text'></td>" +
           "<td align='left' class='aping'></td>" +
           "<td align='left'><img src='' class='agameicon' /><div class='agamemods'></div></td>" +
           "<td align='left'><span class='amapname bold'></span><span class='agamelabel cond'></span></td>" +
           "<td align='left'><img src='' class='agamerank' /> <a href='" + quakelive.siteConfig.baseUrl + "/r/join/" + server.public_id + "' onclick='qlPrompt({title: \"Server Link\", body: \"Link to this game\", input: true, inputLabel: $(this).attr(\"href\"), inputReadOnly: true, alert: true}); return false;' class='link share_link_img' title='Link to this game'></a></td>" +
           "<td align='left' class='aplayers'></td>");
  }

  $row.find(".alocation_flag").attr({"src": quakelive.resource(flagURL), "title": locObj.country || "United States"});
  $row.find(".alocation_text").text(locName);

  $row.find(".aping").text(server.GetPing());

  $row.find(".agameicon").attr({"src": quakelive.resource("/images/gametypes/xsm/" + gametype.name + ".png"), "title": gtTitle});
  var mods = []
    , useMods = server.owner && (server.ruleset != 1 || server.g_customSettings != 0);
  if (useMods) {
    mods = server.GetModifiedSettings();
    $row.find(".agamemods")
        .html("<div class='modified_icon'></div>")
        .css("display", "inline-block")
        .find(".modified_icon")
        .data("mods", mods)
        .hover(function(e) {
          var $tip = $("#agamemods_tip");
          if (0 == $tip.length) {
            $("body").append("<div id='agamemods_tip'></div>");
            $tip = $("#agamemods_tip");
            $tip.css({
              position: "absolute",
              width: "auto",
              background: "rgba(235, 235, 235, 1)",
              "background-position": "-7px",
              color: "#000",
              border: "1px solid #000",
              padding: "10px",
              "z-index": 999
            })
            .mouseleave(function() { $(this).hide(); });
          }
          $tip.css({
            left: (e.pageX - 0) + "px",
            top:  (e.pageY + 10) + "px",
          })
          .html("<b>Server Modifications:</b><br />" + $(this).data("mods").join("<br />"))
          .show();
        }, function() {
          $("#agamemods_tip").hide();
        });
  }
  else {
    $row.find(".agamemods").hide();
  }

  $row.find(".amapname").text(map);
  $row.find(".agamelabel").html(gameLabel);
  $row.find(".agamerank").attr({"src": quakelive.resource((server.g_needpass ? "/images/lgi/server_details_ranked.png" : "/images/sf/login/rank_" + rank.delta + ".png")), "title": rank.desc.replace(/(<([^>]+)>)/ig, '')});
  $row.find(".aplayers").text(players).attr("title", server.max_clients + " slots");
  server.ordinal < 3 ? $row.addClass("bestpick") : $row.removeClass("bestpick");

  var ql_alt_filters_exclude = PREFS.get("ql_alt_filters_exclude"),
      ql_alt_filters_include = PREFS.get("ql_alt_filters_include"),
      show_entry = true,
      hide_entry = false,
      RE_comma = /\s*,\s*/,
      RE_plus = /\s*\+\s*/,
      RE_escapeMe = /([\^\$\\\/\(\)\|\?\+\*\[\]\{\}\,\.])/g,
      modsFilter = mods.slice(0),
      freg;

  // Add mod keywords "mods" and "modifications"
  modsFilter.push("mods");
  modsFilter.push("modifications");
  modsFilter = modsFilter.join("\t");

  // Include filtering
  if (ql_alt_filters_include) {
    ql_alt_filters_include = ql_alt_filters_include.split(RE_comma);
    if (ql_alt_filters_include[0]) {
      // Assume we will hide the entry
      show_entry = false;

      // Split each filter value on +'s to get subfilters
      var subfilters = [];
      for (var i = 0, j = ql_alt_filters_include.length; i < j; ++i) {
        if (0 == ql_alt_filters_include[i].length) {
          continue;
        }
        subfilters.push(ql_alt_filters_include[i].split(RE_plus));
      }

      // Check each subfilter...
      for (var i = 0, j = subfilters.length; i < j; ++i) {
        var submatch = true;
        // Check this subfilter's components...
        for (var x = 0, y = subfilters[i].length; x < y; ++x) {
          if (0 == subfilters[i][x].length) {
            continue;
          }
          freg = new RegExp(subfilters[i][x].replace(RE_escapeMe, "\\$1"), "i");
          // If nothing matches, this is not part of an acceptable subfilter.
          if (!(("qlnab.open" == subfilters[i][x] && server.num_players < max_players)
              || players.substr(players.indexOf("/")) == subfilters[i][x]
              || locName.match(freg)
              || gtTitle.match(freg)
              || (useMods && modsFilter.match(freg))
              || gameLabel.match(freg)
              || ((server.map.match(freg) || map.match(freg)) && server.num_clients !== 0)
          )) {
            submatch = false;
            break;
          }
        }
        // Show entry if this subfilter was completely matched.
        show_entry = show_entry || submatch;
      }
    }
  }

  // Exclude filtering
  if (ql_alt_filters_exclude) {
    ql_alt_filters_exclude = ql_alt_filters_exclude.split(RE_comma);
    if (ql_alt_filters_exclude[0]) {
      // Assume we will not hide the entry
      hide_entry = false;

      // Split each filter value on +'s to get subfilters
      var subfilters = [];
      for (var i = 0, j = ql_alt_filters_exclude.length; i < j; ++i) {
        if (0 == ql_alt_filters_exclude[i].length) {
          continue;
        }
        subfilters.push(ql_alt_filters_exclude[i].split(RE_plus));
      }

      // Check each subfilter...
      for (var i = 0, j = subfilters.length; i < j; ++i) {
        var submatch = true;
        // Check this subfilter's components...
        for (var x = 0, y = subfilters[i].length; x < y; ++x) {
          if (0 == subfilters[i][x].length) {
            continue;
          }
          freg = new RegExp(subfilters[i][x].replace(RE_escapeMe, "\\$1"), "i");
          // If nothing matches, this is not part of an acceptable subfilter.
          if (!(("qlnab.open" == subfilters[i][x] && server.num_players < max_players)
              || players.substr(players.indexOf("/")) == subfilters[i][x]
              || locName.match(freg)
              || gtTitle.match(freg)
              || (useMods && modsFilter.match(freg))
              || gameLabel.match(freg)
              || ((server.map.match(freg) || map.match(freg)) && server.num_clients !== 0)
          )) {
            submatch = false;
            break;
          }
        }
        // Hide entry if one of the subfilters matched.
        if (submatch) {
          hide_entry = true;
          break;
        }
      }
    }
  }

  $row.css("display", show_entry && !hide_entry ? "table-row" : "none");

  return $row;
};

qlnabServerListView.prototype.OnRefreshServersSuccess = function(d) {
  quakelive.SendModuleMessage("OnServerListReload", d);
  this.DisplayServerList(d);
  this.SortServerList(d);
  $("#agamemods_tip").remove();
}

qlnabServerListView.prototype.OnRefreshServersError = function() {
  var d = $("#" + this.GetContainerNodeId()).empty();
  d.append("<tr><td colspan='" + cols + "'><p class='tc TwentyPxTxt midGrayTxt' style='width: 70%; margin: 20% auto; color: #f00'>We've encountered an error loading the list of games. Please wait and we will try to reload the list.</p></td></tr>");
}

qlnabServerListView.prototype.OnBeforeDisplayServerList = function(d, e) {
  e.length > 0 && $("#qlv_welcome .welcome_matches_header").css("visibility", "visible");
}

qlnabServerListView.prototype.OnAfterDisplayServerList = function(d, e) {
  var $tbody = $("#ql_alt_browser tbody");
  if (e.length == 0) {
    d.append("<tr><td colspan='" + cols + "'><p class='tc thirtyPxTxt midGrayTxt'>No Games Available</p></td></tr>");
    quakelive.siteConfig.realm == "focus" ?
        d.append("<tr><td colspan='" + cols + "'><p class='tc TwentyPxTxt midGrayTxt'>A focus test may not be active at this time.<br />Please check the News Feed for scheduled test times.</p></td></tr>")
        : d.append("<tr><td colspan='" + cols + "'><p class='tc TwentyPxTxt midGrayTxt'>Check Your Customize Settings</p></td></tr>");
  }
  // If there are servers in the list...
  else {
    if (0 == $tbody.find("tr:visible").length) {
      $tbody.append("<tr><td colspan='" + cols + "'><p class='tc TwentyPxTxt midGrayTxt'>All servers have been hidden by the Alt Browser.  Check your filters.</p></td></tr>");
    }
  }
}

qlnabServerListView.prototype.OnBeforeUpdateServerNode = function(d, e) {}

qlnabServerListView.prototype.OnRemoveServer = function(d, e) {
  d = $("#" + this.GetServerNodeId(e));
  d.length > 0 && d.remove();
  quakelive.matchtip.HideMatchTooltip(e.public_id);
}

qlnabServerListView.prototype.OnUpdateServer = function(d, e) {
  d = $("#" + this.GetServerNodeId(e));
  if (d.length == 0) {
    d = $("<tr id='" + this.GetServerNodeId(e) + "'></tr>");
    e.node = d;
  }
  this.SetupContextMenu(e, d);
  this.UpdateServerNode(e, d);
}

qlnabServerListView.prototype.DisplayServerList = function(g) {
  var m = $("#" + this.GetContainerNodeId());
  g = g.GetServers();
  m.empty();
  this.OnBeforeDisplayServerList(m, g);
  if (g.length > 0) {
    for (var x = this, p = [], z = 0, t = 0; t < g.length; t += this.props.group_cache_size) {
      for (var o = [], l = 0; l < this.props.group_cache_size && t + l < g.length; l++) {
        var u = g[t + l];
        o[l] = u.public_id;
        p[z] = o
      }
      z++;
    }
    var k = function() {
      $(".contextMenu").destroyContextMenu().hide();
    }
    z = {
      onHover: k,
      onClick: k,
      onDblClick: k,
      target: this.props.target
    };
    o = this.props.max === 0 ? g.length : this.props.max;
    for (t = 0; t < o; ++t) {
      u = g[t];
      z.cachedServerIds = p[parseInt(t / this.props.group_cache_size)];
      quakelive.matchtip.BindMatchTooltip(u.node, u.public_id, z);
      m.append(u.node)
    }
    m = m.find("tr");

    PREFS.trigger("ql_alt_bestPickHighlight");
    PREFS.trigger("ql_alt_gametypeIcon");
  }
  this.OnAfterDisplayServerList(m, g)
}

qlnabServerListView.prototype.SortServerList = function() {
  var $qab = $("#ql_alt_browser");
  var sortList;
  try {
    sortList = $qab.length ? $qab.get(0).config.sortList : [[6,1]];
  }
  catch(e) {
    logError("SortServerList: " + e);
    sortList = [[6,1]];
  }

  // Append the Players column to the sort list if it isn't already there.
  var hasPlayers = false;
  for (var i = 0, e = sortList.length; i < e; ++i) {
    if (sortList[i][0] == 6) {
      hasPlayers = true;
      break;
    }
  }
  if (!hasPlayers) {
    sortList[sortList.length] = [6,1];
  }

  $qab.trigger("update");
  $qab.trigger("sorton", [sortList]);
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER CONTEXT MENU
////////////////////////////////////////////////////////////////////////////////////////////////////
qlnabServerListView.prototype.MatchContextMenuHandler = function(e, g) {
  var k = g.data("info"), module = quakelive.mod_home;
  switch (e) {
  case "copy":
    qlPrompt({
      input: true,
      readonly: true,
      alert: true,
      title: "Link to this match",
      body: "Use the URL below to link to this match directly.",
      inputLabel: quakelive.siteConfig.baseUrl + "/r/join/" + k.public_id
    });
    break;
  case "join":
    g.dblclick();
    break;
  case "filter_map":
    module.filter.filters.arena = k.map;
    module.ReloadServerList();
    break;
  case "filter_location":
    module.filter.filters.location = k.location_id;
    module.ReloadServerList();
    break;
  case "filter_gametype":
    module.filter.filters.game_type = k.game_type;
    module.ReloadServerList();
    break;
  case "filter_none":
    break;
  default:
    break;
  }
}

qlnabServerListView.prototype.SetupContextMenu = function(d, e) {
  var Q = {
    menu: "serverContext",
    inSpeed: 0,
    outSpeed: 0
  };
  e.data("info", {public_id: d.public_id, map: d.map, location_id: d.location_id, game_type: d.game_type});
  e.contextMenu(Q, this.MatchContextMenuHandler);
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// MISC STUFF FOR QLNAB FEATURES
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Set up the prototype for launch game parameters, which is used
 * in ql_alt_parameters() and ql_alt_demo()
 */
function qlnabLaunchGameParams(a) {
  a = $.extend({password: null, isTraining: false}, a);
  var isStandard = quakelive.siteConfig.premiumStatus == "standard";
  var canShow = quakelive.config("forceVideoAds", false)
      || isStandard && quakelive.userstatus == "ACTIVE" && !a.isTraining;
  this.password = a.password;
  this.noInputGrab = !quakelive.IsLinux() && canShow;
  this.noAudio = canShow;
  this.noAds = !isStandard;
  this.shrinkViewport = isStandard;
  this.hasFullscreen = quakelive.cvars.GetIntegerValue("r_fullscreen", 0) != 0;
  this.browserMode = quakelive.cvars.GetIntegerValue("r_inbrowsermode", 12);
  this.cmdStrings = [];
}

qlnabLaunchGameParams.prototype.Append = function(a) {
  this.cmdStrings.push(a);
}

qlnabLaunchGameParams.prototype.Prepend = function(a) {
  this.cmdStrings.shift(a);
}

qlnabLaunchGameParams.prototype.GetCommandLine = function() {
  var a = quakelive.cvars.Get("model");
  quakelive.cvars.Set("headmodel", a.value);
  quakelive.cvars.Set("team_model", a.value);
  quakelive.cvars.Set("team_headmodel", a.value);
  quakelive.cfgUpdater.StoreConfig(quakelive.cfgUpdater.CFG_BIT_REP);
  a = "";
  if (this.noInputGrab) a += "+set in_nograb 1 ";
  if (this.noAudio) a += "+set s_volume 0 ";
  if (this.noAds) a += "+set g_advertDelay 0 ";
  a += "+set r_fullscreen " + quakelive.cvars.GetIntegerValue("r_fullscreen", 0) + " ";
  if (this.shrinkViewport) a += "+set r_inbrowsermode 0; +set vid_xpos 0; +set vid_ypos 0; ";
  a += '+set gt_user "' + pluginx.username + '" ';
  a += '+set gt_pass "' + pluginx.password + '" ';
  a += '+set gt_realm "' + quakelive.siteConfig.realm + '" ';
  if (typeof this.password == "string") a += '+set password "' + this.password + '" ';
  a += this.cmdStrings.join(" ");
  return a;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// ADD IN FEATURES
////////////////////////////////////////////////////////////////////////////////////////////////////

// Override mod_home's ShowContent to change the view type
quakelive.mod_home.ShowContent = function(v) {
  if (quakelive.IsLoggedIn() && quakelive.userstatus != "ACTIVE") {
      quakelive.Goto("welcome");
      return;
  }

  quakelive.ShowContent(v);

  if (!quakelive.IsLoggedIn()) return;

  quakelive.MakeHomeChooser("home");
  v = new qlnabServerListView();
  v.SetDisplayProps({
      target: "ql_alt_browser tbody"
  });

  $(".postlogin_nav ul li:last")
      .after("<li id='ql_alt_parameters'>Parameters</li>" +
             "<li id='ql_alt_filters'>Filters</li>" +
             "<li id='ql_alt_demo'>Demo</li>" +
             "<li id='ql_alt_refresh'>Refresh</li>");

  // Set up custom game parameters
  $("#ql_alt_parameters").click(function ql_alt_parameters() {
    qlPrompt({
      title: "Parameters",
      body: "Enter custom parameters to start QL (e.g. +exec mycfg.cfg +devmap campgrounds).",
      input: true,
      inputLabel: PREFS.get("ql_alt_parameters"),
      inputReadOnly: false,
      alert: false,
      ok: function() {
        var params = $("#modal-input > input").val();
        PREFS.set("ql_alt_parameters", params);
        $("#prompt").jqmHide();
        if (params) {
          var k = new qlnabLaunchGameParams();
          k.Append(params);
          LaunchGame(k);
        }
      }
    });
    return false;
  });

  // Set up server filtering
  $("#ql_alt_filters").click(function ql_alt_filters() {
    var tmp_exclude = PREFS.get("ql_alt_filters_exclude"),
        tmp_include = PREFS.get("ql_alt_filters_include"),
        content = "Enter items to include or exclude separated by commas.  Possible values:" +
                  "<ul><li><b>Location:</b> \"New York\" or \"Warsaw #2\"</li>" +
                  "<li><b>Map name:</b> \"Campgrounds\"</li>" +
                  "<li><b>Game mode:</b> \"ffa\"</li>" +
                  "<li><b>Server size:</b> \"/16\"</li>" +
                  "<li><b>Keywords:</b> \"qlnab.open\" (playable slots available), \"mods\" (modified rules)</li>" +
                  "<li><b>Combination:</b> \"New York + Campgrounds, Warsaw #2 + qlnab.open, ffa, /16\"</li></ul>" +
                  "<label for='ql_alt_filters_include'>Include:</label>&nbsp; <input type='text' id='ql_alt_filters_include'/> <br />" +
                  "<label for='ql_alt_filters_exclude'>Exclude:</label> <input type='text' id='ql_alt_filters_exclude' /> <br />";

    qlPrompt({
      customWidth: 600,
      title: "Filters",
      body: content,
      input: true,
      inputReadOnly: false,
      alert: false,
      ok: function() {
        var filters_exclude = $("#ql_alt_filters_exclude").val(),
            filters_include = $("#ql_alt_filters_include").val();

        $("#prompt").jqmHide();

        PREFS.set("ql_alt_filters_exclude", filters_exclude.toLowerCase());
        PREFS.set("ql_alt_filters_include", filters_include.toLowerCase());

        if (tmp_exclude != filters_exclude || tmp_include != filters_include) {
          if (filters_exclude || filters_include) {
            $("#ql_alt_filters").addClass("filter_enabled");
          }
          else {
            $("#ql_alt_filters").removeClass("filter_enabled");
          }
          quakelive.serverManager.FlushCache();
          quakelive.mod_home.ReloadServerList();
        }
      }
    });

    setTimeout(function() {
      $("#prompt td").attr("align", "left");
      $("#modal-input").css("display", "none");
      $("#ql_alt_filters_exclude").val(tmp_exclude);
      $("#ql_alt_filters_include").val(tmp_include);
    }, 0);

    return false;
  }).toggleClass("filter_enabled", !!(PREFS.get("ql_alt_filters_exclude") || PREFS.get("ql_alt_filters_include")));

  // Set up demo launching
  $("#ql_alt_demo").click(function ql_alt_demo() {
    qlPrompt({
      title: "Demo",
      body: "Enter a demo name to play.  \"demo.cfg\" will automatically be executed, if it exists.",
      input: true,
      inputLabel: PREFS.get("ql_alt_demo"),
      inputReadOnly: false,
      alert: false,
      ok: function() {
        var demo = $("#modal-input > input").val();
        $("#prompt").jqmHide();
        PREFS.set("ql_alt_demo", demo);
        if (demo) {
          var k = new qlnabLaunchGameParams;
          k.Append("+exec demo.cfg +demo \"" + demo + "\"");
          LaunchGame(k);
        }
      }
    });
    return false;
  });

  // Set up list refreshing
  $("#ql_alt_refresh").click(function() {
    quakelive.serverManager.FlushCache();
    quakelive.mod_home.ReloadServerList();
  }).attr("title", "Shift + R");

  $("#qlv_postlogin_matches").append("<table border='0' id='ql_alt_browser'>" +
                                     "<tbody></tbody>" +
                                     "<thead><tr>" +
                                     "<th>&nbsp;</th>" +
                                     "<th>Location</th>" +
                                     "<th>Ping</th>" +
                                     "<th>Mode&nbsp;</th>" +
                                     "<th>Map</th>" +
                                     "<th>Skill</th>" +
                                     "<th>Players</th>" +
                                     "</tr></thead>" +
                                     "</table>");

  $("#ql_alt_browser").find("tbody")
                      // Dummy row for tablesorter to inspect
                      .append("<tr><td><img class='alocation_flag' src='a.gif' /></td><td class='alocation_text'>a</td>" +
                              "<td class='aping'>0</td><td><img src='a.gif' class='agameicon' /></td>" +
                              "<td><span class='amapname'>campgrounds</span><span class='agamelabel'>a</span></td>" +
                              "<td><img src='#' class='agamerank' /><a href='#' class='link share_link_img'></a></td>" +
                              "<td class='aplayers'>0/128</td></tr>")
                      .end()
                      .tablesorter({debug: false,
                                    sortList: JSON.parse(PREFS.get("ql_alt_browser_sort", "[[6,1]]")),
                                    headers: {5: {sorter: "rank"}, 6: {sorter: "players"}},
                                    widgets: ["zebra","sortPersist"]})
                      .bind("sortEnd", function() { $(".contextMenu").destroyContextMenu().hide(); quakelive.HideTooltip(); })
                      .find("tbody")
                      .empty();

  quakelive.serverManager.listener = v;
  quakelive.params.showgamesettings && quakelive.mod_prefs.ShowOverlay();
  quakelive.mod_home.InitFilters();
  quakelive.mod_home.ReloadServerList();
  quakelive.mod_home.LoadQuickStats();
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// MATCH TIP FIXES
////////////////////////////////////////////////////////////////////////////////////////////////////

// Override matchtip's BindMatchTooltip to use hoverIntent
quakelive.matchtip.BindMatchTooltip = function(b, k, e) {
  e = $.extend({ 
    onHover: null,
    onHoverOff: null,
    onClick: null,
    onDblClick: null,
    targetContext: null
  }, e);

  this.target = e.target;

  b.unbind("hover");
  b.unbind("click");
  b.unbind("dblclick");

  e.node = b;
  e.public_id = k;
  var g = this;

  b.click(function() {
    e.onClick && e.onClick(b, k);
    if (e.targetContext) g.activeContext = e.targetContext;
    g.OnClickMatchTooltip(b, k, e);
    return false
  });

  b.dblclick(function() {
    e.onDblClick && e.onDblClick(b, k);
    if (e.targetContext) g.activeContext = e.targetContext;
    return g.OnDblClickMatchTooltip(b, k)
  });

  b.hoverIntent(function() {
    if (!(g.pinnedServer && k == g.pinnedServer.public_id
        && (g.hoverNode == null || b == g.hoverNode))) {
      e.onHover && e.onHover(b, k);
      if (e.targetContext) g.activeContext = e.targetContext;
      g.UnPinMatchTooltip();
      g.OnHoverMatchTooltip(b, k, e.cachedServerIds)
    }
  }, function() {
    if (!g.pinnedServer) {
      e.onHoverOff && e.onHoverOff(b, k);
      g.HideMatchTooltip(k);
      g.activeContext = null
    }
  })
}
//}); // end of call to contentEval


//Override matchtip's PinMatchTooltip to avoid pinning if the tip is hidden
//contentEval(function() {
var oldPinMatchTooltip = quakelive.matchtip.PinMatchTooltip;
quakelive.matchtip.PinMatchTooltip = function() {
  var tipOffset = $("#lgi_tip").offset();
  if (!(tipOffset.left || tipOffset.top)) {
    return;
  }
  oldPinMatchTooltip.apply(quakelive.matchtip, arguments);
}
//}); // end of call to contentEval


/**
 * Override matchtip's GetTooltipOffset and DisplayMatchPlayers to display
 * match list tips to the right, friends list tips to the left
 */
//contentEval(function() {
quakelive.matchtip.GetTooltipOffset = function(e, g, k) {
  var d = e;
  var l = {};
  var n = {
    left: $(document).scrollLeft(),
    top: $(document).scrollTop(),
    right: $(document).scrollLeft() + $("body").width(),
    bottom: $(document).scrollTop() + $("body").height(),
    width: $("body").width(),
    height: $("body").height()
  };
  var u = 23, B = 2, x = 120, p = 28, z = 28;
  var q = {
    width: g.innerWidth(),
    height: g.innerHeight()
  };

  e = quakelive.matchtip.GetDimensions(e);
  e = {
    left: e.left,
    top: e.top,
    right: e.left + e.innerWidth,
    bottom: e.top + e.innerHeight,
    width: e.innerWidth,
    height: e.innerHeight
  };

  if (!/^match_\d+$/.test(d.attr("id"))) {
    l.left = e.left - q.width - u + 4;
    l.arrowDirection = "right";
    l.arrowLeft = e.left - u;
    g.orientation = "left";
    g.addClass("lefto")
  }
  else {
    l.left = e.left + e.width + u;
    l.arrowDirection = "left";
    l.arrowLeft = e.right + B;
    g.orientation = "right";
    g.removeClass("lefto")
  }

  l.arrowTop = e.top + e.height / 2 - x / 2;

  if (l.arrowTop < n.top) {
    g = n.top - l.arrowTop;
    if (g > e.height / 2) g = e.height / 2;
    l.arrowTop += g
  }

  l.top = l.arrowTop - (q.height - p - z) / 3;
  if (l.top + q.height > n.bottom)
    l.top -= l.top + q.height - n.bottom;
  l.arrowLeft -= l.left;
  l.arrowTop = l.arrowTop - l.top - p;
  return l;
}


quakelive.matchtip.DisplayMatchPlayers = function(e) {
  var d = {
    Free: 0,
    Red: 1,
    Blue: 2,
    Spec: 3
  };
  var g = $("#lgi_tip"), k = $("#lgi_cli");

  // Avoid showing player list (lgi_cli) if the tip is off-screen
  var gOff = g.offset();
  if (!gOff.left && !gOff.top) return;

  if (k.length == 0) {
      k = $("<div id='lgi_cli'><div id='lgi_cli_top'><div class='lgi_headcol_1'>Player Name</div><div class='lgi_headcol_2'>Score</div></div><div id='lgi_cli_fill'><div id='lgi_cli_content'></div></div><div id='lgi_cli_bot'></div></div>");
      k.appendTo("body")
  }
  var l = k.find("#lgi_cli_content");
  l.empty();

  if (e.players.length > 0) for (var n = 0; n < e.players.length; ++n) {
    var q = e.players[n], u, B, x, p, z;
    p = n % 2 == 0 ? "lgi_med lgi_cli_row_1" : "lgi_med lgi_cli_row_2";

    if (q.friend) {
      p += " lgi_is_friend";
    }
    else if (q.blocked) {
      p += " lgi_is_blocked";
    }

    u = q.clan ? StripColors(q.clan) + " " : "";
    B = StripColors(q.name);
    u += B;

    if (q.bot) {
      u += " <i>(Bot)</i>";
      p += " lgi_is_bot"
    }

    x = q.team == d.Spec ? "SPEC" : 2 == e.game_type ? FormatRaceDuration(q.score) : q.score;

    if (q.model) {
      var K = q.model.toLowerCase().split("/");
      z = K[0] + "_";
      z += K[1] ? K[1] : "default"
    }
    else {
      z = "sarge_default";
    }

    if (q.team == d.Red) {
      z = ChangeModelSkin(z, "red");
    }
    else if (q.team == d.Blue) {
      z = ChangeModelSkin(z, "blue");
    }

    K = "<a href='javascript:;' onclick='quakelive.Goto(\"profile/summary/" + StripColors(q.name) + "\"); return false'>";
    B = quakelive.mod_friends.IsBlocked(B) ? "<img src='" + quakelive.resource("/images/players/icon_gray_sm/" + z + ".png") + "' class='lgi_bordercolor_" + q.team + "' width='18' height='18' />" : "<img src='" + quakelive.resource("/images/players/icon_sm/" + z + ".png") + "' class='lgi_bordercolor_" + q.team + "' width='18' height='18' />";
    u = u;

    if (!q.bot) {
      B = K + B + "</a>";
      u = K + u + "</a>"
    }

    l.append("<div class='" + p + "'><div class='lgi_cli_col_1'>" + B + "<span>" + u + "</span><div class='cl'></div></div><div class='lgi_cli_col_2'>" + x + "</div></div>")
  }
  else {
    l.append("<center>No Players in Game</center>");
  }

  e = quakelive.matchtip.GetDimensions(g);
  e = {
    left: e.left,
    top: e.top,
    right: e.left + e.innerWidth,
    bottom: e.top + e.innerHeight,
    width: e.innerWidth,
    height: e.innerHeight
  };
  l = {
    width: 236
  };

  if (g.hasClass("lefto")) {
    l.left = e.left - k.width() + 8;
  }
  else {
    l.left = e.right
  }
  l.top = e.top;
  k.css("left", l.left + "px");
  k.css("top", l.top + "px");
  k.show();
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// KEYBOARD SHORTCUTS
////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).keypress(function(e) {
  if (e.which == 82 && quakelive.activeModule.TITLE == "Home") {
    // shift+R on the home page
    quakelive.serverManager.FlushCache();
    quakelive.mod_home.ReloadServerList();
  }
});
//}); // end of call to contentEval
