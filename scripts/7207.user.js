// ==UserScript==
// @name                NW Book Counter
// @namespace           
// @description         Counts the number of books in a stronghold safe
// @include             http://www.nexuswar.com/map/*
// @include             http://nexuswar.com/map/*
// ==/UserScript==

var bookcount = 0;
var hbookcount = 0;
var ubookcount = 0;

var strongholdactionsdiv = document.getElementById("strongholdactions");

if (!strongholdactionsdiv) return;

var allitems = document.evaluate(
               ".//form[@name='takemisc']/select[@name='instanceID']/option",
               strongholdactionsdiv,
               null,
               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
               null);

if (!allitems.snapshotLength) return;

for (var i = 0; i < allitems.snapshotLength; i++) {
  if (allitems.snapshotItem(i).firstChild.data=="Book") {
    bookcount++;
  }
  if (allitems.snapshotItem(i).firstChild.data=="Holy Book") {
    hbookcount++;
  }
  if (allitems.snapshotItem(i).firstChild.data=="Unholy Book") {
    ubookcount++;
  }
}

strongholdactionsdiv.innerHTML += "<p>There are " + bookcount + " books / " + hbookcount + " holy books / " + ubookcount + " unholy books in the safe, librarian.</p>";