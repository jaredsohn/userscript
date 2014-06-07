// ==UserScript==
// @name            Longer Transcripts for Campfire
// @version         2011.07.14.001
// @namespace       http://glomerate.com
// @description     Increases campfire transcript length from 100 to 400.
// @include         http*://*.campfirenow.com/*
// ==/UserScript==

(function(){

    // This script is sandboxed so we can't poll for chat object directly
    setTimeout(function() {
        exec(updateMessageHistory);
    }, 5000);

    var updateMessageHistory = function() {
        if (typeof chat != 'undefined') {
            chat.messageHistory = 400;
        }
    }

    function exec(fn) {
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.textContent = '(' + fn + ')();';
        document.body.appendChild(script); // run the script
        document.body.removeChild(script); // clean up
    }

})();
