// ==UserScript== 

// Slapped together by that fresh water sea gherkin Maddieman
// ..Based on THIS IS MY PIG by jessamyn
// ....Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey",
// ......based off another script based off that

// Radiohead shoutbox for testing and general last.fm lexicon

// @name          Thundering Typhoons!
// @namespace     http://userscripts.org/userscripts
// @description   Acting the goat
// @include        http://www.last.fm/*
// @include        http://www.youtube.com/*
 
// ==/UserScript== 

(function() {
    var replacements, regex, key, textnodes, node, s; 

    replacements = { 

        "a shit": "a thundering typhoon",

	"wtf": "wtbb",

	"goddamn": "by thunder",
	"damnit": "by thunder",
	"dammit": "by thunder",
	"damn it": "by thunder",
	"damned": "thundering",
	"damn": "thunder",

	"Dang it": "By thunder",
	"dang it": "by thunder",
	"dang": "thunder",

	"God ": "Nanny Goat ",
	"jesus christ": "Ten Thousand Thundering Typhoons",
	"lmfao": "Billions of bilious blue blistering barnacles!",
	"lmao": "blue blistering barnacles!",
	"lol": "blistering barnacles!",
	"GTFO": "stop acting the goat!",	

	"Lawl": "Boneheads!",
	"lawl": "Boneheads!",

	"sucking": "blistering",
	"sucks": "blisters",
	"suck": "blister",
	"Suck": "Blister",

	"arrogant": "odd-toed",

        "bullshit": "ten thousand thundering typhoons!",
	"shitty": "thundering",
        "Shit": "Sea-lice",
        "shit": "sea-lice",

        "Crap": "Swine",
        "crap": "swine",

	"FUCK YOU": "MISERABLE BLUNDERING BARBECUED BLISTER...",
	"fuck you": "miserable blundering barbecued blister...",
	"fuck off": "stop acting the goat",

        "FUCKING": "ROTTEN",
        "Fucking": "Prize",
        "fucking": "freshwater",
	"fuking": "carpathian",
	"motherfucker": "macrocephalic baboon", 
	"fucker": "duck-billed platypus",
	"fucks": "bashi-bazouks",
        "Fuck": "Thundering typhoons",
        "fuck": "goat",

	"Cumming": "Thundering",
	"cumming": "thundering",

	" Cum": " Thunder",
	" cum": " thunder",

	"swag": "barnacles",
	"butthurt": "acting the goat",
	"crying": "acting the goat",
	"Crying": "Acting the goat",
 
	"Penises": "Barnacles",
	"penises": "barnacles",
	"Penis": "Barnacle",
	"penis": "barnacle",
	"Cocks": "Barnacles",
	"cocks": "barnacles",
	"Cock": "Barnacle",
	"cock": "barnacle",
	"Dicks": "Barnacles",
	"dicks": "barnacles",
	"Dick": "Barnacle",
	"dick": "barnacle",
	" Anus": " Barnacle",
	" anus": " barnacle",
	" Anal": " Barnacle",
	" anal": " barnacle",

        "faggots": "vegetarians",
	"Niggas": "Two-timing Troglodytes",
	"niggas": "two-timing troglodytes",
        "Niggers": "Raggle taggle ruminants",
        "niggers": "raggle taggle ruminants",
        "Nigger": "Pithecanthropus",
        "nigger": "pithecanthropus",

	"dildos": "Brontosaurus",

	"hating": "squawking",
	"haters": "hydrocarbons",
	"Haters": "Highwaymen",

	"Bros ": " Bald-headed budgerigars ",
	"bros ": "bagpipers ",
	"Bro ": "Baboon ",
	"bro ": "baboon ",
	"Brostep": "Baboonstep",
	"brostep": "baboonstep",

	" Jews": " Jellyfish",
	" jews": " jellyfish",
	" Jew": " jellyfish",
	" jew": " jellyfish",

        "fanboys": "freshwater swabs",
        "fanboy": "filibuster",

        "retard": "rapscallion",
       	"tard": "numbskull",
        "moron": "sea-gherkin",
	"nigger": "prattling porpoise",
	"faggot": "breathalyser",

        "Fags": "Abominable Snowmen",
        "fags": "addle-pated lumps of anthracite",
        "Fag": "Anthropithecus",
        "fag": "anthropophagus",

	" trolling": " squawking",
	" trolls": " prize purple jelly-fishes",
	" troll": " thundering son of a sea-gherkin",

	"crybaby": "cannibal",

	"Hipsters": "Fancy-dress freebooters",
	"hipsters": "fancy-dress freebooters",
	"Hipster": "Fancy-dress freebooter",
	"hipster": "fancy-dress freebooter",

	" homo": " megalomaniac",
	" bitch": " aardvark",
	" whore": " cockatoo",
	"asshole": "ectoplasmic byproduct",
	" massive": " thundering",

	" ass ": " ectoplasm ",

	"pussies": "patagonians",
	"Pussy ": "Pickled herring ",
	"pussy ": "pachyrhizus ",

	"sell out": "act the goat",
	"SELLOUTS": "SAVAGES",
	"Sellouts": "Savages",
	"sellouts": "savages",
	"sellout": "savage",

	"Cunts": "Cushion footed quadrupeds",
	"cunts": "cushion footed quadrupeds",
	"Cunt": "Crabapple",
	"cunt": "crabapple",

	"posers": "pockmarks",
	"poser": "pockmarks", 

	"stupid": "nitwitted",
	"dumb ": "dunderheaded ", 
	"lame": "confounded", 
	"Gays": "Guano-gatherers",
	"gays": "guano-gatherers",
	" gay ": " puffed up ",
	" Gay ": " Puffed up "

    }; 

    regex = {}; 
    for (key in replacements) { 
        regex[key] = new RegExp(key, 'g'); 
    } 

    textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

    for (var i = 0; i < textnodes.snapshotLength; i++) { 
        node = textnodes.snapshotItem(i); 
        s = node.data; 
        for (key in replacements) { 
            s = s.replace(regex[key], replacements[key]); 
        } 
        node.data = s; 
    } 

})();