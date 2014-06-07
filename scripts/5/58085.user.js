// ==UserScript==
// @name           AutoPager_taobao_correct
// @namespace      autopager.taobao
// @description    AutoPager taobao correct
// @include        http://search*.taobao.com/*
// @include        http://s*.taobao.com/*
// @include        http://list*.taobao.com/browse/*
// ==/UserScript==

function correctImages()
{
var images = document.evaluate('//img[string-length(@data-lazyload-src)>0]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
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
    thisImg.setAttribute("src", thisImg.getAttribute("data-lazyload-src"));
    thisImg.setAttribute("data-lazyload-src", "");
  }	
}
catch (e) {
}
}

correctImages()
