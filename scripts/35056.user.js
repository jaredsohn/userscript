// ==UserScript==
// @name           Web Bug Detector - Image Preload Edition
// @namespace      http://www.click-now.net/forums/index.php?s=55590acdc4f3f3403ce7ba91ced796ba&showtopic=1826&st=0&p=6805&#entry6805
// @description    An improved version that allows for image pre-loading ... both work, it just depends on whether you want pre-loading or not (image pre-loading is when a website resizes an image to 1 x 1 pixels in order to supposedly speed up your surfing on their site by having you pre-load the images while viewing the page (like did you ever notice that with some sites your browser does not say that it is 'done' until you have already looked over most of the page ... chances are you were pre-loading an image ... which does speed things up in a way)
// @include        *
// ==/UserScript==

( function()
{
window.addEventListener("load", function(e)
{
  var imgList = document.getElementsByTagName("img");
  for (i=0; i < imgList.length; i++)
  {
  if (imgList[i].src != "" && imgList[i].naturalWidth == 1 && imgList[i].naturalHeight == 1)
   {
   imgList[i].width = "101";
   imgList[i].height = "101";
   imgList[i].alt = "WeB BuG";
   imgList[i].border = "11";
   imgList[i].style.borderColor = '#ff0000';
   imgList[i].style.backgroundColor = '#00ff00';
   }
  }
  return;
}, false);
})();