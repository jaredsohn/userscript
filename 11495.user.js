// ==UserScript==
// @name           eMusic Play Tagger
// @namespace      http://emusic.com
// @description    Direct link to mp3 file for playing in-browser with del.icio.us Play Tagger
// @include        http://www.emusic.com/album/*
// ==/UserScript==//


window.addEventListener("load", function(e) {
  getPlaylist();
  addPlayTagger();
}, false);

function getPlaylist() {
  var m3u;
  m3u = document.evaluate(
    "//td[@class='total']//a", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    
  GM_xmlhttpRequest({
    method: 'GET',
    url: m3u.snapshotItem(1).href,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    },
    onload: function(p) {
      processPlaylist(p);
    }
  });
}

function processPlaylist(p) {
  var mp3s = new Array;
  v = p.responseText.split('\n');
  m = -1;
  for(i = 0; i < v.length; i++) {
    if(v[i].indexOf('http://') == 0) {
      m++;
      mp3s[m] = v[i];
    }
  }
  replacePlaylistLinks(mp3s);
}

function replacePlaylistLinks(mp3s) {
  var allListens, thisListen;
  allListens = document.evaluate(
    "//td[@class='listen']//a", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

  for(j = 0; j < allListens.snapshotLength; j++) {
    thisListen = allListens.snapshotItem(j);
    thisListen.href = mp3s[j];
    thisListen.id = null;
  }
}

function addPlayTagger() {
  var t = setTimeout(function() {
    window.location.href = 'javascript:(function(){var o=document.createElement("script");o.type="text/javascript";o.src="http://images.del.icio.us/static/js/playtagger.js";o.onload=function(){Delicious.Mp3.go()};document.body.appendChild(o)})()';
  }, 1000)
}
