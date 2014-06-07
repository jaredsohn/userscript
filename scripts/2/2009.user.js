// ==UserScript==
// @name           RateBeer Rating Form Widener
// @namespace      http://www.ratebeer.com
// @description    Widens the ratings entry area
// @include        http://www.ratebeer.com/beer/*
// @include        http://www.ratebeer.com/Ratings/*
// ==/UserScript==

var entryCell, middleCell, cells;

// Get rid of the width on the middle column
cells = document.evaluate(
    '//td[@class="beer" and @width="85%"][1]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

if (cells.snapshotLength > 0)
{
 entryCell = cells.snapshotItem(0);
 entryCell.width = "";
 entryCell.id = "middleCell";
}

// Set the width on the right column
cells = document.evaluate(
    '//td[@class="beerhed" and @width="250"][1]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
if (cells.snapshotLength > 0)
{
 entryCell = cells.snapshotItem(0);
 entryCell.width = "400";
 entryCell.style.width = "400px";
 entryCell.id = "entryCell";
}

// Enlarge the comments box
var box;

box = document.getElementById("comments");
if (box == null)
{
  box = document.getElementById("Comments");
}

if (box != null)
{
  box.style.width = "100%";
  box.style.height = "200px";
}