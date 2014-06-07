// ==UserScript==
// @name           Google Video Super Framebuster
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Replaces all framed links with good links, linkifies the URL, and finally inserts a "Watch in frame" link
// @include        http://video.google.tld/videosearch?*
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-10-15 - Fixed for long URLs
2007-10-10 - Made

*/

var searchResults = document.evaluate('//div[@class="SearchResultItem"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchResult;
for(var c = 0; searchResult = searchResults.snapshotItem(c); c++) {
  var thumbLink = xp1('.//td[@class="MainThumbnail"]//a');
  var frameUrl = thumbLink.href;
  var url = decodeURIComponent(frameUrl.match(/srcurl=([^&]+)/)[1]);
  thumbLink.href = url;
  xp1('.//div[@class="Title"]/a').href = url;
  var urlDiv = xp1('.//div[@class="Url"]');
  var link = document.createElement('a');
  link.href = url;
  link.innerHTML = urlDiv.innerHTML;
  link.style.color = 'inherit';
  link.style.textDecoration = 'inherit';
  urlDiv.replaceChild(link, urlDiv.firstChild);
  var frameLink = document.createElement('a');
  frameLink.href = frameUrl;
  frameLink.innerHTML = 'Watch in frame';
  frameLink.title = 'Since the normal frame links were Greased away';
  var linkbar = xp1('.//div[@class="PreviewAndSpecialCaseLinks"]');
  linkbar.appendChild(document.createTextNode(' - '));
  linkbar.appendChild(frameLink);
}

function xp1(path) {
  return document.evaluate(path, searchResult, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}