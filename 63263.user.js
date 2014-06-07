// ==UserScript==
// @name           Word Change - desudesu Style.
// @namespace      desudesuWordChange
// @description    Edit and change text of words to your own text - desudesu style
// @include        *
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = {
  
  //case sens
  
  //safe replace

"deviantART": "deviantDESU",
"dA": "dD",
 
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

"fuck": "desudesu", 
"shit": "desudesu",
"damn": "desudesu",
"crap": "desudesu",
"sex": "uberdesudesu",
"cock": "desudesu",
"penis": "desudesu",
"fgt": "desudesu",
"faggot": "desudesu",
"gay": "desudesudesu",
"nigger": "desudesu",
"nigga": "desudesu",
"cunt": "desudesu",
"sexy": "kawaiidesudesu",
"rape": "desudesu",
"raep": "desudesu",
"yaoi": "desudesu",
"cum": "desudesu",
"boner": "desudesu",
"erection": "desudesu",
"dick": "desudesu",
"tard": "desudesu",
"buttsecks": "desudesu",
"ejaculat": "desudesudesu",
"anal": "desudesu",
"came": "desudesudesu'd",
"deathbal101": "desufringe101",
"thrax094": "kawaiidesu094",
"extraespresso": "desuspresso",
"draconis-wyrm": "draconis-desu",


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