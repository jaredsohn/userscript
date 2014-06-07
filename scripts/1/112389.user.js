// ==UserScript==
// @id             qlranksmystats@phob.net
// @name           QLRanks.com My Stats
// @version        0.32
// @namespace      phob.net
// @author         wn
// @description    Adds a "My Stats" link to QLRanks.com
// @include        http://qlranks.com/*
// @include        http://*.qlranks.com/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/112389.meta.js
// ==/UserScript==

/**
 * Set up some stuff for user script updating
 */
var SCRIPT_NAME = "QLRanks.com My Stats"
  , SCRIPT_VER  = "0.32";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;


/**
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
 * Do the magic
 */
var navA = document.evaluate("//div[contains(@class, 'nav')]//a[last()]", document, null, 9, null).singleNodeValue
  , spacer
  , myStats
  , myName
  , RE_nameCheck = /^\w{2,}$/
  , RE_gametype = /http:\/\/(?:www\.)?qlranks\.com\/(ca|duel|tdm)\//;

function getGametype() {
  var gt = RE_gametype.exec(location.href);
  return (gt ? gt[1] : "duel");
}

function updateName(aEvent) {
  myName = prompt("What is your Quake Live user name?", GM_getValue("QLRMS_name",""));
  if (myName && RE_nameCheck.test(myName)) {
    GM_setValue("QLRMS_name", myName);
    if (myStats) {
      myStats.setAttribute("href", "/" + getGametype() + "/player/" + myName);
      location.assign(myStats.getAttribute("href"));
    }
    else {
      alert("Unable to find the 'my stats' link.");
    }
  }
  else {
    alert("Invalid name... must be [a-zA-Z0-9_] (no spaces).");
  }

  // Link
  if (aEvent) {
    aEvent.stopPropagation();
    aEvent.preventDefault();
  }
}

if (navA) {
  spacer = document.createTextNode(" ");
  navA.parentNode.insertBefore(spacer, navA.nextSibling);

  myStats = document.createElement("a");
  myStats.setAttribute("href", "/");
  myStats.textContent = "my stats";
  navA.parentNode.insertBefore(myStats, navA.nextSibling && navA.nextSibling.nextSibling);

  myName = GM_getValue("QLRMS_name");

  if (myName) {
    myStats.setAttribute("href", "/" + getGametype() + "/player/" + myName);
  }
  else {
    myStats.addEventListener("click", function QLRMS_click(aEvent) {
      updateName(aEvent);
    }, false);
  }
}


/**
 * Register a menu command to change the user name
 */
GM_registerMenuCommand("Change QLRanks.com 'my stats' user name", function() {
  updateName();
});


/**
 * Use an auto-update script if integrated updating isn't enabled
 * http://userscripts.org/scripts/show/38017
 * NOTE: Modified to add the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled) {
  var AutoUpdater_112309={id:112309,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_112309.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_112309.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_112309",new Date().getTime()+"");AutoUpdater_112309.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_112309","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_112309","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_112309",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_112309",0)+1000*60*60*24*this.days)){GM_setValue("updated_112309",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_112309",new Date().getTime()+"");AutoUpdater_112309.call(true,true)})}}};AutoUpdater_112309.check();
}
