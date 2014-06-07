// ==UserScript==
// @name           Wigu Easter Eggs
// @description    See the alt text punchline in wigu (jjrowland.com).
// @version        1.0
// @author         Ryan Hughes
// @namespace      rjhughes@umich.edu:wigueastereggs
// @include        http://*.jjrowland.com/*
// @include        http://jjrowland.com/*
// ==/UserScript==


function getAltText() {
  var candidates = document.evaluate(
      '//body/table[3]//table[1]/tbody/tr[2]//img', 
      document, 
      null, 
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
      null);

  var comicimg = candidates.snapshotItem(0);
  if (comicimg && comicimg.title) { return comicimg.title; }
  else { return ""; }
} // function getAltText

function makePlaceForIt() {
  var candidates = document.evaluate(
      '//body/table[3]//table[1]/tbody/tr[2]//table[1]/tbody', 
      document, 
      null, 
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
      null);
  var placeforit = candidates.snapshotItem(0);
  var newtr = document.createElement('tr');
  var newtd = document.createElement('td');
  newtr.appendChild(newtd);
  newtd.colSpan = 3;
  var tinydiv = document.createElement('div');
  tinydiv.className = "tiny";
  tinydiv.style.textAlign = "center";
  newtd.appendChild(tinydiv);
  placeforit.appendChild(newtr);

  return tinydiv;
} // function makePlaceForIt


(function () {
  var alttext = getAltText();
  
  var placeforit = makePlaceForIt();

  var b = document.createElement("b");
  b.appendChild(document.createTextNode("alt text: "));
  placeforit.appendChild(b);
  placeforit.appendChild(document.createTextNode(alttext));
}());



