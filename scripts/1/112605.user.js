// ==UserScript==
// @name           cityy's ESR theme
// @namespace      http://cityy.explicits.de
// @description    modification of nicky's ESR theme | script code by wn (big thanks)
// @homepage       http://userscripts.org/scripts/show/112605
// @include        http://esreality.com/*
// @include        http://*.esreality.com/*
// @updateURL      https://userscripts.org/scripts/source/112605.meta.js
// @version        1.6
// @run-at         document-start
// ==/UserScript==

// Set up some stuff for user script updating
var SCRIPT_NAME = "cityy's ESR theme"
  , SCRIPT_VER  = "1.6";
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
  var AutoUpdater_112605={id:112605,days:1,name:SCRIPT_NAME,version:SCRIPT_VER,time:new Date().getTime(),call:function(response,secure){GM_xmlhttpRequest({method:"GET",url:"http"+(secure?"s":"")+"://userscripts.org/scripts/source/"+this.id+".meta.js",onload:function(xpr){AutoUpdater_112605.compare(xpr,response)},onerror:function(xpr){if(secure){AutoUpdater_112605.call(response,false)}}})},enable:function(){GM_registerMenuCommand(this.name+": Enable updates",function(){GM_setValue("updated_112605",new Date().getTime()+"");AutoUpdater_112605.call(true,true)})},compareVersion:function(r_version,l_version){var r_parts=r_version.split("."),l_parts=l_version.split("."),r_len=r_parts.length,l_len=l_parts.length,r=l=0;for(var i=0,len=(r_len>l_len?r_len:l_len);i<len&&r==l;++i){r=+(r_parts[i]||"0");l=+(l_parts[i]||"0")}return(r!==l)?r>l:false},compare:function(xpr,response){this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);if((this.xversion)&&(this.xname[1]==this.name)){this.xversion=this.xversion[1];this.xname=this.xname[1]}else{if((xpr.responseText.match("the page you requested doesn't exist"))||(this.xname[1]!=this.name)){GM_setValue("updated_112605","off")}return false}var updated=this.compareVersion(this.xversion,this.version);if(updated&&confirm("A new version of "+this.xname+" is available.\nDo you wish to install the latest version ("+this.xversion+")?")){var path="http://userscripts.org/scripts/source/"+this.id+".user.js";if(window.chrome){prompt("This script can't be updated automatically in Chrome.\nPlease uninstall the old version, and navigate to the URL provided below.",path)}else{try{window.parent.location.href=path}catch(e){}}}else{if(this.xversion&&updated){if(confirm("Do you want to turn off auto updating for this script?")){GM_setValue("updated_112605","off");this.enable();if(window.chrome){alert("You will need to reinstall this script to enable auto-updating.")}else{alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.")}}}else{if(response){alert("No updates available for "+this.name)}}}},check:function(){if(GM_getValue("updated_112605",0)=="off"){this.enable()}else{if(+this.time>(+GM_getValue("updated_112605",0)+1000*60*60*24*this.days)){GM_setValue("updated_112605",this.time+"");this.call(false,true)}GM_registerMenuCommand(this.name+": Check for updates",function(){GM_setValue("updated_112605",new Date().getTime()+"");AutoUpdater_112605.call(true,true)})}}};AutoUpdater_112605.check();
}

// Wrap things that are dependent upon the document being ready
function onDCL() {
  removeEventListener("DOMContentLoaded", onDCL, false);

  // Check for a login link... if found the user is not signed in, so we shouldn't run
  var login = document.evaluate("//a[starts-with(@href,'?a=login')]", document, null, 9, null).singleNodeValue;
  if (login) { 
    return;
  }

  // Notify the user if we aren't using the "Nicky" theme
  var ss = document.evaluate("//link[@rel='stylesheet' and @href='/css/nicky.css']", document, null, 9, null).singleNodeValue;
  if (!ss) {
    if (GM_getValue("CESRT_firstRun", true)) {
      GM_setValue("CESRT_firstRun", false);
      alert(SCRIPT_NAME + " will not show up properly unless you're using the \"Nicky\" theme.\nPlease change to that under Site -> Preferences.");
    }
    return;
  }

  // Inject the CSS
  GM_addStyle("html{background:url('http://cityy.explicits.de/img/esr_bg.jpg') no-repeat !important; background-position: center top !important; background-attachment: fixed !important; background-color:#000 !important; border:none !important;} " + "body{background:url('http://cityy.explicits.de/img/trans.png') !important; border:1px solid #333 !important;} " + ".bettingleader{display:none !important;} " + ".summarybox img{ display:none !important;} " + ".summarycontent div.wrap { padding: 5px 10px 5px 10px; line-height: 1.4; font-size: 11px !important; font-family: arial; color: #ddd; border: none;} " + ".summaryhead div.wrap { color: #fff; padding: 4px 0 4px 10px; font-size: 10px !important; font-family: verdana; text-transform: uppercase; border:1px solid #333 !important;} " + ".summarybase div.wrap {border-left: none;} " + ".postbox{border:1px solid #222 !important; padding-bottom:5px !important;} .postheader{border-left:none !important; border-right:none !important;} .postcontent{border:none !important;} .postbox img{max-width:500px !important;} .inlineinfo img{max-width:350px !important;} .comment img{max-width:500px;float:bottom;} .ratinggraph{margin-right:-20px !important;} " + "img.flag{ width:18px !important;}" + ".comment{width:auto !important; } .commentbox blockquote{border:1px solid #101010; padding:5px; background-color:#111;} .commentboxnew blockquote{border:1px solid #102030; padding:5px; background-color:#123;} " + ".commentheader img{ padding-top:5px;padding-right:3px;width:18px;} " + ".commentbox{border:1px solid #111;background:#222;padding:2px 5px 2px 5px;overflow:hidden;}.commentbox a{color:#06F!important}.commentboxnew{border:1px solid #111;background:#234!important;padding:2px 5px 2px 5px;overflow:hidden;color:#FFF}.commentboxnew a{color:#08F!important}#sitetitle{width:232px;height:50px;background:url('http://cityy.explicits.de/img/esr_logo.png') no-repeat!important}#top{height:50px!important} #middle{border:none!important;width:680px!important;}.post{font-size:81%!important}#right{width:290px!important;margin-right:10px!important;border:1px solid #111!important;}#topbox{display:none!important}#topbox1{display:none!important}#topbox2{display:none!important}#topbox3{display:none!important}#topads{display:none!important}#topadbase{display:none!important}");

  // Ads
  var expr = "//div[contains(@class, 'summaryhead')]/div[contains(text(),'Advertisement')]/../.."
    , divs = document.evaluate(expr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0, e = divs.snapshotLength; i < e; ++i) {
    divs.snapshotItem(i).style.display = "none";
  }

  // Betting
  var bets = "//div[contains(@class, 'summaryhead')]//a[contains(text(),'Betting')]/../../..";
  divs = document.evaluate(bets, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0, e = divs.snapshotLength; i < e; ++i) {
    divs.snapshotItem(i).style.display = "none";
  }

  // Add the Twitter widget iframe
  var twt = document.createElement("iframe");
  twt.setAttribute("src", "http://cityy.explicits.de/content/esr_widget.html");
  twt.setAttribute("style", "width: 100%; height: 400px; border: none;");
  document.getElementById("right").appendChild(twt);
}

// If the document is ready run now, otherwise wait for it
if (document.body) {
  onDCL();
} else {
  addEventListener("DOMContentLoaded", onDCL, false);
}