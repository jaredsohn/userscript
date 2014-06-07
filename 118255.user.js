// ==UserScript==
// @id             qlcpop@phob.net
// @name           Quake Live Chat Popper
// @version        0.16
// @namespace      phob.net
// @author         wn
// @description    Pop out the Quake Live Chat section to a separate window!
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/118255.meta.js
// ==/UserScript==


// TODO:
//  * Chat list gets moved to #qlv_game_mode_chatlist when a game is launched
//  * LGI tooltip from a friend's icon is shown at an odd location in the main window
//  * Clean up the popupLoad stuff


// Set up some stuff for user script updating
var SCRIPT_NAME = "Quake Live Chat Popper"
  , SCRIPT_VER  = "0.16";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

/**
 * Use an auto-update script if integrated updating isn't enabled
 * Based on http://userscripts.org/scripts/show/38017
 * NOTE: Modified to remove some checks, since we do that above.
 *       Also added the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled && "undefined" != typeof(GM_xmlhttpRequest)) {
  var AutoUpdater_118255={id:118255,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_118255.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_118255.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_118255",new Date().getTime()+"");AutoUpdater_118255.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_118255","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_118255","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_118255",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_118255",0)+1000*60*60*24*this.days)){GM_setValue("updated_118255",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_118255",new Date().getTime()+"");AutoUpdater_118255.call(true,true)})}}};AutoUpdater_118255.check();
}


// Stop if Quake Live is offline
if (/offline/i.test(document.title)) {
  return;
}

// Make sure we're on top
if (window.self != window.top) {
  return;
}


// From QuakeLive.com
var $ = unsafeWindow.jQuery;
var quakelive = unsafeWindow.quakelive;

// Reference to the popup window
var win;

// Stores HTML generated for the popup
var htm;

// Current state of the IM section
var imIsPopped = false;


// Stylin'
GM_addStyle("#im-header:hover {cursor: pointer}"
          + ".qlcpop_placeholder {display: none; height: 548px; width: 298px; border: 1px dotted #ccc; background: #eee; cursor: pointer;}"
          + ".qlcpop_placeholder:hover {background: #DBDCD6;}");


/**
 * Determines where the IM section should be restored to in the main window
 */
function getTarget() {
  return (quakelive.IsGameRunning() ? "#qlv_game_mode_chatlist" : "#qlv_chatControl");
}


/**
 * Close the popup when the main window unloads
 */
unsafeWindow.addEventListener("beforeunload", function() {
  if (win && !win.closed) win.close();
}, false);


/**
 * Moves the IM section between the popup and the main window
 */
unsafeWindow.qlcpopMove = function(p$, toPopup) {
  imIsPopped = !!toPopup;
  $(".qlcpop_placeholder").toggle(imIsPopped);
  if (toPopup) {
    quakelive.mod_friends.MoveTo(p$("body"));
  }
  else {
    quakelive.mod_friends.MoveTo($(getTarget()));
  }
}


/**
 * Called from within the popup
 */
function popupLoad() {
  $(document).ready(function() {
    // Move the IM section to the popup
    window.opener.qlcpopMove($, true);

    // Listen for the popup unloading
    window.addEventListener("beforeunload", function() {
      window.opener.qlcpopMove();
    }, false);

    // Listen for 'Ctrl+W'
    // Doesn't seem to get picked up by 'beforeunload'
    window.addEventListener("keypress", function(e) {
      if (e.ctrlKey && e.charCode == 119) {
        window.opener.qlcpopMove();
      }
    }, false);
  });
}


/**
 * Pops out the IM section, or focuses if it already exists
 */
var popIM = function() {
  // Focus on the popup if it already exists
  if (win && !win.closed) {
    win.focus();
    return;
  }

  // Get (or generate) the chat window's HTML
  if (!htm) {
    htm = "<html><head><title>Quake Live Chat</title>";

    // Load all QL CSS
    $("link[rel=stylesheet][href*=quakelive.com]").each(function(i, el) {
      htm += "<link rel='stylesheet' href='" + $(el).attr("href") + "' type='text/css' />";
    });

    // Load all QL JS
    htm += "<script type='text/javascript'>window.SITECONFIG = " + JSON.stringify(unsafeWindow.SITECONFIG) + "</script>";
    $("script[src*=cdn.quakelive.com]").each(function(i, el) {
      htm += "<script src='" + $(el).attr("src") + "' type='text/javascript'></script>";
    });
    htm += "<script type='text/javascript'>(" + popupLoad + ")();</script>";

    // Finish up
    htm += "</head><body></body><html>";
  }

  // Open the popup over the current chat area
  var o = $(getTarget()).offset();
  win = window.open("data:text/html;charset=utf-8," + htm,
                    "_blank",
                    "height=550,width=300,left=" + o.left + ",top=" + o.top);

  imIsPopped = true;
}


/**
 * Override LoadPathContent_Success so the chat list stays in place if popped
 * 
 */
var oldLoadPathContent_Success = quakelive.LoadPathContent_Success;
quakelive.LoadPathContent_Success = function QLCPop_LoadPathContent_Success(o) {
  var y = quakelive.GetModule(quakelive.pathParts[0]);
  y.ShowContent(o);
  quakelive.SetPageTitle(quakelive.GetPageTitle());

  // Changed the next line
  !imIsPopped && y.DISPLAY.friends && !quakelive.IsGameRunning() && quakelive.mod_friends.MoveTo("#qlv_chatControl");

  quakelive.userid || (quakelive.activeModule == quakelive.mod_welcome ? $("#qlv_chatfill").hide() : $("#qlv_chatfill").show());
  quakelive.HideTooltip();
  var v = quakelive.pathParts[0];
  if (v === "practice") v = quakelive.home;
  o = $("#newnav_top .selected");
  v = $("#newnav_top #tn_" + v);
  o.toggleClass("selected");
  v.toggleClass("selected");
  quakelive.SendModuleMessage("OnContentLoaded", y)
}


/**
 * Override UI_Show once to customize the IM section
 */
var oldShow = quakelive.mod_friends.roster.UI_Show;
quakelive.mod_friends.roster.UI_Show = function QLCPop_mod_friends_Show(aCon) {
  oldShow.call(quakelive.mod_friends.roster);

  // Wait until things have fully loaded
  var $imh = $("#im-header");
  if ($imh.length != 1) {
    return;
  }

  // Customize the IM section then restore the old UI_Show
  $imh.attr("title", "Click to pop out!").bind("click", function() {popIM()});
  quakelive.mod_friends.roster.UI_Show = oldShow.bind(quakelive.mod_friends.roster);

  // Add the div which will appear when popped out
  $("#qlv_chatControl")
      .prepend("<div class='qlcpop_placeholder tc TwentyPxTxt midGrayTxt'>Currently popped out.<br/>Click here to focus.</div>")
      .find(".qlcpop_placeholder").bind("click", function() {popIM()})
      .clone(true).prependTo("#qlv_game_mode_chatlist");
}
