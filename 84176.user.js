// ==UserScript==
// @name           Reduce equation preview time
// @namespace      http://networkpx.googlecode.com
// @description    Reduce equation preview time to 0.5 seconds on math.SE
// @include        http://meta.math.stackexchange.com/*
// @include        http://math.stackexchange.com/*
// @include        http://stats.stackexchange.com/*
// ==/UserScript==

// Copied from http://meta.math.stackexchange.com/questions/689/latex-rendering-delay
    unsafeWindow.$("#wmd-input").typeWatch({
      callback:unsafeWindow.styleCode,
      wait:1000,
      captureLength:5,
      highlight:false
    });
