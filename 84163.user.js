// ==UserScript==
// @name           SomethingAwful - Cure Forums Cancer
// @namespace      http://userscripts.org
// @description    Eliminates the effects of RFA and Forums Cancer.
// @include        http://forums.somethingawful.com/*
// @include        http://www.forums.somethingawful.com/*
// ==/UserScript==

//Knock off the Forums Cancer userpic

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
 var srcMatch = src.match('^http://fi.somethingawful.com/customtitles/title-cancer.png');
  if (srcMatch != null) {
   thisImg.width = 0;
   thisImg.height = 0;
  }
}

//Knock off the mouseover highlighting

var allDivs, thisDiv;
allDivs = document.evaluate(
 "//div[@class='cancerous']",
 document,
 null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
 thisDiv = allDivs.snapshotItem(i);
 thisDiv.style.opacity = 1.0;
}

//Kill off the new CSS in RFA forums

document.head.innerHTML=document.head.innerHTML.replace(/href=\"\/css\/rfa.css/g,"PLACEHOLDER");