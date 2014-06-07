// ==UserScript==
// @name           ibdof index page
// @namespace      http://www.ibdof.com/index.php
// @description    re-format the Index.php page
// @include        http://www.ibdof.com/index.php*
// ==/UserScript==

/*
  Find the header titles 'Topic || Post || Last Post'
    and duplicate them above each forum category
  Insert a row seperator between forum categories
  Note: cell addresses are relative to table[3] == class 'forumline'
*/
(function () {
  // grab the th header titles
  var thsrc = document.evaluate(
      "//table[3]//th", 
      document, 
      null, 
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  // now find all the forum category headers and ...
  dev = document.evaluate(
      "//table[3]//td[@class='catLeft']/parent::tr", 
      document, 
      null, 
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  // ... clone the th headers cells in place of the original single cell
  for (i = 0; i < dev.snapshotLength; i++) {
    var c = dev.snapshotItem(i);
    c.replaceChild(thsrc.snapshotItem(1).cloneNode(true), c.getElementsByTagName('td')[1]);
    c.appendChild(thsrc.snapshotItem(2).cloneNode(true));
    c.appendChild(thsrc.snapshotItem(3).cloneNode(true));
  }

  // create a largish blank row before each category header row - not the first one!
  for (i = 1; i < dev.snapshotLength; i++) {
    var c = dev.snapshotItem(i).parentNode.insertBefore(document.createElement('tr'),dev.snapshotItem(i));
    c = c.appendChild(document.createElement('td'));
    c.className = 'spacerow';
    c.height = '50';
    c.colSpan = '5';
  }
  
  // done what we needed to, now remove the 3 TH cells from the header and ...
  for (i = 1; i < thsrc.snapshotLength; i++)
    thsrc.snapshotItem(i).parentNode.removeChild(thsrc.snapshotItem(i));
  // ... replace with a full width "colspan=3" cell
  c = thsrc.snapshotItem(0).parentNode.appendChild(document.createElement('th'));
  c.className = 'thTop';
  c.height = '28';
  c.colSpan = '3';

}());
