// ==UserScript==
// @name           Neobux Announcements
// @namespace      http://www.userscripts.org/users/kwah/
// @description    Make the Announcements forum sort by the latest created post by default (newer announcements appear on top)
// @include        http://www.neobux.com/forum/*
// ==/UserScript==


var xpathAnnounements = "//a[@href='/forum/?frmid=3']";
var xpathResults_Announements = document.evaluate(xpathAnnounements,
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null );
  
xpathResults_Announements.snapshotItem(0).href = '/forum/?frmid=3&st=data&od=desc';