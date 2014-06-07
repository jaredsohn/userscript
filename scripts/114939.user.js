// ==UserScript==
// @name           RemoveRPGnetTextColor
// @namespace      RemoveRPGnetTextColor
// @description    Remove RPGnet Text Color (except Mod Red) 
// @include        http://forum.rpg.net/*
// @exclude        http://diveintogreasemonkey.org/*
// @exclude        http://www.diveintogreasemonkey.org/*
// ==/UserScript==

var alltags = document.evaluate("//font[@color='red']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
alltags.snapshotItem(i).setAttribute('color', 'Red');

var alltags = document.evaluate("//font[@color='RED']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
alltags.snapshotItem(i).setAttribute('color', 'Red');

var alltags = document.evaluate("//font[@color='#FF0000']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
alltags.snapshotItem(i).setAttribute('color', 'Red');

var alltags = document.evaluate("//font[@color='darkred']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
alltags.snapshotItem(i).setAttribute('color', 'DarkRed');

var alltags = document.evaluate("//font[@color='DARKRED']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
alltags.snapshotItem(i).setAttribute('color', 'DarkRed');

var alltags = document.evaluate("//font[@color='#8B0000']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
alltags.snapshotItem(i).setAttribute('color', 'DarkRed');

var alltags = document.evaluate("//font[@color!='Red']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
{
  var fontcolor=alltags.snapshotItem(i).getAttribute("color");
  if (fontcolor!='DarkRed')
  {
      if (fontcolor!='#000000')
        alltags.snapshotItem(i).removeAttribute('color');
  }
}
