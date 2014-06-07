// Weasel Link-age
// Version 2.0
// Original 5.3.2009 / Revised 12.30.10
// by Nate & Michelle (two crusty buds)

// ==UserScript==
// @name           Weasel Link-age
// @namespace      Weasel Link-age
// @description    Make the web kil-ler!  Don't weeze the juice!
// @include        *
// ==/UserScript==

replacements = {
	

	" ass ": " cheeks ", " Ass ": " Cheeks ",
	" because ": " 'cause ", " Because ": " 'Cause ",
	" big ": " ma-jor ", " Big": " Ma-jor",
	" bigger ": " ma-jor ", " Bigger ": " Ma-jor",
	" biggest ": " mega ma-jor ", " Biggest ": " Mega ma-jor",
	" boobs ": " cones ", " Boobs ": " Cones ",
	" butt ": " cheeks ", " Butt": " Cheeks ",
	" car ": " wheels ",
	" chew ": " gnaw ",
	" clothes ": " gear ",
	" cool ": " buff ",
	" cooler ": " buf-fer ",
	" coolest ": " mega buff ",
	" crazy ": " loose ",
	" die ": " splatter ",
	" dinner ": " grindage ",
	" dirty ": " crusty ",
	" dollar ": " single ", " dollars ": " clams ",
	" ears ": " lobes",
	" eat ": " munch ",
	" face ": " mug ",
	" female ": " nug-havin' ",
	" fire ": " flamage ",
	" food ": " grindage ",
	" friend": " bud", " Friend": "Bud",
	" friends": "buds", " Friends": "Buds",
	" girl ": " betty ",
	" good ": " rad ", " Good ": " Rad ",
	" hair ": " mop ",
	" happy ": " stoked ",
	" head ": " mel on ",
	" home ": " pad ",
	" house ": " pad ",
	" ignore ": " shine ",
	" ignores ": " shines ",
	"ing ": "-in' ",
	" in trouble ": " tweaked ",
	" look at ": " check ",
	" lunch ": " grindage ",
	" mad ": " edged ",
	" money ": " fundage ",
	" mouth ": " gills ",
	" nuts ": " nugs ",
	" post ": " chirp ", " Post ": " Chirp ",
	" relax ": " stress less ",
	" sad ": " bummed ",
	" send ": " zip ",
	" steal ": " snake ",
	" stole ": " snaked ",
	" stupid ": " bogus ",
	" suck ": " munch ",
	" sucks ": " is greasy ",
	" sucked ": " bit ",
	" talk ": " chirp ",
	" terrible ": " spent ",
	" text ": " textage ",
	" them ": " 'em ",
	" tits ": " gonzagas ",
	" using ": " whizzin' ",
	" very ": " fully ",
	" woman ": " betty ",
	" yay": " killer", " YAY": " KILLER", " Yay": " Killer",
	" Yo ": " Hey, buuuudy ", " yo ": " hey, buuuudy ",

// Facebook

	"Comment": "Chirp",
	"Events": "Happenings",
	"Facebook helps you connect and share with the people in your 

life.": "Facebook is the most stoney crusty place to grease back your 'do 

and chill, buuuuuddy!",
	"Friends": "Buds",
	"Home": "A La Casa",
	" likes this": " digs, buuuuddy",
	"Like": "Dig It",
	"Links": "Linkage", "links": "linkage",
	"News Feed": "Nuh-ews",
	"What's on your mind": "Whatcha think in'",

// ETI

	"FREE]": "SNAKE IT]",
	"MOVIE]": "FLICK]",
	"MUSIC]": "TUNES]",
	"PORN]": "FRESH NUGS]",
	"TV]": "BOOB TUBE]",

	"an cheeks hat": "a creeper",
	"Added by": "Greasy bros/nugs",
	"End of the Internet": "Don't Tax My Gig So Hardcore, Cruster",
	"Fitness": "Tough Guys",
	"Life, the Universe, and Everything": "Life, the Universe, and 

All Stoney Crusty Dudes",
	"Music": "Tunes",
	"Next Page": "More In-fo",
	"Pipe Mania": "Ree-fer Central",
	"Previous Page": "Stress Less, Buuuuudy",
	"Poll of the Day": "Poll Du Jour, Bud",
	"Private Messages": "Messages, BUUUUUUDY!",
	"Rating": "Buff-age",
	"Search": "Rum-mage",
	"Stats": "Num-bers",
	"Top voted": "Most crusty",
	"Wiki": "Wik-ki",

};

var openingNumber = 0;

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
	
	node = textnodes.snapshotItem(i);
	s = node.data;
	
	for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	}

	node.data = s;

}

var paragraphs = document.getElementsByTagName( 'p' );

for ( var i = 0; i < paragraphs.length; i++ )
{

	var paragraph = paragraphs[i];
	paragraph.innerHTML = openings[openingNumber] + 

paragraph.innerHTML;
	openingNumber++;
	if ( openingNumber == openings.length ) openingNumber = 0;

}

//THANKS FROM THE ORIGINAL SCRIPT:
//Thanks to:
//Scott Reynen for the original skeleton
//zoobtoob for hosting
//thegreatsaiyaman fer fixing a good piece of the code
//A shitload of LLers for word ideas