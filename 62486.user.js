// ==UserScript==
// @name           Hide other users reputation
// @namespace      CrazyJugglerDrummer
// @description    hides all users reputations except yours in site header
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("span.reputation-score, span.badge1, span.badge2, span.badge3, span.badgecount, div.accept-answer-link, div.user-gravatar32 { display: none; }"); //hides undesired user info
addGlobalStyle("#header span.reputation-score, #header span.badge1, #header span.badge2, #header span.badge3, #header span.badgecount { display: inline; }"); //unhides that info in the header (your own info)

