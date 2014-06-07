// ==UserScript==
// @name          twttr.tco fixer
// @namespace     https://gist.github.com/1430180
// @description   This is just a script for quick and dirty hack to fix the problem caused by twttr.tco.updateSelection() on Twitter
// @include       https://twitter.com/*
// @include       http://twitter.com/*
// @author        Masami HIRATA
// @version       0.1
// ==/UserScript==

// JSLint declarations
/*global setTimeout:true, window:true */

setTimeout(function () {
    'use strict';
    window.location.href = "javascript" + String.fromCharCode(58) + "(function(){if (window.twttr.tco.updateSelection.toString() === 'function (E){var D=twttr.tco.getSelection();var C=document.createRange();C.setStart(E.anchorNode,E.anchorOffset);C.setEnd(E.focusNode,E.focusOffset);if(C.startOffset===C.endOffset&&C.anchorNode===C.focusNode&&C.anchorNode!==E.anchorNode&&C.focusNode!==E.focusNode){C.setStart(E.focusNode,E.focusOffset);C.setEnd(E.anchorNode,E.anchorOffset)}D.removeAllRanges();D.addRange(C)}') {window.twttr.tco.updateSelection = function (E){var D=twttr.tco.getSelection();var C=document.createRange();C.setStart(E.anchorNode,E.anchorOffset);C.setEnd(E.focusNode,E.focusOffset);if(C.startOffset===C.endOffset&&C.anchorNode===C.focusNode&&C.anchorNode!==E.anchorNode&&C.focusNode!==E.focusNode){if($.browser.webkit){return};C.setStart(E.focusNode,E.focusOffset);C.setEnd(E.anchorNode,E.anchorOffset)}D.removeAllRanges();D.addRange(C)};}}())";
}, 500);
