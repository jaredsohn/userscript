// ==UserScript==
// @name        No more pony
// @namespace   nomorepony.js
// @version     2
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
    "pony": "Nazi",
    "ponies": "Nazies",
	"brony" : "SS Officer",
	"bronies" : "SS Officers",
	"mlp" : "The Nazi Party",
	"my little pony" : "The Third Reich",
	"equestria": "Nazi-Controlled Germany",
	"cutie mark crusader": "Hitler Youth",
	"rainbow dash": "Heinrich Himmler",
	"applejack": "Oskar Dirlewanger",
	"pinkie pie": "Odilo Globocnik",
	"fluttershy": "Adolf Eichmann",
	"twilight sparkle": "Joseph Mengele",
	"celestia": "Adolph Hitler",
	"lauren faust": "Evil Reptilian Race Overlord",
	//""  : "", //use this to make your own
    };

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'ig'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data;
	//s = s.toLowerCase();
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();


//	"clop"  : "bring jews to the shower",
//	"clopping"  : "bringing jews to the showers",
//	Considered it too tasteless to add these into the list 
//	but too good to leave out for all users. :V Works pretty well in most cases.
//	"Not all Nazy party members bring jews to the shower"