// ==UserScript==
// @name        DVP highlight unanswered topics
// @namespace   tom103
// @description Highlights topics with few or no answers on Developpez.net
// @include     http://www.developpez.net/forums/*
// @version     1
// @grant       none
// @require http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==

function addCss(cssString) {
    var head = document.getElementsByTagName('head') [0];
    if (head) {
        var newCss = document.createElement('style');
        newCss.type = 'text/css';
        newCss.innerHTML = cssString;
        head.appendChild(newCss);
    }
}

addCss('.unanswered { background: #EEEEEE !important }');
$('.threadbit > div').each(function() {
    var thread = $(this);
    var threadstats = $(thread).find('.threadstats').first();
    var firstItem = $(threadstats).find('li').first();
    var anchor = $(firstItem).find('a').first();
    var answers = parseInt($(anchor).text());
    if (answers < 2) {
        $(thread).addClass('unanswered');
    }
});
