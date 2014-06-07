// ==UserScript==
// @name           zaqwsxpl
// @namespace      zaqwsxpl
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum/*
// ==/UserScript==

// Set up some stuff for user script updating
var SCRIPT_NAME = "zaqwsx.pl Display"
  , SCRIPT_VER  = "0.001";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

// Set up some utility things
var DEBUG = true
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


