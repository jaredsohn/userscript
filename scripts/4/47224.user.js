// ==UserScript==
// @name           Userstyles Rating Display
// @namespace      http://userscripts.org/users/23652
// @description    Shows the rating of each script
// @include        http://userstyles.org/*
// @copyright      JoeSimmons
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// addGlobalStyle
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('span.commentcount {font-size:12px;font-family:tahoma;font-weight:bolder;}');

var t, styles = document.evaluate("//a[starts-with(@href, '/styles/')]",document,null,6,null),
	i = styles.snapshotLength;

while(style=styles.snapshotItem(--i)) {
if(/(Not yet rated|Rating)/.test(style.title)) {
var span = document.createElement('span');
span.setAttribute('class', 'commentcount');
t = style.getAttribute('title');
if(t.indexOf('Rating:')!=-1) span.textContent = ' '+t.match(/\d\.\d+/);
else span.textContent = ' x';
style.parentNode.appendChild(span);
}
}