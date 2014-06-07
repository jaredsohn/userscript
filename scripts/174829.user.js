// ==UserScript==
// @name        Hijack Event Listeners
// @namespace   http://userscripts.org/users/23652
// @description This script alerts you of event listeners when they are added to the document
// @include     *
// @copyright   JoeSimmons
// @version     1.0.1
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @run-at      document-start
// @grant       none
// ==/UserScript==

(function () { // IIFE

    var oldAEL = Element.prototype.addEventListener, // store a reference to the original addEventListener
        events = []; // keep a stack of added events if we want to use it later

    // Make sure the page is not in a frame
    // It's up to you if you want to keep this or not
    if (window.self !== window.top) { return; }


    // -------------------------------------------------------


    // hijack the addEventListener method of Element
    window.addEventListener = Element.prototype.addEventListener = function (name, func, capture) {

        // this is the element it was attached to
        // you can do whatever with it (i.e., check its id, parent node, etc)
        var element = this,
            html;

        // save the event if we want to look at it later
        events.push( {
            'type' : name,
            'function' : func,
            'useCapture' : capture,
            'element' : element
        } );

        // get the element's html if possible
        if (element.cloneNode) {
            html = element.cloneNode(false).outerHTML.replace(/[\r\n]+/g, '');
        } else {
            html = element + '';
        }

        // tell you all about it
        alert('Hijacked an event listener!\n\n' +
              'The event name is "' + name + '"\n\n' +
              'useCapture is "' + capture + '"\n\n' +
              'It was attached to "' + html + '"\n\n' +
              'It runs this function: ' + func
        );

        // register the listener so the page doesn't break
        oldAEL.apply(element, arguments);

    };

}());