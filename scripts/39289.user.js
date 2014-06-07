// ==UserScript==
// @author         Max Shirshin
// @version        0.8
// @name           killEndlessAlerts
// @namespace      http://www.shirshin.com
// @description    Blocks repetitive alert boxes on pages that pop them in infinite loops, solving the long-standing problem of Firefox not providing any user interface to stop script execution on a web page.
// @include        *
// ==/UserScript==

var alertCounter = 0,
    initialTime = Date.now(),
    resetInterval = 5000,
    maxAlertsPerInterval = 3,
    confirmationMsg = "Seems like you're invaded by alerts... should we stop this now?";

// Generator of replacements for modal functions
function getReplacement(wtype) {
    return function() {
        var cTime = Date.now();
        if (cTime - initialTime > resetInterval) {
            alertCounter = 0;
            initialTime = cTime;
        }

        if (++alertCounter > maxAlertsPerInterval) {
            // we use native wrapper, which is safe
            if (window.confirm(confirmationMsg)) {
                // This redefines methods that produce modal dialogs,
                // and causes a 100% JavaScript error when any of them is
                // invoked, which most probably stops further script execution.
                // Additional error is thrown in the global context,
                // preventing most possible error handlers.
                unsafeWindow.alert = function() { throw new Error('Alerts stopped by killEndlessAlerts.js (Greasemonkey)') };
                unsafeWindow.confirm = function() { throw new Error('Confirm windows stopped by killEndlessAlerts.js (Greasemonkey)') };
                unsafeWindow.prompt = function() { throw new Error('Prompt windows stopped by killEndlessAlerts.js (Greasemonkey)') };
                (function() {
                    throw new Error('Global context error thrown by killEndlessAlerts.js (Greasemonkey)');
                }).apply(unsafeWindow);
            } else {
                alertCounter = 1;
                initialTime = Date.now();
                return callImitation(wtype, arguments);
            }
        } else {
            // just run as it should be
            return callImitation(wtype, arguments);
        }
    };
}

function callImitation(wtype, args) {
    // call safe native wrappers instead
    switch (wtype) {
        case 'alert':
            window.alert.apply(window, args);
        break;
    
        case 'confirm':
            return window.confirm.apply(window, args);
        break;
    
        case 'prompt':
            return window.prompt.apply(window, args);
        break;
    }
}

unsafeWindow.alert = getReplacement('alert');
unsafeWindow.confirm = getReplacement('confirm');
unsafeWindow.prompt = getReplacement('prompt');
