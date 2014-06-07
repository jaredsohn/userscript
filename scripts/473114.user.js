// ==UserScript==
// @name       MLG OverRustle
// @namespace  overrustle.gg/mlg
// @version    0.1
// @description  MLG OverRustle
// @match      http://tv.majorleaguegaming.com/*
// @copyright  2014+, You
// ==/UserScript==

//unsafeWindow.adBlockDetected = function() {};
(function() {
    var id;
    var clear = function() {
        if (unsafeWindow.mlgPlayer) {
           unsafeWindow.mlgPlayer.listeners.adBlockDetected = [];
           clearInterval(id);
       }
    };
    id = setInterval(clear, 500);
})();