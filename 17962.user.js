// ==UserScript==
// @name          YouTube Relinker
// @namespace     http://twilite.org/~xtina/scripts/
// @description   Replaces YouTube embedded videos with a link to the video on YouTube.
// @include       *
// ==/UserScript==

var allMovs = document.evaluate(
  "//param[@name='movie' and contains(@value, 'youtube')]",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

// Each time a param element with 'youtube' in it is found...
for (var i = 0; i < allMovs.snapshotLength; i++) {
  var thisTube = allMovs.snapshotItem(i);

  // Reformat the a-href to redirect to the youtube.com page.
  var newHref = thisTube.getAttribute('value');
  newHref = newHref.replace("/v/", "/watch?v=");
  newHref = newHref.replace("&rel=1", "");

  // Create the 'a href' link.  Comment out the target/_blank line if you don't want it opening in a new window.
  var newLink = document.createElement('a');
  newLink.setAttribute('href', newHref);
  newLink.setAttribute('target', '_blank');

  // Change '[YouTube Link]' to whatever you'd rather see, natch.
  newLink.appendChild(document.createTextNode('[YouTube Link]'));

  // Put in the link, and remove the embedded video.
  thisTube.parentNode.parentNode.insertBefore(newLink, thisTube.parentNode.nextSibling);
  thisTube.parentNode.parentNode.removeChild(thisTube.parentNode);
}
