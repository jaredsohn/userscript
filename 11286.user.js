// v0.2
//
// ==UserScript==
// @name          eMusic.fm
// @namespace     http://633k.net
// @description	  Get tags for album from last.fm
// @include       http://emusic.com/album/*
// @include       http://www.emusic.com/album/*
// ==/UserScript==


window.addEventListener("load", function(e) {
  getTags();

}, false);

function getTags() {
  var artistName;
  artistName = document.evaluate(
    "//span[@class='artist']//a",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://ws.audioscrobbler.com/1.0/artist/' + escape(artistName.snapshotItem(0).innerHTML) + '/toptags.xml',
    onload: function(a) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(a.responseText, "application/xml");
      var entries = dom.getElementsByTagName('tag');
      var tags = new Array;
      
      if(entries.length > 0) {
        var artist;
        artist = document.evaluate(
          "//span[@class='artist']",
          document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

        var tagsLabel;
        tagsLabel = document.createElement('span');
        tagsLabel.innerHTML = 'Last.fm tags: '
        tagsLabel.className = 'grey'

        tagsLabel2 = artist.snapshotItem(0).parentNode.insertBefore(tagsLabel, artist.nextSibling);

        for (var i = 0; i <= 5; i++) {
          tags[i] = entries[i].getElementsByTagName('name')[0].textContent;
        }
        tagsLabel2.appendChild(document.createTextNode(tags.join(', ')));
      }
    }
  })
}
