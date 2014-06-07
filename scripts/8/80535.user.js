// ==UserScript==
// @name           hide_twitter_backgrounds
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Add shortcut to hide and show twitter backgrounds on twitter.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://twilog.org/*
// ==/UserScript==
(function () {
    var toggleKey = 'z'; // key to toggle hiding; Input 'C-z' in case you wanna use ctrl key or 'S-z' for shift key, or 'C-S-z' for both.
    var color = '#000000'; // background color used for hiding
    
    var key = 'hide_twitter_backgrounds';
    var inputs = ['INPUT', 'TEXTAREA'];
    var isHided = parseInt(window.localStorage.getItem(key));
    if (isHided) {
        document.body.style.background = color;
    } else {
        isHided = 0;
    }
    document.addEventListener('keypress', function (e) {
        var pressed = String.fromCharCode(e.which).toLowerCase();
        pressed = (e.ctrlKey ? 'C-' : '') + (e.altKey ? 'A-' : '') + (e.shiftKey ? 'S-' : '') + pressed;
        if (inputs.indexOf(e.target.tagName) != -1 || pressed != toggleKey) {
            return;
        }
        e.preventDefault();
        isHided = (isHided + 1) % 2;
        document.body.style.background = isHided ? color : '';
        window.localStorage.setItem(key, isHided);
    }, false);
})();
