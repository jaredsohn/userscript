// ==UserScript==
// @id             qlextendedgraphhistory@phob.net
// @name           Quake Live Extended Graph History
// @version        0.18
// @namespace      phob.net
// @author         wn
// @description    Keep more of your match history!
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/134693.meta.js
// ==/UserScript==


/**
 * Set up some stuff for user script updating
 */
var SCRIPT_NAME = "Quake Live Extended Graph History"
  , SCRIPT_VER  = "0.18";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;


/**
 * Based on:
 * GM_ API emulation for Chrome; 2009, 2010 James Campos
 * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
if (window.chrome) {
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
  GM_registerMenuCommand = function() {};
}


/**
 * Use an auto-update script if integrated updating isn't enabled
 * http://userscripts.org/scripts/show/38017
 * NOTE: Modified to add the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled) {
  var AutoUpdater_134693={id:134693,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_134693.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_134693.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_134693",new Date().getTime()+"");AutoUpdater_134693.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_134693","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_134693","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_134693",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_134693",0)+1000*60*60*24*this.days)){GM_setValue("updated_134693",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_134693",new Date().getTime()+"");AutoUpdater_134693.call(true,true)})}}};AutoUpdater_134693.check();
}


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

// Okay to run?
if ("object" != typeof quakelive) {
  return;
}


var qlegh = {};


/**
 * Order by game time (newest first)
 */
qlegh.gtSort = function(a, b) {
  return parseInt(b.GAME_TIME) - parseInt(a.GAME_TIME);
}


/**
 * Determine whether mod_profile.InitGraphs will handle the update
 */
qlegh.okayToUpdate = function() {
  return ("profile" != quakelive.pathParts[0] && "statistics" != quakelive.pathParts[1]);
}


/**
 * Get fresh match data
 */
qlegh.getMatchHistory = function() {
  if (!qlegh.okayToUpdate()) {
    return;
  }
  $.ajax({
    type: "GET",
    url: "/profile/statistics/" + quakelive.username
  }).done(function(data) {
    qlegh.syncMatchHistory($(data).find("#prf_matchjson").text(), true);
  });
}


// Update on the initial load (delayed 5 seconds)
setTimeout(function() {
  if (qlegh.okayToUpdate()) {
    qlegh.getMatchHistory();
  }
}, 5E3);

// Update whenever the game exits
quakelive.AddHook("OnGameExited", function() {
  if (!qlegh.okayToUpdate()) {
    return;
  }
  qlegh.getMatchHistory();
});


/**
 * Sync up history and available stats
 * @param {String} stats The JSON string for the array of match objects
 * @param {Boolean} auto Whether the call was initiated by the script
 */
qlegh.syncMatchHistory = function(stats, auto) {
  var history, newStats = [];
  auto = auto || false;

  try {
    stats = JSON.parse(stats);
  }
  catch(e) {
    // If called by InitGraphs...
    if (!auto) {
      oldInitGraphs.call(quakelive.mod_profile);
    }
    return;
  }

  // Get old stats
  history = amplify.store("qlegh_matchHistory") || [];

  // If we have no history, just use the available stats
  if (0 == history.length) {
    history = stats;
  }

  // Sanity check... newest games first
  history.sort(qlegh.gtSort);
  stats.sort(qlegh.gtSort);

  // Prepend newer stats to the history
  for (var i = 0, e = stats.length, h0 = parseInt(history[0].GAME_TIME); i < e; ++i) {
    if (parseInt(stats[i].GAME_TIME) > h0) {
      newStats.push(stats[i]);
    }
    else {
      break;
    }
  }
  history = newStats.reverse().concat(history);

  // Another sanity check... no duplicates
  var times = {};
  for (var i = 0, e = history.length; i < e; ++i) {
    if (!(history[i].GAME_TIME in times)) {
      times[history[i].GAME_TIME] = true;
    }
    else {
      history.splice(i, 1);
      e--;
      i--;
    }
  }

  // Only keep the 50 most recent matches (and sort them again)
  // NOTE: Over 50 would be possible, but the bars get quite thin.
  history = history.splice(0, Math.min(50, history.length)).sort(qlegh.gtSort);
  amplify.store("qlegh_matchHistory", history);

  // If called by InitGraphs...
  if (!auto) {
    // Save the result back to a JSON string
    $("#prf_matchjson").text(JSON.stringify(history));

    // Call the original function to initialize the graphs
    oldInitGraphs.call(quakelive.mod_profile);
  }
}


/**
 * Override InitGraphs to add the available match data to the history
 */
var oldInitGraphs = quakelive.mod_profile.InitGraphs;
quakelive.mod_profile.InitGraphs = function() {
  // Only handle the user's own profile
  if ($("#prf_player_name").text().toLowerCase() != quakelive.username.toLowerCase()) {
    oldInitGraphs.call(quakelive.mod_profile);
    return;
  }

  qlegh.syncMatchHistory($("#prf_matchjson").text());
};

}); // end of call to contentEval
