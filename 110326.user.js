// ==UserScript==
// @id             esrinlinereply@phob.net
// @name           ESR Inline Reply
// @version        1.5
// @namespace      phob.net
// @author         wn
// @description    Reply directly below the post!
// @include        http://www.esreality.com/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/110326.meta.js
// ==/UserScript==

// Set up some stuff for user script updating
var SCRIPT_NAME = "ESR Inline Reply"
  , SCRIPT_VER  = "1.5";
GM_updatingEnabled = "GM_updatingEnabled" in window ? GM_updatingEnabled : false;

// Chrome doesn't support certain GM_ commands
if (window.chrome) {
  GM_registerMenuCommand = function() {};
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

/**
 * Use an auto-update script if integrated updating isn't enabled
 * http://userscripts.org/scripts/show/38017
 * NOTE: Added the new version number to the upgrade prompt
 *       and custom messages for Chrome users (requires a manual update).
 */
if (!GM_updatingEnabled) {
  var AutoUpdater_110326={id:110326,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_110326.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_110326.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_110326",new Date().getTime()+"");AutoUpdater_110326.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_110326","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_110326","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_110326",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_110326",0)+1000*60*60*24*this.days)){GM_setValue("updated_110326",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_110326",new Date().getTime()+"");AutoUpdater_110326.call(true,true)})}}};AutoUpdater_110326.check();
}

alert("I've implemented the 'ESR Inline Reply' feature on ESR officially.\n \nYou should uninstall this userscript.  Thanks!");
