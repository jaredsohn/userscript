// ==UserScript==
// @id             twitchtvplus@phob.net
// @name           Twitch.TV Plus!
// @version        0.55
// @namespace      phob.net
// @author         wn
// @description    My Twitch.TV customization script
// @include        http://*.twitch.tv/*
// @exclude        http://*.twitch.tv/*/popout
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/128434.meta.js
// ==/UserScript==


// Set up some stuff for user script updating
var SCRIPT_NAME = "Twitch.TV Plus!"
  , SCRIPT_VER  = "0.55";
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
if (window.chrome || "undefined" == typeof(GM_xmlhttpRequest)) {
  GM_xmlhttpRequest = DOLITTLE;
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
  var AutoUpdater_128434={id:128434,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_128434.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_128434.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_128434",new Date().getTime()+"");AutoUpdater_128434.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_128434","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_128434","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_128434",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_128434",0)+1000*60*60*24*this.days)){GM_setValue("updated_128434",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_128434",new Date().getTime()+"");AutoUpdater_128434.call(true,true)})}}};AutoUpdater_128434.check();
}


//
//
// The actual script stuff is below this point...
//
//


contentEval(function() {
  var $ = jQuery
    , vid_w = localStorage.getItem("twitchtv_plus_vid_w") || "1226px"
    , vid_h = localStorage.getItem("twitchtv_plus_vid_h") || "720px"
    , RE_nonDigits = /[^\d]/g;

  // Do nothing if the player isn't available (i.e. not a stream page)
  if (0 == $("#live_site_player_flash").length) {
    return;
  }

  // Helper to resize the video object and save the new width and height
  function tpResize(w, h, id) {
    var $player = $("#live_site_player_flash");

    localStorage.setItem("twitchtv_plus_vid_w", w + "px");
    localStorage.setItem("twitchtv_plus_vid_h", h + "px");
    localStorage.setItem("twitchtv_plus_res_selected", id);

    if (0 == $player.length) {
      alert("Unable to get the Twitch.TV player object");
      return;
    }

    $player.css({width: w + "px", height: h + "px"});
  }

  $(document).ready(function() {
    // Style changes
    $("<style type='text/css'>").text(
        "#header_actions { float: left }"
      + "#header_inside { margin: 0 0 0 10px }"
      + "#header_banner, #broadcast_meta { margin-bottom: 10px }"
      + "#twitchtv_plus_actions { width: 211px }" // NOTE: .popup was making this too big... make it like #self_actions
      + "#broadcast_title { font-size: 14px }"
      + "#chat_column { float: right; padding-left: 2px; border-left: 1px solid #999 }"
      + "div.main { width: 100%; background: none; border: none; }"
      + "div.main > div.wrapper { width: 95%; background: rgba(255,255,255,0.8); padding: 0 10px; }"
      + "#player_column { width: 75%; }"
      + "#stats_and_description { margin-top: 0 }"
      + "#standard_holder { width: 100% !important; height: 720px !important; background: rgba(0,0,0,0.65); }"
      + "#live_site_player_flash { width: " + vid_w + "; height: " + vid_h + "; }"
    ).appendTo(document.body);

    // Move the channel's banner image to a lower section.  This was done so
    // I could see the full video object without scrolling.
    var $target = $("#about");
    if ($target.length) {
      $target.prepend($("#header_banner"));
    }
    else if (($target = $("#description")).length) {
      $target.prepend($("#header_banner"));
    }
    else if (($target = $("#stats_and_description")).length) {
      $target.append($("#header_banner"));
    }
    else {
      $("#header_banner").remove();
    }

    // Add the "button" for the script's menu.  We need to check which header is
    // being displayed, which changes based upon whether the user is signed in.
    var $header = $("#header_loggedin");
    if (!$header.is(":visible")) {
      $header = $("#header_loggedout");
    }
    $header.append("<a id='twitchtv_plus_menu' href='#' class='dropdown' style='margin-left: 10px; padding-right: 24px'><span>Plus!</span></a>");

    // Create the script's menu.
    // NOTE:  The width vals are odd b/c I wanted to get rid of the "black bars".
    $("body").append(
        "<div class='dropmenu menu-like' id='twitchtv_plus_actions' style='display: none'>"
      + "  <div class='dropmenu_left'>"
      + "    Video size:<br>"
      + "    <a href='#' class='dropmenu_action g18_camera-FFFFFF20' id='twitchtv_plus_720pp' data-width='1226' data-height='720'>720p+</a>"
      + "    <a href='#' class='dropmenu_action g18_camera-FFFFFF20' id='twitchtv_plus_720p' data-width='1226' data-height='720'>720p</a>"
      + "    <a href='#' class='dropmenu_action g18_camera-FFFFFF20' id='twitchtv_plus_480p' data-width='800' data-height='480'>480p</a>"
      + "  </div>"
      + "  <div class='dropmenu_right'>"
      + "    <br>"
      + "    <a href='#' class='dropmenu_action g18_camera-FFFFFF20' id='twitchtv_plus_360p' data-width='588' data-height='360'>360p</a>"
      + "    <a href='#' class='dropmenu_action g18_camera-FFFFFF20' id='twitchtv_plus_240p' data-width='374' data-height='240'>240p</a>"
      + "    <a href='#' class='dropmenu_action g18_camera-FFFFFF20' id='twitchtv_plus_custom'>Custom</a>"
      + "  </div>"
      + "</div>");

    // Hacky way to remember which menu option was selected
    var res_selected = localStorage.getItem("twitchtv_plus_res_selected");
    if (!res_selected) {
      res_selected = "twitchtv_plus_720pp";
      localStorage.setItem("twitchtv_plus_res_selected", res_selected);
    }
    $("#" + res_selected).addClass("g18_camera-FFFFFF80").removeClass("g18_camera-FFFFFF20");

    // Set up the menu stuff
    var $tpActions = $("#twitchtv_plus_actions");
    $("#twitchtv_plus_menu").popup($tpActions);

    // Handle the user changing video size
    $tpActions.on("click", "a.dropmenu_action", function() {
      var $this = $(this)
        , custW
        , custH;

      $tpActions.find("a.g18_camera-FFFFFF80")
          .removeClass("g18_camera-FFFFFF80")
          .addClass("g18_camera-FFFFFF20");

      $this.addClass("g18_camera-FFFFFF80");

      // Handle the "Custom" option
      if ("twitchtv_plus_custom" === $this[0].id) {
        custW = (prompt("Video width (e.g. 1280)?", vid_w.replace(RE_nonDigits, ""))+"").replace(RE_nonDigits, "");
        custH = (prompt("Video height (e.g. 720)?", vid_h.replace(RE_nonDigits, ""))+"").replace(RE_nonDigits, "");
        tpResize(custW, custH, $this.attr("id"));
      }
      else {
        tpResize($this.data("width"), $this.data("height"), $this.attr("id"));
      }

      return false;
    });

    // If this is the first load... after a few seconds, flash the menu button
    // a few times to get the user's attention.
    if (!localStorage.getItem("twitchtv_plus_hasRan")) {
      $("#twitchtv_plus_menu").delay(3E3).fadeOut(200).fadeIn(200).fadeOut(200)
          .fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
      localStorage.setItem("twitchtv_plus_hasRan", true);
    }
  });

}); // end of call to contentEval
