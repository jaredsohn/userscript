// ==UserScript==
// @name        Trello: Enable browser's "remember password"
// @description Removes autocomplete=false attribute from every html input element.
// @author      Magi
// -icon        //trello.com/images/apple-touch-icon-precomposed.png
// @include     https://*.trello.com/*
// @include     https://trello.com/*
// @run-at      document-start
// @grant       none
// ==/UserScript==

(function() {
    'use strict'
    
    /*
    // the following works only when @run-at is document-end (greasemonkey default if not specified)
    // but then it's too late for the browser to invoke remembered credentials input field autofill
    var stupidElements = Array.prototype.slice.call(window.document.querySelectorAll('input[autocomplete="off"]'));
    
    stupidElements.forEach(function(elem) {
        elem.removeAttribute('autocomplete')
        elem.setAttribute('autocomplete', 'on');
    });
    */
    
    // the following is an attempt at emulating "notice when a new element is added"
    //
    // depending on the order of "animationstart" event firing and the browser checking
    // whether autocomplete is allowed (for example input[autocomplete] must not be "off"),
    // setting the autocomplete to on after receiving the animationstart, the browser could
    // be tricked into filling the forms automatically after loading the page.
    // whether this works or not is entirely browser implementation dependant.
    // let's go with this until Mutatio..
    // .. oops, MutationObservers seem to be available already :F
    // .. oops. let's not use that braindead shit
    
    // detect dom node add: http://davidwalsh.name/detect-node-insertion
    // add css with javascript: http://stackoverflow.com/questions/3328933/set-the-webkit-keyframes-from-to-parameter-with-javascript

    var css1 = document.createTextNode('@keyframes stupidTrello { from { opacity: 0.99; } to { opacity: 1; } }')
      , css2 = document.createTextNode('input[autocomplete="off"] { \
                 animation-duration: 1ms; \
                 animation-name: stupidTrello; \
              }')
      , styleElem = document.createElement('style')
      ;
    
    styleElem.appendChild(css1);
    styleElem.appendChild(css2);
    document.head.appendChild(styleElem);
    
    document.addEventListener("animationstart", function(event) {
        if (event.animationName != "stupidTrello") return;
        event.target.setAttribute('autocomplete', 'on');
    }, false);
    
    /*
    // my god how stupid these things are
    new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for (var node of mutation.addedNodes) {
                console.log('stupidTrello', mutation.type, mutation.target.nodeName+"/"+node);
                console.log(node);
                if (node.nodeName != 'input') continue;
                console.log('stupidTrello', 'input added!');
                //mutation.target.setAttribute('autocomplete', 'on');
            };
        });
    }).observe(document, {
        childList: true,
        subtree: true,
        characterData: true
    });
    */
    
})();
