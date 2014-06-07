// ==UserScript==
// @name        Fingerprint Spoofer
// @namespace   http://zcraft.no-ip.org:8080/
// @description Modifies screen and window resolution variables to reduce ability to fingerprint browser 
// @include	/^https?://.*/
// @version     0.2.4
// @grant       none
// @run-at      document-start
// @downloadURL https://userscripts.org/scripts/source/429878.user.js
// @updateURL   https://userscripts.org/scripts/source/429878.meta.js
// @license     https://gitweb.torproject.org/torbutton.git/blob/HEAD:/src/LICENSE
// ==/UserScript==

// Credit for this script goes to TorButton (specifically jshooks4.js). I wanted to duplicate
// its fingerprint-spoofing technology in order to make a more traditional FireFox setup less
// fingerprintable.

// Current features include:
// * Round window resolution down to the nearest multiple of 50
// * Report screen resolution as 1366x768 (The current most common resolution)
// * Automatic updates

if ('loading' == document.readyState) {
  //expected behavior
  //alert("This script is running at document-start time.");
} else {
  // should not occur
  alert("Fingerprint Spoofer script is running with document.readyState: " + document.readyState);
}

// Wrap in anonymous function to protect scr variables just in case.
(function () {
    var origHeight = window.innerHeight;
    var origWidth = window.innerWidth;

    Object.defineProperty(window.__proto__, "innerWidth",
                    {get: function() { return Math.floor(origWidth/50.0)*50;},
                    configurable: false});
    Object.defineProperty(window.__proto__, "innerHeight",
                    {get: function() { return Math.floor(origHeight/50.0)*50;},
                    configurable: false});
    Object.defineProperty(window.__proto__, "outerWidth",
                    {get: function() { return Math.floor(origWidth/50.0)*50;},
                    configurable: false});
    Object.defineProperty(window.__proto__, "outerHeight",
                    {get: function() { return Math.floor(origHeight/50.0)*50;},
                    configurable: false});
    Object.defineProperty(window.__proto__, "screenX",
                    {get: function() { return 0;},
                    configurable: false});
    Object.defineProperty(window.__proto__, "screenY",
                    {get: function() { return 0;},
                    configurable: false});
    Object.defineProperty(MouseEvent.prototype, "screenX",
                    {get: function() { return this.clientX;},
                    configurable: false});
    Object.defineProperty(MouseEvent.prototype, "screenY",
                    {get: function() { return this.clientY;},
                    configurable: false});

    // We can't define individual getters/setters for window.screen 
    // for some reason. works in html but not in these hooks.. No idea why

    var scr = new Object();
    var origScr = window.screen;
    scr.__defineGetter__("height", function() { return  768; }); //{ return window.innerHeight; });
    scr.__defineGetter__("width", function()  { return 1366; }); //{ return window.innerWidth;  });

    scr.__defineGetter__("availTop", function() { return 0;});
    scr.__defineGetter__("availLeft", function() { return 0;});

    scr.__defineGetter__("top", function() { return 0;});
    scr.__defineGetter__("left", function() { return 0;});

    scr.__defineGetter__("availHeight", function() { return window.innerHeight;});
    scr.__defineGetter__("availWidth", function() { return window.innerWidth;});

    scr.__defineGetter__("colorDepth", function() { return origScr.colorDepth;});
    scr.__defineGetter__("pixelDepth", function() { return origScr.pixelDepth;});

    scr.__defineGetter__("availTop", function() { return 0;});
    scr.__defineGetter__("availLeft", function() { return 0;});

    Object.defineProperty(window.__proto__, "screen",
                {get: function() { return scr;},
                configurable: false});

})();
