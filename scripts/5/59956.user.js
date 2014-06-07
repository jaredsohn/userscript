// ==UserScript==
// @name           Met Office: Remove adverts that hide the content
// @namespace      http://philross.co.uk
// @description    Remove adverts from metoffice.gov.uk that cause the content to be hidden unless the browser is greater than about 1100 pixels wide.
// @include        http://www.metoffice.gov.uk/weather/uk/*
// ==/UserScript==

(function() 
{  
  var i = document.evaluate("//div[@class='outer']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var divOuter = i.iterateNext();
  
  if (divOuter != null)
  {
    divOuter.style.marginRight = '0';
  }
  
  var i = document.evaluate("//div[@class='right']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var divRight = i.iterateNext();
    
  if (divRight != null)
  {
    divRight.parentNode.removeChild(divRight);
  }  
})();
