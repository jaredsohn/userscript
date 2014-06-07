// ==UserScript==
// @name           Menelgame: AdBlock
// @author		   dz.
// @include        http://*.menelgame.pl/*
// @exclude        *.highscore.*
// @exclude        *.*board.*
// ==/UserScript==

document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };

document.getElementByXPath('/html/body/div/div[2]/div[2]/div/div/center').style.display = 'none';

document.getElementByXPath('/html/body/div/div[2]/div/div[3]').style.width = '';
document.getElementByXPath('/html/body/div/div[2]/div/div[3]/div').style.width = '';

document.getElementByXPath('/html/body/div/div[2]/div/div[4]').style.width = '';
document.getElementByXPath('/html/body/div/div[2]/div/div[4]/div').style.width = '';