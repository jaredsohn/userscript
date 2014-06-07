// ==UserScript==
// @name        practiceit.cs.washington.edu Remove ad block div
// @namespace   practiceit.cs.washington.edu
// @description Remove the ad block div in http://practiceit.cs.washington.edu
// @include     http://practiceit.cs.washington.edu/*
// @grant       none
// @version     1
// ==/UserScript==


var adblockDivID = "adblockoverlay",
    adblockEle = document.getElementById(adblockDivID);
    
if (adblockEle && adblockEle.parentNode) {
    adblockEle.parentNode.removeChild(adblockEle);
}