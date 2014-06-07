// ==UserScript== 
// @name Brave Sir Robin 
// @namespace none 
// @description Applies appropriate name
// @include * 
// @version 20100410.0858

/*
If one interpretation of a post has everything to do with the OP, and the other interpretation of the post does not have a single thing to do with the OP... you should probably pick the former before embarrassing yourself.
*/ 

// ==/UserScript==
(function() { 
var bad = [], good = [], modifiers = [];



populate({
"FlamingoChavez":"Brave Sir Robin" 

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
