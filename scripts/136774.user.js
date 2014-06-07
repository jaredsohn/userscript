// ==UserScript==
// @name       zoopic.ya.hu enhancer
// @namespace  http://zoopic.ya.hu/
// @version    0.1
// @description  It preserves the the vertical scrolling position while walking thru photos
// @match      http://zoopic.ya.hu/*/pic/*
// @copyright  2012+, Andras Suller <suan2@freemail.hu>
// ==/UserScript==

try {
    if (GM_getValue('scrollY')) {
        window.scrollTo(0, GM_getValue('scrollY'));
    }
    window.onscroll = function() {
        GM_setValue('scrollY', window.scrollY);
    };
} catch (e) {
    console.log(e);
}