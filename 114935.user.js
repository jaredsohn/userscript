// ==UserScript==
// @name Pinboard - Organize Taglist in Posting Page
// @description On the posting page that shows your tags, divides the tags up alphabetically.
// @include http://pinboard.in/add*
// @include http://www.pinboard.in/add*
// @include https://pinboard.in/add*
// @include https://www.pinboard.in/add*
// ==/UserScript==

var tags = document.evaluate("//div/a[contains(@onclick, 'add_tag')]", document, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
if (tags.snapshotLength == 0) {
    GM_log("Couldn't find tags. Exiting script.");
    return;    
}

// add an index div which will hold all the links to the various tag sections
var index = document.createElement("div");
index.id = "gm_organizeTagsIndex";
var firstTag = tags.snapshotItem(0);
firstTag.parentNode.insertBefore(index, firstTag);

var prevfirstLetter = "";
for (var i = 0; i < tags.snapshotLength; i++) {
  // get first letter of current tag
  var tag = tags.snapshotItem(i);
  var tagName = tag.innerHTML;
  tagName = tagName.replace(/^\s+|\s+$/g,"");
  tagFirstLetter = tagName.substring(0, 1).toUpperCase();
  
  // this tag's first letter same as prev tag's first letter?
  if (tagFirstLetter != prevfirstLetter) {
    // add an anchor before the current tag
    var letterLink = document.createElement("a");
    letterLink.innerHTML = tagFirstLetter;
    letterLink.name = tagFirstLetter;
    var letterP = document.createElement("p");
    letterP.className = "gm_organizeTagsLetter";
    letterP.appendChild(letterLink);
    //tag.parentNode.insertBefore(document.createElement("br"), tag);
    //tag.parentNode.insertBefore(document.createElement("br"), tag);
    tag.parentNode.insertBefore(letterP, tag);
    
    // add the new letter to the index
    var indexLetter = document.createElement("a");
    indexLetter.innerHTML = tagFirstLetter;
    indexLetter.href = "#" + tagFirstLetter;
    index.appendChild(indexLetter);
    index.appendChild(document.createTextNode(" "));
    
    // set this tag's first letter as the new one to match against
    prevfirstLetter = tagFirstLetter;
  }
}

GM_addStyle(
  '.gm_organizeTagsLetter { margin: 10px auto 0 auto; }' +
  '.gm_organizeTagsLetter a { color: #000; }' +
  '#gm_organizeTagsIndex { text-align: center; }'
);