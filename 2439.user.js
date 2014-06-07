// ==UserScript==
// @name          Quotationspage Partial Ad Remover
// @description   Remove banner and tower ads from quotationspage.com
// @include       *quotationspage.com*
// ==/UserScript==

// QuotationsPage.com Partial Ad Remover
// 1.0 (Dec 26, '05)
// Removes some ads which take up screen space without removing all ads
// so that the site can still make a profit

// Much of this code has been copy and pasted with minor changes
// to make it specific to quotationspage.com. Much thanks to greasemonkey,
// diveintogreasemonkey, and userscripts.org.

// All original code by me is public domain (mostly the CSS changes)

// addGlobalStyle from diveintogreasemonkey

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Remove banner and tower ads by CSS display

addGlobalStyle('#adbanner {display:none;}');
addGlobalStyle('#right {display: none;}');

// Tidy borders

addGlobalStyle('#headtable {border: none;}');