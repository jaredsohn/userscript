// Browse Like a Brit
// version 1.0
// 6/3/2012
// Based on a script by Alderin, currently written with LL in mind.
// ==UserScript==
// @name           Browse Like a Brit!
// @namespace      Browse like a Brit!
// @description    Pip Pip Cheerio
// @include        *
// ==/UserScript==
replacements = {
	
	"\\bperiod\\b": "full stop",
	"\\bminutes\\b": "minutes time",
	"\\bseason\\b": "series",
	"\\bblowjob\\b": "lickysucky",
	"\\bmath\\b": "maths",
	"\\bsex\\b": "buggery",
	"\\bTopic List\\b": "Pip Pip Cheerio",
	"\\bthanks\\b": "cheers old chap",
	"\\bcar\\b": "go machine",
	"\\bmake fun\\b": "take the piss",
	"\\bcig\\b": "fag",
	"\\bcigarette\\b": "fag",
	"\\bglass\\b": "buttered glass",
	"\\bgood\\b": "spiffing",
	"\\bEngland\\b": "Britland",
	"\\bmom\\b": "dearest mother",
	"\\bcool\\b": "simply wizard",
	"\\banime\\b": "drawiemovie",
	"\\bTV\\b": "movie box",
	"\\bz\\b": "zed",
	"\\bmasturbating\\b": "wanking",
	"\\bbad\\b": "bloody awful",
	"\\bass\\b": "bumbum",
	"\\bdrug\\b": "swallowbetter",
	"\\bthe shit\\b": "spiffing",
	"\\bcancer\\b": "hurtyswellswell",
	"\\bTag\\b": "Back in a bit old sport",
	"\\bHelp\\b": "I do appear to be in a spot of bother",
	"\\bAvatar\\b": "pictureID",
	"\\bmod\\b": "old bill",
	"\\bshitty\\b": "bloody awful",
	"\\bmarket\\b": "barter-doodle",
	"\\bnever\\b": "not bloody likely",
	"\\bcounter\\b": "anti",
	"\\bdad\\b": "dearest father",
	"\\bcop\\b": "bobby",
	"\\bbeer\\b": "fuzzydrink",
	"\\bpolice\\b": "bobbies",
	"\\blightbulb\\b": "ceiling-bright",
	"\\bchips\\b": "crispycrunchies",
	"\\bcoupon\\b": "clippysnip",
	"\\bmail\\b": "post",
	"\\bPost New Message\\b": "Have your say",
	"\\bambulance\\b": "hurtywheels",
	"\\bfootball\\b": "roughysports",
	"\\bsoccer\\b": "football",
	"\\bkeyboard\\b": "klackytype",
	"\\blike\\b": "jolly well fond of",
	"\\btruck\\b": "lorry",
	"\\bbasketball\\b": "loopyswoop",
	"\\bbanana\\b": "peelyfruit",
	"\\bboss\\b": "guvna",
	"\\bfork\\b": "prickystab",
	"\\bruins\\b": "roo-ins",
	"\\bcondom\\b": "sexystopper",
	"\\bmicrowave\\b": "spinnyheat",
	"\\bguitar\\b": "strummybox",
	"\\bmusic\\b": "hearingsounds",
	"\\bbin\\b": "wheeliebin",
	"\\byogurt\\b": "yoggyyog",
	"\\blaptop\\b": "thinkybox",
	"\\bcomputer\\b": "thinkybox",
	"\\bgrocery\\b": "willerwonks",
	"\\bgroceries\\b": "willerwonks",
	"\\bgas\\b": "petrol",

};
openings = [
	'Avast! ' , 'Yarrr! ' , 'Blimey! ' ,'Ahoy! ' , 'Harrr! ' , 'Aye aye! ' , 
	'Shiver me timbers! ' , 'Arrrr! '
];
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
	paragraph.innerHTML = openings[openingNumber] + paragraph.innerHTML;
	openingNumber++;
	if ( openingNumber == openings.length ) openingNumber = 0;
}
//Thanks to:
//The following for the original script:
//Scott Reynen for the original skeleton
//zoobtoob for hosting
//thegreatsaiyaman fer fixing a good piece of the code
//A shitload of LLers for word ideas
