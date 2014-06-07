// ==UserScript==
// @name           K12 Lesson Size Fix
// @namespace      http://userscripts.org/scripts/show/99069
// @include        http://*ktwelvecontent.next.ecollege.com/*
// @description    Makes the Lessons for K12 Stretch To Fill The Whole Screen
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

addGlobalStyle('.swf_wrapper, embed {width: 100%; height: 99%}');



