// ==UserScript==
// @name          CleanTube 
// @description   YouTube only with the video and search box
// @include       http://*.youtube.com/*
// ==/UserScript==
(function() {

var rightDiv = document.getElementById('watch-sidebar');
if (rightDiv)
    rightDiv.parentNode.removeChild(rightDiv);
    
var vidInfoDiv = document.getElementById('watch-panel');
if (vidInfoDiv)
    vidInfoDiv.parentNode.removeChild(vidInfoDiv);
    
var promoDiv = document.getElementById('watch-headline-user-info');
if (promoDiv)
    promoDiv.parentNode.removeChild(promoDiv);

var footerDiv = document.getElementById('footer');
if (footerDiv)
    footerDiv.parentNode.removeChild(footerDiv);

var bannerDiv = document.getElementById('watch-branded-image-map');
if (bannerDiv)
    bannerDiv.parentNode.removeChild(bannerDiv);

var vid = document.getElementById('watch-video');
if (vid){
    var classTitle = vid.className;
    if (classTitle.indexOf("medium")<0){
        vid.className = classTitle + " medium";
    }
}

})();