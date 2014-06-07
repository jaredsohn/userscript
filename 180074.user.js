// ==UserScript==
// @name    HackForums - Modern Theme Changer
// @namespace  Avärage Dalo
// @description  Color changer for HackFourms Modern Theme.
// @grant             GM_setValue
// @grant             GM_getValue
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require            http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @match  *.hackforums.net/*
// @version  1.0
// ==/UserScript==

shortcut.add("Ctrl+,",function() {
    var themeColor = prompt("What color ?", themeColor);
    GM_setValue('themeColor', themeColor);
    alert("The HackForums theme is now "+GM_getValue('themeColor'));
    document.location.reload(true);
});

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#panel { border: 1px solid ' + GM_getValue('themeColor') + '; }');
addGlobalStyle('#container { border: 5px solid ' + GM_getValue('themeColor') + '; }');
addGlobalStyle('.navButton { background-color: ' + GM_getValue('themeColor') + '; }');
addGlobalStyle('.thead { background-color: ' + GM_getValue('themeColor') + '; }');
addGlobalStyle('.tfoot { background-color: ' + GM_getValue('themeColor') + '; }');
addGlobalStyle('.bitButton { background-color: ' + GM_getValue('themeColor') + '; border: 1px solid ' + GM_getValue('themeColor') + ' !important; }');
addGlobalStyle('.pagination a { border: 1px solid ' + GM_getValue('themeColor') + '; }');
addGlobalStyle('.bottommenu { border: 1px solid ' + GM_getValue('themeColor') + '; }');