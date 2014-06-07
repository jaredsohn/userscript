// ==UserScript==
// @id             qlspechelper@qlspec
// @name           QuakeLive Speccing Helper
// @version        1.1
// @description    Autoexec commands on spectator connect, reconnect on errors
// @namespace      qlspec
// @homepage       http://esreality.com
// @author         simonov
// @contributor    wn
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/153714.meta.js
// ==/UserScript==

// Don't bother if Quake Live is down for maintenance
if (/offline/i.test(document.title)) {
  return;
}

// Make sure we're on top
if (window.self != window.top) {
  return;
}

// Set up some utility things
var DEBUG = true,
  DOLITTLE = function() {},
  logMsg = DEBUG ? function(aMsg) {
    console.log("QLSPEC: " + aMsg)
  } : DOLITTLE,
  logError = function(aMsg) {
    console.log("QLSPEC ERROR: " + aMsg)
  };

/**
 * Override OnCvarChanged
 */
QLSPEC = {
  // Debug
  DEBUG: false,

  // cache
  VARS: {},
  TIMES: {},

  // vars
  TIMEOUT: 10000, // timeout to check for connection error
}

// make a spec actions
QLSPEC.do = function(cvar, delay) {
  // do spectator actions only if asked to
  if (quakelive.cvars.GetIntegerValue("_qlspec_active", 0) != 1) {
    return;
  }

  logMsg("spectating commands via " + cvar);
  qz_instance.SendGameCommand('vstr _qlspec_do;');

  // change pov to make sure we are spectating a person, not a wall
  window.setTimeout(function() {
    qz_instance.SendGameCommand('vstr _qlspec_pov;');
  }, delay);

  // change pov to next player in a given period of time
  var next_pov_time = quakelive.cvars.GetIntegerValue("_qlspec_nextpovtime", 0);
  if (next_pov_time > 0) {
    window.setTimeout(function() {
      qz_instance.SendGameCommand('vstr _qlspec_pov;');
    }, next_pov_time * 1000);
  }
}

var oldOnCvarChanged = OnCvarChanged;
OnCvarChanged = function(name, val, replicate) {
  //logMsg(name + " = " + val);
  var timeout = +new Date() - QLSPEC.TIMEOUT;
  switch (name) {
    case "com_errorMessage":
      QLSPEC.VARS[name] = val;
      QLSPEC.TIMES[name] = +new Date();
      break;

    case "sv_cheats":
      // sv_cheats goes to 1 after appearing of an error message
      if (qz_instance.IsGameRunning() && val == 1 && typeof(QLSPEC.TIMES["com_errorMessage"]) != "undefined" && QLSPEC.TIMES["com_errorMessage"] - timeout > 0) {
        if (
          // manual disconnect from server
          (QLSPEC.VARS["com_errorMessage"].indexOf("Disconnected from server") >= 0)
          // kicked from server
          || (QLSPEC.VARS["com_errorMessage"].indexOf(" kicked") >= 0)
        ) {
          logMsg('kicked or disconnected, no need to reconnect');
          break;
        }
        logMsg('reconnecting');
        qz_instance.SendGameCommand('reconnect;');
      } else if (val == 0) {
        // game started
        QLSPEC.VARS[name] = val;
        QLSPEC.TIMES[name] = +new Date();
        if (quakelive.cvars.GetIntegerValue("cg_spectating") == 1) {
          QLSPEC.do(name, 5000);
        }
      }
      break;

    case "cg_spectating":
      if (qz_instance.IsGameRunning() && val == 1 && typeof(QLSPEC.TIMES["sv_serverid"]) != "undefined" && QLSPEC.TIMES["sv_serverid"] - timeout > 0) {
        QLSPEC.do(name, 1000);
      }
      break;

    case "sv_serverid":
    case "gt_eventid":
      QLSPEC.VARS[name] = val;
      QLSPEC.TIMES[name] = +new Date();
      if (qz_instance.IsGameRunning() && quakelive.cvars.GetIntegerValue("cg_spectating") == 1) {
        QLSPEC.do(name, 1000);
      }
      break;
  }
  oldOnCvarChanged.call(null, name, val, replicate);
}
