// ==UserScript==
// @name        Ikariam No Black Bars
// @version     1.1
// @namespace   Ikariam No Black Bars in mobile Version
// @description Remove black bars in mobile version
// @description Entfernt die schwarzen Balken in der mobilen Version
// @include     http://m*.ikariam.*
// ==/UserScript==

// update part 
var scriptName = "Ikariam No Black Bars"
var scriptID = 134670;
var thisVersion="1.1";
var update = "all" // change this if minor updates should be notified

function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUp3dateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time="";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = /\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("lastUpdateCheck", time);
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	};
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]) }
	else { needsUpdate = thisVersion != newestVersion }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};

GM_addStyle('#container #mainview *.dangerButton,*.cancelUpgrade {background-image:none}');
GM_addStyle('#mainview #setWorkers ul {background-image:none}');
GM_addStyle('#academy #mainview #setScientists div.content ul {background-image:none}');
GM_addStyle('#temple #mainview #setPriests div.content ul {background-image:none}');
