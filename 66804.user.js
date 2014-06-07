// ==UserScript==
// @name           Grooveshark Ad Remover
// @description    Removes the side banner advertisements on Grooveshark.
// @author         Kflorence (http://kflorence.com)
// @version        1.2
// @include        http://listen.grooveshark.com/*
// ==/UserScript==

var sidebar = document.getElementById("sidebar"),
    wrapper = document.getElementById("mainContentWrapper");

if (sidebar && wrapper) {
    var wrap = sidebar.parentNode,
        iframe = sidebar.getElementsByTagName("iframe"),
        iframeWrapper = iframe[0].parentNode;
        
    iframeWrapper.removeChild(iframe[0]);

    var removeAd = function() {    
        if (sidebar && wrapper) {
            sidebar.style.display = "none";
            wrapper.style.marginRight = "0px";
        }
    };

    // http://userscripts.org/users/39648
    wrap.addEventListener("DOMSubtreeModified", removeAd, true);
    removeAd();
}