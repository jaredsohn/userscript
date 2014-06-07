// ==UserScript==
// @name            AA font in /jp/
// @namespace       http://archive.easymodo.net/scripts/
// @description     Enhances the authentic Japanese imageboard experience in 4chan's /jp/ board by displaying all posts with a SJIS art compatible font.
// @include         http://boards.4chan.org/jp/*
// ==/UserScript==


// Stolen from ``Dive Into Greasemonkey''
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// One word, the forced usage of Mona. Thread Over.
addGlobalStyle('blockquote { font-family: IPAMonaPGothic,Mona,\'MS PGothic\',YOzFontAA97 !important }');