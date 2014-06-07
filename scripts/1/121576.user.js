// ==UserScript== 
// @name          Renombrar
// @namespace     http://overstimulate.com/userscripts
// @description   A spade by any other name...
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "Gallinas trolas": "Gallinas trolas", 
    "Se fueron a la B": "Se fueron a la B", 
    "sol": "Puto", 
    "Hola": "chau",
    "para": "gorda",
    "por": "nunca",
    "como": "no se",
    "estás": "orto",
    "la": "no"
    "los": "el"
    "el": "se"
"es": "casa"
"con": "par"
"las": "sal"
    "Shtyle": "Caza Boludos",
    "Feo": "Feo"}; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();
