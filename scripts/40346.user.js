// ==UserScript== 
// @name          atilf-replacer.
// @namespace     http://atilf.atilf.fr
// @description   replace les abréviations de l'ATILF.
// @include       http://atilf.atilf.fr/dendien/scripts/* 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "adj\\.": "adjectif", 
    "subst\\.": "substantif", 
    "masc\\.": "masculin",
    " fém\\.": " féminin",
    " compl\\.": " complément",
    "const\\.": "construction",
    "Dict\\.": "Dictionnaire",
    " ex\\.": "exemple",
    " prép\\.": "préposition",
    " Fréq\\.": " Fréquence",
    " mus\\.": " musique",
    " MUS\\.": " MUSIQUE",
    " styl\\.": " stylistique",
    " contemp\\.": " contemporain(e)",
    " p\\.":" page",
    " LING\\.":" linguistique",
    " s\\.":" siècle",
    "etymol\\.":"etymologie",
    "STAT\\.":"STATISTIQUE",
    " Fam\\.":" Familier",
    " Arg\\.":" Argot",
    " péj\\.":" péjoratif"   
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
