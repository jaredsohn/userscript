// ==UserScript==
// @name        CPANSyntaxHighlight
// @namespace   abiteasier.in
// @description Enable syntax highlighting when viewing the source on CPAN
// @include     http://cpansearch.perl.org/src/*
// @version     0.9
// @require     http://yandex.st/highlightjs/7.3/highlight.min.js
// @resource    syntaxHighlightCSS http://yandex.st/highlightjs/7.3/styles/github.min.css
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==

var syntax_highlighter_CSS = GM_getResourceText("syntaxHighlightCSS");
GM_addStyle(syntax_highlighter_CSS);

var p = document.getElementsByTagName('pre')[0];
p.className += ' language-perl';
hljs.highlightBlock(p);
