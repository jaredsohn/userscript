var GMSU_meta_60262 = <><![CDATA[
// ==UserScript==
// @name           WikiShowFullImage
// @version        1.0
// @namespace      http://projects.izzysoft.de/
// @description    Changes thumbnail sources to the URL of the large image on MediaWiki pages
// @include        http://wiki*
// @include        https://wiki*
// @include        http://*.wiki.*
// @include        https://*.wiki.*
// @require        http://userscripts.org/scripts/source/51513.user.js
// @uso:script     60262
// ==/UserScript==
]]></>;
GMSU.init(60262);
var Debug = false;

function debug(msg) {
  if (Debug) GM_log(msg);
}

var rows = document.evaluate("//img[@class='thumbimage']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
debug(rows.snapshotLength+' Thumbnail(s) found');
for (var i=0;i<rows.snapshotLength;i++) {
  var src = /(^.*\/?)thumb\/(.*)\/.+$/.exec(rows.snapshotItem(i).src);
  debug('SrcRegE: '+src);
  debug('Target: "'+src[1]+src[2]+'"');
  rows.snapshotItem(i).src = src[1]+src[2];
}
