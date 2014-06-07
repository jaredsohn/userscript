// ==UserScript==
// @name       Subeta Auto Vender (fix)
// @namespace  Kairus
// @description A revision of Shaun Dreclin's vending script, fixed as of 20/6/12.
// @include    *subeta.net/explore/frosty_claw.php*
// @include    *subeta.net/explore/shining_crane.php*
// @include    *subeta.net/explore/ocean_depths.php*
// @include    *subeta.net/explore/blue_moon.php*
// @include    *subeta.net/explore/grave_digger.php*
// @include    *subeta.net/explore/burning_chance.php*
// @include    *subeta.net/explore/celebration_gift.php*
// @include    *subeta.net/explore/prize_get.php*
// @include    *subeta.net/explore/dragons_hoard.php*
// @include    *subeta.net/explore/blue_sky.php*
// ==/UserScript==

var loc = window.location.href;
loc = loc.split("."); loc = loc[2];

if(loc == "php") {
    for(i = 0; i < document.getElementsByTagName('a').length; i++) {
        if(document.getElementsByTagName('a')[i].href.indexOf("act=process") != -1) {
            window.location = document.getElementsByTagName('a')[i].href;
        }
    }
} else {
    for(i = 0; i < document.getElementsByTagName('a').length; i++) {
        if(document.getElementsByTagName('a')[i].innerHTML == "Back") {
            window.location = document.getElementsByTagName('a')[i].href;
        }
    }
}