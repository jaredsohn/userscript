// ==UserScript==
// @name Facebook Graphical Emoticons Remover
// @description Removes graphics emoticons from Facebook in favour of textual ones.
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @include http://facebook.com/*
// @include https://facebook.com/*
// @version 1.2
// @run-at document-end
// ==/UserScript==

// Changelog
// 1.2: Updated CSS classes to reflect the updated Facebook code.

var css = document.createElement('style');
css.type = 'text/css';

var styles = '.emoticon { display: none!important; }';
styles += '.emoticon_text { display: inline!important; font-size: inherit; height: auto;}';

if (css.styleSheet) css.styleSheet.cssText = styles;
else css.appendChild(document.createTextNode(styles));
document.head.appendChild(css);