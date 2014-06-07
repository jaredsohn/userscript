// ==UserScript== 
// @name Jmaxxz vulgar word blocker+ 
// @namespace none 
// @description Censor the Net, and browse with confidence 
// @include * 
// @version 3.02.03
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
 "Nimwit": "Nimwit",
 "Nitwit": "Nitwit",
 "Jerk": "Jerk", 
 " Bottom ": " Bottom ",
 "NITWIT": "NITWIT",
 "NIMWIT": "NIMWIT",
 "JERK": "JERK",  
 " BOTTOM ": " BOTTOM ",
 " Bottom!": " Bottom!",
 " Bottom,": " Bottom,",
 

//B
 "Were the sun don't shine": "Were the sun don't shine",
 "Illegitimate child": "Illegitimate child",
 "Spoiled brat": "Spoiled brat",
 "Crabby": "Crabby",
 "Yelled": "Yelled",
 "Complaining" : "Complaining",
 "SPOILED BRAT": "SPOILED BRAT",
 "CRABBY": "CRABBY",
 "YELLED": "YELLED",
 "COMPLAINING" : "COMPLAINING",
 "ILLEGITIMATE CHILD": "ILLEGITIMATE CHILD",
 "WERE THE SUN DON'T SHINE": "WERE THE SUN DON'T SHINE",
 "Female dogs": "Female dogs",
 "Female dog": "Female dog",
 "FEMALE DOGS": "FEMALE DOGS",
 "FEMALE DOG": "FEMALE DOG",
 "bottleguy/r": "google",

//C
"circusgranny/r": "google",
"crackfile/r": "google",

//D
 "Dang": "Dang",
 "Dang": "Dang",
 "Dang it": "Dang it",
 "Jerk": "Jerk",
 "DANG": "DANG",
 "DANG": "DANG",
 "JERK": "JERK",
 "Dang": "Dang",
 "DANG": "DANG",

//E

//F
 "Bundle of sticks": "Bundle of sticks",
 "Flipping": "Flipping",
 "Flippen": "Flippen",
 "Flipped": "Flipped",
 "Loser": "Loser",
 "BUNDLE OF STICKS": "BUNDLE OF STICKS",
 "FLIPPING": "FLIPPING",
 "FLIPPEN": "FLIPPEN",
 "FLIPPED": "FLIPPED",
 "LOSER": "LOSER",
 "Jerk": "Jerk",
 "Flip": "Flip",
 "FLIP": "FLIP",

//G
"goatse/r": "google",

//H
 "What the!?": "What the!?",
 "WHAT THE!?": "WHAT THE!?",

//I

//J
 "Donkey/c": "Donkey",

//K

//L
 "Rofl": "Rofl",
 "Rofl": "Rofl",
 "ROFL": "ROFL",
 "ROFL": "ROFL",
 "lemonparty/r": "google",

//M

//N
 "Palz": "Palz", 
 "Person": "Person", 
 "Buddy": "Buddy",
 "PALZ": "PALZ", 
 "PERSON": "PERSON", 
 "BUDDY": "BUDDY",

//O

//P
 "Kitty cat/c": "Kitty cat",
 "Kitty cat/c": "Kitty cat",
//Q

//R

//S
 "Poo": "Poo",

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
 "nitwit": "nitwit",
 "nimwit": "nimwit",
 "Jerk": "Jerk", 
 " bottom ": " bottom ",
 " bottom!": " bottom!",     
 " bottom,": " bottom,",
 

//B
 "were the sun don't shine": "were the sun don't shine",
 "illegitimate child": "illegitimate child",
 "spoiled brat": "spoiled brat",
 "crabby": "crabby",
 "yelled": "yelled",
 "complaining" : "complaining",
 "female dogs": "female dogs",
 "female dog": "female dog",
 "": "",
 "bagslap/r": "google",

//C
 "" : "",
 "" : "",
 "": "",

//D
 "dang": "dang",
 "dang": "dang",
 "dang": "dang",
 "shower": "shower",
 "" : "",
 "mustache" : "mustache",
 "jerk": "jerk", 

//E

//F
 "bundle of sticks": "bundle of sticks",
 "jerk": "jerk",
 "flipping": "flipping",
 "flippen": "flippen",
 "flipped": "flipped",
 "loser": "loser",
 "flip": "flip",
 "What the!?": "What the!?",

//G
 "goatsemarathon/r": "google",

//H
 "what the!?": "what the!?",

//I

//J
 "donkey": "donkey",
 "" : "",
 "" : "",
 "" : "",

//K

//L
 "rofl": "rofl",
 "rofl": "rofl",
 "lastmeasure/r": "google",

//M
 "meatspin/r": "google",
 "" : "",
 "mudfall/r": "google",
 "motherman/r": "google",
 "men-in-pantyhose/r": "google",

//N
 "palz": "palz", 
 "person": "person", 
 "buddy": "buddy",

//O
 "Oh my gosh!": "Oh my gosh!",

//P
 "kitty cat": "kitty cat",
 "kitty cat": "kitty cat",
 "": "",
 "" : "",
 "porn/r" : "",
 "": "",
 "pressurespot/r": "google",
 "pokehole/r": "google",
 "phreak/r": "google",

//Q
 "" : "",

//R

//S
 "" :"",
 "" : "",
 "poo": "poo",
 "swollentip/r": "google",


//T
 "": "",  
 "": "",
 "": "",
 "": "",
 "": "",    
 "": "",
 "" : "",
 "thepounder/r": "google",
 "tubgirl/r": "google",
 "tubboy/r": "google",   

//U

//V

//W
 "" : "",
 

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

// this function redirects if we reached a "bad" address 
function redirectOnBadURL() { 
  var cleanHost = sanitize(document.defaultView.location.host, true, false); 
  if(cleanHost != document.defaultView.location.host) { 
    document.defaultView.location.href = "http://www.google.com.com"; 
    return true; 
  } 
  
  return false; 
}

if(redirectOnBadURL()) return

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
