// ==UserScript==
// @name Remove blank targets
// @author J. King
// @description Prevent trivial new windows by stripping blank targets
// @version 1
// @include http://*
// @include https://*
// @include http://hardocp.com/*
// ==/UserScript==

userJS = (typeof userJS=='undefined') ? {} : userJS;

//  remove blank targets

userJS.targetBlankToTargetTop = function() {
    var nodes = document.querySelectorAll('*[target="_blank"], *[target="blank"], *[target="_new"]');
    for (var a = 0; a < nodes.length; a++) 
        nodes[a].setAttribute('target', '_top');
}
document.addEventListener('DOMContentLoaded', userJS.targetBlankToTargetTop, false);
window.opera.addEventListener('afterEvent.load', userJS.targetBlankToTargetTop, false);