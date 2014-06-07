// ==UserScript==
// @id             qlprismlinker@phob.net
// @name           Quake Live QLPrism Linker
// @version        0.39
// @namespace      phob.net
// @author         wn
// @description    Show "qlprism://" links on quakelive.com
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/120721.meta.js
// ==/UserScript==

// Set up some stuff for user script updating
var SCRIPT_NAME = "Quake Live QLPrism Linker"
  , SCRIPT_VER  = "0.39";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

/**
 * Use an auto-update script if integrated updating isn't enabled
 * Based on http://userscripts.org/scripts/show/38017
 * NOTE: Added the new version number to the upgrade prompt and custom messages
 *       for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled && "undefined" != typeof(GM_xmlhttpRequest)) {
  var AutoUpdater_120721={id:120721,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_120721.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_120721.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_118255",new Date().getTime()+"");AutoUpdater_120721.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_118255","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_118255","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_118255",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_118255",0)+1000*60*60*24*this.days)){GM_setValue("updated_118255",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_118255",new Date().getTime()+"");AutoUpdater_120721.call(true,true)})}}};AutoUpdater_120721.check();
}


// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}


// Stylin'
GM_addStyle("#qlprism_url_link_input{display:none;height:16px;margin-right:30px;width:200px;background-color:#70170c;color:white;border:1px solid black;position:absolute;top:4px;left:0}"
          + "#qlv_game_mode .header_right {width: 350px !important}"
          + "#qlv_game_mode .header_right .action_txt {left: auto !important}");


// Run in the content window
contentEval(function() {
// Stop if Quake Live is offline
if (/offline/i.test(document.title)) {
  return;
}

// Make sure we're on top
if (window.self != window.top) {
  return;
}


// http://stackoverflow.com/questions/967096/using-jquery-to-test-if-an-input-has-focus
$.expr[':'].focus = function(elem) {
  return elem === document.activeElement && (elem.type || elem.href);
};


// Vars
var $qlgm = $("#qlv_game_mode")
  , $uli = $("#url_link_input")
  , $qlpuli = $uli.clone().attr("id", "qlprism_url_link_input").prependTo($qlgm.find(".header_right"))
  , $both = $("#url_link_input, #qlprism_url_link_input");


/**
 * Replace SetJoinURL to include the QLPrism link when in a game
 */
quakelive.mod_join.SetJoinURL = function(b, json) {
  var j = quakelive.Eval(json)
    , $u = $qlgm.find(".url_link");

  // If we have a game ID
  if (j.sv_gtid !== undefined) {
    // Update things with the new ID
    quakelive.mod_join.currentServerAddress = quakelive.siteConfig.baseUrl + "/r/join/" + j.sv_gtid;
    $uli.val(quakelive.mod_join.currentServerAddress);
    $qlpuli.val("qlprism://r/join/" + j.sv_gtid);

    // Change the current URL
    quakelive.StopPathMonitor();
    quakelive.SetAnchor("join/" + j.sv_gtid);
    quakelive.StartPathMonitor();

    // Wait a bit after blur, then hide if neither link input is the new focus
    $both.unbind("blur").blur(function (x) {
      setTimeout(function() {if (!$both.is(":focus")) {$both.hide();}}, 0);
    });

    // Show the link inputs and focus+select on the most appropriate
    $u.html('<img src="' + quakelive.resource("/images/link_glow.png")
          + '" width="26" height="26" style="vertical-align: middle;" />'
          + ' <b>Show link for this match</b>').unbind("click").click(function () {
      $both.show().blur();
      ("platform" in window ? $qlpuli : $uli).focus().get(0).select();
    });
  }
  // No game ID was defined, just show some text
  else {
    quakelive.mod_join.currentServerAddress = undefined;
    $u.text("Quake Live").unbind("click")
  }
}


/**
 * Hook into a private server being launched so we can show the "qlprism:" link
 */
quakelive.AddHook("OnPrivateServerLaunched", function (O) {
  setTimeout(function() {
    $("#srvreq_match_details").find("input[type='text']").first().after(function() {
      return $("<br>").after(
        $(this).clone().attr("value", "qlprism://r/join/" + O.INVITATION_CODE)
      );
    });
  }, 0);
});


/**
 * Override qlPrompt to detect a "Quake Live New Alt Browser" link alert, and
 * if so add the "qlprism:" link.  Also selects the input text when clicked.
 * 
 * This is certainly a hack, but seems to be the most reliable way.  The
 * alternatives interfere with other userscripts.  Might try to improve later.
 */
var oldqlPrompt = qlPrompt;
qlPrompt = function(a) {
  var p = oldqlPrompt.call(oldqlPrompt, a);
  if (a.title == "Server Link") {
    $("#modal-input").css({
      height: function(i, v) {return parseFloat(v) * 2}
    }).find("input[type='text']").first().after(function() {
      var gid = /(\d+)$/.exec($(this).attr("value"));
      if (!gid) {
        return ""; 
      }
      else {
        return $("<br>").after(
          $(this).clone().attr("value", "qlprism://r/join/" + gid[1])
        );
      }
    }).end().end().find("input[type='text']").bind("click", function() {
      $(this).get(0).select();
    });
  }
  return p;
}
}); // end of call to contentEval
