// ==UserScript==
// @name           imeem - disable video auto play
// @namespace      http://www.absolutedestiny.org/
// @description    Make imeem not play a video straight away. Doesn't precache the video, yet.
// @include        http://*imeem.com/video*
// ==/UserScript==
var allElements, thisElement, changed;
allElements = document.evaluate(
    '//*[@name="flashvars"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    thisElement.value = thisElement.value.replace(/autoStart=true/,"autoStart=false");
    changed = "true";
}

var newBody = document.body.innerHTML;
if (changed == "true")
{
window.addEventListener(
    'load', 
    function() { document.body.innerHTML = newBody; },
    true);
    };