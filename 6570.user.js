// ==UserScript==
// @name           Wikipedia single column diffs
// @namespace      http://mywebsite.com/myscripts
// @description    Make Wikipedia diff pages read like patch-format diffs, only one column needed
// @include        http://en.wikipedia.org/w/index.php?*&diff=*
// ==/UserScript==



// remove the header for the previous revision, and add the next/prev links to the second header
var prevHeader = get("//table[@class='diff'][1]/tbody/tr[1]/td[@class='diff-otitle']");
var nextHeader = get("//table[@class='diff'][1]/tbody/tr[1]/td[@class='diff-ntitle']");
var oldedit = get("//table[@class='diff'][1]/tbody/tr[1]/td[@class='diff-otitle']/a[@id='differences-prevlink']");
var newedit = get("//table[@class='diff'][1]/tbody/tr[1]/td[@class='diff-ntitle']/a[@id='differences-nextlink']");
for(var i = 0; i < prevHeader.snapshotLength; i++) {
  if(oldedit.snapshotLength != 0) {
    nextHeader.snapshotItem(i).appendChild(oldedit.snapshotItem(0));
  }
  if(oldedit.snapshotLength != 0 && newedit.snapshotLength != 0) {
    nextHeader.snapshotItem(i).appendChild(document.createTextNode(" | "));
  }
  if(newedit.snapshotLength != 0) {
    nextHeader.snapshotItem(i).appendChild(newedit.snapshotItem(0));
  }
  remove(prevHeader.snapshotItem(i));
}



// clone rows where the line changed but wasn't added/deleted, and delete where appropriate
var changedLines = get("//table[@class='diff'][1]/tbody/tr/td[@class='diff-addedline' and position()=4]/../td[@class='diff-deletedline' and position()=2]")
for(var i = 0; i < changedLines.snapshotLength; i++) {
  var cell = changedLines.snapshotItem(i);

  cell.parentNode.parentNode.insertBefore(
    cell.parentNode.cloneNode(true),
    cell.parentNode
  );

  remove(cell.previousSibling.previousSibling);
  remove(cell);
}



// delete blank cells in the first column to move the added lines into the first column
var blankcells = get("//table[@class='diff'][1]/tbody/tr/td[1]");
for(var i = 0; i < blankcells.snapshotLength; i++) {
  if(blankcells.snapshotItem(i).innerHTML == "&nbsp;") {
    remove(blankcells.snapshotItem(i));
  }
}

// delete everything past the second td in each column
var waste = get("//table[@class='diff'][1]/tbody/tr/td[2]");
for(var i = 0; i < waste.snapshotLength; i++) {
  while(waste.snapshotItem(i).nextSibling) {
    remove(waste.snapshotItem(i).nextSibling);
  }
}

// delete the 2nd line number cell in each column
var line = get("//table[@class='diff'][1]/tbody/tr/td[@class='diff-lineno'][1]");
for(var i = 0; i < line.snapshotLength; i++) {
  remove(line.snapshotItem(i));
}

// delete the extra cols
var cols = get("//table[@class='diff'][1]/col");
for(var i = 0; i < cols.snapshotLength; i++) {
  var col = cols.snapshotItem(i);
  if(col.className == "diff-content") {
    col.style.width = "98%";
    col.removeAttribute("class");
  }
  if(i > 1) remove(col);
}

// shorthand function to remove nodes
function remove(node) {
  node.parentNode.removeChild(node);
}


// xpath function
function get(query) {
  return document.evaluate(
    query,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
}