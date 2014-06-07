// ==UserScript==
// @name           IPv6oSN CPU Autorun
// @author         NOrack
// @version        1.3
// @namespace      http://apps.facebook.com/ipoverfb
// @description    (Version 1.3) A macro to run CPU again after specific period
// @source         http://userscripts.org/scripts/review/46246
// @identifier     http://userscripts.org/scripts/source/46246.user.js
// @include        http://apps.facebook.com/ipoverfb/cpu_run_client.php*
// @include        http://apps.facebook.com/ipoverfb/cpu_run_log.php*
// ==/UserScript==

var version_scriptNum = 46246; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1342561549864; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/" + version_scriptNum +".meta.js" + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText; var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/@version_timestamp\s+([0-9]+)\s*$/m.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

var timeToWaitCPU = 60;   //seconds before running CPU again

window.setTimeout(function() { startCountDown() }, 1000);


function startCountDown(){
	  timeToWaitCPU = timeToWaitCPU - 1;	  
      if (timeToWaitCPU > 0){
		document.title = timeToWaitCPU + " seconds 'till next CPU run";
		window.setTimeout(function() { startCountDown() }, 1000);
      }else{
		document.title = "Running CPU to process routable packets";
		window.location.href = "http://apps.facebook.com/ipoverfb/cpu_run_client.php"
      }
}

