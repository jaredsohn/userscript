// ==UserScript==
// @name           tripd
// @namespace      http://userscripts.org/users/101059
// @description    Make just about any website induce nausea.
// @include        *
// ==/UserScript==

var allElements, i, thisElement, thisStyle, randr, randg, randb, t;

allElements = document.evaluate(
 '//*',
 document,
 null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 null
);

window.tripd=function() {
 for (var i=0; i < allElements.snapshotLength; i++) {
  thisElement = allElements.snapshotItem(i);
  thisStyle=getComputedStyle(thisElement, '');
  if ((thisStyle.backgroundColor != "rgb(0, 0, 0)") && (thisStyle.backgroundColor != "transparent")) {
   randr=Math.floor(Math.random()*256).toString(16);
   randr=(randr.length < 2) ? "0"+randr : randr;
   randg=Math.floor(Math.random()*256).toString(16);
   randg=(randg.length < 2) ? "0"+randg : randg;
   randb=Math.floor(Math.random()*256).toString(16);
   randb=(randb.length < 2) ? "0"+randb : randb;
   randBG="#"+randr+randg+randb;
   thisElement.style.backgroundColor=randBG;
  }
  if ((thisStyle.color != "rgb(0, 0, 0)") && (thisStyle.color != "transparent")) {
   randr=Math.floor(Math.random()*256).toString(16);
   randr=(randr.length < 2) ? "0"+randr : randr;
   randg=Math.floor(Math.random()*256).toString(16);
   randg=(randg.length < 2) ? "0"+randg : randg;
   randb=Math.floor(Math.random()*256).toString(16);
   randb=(randb.length < 2) ? "0"+randb : randb;
   randCLR="#"+randr+randg+randb;
   thisElement.style.color=randCLR;
  }
 }
t=window.setTimeout(tripd,666);
}

window.tripd();
