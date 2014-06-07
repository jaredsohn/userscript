// ==UserScript==
// @name           demonoidsort
// @namespace      demonoidsort
// @description    sets seeds (desc) as default sort
// @include        http://www.demonoid.com/files/*
// @include        http://www.demonoid.me/files/*
// ==/UserScript==

//Sorting preferences
var sortops={
		"date":"",
		"completedDesc":"C",
		"completedAsc":"c",
		"health":"H",
		"leechersDesc":"L",
		"leechersAsc":"l",
		"seedersDesc":"S",
		"seedersAsc":"s",
		"sizeDesc":"B",
		"sizeAsc":"b"
	}
var sortchar=sortops["seedersDesc"];

//\\//\\agic
var redefinitions = document.createElement("script");
redefinitions.type = "application/javascript";
redefinitions.textContent = 
'document.getElementById("category").onchange="document.getElementById('+"\'filters_top\'"+').sort.value='+"\'"+sortchar+"\'"+'; if(sc_drop != undefined){update(this, sc_drop); update(this, q_drop); update(this, l_drop); build_rss_link();}"\n'
+'document.getElementById("category").onkeyup="document.getElementById('+"\'filters_top\'"+').sort.value='+"\'"+sortchar+"\'"+'; if(sc_drop != undefined){update(this, sc_drop); update(this, q_drop); update(this, l_drop); build_rss_link();}"\n'
+'if (document.getElementById("filters_top").sort.value == "")\n'
+'	document.getElementById("filters_top").sort.value="'+sortchar+'";\n';
document.body.appendChild(redefinitions);
