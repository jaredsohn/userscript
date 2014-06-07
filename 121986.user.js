// ==UserScript== 
// @name          Alerenom
// @namespace     http://userscripts
// @description   A spade by any other name...
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "River Plate": "Gallinas trolas", 
    "VILLA DALMINE": "DEFENSORES UNIDOS", 
    "Solo Ascenso": "Solo manga de Vergas ", 
    "Hola": "chau",
    "para": "aunque",
    "por": "nunca",
    "como": "no se",
    "Edicion Nro.": "Alejandro Masino GATO",
    "El Tiempo en Campana": "Conoce la ciudad de Zárate"}; 

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
