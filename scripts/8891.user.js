// ==UserScript== 
// @name Uncensor the Internet
// @namespace http://www.ironicsans.com 
// @description Uncensors the bad words on the web
// @include * 
// @version 1.2
// @homepage http://www.ironicsans.com


/* 
Based on Jmaxxz Vulgar Word Blocker, which can be found at: http://userscripts.org/scripts/show/2287
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
// "Censored Word": "replacement"

// [Place custom word list below] 

//A
 "A\\$\\$": "Ass",
 "A\\*\\*": "Ass",
 "a\\$\\$": "ass",
 "a\\*\\*": "ass",
 "A[^ ][^ ]hole": "Asshole",
 "a[^ ][^ ]hole": "asshole",
 "\\@\\$\\$": "ass",
  

//B
 "B[^ aeou]tch": "Bitch",
 "b[^ aeou]tch": "bitch",
 "Bull\\*\\*\\*\\*": "Bullshit",
 "bull\\*\\*\\*\\*": "bullshit",
 "Bull[^ ][^ ][^ ]t": "Bullshit",
 "bull[^ ][^ ][^ ]t": "bullshit",

//
 "C\\.\\.ksucker": "Cocksucker",
 "c\\.\\.ksucker": "cocksucker",
 "c\\*nt": "cunt",
 "c\\_nt": "cunt",
 "C\\*nt": "Cunt",
 "C\\_nt": "Cunt", 

//F
 "F[^ ]ck": "Fuck",
 "f[^ ]ck": "fuck",
 "f[^ ][^ ]ker": "fucker",
 "F[^ ][^ ]ker": "Fucker",
 "f[^ ][^ ]king": "fucking",
 "F[^ ][^ ]king": "Fucking",
 "f\\*\\*\\*.ng": "fucking",
 "F\\*\\*\\*.ng": "Fucking",
 "f\\*\\*k": "fuck",
 "F\\*\\*k": "Fuck",
 "f\\_\\_k": "fuck",
 "F\\_\\_k": "Fuck",

//M
 "mother\\*\\*\\*\\*\\*\\*": "motherfucker",
 "Mother\\*\\*\\*\\*\\*\\*": "Motherfucker",
 "mother[^ ][^ ][^ ][^ ]er": "motherfucker",
 "Mother[^ ][^ ][^ ][^ ]er": "Motherfucker", 

//P
 "p\\!ss": "piss",
 "P\\!ss": "Piss",
 "p\\*ss": "piss",
 "P\\*ss": "Piss",
 "p\\!\\$\\$": "piss",
 "P\\!\\$\\$": "Piss",
 "pu\\*\\*y": "pussy",
 "Pu\\*\\*y": "Pussy",
 "pu\\$\\$y": "pussy",
 "Pu\\$\\$ies": "Pussies",
 "pu\\*\\*ies": "pussies",
 "Pu\\*\\*ies": "Pussies",
 "pu\\$\\$ies": "pussies",
 "Pu\\$\\$ies": "Pussies",

//S
 "S\\*\\*t": "Shit",
 "s\\*\\*t": "shit",
 "Sh\\!t": "Shit",
 "sh\\!t": "shit",
 "Sh\\*t": "Shit",
 "sh\\*t": "shit",

//T
 "t\\*ts": "tits",
 "T\\*ts": "Tits",
 "t\\!ts": "tits",
 "T\\!ts": "Tits",

// ************************************************* 
// BONUS WORD REPLACEMENT FUN
// (I just couldn't bring myself to making these
// word replacements turned on by default. But you
// can turn them on by removing the leading slashes)
//
// "President Bush": "President Douchebag",
// "George W\\. Bush": "George W\\. Douchebag",
// "George W Bush": "George W Douchebag",
// *************************************************

 
// [End of custom word list]   
}, "g"); 

populate({
// This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same. 

// Terms are listed as comma separated couples of words, in the form 
// [Place custom word list below]



//F
 "the f.word": "Fuck",
 "the \"f\".word": "Fuck",

// ************************************************* 
// BONUS WORD REPLACEMENT FUN
// (I just couldn't bring myself to making these
// word replacements on by default. But you can
// turn them on by removing the leading slashes)
//
// "the Bush administration": "the Douchebag administration",
// ************************************************* 


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