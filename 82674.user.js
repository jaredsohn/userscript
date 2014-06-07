// ==UserScript==
// @name           1LIVE Lyrics Links
// @namespace      LWChris
// @description    Link the playlist to the lyrics - powered by LyricWiki - http://lyrics.wikia.com
// @require        http://userscripts.org/scripts/source/86768.user.js
// @include        http://www.einslive.de/musik/playlists/
// @include        http://www.einslive.de/musik/playlists/#*
// @grant          none
// ==/UserScript==


(function(){
  
  var firstLetterUCase = function (text) {
    var result = "";
    var newWord = true;
    for (charNo in text) {
      result += (newWord) ? text[charNo].toUpperCase() : text[charNo];
      newWord = (text[charNo] == " ");
    };
    return result.replace(/ /g,"_");
  };

  var toLink = function (artistName, songName) {
    if (songName) {
      return "http://lyrics.wikia.com/" + firstLetterUCase(artistName) + ":" + firstLetterUCase(songName);
    } else {
      return "http://lyrics.wikia.com/" + firstLetterUCase(artistName);
    };
  };
  
  var noFeat = function (artistName) {
    var feat = artistName.indexOf(" feat");
    return (feat > -1) ? artistName.substring(0, feat) : artistName;
  }
  
  var playlist = Class("wsPlaylistsEL");
  var titles = NLTag(playlist, "tr");
  if (titles) {
    var i = 0;
    const P1='<a style="text-decoration:none" target="_blank" title="';
    const P2=' auf LyricWiki" href="';
    for (i in titles) {
      if (i == 0) {
        continue;
      }
      var artistNode = STag(titles[i], "td", 1);
      var songNode = STag(titles[i], "td", 2);
      var artistName = artistNode.innerHTML;
      var actualArtistName = noFeat(artistName);
      var songName = songNode.innerHTML;
      artistNode.innerHTML = P1 + actualArtistName + P2 + toLink(actualArtistName, null) + '">' + artistName + '</a>';
      songNode.innerHTML = P1 + songName + ' von ' + artistName + P2 + toLink(actualArtistName, songName) + '">' + songName + '</a>';
    }
  }
}());