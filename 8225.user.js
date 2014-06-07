// RtBoard Kill Announcement Greasemonkey script, v 0.0.3, 2007-April-03
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// Changelog:
// 0.0.1 2007-03-29 -- Original release.
// 0.0.2 2007-04-02 implementation based on styles
// 0.0.3 2007-04-03 included home-page urls
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/firefox/748/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
// --------------------------------------------------------------------
// ==UserScript==
// @name           RtBoard Kill Announcement
// @namespace      tag:point.zero.two.euro.cents@gmail.com,2007-03-29:greasemonkey/RtBoard/Kill/Announcement
// @description    Kills announcements on RtBoard
// @include        http://board.rt.mipt.ru/?index*
// @include        http://zlo.rt.mipt.ru/?index*
// @include        http://board.rt.mipt.ru/
// @include        http://zlo.rt.mipt.ru/
// ==/UserScript==

// kill all elements defined by xpath
function kill_elements(xpath) {
  // populate elements
  var elements = document.evaluate(xpath, document, null, 
				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  // kill elements
  var e;
  for (var i = 0; (e = elements.snapshotItem(i)); i++) {
//debug    e.parentNode.removeChild(e);
    e.style.display = "none";
  }  
}

// kill announcements
function onloadKill() {
  kill_elements("//div[@class='an']"); 
  kill_elements("//a[starts-with(@href, '?rann=')]"); 
}

//
window.addEventListener('load', onloadKill, false);






