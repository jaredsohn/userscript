// ==UserScript==
// @name           No more annoying date/time in article titles on slashdot
// @namespace      /tmp
// @description    Makes the "on <DAY> <DATE> @<TIME>" crap invisible on slashdot
// @include        http://slashdot.org/*
// ==/UserScript==

// the "on <Day> <Date>" stuff is (fortunately) in a span with class
// "date". So we just make those spans invisible.
(function () {
    var s = document.getElementsByTagName('span');
    for(i in s) {
        if(s[i].className=="date")
            s[i].style.visibility = 'hidden';
    }
 })();
