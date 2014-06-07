// ==UserScript==
// @name            Search IMSLP from Naxos Music Library
// @namespace       http://penguinlab.jp/
// @include         http://ml.naxos.jp/album/*
// ==/UserScript==

(function () {
    // set up jQuery variable
    var $, GM_JQ, checker, letsJQuery;

    // Add jQuery
    GM_JQ = document.createElement("script");
    GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
    GM_JQ.type = "text/javascript";

    document.body.appendChild(GM_JQ);

    // Check if jQuery's loaded
    checker = setInterval(function () {
        if (typeof ($ = unsafeWindow.jQuery) !== "undefined") {
            clearInterval(checker);
            letsJQuery();
        }
    }, 100);

    // All your GM code must be inside this function
    letsJQuery = function () {
        var trim, img;
        trim = function (s) {
            return s.replace(/^[ \t\n]+|[ \t\n]+$/g, '');
        };
        
        img = '<img alt="Search IMSLP" title="Search IMSLP" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFVSURBVHjaYvz//z8DJYAFxtiyZcsHDg6OT8iSjIyMcDY7O7vs58+fP3p6egqgmAByAQg/fPjwPyHw6NGj/zD1MAx3wd+/f8H0r1+/GJiYmMBsEA1jI6vB6gVk18DC5d+/f3CDCIYBzACQJmS/EwpkFnTNyAbAaGZmZuJdADMIBA6ef8Rw4fZLBmYWZgYjdSkGFVEm/C5AxgfOPWQ4f/sFQ6SbPsN/BkaGdQeuMbx8ycSgoKCAYgDcSJjzYfjcrecM4a66DFwcrAysQBd4WqkyXLn/Dr8LQNEEcz6I/+vXH4YvwDD8DwyLv3+xBybcBWxsbAxcXFxwbK4tx7D56B2G77//Mnz78Ydh18k7DHrKohgGMMKiCZaUQS6Axfvp2+85bj/7ygZi6ysL8Wt/mQtifnPJ2ciNYQAxYM8U/69AigvZECZSch5U0zcmFnYuslyADQAEGADjvebIxas+VgAAAABJRU5ErkJggg==" />';
        
        $('.sub').each(function () {
            var q, ifl = '';
            q = $(this).html().replace(/\(.*?\)/g, '');
            q = q.replace(/in . (sharp|flat )?(major|minor)/g, '');
            q = encodeURI(trim(q));
            //I'm feeling luckey によるリダイレクトをオフにしたい場合は、次の1行をコメントアウト(または削除)してください
            ifl = "btnI=I%27m+Feeling+Lucky&";
            $(this).html($(this).html() + ' <a href="http://www.google.co.jp/search?' + ifl + 'q=site%3Aimslp.org+' + q + '">' + img + '</a>');
        });
    };
}());
// "search page" icon by Free Web Design Icon Set (http://semlabs.co.uk/journal/free-web-design-icon-set).
