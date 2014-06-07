// ==UserScript==
// @name          Don't Subscribe in iTunes
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Many podcasts have "subscribe" links that point to apple.com instead of the feed. Fix that.
// @include       http://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/browserRedirect*Podcast*
// @include       http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStore.woa/wa/browserRedirect*Podcast*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-12-02 - Created
2009-11-03 - Added ax.itunes.apple.com @include rule

*/

function nsResolver() {
  return 'http://www.apple.com/itms/';
}

// First, don't open itms
location.href = 'javascript:void(itmsOpen=null)';

// Next, find the feed URL and open it
var podcastId = decodeURIComponent(decodeURIComponent(location.search)).match(/id=(\d+)/)[1];
GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStore.woa/wa/viewPodcast?id=' + podcastId,
  onload: function(details) {
    var parser = new DOMParser;
    var doc = parser.parseFromString(details.responseText, 'application/xml');
    var feedUrl = doc.evaluate('//i:key[text()="feedURL"]/following-sibling::i:string', doc, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    location.href = feedUrl;
  }
});
