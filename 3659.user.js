// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey", as well as "renamer"

// ==UserScript== 
// @name          Jer's Swear Naughty Word Remover for the non-Limbaugh fan
// @namespace     none
// @description   This takes out most swear words, but does not add Limbaugh's Lexicon like my original. This one is for wimps and communists
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    " shit ": " poo ",  
    "mother fucker": "mother trucker",
    " fucker": "trucker",
    "fuck": "flip",   
    " damn": " dang", 
    " hell ": " H-E-double-hockey-sticks ", 
    " bastard": " illegitimate child ", 
    " cock ": " cack ", 
    " cunt": " uncouth word ", 
    "bitch": "witch", 
    " dick ": " Ricardo ", 
    " fuck": " flip", 

    " shit": " poo",
    "shit": "poo",






    " Shit ": " Poo", 
    "Fuck": "Flip", 
    " Fucker": "Trucker", 
    "Mother Fucker": "Mother Trucker",  
    " Damn": " Dang", 
    " Hell ": " H-E-double-hockey-sticks ", 
    " Bastard": " Illegitimate child ", 
    " Cock ": " Cack ", 
    " Cunt": " Lady ", 
    "Bitch": "Witch", 


    " Shit": " Poo",
    "Shit": "Poo",


    " SHIT ": " POO", 
    "FUCK": "FLIP", 
    " FUCKER": "TRUCKER", 
    "MOTHER FUCKER": "MOTHER TRUCKER",  
    " DAMN": " DANG", 
    " HELL ": " H-E-DOUBLE-HOCKEY-STICKS ", 
    " BASTARD": " ILLEGITIMATE CHILD ", 
    " COCK ": " CACK ", 
    " CUNT": " LADY ", 
    "BITCH": "WITCH", 
    " DICK ": " RICARDO ",
    " ASS ": " BOTTOM ",
    "-ASS ": "-BOTTOM ",
    " SHIT": "POO",

    " goddamn": " hot dang", 
    " goddammit": " dad blast it", 
    " pussy": " wussy", 
    " penis": " unit", 

    " ballsack": " scrotum",  
    " ass ": " bottom ",
    "-ass ": "-bottom ", 
    " faggot": " male of different sexual orientation", 
    " nigger": " (a black person looked upon unfavorably)", 
    " nigga": " (friend)", 
    " Nigga": " Pal", 

 
    
    "niggaz": "folks of African American heritage", 
    
    " lick my": " let's discuss"
   


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
