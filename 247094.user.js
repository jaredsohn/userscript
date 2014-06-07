// ==UserScript==
// @id             bible.faithlife.com-d12d9880-9bb5-43f9-9322-c63c5fe41a39@scriptish
// @name           Bible.FaithLife and Bible.com OpenSans Font
// @version        1.0
// @namespace      
// @author         
// @description    Switches from horrible Times New Roman font to Open Sans for bible.faithlife.com
// @include        http://bible.faithlife.com/*
// @include        http://biblia.com/*
// @include        http://www.biblia.com/*
// @run-at         document-end
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

function addGoogleFont(family) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'http://fonts.googleapis.com/css?family=' + family + ' &subset=latin,greek-ext,greek,cyrillic,latin-ext,cyrillic-ext';
    head.appendChild(link);
}

addGoogleFont('Open+Sans:400,400italic');
addGlobalStyle('.resource-content { font-family: Open Sans, sans }');
