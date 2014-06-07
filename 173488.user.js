// ==UserScript==
// @name          Chase Online layout improvements
// @namespace     http://userstyles.org
// @description	  Improve the layout of various Chase Online pages
// @author        riser2
// @homepage      https://userscripts.org/scripts/show/173488
// @include       https://banking.chase.com/AccountActivity/*
// @include       https://payments.chase.com/*
// @version       1.2.4
// @run-at        document-end
// @copyright     2013+, riser2
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
'.fullwidth { width: 100%; }\
\
.spacerw16, .spacerw25 { width: 0; padding-left: 0; }\
\
.adtable { width: 0; }\
');