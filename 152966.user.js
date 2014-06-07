// ==UserScript==
// @name        AO3 Story Excluder
// @namespace   7a206110-a219-11e1-b3dd-0800200c9a66
// @description Excludes a set of stories from showing up in the works list at AO3
// @include     http://archiveofourown.org/*
// @version     1
// ==/UserScript==

var excludedWorks= [
                    "work_383613",
                    "work_383617",
                    "work_397441",
                   ];
var allElements, thisElement;
allElements = document.evaluate('//li[@id]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i=0; i < allElements.snapshotLength; i++) {
    var thisElement = allElements.snapshotItem(i);
    var id = thisElement.id;
    var index = excludedWorks.indexOf(id)
    if (index != -1) {
        thisElement.style.display = 'none';
    }
}