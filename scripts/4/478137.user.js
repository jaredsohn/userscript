// ==UserScript==
// @name         Sublime-Text Forums Fixer
// @namespace    https://nanderson.me
// @version      0.5
// @match        http://www.sublimetext.com/forum/*
// @match        http://sublimetext.com/forum/*
// @license      WTFPL
// @run-at		 document-end
// ==/UserScript==

(function(window){
    var d = document.querySelectorAll('link');
    for (var i in d) {
        if (d[i].media == "screen, projection") {
            var q = d[i].href;
        }
    }
    var x = document.createElement('link');
    x.rel = "stylesheet";
    x.href = q.replace('id=2', 'id=1');
    document.head.appendChild(x);
}(unsafeWindow));