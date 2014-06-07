// ==UserScript==
// @name       Soundy
// @namespace  http://www.alexdresko.com/
// @version    0.1
// @description  Plays some kind of noise whenever a matched page finishes loading
// @match       https://localhost:44300/*
// @match       https://gist.github.com/*
// @copyright  2014+, Alex Dresko
// ==/UserScript==

var beep = (function () {
    var ctx = new(window.audioContext || window.webkitAudioContext);
    return function (duration, type, finishedCallback) {

        duration = +duration;

        // Only 0-4 are valid types.
        type = (type % 5) || 0;

        if (typeof finishedCallback != "function") {
            finishedCallback = function () {};
        }

        var osc = ctx.createOscillator();

        osc.type = type;

        osc.connect(ctx.destination);
        osc.noteOn(0);

        setTimeout(function () {
            osc.noteOff(0);
            finishedCallback();
        }, duration);

    };
})();

setTimeout(function(){beep()},1000);
