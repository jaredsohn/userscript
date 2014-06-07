// ==UserScript==
// @name		GoldS's Script
// @description		Does stuff
// @include *127.0.0.1*
// @include *kingdomofloathing.com*
// ==/UserScript==

var paragraphs = document.getElementsByTagName("blockquote");
var names = document.getElementsById("monname");
var thePath = document.location.pathname;
var str1 = "This is an Orcish Frat Boy. He really, really likes paddling new pledges and making them dress in women's underwear. Not that there's anything wrong with that.";
var str2 = "This is an Orcish Frat Boy. This frat boy is still a pledge, and thus must wear a French Maid's outfit and dust the frathouse (when you think dust, think Pledge).";
var str3 = "This is an Orcish Frat Boy. He likes beer, hot Sorority Orcs, and music that combines rap with heavy metal. He doesn't get hit nearly often enough -- perhaps you can rectify that.";

if (thePath == "/adventure.php?snarfblat=27") {
	for(i in paragraphs) {
		if(paragraphs[i].indexOf(str1) != -1 || paragraphs[i].indexOf(str2) != -1 || paragraphs[i].indexOf(str3) != -1 ) {
			for(j in names) {
				if(names[j].indexOf("Orcish Frat Boy") != -1) {
					names[j].innerHTML = "<font color=\"red\">an Orcish Frat Boy</font>"
				}
			}
		}
	}
}