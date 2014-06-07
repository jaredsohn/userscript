// ==UserScript==
// @name           Google Quote-Adder
// @description    Adds a button that puts quotemarks around your Google search string. The semicolon key also works.
// @include        http://*.google.com/*
// @exclude        http://maps.google.com/*
// @exclude        http://*.google.com/preferences/*
// ==/UserScript==

var SearchBoxes, AQButton;
var semicolon = 59;
var enter = 13;

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, 
                            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function last (arr) {
  return arr[arr.length-1];
}

function stripSemis (a) {
  a.value = a.value.replace(/;/g,"");
}

function makeAQButton () {
  AQButton = document.createElement("input");
  AQButton.value="Add quotes";
  AQButton.type="button";
  AQButton.name="btnQ";
  AQButton.title="or press semicolon key";
}

function addQuotes (b) {
  s = b.selectionStart;
  e = b.selectionEnd;
  if (s != e) {
    b.value = b.value.substr(0,s) + b.value.substr(e);
  }
  c = b.value.lastIndexOf('"',s);
  while ((b.value[c+1] == ' ') || (b.value[c+1] == ';'))  
    {c += 1;}
  while ((b.value[s-1] == ' ') || (b.value[s-1] == ';'))  
    {s += -1;}
  b.value = b.value.substr(0,c+1) + '"' + b.value.slice(c+1,s) + '"' + b.value.slice(s);
  b.focus();
  b.selectionStart = s+2;   // +2 because we added 2 quotemarks
  b.selectionEnd = s+2;
}

function setup(a) {
  makeAQButton ();
  var buttons = $x(".//input[@type='submit']",a.parentNode);
  insertAfter(AQButton,last(buttons));
  AQButton.addEventListener ("click",function(){addQuotes(a)},true);
  a.addEventListener ("keypress",function(evt) {
                        if (evt.charCode == semicolon) {addQuotes(a)}
                      },true);
  a.addEventListener ("keydown",function(evt) {
                        if (evt.which == enter) {stripSemis(a)}
                      },true);
  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener ("click",function(){stripSemis(a)},true);
  }
}

SearchBoxes = $x('//input[contains(@name, "q")]');
setup (SearchBoxes[0]);
if (SearchBoxes.length > 1) {         // deal with search box at bottom of page
  setup (last(SearchBoxes));
}
