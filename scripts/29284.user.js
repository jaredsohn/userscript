// ==UserScript==
// @name        muxtapekeys
// @namespace   http://muxtape.com
// @description Adds menu items for play, previous and next
// @include     http://*.muxtape.com/*
// @author      Daniel Rodríguez Troitiño <notzcoolx@yahoo.es>
// ==/UserScript==

(function () {
    if (window.fluid) {
        doPlay = function() {
          document.fireEvent('keydown', {'key' : 'enter'});
        };

        doPrevious = function() {
          document.fireEvent('keydown', {'key' : 'left'});
        };

        doNext = function() {
          document.fireEvent('keydown', {'key' : 'right'});
        };

        window.fluid.addDockMenuItem("Play/Pause", doPlay);
        window.fluid.addDockMenuItem("Previous", doPrevious);
        window.fluid.addDockMenuItem("Next", doNext);
    }
})();