// ==UserScript==
// @name           Stack Welcome
// @description    prevents the "Welcome" bar from popping up on StackExchange sites
// @version        1.1
// @include        http://stackoverflow.com/*
// @include        http://*.stackexchange.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://askubuntu.com/*
// ==/UserScript==

(function(){
    document.cookie = "m=0; path=/";

    var idToRemove = 'notify--1';
    var elementTimeout = 200;
    var elementRetries = 10;
    var marginTimeout = 100;
    var marginRetries = 15;
    
    (function remove() {
        var element = document.getElementById(idToRemove);
        if (element) {
            element.parentNode.removeChild(element);
            (function fixBodyMargin(){
                if (document.body.style.marginTop !== '0px') {
                    document.body.style.marginTop = '0px';
                }
                if (marginRetries--) {
                    setTimeout(fixBodyMargin, marginTimeout);
                }
            })();
        }
        else if (elementRetries--) {
            setTimeout(remove, elementTimeout);
        }
    })();
})();
