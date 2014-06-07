// ==UserScript==
// @name           Script Update Checker    
// @namespace      http://eveningnewbs.googlepages.com
// @description    Code to add to any Greasemonkey script to let it check for updates.
// @include        *
// ==/UserScript==

// NOTES:
// Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
// I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
// The target script needs to be uploaded to a permanent place, preferably userscripts.org. The update checks will -not- increase the install count for the script there.
// Remember to change the version_timestamp every time the script is updated. Really.
// This script is set up to check for updates to itself by default. It may be a good idea to leave it like this; I update my scripts much too often.

var version_scriptNum = 24876; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1207601093476; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.

function updateCheck(forced)
{
	if ((forced) || (parseInt(GM_getValue("lastUpdate", "0")) + 60000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(xhrResponse)
				{
					GM_setValue("lastUpdate", new Date().getTime() + "");
					var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "");
					var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue("targetScriptName", scriptName);
					if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp)
					{
						if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?"))
							{GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}
					}
					else if (forced)
						{alert("No update is available for \"" + scriptName + ".\"");}
				}
			});
		}
		catch (err)
		{
			if (forced)
				{alert("An error occurred while checking for updates:\n" + err);}
		}
	}
}
GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);});
updateCheck(false);


// Below is a compact version of the snippet with the main body of the code in one line so it's less distracting when looking through the script source.
// Simply uncomment and use like the above.

/*
var version_scriptNum = 20145; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1203221923859; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
*/