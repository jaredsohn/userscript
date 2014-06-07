// ==UserScript==
// @name Pinboard - Style Posting Page Taglist
// @description On the posting page that shows your tag list, append some custom styling to certain (user-defined) tags. Requires you to edit the script file a bit.
// @include http://pinboard.in/add*
// @include http://www.pinboard.in/add*
// @include https://pinboard.in/add*
// @include https://www.pinboard.in/add*
// ==/UserScript==


// ***** CONFIGURATION *****

var tagContains = {
  '/' : 'font-weight: bold;'
}

var tagBeginsWith = {
  'author:' : 'display: none;',
  'pairing:' : 'display: none;'
}

var tagIs = {
  'fanfic' : 'background-color: black; color: black;'
}

// ***** CODE *****

var tags = document.evaluate("//div/a[contains(@onclick, 'add_tag')]", document, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
if (tags.snapshotLength == 0) {
    GM_log("Couldn't find tags. Exiting script.");
    return;    
}

for (var i = 0; i < tags.snapshotLength; i++) {
  var tag = tags.snapshotItem(i);
  
  // get the tag name
  var tagName = tag.innerHTML;
  tagName = tagName.trim();
  tagName = tagName.toLowerCase();
  
  var span = null;
  var style = "";
  
  // check for tags containing any of the tagContains text
  for (var contains in tagContains) {
    if (tagName.indexOf(contains.toLowerCase()) != -1) {
      if (span === null) {
        span = addSpan(tag);
      }
      style = style + tagContains[contains];
    }
  }
  
  // check for tags begining with any of the tagBeginsWith text
  for (var begins in tagBeginsWith) {
    if (tagName.indexOf(begins.toLowerCase()) == 0) {
      if (span === null) {
        span = addSpan(tag);
      }
      style = style + tagBeginsWith[begins];
    }
  }
  
  // check for tags that exactly match any of the tagIs text
  for (var tagIsText in tagIs) {
    if (tagName == tagIsText.toLowerCase()) {
      if (span === null) {
        span = addSpan(tag);
      }
      style = style + tagIs[tagIsText];
    }
  }
  
  if (span != null && style != null) {
    span.setAttribute("style", style);
  }
}

function addSpan(tag) {
  var span = document.createElement("span");
  var node = tag.nextSibling;
  tag.parentNode.insertBefore(span, tag);
  tag.parentNode.removeChild(tag);
  span.appendChild(tag);      
  while (node && node.nodeType == 3) { 
    var next = node.nextSibling;
    node.parentNode.removeChild(node);
    span.appendChild(node);
    node = next;
  }
  return span;
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}