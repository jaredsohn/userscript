// ==UserScript==
// @name           digg - Expand all comments 
// @namespace      http://www.jackyyll.com
// @description    Appends /all to all the story LINKS so you don't have to refresh when you try to view an article. Based on http://userscripts.org/scripts/show/10112.
// @source         http://userscripts.org/scripts/show/10115
// @identifier     http://userscripts.org/scripts/source/10115.user.js
// @version        0.9.4
// @date           2007-06-23
// @creator        jackyyll <@gmail.com>
// @include        http://*.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

(function () {

var SCRIPT = {
	name: "digg - Expand all comments",
	namespace: "http://jackyyll.com",
	description: "Appends /all to all the story LINKS so you don't have to refresh"
			+ " when you try to view an article. Based on"
			+ " http://userscripts.org/scripts/show/10112",
	source: "http://userscripts.org"			// script homepage/description URL
			+ "/scripts/show/10115",
	identifier: "http://userscripts.org"	// script URL
			+ "/scripts/source/10115.user.js",
	version: "0.9.4",								// version
	date: (new Date(2007, 6 - 1, 23))		// update date
			.valueOf()

};

var a = document.links
var diggregex = /http:\/\/(www.)?digg.com\/(apple|design|gadgets|hardware|tech_news|linux_unix|microsoft|mods|programming|security|software|tech_deals|space|environment|health|general_sciences|business_finance|politics|2008_us_elections|political_opinion|world_news|offbeat_news|baseball|basketball|extreme_sports|football|golf|hockey|motorsport|soccer|tennis|other_sports|celebrity|movies|music|television|gaming_news|playable_web_games|pc_games|nintendo_wii|playstation_3|xbox_360)\/.*/i;
var regex2 = /\/(blog|who|share|all|popular\/.*|upcoming)|\?(t|offset)=.*\/?$/

for(var i = 0; i < a.length; i++) {
	if (diggregex.test(a[i]) && !regex2.test(a[i])) {
		a[i].href += '/all'
	}
}
try {
	(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
} catch (ex) {}
})();