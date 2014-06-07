// ==UserScript==
// @name           Ebay Enlarge ID Changer
// @namespace      ebay.com/autopager
// @include        http://*.ebay.com/*
// ==/UserScript==

function correctEnlarge(doc)
{
var images = document.evaluate("//a[@class='pll ppr' and (text()='Enlarge')]", doc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
try {
  var thisImg = images.iterateNext();
  var   imagesList =[];
  while (thisImg) {
    imagesList.push(thisImg);
    thisImg = images.iterateNext();
  }
  for(var i=0;i<imagesList.length;i++)
  {
    thisImg = imagesList[i]
    thisImg.setAttribute("id", thisImg.getAttribute("id") + Math.random);
  }	
}
catch (e) {
}
}

document.addEventListener("AutoPagerAfterInsert", function (e){correctEnlarge(e.target)}, true);

