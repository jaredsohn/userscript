// ==UserScript==
// @name        StackOverflow - Shift Home
// @namespace   http://mdev.me/
// @description Shortcut to load homepage
// @include     http://stackoverflow.com/*
// @include     http://www.stackoverflow.com/*
// @version     1
// ==/UserScript==
document.addEventListener('keyup',function(e) {
    if(e.which == 36 && e.shiftKey && e.target.tagName.toLowerCase() != 'textarea' && e.target.tagName.toLowerCase() != 'input')
    {
        var homeLink = document.querySelector('#hlogo a');
        var origTarget = homeLink.target;
        if(e.ctrlKey)
        {
            homeLink.target = "_blank";
        }
        homeLink.click();
        homeLink.target = origTarget;
    }
});