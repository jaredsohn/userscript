// Browse Like a Pirate
// version 3.1
// 4/9/2008
// by Alderin, currently written with LL in mind.

// ==UserScript==

// @name           Browse Like a Pirate!

// @namespace      Browse like a pirate!

// @description    Yarr, browse th' seven seas

// @include        *

// ==/UserScript==

replacements = {
	
	"\\babout\\b": "'bout",
	"\\ba lot\\b": "mightily",
	"\\bam\\b": "be",
	"\\bamputee\\b": "peg leg",
	"\\bafraid\\b": "lily-livered",
	"\\band\\b": "an'",
	"\\baround\\b": "'round",
	"\\battack\\b": "pillage",
	"\\battacked\\b": "raped and pillaged",
	"\\barrest\\b": "keelhaul",
	"\\bAIDS\\b": "scurvy",
	"\\baids\\b": "scurvy",
	"\\bATTN\\b": "AVAST",

	"\\bbad\\b": "scurvy",
	"\\bbeer\\b": "grog",
	"\\bvodka\\b": "grog",
	"\\bban him\\b": "make him walk the plank",
	"\\bcar\\b": "ship",
	"\\bBAN HIM\\b": "Make him walk the plank!",
	"\\bBan him\\b": "Make him walk the plank",
	"\\bBAN HIS ASS\\b": "To the plank with the scurvy mutt!",

	"\\bale\\b": "grog",
	"\\bbetween\\b": "betwixt",
	"\\bwhiskey\\b": "grog",
	"\\bbeauty\\b": "gov'nor's daughter",
	"\\bbefore\\b": "'ere",
	"\\bbanned\\b": "forced t' walk the plank",
	"\\bbetween\\b": "'tween",
	"\\bboy\\b": "jim lad",
	"\\bboys\\b": "jim lads",
	"\\bbought\\b": "pilfered",
	"\\b4chan\\b": "House o' Bilge Rats",
	"\\b/b/\\b": "a shithole",

	"\\bAsia\\b": "Th' Mystic East",
	"\\bJapan\\b": "Th' Mystic East",
	"\\bChina\\b": "Th' Mystic East",
	"\\bKorea\\b": "Th' Mystic East",
	"\\basia\\b": "Th' Mystic East",
	"\\bjapan\\b": "Th' Mystic East",
	"\\bchina\\b": "Th' Mystic East",
	"\\bkorea\\b": "Th' Mystic East",
	"\\bIndia\\b": "Hindustan",
	"\\bIsrael\\b": "Th' Holy Lands",
	"\\bindia\\b": "Hindustan",
	"\\bisrael\\b": "Th' Holy Lands",
	"\\bIraq\\b": "Th' Ottoman Empire",
	"\\bIran\\b": "Th' Ottoman Empire",
	"\\bPakistan\\b": "Th' Ottoman Empire",
	"\\bAfghanistan\\b": "Th' Ottoman Empire",
	"\\biraq\\b": "Th' Ottoman Empire",
	"\\biran\\b": "Th' Ottoman Empire",
	"\\bpakistan\\b": "Th' Ottoman Empire",
	"\\bafghanistan\\b": "Th' Ottoman Empire",
	"\\bAfrica\\b": "Th' Dark Continent",
	"\\bafrica\\b": "Th' Dark Continent",

	"\\bcheat\\b": "hornswaggle",
	"\\bchild porn\\b": "Ancient Hawaiian Secrets",
	"\\bChild Porn\\b": "Ancient Hawaiian Secrets",
	"\\bchild Porn\\b": "Ancient Hawaiian Secrets",
	"\\bcp\\b": "Ancient Hawaiian Secrets",
	"\\porn\\b": "bawdy pictures",
	"\\bchild\\b": "wee one",
	"\\bchildren\\b": "wee ones",
	"\\bcoffee\\b": "grog",
	"\\bcondemn\\b": "keelhaul",
	"\\btouch yourself\\b": "jangle yer danglies",
	"\\bmasturbate\\b": "jangle the danglies",
	"\\bfap\\b": "jangle the danglies",
	"\\bfapping\\b": "jangling the danglies",
	"\\bmasturbating\\b": "jangling the danglies",

	"\\bconference\\b": "parlay",
	"\\bcrazy\\b": "addled",
	"\\bjapanophile\\b": "scurvy mutt",
	"\\bweeaboo\\b": "scurvy mutt",
	"\\boh shit\\b": "shiver me timbers!",
	"\\bover\\b": "o'er", 
	"\\bThe Token Shop\\b": "Honest Jack's Swag Shop", 
	"\\bToken Shop\\b": "Honest Jack's Swag Shop", 

	"\\bdamn\\b": "damn'ed",	
	"\\bdevil\\b": "Davy Jones",	
	"\\bdie\\b": "head to Davy Jones' Locker",	
	"\\bdead\\b": "'n Davy Jones' Locker",
	"\\bdoesn't\\b": "don't",
	"\\bdollars\\b": "pieces o' eight",
	"\\beveryone\\b": "all hands",
	"\\beyewear\\b": "eye patch",
	"\\bglasses\\b": "eye patches",
	"\\bfight\\b": "duel",
	"\\bgreatly\\b": "mightily",
	"\\bgold\\b": "dubloons",
	"\\bha\\b": "har har",
	"\\bhaha\\b": "har har",
	"\\bbase\\b": "port",
	"\\bfort\\b": "port",
	"\\bhah\\b": "har har",
	"\\bheh\\b": "har har",
	"\\bHa\\b": "Har har",
	"\\bflag\\b": "Jolly Roger",
	"\\bhouse\\b": "shanty",
	"\\bhomo\\b": "cabin boy",
	"\\bidiot\\b": "bilge rat",

	"\\bhit\\b": "flog",
	"\\btorrents\\b": "Blackbeard's treasure ",
	"\\btorrent\\b": "Blackbeard's treasure",
	"\\bllers\\b": "mateys",
	"\\bjk\\b": "it be a joke, matey",
	"\\bLLers\\b": "fellow pirates",
	"\\bLlamaGuy\\b": "Th' Good Cap'n",	
	"\\bller\\b": "fellow pirate",	
	"\\bLLer\\b": "Fellow Pirate", 
	"\\bluelinker\\b": "fellow pirate",	
	"\\bLUELinker\\b": "Fellow Pirate", 
	"\\bLUElinker\\b": "fellow pirate",	
	"\\bLuelinkr\\b": "fellow pirate", 
	"\\bluelinks\\b": "Isla de Muerta", 
	"\\bLueLinks\\b": "Isla de Muerta", 
	"\\bLUELinks\\b": "Isla de Muerta", 
	"\\bLUElinks\\b": "Isla de Muerta", 
	"\\bLuelinks\\b": "Isla de Muerta", 
	"\\bnueser\\b": "sprog",
	"\\bnuesers\\b": "sprogs",
	"\\bNUEsers\\b": "sprogs",
	"\\bNUEser\\b": "sprog",
	"\\bn00b\\b": "landlubber", 
	"\\bnoob\\b": "landlubber", 
	"\\btroll\\b": "blowhard",
	"\\bdrive\\b": "sail",
	"\\bbastard\\b": "scurvy dog",
	"\\bcoins\\b": "pieces o' eight",
	"\\bcorrect\\b": "right an' true",


	"\\bfly\\b": "sail",
	"\\bfool\\b": "squiffy",
	"\\bfoolish\\b": "addled",
	"\\bfor\\b": "fer",
	"\\bFor\\b": "Fer",
	"\\bfriend\\b": "matey",
	"\\bfriends\\b": "hearties",
	"\\bgirl\\b": "lass",
	"\\bex-girlfriend\\b": "festerin' harlot",
	"\\bex girlfriend\\b": "festerin' harlot",
	"\\bAkujin Kumo\\b": "Alderin",
	"\\bgood\\b": "worthy",
	"\\byou're\\b": "yer",	
	"\\byour\\b": "yer", 

	"\\bhello\\b": "ahoy",
	"\\bHello\\b": "Ahoy",
	"\\bhey\\b": "avast!",
	"\\bHey\\b": "Avast",
	"\\bhey\\b": "avast!",
	"\\bhi\\b": "ahoy",	
	"\\bHi\\b": "Ahoy",	
	"\\bHiya\\b": "Ahoy",	
	"\\bhiya\\b": "ahoy",	
	"\\bmoney\\b": "booty",	
	"\\bguy\\b": "feller",	
	"\\bfellow\\b": "feller",
	"\\bidiot\\b": "scalawag",
	"\\ing\\b": "in'",
	"\\bin\\b": "'n",
	"\\bis\\b": "be",
	"\\bit's\\b": "'tis",
	"\\bit is\\b": "'tis",
	"\\bkid\\b": "wee one",
	"\\bkids\\b": "wee ones",
	"\\bkill\\b": "keelhaul",

	"\\bis not\\b": "be not",
	"\\baren't\\b": "be not",
	"\\bare\\b": "be",
	"\\bam\\b": "be",
	"\\bAre\\b": "Be",
	"\\blol\\b": "yo ho ho!",
	"\\blolol\\b": "Me sides be splittin'!",
	"\\bodd\\b": "addled",
	"\\bof\\b": "o'",
	"\\bohmigod\\b": "begad!",
	"\\bomigod\\b": "begad!",
	"\\bomg\\b": "begad!",
	"\\bOMG\\b": "BEGAD!",
	"\\bo rly\\b": "be that right, sailor?",
	"\\borly\\b": "be that right, sailor?",
	"\\bya rly\\b": "Sailor, 'tis true",
	"\\byarly\\b": "Sailor, 'tis true",
	"\\bwhoamg\\b": "shiver me timbers!",

	"\\bmoney\\b": "booty",
	"\\bmy\\b": "me",
	"\\bprosecute\\b": "keelhaul",
	"\\bpants\\b": "britches",
	"\\bParis Hilton\\b": "addled harlot",
	"\\bparis hilton\\b": "addled harlot",
	"\\bHello\\b": "Ahoy!",	
	"\\bquick\\b": "smart",
	"\\bquickly\\b": "smartly",
	"\\bthe rules\\b": "the Pirate's Code",
	"\\bnice\\b": "fine",
	"\\bthe Internet\\b": "The Seven Seas",
	"\\bThe Internet\\b": "The Seven Seas",
	"\\binternet\\b": "Seven Seas",

	"\\bsilly\\b": "addled",
	"\\bsword\\b": "cutlass",
	"\\bkatana\\b": "little boy's penis",
	"\\bkatanas\\b": "baby dicks",
	"\\bshe\\b": "the lass",
	"\\bshut up\\b": "pipe down",
	"\\bspeech\\b": "parlance",
	"\\bsteal\\b": "commandeer",
	"\\bdownload\\b": "plunder",

	"\\bsexy\\b": "saucy",
	"\\btelescope\\b": "spyglass",
	"\\bterrorist\\b": "scourge o' the seven seas",
	"\\bterrorists\\b": "scalawags",
	"tion\\b": "tin'",
	"\\bthere\\b": "thar",
	"tions\\b": "tin's",
	"\\bto\\b": "t'",
	"\\btomorrow\\b": "the morrow",
	"\\btruck\\b": "vessel",
	
	"\\bwasn't\\b": "weren't",
	"\\bwant to\\b": "wish t'",
	"\\bwanna\\b": "wish t'",
	"\\bYep\\b": "Aye",	
	"\\byep\\b": "aye",	
	"\\bwoman\\b": "buxom beauty",
	"\\bwomen\\b": "wenches",
	"\\bwin\\b": "triumph",
	"\\bwins\\b": "triumphs",
	"\\bwork\\b": "deck swabbing",
	"\\bwine\\b": "grog",
	"\\byes\\b": "aye",
	"\\bYes\\b": "Aye",
	"\\bno\\b": "nay",
	"\\bNo\\b": "Nay",
	"\\bnah\\b": "nay",
	"\\bNah\\b": "Nay",
	"\\bYeah\\b": "Aye",
	"\\byeah\\b": "Aye",

	"\\byou\\b": "ye",
	"\\byour\\b": "yer",
	"\\bXD\\b": "HAR HAR",
	"\\bXFD\\b": "YO HO HO HO!",
	"\\bxd\\b": "yo ho ho",
	"\\bwtf\\b": "what devilry!",
	"\\bWTF\\b": "Begad, what devilry be is?!",
	"\\bXD\\b": "Yo ho ho!",
	"\\bxd\\b": "Yo ho ho!",
	"\\becks dee\\b": "Yo ho ho!",
	"\\blueshi\\b": "Jolly Roger",
	"\\bFacebook\\b": "PirateBook",
	"\\bIsla de Muerta.net/\\b": "luelinks.net/",
	"\\bThis message was deleted at the request of the original poster\\b": "This here message be taken back by a yellow-bellied pirate",
	"\\bThis message has been deleted by a LUElinks moderator\\b": "This poor soul had a run-in with the authorities",
	"\\bGood Tokens\\b": "Pieces o' Eight",
	"\\bBad Tokens\\b": "Black Marks",
	"\\byou're\\b": "yer",
	"\\bYou're\\b": "Yer",
	"\\bwins\\b": "triumphs",	


	"\\bHome|/ \\b": "Haven",
	"\\bAdd a link|/ \\b": "Add plunder",
	"\\bRandom link|/ \\b": "Who needs maps?",
	"\\bTop rated links|/ \\b": "Quality grog",
	"\\bLinks o' the week|/ \\b": "Modern fashions",
	"\\bWiki|/ \\b": "Wikis",
	"\\bAll links|/ \\b": "All th' plunder",
	"\\bFavorites|/ \\b": "Treasures",
	"\\bSearch|/ \\b": "Scour",
	"\\bStats|/ \\b": "Specs",
	"\\bBoards|/ \\b": "Th' Tavern",
	"\\bUser List|/ \\b": "Roster",
	"\\bLogout|/ \\b": "Retreat",
	"\\bHelp|/ \\b": "Aid",
	"\\bBoard List|/ \\b": "Port",
	"\\bCreate New Topic|/ \\b": "Parley",
	"\\bPost New Message|/ \\b": "Parley",
	"\\bNext Page|/ \\b": "Next Map",
	"\\bTagged|/ \\b": "X'd",
	"\\bTag|/ \\b": "X",




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
//Scott Reynen for the original skeleton
//zoobtoob for hosting
//thegreatsaiyaman fer fixing a good piece of the code
//A shitload of LLers for word ideas
