// ==UserScript==
// @id             twitchtvtabcomplete@phob.net
// @name           Twitch.TV Tab Complete
// @version        0.83
// @namespace      phob.net
// @author         wn
// @description    Complete names in chat using the tab key
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/129284.meta.js
// ==/UserScript==


// Set up some stuff for user script updating
var SCRIPT_NAME = "Twitch.TV Tab Complete"
  , SCRIPT_VER  = "0.83"
  ;
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

var DOLITTLE = function() {};


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
  alert("Your browser/add-on doesn't appear to support GM_xmlhttpRequest, which "
      + "is required for " + SCRIPT_NAME + " to operate.");
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
 * Use an auto-update script if integrated updating isn't enabled
 * http://userscripts.org/scripts/show/38017
 * NOTE: Modified to remove some checks, since we do that above.
 *       Also added the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled) {
  var AutoUpdater_129284={id:129284,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_129284.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_129284.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_129284",new Date().getTime()+"");AutoUpdater_129284.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_129284","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_129284","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_129284",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_129284",0)+1000*60*60*24*this.days)){GM_setValue("updated_129284",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_129284",new Date().getTime()+"");AutoUpdater_129284.call(true,true)})}}};AutoUpdater_129284.check();
}


//
//
// The actual script stuff is below this point...
//
//


contentEval(function() {

// Only run on the main window
if (self !== top) {
  return;
}

var $ = jQuery
  , viewers = []
  , input
  , RE_i
  , RE_cmd = /^(\/\w+)[ \t]+(\w+)$/
  , matches
  , cur
  , lastWasTab = false
  , cmd
  , hasCmd
  ;


function getNames(aIsRetry) {
  aIsRetry = !!aIsRetry;
  $.ajax({
      url: "https://tmi.twitch.tv/group/user/" + PP.channel + "/chatters"
    , dataType: "jsonp"
  }).done(function(aResponse) {
    // OK response?
    if (200 !== aResponse.status) {
      // Try again (one time only) in 5 seconds if the service was unavailable
      if (!aIsRetry) {
        setTimeout(function() { getNames(true) }, 5E3);
      }
      return;
    }

    // Something likely went wrong... don't remove existing names list
    if (0 === aResponse.data.chatter_count && 0 !== viewers.length) {
      return;
    }

    // Get names from the different 'chatters' categories
    var tmpNames = [];
    $.each(aResponse.data.chatters, function(nameCategory, nameArr) {
      tmpNames = tmpNames.concat(nameArr);
    });

    // Sort names, ignoring case
    tmpNames.sort(function(a, b) {
      a = a.toLowerCase(), b = b.toLowerCase();
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    });

    // Update the available names
    viewers = tmpNames;

    // Just in case the user was cycling, set 'lastWasTab' to false
    // to force a regeneration of the 'matches' array.  This will
    // give the user the latest available matching names at the cost
    // of losing their tab-cycling position.
    lastWasTab = false;
  }).fail(function() {
    // Try again (one time only) in 5 seconds if something went wrong
    if (!aIsRetry) {
      setTimeout(function() { getNames(true) }, 5E3);
    }
  });
}


// Initial request for channel names
getNames();

// Request new info every 2 minutes
setInterval(function() { getNames() }, 12E4);


// Whenever a key is pressed in the chat input...
function handleInput(e) {
  // Ignore if not a tab or used with ctrl, alt, or "meta" keys
  if (9 != e.keyCode || e.ctrlKey || e.altKey || e.metaKey) {
    lastWasTab = false;
    return;
  }

  e.preventDefault();

  // Get new matches if the previous key wasn't a tab
  if (!lastWasTab) {
    input = $(this).val().trimRight();

    // Are we cycling a command argument (e.g. "/ban FooName")?
    cmd = RE_cmd.exec(input);
    hasCmd = null !== cmd;

    RE_i = new RegExp("^" + (hasCmd ? cmd[2] : input), "i");

    matches = [];
    cur = 0;

    // Save matching names
    for (var i = 0, e = viewers.length, t; i < e; ++i) {
      if (RE_i.test(viewers[i])) {
        matches.push(viewers[i]);
      }
    }
  }
  // Otherwise try to cycle to the next index (back or forward based upon shift)
  else {
    if (e.shiftKey) {
      if (--cur < 0) cur = matches.length - 1;
    }
    else {
      if (++cur >= matches.length) cur = 0;
    }
  }

  // Always remember this was a tab
  lastWasTab = true;

  // If we have a match
  if (matches[cur]) {
    matches[cur] = matches[cur].length == 1 ? matches[cur] : matches[cur][0].toUpperCase() + matches[cur].substring(1);

    // Either cycle the name argument for the command...
    if (hasCmd) {
      $(this).val(cmd[1] + " " + matches[cur]);
    }
    // ... or set the new prefix
    else {
      $(this).val(matches[cur] + ": ");
    }
  }

  return false;
}

if (/chrome/.test(navigator.userAgent.toLowerCase())) {
  $("#chat_text_input").keydown(handleInput);
}
else {
  $("#chat_text_input").keypress(handleInput);
}

}); // end of call to contentEval
