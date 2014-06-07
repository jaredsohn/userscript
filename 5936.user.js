// ==UserScript==
// @name          Calamari Dynasty Shake-It!
// @namespace     http://jimbojw.blogspot.com/
// @description   Proof-of-concept injecting Scriptaculous
// @include       http://jimbojw.blogspot.com/*
// @include       http://jimbojw.com/blog/*
// ==/UserScript==

// Anonymous function wrapper
(function() {

/**
 * Inject Prototype and Scriptaculous libraries.
 */
var scripts = [
    'http://wiki.script.aculo.us/javascripts/prototype.js',
    'http://wiki.script.aculo.us/javascripts/effects.js',
    'http://wiki.script.aculo.us/javascripts/controls.js'
];
for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * When the window is finished loading, attach the Shake-It on-click event.
 */
window.addEventListener('load', function(event) {

    // Grab a reference to the Effect object which was loaded by the scriptaculous library earlier.
    Effect = unsafeWindow['Effect'];

    // Add a shake effect to the header bar when clicked.
    var div = document.getElementById('header-wrapper');
    if (!div) div = document.getElementById('header');
    div.addEventListener('click', function(event) {
        Effect.Shake(div.id);
    }, 'false');

}, 'false');

})(); // end anonymous function wrapper


