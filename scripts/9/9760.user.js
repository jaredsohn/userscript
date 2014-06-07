// ==UserScript==
// @name          MetroFi-Free-Beta Screen Reclaimer
// @namespace     http://richarddcrowley.org/code/gm
// @description	  Removes the giant ad from the top of pages when using MetroFi
// @include       *
// @exclude       http://*bloglines.com/myblogs
// @exclude        *mail.google.com*
// ==/UserScript==

// MetroFi-Free-Beta Screen Reclaimer
// metrofi.user.js 0.1
// Richard Crowley
// richarddcrowley.org
// 8-9-2006

// interstitial page skipping added by Austin Smith
// austin.smith@byu.net
// 9 June 2007

// Known Issue:
// This will crash Firefox if you visit a frameset site with this script
// enabled.  I do not know how to fix this.  If any better GM hackers
// count enlighten me, that would be amazing.

// If it's an interstitial page, skip to the page it will redirect to
if (document.title == "MetroFi Interstitial Page")
{
  var x = document.getElementsByTagName('a')[0];
  window.location.replace(x.href);
}

// Protect from executing if we're not on MetroFi
if ( document.getElementsByTagName( 'frameset' ).length ) {

  // Remove the offending frame
  document.getElementsByTagName( 'frameset' )[0].removeChild(
    document.getElementsByTagName( 'frame' )[0] );

  // Make the frame of interest big again
  document.getElementsByTagName( 'frameset' )[0].setAttribute(
    'rows', '*,0' );  

}

