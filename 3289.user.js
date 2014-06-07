// ==UserScript==
// @name          digg.licio.us
// @namespace     http://loucypher.wordpress.com/
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// @exclude       http://digg.com/api/*
// @exclude       http://www.digg.com/api/*
// @description   Adds links to save a Digg story to Delicious
// ==/UserScript==

// Last updated: 2008-09-11

(function() {
var diggEm = document.evaluate("//li[@class='digg-it'] | " +
                               "//li[@class='dugg-it'] | " +
                               "//li[@class='undigg-it'] | " +
                               "//li[@class='buried-it']",
                               document, null, 6, null);

if (!diggEm.snapshotLength) return;

var diggIt;
for(var i = 0; i < diggEm.snapshotLength; i++) {
  diggIt = diggEm.snapshotItem(i);
  diggIt.style.cssFloat = "none";
  addSaveIt(diggIt.parentNode, i);
}

function getXPathNode(aXPath) {
  return document.evaluate(aXPath, aContext, null, 0, null).iterateNext();
}

function addSaveIt(aNode, aIndex) {
  var sLink = aNode.parentNode.getElementsByTagName("h3")[0]
                              .getElementsByTagName("a")[0];
  if (!sLink) return;

  var sTitle = sLink.textContent;
  var notes = sLink.parentNode.parentNode.getElementsByTagName("p");
  for (var i = 0; i < notes.length; i++) {
    if (!notes[i].hasAttribute("class"))
      var note = notes[i].textContent;
  }

  var list = aNode.appendChild(document.createElement("li"));
  list.className = "digg-it";
  list.style.marginTop = "-1px";

  var link = list.appendChild(document.createElement("a"));
  link.href = "http://delicious.com/save?jump=close" +
              "&url=" + encodeURIComponent(sLink) +
              "&title=" + encodeURIComponent(sTitle) +
              "&notes=" + encodeURIComponent(note);
  link.title = "Save this story to Delicious";
  link.appendChild(document.createTextNode("save it"));
  if (link.parentNode.previousSibling
                     .previousSibling.className == "buried-it")
    link.appendChild(document.createTextNode("?"));

  // open in new tab/window
  link.addEventListener("click", function(e) {
    e.preventDefault();
    if (typeof GM_openInTab == "function") {
      GM_openInTab(e.target.href + "&jump=close");
    } else {
      window.open(e.target.href + "&jump=close");
    }
  }, false);
}
})()