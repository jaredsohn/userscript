// ==UserScript==
// @name           flicker.com buddy icon loader for AutoPager
// @namespace      flicker.com/autopager
// @description    flicker.com buddy icon loader
// @include        http://www.flickr.com/photos/*
// ==/UserScript==


function correctImages(doc,lazyattr)
{
var images = document.evaluate('//img[string-length(@' + lazyattr + ')>0]', doc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
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
    thisImg.setAttribute("src", thisImg.getAttribute(lazyattr));
    thisImg.setAttribute(lazyattr, "");
  }	
}
catch (e) {
}
}

document.addEventListener("AutoPagerAfterInsert", function (e){correctImages(e.target,'data-defer-src')}, true);

