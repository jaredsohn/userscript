// ==UserScript==
// @name           Reddit Comments Filter
// @namespace      Reddit
// @include	   http://www.reddit.com/r/*/comments/*
// ==/UserScript==
var votes = document.getElementsByClassName('score');
for (i = 19; i < votes.length; i++) {
    if (!votes[i].innerHTML.match(/[3-9]\d{3,} points/)) {
        votes[i].parentElement.parentElement.parentElement.style.display = 'none';
    }
}
