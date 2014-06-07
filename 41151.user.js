// ==UserScript==
// @name           Wowheadizer
// @namespace      http://gecko.535design.com/grease/
// @description    Changes all links to TB, Allak, or WoWDB to point to Wowhead instead.
// @include        *
// @exclude        *.thottbot.*
// @exclude        *.allakhazam.com/*
// @exclude        *.wowdb.com/*
// @exclude        *.wowhead.com/*
// ==/UserScript==

/*
Achievement		Allakhazam	--
Achievement		Thottbot	http://thottbot.com/ach249
Achievement		WoWDB		http://www.wowdb.com/achievement.aspx?id=249
Achievement		Wowhead		http://www.wowhead.com/?achievement=249
Achievements	Allakhazam	--
Achievements	Thottbot	http://thottbot.com/ach/159
Achievements	WoWDB		http://www.wowdb.com/search.aspx?browse=23.155.159
Achievements	Wowhead		http://www.wowhead.com/?achievements=159
Faction			Allakhazam	--
Faction			Thottbot	http://thottbot.com/f70
Faction			WoWDB		http://www.wowdb.com/faction.aspx?id=70
Faction			Wowhead		http://www.wowhead.com/?faction=70
Item			Allakhazam	http://wow.allakhazam.com/db/item.html?witem=19852&source=live&locale=enUS
Item			Thottbot	http://thottbot.com/i19852
Item			WoWDB		http://www.wowdb.com/item.aspx?id=19852
Item			Wowhead		http://www.wowhead.com/?item=19852
Itemset			Allakhazam	--
Itemset			Thottbot	http://thottbot.com/set792
Itemset			WoWDB		http://www.wowdb.com/itemset.aspx?id=792
Itemset			Wowhead		http://www.wowhead.com/?itemset=792
NPC				Allakhazam	http://wow.allakhazam.com/db/mob.html?wmob=18285
NPC				Thottbot	http://thottbot.com/c18285
NPC				WoWDB		http://www.wowdb.com/npc.aspx?id=18285
NPC				Wowhead		http://www.wowhead.com/?npc=18285
Object			Allakhazam	http://wow.allakhazam.com/db/object.html?wobject=179706
Object			Thottbot	http://thottbot.com/o179706
Object			WoWDB		http://www.wowdb.com/object.aspx?id=179706
Object			Wowhead		http://www.wowhead.com/?object=179706
Quest			Allakhazam	http://wow.allakhazam.com/db/quest.html?wquest=5058
Quest			Thottbot	http://thottbot.com/q5058
Quest			WoWDB		http://www.wowdb.com/quest.aspx?id=5058
Quest			Wowhead		http://www.wowhead.com/?quest=5058
Spell			Allakhazam	http://wow.allakhazam.com/db/spell.html?wspell=48266
Spell			Thottbot	http://thottbot.com/s48266
Spell			WoWDB		http://www.wowdb.com/spell.aspx?id=48266
Spell			Wowhead		http://www.wowhead.com/?spell=48266
Zone			Allakhazam	http://wow.allakhazam.com/db/zone.html?wzone=210
Zone			Thottbot	http://thottbot.com/z210
Zone			WoWDB		http://www.wowdb.com/location.aspx?id=210
Zone			Wowhead		http://www.wowhead.com/?zone=210
*/

var sites = [
	{ // Allakhazam
		'rx'  : /^http:\/\/wow\.allakhazam\.com\/db\/(item|mob|object|quest|spell|zone)\.html\?(?:[^=&]+=[^&]+&)*w\1=(\d+)/i,
		'map' : {'mob' : 'npc'},
	},

	{ // Thottbot
		'rx'  : /^http:\/\/(\w+\.)?thottbot\.(?:com|net)\/(?:index\.cgi)?\??(?:[^=&]+=[^&]+&)*(ach\/?|[cfioqsz]|set)=?(\d+)/i,
		'map' : {
			'ach/' : 'achievements',
			'ach'  : 'achievement',
			'c'    : 'npc',
			'f'    : 'faction',
			'i'    : 'item',
			'o'    : 'object',
			'q'    : 'quest',
			's'    : 'spell',
			'set'  : 'itemset',
			'z'    : 'zone',
		},
	},

	{ //WoWDB
		'rx'  : /^http:\/\/\w+\.wowdb\.com\/(achievement|faction|item|itemset|npc|object|quest|spell|location)\.aspx\?(?:[^=&]+=[^&]+&)*id=(\d+)/i,
		'map' : {'location' : 'zone'},
	},

	/*{ //WoWDB (achievement categories)
		'rx'  : /^http:\/\/\w+\.wowdb\.com\/search\.aspx\?(browse)=(?:\d+\.)*(\d+)/i,
		'map' : {'browse' : 'achievements'},
	},*/
];

var numSites = sites.length;

var links = document.getElementsByTagName("a");
var numLinks = links.length;
var found = false;

while (--numLinks) {
	var link = links[numLinks];
	var href = link.href;
	var i = numSites;

	while (--i) {
		var site = sites[i];
		var match = site.rx.exec(href);

		if (!match) continue;

		var type = match[1];
		var url = "http://www.wowhead.com/?" + (site.map && site.map[type] ? site.map[type] : type) + "=" + match[2];
		link.href = url;

		if (link.textContent == href) link.innerHTML = url;

		found = true;
		break;
	}
}

if (found) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://www.wowhead.com/widgets/power.js";

	document.getElementsByTagName("head")[0].appendChild(script);
}