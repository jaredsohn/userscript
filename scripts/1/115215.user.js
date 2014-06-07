// ==UserScript==
// @name Pinboard - Taglist Highlighting in Posting Page
// @description When adding a bookmark using the "popup with tags" page, highlight assigned tags in the taglist.
// @include http://pinboard.in/add*
// @include http://www.pinboard.in/add*
// @include https://pinboard.in/add*
// @include https://www.pinboard.in/add*
// ==/UserScript==

//***** CONFIGURATION *****

var highlightStyle = "background-color: rgb(255, 248, 198);";

//***** CODE ******

highlightStyle = highlightStyle.trim();
if (highlightStyle.charAt(highlightStyle.length-1) == ";") {
  highlightStyle = highlightStyle.substring(0, highlightStyle.length-1);
}

// Only bother with this whole process if we can identify the "tags" form element
var tagsInput = document.getElementById("tags");
if (!tagsInput) {
  GM_log("Can't find tags element. Exiting script.");
  return;
}	

// get the tags in the taglist
var taglist = document.evaluate("//div/a[contains(@onclick, 'add_tag')]", document, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
if (taglist.snapshotLength == 0) {
    GM_log("Couldn't find tag list. Exiting script.");
    return;    
}

var prevTags = [];
addEventListeners();

// get autocomplete div -- can take a while since it has to be 
// constructed by the page before it's available
var pinAC = null;
var maxPinACAttempts = 3;
for (var i = 0; i < maxPinACAttempts; i++) {
  window.setTimeout(function() { getPinAC(); }, i * 300);
}

function getPinAC() {
  if (pinAC == null) {
    var nodes = document.evaluate("//div[contains(@class, 'pin-ac')]", document, null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              null);
    if (nodes.snapshotLength == 1) {
      // track mousedowns on the autocomplete dropdown
      pinAC = nodes.snapshotItem(0);
      pinAC.addEventListener("mousedown", function(event) {highlightTags();}, false);
    }
  }
}

function addEventListeners() {
  for (var i = 0; i < taglist.snapshotLength; i++) {
    var t = taglist.snapshotItem(i);
    
    // give each tag link a unique ID based on its innerHTML
    var tagName = escapeTag(t.innerHTML.trim());
    t.id = "gm_highlightTags_" + tagName.toLowerCase();
    
    // and listen to every tag link click
    t.addEventListener("click", function(event) {highlightTags();}, false);
  }
  
  // track events on the tags input
  tagsInput.addEventListener("keyup", function(event) {highlightTags();}, false);
  tagsInput.addEventListener("change", function(event) {highlightTags();}, false);
    
  // highlight any pre-assigned tags
  highlightTags();
}

// the function that highlights the tags!
function highlightTags() {

  // check the difference between the tags that are now in the tags input and
  // the ones that were in there the last time we highlighted
  var newTags = tagsInput.value.trim().toLowerCase();
  if (newTags == "") {
    newTags = [];
  }
  else {
    newTags = newTags.split(/\s+/);
  }
  var addHighlight = diff(newTags, prevTags);
  var removeHighlight = diff(prevTags, newTags);
  
  // remove highlighting from tags that got deleted
  for (var i = 0; i < removeHighlight.length; i++) {
    var tagId = "gm_highlightTags_" + escapeTag(removeHighlight[i]);
    var tnode = document.getElementById(tagId);
    if (tnode) {
      var style = tnode.getAttribute("style");
      var newStyle = removeStyle(highlightStyle, style);
      tnode.setAttribute("style", newStyle);
    }
  }
  
  // highlight the tags that were added
  for (var i = 0; i < addHighlight.length; i++) {
    var tagId = "gm_highlightTags_" + escapeTag(addHighlight[i]);
    var tnode = document.getElementById(tagId);
    if (tnode) {
      style = tnode.getAttribute("style");
      var newStyle = addStyle(highlightStyle, style);
      tnode.setAttribute("style", newStyle);
    }
  }
  
  // set the current tags
  prevTags = newTags;
}

function removeStyle(styleToDelete, wholeStyle) {
  var style = wholeStyle.trim().split(/\s*;\s*/);
  var newStyle = "";
  for (var s = 0; s < style.length; s++) {
    if ((style[s].trim() != styleToDelete) && (style[s].trim() != "")) {
      newStyle = style[s] + ";";
    }
  }
  return newStyle;
}

function addStyle(styleToAdd, wholeStyle) {
  var style = wholeStyle.trim();
  if (style.charAt(style.length-1) != ";") {
    style = style + ";";
  }
  return style + styleToAdd + ";";
}

function escapeTag(tag) {
  var escapedTag = tag.replace(/[\']/g,"_");
  return escapedTag.replace(/[\"]/g,"__");
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
};

function diff(a, b) {
  var diff = [];
  var match = false;
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      if (a[i] === b[j]) {
        match = true;
        break;
      }
    }
    match ? match = false :  diff.push(a[i]);
  }
  return diff;
}