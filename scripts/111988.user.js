// ==UserScript==
// @name Hello World
// @description example script to alert "Hello world!" on every page
// @include http://wiki.greasespot.net/Greasemonkey_access_violation
// ==/UserScript==
alert('Monkey sez... Hello World!');
window.setTimeout(function() { alert('Hello mas tardeworld!') }, 60);