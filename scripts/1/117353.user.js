// ==UserScript==
// @name           Pandora - Remove Ads and Center Player
// @author         Jeff Dorenbush jdorenbush@gmail.com
// @description    This removes the ads on Pandora.com. It also centers the player, adds rounded corners, adjust the footer postion/size and stops the footer link colors from changing to match the color of ads, and uses a solid background.
// @include        http://www.pandora.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#adContainer {opacity:0},#ad_frame {opacity:0},#ad_container {opacity:0}');