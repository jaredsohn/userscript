// Based on http://userscripts.org/scripts/show/53038

// ==UserScript==
// @name          Remove Redundant Punctuation from Facebook
// @namespace     http://userscripts.org/users/83966
// @description   Reduces redundant punctuation to a single instance. Facebook version
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @include       http://*.fbcdn.net/*
// @version       1.05 - Updated for FB layout change
// @notes         Targeting 5 specific classes (span.UIStory_Message, h3.GenericStory_Message, div.comment_actual_text [all comment areas], div.info_section [profiles] div.walltext [view comment pages re: pictures])
//                Removed tag check for style, textarea, script since we specifically look for the tags w/ classes
//                Left dev console.profile() {commented}
//                Speed improvement -> (pages load almost instantly // heave full page < 800ms, comments/ajax read more almost native speed)
//                Greatly improves visible content/page navigation while parsing.
//                Cleaned up code formatting of regex
// ==/UserScript==

//console.profile();
document.addEventListener("DOMNodeInserted", documentChanged, false);
//console.profileEnd();

function documentChanged(event) {
  removeRedundant();
}

function removeRedundant(){
  var replacements, regex, key, textNodes, node, nodeData;
  replacements = { 
    "[!]{2,}": "! ",
    "[?]{2,}": "? ",
    "[.]{3,}": "... ",
    "[>]{2,}": ">",
    "\w[ ]{2,}": ". ",
  };

  regex = {};
  for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
  }

  textNodes = document.evaluate("//span[@id='profile_status']//text() | //div/h6[@class='uiStreamMessage']//text() | //span[@class='UIStory_Message']//text() | //div[@class='comment_actual_text']//text() | //div[@class='info_section']//text() | //h3[@class='GenericStory_Message']//text() | //div[@class='walltext']//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                                
  for (var i = 0; i < textNodes.snapshotLength; i++) {
    node = textNodes.snapshotItem(i);
    if(!(node.data.match(/^\s*$/))) {
      nodeData = node.data;
      for (key in replacements) {
        nodeData = nodeData.replace(regex[key], replacements[key]);
      }
      node.data = nodeData;
    }
  }
}