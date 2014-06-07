// ==UserScript==
// @name           FlexWiki Toc
// @namespace      http://www.np80.com/
// @author         Antoine Aubry
// @description    Generates a table of contents from the headings present in a FlexWiki page
// @include        http://www.flexwiki.com/default.aspx*
// @include        http://www.flexwiki.com/
// ==/UserScript==

var anchorPrefix = "Toc_";
var root = document.getElementById("MainRegion");
if(root == null) {
  root = document.getElementById("TopicBody");	// Flexwiki version 2
}

var headings = document.evaluate('.//h1|.//h2|.//h3', root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var anchorCount = 0;
var currentList = document.createElement("ol");
var lists = [currentList];
var currentLevel = 1;
for(var i = 0; i < headings.snapshotLength; ++i) {
  var heading = headings.snapshotItem(i);
  var level = parseInt(heading.tagName.charAt(1));
  
  while(currentLevel < level) {
    var previousList = currentList;
    lists.push(previousList);
    currentList = document.createElement("ol");
    previousList.appendChild(currentList);
    ++currentLevel;
  }
   
  while(currentLevel > level) {
    currentList = lists.pop();
    --currentLevel;
  }
  
  var text = document.createTextNode(heading.textContent);

  var link = document.createElement("a");
  link.href = "#" + anchorPrefix + anchorCount;
  link.appendChild(text);

  var item = document.createElement("li");
  item.appendChild(link);
  
  currentList.appendChild(item);
 
  var anchor = document.createElement("a");
  anchor.name = anchorPrefix + anchorCount;
  heading.insertBefore(anchor, heading.firstChild);

  ++anchorCount;
}

if(lists.length > 0) {
  root.insertBefore(lists[0], root.firstChild);

  var heading = document.createElement("h1");
  heading.appendChild(document.createTextNode("Table of Contents"));
  root.insertBefore(heading, root.firstChild);
}
