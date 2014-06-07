// ==UserScript==
// @name           MusicBrainz Paper CD case
// @namespace      http://wiki.musicbrainz.org/OutsideContext
// @description    Create a paper CD case from a release in MusicBrainz
// @author         OutsideContext
// @include        http://musicbrainz.org/release/*.html
// ==/UserScript==

// Grab the artist's name
var artistResult = document.evaluate('//table[@class="artisttitle"]//td[@class="title"]/a/text()', document, null, XPathResult.ANY_TYPE, null);
var artist = artistResult.iterateNext().textContent;

// Grab the release title
var titleResult = document.evaluate('//table[@class="releasebegin"]//td[@class="title"]/a/text()', document, null, XPathResult.ANY_TYPE, null);
var title = titleResult.iterateNext().textContent;

// Grab all track titles
var trackResult = document.evaluate('//table[@class="releasetracks"]//td[@class="title"]/a/text()', document, null, XPathResult.ANY_TYPE, null);
var track = null;
var tracks = new Array();
while (track = trackResult.iterateNext())
    tracks.push(track.textContent);

// Create a submission URI
uri = "http://papercdcase.com/advanced.php?artist=" + encodeURI(artist) + "&title=" + encodeURI(title);
for (var i = 0; i < tracks.length; i++)
    uri += "&track" + (i+1) + "=" + encodeURI(tracks[i]);

// Create a HTML link element
var a = document.createElement("a");
var href = document.createAttribute("href");
href.nodeValue = uri;
a.setAttributeNode(href);
a.appendChild(document.createTextNode("Create paper CD case"));

// Add the link to the page
var containerResult = document.evaluate('//table[@class="releaselinks"]//td[@class="info"]', document, null, XPathResult.ANY_TYPE, null);
var container = containerResult.iterateNext();
container.insertBefore(document.createTextNode(" | "), container.lastChild);
container.insertBefore(a, container.lastChild);

