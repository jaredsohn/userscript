// ==UserScript==
// @name        Quick Geocache Stats
// @namespace   inge.org.uk/userscripts
// @description Generates a quick summary of your geocaching logs.
// @include     http://www.geocaching.com/my
// @include     http://www.geocaching.com/my/
// @include     http://www.geocaching.com/my/default.aspx
// @include     http://www.geocaching.com/my/logs.aspx*
// @grant       none
// @copyright   2011-13, James Inge (http://geo.inge.org.uk/)
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @version     1.0.3
// ==/UserScript==

(function () {
  "use strict";
  var count, l, image, label, numIcons, numTargets, realTarget, search, str = "", iconList = [
    ["logtypes/2.png", "Found"],
    ["logtypes/3.png", "Didn\'t find"],
    ["logtypes/10.png", "Attended"],
    ["logtypes/9.png", "RSVPed"],
    ["logtypes/11.png", "Took snapshot"],
    ["logtypes/4.png", "Wrote note"],
    ["logtypes/23.png", "Enabled listing"],
    ["logtypes/22.png", "Disabled listing"],
    ["logtypes/47.png", "Updated Coordinates"],
    ["logtypes/46.png", "Maintained"],
    ["logtypes/45.png", "Recommended Maintenance"],
    ["logtypes/5.png", "Archived"],
    ["logtypes/7.png", "Recommended Archiving"],
    ["logtypes/13.png", "Picked up TB"],
    ["logtypes/14.png", "Dropped off TB"],
    ["logtypes/19.png", "Grabbed TB"],
    ["logtypes/48.png", "Discovered TB"],
    ["logtypes/75.png", "TB Visited cache"],
    ["logtypes/16.png", "Marked TB missing"],
    ["wpttypes/sm/2.gif", "Traditional"],
    ["wpttypes/sm/3.gif", "Multicache"],
    ["wpttypes/sm/8.gif", "Unknown"],
    ["wpttypes/sm/5.gif", "Letterbox"],
    ["wpttypes/sm/4.gif", "Virtual"],
    ["wpttypes/sm/earthcache.gif", "Earthcache"],
    ["wpttypes/sm/12.gif", "Locationless"],
    ["wpttypes/sm/6.gif", "Event"],
    ["wpttypes/sm/453.gif", "Mega Event"],
    ["wpttypes/sm/3653.gif", "10 Years of Geocaching Event"],
    ["wpttypes/sm/13.gif", "CITO Event"],
    ["wpttypes/sm/9.gif", "Project APE"],
    ["wpttypes/sm/11.gif", "Webcam"],
    ["wpttypes/sm/1858.gif", "Whereigo"],
    ["wpttypes/sm/maze.gif", "GPS Adventures Exhibit"],
    ["wpttypes/sm/3773.gif", "Groundspeak HQ"],
    ["wpttypes/sm/3774.gif", "Groundspeak Lost and Found Celebration"],
    ["wpttypes/sm/4738.gif", "Groundspeak Block Party"],
    ["wpttypes/sm/27.gif", "NGS Benchmark"]
  ],
  targets = document.evaluate("//div[@id='ctl00_divContentMain']/p", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if(targets.snapshotLength > 0) {
    // On a log page?
    for( l=0, numTargets = targets.snapshotLength; l < numTargets; l++ ) {
      if( targets.snapshotItem(l).innerHTML.search(/ Result/) !== -1 ) {
        realTarget = targets.snapshotItem(l);
      } 
    } 
  }
  if( !realTarget ) {
    // On main profile page
    targets = document.evaluate("//div[@id='ctl00_divContentMain']/div/p", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if( targets.snapshotLength === 1 ) {
      realTarget = targets.snapshotItem(0);
      realTarget.innerHTML += "<br />Results: ";
    }
  } else {
    str += ": ";
  }
  if( realTarget ) {
    for( l=0, numIcons = iconList.length; l < numIcons; l++ ) {
      image = iconList[l][0];
      search = "//img[contains(@src,'";
      search += image;
      search += "')]";
      count = document.evaluate(search, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if( count.snapshotLength > 0 ) {
        label = iconList[l][1];
        str += ['<img src="http://www.geocaching.com/images/', image, '" alt="', label, '" width="16" height="16" title="', label,'" /> ', count.snapshotLength, ", "].join("");
      }
    }
    realTarget.innerHTML += str.replace(/,\s$/,"");
  } else {
    if(console && console.log) { console.log("Couldn't find where to attach script output to page."); }
  }
}());
