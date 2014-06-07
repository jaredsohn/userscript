// ==UserScript==
// @name        GMail -- strip redundant mailing list tags
// @namespace   http://confluence.za.net
// @description Removes tags inside square brackets in subject lines
// @include     http://mail.google.com/*
// @include     https://mail.google.com/*
// @author      confluence
// ==/UserScript==

// Based on the script "Shorten Gmail Labels" by Scott Whittaker and Billy Gallagher

(function () {
    function strip_tags() {
        var subjects = document.getElementsByClassName('y6');
        for (var i in subjects) {
            if (!(!isNaN(parseFloat(i)) && isFinite(i)))
                continue;
            var subject = subjects[i];
            var stripped = subject.innerHTML.replace(/\[(.+?)\] */g, "");
            subject.innerHTML = stripped;
        }
    }

    window.setInterval(strip_tags, 5000);
})();