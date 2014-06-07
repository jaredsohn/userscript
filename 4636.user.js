// ==UserScript==
// @name          MozillaZine Forums - Posts permalink
// @namespace     http://loucypher.wordpress.com/
// @include       http://forums.mozillazine.org/viewtopic.php*
// @description	  Add links to posts permalinks
// ==/UserScript==

var quotelinks, quotelink, posterUA, posdetails, index, permalink, postIndex;
quotelinks = document.evaluate(
  '//td[@class="gensmallbold" and @align="right"]/a[starts-with(@href, "posting.php?mode=quote")]',
  document, null, 6, null);

posterUA = document.evaluate('//span[@class="poster_ua"]', document, null, 6, null);

for(var i = 0; i < quotelinks.snapshotLength; i++) {
  quotelink = quotelinks.snapshotItem(i);
  posdetails = posterUA.snapshotItem(i).parentNode;
  index = quotelink.href.match(/\d+/);

  postIndex = document.createElement('a');
  postIndex.href = '#' + index;
  postIndex.style.cssFloat = "right";
  postIndex.appendChild(document.createTextNode('#' + index));
  posdetails.insertBefore(postIndex, posdetails.firstChild);

  permalink = document.createElement('a');
  permalink.href = '/viewtopic.php?p=' + index + "#" + index;
  permalink.appendChild(document.createTextNode('[Permalink]'));
  quotelink.parentNode.insertBefore(permalink, quotelink);
}

