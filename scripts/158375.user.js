// ==UserScript==
// @name            Replace snake.js with a local version
// @run-at          document-start
// ==/UserScript==

/*--- Important!
        (1) We need another add-on, besides Greasemonkey, to
            disable the old, undesired script.
        (2) The DOM is not available yet
            (@run-at == document-start).
        (3) We cannot use a loop to check for the DOM because
            loading is halted while the loop runs.
        (4) setTimeout() and setInterval() are not fast enough due
            to minimum interval clamping.  By the time they detect
            the DOM, scripts that we need to precede may have
            loaded.
        (5) Therefor, we use a "set Zero Timeout" function as
            explained by David Baron at
                http://dbaron.org/log/20100309-faster-timeouts .
        (6) By the time FF reports that the `document.head` is
            available, several head elements have loaded!
            (Is this a bug?)
            That means that if any dependent scripts are loaded
            before we can inject our jQuery version, then we must
            also reload those dependent scripts.
*/

//////  setZeroTimeout() implementation: BEGIN

/*--- Only add setZeroTimeout to the window object, and hide
    everything else in a closure.
*/
( function () {
    var timeouts    = [];
    var messageName = "zero-timeout-message";

    /*--- Like setTimeout, but only takes a function argument.
        There's no time argument (always zero) and no arguments.
        You have to use a closure.
    */
    function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }

    window.addEventListener ("message", handleMessage, true);

    // Add the one thing we want added to the window object.
    window.setZeroTimeout = setZeroTimeout;
})();

//////  setZeroTimeout() implementation: END

/*--- Now wait for the DOM and then add our version of jQuery,
    first thing.
*/
function SearchForDOM () {

    var targetNode;
    if (typeof document.head == "undefined")
        targetNode = document.querySelector ("head, body");
    else
        targetNode = document.head;
    if (targetNode) {

        var scriptNode      = document.createElement ("script");
        scriptNode.src      = 'file:///C:/Users/Tristan/Documents/Documents/Projets%20Perso/snake.js';
        targetNode.appendChild (scriptNode);
    }
    else
        setZeroTimeout (SearchForDOM);
}

SearchForDOM ();