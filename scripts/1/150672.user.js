// ==UserScript==
// @name        Trello Monday
// @namespace   https://userscripts.org/users/489612
// @description Make monday the first week day in Trello
// @include     https://trello.com/*
// @version     2
// @grant       none
// ==/UserScript==

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var nodes = mutation.addedNodes || [];
        for (var i = 0; i < nodes.length; i += 1) {
            if (/ui-datepicker/.test(nodes[i].className)) {
                $('.js-dpicker-cal').datepicker('option', 'firstDay', 1);
                observer.disconnect();
            }
        }
    });
});

var target = document.querySelector('body');
var options = { childList: true };
observer.observe(target, options);
