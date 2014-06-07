// ==UserScript== 
// @author 		   gabamnml
// @name           RmvGrvskAll
// @version 	   1.2.2
// @description    Remove ads to grooveshark 4 new version
// @namespace      RmvGrvskAll
// @include        http://listen.grooveshark.com/*
// @include        http://grooveshark.com/*
// ==/UserScript==
var listen = /^http(s)?:\/\/listen\.grooveshark\.com\//i.test(document.location);

if (listen) {
    GM_addStyle("#artistCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#artistCapitalWrapper_728 { display: none !important }");
    GM_addStyle("#musicCapitalWrapper_160 { display: none !important }");
    GM_addStyle("#commCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#theme_home { display: none !important }");
    GM_addStyle("#exploreCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#exploreCapitalWrapper_728 { display: none !important }");
    GM_addStyle("#profileCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#searchCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#songCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#songCapitalWrapper_728 { display: none !important }");
    GM_addStyle("#searchCapitalWrapper_728 { display: none !important }");

    var timer = null;
    
    var removeAds = function() {
        if (window.GS) {
            if (window.GS.ad && document.getElementById("artistCapitalWrapper_300") && document.getElementById("artistCapitalWrapper_728") && document.getElementById("musicCapitalWrapper_160") && document.getElementById("commCapitalWrapper_300") && document.getElementById("theme_home") && document.getElementById("exploreCapitalWrapper_300") && document.getElementById("exploreCapitalWrapper_728") && document.getElementById("profileCapitalWrapper_300") && document.getElementById("searchCapitalWrapper_300") && document.getElementById("searchCapitalWrapper_300") && document.getElementById("songCapitalWrapper_728") && document.getElementById("searchCapitalWrapper_728")) {
                window.GS.ad.hideAdBar();
                window.$(window).resize();
                if (timer) clearInterval(timer);
            }
        }
    };
    
    timer = setInterval(removeAds, 100);
    removeAds();
}

else { 
    GM_addStyle("#artistCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#artistCapitalWrapper_728 { display: none !important }");
    GM_addStyle("#musicCapitalWrapper_160 { display: none !important }");
    GM_addStyle("#commCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#theme_home { display: none !important }");
    GM_addStyle("#exploreCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#exploreCapitalWrapper_728 { display: none !important }");
    GM_addStyle("#profileCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#searchCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#songCapitalWrapper_300 { display: none !important }");
    GM_addStyle("#songCapitalWrapper_728 { display: none !important }");
    GM_addStyle("#searchCapitalWrapper_728 { display: none !important }");

    var timer = null;
    
    var removeAds = function() {
        if (window.GS) {
            if (window.GS.ad && document.getElementById("artistCapitalWrapper_300") && document.getElementById("artistCapitalWrapper_728") && document.getElementById("musicCapitalWrapper_160") && document.getElementById("commCapitalWrapper_300") && document.getElementById("theme_home") && document.getElementById("exploreCapitalWrapper_300") && document.getElementById("exploreCapitalWrapper_728") && document.getElementById("profileCapitalWrapper_300") && document.getElementById("searchCapitalWrapper_300") && document.getElementById("searchCapitalWrapper_300") && document.getElementById("songCapitalWrapper_728") && document.getElementById("searchCapitalWrapper_728")) {
                window.GS.ad.hideAdBar();
                window.$(window).resize();
                if (timer) clearInterval(timer);
            }
        }
    };
    
    timer = setInterval(removeAds, 100);
    removeAds();
}