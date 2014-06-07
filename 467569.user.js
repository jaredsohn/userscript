// ==UserScript==
// @name        imgur random pic keyboard shortcut
// @namespace   http://imgur.com
// @include     http://*imgur.com/*
// @version     1
// @grant       none
// ==/UserScript==

window.onload = function(){
    document.addEventListener('keyup', function(e){
        if (e.which === 73) {
            document.getElementsByClassName('random-icon')[0].parentElement.click();
            e.preventDefault();
        }
    });
};