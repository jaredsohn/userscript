// ==UserScript==
// @name           Change visited links' colors
// @namespace      http://userscripts.org/users/23652
// @description    Changes visited links' colors to purple (or any color you specify)
// @include        *
// @copyright      JoeSimmons
// ==/UserScript==

// addGlobalStyle
// Syntax: addGlobalStyle("body {color:blue; background:gold;}");
function addGlobalStyle(css) {
    var style=document.createElement('style'), head=document.evaluate("//head",document,null,9,null).singleNodeValue;
    if (!head) { return; }
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function changeColor() {
var c = prompt('Which color would you like?');
c=c.replace(/[^\#\w]/g, '');
if(c!='') {GM_setValue("LinkVisitedColor", c);addGlobalStyle("a:visited {color:"+c+" !important;}");}
else {alert('Invalid color\n'+c);}
}

var color = GM_getValue("LinkVisitedColor", "purple");
addGlobalStyle("a:visited {color:"+color+" !important;}");

GM_registerMenuCommand("Change visited link color", changeColor);