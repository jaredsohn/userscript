// ==UserScript==
// @name         Open/hide GitHub diff on click
// @namespace    http://think.js/
// @version      0.1
// @description  Open/hide GitHub diff when clicking on diff header
// @include      http*://github.com/*/*/commit/*
// @include      http*://github.com/*/*/pull/*
// @include      http*://github.com/*/*/compare/*
// @copyright    2013+, You
// ==/UserScript==

function hasClass(element, className) {
    return element && element.classList && element.classList.contains(className);
}

function isDiffHeader(element) {
    return hasClass(element, 'meta');
}

document.body.addEventListener('click', function(event) {
    var target = event.target;
    while (target) {
        if (hasClass(target, 'actions')) {
            break;
        }
        if (isDiffHeader(target)) {
            target.nextElementSibling.hidden = !target.nextElementSibling.hidden;
            break;
        }
        target = target.parentElement;
    }
});
