// ==UserScript== 
// @name Jmaxxz vulgar word blocker
// @namespace none 
// @description Censor the Net, and browse with confidence 
// @include * 
// @version 3.01.04
// @homepage http://userscripts.org/scripts/show/2287
// ==/UserScript==

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
 "Ballsack": "Were the sun don't shine",
 "Bastard": "Illegitimate child",
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
 "bottleguy/r": "google",

//C
"circusgranny/r": "google",
"crackfile/r": "google",

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
"goatse/r": "google",

//H
 "What the hell": "What the!?",
 "WHAT THE HELL": "WHAT THE!?",

//I

//J
 "Jackass/c": "Donkey",

//K

//L
 "Lmao": "Rofl",
 "Lmfao": "Rofl",
 "LMAO": "ROFL",
 "LMFAO": "ROFL",
 "lemonparty/r": "google",

//M

//N
 "Niggaz": "Palz", 
 "Nigger": "Person", 
 "Nigga": "Buddy",
 "NIGGAZ": "PALZ", 
 "NIGGER": "PERSON", 
 "NIGGA": "BUDDY",

//O

//P
 "Pussy cat/c": "Kitty cat",
 "Pussycat/c": "Kitty cat",
//Q

//R

//S
 "Shit": "Poo",

//T

//U

//V

//W
"welikehorses/r": "google",

//X

//Y
"yellaface/r": "google",

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
 "ass-hole": "Jerk", 
 " ass ": " bottom ",
 " ass!": " bottom!",     
 " ass,": " bottom,",
 

//B
 "ballsack": "were the sun don't shine",
 "bastard": "illegitimate child",
 "son of a bitch": "spoiled brat",
 "bitchy": "crabby",
 "bitched": "yelled",
 "bitching" : "complaining",
 "bitches": "female dogs",
 "bitch": "female dog",
 "blowjob": "",
 "bagslap/r": "google",

//C
 "cocksucker" : "",
 "cock sucker" : "",
 "cunt": "",

//D
 "goddamn": "dang",
 "god damn": "dang",
 "damn": "dang",
 "douche": "shower",
 "dinglebetty" : "",
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
 "wtf": "What the!?",

//G
 "goatsemarathon/r": "google",

//H
 "what the hell": "what the!?",

//I

//J
 "jackass": "donkey",
 "jackoff" : "",
 "jerkoff" : "",
 "jizz" : "",

//K

//L
 "lmao": "rofl",
 "lmfao": "rofl",
 "lastmeasure/r": "google",

//M
 "meatspin/r": "google",
 "muff diving" : "",
 "mudfall/r": "google",
 "motherman/r": "google",
 "men-in-pantyhose/r": "google",

//N
 "niggaz": "palz", 
 "nigger": "person", 
 "nigga": "buddy",

//O
 "omg": "Oh my gosh!",

//P
 "pussy cat": "kitty cat",
 "pussycat": "kitty cat",
 "pussy ": "",
 "free porn" : "",
 "porn/r" : "",
 "penisbot": "",
 "pressurespot/r": "google",
 "pokehole/r": "google",
 "phreak/r": "google",

//Q
 "queef" : "",

//R

//S
 "anonymous sex" :"",
 "skin flute" : "",
 "shit": "poo",
 "swollentip/r": "google",


//T
 " tits ": "",  
 " tit ": "",
 " tits,": "",
 " tit,": "",
 " tits!": "",    
 " tit!": "",
 "twat" : "",
 "thepounder/r": "google",
 "tubgirl/r": "google",
 "tubboy/r": "google",   

//U

//V

//W
 "wanker" : "",
 

//X
"xxx/r":"",

//Y
 "youaresogay/r": "google",

//Z 
// [End of custom word list]
//test
"1t2e3s4t5test/r": "google",

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
