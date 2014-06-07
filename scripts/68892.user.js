// ==UserScript== 
// @name Jmaxxz vulgar word blocker (noswearing Mod)
// @namespace none 
// @description Censor the Net, and browse with confidence. edited by CyberFang to use the list from noswearing.com/list.php 
// @include * 
// @version 3.01.04
// @homepage http://userscripts.org/scripts/show/2287





/* 
If you plan on editing this script and publishing your own version lines 9 through 15 must be
included somewhere in your source code somewhere between lines 1 and 40.

Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey" 
The Jmaxxz Vulgar Word Blocker can be found at: http://userscripts.org/scripts/show/2287
A Special thank you goes to rschultz2002 and Giorgio Maone for their help in the making of this script
*/ 
//WARNING
// DO NOT SCROLL DOWN this script contains language that
// may be offensive.
// ==/UserScript==
(function() { 
var bad = [], good = [], modifiers = [];



populate({
// This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same. 

// Terms are listed as comma separated couples of words, in the form 
// [Place custom word list below]

//safe replace (i.e. words which means that the word could be "not evil", but you are just  
//changing it to be on the safe side)


//
//The list was last updated February 13, 2010
//
//To update the list yourself, do the following:
// 1) go to http://www.noswearing.com/list.php
//
// 2) Copy the ENTIRE list on the page into a BLANK notepad file
//   Everything in between the quick navigation links and copyright
//
// 3) Go to "Edit > Replace" in the notepad window.
//
// 4) Replace these certain items, not including the quotes
//        Find: 'Back To Top'
//          Replace: ''
//        Find: ' - '
//          Replace: '": "'
//
// 5) Copy the list and go to http://alphabetizer.flap.tv and paste the list in the textarea. Set the options to:
// Remove Duplicates
// Add to the beginning of each term: "
// Add to the ending of each term: ",
// Maintain List Order (above the ALPHABETIZE button)
//
// 6) hit the alphabetize button. In the new list, there may be a '"",' on the second line, remove the second line.
//
// 7) Replace the list below with the new list.



//////////////////////////////////////////////////
///////////////BEGINNING OF LIST//////////////////
//////////////////////////////////////////////////


"anus": "butt",
"arse": "butt",
"arsehole": "butt",
"ass": "butt",
"ass-hat": "idiot",
"ass-pirate": "homosexual",
"assbag": "idiot",
"assbandit": "homosexual",
"assbanger": "homosexual",
"assbite": "idiot",
"assclown": "butt",
"asscock": "idiot",
"asscracker": "butt",
"asses": "butts",
"assface": "butt",
"assfuck": "rear-loving",
"assfucker": "homosexual",
"assgoblin": "homosexual",
"asshat": "butt",
"asshead": "idiot",
"asshole": "jerk",
"asshopper": "homosexual",
"assjacker": "homosexual",
"asslick": "idiot",
"asslicker": "Buttlicker",
"assmonkey": "idiot",
"assmunch": "idiot",
"assmuncher": "butt",
"assnigger": "Racial Slur",
"asspirate": "homosexual",
"assshit": "idiot",
"assshole": "butt",
"asssucker": "idiot",
"asswad": "butt",
"asswipe": "butt",

//B
"bampot": "idiot",
"bastard": "illegitimate child",
"beaner": "Mexican",
"bitch": "female dog",
"bitchass": "idiot",
"bitches": "female dogs",
"bitchtits": "homosexual",
"bitchy": "mean",
"blow job": "sexual act",
"blowjob": "sexual act",
"bollocks": "male genitalia",
"bollox": "male genitalia",
"boner": "erection",
"brotherfucker": "homosexual",
"bullshit": "poop",
"bumblefuck": "homosexual",
"butt plug": "cork",
"butt-pirate": "homosexual",
"buttfucka": "homosexual",
"buttfucker": "homosexual",

//C
"camel toe": "female genitalia",
"carpetmuncher": "homosexual",
"chinc": "Chinese",
"chink": "asian",
"choad": "male genitalia",
"chode": "small penis",
"clit": "female genitals",
"clitface": "idiot",
"clitfuck": "sexual act",
"clusterfuck": "mess up",
"cock": "penis",
"cockass": "Jerk",
"cockbite": "idiot",
"cockburger": "idiot",
"cockface": "idiot",
"cockfucker": "idiot",
"cockhead": "idiot",
"cockjockey": "homosexual",
"cockknoker": "homosexual",
"cockmaster": "homosexual",
"cockmongler": "homosexual",
"cockmongruel": "homosexual",
"cockmonkey": "idiot",
"cockmuncher": "homosexual",
"cocknose": "idiot",
"cocknugget": "idiot",
"cockshit": "idiot",
"cocksmith": "homosexual",
"cocksmoker": "homosexual",
"cocksucker": "homosexual",
"coochie": "female genitalia",
"coochy": "female genitalia",
"coon": "African American",
"cooter": "vagina",
"cracker": "Caucasian",
"cum": "semen",
"cumbubble": "idiot",
"cumdumpster": "prostitute",
"cumguzzler": "homosexual",
"cumjockey": "homosexual",
"cumslut": "dirty girl",
"cumtart": "idiot",
"cunnie": "female genitalia",
"cunnilingus": "sexual act",
"cunt": "vagina",
"cuntface": "idiot",
"cunthole": "female genitalia",
"cuntlicker": "homosexual",
"cuntrag": "idiot",
"cuntslut": "idiot",

//D
"dago": "Italian",
"damn": "darn",
"deggo": "Italian",
"dick": "penis",
"dickbag": "idiot",
"dickbeaters": "Hands",
"dickface": "idiot",
"dickfuck": "idiot",
"dickfucker": "homosexual",
"dickhead": "phallace face",
"dickhole": "male genitalia",
"dickjuice": "semen",
"dickmilk": "sperm",
"dickmonger": "homosexual",
"dicks": "penises",
"dickslap": "sexual act",
"dicksucker": "homosexual",
"dickwad": "idiot",
"dickweasel": "idiot",
"dickweed": "idiot",
"dickwod": "idiot",
"dike": "homosexual",
"dildo": "sexual toy",
"dipshit": "idiot",
"doochbag": "idiot",
"dookie": "poop",
"douche": "female hygene product",
"douche-fag": "idiot",
"douchebag": "female hygene accessory",
"douchewaffle": "homosexual",
"dumass": "idiot",
"dumb ass": "idiot",
"dumbass": "idiot",
"dumbfuck": "idiot",
"dumbshit": "idiot",
"dumshit": "idiot",
"dyke": "homosexual",

//E

//F
"fag": "homosexual",
"fagbag": "homosexual",
"fagfucker": "homosexual",
"faggit": "homosexual",
"faggot": "homosexual",
"faggotcock": "homosexual",
"fagtard": "homosexual idiot",
"fatass": "a fat person",
"fellatio": "sexual act",
"feltch": "sexual act",
"flamer": "homosexual",
"fuck": "fornicate",
"fuckass": "idiot",
"fuckbag": "idiot",
"fuckboy": "idiot",
"fuckbrain": "idiot",
"fuckbutt": "butt",
"fucked": "had intercourse",
"fucker": "fornicator",
"fuckersucker": "idiot",
"fuckface": "idiot",
"fuckhead": "butt",
"fuckhole": "jerk",
"fuckin": "sexual act",
"fucking": "freaking",
"fucknut": "idiot",
"fucknutt": "idiot",
"fuckoff": "go away",
"fucks": "sexual act",
"fuckstick": "male genitalia",
"fucktard": "Moron",
"fuckup": "idiot",
"fuckwad": "idiot",
"fuckwit": "dummy",
"fuckwitt": "idiot",
"fudgepacker": "homosexual",

//G
"gay": "homosexual",
"gayass": "butt",
"gaybob": "homosexual",
"gaydo": "homosexual",
"gayfuck": "homosexual",
"gayfuckist": "homosexual",
"gaylord": "homosexual",
"gaytard": "homosexual",
"gaywad": "homosexual",
"goddamn": "goshdarn",
"goddamnit": "goshdarnit",
"gooch": "female genitalia",
"gook": "Chinese",
"gringo": "foreigner",
"guido": "italian",

//H
"handjob": "sexual act",
"hard on": "erection",
"heeb": "Jewish Person",
"hell": "heck",
"ho": "woman",
"hoe": "Woman",
"homo": "homosexual",
"homodumbshit": "idiot",
"honkey": "white person",
"humping": "sexual act",

//I

//J
"jackass": "idiot",
"jap": "japanesse person",
"jerk off": "masturbate",
"jigaboo": "African American",
"jizz": "Semen",
"jungle bunny": "african american",
"junglebunny": "african american",

//K
"kike": "Jewish Person",
"kooch": "female genitalia",
"kootch": "female genitalia",
"kunt": "female genitalia",
"kyke": "Jewish person",

//L
"lesbian": "homosexual",
"lesbo": "homosexual",
"lezzie": "homosexual",

//M
"mcfagget": "homosexual",
"mick": "irish",
"minge": "female genitalia",
"mothafucka": "Jerk",
"motherfucker": "mother lover",
"motherfucking": "fornicating with mother",
"muff": "female genitalia",
"muffdiver": "homosexual",
"munging": "sexual act",

//N
"negro": "african american",
"nigga": "african american",
"nigger": "african american",
"niggers": "African Americans",
"niglet": "african american child",
"nut sack": "male genitalia",
"nutsack": "male genitalia",

//O

//P
"paki": "pakistanien",
"panooch": "femail genitalia",
"pecker": "Penis",
"peckerhead": "idiot",
"penis": "male genitalia",
"penisfucker": "homosexual",
"penispuffer": "homosexual",
"piss": "urinate",
"pissed": "urinated",
"pissed off": "angry",
"pissflaps": "female genitalia",
"polesmoker": "homosexual",
"pollock": "polish person",
"poon": "female genitals",
"poonani": "female genitalia",
"poonany": "vagina",
"poontang": "female genitalia",
"porch monkey": "african american",
"porchmonkey": "African American",
"prick": "penis",
"punanny": "female genitalia",
"punta": "female dog",
"pussies": "Female Genitalias",
"pussy": "female reproductive organ",
"pussylicking": "sexual act",
"puto": "idiot",

//Q
"queef": "vaginal fart.",
"queer": "homosexual",
"queerbait": "homosexual",
"queerhole": "homosexual",

//R
"renob": "erection",
"rimjob": "dirty sexual act",
"ruski": "Russian",

//S
"sand nigger": "middle eastern",
"sandnigger": "middle eastern",
"schlong": "male genitalia",
"scrote": "male genitalia",
"shit": "poop",
"shitass": "idiot",
"shitbag": "idiot",
"shitbagger": "idiot",
"shitbrains": "idiot",
"shitbreath": "Bad Breath",
"shitcunt": "idiot",
"shitdick": "idiot",
"shitface": "pooface",
"shitfaced": "Drunk",
"shithead": "jerk",
"shithole": "idiot",
"shithouse": "bathroom",
"shitspitter": "butt",
"shitstain": "poop",
"shitter": "defecator",
"shittiest": "worst",
"shitting": "pooping",
"shitty": "bad",
"shiz": "poop",
"shiznit": "poop",
"skank": "dirty girl",
"skeet": "semen",
"skullfuck": "sexual act",
"slut": "sexually popular woman",
"slutbag": "sexually popular woman",
"smeg": "poop",
"snatch": "female genitalia",
"spic": "mexican",
"spick": "mexican american",
"splooge": "ejaculate",

//T
"tard": "mentally challenged",
"testicle": "male genitalia",
"thundercunt": "idiot",
"tit": "breast",
"titfuck": "sexual act",
"tits": "breasts",
"tittyfuck": "sexual act",
"twat": "female genitals",
"twatlips": "idiot",
"twats": "vaginas",
"twatwaffle": "homosexual",

//U
"unclefucker": "homosexual",

//V
"va-j-j": "female genitalia",
"vag": "femail genitalia",
"vagina": "female genitalia",
"vjayjay": "female genitalia",

//W
"wank": "sexual act",
"wetback": "Mexican",
"whore": "hussy",
"whorebag": "idiot",
"whoreface": "idiot",
"wop": "Italian",

//X

//Y

//Z


////////////////////////////////////////////
///////////////END OF LIST//////////////////
////////////////////////////////////////////

}, "gi"); 




// END CONFIGURATION (don't touch anything below, unless you know what you're doing... 

function populate(replacements, flags) { 
  var word, modPos, mod; 
  for(var key in replacements) { 
    if((modPos = key.indexOf("/")) > -1) { 
      mod = key.substring(modPos + 1); 
      word = key.substring(0, modPos); 
    } else { 
      mod = ""; 
      word = key; 
    } 
    modifiers.push(mod); 
    bad.push(new RegExp(word, flags)); 
    good.push(replacements[key]); 
  } 
} 



// this function does the replacements 
function sanitize(s, noContext, notredirect) { 
	
  for (var j = 0; j < bad.length; j++) { 
    if(noContext && modifiers[j].indexOf("c") != -1 || notredirect && modifiers[j].indexOf("r") !=-1 ) {  
     continue;
    } 

////////////////////////////////////////////////////////////////
//CHOOSE ONLY ONE OPTION, AND PUT '//' IN FRONT OF THE OTHER 2//
////////////////////////////////////////////////////////////////

//Show what is being replaced and what its replaced with
//    s = s.replace(bad[j], '[[\'' + bad[j] + '\' , \'' + good[j] + '\']]');

//Show the replacement with asterisks to show the word has been edited
    s = s.replace(bad[j], '**' + good[j] + '**');

//Show the replacement with no asterisks
//    s = s.replace(bad[j], good[j]);

////////////////////////////////////////////////////////////////

  } 
  return s;  
} 

// replace in title 
if(document.title) 
{
	var temp = sanitize(" "+document.title+" ", false , true);
	document.title = temp.substring(1,temp.length -1);
	
}

// replace in body text 
var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  for (var i = 0; i < textnodes.snapshotLength; i++) { 
  node = textnodes.snapshotItem(i);
  node.data = sanitize(" "+node.data+" ", false, true);
  node.data = node.data.substring(1,node.data.length -1);
}

})();
