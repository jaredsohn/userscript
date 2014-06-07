// ==UserScript==
// @name        AmbossTooltipCopy
// @namespace   https://amboss.miamed.de/
// @description Make Miamed Amboss tooltips copyable by clicking on their respective icon 
// @include     https://amboss.miamed.de/*
// @version     1
// @grant       none
// ==/UserScript==
unsafeWindow.copy2clipboard = function (text)
//function copy2clipboard(text)
{
    text = decodeURIComponent(text);
    //console.log(text);
    //escape all double quotes
    text = text.replace(/"/g, '\\"');
    //replace single quotes by double quotes
    text = text.replace(/\'/g, '"');
    //remove line feeds
    text = text.replace(/(\r\n|\n|\r)/gm, '');
    //remove html tags
    text = $("<div/>").html(text).text();
    //console.log(text);
    text = JSON.parse(text);
    window.prompt('Copy to clipboard: Ctrl+C, Enter', text.text);
}
// by https://gist.github.com/BrockA/2625891#file-waitforkeyelements-js
/*--- waitForKeyElements(): A utility function, for Greasemonkey scripts,
that detects and handles AJAXed content.
 
Usage example:
 
waitForKeyElements (
"div.comments"
, commentCallbackFunction
);
 
//--- Page-specific function to do what we want when the node is found.
function commentCallbackFunction (jNode) {
jNode.text ("This comment changed by waitForKeyElements().");
}
 
IMPORTANT: This function requires your script to have loaded jQuery.
*/

function waitForKeyElements(selectorTxt,
/* Required: The jQuery selector string that
specifies the desired element(s).
*/
actionFunction,
/* Required: The code to run when elements are
found. It is passed a jNode to the matched
element.
*/
bWaitOnce,
/* Optional: If false, will continue to scan for
new elements even after the first match is
found.
*/
iframeSelector
/* Optional: If set, identifies the iframe to
search.
*/
) {
    var targetNodes,
    btargetsFound;
    if (typeof iframeSelector == 'undefined')
    targetNodes = $(selectorTxt);
     else
    targetNodes = $(iframeSelector) .contents() .find(selectorTxt);
    if (targetNodes && targetNodes.length > 0) {
        btargetsFound = true;
        /*--- Found target node(s). Go through each and act if they
are new.
*/
        targetNodes.each(function () {
            var jThis = $(this);
            var alreadyFound = jThis.data('alreadyFound') || false;
            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound = actionFunction(jThis);
                if (cancelFound)
                btargetsFound = false;
                 else
                jThis.data('alreadyFound', true);
            }
        });
    } 
    else {
        btargetsFound = false;
    }
    //--- Get the timer-control variable for this selector.

    var controlObj = waitForKeyElements.controlObj || {
    };
    var controlKey = selectorTxt.replace(/[^\w]/g, '_');
    var timeControl = controlObj[controlKey];
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound && bWaitOnce && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval(timeControl);
        delete controlObj[controlKey]
    } 
    else {
        //--- Set a timer, if needed.
        if (!timeControl) {
            timeControl = setInterval(function () {
                waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector
                );
            }, 300
            );
            controlObj[controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj = controlObj;
}
function checkTooltips(jNode) {
    jNode[0].setAttribute('onClick', 'copy2clipboard(this.getAttribute("data-tooltip"));');
}
waitForKeyElements('span.erklaerung', checkTooltips, true);
waitForKeyElements('span.dictionary', checkTooltips, true);
