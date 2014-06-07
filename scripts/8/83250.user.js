scr_meta=<><![CDATA[
// ==UserScript==
// @name			Quake Live [Stable] Tier Viewer
// @version			0.0.6
// @namespace		Quake Live [Stable] Tier Viewer
// @description		Quake Live [Stable] Tier Viewer
// @include			http://www.quakelive.com/*
// ==/UserScript==
]]></>.toString();

var quakelive = unsafeWindow.quakelive;
var $;

function getSkills(sessionId, skillsHash)
{
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var sessionIdSum = 0;
	var skills = [];
	
	for (var i = 0, l = sessionId.length; i < l; ++i)
	{
		sessionIdSum += sessionId.charCodeAt(i);
	}
	
	var out;
	for (var i = 0, l = skillsHash.length; i < l; ++i)
	{
		out = alphabet.indexOf(skillsHash[i]) - (i + 1) * sessionIdSum % 65;
		skills.push((out > -1 ? out : out + 65));
	}
	
	return skills;
}


function displaySkills()
{
	var skillsText = "";
	var botSkills = getSkills(unsafeWindow.quakelive.session, this.textContent);
	
	var gameTypesList = []; 
	gameTypesList[0] = "ffa";
	gameTypesList[1] = "duel";
	gameTypesList[3] = "tdm";
	gameTypesList[4] = "ca";
	gameTypesList[5] = "ctf";
	gameTypesList[9] = "ft";
	
	var skillsPresent = false;
	
	gameTypesList.forEach(
		function (value, index, array)
		{
			if (botSkills[index])
			{
				skillsPresent = true;
				skillsText += " <span>" + array[index] + ": " + (botSkills[index] || "?") + "</span>";
			}
		}
	);
	
	if (!skillsPresent)
		skillsText = "<span>Cannot get skills, play more!</span>";

	this.innerHTML = skillsText;
}

function waitForTopLinks()
{
	var qlv_topLinks = document.getElementById('qlv_topLinks');
	
	if (qlv_topLinks)
	{
		$ = unsafeWindow.jQuery;
		var top = $('#qlv_statusTop .player_clan_name').text().length ? "57px" : "48px";
		$('<div id="qlv_skillTiers"/>')
			.insertAfter("#qlv_statusTop")
			.addClass("smallWhite")
			.css("color", "#FFCC00")
			.css("position", "absolute")
			.css("float", "right")
			.css("top", top)
			.css("right", "62px")
			.text("Loading skills...")
			.load("/practice #bot_sk", {}, displaySkills);
	
	}
	else
	{
		window.setTimeout(waitForTopLinks, 250);
	}
}

waitForTopLinks();

// Another Auto Update Script by sizzlemctwizzle 
// http://userscripts.org/scripts/show/38017
// http://userscripts.org/guides/45
var AutoUpdater_83250 = {
	id: 83250,
	days: 2,
	name: 'Quake Live [Stable] Tier Viewer',
	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
	time: new Date().getTime(),
	call: function(response) {
		GM_xmlhttpRequest({
			method: 'GET',
		url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
		onload: function(xpr) {AutoUpdater_83250.compare(xpr,response);}
		});
	},
	enable: function() {
		GM_registerMenuCommand("Enable "+this.name+" updates", function() {
			GM_setValue('updated_83250', new Date().getTime()+'');
			AutoUpdater_83250.call(true)
		});
	},
	compareVersion: function(r_version, l_version) {
		var r_parts = r_version.split('.'),
			l_parts = l_version.split('.'),
			r_len = r_parts.length,
			l_len = l_parts.length,
			r = l = 0;
		for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
			r = +(r_parts[i] || '0');
			l = +(l_parts[i] || '0');
		}
		return (r !== l) ? r > l : false;
	},
	compare: function(xpr,response) {
		this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
		this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
		if ( (this.xversion) && (this.xname[1] == this.name) ) {
			this.xversion = this.xversion[1];
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
		GM_setValue('updated_83250', 'off');
			return false;
		}
		var updated = this.compareVersion(this.xversion, this.version);
		if ( updated && confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?') )
			GM_openInTab('https://userscripts.org/scripts/source/'+this.id+'.user.js');
		else if ( this.xversion && updated ) {
			if(confirm('Do you want to turn off auto updating for this script?')) {
			GM_setValue('updated_83250', 'off');
			this.enable();
			alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			}
		} else if (response)
			alert('No updates available for '+this.name);
	},
	check: function() {
		if (GM_getValue('updated_83250', 0) == "off")
			this.enable();
		else {
			if (+this.time > (+GM_getValue('updated_83250', 0) + 1000*60*60*24*this.days)) {
				GM_setValue('updated_83250', this.time+'');
				this.call();
			}
			GM_registerMenuCommand("Check "+this.name+" for updates", function() {
				GM_setValue('updated_83250', new Date().getTime()+'');
				AutoUpdater_83250.call(true)
			});
		}
	}
};
if (typeof GM_xmlhttpRequest !== 'undefined')
	try {
		if (unsafeWindow.frameElement === null) 
			AutoUpdater_83250.check();
	} catch(e) {
		AutoUpdater_83250.check();
	}
