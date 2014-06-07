// ==UserScript==
// @name          MobWars Prototype TP9
// @description	  Automatically finds every Prototype TP9 available to you
// @include       http://apps.facebook.com/mobwars/jobs/index.php?job_help_id=*
// ==/UserScript==

var p1="http://apps.facebook.com/mobwars/jobs/index.php?job_help_id=";
var p3="&ref=nf";
var loc=document.location;
var p2=loc.slice(loc.indexOf('=')+1,loc.indexOf('&'));
loc.href=p1+(Number(p2)+1)+p3;

///////////////////////  UPDATE CHECKER ///////////////////////

var version_scriptNum = 43844; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1242679026094; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.

function updateCheck(forced)
{
	if ((forced) || (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
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
					if ((/version_timestamp\s*=\s*([0-9]+)/.exec(rt))[1] > version_timestamp) {
						if (confirm("There is an update available for Mob Wars Auto-Searcher\nWould you like to go to the install page now?")) {
							GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);
						}
					} else if (forced) {
						alert("No update is available for Mob Wars Auto-Searcher.");
					}
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
GM_registerMenuCommand("MobWars Auto-Searcher - Manual Update Check", function() { updateCheck(true); });
