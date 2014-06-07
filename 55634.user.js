// ==UserScript==
// @name           no_to_bubbles
// @namespace      t61_no_bubbles
// @description    Removed bubbles from the t61 experience.
// @include        https://addons.mozilla.org/en-US/firefox/addon/748
// ==/UserScript==

function popBubbles()
{
    document.getElementById('screensaver_wrapper').parentNode.removeChild(document.getElementById('screensaver_wrapper'));
}

popBubbles();