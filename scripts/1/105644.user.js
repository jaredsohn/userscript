// ==UserScript==
// @name           eRepublik battle timer remover by s0beit
// @description    Sit at the battlescreen forever, no clicking!
// @version        1.3
// @include        http://www.erepublik.com/*/military/battlefield/*
// @include        http://erepublik.com/*/military/battlefield/*
// ==/UserScript==

if( window.navigator.vendor.match( /Google/ ) ) {
    location.href = "javascript:function globalTick(){}";
} else {
    unsafeWindow.globalTick = (function(){});
}