// ==UserScript==
// @name Achewood Helper
// @description Makes it easier to read all of Achewood sequentually.
// @include http://achewood.com/
// @include http://www.achewood.com/
// @include http://achewood.com/index.php*
// @include http://www.achewood.com/index.php*
// ==/UserScript==

// Find the comic image.
var imgs = document.getElementsByTagName('img');
var comicImg = null;
for (var i = 0; i < imgs.length; ++i) {
  if (/comic.php/.test(imgs[i].src)) {
    comicImg = imgs[i];
    break;
  }
}
if (comicImg == null) {
  return;
}

// Sometimes the comic has an anchor as its parent node, so move up past that.
var parent = comicImg.parentNode;
var insertBefore = comicImg;
if (parent.nodeType == 1) {
  if (/a/i.test(parent.tagName)) {
    parent = parent.parentNode;
    insertBefore = comicImg.parentNode;
  }
}

// Add the header.
var header = document.createElement("h2");
var headerText = document.createTextNode(comicImg.title);
header.appendChild(headerText);
parent.insertBefore(header, insertBefore);

// Get rid of the tooltip.
comicImg.title = '';

// Find the link to the next comic.
var next = null;
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; ++i) {
  if (links[i].firstChild.nodeValue == '->') {
    next = links[i];
    break;
  }
}

// Turn the comic image into a link to the next comic.
if (next != null) {
  var anchor = document.createElement('a');
  anchor.href = next.href;
  parent.replaceChild(anchor, insertBefore);
  anchor.appendChild(comicImg);
}

