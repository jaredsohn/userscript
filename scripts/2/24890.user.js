// ==UserScript==
// @name           Similar Identifonts
// @namespace      http://www.identifont.com/
// @description    Creates a "Fonts By Similarity" link next to each font in a list.
// @include        http://www.identifont.com/*
// ==/UserScript==

// I can click on a font in a list to see it.  I wanted a link next to each
// font so I could see other fonts like that font.  I'm a dork, so sue me.

var firstElm = document.getElementsByTagName("h3")[0];
var checkPage = firstElm.childNodes[0].nodeValue;
if (checkPage == 'Similar fonts') {
  var pertCell = document.evaluate(
    ".//table//tr[3]/td[2]/table/tbody/tr",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  for (var i = 0; i < pertCell.snapshotLength; i++) {
    var thisCell = pertCell.snapshotItem(i);
    var theFont = thisCell.getElementsByTagName("a")[0];
    if (theFont == null) {
      var theFont = thisCell.getElementsByTagName("b")[0];
    }
    var fontText = theFont.childNodes[0].nodeValue;
    var newText = fontText.replace(/ /g,'+')
    newText = newText.replace(/\(/, '%28');
    newText = newText.replace(/\)/, '%29');

//Ending pipe.
    theFont.parentNode.insertBefore(document.createTextNode('|'), theFont.nextSibling);

    var newNode = document.createElement('span');
    newNode.setAttribute('title', 'Find a font similar to ' + fontText + '.');
    var simFont = document.createElement('a');
    simFont.setAttribute('href', 'http://www.identifont.com/find?similar=' + fontText + '&q=Go');
    simFont.appendChild(document.createTextNode('s'));
    newNode.appendChild(simFont);
    theFont.parentNode.insertBefore(newNode, theFont.nextSibling);

//Middle pipe.
    theFont.parentNode.insertBefore(document.createTextNode('|'), theFont.nextSibling);

    var newNode = document.createElement('span');
    newNode.setAttribute('title', 'Look for fonts named ' + fontText + '.');
    var simFont = document.createElement('a');
    simFont.setAttribute('href', 'http://www.identifont.com/find?font=' + fontText + '&q=Go');
    simFont.appendChild(document.createTextNode('n'));
    newNode.appendChild(simFont);
    theFont.parentNode.insertBefore(newNode, theFont.nextSibling);

//Opening pipe, hence the space.
    theFont.parentNode.insertBefore(document.createTextNode(' |'), theFont.nextSibling);
  }
}
