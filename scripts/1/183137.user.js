// ==UserScript==
// @name       CodeSkulptor Confirmation
// @namespace  http://flanigan.org/codeskulptor/
// @version    0.1
// @description  Confirms before leaving and losing work on CodeSkulptor
// @include    http://www.codeskulptor.org/
// @include    http://www.codeskulptor.org/#*
// @copyright  2013, Sean Flanigan
// @grant none
// ==/UserScript==

window.addEventListener('beforeunload', function(e) {
    e.preventDefault() // Firefox
    return 'I hope you saved your work!' // Chrome
}, false);
