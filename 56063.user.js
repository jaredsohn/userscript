// ==UserScript==
// @name           Grooveshark Ad Remover
// @namespace      http://itsjareds.leadhoster.com/
// @description    Removes the side banner advertisements on Grooveshark. Works on Flash and HTML players.
// @author         KnifeySpooney (http://spogg.com/KnifeySpooney, http://wurbo.com)
// @version        2.0
// @include        http://grooveshark.com/*
// @include        http://retro.grooveshark.com/*
// ==/UserScript==

var retro = /^http(s)?:\/\/retro\.grooveshark\.com\//i.test(document.location);

if (retro) { //flash interface
    //remove bar from display quickly, then do it for real
    GM_addStyle("#mainContentWrapper { margin-right: 0px !important }");
    GM_addStyle("#sidebar { display: none !important }");
    
    var container = document.getElementById("mainContainer");
    var wrap = document.getElementById("mainContentWrapper");
    var sidebar = document.getElementById("sidebar");

    var removeAd = function() {
        if (wrap && sidebar) {
                wrap.style.marginRight = "0px";
                sidebar.style.display = "none";
        }
    };

    container.addEventListener("DOMSubtreeModified", removeAd, true);
    removeAd();
}

else { //html interface
    //remove bar from display quickly, then do it for real
    GM_addStyle("#application { margin-right: 0px !important }");
    GM_addStyle("#capital { display: none !important }");
    
    var timer = null;
    
    var removeAds = function() {
        if (window.GS) {
            if (window.GS.ad && document.getElementById("capital") && document.getElementById("application")) {
                window.GS.ad.hideAdBar();
                window.$(window).resize(); //uses jQuery loaded by GS
                if (timer) clearInterval(timer);
            }
        }
    };
    
    timer = setInterval(removeAds, 100);
    removeAds();
}