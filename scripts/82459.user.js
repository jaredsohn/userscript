// ==UserScript==
// @name           360buy.com/autopager
// @namespace      360buy.com/autopager
// @description    360buy.com/autopager
// @include        http://*.360buy.com/*
// ==/UserScript==

function correctImages()
{
var images = document.evaluate('//img[string-length(@src2)>0]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
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
    thisImg.setAttribute("src", thisImg.getAttribute("src2"));
    thisImg.setAttribute("src2", "");
  }	
}
catch (e) {
}
}

correctImages()
