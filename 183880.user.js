// ==UserScript==
// @name          Swyter Tweaks for Played.to
// @description   Gets rid of all the hurdles and directly plays the video in an immersive player.
// @match         http://played.to/*
// @grant         none
// @version       2013.11.28
// @author        Swyter
// ==/UserScript==

if ( btn_download = document.querySelector("#btn_download") )
{
    // Click the accept button if exists
    console.log("-> Skipping the countdown.")
    
    btn_download.disabled=false;
    btn_download.click();
}
else
{
    // Remove all the timeouts, which launch banners and all sorts of ugly monsters (http://stackoverflow.com/a/8345837/674685)
    var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }


    // Just remove the annoyances, enable the built-in lightbox and enjoy the view
    var ads = document.querySelectorAll(
        "div[style*='block !important;'], #overlayPPU, #OnPlayerBanner, #OnPlayerClose, center>div+script[type='text/javascript']"
    );
    
    Array.prototype.forEach.call(ads,function(node) {
        node.parentNode.removeChild(node);
    });
    
    document.getElementById("lightsOff").click();
}