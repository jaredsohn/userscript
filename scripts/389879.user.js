// ==UserScript==
// @name           FanFiction.net Chapter Length Highlighter
// @namespace      rimmington
// @description    Highlights fics based on the length of each chapter. Requires Fanfiction Tools.
// @include        /^https?://.*\.fanfiction\.net/.*$/
// ==/UserScript==

// You can edit this bit if you want.
var colours = {
    10000: '#00b500', // green
    5000: '#008000', // darker green
    1000: '#4060dd', // dull blue
    0: 'red' // take a guess
}

// Don't touch anything else, though.

// lexical sorting is dumb
var thresholds = Object.keys(colours).map(Number)
    .sort(function (a, b) { return b - a; });

function ge(a, b) {
    return a >= b;
}

function element_average(e) {
    return Number(e.getAttribute('title').slice(9).split(' ')[0].replace(',', ''));
}

function length_colour(length) {
    return colours[thresholds.filter(ge.bind(undefined, length))[0]];
}

function decorate_element(e) {
    e.style.color = length_colour(element_average(e));
}

var selector = 'abbr:nth-child(2)';
var forEach = Function.call.bind(Array.prototype.forEach);
var observer = new MutationObserver(function (muts) {
    muts.forEach(function (mut) {
        if ((added = mut.addedNodes) !== null) {
            forEach(added, function (node) {
                if (node.nodeType === 1 &&
                       (node.mozMatchesSelector(selector) ||
                       (node = node.querySelector(selector)) !== null)) {
                    decorate_element(node);
                }
            });
        }
    })
});

function observe(container) {
    observer.observe(container, {childList: true});
}

// Auto loading support.
observe(document.querySelector('#content_wrapper_inner'));
// If Fanfiction Tools hasn't made its alterations yet
forEach(document.querySelectorAll('.z-list'), observe); // story list
forEach(document.querySelectorAll('#profile_top .xgray'), observe); // story page
// and in case it has.
forEach(document.querySelectorAll(selector), decorate_element);