// Based on a script in Mark Pilgram's "Dive into Greasemonkey"

// ==UserScript==
// @name          Rename Titles on Private Trackers
// @author	  Fladvad 
// @namespace     http://michaelsarver.com/
// @description   Finds and erases the tracker name and "Details for torrent" in the page name to create clean bookmarks to the torrents. This is my first script. It is currently aimed at the trackers I visit, but could easily be customized.
// @include       http://www.torrent-damage.net/details.php*
// @include       http://www.sceneaccess.org/details.php*
// @include       http://www.bitmetv.org/details.php*
// @include       http://www.bitme.org/details.php*
// @include       http://www.goem.org/details.php*
// @include       http://www.swebits.org/details.php*
// @include       http://oink.me.uk/details.php*
// @include       http://karagarga.net/details.php*
// @include       http://www.learnbits.org/details.php*
// @include       http://elbitz.net/details.php*
// @include       http://pianosheets.org/details.php*
// ==/UserScript==

(function() {
 var s, nytext;

nytext = document.title ;

		s = document.title ;
	  s = s.replace("SceneAccess", "");
	  s = s.replace(".:: Torrent-Damage", "");
	  s = s.replace("BitMeTV.ORG", "");
	  s = s.replace("BitMe.ORG", "");
	  s = s.replace("OiNK", "");
	  s = s.replace("goem", "");
	  s = s.replace("LearnBits", "");
	  s = s.replace("KG - Details for torrent ", "");
	  s = s.replace("SweBits :: ", "&quot;");
	  s = s.replace("PianoSheets.ORG - Piano sheet music for the masses.", "");
	  s = s.replace("ElbitZ.NET, Your Online Learning Center", "");
	  s = s.replace(" :: Details for torrent ", "");
	  // s = s + " [DL]"
	  document.title = s; 

})();