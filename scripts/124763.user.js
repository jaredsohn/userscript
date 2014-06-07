// ==UserScript==
// @name           unroadblockd
// @namespace      http://userscripts.org/users/101059
// @description    Burn down Hartanto's roadblocks
// @include        http://www.oilandgasinvestor.com/
// @include        http://www.epmag.com/
// @include	   http://www.ugcenter.com/
// @include        http://www.midstreambusiness.com/
// ==/UserScript==

window.t=0;

window.getFancy=function() {
 // Get the elements
 var fancyOverlay=document.getElementById("fancybox-overlay");
 var fancyWrap=document.getElementById("fancybox-wrap");
 var fancyOuter=document.getElementById("fancybox-outer");
 var fancyContent=document.getElementById("fancybox-content");
 // Find and blow up dat that pesky image
 var images, imgWidth, imgHeight;
 images=document.getElementsByTagName("img");
 for (var i=0; i<images.length; i++) {
  if(images[i].src=="http://www.marcellusmidstream.com/resources/images/MM12_HalfPageAd.jpg") {
   imgWidth=parseFloat(images[i].width);
   imgHeight=parseFloat(images[i].height);
   images[i].src="http://webtools.gieskes.nl/pages/images/explosion.gif";
   images[i].width=imgWidth;
   images[i].height=imgHeight;
  }
 }
 window.t++;

 // Put the fire out
 if(window.t>30) {
  fancyOverlay.style.display="none";
  fancyOuter.style.display="none";
  fancyContent.style.display="none";
  fancyWrap.style.display="none";
 } else { // Or, Let It BURN!
  window.setTimeout(getFancy,100);
 }
}

// Initial Delay to let fancy load
window.setTimeout(getFancy,2000);
