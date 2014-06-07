// ==UserScript==
// @id             esruserignorer@phob.net
// @name           ESR User Ignorer
// @version        0.25
// @namespace      phob.net
// @author         wn
// @description    Ignore certain ESReality users without breaking the thread structure
// @include        http://esreality.com/?a=post*
// @include        http://esreality.com/post/*
// @include        http://*.esreality.com/?a=post*
// @include        http://*.esreality.com/post/*
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/120086.meta.js
// ==/UserScript==


// Set up some stuff for user script updating
var SCRIPT_NAME = "ESR User Ignorer"
  , SCRIPT_VER  = "0.25";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

/**
 * Use an auto-update script if integrated updating isn't enabled
 * Based on http://userscripts.org/scripts/show/38017
 * NOTE: Modified to remove some checks, since we do that above.
 *       Also added the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled && "undefined" != typeof(GM_xmlhttpRequest)) {
  var AutoUpdater_118255={id:120086,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_118255.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_118255.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_118255",new Date().getTime()+"");AutoUpdater_118255.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_118255","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_118255","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_118255",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_118255",0)+1000*60*60*24*this.days)){GM_setValue("updated_118255",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_118255",new Date().getTime()+"");AutoUpdater_118255.call(true,true)})}}};AutoUpdater_118255.check();
}


// Vars
var RE_splitter = /\s+/;
var blocked = GM_getValue("esrui_blocklist", "").toLowerCase().split(RE_splitter);
var DEF_color = "red";


// Stylin'
GM_addStyle(".esrui_placeholder {cursor: pointer; font-style: italic; color: "
          + GM_getValue("esrui_color", DEF_color) + "}");


// Manage the blocklist
GM_registerMenuCommand("ESR User Ignorer: Manage List", function manageList() {
  var newr = prompt("Enter a space-delimited list of user names.\n"
                  + "NOTE: Clicking OK will reload the current page."
                  , GM_getValue("esrui_blocklist", ""));

  // User canceled?
  if (newr == null) {
    return;
  }

  // Did the list stay the same?
  newr = newr.trim().split(RE_splitter).join(" ");
  if (newr.toLowerCase() == blocked.join(" ")) {
    return;
  }

  // Save the new list and reload the page.
  GM_setValue("esrui_blocklist", newr);
  window.location.reload();
});

// Change the placeholder color
GM_registerMenuCommand("ESR User Ignorer: Change Color", function changeColor() {
  var color = prompt("Enter a CSS-friendly color (e.g. 'red' or '#f00')."
                   , GM_getValue("esrui_color", DEF_color));

  // User canceled?
  if (color == null) {
    return;
  }

  // Save the new color and update stuff.
  GM_setValue("esrui_color", color);
  var ph = document.getElementsByClassName("esrui_placeholder");
  for (var i = 0, e = ph.length; i < e; ++i) {
    ph[i].style.color = color;
  }
});


// Run... or not.
if (blocked[0]) {
  // TODO:  this is very ugly...
  var expr = "//div[@class='commentheaderleft']/a[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"
           + blocked.join("') or contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'")
           + "')]/../../../div[@class='commentcontent']";

  var comments = document.evaluate(expr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  // Replace the blocked user's posts with a placeholder "link"
  for (var i = 0, e = comments.snapshotLength; i < e; ++i) {
    var c = comments.snapshotItem(i);
    var s = document.createElement("span");
    s.className = "esrui_placeholder";
    s.innerHTML = "Blocked by ESR User Ignorer.  Click to show.";
    s.addEventListener("click", function(orig) {
      this.innerHTML = orig;
    }.bind(c, c.innerHTML), false);
    c.innerHTML = "";
    c.appendChild(s);
  }
}
