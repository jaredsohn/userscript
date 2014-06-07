// ==UserScript==
// Author: Jon Gale
// Contact: <jon@jtoo.net>
//
// @name          ThottBot Link MouseOver
// @description   Provides Thottbot type hover of TB linked items
// @exclude	  http://thottbot.com/*
// @exclude	  http://www.thottbot.com/*
// @exclude	  http://*.thottbot.com/*
// @include	  *
// ==/UserScript==

(function() {

	var tmpNameSet, tmpName, tmpHTML;
	var prefs = [];

	prefs["rules"] = [
		"table.ttb { font-family:helvetica,arial,sans-serif; background-color: #282828; color: #FFFFFF; margin: 0px; border-bottom: 1px solid #888; border-right: 1px solid #888; border-top: 1px solid #EEE; border-left: 1px solid #EEE; font-size: 12px; }",
		"table.ttb h6 { font-size: 8px; }",
		"table.ttb h6 a:link { color: #3333FF; text-decoration: underline; }",
		"table.ttb h6 a:visited { color: #3333FF; text-decoration: underline; }",
		"table.ttb h6 a:hover { color: #7777FF; background-color: #282828; }",
		"table.ttb h6 a:active { color: #000000; background-color: #0000FF; }",
		"table.ttb a:link { color: #00FF00; text-decoration: none; }",
		"table.ttb a:visited { color: #00EE00; text-decoration: none; }",
		"table.ttb a:hover { color: #77FF77; background-color: #282828; }",
		"table.ttb a:active { color: #000000; background-color: #00FF00; }",
		".quality   { color: #FFFFFF !important; }",
		".quality-1 { color: #FFCC00 !important; }",
		".quality0  { color: #808080 !important; }",
		".quality1  { color: #FFCC00 !important; }",
		".quality2  { color: #00FF00 !important; }",
		".quality3  { color: #0068FF !important; }",
		".quality4  { color: #8000FF !important; }",
		".quality5  { color: #FF8000 !important; }",
		".quality6  { color: #FF0000 !important; }",
		"span.quality,span.quality-1,span.quality0,span.quality1,span.quality2,span.quality3,span.quality4,span.quality5,span.quality6 { display: block; font-weight: bold; }",
		".itemicon { display: block; width: 40px; height: 40px }",
		".transparent { background-color: transparent !important }"
		
	];

function storeData(link,itemNum)
{
	var callbackfunc = function(response) {
		var re = /(<table class=ttb.*)/;
		var icon_re = /width=64 height=64 background='(.*)' valign/;
		if (response.status == 200)
		{
			var matches = re.exec(response.responseText);
			// Try to get the icon
			var icon = icon_re.exec(response.responseText);
			if (icon != null && matches != null)
			{
				tmpHTML = '<table border=0 cellpadding=0 cellspacing=0 class="transparent"><tr><td valign=top class="transparent"><img class=itemicon src="'+icon[1]+'" border=0></td><td valign=top>' + matches[1] + '</td></tr></table>';
			}
			else if (matches != null)
			{
				tmpHTML = matches[1];
			}
			else
			{
				tmpHTML = 'Item not found';
			}
			tmpNameSet = "tb_"+itemNum;
			GM_setValue(tmpNameSet,tmpHTML);
		}
	}
	GM_xmlhttpRequest({
		method:"GET",
		url:link,
		headers: {
			'User-agent' : 'Mozilla/4.0 (compatible)'
		},
		onload:callbackfunc,
		onerror: function (res) {
			alert(res.statusText);
		}
	});
}

function scanLinks()
{
	var tbLinkRe = /.*thottbot\.(?:com|net)\/(?:index\.cgi)?\?i=(.*)/i
	var qualityRe = /<table class=ttb width=300><tr><td colspan=2><span class=(quality-?[0-9])>/;
	var links = document.getElementsByTagName("a");
	for (var i=0;i<links.length;i++)
	{
		var link = links[i];
		var matches = tbLinkRe.exec(link.href);
		if (matches != null) // Processing thottbot link
		{
			tmpName = "tb_"+matches[1];
			link.id = tmpName;
			if (!GM_getValue(tmpName) || GM_getValue(tmpName) == 'Item not found') // We don't already have the data
			{
				//GM_log("Could not find cached data for item " + matches[1] + " fetching now...");
				storeData(link.href,matches[1]);
			}
			link.addEventListener('mouseover', function(event) { return unsafeWindow.overlib(GM_getValue(this.id),unsafeWindow.VAUTO,unsafeWindow.FULLHTML); } , false);
			link.addEventListener('mouseout', function(event) { return unsafeWindow.nd(); } , false);

			// Comment this section if you don't want to color links based on rarity
			var quality = qualityRe.exec(GM_getValue(tmpName));
			if (quality != null)
			{
				//GM_log("quality is: " + quality[1]);
				link.className = quality[1];
			}
		}
	}
}

function initializeStyles() 
{
	var styleNode = document.createElement("style");
	document.body.appendChild(styleNode);
	styleSheet = document.styleSheets[document.styleSheets.length - 1];
	var rules = prefs["rules"];
	for (var i=0; i < rules.length; i++) {
		styleSheet.insertRule(rules[i], 0);
	}
}

function injectOverlib() {
	var olScript=document.createElement("script");
	olScript.src="http://www.bosrup.com/web/overlib/overlib.js";
	olScript.type="text/javascript";
	document.getElementsByTagName("body")[0].appendChild(olScript);
}

	
//GM_log("About to initialize overlib");
injectOverlib();
//GM_log("About to initialize styles");
initializeStyles();
//GM_log("About to scan links");
scanLinks();

/* Sample Data
<table class=ttb width=300><tr><td colspan=2><span class=quality3>Hedgecutter</span></td></tr><tr><td colspan=2>Binds when picked up</td></tr><tr><td>One-Hand</td><td align=right>Axe</td></tr><tr><td>60 - 90 Damage</td><td align=right>Speed 1.90</td></tr><tr><td colspan=2>(39.5 damage per second)</td></tr><tr><td colspan=2>+5 Strength</td></tr><tr><td colspan=2>+12 Stamina</td></tr><tr><td colspan=2>Durability 90 / 90</td></tr><tr><td colspan=2>Requires Level 55</td></tr><tr><td colspan=2>Sells for 4 Gold 74 Silver 43 Copper to vendors</td></tr><tr><td colspan=2>Item Level 60</td></tr><tr><td colspan=2><small><font color='#7777FF'>Source: Drop</font></small></td></tr><tr><td colspan=2><h6>periak&nbsp;&nbsp;<font color=88FF88>Live&nbsp;(1.9.3)</font></h6></td></tr></table>
*/

})();
