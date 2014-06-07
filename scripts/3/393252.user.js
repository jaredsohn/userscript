// ==UserScript==
// @name        senmangaredirect
// @description senmangaredirect
// @namespace   Lead1991
// @include     http://raw.senmanga.com/*
// @run-at      document-start
// ==/UserScript==

/****** New "init" function that we will use
    instead of the old, bad "init" function.
*/
function init () {
    var newParagraph            = document.createElement ('p');
    newParagraph.textContent    = "I was added by the new, good init() function!";
    document.body.appendChild (newParagraph);
}

/*--- Check for bad scripts to intercept and specify any actions to take.
*/
checkForBadJavascripts ( [
    [false, /old, evil init()/, function () {addJS_Node (init);} ],
    [true,  /addons4/i,  null ]
] );

function checkForBadJavascripts (controlArray) {
    /*--- Note that this is a self-initializing function.  The controlArray
        parameter is only active for the FIRST call.  After that, it is an
        event listener.

        The control array row is  defines like so:
        [bSearchSrcAttr, identifyingRegex, callbackFunction]
        Where:
            bSearchSrcAttr      True to search the SRC attribute of a script tag
                                false to search the TEXT content of a script tag.
            identifyingRegex    A valid regular expression that should be unique
                                to that particular script tag.
            callbackFunction    An optional function to execute when the script is
                                found.  Use null if not needed.
    */
    if ( ! controlArray.length) return null;

    checkForBadJavascripts      = function (zEvent) {

        for (var J = controlArray.length - 1;  J >= 0;  --J) {
            var bSearchSrcAttr      = controlArray[J][0];
            var identifyingRegex    = controlArray[J][1];

            if (bSearchSrcAttr) {
                if (identifyingRegex.test (zEvent.target.src) ) {
                    stopBadJavascript (J);
                    return false;
                }
            }
            else {
                if (identifyingRegex.test (zEvent.target.textContent) ) {
                    stopBadJavascript (J);
                    return false;
                }
            }
        }

        function stopBadJavascript (controlIndex) {
            zEvent.stopPropagation ();
            zEvent.preventDefault ();

            var callbackFunction    = controlArray[J][2];
            if (typeof callbackFunction == "function")
                callbackFunction ();

            //--- Remove the node just to clear clutter from Firebug inspection.
            zEvent.target.parentNode.removeChild (zEvent.target);

            //--- Script is intercepted, remove it from the list.
            controlArray.splice (J, 1);
            if ( ! controlArray.length) {
                //--- All done, remove the listener.
                window.removeEventListener (
                    'beforescriptexecute', checkForBadJavascripts, true
                );
            }
        }
    }

    /*--- Use the "beforescriptexecute" event to monitor scipts as they are loaded.
        See https://developer.mozilla.org/en/DOM/element.onbeforescriptexecute
        Note that it does not work on acripts that are dynamically created.
    */
    window.addEventListener ('beforescriptexecute', checkForBadJavascripts, true);

    return checkForBadJavascripts;
}

function addJS_Node (text, s_URL, funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    //--- Don't error check here. if DOM not available, should throw error.
    targ.appendChild (scriptNode);
}