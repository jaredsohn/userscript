// ==UserScript==
// @name           Spongeforum-Image-Inliner
// @namespace      spongeforum
// @description    Display linked images inline
// @include        http://spongeforum.de*
// ==/UserScript==
 
var processedImages=false;
 
function addListener(obj, eventName, listener) {
  if(obj.addEventListener) {
    obj.addEventListener(eventName, listener, false);
  } else {
    obj.attachEvent("on" + eventName, listener);
  }
}
 
function LocalMain ()
{
  if (processedImages) {
    return;
  }
 
  processedImages = true;
 
  var imageLinks = document.evaluate (
    "//a[@class='image']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  var imageCount = imageLinks.snapshotLength;
  for (var i=0; i < imageCount; i++)
  {
    var item = imageLinks.snapshotItem(i);
    var url = item.getAttribute('href');
    var img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('class', 'resizeImage');
    item.parentNode.replaceChild(img, item);
  }
}
 
//window.addEventListener ("load", LocalMain, false);
 
addListener(document, "DOMContentLoaded", LocalMain );
addListener(window, "load", LocalMain);