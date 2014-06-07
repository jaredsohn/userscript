// ==UserScript== 
// @name          DataMate
// @namespace     none
// @description   stuff (*)
// @include       *
// ==/UserScript==



//          From Jmaxxz vulgar word blocker v3.00.00, from which this script is derived:                //
/*********************************************************************************************************
* If you plan on editing this script and publishing your own version lines [11] through [18] must be     *
* included somewhere in your source code somewhere between lines 1 and 40.                               *
*                                                                                                        *
* Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey"                                  *
* The Jmaxxz Vulgar Word Blocker can be found at: http://userscripts.org/scripts/show/2287               *
* A Special thank you goes to rschultz2002 and Giorgio Maone for their help in the making of this script *
*********************************************************************************************************/




////////////////////////////////////////////////////////////////
// WARNING: Code contains words that many consider offensive. //
// If you do not wish to see them, do not scroll down.        //
// To add a custom list of words, see instructions below.     //
////////////////////////////////////////////////////////////////































(function()
{
	var bad = [], good = [], modifiers = [];
	
	// START CONFIGURATION
	
	populate
	({
		// This list is case SENSITIVE, i.e. uppercase and lowcase are treated differently
		
		// Terms are listed as comma separated couples of words, in the form
		// "Bad word": "replacement"
		// You can place an optional modifier after a slash ("/") at the end of the bad word.
		// The support modifier "n", stands for new
		// it does not change how the word is handled by the script,
		// rather it is just so the developer know what he/she has changed in the latest build
		// incase something goes wrong
		
		
		// [Place custom word list below, see below for examples]
		
		// A

		
		// B

		
		// C

		
		// D


		
		// E
		
		// F

		
		// G
		
		// H
		
		// I
		
		// J
		
		// K
		
		// L

		
		// M
		
		// N

		
		// O
		
		// P


		// Q
		
		// R
		
		// S
	
		
		// T

		
		// U
		
		// V
		
		// W
		
		// X
		
		// Y
		
		// Z
		
		// [End of custom word list]
	}, "g");
	
	populate
	({
		// This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same.
		
		// Terms are listed as comma separated couples of words, in the form
		// [Place custom word list below]
		
		// A
		"asshole" : "stinky balloon knot",
		"ass hole" : "stinky balloon knot",
		"ass-hole" : "*****",
		" ass " : "hinney",
		" ass!" : " *****!",
		" ass," : " *****,",
		"asshat" : "*****",
		"dumbass" : "genius",
		"smartass" : "dolt",
		"badass" : "bad",
		"lameass" : "lame",
		"army" : "army where i lost my manhood",
		
		// B
		"ballsack" : "coin purse",
		"bastard" : "bass tard",
		"son of a bitch" : "son of a bagloobee globby",
		"bitchy" : "awesome",
		"bitched" : "gave me a good lecture",
		"bitching" : "giving me awesome advice",
		"bitches" : "idiotic females. all of you",
		"bitch" : "retard. women. who needs those idiots?",
		"blowjob" : "rusty trumbone with a buttplug too match",
		
		// C
		"cock sucker" : "gobstopper",
		"cocksucker" : "gobstopper",
		"cunt" : "nasty hole",
		"cock" : "Tiny little crooked weiner",
		
		// D
		"goddamn" : "gods below!",
		"god damn" : "god blessed",
		"dammit" : "bless it",
		"damnit" : "bless it",
		"damn" : "blessed",
		"douche" : "popsicle",
		"dinglebetty" : "*****",
		"dirty sanchez" : "*****",
		"dickhead" : "mulleted avenger", 
		"dick" : "tiny little crooked wiener",
		
		// E
		
		// F
                "FAT BOY WIGGLE STICK" : "FAT BOY CROOKED STICK",
		"faggot" : "sexy boy with a mustache'",
		"motherfucker" : "mother lover",
		"fucking" : "fun loving",
                "fuckin" : "fun loving",
		"fucken" : "*****",
		"fucked" : "frazzle dazzled",
		"fucker" : "gardener",
		"fuck you" : "here's a tip",
		"fuck": "fudge",
		"wtf" : "hiel hitler das fuhrer?",
		"rtfm" : "rtm",
		"rtfa" : "rta",
		"stfu" : "*****",
		
		// G
		
		// H
		"what the hell" : "what the hoozie hozzle?",
		
		// I
		
		// J
		"jackass" : "democrat",
		"jackoff" : "polish hot dog eating trophies",
		"jerkoff" : "polish hot dog eating trophies",
		"jizz" : "pearly white duds",
		
		// K
		
		// L
		"lmao" : "rofl",
		"lmfao" : "rofl",
		
		// M
		"muff diving" : "*****",
		
		// N
		"niggaz" : "*****",
		"nigger" : "nappy african booty scratcher",
		"nigga" : "disgusting black person",
		
		// O
		
		// P
		"pussy cat" : "nice kitty",
		"pussycat" : "weird hat",
		"pussy" : "Big Juicy Penis",
		"Pussy" : "Chocolate Salty Balls",
		"free porn" : "*****",
		"porn/r" : "*****",
		"pihb" : "*****",
		"penis" : "tiny tiny little bitty crooked elf wiener",
		// Q
		"queef" : "*****",
		
		// R
		
		// S
		"anonymous sex" : "*****",
		"skin flute" : "*****",
		"shit" : "baby poop. to eat",
		
		
		// T
		"the hell" : "the heck",
		" tits " : "sagging utters",
		" tit " : "sagging utter",
		" tits," : "*****,",
		" tit," : "*****,",
		" tits!" : "*****!",
		" tit!" : "*****!",
		"twat" : "husband's playground",
		"tattoo" : "stupid looking tattoo",
		
		// U
		
		// V
		
		// W
		"wanker" : "*****",
		
		
		// X
		
		// Y
		
		// Z
		
		// [End of custom word list]
		
	}, "gi");
	
	
	// END CONFIGURATION (don't touch anything below, unless you know what you're doing)
	
	function populate(replacements, flags)
	{
		var word, modPos, mod;
		
		for(var key in replacements)
		{
			if((modPos = key.indexOf("/")) > -1)
			{
				mod = key.substring(modPos + 1);
				word = key.substring(0, modPos);
			}
			else
			{
				mod = "";
				word = key;
			}
			
			modifiers.push(mod);
			bad.push(new RegExp(word, flags));
			good.push(replacements[key]);
		}
	}
	
	// this function does the replacements
	function sanitize(s, noContext, notredirect)
	{
		for (var j = 0; j < bad.length; j++)
		{
			if(noContext && modifiers[j].indexOf("c") != -1 || notredirect && modifiers[j].indexOf("r") != -1)
			{
				continue;
			}
			s = s.replace(bad[j], good[j]);
		}
		return s;
	}
	
	// replace in title
	if(document.title)
		document.title = sanitize(document.title, false , true);
	
	// replace in body text
	var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < textnodes.snapshotLength; i++)
	{
		node = textnodes.snapshotItem(i);
		node.data = sanitize(node.data, false, true);
	}
})();
