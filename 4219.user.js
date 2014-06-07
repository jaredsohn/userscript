// ==UserScript==
// @name          jpopsuki user torrent count
// @namespace     http://otterish.co.uk
// @description   counts the number of torrents shown on a user's uploaded torrents page
// @include       http://mullemeck.serveftp.org*/jps_beta/*page=usertorrents*
// ==/UserScript==

(function(){

var torrentCount = 0;
var thisDiv;

for (var i = 0; i < document.links.length; i++) {
   thisDiv = document.links[i];
   if (thisDiv.href.indexOf('page=details&id=') > -1) // Check if they are a torrent link
      torrentCount++;
}

if (torrentCount == 0)
   torrentCount = 'No';

document.getElementsByTagName('th')[0].innerHTML = torrentCount + ' t' + document.getElementsByTagName('th')[0].innerHTML.substr(1);

})();