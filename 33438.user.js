// ==UserScript==
// @name          TV250.de IMDb Top 250 im TV
// @namespace     http://www.tv250.de/
// @description   Erweitert IMDb Top 250 mit TV Termine aus dem deutschsprachigen Raum und jede Seite eines Filmtitels
// @version       5
// @date          2009-04-30
// @source        http://userscripts.org/scripts/show/33438
// @include       http://*.imdb.*/chart/top
// @include       http://*.imdb.*/title/*
// ==/UserScript==

/* ChangeLog
v5 Apr 30 Script funktioniert für alle IMDb Sub-/TopLevelDomains
v4 Sep 14 Auf Titelseite wird auch Termin eingeblendet
v3 Sep 11 Option für Auswahl des RSS-Feed (bestätigte oder unbestätigte TV-Termine)
v2 Sep 10 Metadaten geändert
v1 Sep 09 erste Version
*/

/* ToDo
- RSS-Feed nicht jedesmal neu laden
- Optionen über Menü steuern
- bei jedem vorkommen eines Titels innerhalb IMDb TV-Termin einblenden
- bei jedem vorkommen eines Titels außerhalb IMDb TV-Termin einblenden
- AddOn generieren
*/

// OPTIONEN:
var feed = 'http://www.tv250.de/rss_all.php'; // alle Termine
//var feed = 'http://www.tv250.de/rss.php';   // nur bestätigte Termine

var allLinks = xpath('//td[not(@*)]/font[text()] | //div[@id=\'tn15title\']/h1');
var allTitles = xpath('//td[not(@*)]/font/a[text()] | //div[@id=\'tn15title\']/h1/text()');

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function inArr(needle, haystack) {
  for (var j=0; j<haystack.length; j++) {
    if (haystack[j] == needle) {
      return j;
    }
  }
  return -1;
}

GM_xmlhttpRequest({
  method: 'GET',
  url: feed,
  headers: {
    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    'Accept': 'application/atom+xml,application/xml,text/xml',
  },
  onload: function(responseDetails) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
    var entries = dom.getElementsByTagName('item');
    var rsstitles = new Array();
    var rssdates = new Array();
    var rsslinks = new Array();

    for (var i = 0; i < entries.length; i++) {
      var rsstitle = entries[i].getElementsByTagName('description')[0].textContent;
      rsstitle = rsstitle.substring(rsstitle.indexOf('(')+1, rsstitle.lastIndexOf(')'));
      rsstitles.push(rsstitle);
      var rssdate = entries[i].getElementsByTagName('description')[0].textContent;
      rssdate = rssdate.substring(1, rssdate.indexOf('-', 30) -1);
      rssdates.push(rssdate);
      var rsslink = entries[i].getElementsByTagName('link')[0].textContent;
      rsslinks.push(rsslink);
    }

    for (var i = 0; i < allLinks.snapshotLength; i++) {
      var title = allTitles.snapshotItem(i).innerHTML;
      if (!title) title = allTitles.snapshotItem(i).data;
      title = title.replace (/^\s+/, '').replace (/\s+$/, '');
      var j = inArr(title, rsstitles);
      if (j > -1) {
        thisLink = allLinks.snapshotItem(i);
        var anchortext = 'Im TV a' + rssdates[j];
        anchortext = anchortext.replace(/\s/g,"&nbsp;");
        thisLink.innerHTML += '<br><span style="background-color:#f99;">&nbsp;<a href="' + rsslinks[j] + '">' + anchortext + '</a>&nbsp;</span>';
        thisLink.parentNode.insertBefore(thisLink, thisLink.nextSibling);
      }
    }
  }
});