// Based on a script in Mark Pilgram's "Dive into Greasemonkey", as well as "renamer"
// Originally by Ryan McFarland
// Adapted to only replace multiple exclamation marks with the ‼ character by Yanksky
// Adapted to not break digg comments and other sites by Mossnz
// Fix cribbed from John Walker at http://www.fourmilab.ch/webtools/greasemonkey/MediaTriggerWords/


// ==UserScript== 
// @name          Excessive!
// @namespace     http://userscripts.org/users/98004
// @description   Turns excessive !! and ?? into !! or ?? respectively
// @include       * 
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    
	"[!]{2,}": "!!",
    "[?]{2,}": "??",

    };

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
		/* Test whether this text node appears within a
	   <style>, <script>, or <textarea> container.
	   If so, it is not actual body text and must
	   be left alone to avoid wrecking the page. */
	if (node.parentNode.tagName != "STYLE" &&
	    node.parentNode.tagName != "TEXTAREA" &&
	    node.parentNode.tagName != "SCRIPT") {
			/* Many documents have large numbers of empty text nodes.
	       By testing for them, we avoid running all of our
	       regular expressions over a target which they can't
	       possibly match. */
		if (!(node.data.match(/^\s*$/))) {
			for (key in replacements) { 
				s = s.replace(regex[key], replacements[key]); 
			}
		node.data = s; 
		}
	}
    
} 



})();
