// ==UserScript== 
// @name Profanity Filter 
// @namespace none 
// @description Filters Out Swear Words As You Browse The Internet
// @include * 
// @version 20070402.2321
// @homepage http://userscripts.org/scripts/show/7286

/*
This script are my own tweaks to the Jmaxxz Vulgar Word Blocker and I want to give the credit where it's due. 
The only difference is that you'll notice a changed word because it'll be put into brackets [].

Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey" 
Also, based on the Jmaxxz Vulgar Word Blocker can be found at: http://userscripts.org/scripts/show/2287
*/ 










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
// The support modifier "n", stands for new
// it does not change how the word is handled by the script,
// rather it is just so the developer know what he/she has changed in the latest build
// incase something goes wrong 
 

// [Place custom word list below] 

//safe replace (i.e. words which means that the word could be "not evil", but you are just  
//changing it to be on the safe side)

//A
 "Ass hole": "[A** hole]",
 "Asshole": "[A**hole]",
 "Ass-hole": "[A**-hole]", 
 " Ass ": " [Butt] ",
 "ASSHOLE": "[A**HOLE]",
 "ASS HOLE": "[A** HOLE]",
 "ASS-HOLE": "[JERK]",  
 " ASS ": "[ BOTTOM ]",
 " Ass!": "[ Bottom!]",
 " Ass,": "[ Bottom,]",
 

//B
 "Ballsack": "[Were the sun don't shine]",
 "Bastard": "[Illegitimate child]",
 "Son of a bitch": "[Spoiled brat]",
 "Bitchy": "[Crabby]",
 "Bitched": "[Yelled]",
 "Bitching" : "[Complaining]",
 "SON OF A BITCH": "[SPOILED BRAT]",
 "BITCHY": "[CRABBY]",
 "BITCHED": "[YELLED]",
 "BITCHING" : "[COMPLAINING]",
 "BASTARD": "[ILLEGITIMATE CHILD]",
 "BALLSACK": "[WERE THE SUN DON'T SHINE]",
 "Bitches": "[Female dogs]",
 "Bitch": "[Female dog]",
 "BITCHES": "[FEMALE DOGS]",
 "BITCH": "[FEMALE DOG]",

//C

//D
 "Goddamn": "[Dang]",
 "God damn": "[Dang]",
 "Damnit": "[Dang it]",
 "Dickhead": "[Jerk]",
 "GOD DAMN": "[DANG]",
 "GODDAMN": "[DANG]",
 "DICKHEAD": "[JERK]",
 "Damn": "[Dang]",
 "DAMN": "[DANG]",
 " dick ": " [penis] ",

//E

//F
 "Faggot": "[Bundle of sticks]",
 "Fucking": "[F'ing]",
 "Fucken": "[F'n]",
 "Fucked": "[F'ed]",
 "Fucker": "[F'er]",
 "FAGGOT": "[BUNDLE OF STICKS]",
 "FUCKING": "[F'N]",
 "FUCKEN": "[F'N]",
 "FUCKED": "[F'D]",
 "FUCKER": "[F'ER]",
 "Motherfucker": "[MFer]",
 "Fuck": "['F']",
 "FUCK": "['F']",

//G

//H
 "What the hell": "[What the!?]",
 "WHAT THE HELL": "[WHAT THE!?]",

//I

//J
 "Jackass/c": "[donkey]",
 "jackasses": "[jerks]",

//K

//L
 "Lmao": "[Rofl]",
 "Lmfao": "[Rofl]",
 "LMAO": "[ROFL]",
 "LMFAO": "[ROFL]",

//M

//N
 "Niggaz": "[Palz]", 
 "Nigger": "[Person]", 
 "Nigga": "[Buddy]",
 "NIGGAZ": "[PALZ]", 
 "NIGGER": "[PERSON]", 
 "NIGGA": "[BUDDY]",
 "NIGGAS": "[BUDDIES]",

//O

//P
 " pussy. ": " [vagina]. ",

//Q

//R

//S
 " Shit ": " [Poo] ",
 " shitty ": " [terrible] ",

//T

//U

//V

//W

//X

//Y

//Z   

  
      

  
	 
  
// [End of custom word list]   
}, "g"); 

populate({
// This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same. 

// Terms are listed as comma separated couples of words, in the form 
// [Place custom word list below]

//safe replace (i.e. words which means that the word could be "not evil]", but you are just  
//changing it to be on the safe side)

//A
 "asshole": "[nitwit]",
 "ass hole": "[nimwit]",
 "ass-hole": "[Jerk]", 
 " ass ": " [bottom] ",
 " ass!": " [bottom!]",     
 " ass,": " [bottom,] ",
 " asses ": " [butts] ", 
 " asses. ": " [butts]. ", 

//B
 "ballsack": "[were the sun don't shine]",
 "bastard": "[illegitimate child]",
 "son of a bitch": "[SOB]",
 "bitchy": "[crabby]",
 "bitched": "[yelled]",
 "bitching" : "[complaining]",
 "bitches": "[female dogs]",
 "bitch": "[female dog]",
 "blowjob": "[BJ]",
 "bullshit": "[BS]",

//C
 "cock sucker" : "[A person performing fellatio]",
 "cocksucker": "[A person performing fellatio]",
 "cunt": "[vagina]",

//D
 "goddamn": "[dang]",
 "god damn": "[dang]",
 "damn": "[dang]",
 "douche": "[shower]",
 "dingleberry" : "[Expletive]",
 "dirty sanchez" : "[mustache]",
 " dickhead ": " [jerk] ", 

//E

//F
 "faggot": "[bundle of sticks]",
 "motherfucker": "[MFer]",
 "fucking": "[f'ing]",
 "fucken": "[f'en]",
 "fucked": "[f'ed]",
 "fucker": "[f'er]",
 "fuck": "['F']",
 "wtf": "[What the!?]",

//G

//H
 "what the hell": "[what the!?]",

//I

//J
 "jackasses": "[jerks]",
 "jackoff" : "[jerk]",
 "jerkoff" : "[jerk]",
 "jizz" : "[Expletive]",

//K

//L
 "lmao": "[rofl]",
 "lmfao": "[rofl]",

//M
 "muff diving" : "[Expletive]",

//N
 "niggaz": "[palz]", 
 "nigger": "[person]", 
 "nigga": "[buddy]",
 "niggas": "[buddies]",

//O
 "omg": "[Oh my gosh!]",

//P
 "free porn" : "[free pornography]",
 "porn/r" : "[pornography/r]",
 " pussy ": " [vagina] ",

//Q
 "queef" : "[Expletive]",

//R

//S
 "anonymous sex" :"[Expletive]",
 "skin flute" : "[Expletive]",
 " shit ": " [poo] ",
 "shitty": "[bad]",


//T
 "tits": " [breasts] ",
 " tits ": " [breasts] ",  
 " tit ": " [breast] ",
 " tits,": " [breasts],",
 " tit,": " [breast], ",
 " tits!": " [breasts!]",    
 " tit!": " [breast!]",
 " twat " : " [vagina] ",   

//U

//V

//W
 "wanker" : "[Expletive]",
 "whore" : "[Prostitute]",

//X

//Y

//Z 
// [End of custom word list]

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
if(document.title) document.title = sanitize(document.title, false , true); 

// replace in body text 
var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  for (var i = 0; i < textnodes.snapshotLength; i++) { 
  node = textnodes.snapshotItem(i); 
  node.data = sanitize(node.data, false, true); 
}

})();