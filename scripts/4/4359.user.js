// ==UserScript==
// @name            Flickr Quick Links
// @description     Adds customisable links to the top of every page on flickr next to the flickr logo
// @author          Stephen Fernandez aka steeev http://steeev.f2o.org http://flickr.com/photos/steeev
// @version         1.2 (21/07/06)
// @namespace       http://steeev.f2o.org/flickr/
// @include         http://www.flickr.com/*
// @include         http://flickr.com/*
// @exclude         http://www.flickr.com/organize*
// @exclude         http://flickr.com/organize*
// ==/UserScript==


// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox  http://www.mozilla.org/firefox and 
// the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// There will be a button at the top right of the page saying "Install User Script".
// Click the button + accept the default configuration to install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Quick Links", and click Uninstall.
//
// --------------------------------------------------------------------


// Usage: Edit the customhtml variable below to put whatever links or html you want in.


( function () {

  var customhtml = 
  "<a href=http://www.flickr.com/recent_activity.gne?days=1>RA</a> | " +
  "<a href=http://www.flickr.com/photos_comments.gne>RC</a> | " +
  "<a href=http://flagrantdisregard.com/flickr/scout.php?sort=position&year=0&username=" + unsafeWindow.global_nsid +">SCT</a> | " +
  "GC <a href=http://www.flickr.com/recent.gne?days=1h>1H</a> | " +
  "<a href=http://www.flickr.com/recent.gne?days=2h>2H</a> | " +
  "<a href=http://www.flickr.com/recent.gne?days=4h>4H</a> | " +
  "<a href=http://www.flickr.com/recent.gne?days=8h>8H</a> | " +
  "<a href=javascript:void(w=window.open('http://www.emorate.com/emopic/flickr-photo-comment.php?photo_url=" + encodeURIComponent( location.href ) + "','EmoRate','toolbar=no,scrollbars=yes,width=500,location=no,height=800'));>RFC</a> | " +
  "<a href=http://www.flickr.com/groups/central>FC</a> | " + 
  "<a href=http://www.flickr.com/groups/pstennis>PST</a> | " + 
  "<a href=http://www.flickr.com/groups/mutants>MU</a> | " + 
  "<a href=http://www.flickr.com/groups/testbed>TB</a> | " +
  "<a href=http://www.flickr.com/groups/bodylanguage>BL</a> | " +
  "<a href=http://www.flickr.com/groups/handsignals>HS</a> | " +
  "<a href=http://www.flickr.com/groups/flickrhacks>FH</a> | ";

  GM_addStyle(".TopBar .Header { width: 1000px !important; }"); //widens top section so u can fit more links in :)  

  tds=document.getElementsByTagName('td');
  tds[0].innerHTML += customhtml;

})();