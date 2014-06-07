// ==UserScript==
// @name           NASIOC - Make Text Visible
// @namespace      http://forums.nasioc.com/forums/member.php?u=6654
// @description    Unhide e3e3e3 text on the NASIOC forums
// @include        http://forums.nasioc.com/*
// ==/UserScript==
var allFonts, thisFont
allFonts = document.evaluate(
  '//font[@color]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i = 0; i < allFonts.snapshotLength; i++) {
  thisFont = allFonts.snapshotItem(i);
  if (thisFont.getAttribute('color').toLowerCase().substring(0,2) == "#e")
  {
    thisFont.style.color = '#d000d0';
  }
}