// ==UserScript==
// @name           GameFAQs Blackboard
// @namespace      gamefaqs.com
// @description    To change all text FAQs at GameFAQs to be like blackboard
// @include        http://www.gamefaqs.com/*/faqs/*
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

addGlobalStyle(
'body {' +
'  color: grey ! important; ' +
'  background-color: black ! important; ' +
'}'
);