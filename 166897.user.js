// ==UserScript==
// @name         Brother soft Without download manager
// @namespace    http://jixun.org/
// @version      1.0
// @description  Don't you hated when the website force you to download using their own downloader and it might install some random rubbish to your computer? Well, this is for you...
// @include      *://*.brothersoft.com/*
// @include      *://brothersoft.com/*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

addEventListener ('DOMContentLoaded', function () {
    // Define shorthand + check if is on the correct page.
    var bd = document.body,
        onloadStr = bd.getAttribute ('onload'),
        sTargetUrl  = (onloadStr.match (/&url=(.+)&name/)||[,])[1],
        sDecodedUrl = decodeURIComponent(sTargetUrl);
    
    // Not correct page.
    if (!sTargetUrl)
        return;
    
    // Remove Old Auto download
    bd.removeAttribute ('onload');
    
    // Start new auto download, after page completely loaded
    addEventListener ('load', function () {
    	location.href = sDecodedUrl;
    }, false);
    
    // Replace fallback link
    var arrRfl = document.querySelectorAll ('a[href*="/d.php?"]');
    for (var i=0; i<arrRfl.length; i++)
        arrRfl[i].setAttribute ('href', sDecodedUrl);
    
}, false);