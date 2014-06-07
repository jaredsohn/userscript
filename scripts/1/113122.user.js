// ==UserScript==
// @name           Better Map My Ride 
// @namespace      http://userscripts.org/users/jasoneh
// @description    Hide the big header for the MapMyFitness family of webistes.  This includes mapmyride.com, mapmyrun.com, mapmywalk.com, mapmyfitness.com, mapmyhike.com, and mapmytri.com.
// @include        http://mapmy*
// @include        http://www.mapmy*
// @website        http://userscripts.org/users/jasoneh
// @version        0.2
// ==/UserScript==

var site_header = document.getElementById('site_header');
if (site_header) {
  site_header.parentNode.removeChild(site_header);
}
