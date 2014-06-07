// ==UserScript==
// @name          Steam Community: Show Steam ID (r6)
// @namespace     http://steamcommunity.com/show-steam-id
// @description   Includes the user's Steam Community ID on their profile page.
// @include       http://steamcommunity.com/id/*
// @include       http://steamcommunity.com/profiles/*
// @include       https://steamcommunity.com/id/*
// @include       https://steamcommunity.com/profiles/*
// @exclude       http://steamcommunity.com/id/*/*
// @exclude       http://steamcommunity.com/profiles/*/*
// @exclude       https://steamcommunity.com/id/*/*
// @exclude       https://steamcommunity.com/profiles/*/*
// @website       http://userscripts.org/scripts/show/33889
// ==/UserScript==
// Version: r6
// Thanks to lodle for the new AJAX method of getting the community ID (included in r4 and onwards).
//
// Thanks to Richard Eid and Relic for informing me that some changes to the Steam Community website broke the script by changing where I needed to insert the extra HTML to show output (fixed in r5).  Apologies for the delay, it's been a busy couple of months!
//
// r6 removes dependancy on GreaseMonkey code and adds Chrom(e|ium) support in the process

// workaround lack of GM_log in chromium
// this will insert a no-op GM_log function
try {
	GM_log("");
} catch (ex) {
	function GM_log(msg) {
		//alert(msg);
	}
}

// Calculate the Steam AuthID for a given community ID.
function calculate_steamid(scid) 
{
	// javascript fails and needs to use some .substr to compensate for the 64-bit float
	// because that sometimes looses accuracy and returns a bad result.
	// this does limit us to the max steam ID 0:1:999999999 Steam users, though.
	var scid = parseInt(scid.substr(-10),10);
	var srv = scid % 2;
	GM_log("%2 = " + srv + ", scid = " + scid);
	var auth = ((scid - srv) - 7960265728) / 2;
	return "STEAM_0:" + srv + ":" + auth;
}

// Handles the insertion of the Steam AuthID in the web page, when we have a hit.
function handle_communityid(scid) 
{
	GM_log("Community ID = " + scid);
	steamid = calculate_steamid(scid)
	GM_log("Steam ID = " + steamid);
	document.getElementById('steamAuthID').innerHTML = steamid;
}

GM_log("Script initiated");

steamid_html = '<div class="statsItem"><div class="statsItemName">Steam AuthID:</div><span id="steamAuthID">Loading...</span> (<a href="http://userscripts.org/scripts/show/33889" title="About this Userscript">?</a>)</div><div class="rightGreyHR"><img src="http://steamcommunity.com/public/images/trans.gif" width="254" height="1" border="0" /></div>';

rightStatsBlock = document.getElementsByClassName('rightStatsBlock');

for (var x=0; x<rightStatsBlock.length; x++) {
	rightStatsBlock[x].innerHTML = steamid_html + rightStatsBlock[x].innerHTML;
}

// we actually don't need to use GM_xmlhttpRequest
var request = new XMLHttpRequest();
request.onreadystatechange = function(response)
{
	if (request.readyState == 4) {
		if (request.status == 200) {
			var xmlobject = request.responseXML;
			var root = xmlobject.getElementsByTagName('profile')[0];
			steamid = root.getElementsByTagName("steamID64")[0];
			handle_communityid(steamid.firstChild.nodeValue);
		} else {
			document.getElementById('steamAuthID').innerHTML = "ERROR " + response.status;
		}
	}
};
request.open("GET", window.location.pathname + "/?xml=1", true);
request.setRequestHeader("Accept", "text/xml")
request.send();

