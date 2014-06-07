// ==UserScript== 
// @name Bad Word Filter by Everplex Media: Obscene, vulgar, and curse word blocker/replacer
// @namespace none 
// @description Filters obscene, vulgar, and curse words so you never have to look at them while browsing.
// @include * 
// @version 4.14
// @homepage http://userscripts.org/scripts/show/119862
// ==/UserScript==











//WARNING
// DO NOT SCROLL DOWN this script contains language that
// may be offensive.

















// ==/UserScript==
(function() { 
var bad = [], good = [], modifiers = [];


// START CONFIGURATION 

populate({  
// This list is case SENSITIVE, i.e. uppercase and lowcase are treated differently 

// Terms are listed as comma separated couples of words, in the form 
// "Bad word": "replacement"
// You can place an optional modifier after a slash ("/") at the end of the bad word. 
// The supported modifier "c", standing for "context",
// which means that the word could be "not evil", but you are just changing it to be on the safe side, 
// and thus it should not be replaced in domain names (i.e. it doesn't cause redirections) 

//The support modifier "r", standing for redirect 
//This means a word will not be changed except in domain names (i.e. the word will only cause redirects)


// The support modifier "n", stands for new
// it does not change how the word is handled by the script,
// rather it is just so the developer know what he/she has changed in the latest build
// incase something goes wrong 
 

// [Place custom word list below] 

//safe replace (i.e. words which means that the word could be "not evil", but you are just  
//changing it to be on the safe side)

//A
 "Ass hole": "Nimwit",
 "Asshole": "Nitwit",
 "Ass-hole": "Jerk", 
 " Ass ": " Bottom ",
 "ASSHOLE": "NITWIT",
 "ASS HOLE": "NIMWIT",
 "ASS-HOLE": "JERK",  
 " ASS ": " BOTTOM ",
 " Ass!": " Bottom!",
 " Ass,": " Bottom,",

//B
 "Ballsack": "[blocked]",
 "Bastard": "Jerk",
 "Son of a bitch": "Spoiled brat",
 "Bitchy": "Crabby",
 "Bitched": "Yelled",
 "Bitching" : "Complaining",
 "SON OF A BITCH": "SPOILED BRAT",
 "BITCHY": "CRABBY",
 "BITCHED": "YELLED",
 "BITCHING" : "COMPLAINING",
 "BASTARD": "ILLEGITIMATE CHILD",
 "BALLSACK": "WERE THE SUN DON'T SHINE",
 "Bitches": "Female dogs",
 "Bitch": "Female dog",
 "BITCHES": "FEMALE DOGS",
 "BITCH": "FEMALE DOG",
 "bottleguy/r": "[blocked]",

//C
"circusgranny/r": "[blocked]",
"crackfile/r": "[blocked]",

//D
 "Goddamn": "Dang",
 "God damn": "Dang",
 "Damnit": "Dang it",
 "Dickhead": "Jerk",
 "GOD DAMN": "DANG",
 "GODDAMN": "DANG",
 "DICKHEAD": "JERK",
 "Damn": "Dang",
 "DAMN": "DANG",

//E

//F
 "Faggot": "Bundle of sticks",
 "Fucking": "Flipping",
 "Fucken": "Flippen",
 "Fucked": "Flipped",
 "Fucker": "Loser",
 "FAGGOT": "BUNDLE OF STICKS",
 "FUCKING": "FLIPPING",
 "FUCKEN": "FLIPPEN",
 "FUCKED": "FLIPPED",
 "FUCKER": "LOSER",
 "Motherfucker": "Jerk",
 "Fuck": "Flip",
 "FUCK": "FLIP",

//G
"goatse/r": "[blocked]",

//H
 "What the hell": "What the heck",
 "WHAT THE HELL": "WHAT THE HECK",

//I

//J
 "Jackass/c": "Donkey",

//K

//L
 "lemonparty/r": "[blocked]",

//M

//N
 "Niggaz": "Pals", 
 "Nigger": "Person", 
 "Nigga": "Buddy",
 "NIGGAZ": "PALS", 
 "NIGGER": "PERSON", 
 "NIGGA": "BUDDY",

//O

//P
 "Pussy cat/c": "Kitty cat",
 "Pussycat/c": "Kitty cat",
//Q

//R

//S
 "Shit": "Junk",

//T

//U

//V

//W
"welikehorses/r": "[blocked]",

//X

//Y
"yellaface/r": "[blocked]",

//Z   

  
      

  
	 
  
// [End of custom word list]   
}, "g"); 

populate({
// This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same. 

// Terms are listed as comma separated couples of words, in the form 
// [Place custom word list below]

//safe replace (i.e. words which means that the word could be "not evil", but you are just  
//changing it to be on the safe side)

//A
 "asshole": "nitwit",
 "ass hole": "nimwit",
 "ass-hole": "jerk", 
 " ass ": " bottom ",
 " ass!": " bottom!",     
 " ass,": " bottom,",
 

//B
 "ballsack": "jerk",
 "bastard": "jerk",
 "son of a bitch": "spoiled brat",
 "bitchy": "mean",
 "bitched": "yelled",
 "bitching" : "complaining",
 "bitches": "female dogs",
 "bitch": "female dog",
 "blowjob": "[blocked]",
 "bagslap/r": "[blocked]",

//C
 "cocksucker" : "[blocked]",
 "cock sucker" : "[blocked]",
 "cunt": "[blocked]",

//D
 "goddamn": "dang",
 "god damn": "dang",
 "damn": "dang",
 "douche": "idiot",
 "dinglebetty" : "[blocked]",
 "dirty sanchez" : "mustache",
 "dickhead": "jerk", 

//E

//F
 "faggot": "bundle of sticks",
 "motherfucker": "jerk",
 "fucking": "flipping",
 "fucken": "flippen",
 "fucked": "flipped",
 "fucker": "loser",
 "fuck": "flip",

//G
 "goatsemarathon/r": "[blocked]",
 "gay": "[stupid]",
 
//H
 "what the hell": "what the heck",

//I

//J
 "jackass": "donkey",
 "jackoff" : "idiot",
 "jerkoff" : "jerk",
 "jizz" : "[blocked]",

//K

//L
 "lastmeasure/r": "[blocked]",

//M
 "meatspin/r": "[blocked]",
 "muff diving" : "[blocked]",
 "mudfall/r": "[blocked]",
 "motherman/r": "[blocked]",
 "men-in-pantyhose/r": "[blocked]",

//N
 "niggaz": "pals", 
 "nigger": "person", 
 "nigga": "buddy",

//O

//P
 "pussy cat": "kitty cat",
 "pussycat": "kitty cat",
 "pussy": "[blocked]",
 "free porn" : "[blocked]",
 "porn/r" : "[blocked]",
 "penisbot": "[blocked]",
 "pressurespot/r": "[blocked]",
 "pokehole/r": "[blocked]",
 "phreak/r": "[blocked]",

//Q
 "queef" : "[blocked]",
 "queer" : "dumb",

//R

//S
 "anonymous sex" :"[blocked]",
 "skin flute" : "[blocked]",
 "shit": "darnit",
 "swollentip/r": "[blocked]",



//T
 " tits ": "[blocked]",  
 " tit ": "[blocked]",
 " tits,": "[blocked]",
 " tit,": "[blocked]",
 " tits!": "[blocked]",    
 " tit!": "[blocked]",
 "twat" : "idiot",
 "thepounder/r": "[blocked]",
 "tubgirl/r": "[blocked]",
 "tubboy/r": "[blocked]",   

//U

//V

//W
 "wanker" : "jerk",
 

//X
"xxx/r":"[blocked]",

//Y
 "youaresogay/r": "[blocked]",

//Z 
// [End of custom word list 1]


// NEW CUSTOM LIST

//A
" anus": " butt",
" arse ": " butt ",
"arsehole": "butt",
" ass ": " butt ",
"ass-hat": "idiot",
"ass-jabber": "[blocked]",
"ass-pirate": "[blocked]",
"assbag": "idiot",
"assbandit": "[blocked]",
"assbanger": "[blocked]",
"assbite": "idiot",
"assclown": "butt",
"asscock": "idiot",
"asscracker": "butt",
" asses": " butts",
"assface": "butt",
"assfuck": "rear-loving",
"assfucker": "[blocked]",
"assgoblin": "[blocked]",
"asshat": "butt",
"asshead": "idiot",
"asshole": "jerk",
"asshopper": "[blocked]",
"assjacker": "[blocked]",
"asslick": "idiot",
"asslicker": "[blocked]",
"assmonkey": "idiot",
"assmunch": "idiot",
"assmuncher": "butt",
"assnigger": "[blocked]",
"asspirate": "[blocked]",
"assshit": "idiot",
"assshole": "butt",
"asssucker": "idiot",
"asswad": "butt",
"asswipe": "butt",
"axwound": "[blocked]",

//B
"bampot": "idiot",
"bastard": "jerk child",
"beaner": "stupid",
"bitch": "female dog",
"bitchass": "idiot",
"bitches": "female dogs",
"bitchtits": "[blocked]",
"bitchy": "mean",
"blow job": "lude act",
"blowjob": "lude act",
"bollocks": "male organ",
"bollox": "male organ",
"boner": "[blocked]",
"brotherfucker": "[blocked]",
"bullshit": "junk",
"bumblefuck": "[blocked]",
"butt plug": "cork",
"butt-pirate": "[blocked]",
"buttfucka": "[blocked]",
"buttfucker": "[blocked]",

//C
"camel toe": "female organ",
"carpetmuncher": "[blocked]",
"chesticle": "breast",
"chinc": "Chinese",
"chink": "asian",
"choad": "male organ",
"chode": "small penis",
"clit": "female organ",
"clitface": "idiot",
"clitfuck": "lude act",
"clusterfuck": "mess up",
" cock ": " penis ",
"cockass": "Jerk",
"cockbite": "idiot",
"cockburger": "idiot",
"cockface": "idiot",
"cockfucker": "idiot",
"cockhead": "idiot",
"cockjockey": "[blocked]",
"cockknoker": "[blocked]",
"cockmaster": "[blocked]",
"cockmongler": "[blocked]",
"cockmongruel": "[blocked]",
"cockmonkey": "idiot",
"cockmuncher": "[blocked]",
"cocknose": "idiot",
"cocknugget": "idiot",
"cockshit": "idiot",
"cocksmith": "[blocked]",
"cocksmoke": "[blocked]",
"cocksmoker": "[blocked]",
"cocksniffer": "[blocked]",
"cocksucker": "[blocked]",
"cockwaffle": "idiot",
"coochie": "female organ",
"coochy": "female organ",
"coon": "[blocked]",
"cooter": "femalle organ",
"cracker": "nice guy",
" cum ": " semen ",
"cumbubble": "idiot",
"cumdumpster": "prostitute",
"cumguzzler": "[blocked]",
"cumjockey": "[blocked]",
"cumslut": "dirty girl",
"cumtart": "idiot",
"cunnie": "female organ",
"cunnilingus": "lude act",
" cunt ": " jerk ",
"cuntass": "idiot",
"cuntface": "idiot",
"cunthole": "female organ",
"cuntlicker": "[blocked]",
"cuntrag": "idiot",
"cuntslut": "idiot",

//D
"dago": "Italian",
"damn": "darn",
"dammit": "darnit",
"damnit": "darnit",
"deggo": "Italian",
"dick": "jerk",
"dick-sneeze": "[blocked]",
"dickbag": "idiot",
"dickbeaters": "Hands",
"dickface": "idiot",
"dickfuck": "idiot",
"dickfucker": "[blocked]",
"dickhead": "jerk",
"dickhole": "male organ",
"dickjuice": "[blocked]",
"dickmilk": "[blocked]",
"dickmonger": "[blocked]",
"dicks": "jerks",
"dickslap": "lude act",
"dicksucker": "[blocked]",
"dicksucking": "lude act",
"dicktickler": "[blocked]",
"dickwad": "idiot",
"dickweasel": "idiot",
"dickweed": "idiot",
"dickwod": "idiot",
"dike": "[blocked]",
"dildo": "lude toy",
"dipshit": "idiot",
"doochbag": "idiot",
"dookie": "junk",
"douche": "idiot",
"douche-fag": "idiot",
"douchebag": "idiot",
"douchewaffle": "[blocked]",
"dumass": "idiot",
"dumb ass": "idiot",
"dumbass": "idiot",
"dumbfuck": "idiot",
"dumbshit": "idiot",
"dumshit": "idiot",
" dyke ": "[blocked]",

//E

//F
" fag ": " [blocked] ",
"fagbag": "[blocked]",
"fagfucker": "[blocked]",
"faggit": "[blocked]",
"faggot": "[blocked]",
"faggotcock": "[blocked]",
"fagtard": "idiot",
"fatass": "fat person",
"fellatio": "lude act",
"feltch": "lude act",
"flamer": "[blocked]",
"fuck": "[love]",
"fuckass": "idiot",
"fuckbag": "idiot",
"fuckboy": "idiot",
"fuckbrain": "idiot",
"fuckbutt": "butt",
"fuckbutter": "lude fluids",
"fucked": "had intercourse",
"fucker": "fornicator",
"fuckersucker": "idiot",
"fuckface": "idiot",
"fuckhead": "butt",
"fuckhole": "jerk",
"fuckin": "lude act",
"fucking": "freaking",
"fucknut": "idiot",
"fucknutt": "idiot",
"fuckoff": "go away",
"fucks": "lude act",
"fuckstick": "male organ",
"fucktard": "Moron",
"fucktart": "idiot",
"fuckup": "idiot",
"fuckwad": "idiot",
"fuckwit": "dummy",
"fuckwitt": "idiot",
"fudgepacker": "[blocked]",

//G
" gay ": " [blocked] ",
"gayass": "[blocked]",
"gaybob": "[blocked]",
"gaydo": "[blocked]",
"gayfuck": "[blocked]",
"gayfuckist": "[blocked]",
"gaylord": "[blocked]",
"gaytard": "[blocked]",
"gaywad": "[blocked]",
"goddamn": "goshdarn",
"goddamnit": "goshdarnit",
"gooch": "female organ",
"gook": "Chinese",

//H
"handjob": "lude act",
"hard on": "erection",
"heeb": "Jewish Person",
"homodumbshit": "idiot",
"honkey": "white person",
"humping": "lude act",

//I

//J
"jackass": "idiot",
"jagoff": "idiot",
"jerk off": "masturbate",
"jerkass": "idiot",
"jigaboo": "black person",
"jizz": "Semen",
"jungle bunny": "black person",
"junglebunny": "black person",

//K
"kike": "Jewish Person",
"kooch": "female organ",
"kootch": "female organ",
"kraut": "german",
"kunt": "female organ",
"kyke": "Jewish person",

//L
"lameass": "loser",
"lardass": "fat person",
"lesbian": "[blocked]",
"lesbo": "[blocked]",
"lezzie": "[blocked]",

//M
"mcfagget": "[blocked]",
"mick": "irish",
"milf": "beautiful lady",
"minge": "female organ",
"mothafucka": "Jerk",
"mothafuckin\'": "stupid",
"motherfucker": "stupid",
"motherfucking": "stupid",
"muff": "female organ",
"muffdiver": "[blocked]",
"munging": "lude act",

//N
"nut sack": "male organ",
"nutsack": "male organ",

//O

//P
"paki": "pakistanien",
"panooch": "femail organ",
"pecker": "Penis",
"peckerhead": "idiot",
"penis": "male organ",
"penisbanger": "[blocked]",
"penisfucker": "[blocked]",
"penispuffer": "[blocked]",
"piss": "mad",
"pissed": "angry",
"pissed off": "angry",
"pissflaps": "female organ",
"polesmoker": "[blocked]",
"pollock": "polish person",
"poonani": "female organ",
"poonany": "female organ",
"poontang": "female organ",
"porch monkey": "black person",
"porchmonkey": "black person",
"prick": "stuck up jerk",
"punanny": "female organ",
"punta": "female dog",
"pussies": "female organs",
"pussy": "female reproductive organ",
"pussylicking": "lude act",
"puto": "idiot",

//Q
"queerbait": "[blocked]",
"queerhole": "[blocked]",

//R
"renob": "erection",
"rimjob": "dirty lude act",
"ruski": "Russian",

//S
"sand nigger": "middle eastern",
"sandnigger": "middle eastern",
"schlong": "male organ",
"scrote": "male organ",
" sex ": " fun ",
"shit": "junk",
"shitass": "idiot",
"shitbag": "idiot",
"shitbagger": "idiot",
"shitbrains": "idiot",
"shitbreath": "Bad Breath",
"shitcanned": "Fired",
"shitcunt": "idiot",
"shitdick": "idiot",
"shitface": "pooface",
"shitfaced": "Drunk",
"shithead": "jerk",
"shithole": "idiot",
"shithouse": "bathroom",
"shitspitter": "butt",
"shitstain": "junk",
"shitter": "defecator",
"shittiest": "worst",
"shitting": "junking",
"shitty": "bad",
"shiz": "junk",
"shiznit": "junk",
"skank": "dirty girl",
"skeet": "semen",
"skullfuck": "lude act",
"slut": "ludely popular woman",
"slutbag": "ludely popular woman",
"smeg": "junk",
"snatch": "female organ",
"spic": "mexican",
"spick": "mexican american",
"splooge": "ejaculate",
"spook": "White person",
"suckass": "idiot",

//T
"tard": "idiot",
"testicle": "male organ",
"thundercunt": "idiot",
" tit ": " breast ",
"titfuck": "lude act",
"tits": "breasts",
"tittyfuck": "lude act",
"twat": "idiot",
"twatlips": "idiot",
"twats": "idiots",
"twatwaffle": "[blocked]",

//U
"unclefucker": "[blocked]",

//V
"va-j-j": "female organ",
" vag ": " female organ ",
"vagina": "female organ",
"vajayjay": "female organ",
"vjayjay": "female organ",

//W
"wank": "lude act",
"wankjob": "lude act",
"wetback": "Mexican",
"whore": "hussy",
"whorebag": "idiot",
"whoreface": "idiot",
"wop": "Italian",

//X
"xxx": "[x times 3]",


//Y

//Z

"gay" : "puppies"
"lesbian" : "kittens"
"sex

//END OF NEW CUSTOM LIST

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
    s = s.replace(bad[j], good[j]);
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