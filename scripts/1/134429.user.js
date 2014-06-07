// ==UserScript==
// @name        Block StreamRide Advertisement Side-Bar
// @description This script blocks the StreamRide advertisement side-bar
// @namespace   http://alanhaggai.org/
// @include     *
// @author      Alan Haggai Alavi
// @version     1
// ==/UserScript==


window.addEventListener('load', function () {
    var node = document.getElementById('sTREAMrIDE');
    if (typeof(node) != 'undefined' && node != null) {
        console.info('Removing StreamRide');
        document.body.removeChild(node);
    }
});