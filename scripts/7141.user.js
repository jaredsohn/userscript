//---------------------------------------------------
// Stopped working?  Not working 100% any longer?
// Give me a description of the problem.
// Email: i-at-ihearth4x0ring.info
//---------------------------------------------------
// Last Modified: $Date: 2007-01-18 03:37:55 +0800 (Thu, 18 Jan 2007) $
//---------------------------------------------------
// * Removes thin banner at top of all Vox blogs
// * Removes ad iframes throughout the page
//------------------- Changes -----------------------
// * Jan 18, 2007: 1.1: Modified script by wrapping it in 
// a function that gets triggered on 'DOMNodeInserted' 
// events b/c Google Ads were now being inserted after the 
// page had already loaded ... sneaky VOXers?
//---------------------------------------------------

// ==UserScript==
// @name          Vox blog ad remover
// @namespace     http://projects.briandonovan.info/projects/greasemonkey-user-scripts/
// @description   Removes the advertisment iframes at the top and bottom of Vox blogs.
// @include       http://*.vox.com/*
// ==/UserScript==


window.cleanupVox = function(event) {
    // First, hide the iframes

    var nlistIframeElements = document.getElementsByTagName('iframe');

    for (var i=0; i<nlistIframeElements.length; i++) {
        var strClassNameThisIframe = nlistIframeElements[i].getAttribute('class');
        if (strClassNameThisIframe === 'ad-iframe') {
            nlistIframeElements[i].style.display='none';
        }
    }

    // Hide the ad iframe container div at the top

    nTopAdIframeContainerDiv = document.getElementById('control-strip-ad');
    if (nTopAdIframeContainerDiv !== null) {
        nTopAdIframeContainerDiv.style.display='none';
    }
}

document.addEventListener('DOMNodeInserted',window.cleanupVox,true);