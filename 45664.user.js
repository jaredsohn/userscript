// ==UserScript==
// @name           justin_tv_img_src_correct
// @namespace      justin.tv
// @description    justin.tv image src correct
// @include        http://*.justin.tv/*
// ==/UserScript==

function correctImages()
{
var images = document.evaluate('//img[string-length(@src1)>0]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
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
    thisImg.setAttribute("src", thisImg.getAttribute("src1"));
    thisImg.src = thisImg.getAttribute("src1");
  }	
}
catch (e) {
}
}

correctImages()

