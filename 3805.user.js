// ==UserScript== 
// @name          Change cuss words
// @namespace     none
// @description   Changes cuss words to other ones
// @include       * 
// ==/UserScript== 
//
//
//
//
//
//
//
//
//      This code turns -most- cuss words into *s.
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//      WARNING: Code contains words that many consider offensive. If you do not wish to see them,
//               Don't scroll down.
//              
//               ^_^
//
//
//
//
//
//


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
  
  //case sens
  
  
  //safe replace
  

  "Jackass": "jackazz",

  
  
  // bad replace 
  "God damn": "gol damn",
 
  
    "Son of a bitch": "son of a beeotch",
    "Ass hole": "ass holy",
    "What the hell": "What the fuck", 
    " Damnit": " god damnit", 
    " ass ": " azz ", 
    "Niggaz": "Niggers", 
    
 //all caps
    "SON OF A BITCH": "SON OF A BEEOTCH",
    "GOD DAMN": "FUCK",
    "GODDAMN": "FUCK",
    "WHAT THE HELL": "WHAT THE FUCK", 
    "SON OF A BITCH": "SON OF A BEEOTCH",
    "ASSHOLE": "AZZWHIPE",
    "ASS HOLE": "AZZ HOLE",
    "ASS-HOLE": "AZZ-HOLE",  
    " ASS ": " AZZ ", 
    "NIGGAZ": "NIGGERS", 
    "NIGGA": "NIGGER",

    
    //punctuation
    
    " Ass!": " Azz!", 
    

    " Ass,": " Azz,",
    
        
    
    // trump cards

     "Asshole": "Azzhole",
     "Ass-hole": "Azz-hole", 
     "Motherfucker": "Muddafucka",
     "Fucker": "Fucka",
     "Bitches": "Beeotches",
	 "Bitch": "Beeotch",
	 "BITCHES": "Beeotches",
	 "BITCH": "Beeotch",

    
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

  var replacements, regex, key, textnodes, node, s; 

  replacements = {

   //not case sense

  //safe replace
  "jackass": "jackazz",

  
  // bad replace 

     
    "ass hole": "azz hole",
    "what the hell": "what the fuck", 


    "asshole": "azzhole",
    "ass hole": "azz hole",
    "ass-hole": "azz-hole",  
    " ass ": " azz ", 
    "niggaz": "nigger",  
    "nigga": "nigger",
 
    
    //punctuation
    
    " ass!": " azz!", 
     
    " tits,": " titz,", 
    " ass,": " azz,",
      
    
    // trump cards
     "asshole": "assholy",
     "ass-hole": "ass-holy",
     "motherfucker": "muddafucka",
     "fucker": "fucka",
     "shit": "shitz",
     "bitches": "bitchez",
	 "bitch": "beeotch",
	 "damn": "damnizzle",

 }; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'gi'); 
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