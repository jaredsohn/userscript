// ==UserScript==
// @name open links for failed js tests on jenkins to open in new window
// @namespace http://taucraft.com
// @version 0.1
// @description Modifies links for failed javascript tests on jenkins to open in new window.
// @match http://jenkinsmaster-hv:8080/job/RunReleaseFuncTests/*
// @copyright 2013+, Victor Homyakov
// ==/UserScript==

(function () {
    var PROPER_ROOT = 'http://localhost/TargetProcess/JavaScript/',
        WRONG_ROOT = 'http://localhost/JavaScript/';
    //<a href="http://localhost/JavaScript/tau/scripts/tests.async/index.html?execution=serial&amp;data=remote&amp;part=2&amp;ofparts=6#page=board/current'">
    //http://localhost/JavaScript/tau/scripts/tests.async/index.html?execution=serial&amp;data=remote&amp;part=2&amp;ofparts=6#page=board/current'
    //</a>
    var links = document.querySelectorAll('a[href^="' + WRONG_ROOT + '"]');
    for (var i = 0, len = links.length; i < len; i++) {
        var link = links[i];
        link.href = link.href.replace(WRONG_ROOT, PROPER_ROOT).replace(/'$/, '');
        link.innerText = link.innerText.replace(WRONG_ROOT, '').replace(/'$/, '');
        link.target = '_blank';
    }
} ());
