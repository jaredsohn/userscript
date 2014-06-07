// ==UserScript== 
// @name WAW Word Changer
// @description Spices Up WAWtism
// @include * 
// @version Codename: Cesar
// @homepage http://userscripts.org/scripts/show/486854
// ==/UserScript==

(function() { 
var bad = [], good = [], modifiers = [];


// START CONFIGURATION 

populate({  
// This list is case SENSITIVE, i.e. uppercase and lowcase are treated differently 

 "Steel": "Steel",
 "Titanium": "Titanium",
 "Aluminum": "Aluminum", 
 "Hydrogen Fuel": "Hydrogen Fuel",
 "emone": "emone",
 "space china": "space china",
 "dur4dayz": "dur4dayz",  
 "NERDS": "NERDS",
 " GIVE HEIDI MUNNY": " GIVE HEIDI MUNNY",
 "Alliance": "Alliance",

	 
  
// [End of custom word list]   
}, "g"); 


// END CONFIGURATION

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