// ==UserScript==
// @name       AutoVend
// @namespace  Jacko and Toni
// @include    *subeta.net/explore/frosty_claw.php
// @include    *subeta.net/explore/shining_crane.php
// @include    *subeta.net/explore/ocean_depths.php
// @include    *subeta.net/explore/blue_moon.php
// @include    *subeta.net/explore/grave_digger.php
// @include    *subeta.net/explore/burning_chance.php
// @include    *subeta.net/explore/celebration_gift.php
// @include    *subeta.net/explore/prize_get.php
// @include    *subeta.net/explore/dragons_hoard.php
// @include    *subeta.net/explore/blue_sky.php
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var urlo = window.location.href+jQuery("#bottom a").attr("href");

jQuery.ajax({
    url: urlo,
    success: function(data) {
        jQuery("#bottom").html("it worked!");
        location.reload();
    },
});