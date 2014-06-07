// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Pandora Auto Continue
// @namespace       http://userscripts.org/users/masonwan
// @description     Automatically click "I'm listening" and reload button in Pandora.com
// @match           http://www.pandora.com/*
// @run-at          document-end
// @updateURL       https://github.com/masonwan/JavaScriptCollection/raw/master/PandoraAutoContinue/PandoraAutoContinue%20UserScripts.release.user.js
// @version         2.3
// ==/UserScript==

if (!localStorage.autoContinueDelay) {
    localStorage.autoContinueDelay = 2000;
}

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            var timeText = (new Date()).toISOString();
            var addedNode = mutation.addedNodes[i];
            var parent = addedNode.parentElement || addedNode.parentNode;

            if (!parent) {
                continue;
            }

            var buttonElement = parent.querySelector('a.still_listening');

            if (buttonElement) {
                setTimeout(function delayClick() {
                    var buttonElement = document.querySelector('a.still_listening');
                    buttonElement.click();
                }, localStorage.autoContinueDelay);

                break;
            }
        }
    });
});

observer.observe(document, { childList: true, subtree: true });
