// ==UserScript==
// @name           MusicBrainz: hide PUID edits
// @namespace      http://userscripts.org/users/430716
// @description    Hides all the PUID edits in MusicBrainz.
// @include        http*://*musicbrainz.org/*/edits*
// @include        http*://*musicbrainz.org/*/open_edits*
// @include        http*://*musicbrainz.org/search/edits*
// @include        http*://*musicbrainz.org/edit/subscribed*
// ==/UserScript==


var MB_edits = document.getElementsByClassName('edit-list');

var i=0;
for (i=MB_edits.length-1;i>=0;i--){
  if (MB_edits[i].getElementsByTagName('h2')[0].getElementsByTagName('a')[0].firstChild.nodeValue.search('PUID') > -1){
    MB_edits[i].parentNode.removeChild(MB_edits[i]);
  }
}