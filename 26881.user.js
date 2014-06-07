// ==UserScript== 
// @name          offensive_word_blocker
// @namespace     http://shaggybevo.com
// @description   Offensive word blocker (by homer)
// @include       http://*.shaggybevo.com/* 
// ==/UserScript== 

(function() {
  var replacements, regex, key, textnodes, node, s; 
  textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

  for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i);
    if (node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue)) {

      s = node.data; 

      // GUIDE: 
      // to replace any word "word" with new word "word2" do the following:
      //  s = s.replace( /\bword\b/gi, "word2");
      //
		// Note: this is case insensitive -- it will replace word, WORD, wORd,
		// Word, WoRd, etc.  with word2.
      //
		// The default cases  below puts brackets [] around the replacement word
		// as a visual cue.
		
      s = s.replace( /\baggie\b/gi, "[aggy]");
      s = s.replace( /\bTHE_MASTURBATING_BEAR\b/g, "[idiot_bear]");

      // add more rules here
      
      // do not edit below this line

      node.data = s; 
    }
  } 
})();
