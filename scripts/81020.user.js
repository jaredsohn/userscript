// ==UserScript==
// @name           listado.mercadolibre.com.ar AutoPager image loader
// @namespace      listado.mercadolibre.com.ar/autopager
// @description    listado.mercadolibre.com.ar AutoPager image loader
// @include        http://listado.mercadolibre.com.ar/*
// ==/UserScript==

document.addEventListener("AutoPagerAfterInsert", function (e){
var images = document.evaluate("//img[@src='http://static.mlstatic.com/org-img/cargando.gif']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
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
    thisImg.setAttribute("src", thisImg.getAttribute("class"));
    thisImg.setAttribute("class", "");
  }	
}
catch (e) {
}

}, true)

