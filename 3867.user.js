// ==UserScript==
// @name          Google Video source getter
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Download the source video directly, rather than the Google Video Player wrapper
// @include       http://video.google.com/*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-01-30 - Started, finished

*/

function findGvp() {
  for(var c = 0, link; link = document.links[c]; c++) {
    if(/^http:\/\/video\.google\.com\/videogvp\/.*?\.gvp\?docid=/.test(link.href)) {
      return link.href;
    }
  }
}

function getSourceVideoLink(gvpLink, callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: gvpLink,
    onload: function(responseDetails) {
      callback(responseDetails.responseText.match(/^url:(.*)/m)[1]);
    }
  });
}

function markPageAsGreasy() {
  var img = document.createElement('img');
  img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAFCAIAAABeh%2FKWAAAABGdBTUEAALGPC%2FxhBQAAAEdJREFUKJFj%2BA8EDAwIBAdYBYkRRwN4DEdi49CMrBSPEeQpxuY%2BBgJGEBkeyIJEhhOqjeS6g8jwIFIXyB24nEyS%2B0j1DIY7AJDd1TlMlglxAAAAAElFTkSuQmCC';
  img.alt = 'Greasy';
  img.border = 0;
  img.style.display = 'block';
  dlButton.parentNode.insertBefore(img, dlButton);
}

var dlButton = document.evaluate('//div[@id="thumbsetc"]/a[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
getSourceVideoLink(findGvp(), function(videoLink) {
  dlButton.setAttribute('onclick', '');
  dlButton.parentNode.href = videoLink;
  markPageAsGreasy();
});