// ==UserScript==
// @name           Replacer
// @description    Replacer
// @include        http://chat.stackoverflow.com/*
// @version        1.0
// ==/UserScript==

//replace a polluting word 

// individual letters 
var letters = [
	/([s5])/gi,
	/(m)/gi,
	/([o0])/gi,
	/(k)/gi,
	/([e3])/gi
];

var occurences = [
	/([s5]+)/gi,
	/(m+)/gi,
	/([o0]+)/gi,
	/(k+)/gi,
	/([e3]+)/gi
];
 
var replacement = 'swim'.split('');

var re = /[s5]+m+[o0]*k+[e3]*/gi;

function replaceText(oldText, newText, node){ 
  node = node || document.body; // base node 

  var childs = node.childNodes, i = 0;

  while(node = childs[i]){ 
    if (node.nodeType == Node.TEXT_NODE){

    	if (node.textContent.match(re)){
			for (var i=0; i<letters.length; i++){
				var repl = Array(node.textContent.match(occurences[i]).length).join(replacement[i]||'');
				node.textContent.replace(letters[i], repl);
			}
    		
    	}
    } else { // not a text mode, look forward
      replaceText(oldText, newText, node); 
    } 
    i++; 
  } 
  return i;
}
