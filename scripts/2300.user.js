// ==UserScript== 
// @name          Melon's Censor
// @namespace     none
// @description   Censors swear words, turning them into asterisks (*)
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
		"Ass hole" : "*****",
		"Asshole" : "*****",
		"Ass-hole" : "*****",
		" Ass " : " ***** ",
		"ASSHOLE" : "*****",
		"ASS HOLE" : "*****",
		"ASS-HOLE" : "*****",
		" ASS " : " ***** ",
		" Ass!" : " *****!",
		" Ass," : " *****,",
		
		
		// B
		"Ballsack" : "*****",
		"Bastard" : "*****",
		"Son of a bitch" : "*****",
		"Bitchy" : "*****",
		"Bitched" : "*****",
		"Bitching" : "*****",
		"SON OF A BITCH" : "*****",
		"BITCHY" : "*****",
		"BITCHED" : "*****",
		"BITCHING" : "*****",
		"BASTARD" : "*****",
		"BALLSACK" : "*****",
		"Bitches" : "*****",
		"Bitch" : "*****",
		"BITCHES" : "*****",
		"BITCH" : "*****",
		
		// C
		
		// D
		"Goddamn" : "*****",
		"God damn" : "*****",
		"Damnit" : "*****",
		"Dickhead" : "*****",
		"dick" : "*****",
		"DICK" : "*****",
		"GOD DAMN" : "*****",
		"GODDAMN" : "*****",
		"DICKHEAD" : "*****",
		"Damn" : "*****",
		"DAMN" : "*****",
		
		// E
		
		// F
		"Faggot" : "*****",
		"Fucking" : "*****",
		"Fucken" : "*****",
		"Fucked" : "*****",
		"Fucker" : "*****",
		"FAGGOT" : "*****",
		"FUCKING" : "*****",
		"FUCKEN" : "*****",
		"FUCKED" : "*****",
		"FUCKER" : "*****",
		"Motherfucker" : "*****",
		"Fuck" : "*****",
		"FUCK" : "*****",
		
		// G
		
		// H
		
		// I
		
		// J
		"Jackass/c" : "*****",
		
		// K
		
		// L
		"Lmao" : "Rofl",
		"Lmfao" : "Rofl",
		"LMAO" : "ROFL",
		"LMFAO" : "ROFL",
		
		// M
		
		// N
		"Niggaz" : "*****",
		"Nigger" : "*****",
		"Nigga" : "*****",
		"NIGGAZ" : "*****",
		"NIGGER" : "*****",
		"NIGGA" : "*****",
		
		// O
		
		// P
		"Pussy cat/c" : "*****",
		"Pussycat/c" : "*****",
		
		// Q
		
		// R
		
		// S
		"Shit" : "*****",
		
		// T
		"THE HELL" : "THE HECK",
		"the Hell" : "the Heck",
		
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
		"asshole" : "*****",
		"ass hole" : "*****",
		"ass-hole" : "*****",
		" ass " : " ***** ",
		" ass!" : " *****!",
		" ass," : " *****,",
		"asshat" : "*****",
		"dumbass" : "*****",
		"smartass" : "smart",
		"badass" : "bad",
		"lameass" : "lame",
		
		
		// B
		"ballsack" : "*****",
		"bastard" : "*****",
		"son of a bitch" : "*****",
		"bitchy" : "*****",
		"bitched" : "*****",
		"bitching" : "*****",
		"bitches" : "*****",
		"bitch" : "*****",
		"blowjob" : "*****",
		
		// C
		"cock sucker" : "*****",
		"cocksucker" : "*****",
		"cunt" : "*****",
		
		// D
		"goddamn" : "*****",
		"god damn" : "*****",
		"dammit" : "*****",
		"damnit" : "*****",
		"damn" : "*****",
		"douche" : "*****",
		"dinglebetty" : "*****",
		"dirty sanchez" : "*****",
		"dickhead" : "*****", 
		
		// E
		
		// F
		"faggot" : "*****",
		"motherfucker" : "*****",
		"fucking" : "*****",
		"fucken" : "*****",
		"fucked" : "*****",
		"fucker" : "*****",
		"fuck you" : "*****",
		"fuck": "*****",
		"wtf" : "*****",
		"rtfm" : "rtm",
		"rtfa" : "rta",
		"stfu" : "*****",
		
		// G
		
		// H
		"what the hell" : "what the heck",
		
		// I
		
		// J
		"jackass" : "*****",
		"jackoff" : "*****",
		"jerkoff" : "*****",
		"jizz" : "*****",
		
		// K
		
		// L
		"lmao" : "rofl",
		"lmfao" : "rofl",
		
		// M
		"muff diving" : "*****",
		
		// N
		"niggaz" : "*****",
		"nigger" : "*****",
		"nigga" : "*****",
		
		// O
		
		// P
		"pussy cat" : "*****",
		"pussycat" : "*****",
		"pussy " : "*****",
		"free porn" : "*****",
		"porn/r" : "*****",
		"pihb" : "*****",
		
		// Q
		"queef" : "*****",
		
		// R
		
		// S
		"anonymous sex" : "*****",
		"skin flute" : "*****",
		"shit" : "*****",
		
		
		// T
		"the hell" : "the heck",
		" tits " : "*****",
		" tit " : "*****",
		" tits," : "*****,",
		" tit," : "*****,",
		" tits!" : "*****!",
		" tit!" : "*****!",
		"twat" : "*****",
		
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
