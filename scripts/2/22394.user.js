// ==UserScript==
// @name         vBulletin - Show full links
// @namespace    https://userscripts.org/people/5587
// @description  Reveals truncated (...) links in vBulletin-forums.
// @downloadURL  https://userscripts.org/scripts/source/22394.user.js
// @grant        none
// @include      */showthread.php*
// @include      */viewtopic.php?*
// @updateURL    https://userscripts.org/scripts/source/22394.meta.js
// @version      1.7
// @date         2013-03-19
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

(function () {
matchtext = new RegExp("/\.{3,3}[0-z]");
var rrdirect = 1;  //if = 1, then try to remove prefixes like "http://anonym.to/?" etc.

function changelinktext(link)
{
  var d = link.firstChild.nodeValue;
  var u = link.href;
  match = matchtext.exec(d);
  if (match) {
    var linkparts = d.split("...");
    var a = u.indexOf(fcttrim(linkparts[0]));
    var z = 0;
    if (linkparts[1]){
      z = u.indexOf(fcttrim(linkparts[1]));
    }
    if (a != -1 && z != -1) {
      if (rrdirect == 1) {
        link.firstChild.nodeValue = u.slice(a);
        } else {
        link.firstChild.nodeValue = u;
      }
    }
  }
}


function fcttrim(a_str) {
  return a_str.replace(/ +/g, ' ').replace(/^\s+/g, '').replace(/\s+$/g, '');
}


urlarray = document.evaluate(
  '//a[@href]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for(var i = 0; i < urlarray.snapshotLength; i++) {
  link = urlarray.snapshotItem(i);
  if (link.firstChild) {
    changelinktext(link);
  }
}
})();