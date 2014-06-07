// ==UserScript==
// @name           Thottbot No-Ads (by PrivateSniper)
// @namespace      64816
// @description    removes the ad frames on thottbot
// @include        http://thottbot.com/
// ==/UserScript==

// Ad Module 1
var ads1 = document.getElementById('ad1');
if (ads1) {
    ads1.parentNode.removeChild(ads1);
}

// Ad Module 2
var ads2 = document.getElementById('ad2');
if (ads2) {
    ads2.parentNode.removeChild(ads2);
}

// Ad Module 3
var ads3 = document.getElementById('ad3');
if (ads3) {
    ads3.parentNode.removeChild(ads3);
}

}